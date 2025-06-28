import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReclamationDto, UpdateReclamationDto, TraiterReclamationDto } from './dto/reclamation.dto';

@Injectable()
export class ReclamationService {
  constructor(private prisma: PrismaService) {}

  // Générer un numéro de réclamation unique
  private async generateNumeroReclamation(): Promise<string> {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    
    const count = await this.prisma.reclamation.count({
      where: {
        createdAt: {
          gte: new Date(year, date.getMonth(), 1),
          lt: new Date(year, date.getMonth() + 1, 1),
        },
      },
    });

    const numero = String(count + 1).padStart(4, '0');
    return `REC-${year}${month}-${numero}`;
  }

  // Créer une nouvelle réclamation
  async create(createReclamationDto: CreateReclamationDto, userId: number) {
    const numeroReclamation = await this.generateNumeroReclamation();

    const reclamation = await this.prisma.reclamation.create({
      data: {
        ...createReclamationDto,
        userId,
        numeroReclamation,
      },
      include: {
        user: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true,
          },
        },
      },
    });

    // Créer l'historique initial
    await this.prisma.historiquereclamation.create({
      data: {
        reclamationId: reclamation.id,
        nouveauStatut: 'ouverte',
        typeAction: 'creation',
        commentaire: 'Réclamation créée',
      },
    });

    return reclamation;
  }

  // Récupérer toutes les réclamations (avec filtres)
  async findAll(filters?: {
    typeReclamation?: string;
    statut?: string;
    priorite?: string;
    userId?: number;
    adminTraitantId?: number;
    limit?: number;
    offset?: number;
  }) {
    console.log('🔍 Service findAll - Filtres reçus:', filters);
    
    const where: any = {};
    
    if (filters?.typeReclamation) where.typeReclamation = filters.typeReclamation;
    if (filters?.statut) where.statut = filters.statut;
    if (filters?.priorite) where.priorite = filters.priorite;
    if (filters?.userId) where.userId = filters.userId;
    if (filters?.adminTraitantId) where.adminTraitantId = filters.adminTraitantId;

    console.log('🔍 Conditions WHERE appliquées:', where);

    const result = await this.prisma.reclamation.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true,
          },
        },
        adminTraitant: {
          select: {
            id: true,
            nom: true,
            prenom: true,
          },
        },
        _count: {
          select: {
            historique: true,
          },
        },
      },
      orderBy: [
        { priorite: 'desc' },
        { createdAt: 'desc' },
      ],
      take: filters?.limit || 50,
      skip: filters?.offset || 0,
    });

    console.log('📊 Résultats de la base de données:');
    console.log('- Nombre total de réclamations trouvées:', result.length);
    console.log('- Détail des réclamations:', result.map(r => ({
      id: r.id,
      sujet: r.sujet,
      statut: r.statut,
      userId: r.userId,
      user: r.user.nom + ' ' + r.user.prenom
    })));

    return result;
  }

  // Récupérer une réclamation par ID
  async findOne(id: number) {
    return this.prisma.reclamation.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true,
            telephone: true,
          },
        },
        adminTraitant: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true,
          },
        },
        historique: {
          include: {
            admin: {
              select: {
                id: true,
                nom: true,
                prenom: true,
              },
            },
          },
          orderBy: {
            dateAction: 'desc',
          },
        },
      },
    });
  }

  // Récupérer une réclamation par numéro
  async findByNumero(numeroReclamation: string) {
    return this.prisma.reclamation.findUnique({
      where: { numeroReclamation },
      include: {
        user: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true,
          },
        },
        adminTraitant: {
          select: {
            id: true,
            nom: true,
            prenom: true,
          },
        },
        historique: {
          include: {
            admin: {
              select: {
                id: true,
                nom: true,
                prenom: true,
              },
            },
          },
          orderBy: {
            dateAction: 'desc',
          },
        },
      },
    });
  }

  // Assigner une réclamation à un admin
  async assignToAdmin(id: number, adminId: number) {
    const reclamation = await this.prisma.reclamation.findUnique({
      where: { id },
      select: { statut: true },
    });

    if (!reclamation) {
      throw new Error('Réclamation non trouvée');
    }

    const result = await this.prisma.reclamation.update({
      where: { id },
      data: {
        adminTraitantId: adminId,
        statut: reclamation.statut === 'ouverte' ? 'en_cours' : reclamation.statut,
        dateTraitement: reclamation.statut === 'ouverte' ? new Date() : undefined,
      },
      include: {
        user: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true,
          },
        },
        adminTraitant: {
          select: {
            id: true,
            nom: true,
            prenom: true,
          },
        },
      },
    });

    // Ajouter à l'historique
    await this.prisma.historiquereclamation.create({
      data: {
        reclamationId: id,
        ancienStatut: reclamation.statut,
        nouveauStatut: result.statut,
        adminId,
        typeAction: 'modification',
        commentaire: 'Réclamation assignée à un administrateur',
      },
    });

    return result;
  }

  // Traiter une réclamation
  async traiter(id: number, traiterDto: TraiterReclamationDto, adminId: number) {
    const reclamation = await this.prisma.reclamation.findUnique({
      where: { id },
      select: { statut: true },
    });

    if (!reclamation) {
      throw new Error('Réclamation non trouvée');
    }

    const updateData: any = {
      ...traiterDto,
      adminTraitantId: adminId,
    };

    if (traiterDto.statut === 'resolue' && reclamation.statut !== 'resolue') {
      updateData.dateResolution = new Date();
    }

    if (reclamation.statut === 'ouverte') {
      updateData.dateTraitement = new Date();
    }

    const result = await this.prisma.reclamation.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true,
          },
        },
        adminTraitant: {
          select: {
            id: true,
            nom: true,
            prenom: true,
          },
        },
      },
    });

    // Ajouter à l'historique
    await this.prisma.historiquereclamation.create({
      data: {
        reclamationId: id,
        ancienStatut: reclamation.statut,
        nouveauStatut: traiterDto.statut,
        adminId,
        typeAction: 'traitement',
        commentaire: traiterDto.reponseAdmin || 'Réclamation traitée',
      },
    });

    return result;
  }

  // Mettre à jour une réclamation (utilisateur)
  async update(id: number, updateReclamationDto: UpdateReclamationDto, userId?: number) {
    // Vérifier si l'utilisateur peut modifier cette réclamation
    if (userId) {
      const reclamation = await this.prisma.reclamation.findUnique({
        where: { id },
        select: { userId: true, statut: true },
      });
      
      if (!reclamation || reclamation.userId !== userId) {
        throw new Error('Vous n\'êtes pas autorisé à modifier cette réclamation');
      }

      if (reclamation.statut !== 'ouverte') {
        throw new Error('Cette réclamation ne peut plus être modifiée');
      }
    }

    return this.prisma.reclamation.update({
      where: { id },
      data: updateReclamationDto,
      include: {
        user: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true,
          },
        },
      },
    });
  }

  // Fermer une réclamation
  async close(id: number, adminId: number, commentaire?: string) {
    const reclamation = await this.prisma.reclamation.findUnique({
      where: { id },
      select: { statut: true },
    });

    if (!reclamation) {
      throw new Error('Réclamation non trouvée');
    }

    const result = await this.prisma.reclamation.update({
      where: { id },
      data: {
        statut: 'fermee',
        adminTraitantId: adminId,
      },
      include: {
        user: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true,
          },
        },
        adminTraitant: {
          select: {
            id: true,
            nom: true,
            prenom: true,
          },
        },
      },
    });

    // Ajouter à l'historique
    await this.prisma.historiquereclamation.create({
      data: {
        reclamationId: id,
        ancienStatut: reclamation.statut,
        nouveauStatut: 'fermee',
        adminId,
        typeAction: 'fermeture',
        commentaire: commentaire || 'Réclamation fermée',
      },
    });

    return result;
  }

  // Statistiques des réclamations
  async getStats() {
    try {
      const totalReclamations = await this.prisma.reclamation.count();
      
      // Compter par statut
      const ouverte = await this.prisma.reclamation.count({ where: { statut: 'ouverte' } });
      const enCours = await this.prisma.reclamation.count({ where: { statut: 'en_cours' } });
      const resolue = await this.prisma.reclamation.count({ where: { statut: 'resolue' } });
      const fermee = await this.prisma.reclamation.count({ where: { statut: 'fermee' } });

      // Compter par type
      const service = await this.prisma.reclamation.count({ where: { typeReclamation: 'service' } });
      const document = await this.prisma.reclamation.count({ where: { typeReclamation: 'document' } });
      const formation = await this.prisma.reclamation.count({ where: { typeReclamation: 'formation' } });
      const technique = await this.prisma.reclamation.count({ where: { typeReclamation: 'technique' } });
      const autre = await this.prisma.reclamation.count({ where: { typeReclamation: 'autre' } });

      // Compter par priorité
      const basse = await this.prisma.reclamation.count({ where: { priorite: 'basse' } });
      const normale = await this.prisma.reclamation.count({ where: { priorite: 'normale' } });
      const haute = await this.prisma.reclamation.count({ where: { priorite: 'haute' } });
      const urgente = await this.prisma.reclamation.count({ where: { priorite: 'urgente' } });

      return {
        totalReclamations,
        repartitionParStatut: {
          ouverte,
          en_cours: enCours,
          resolue,
          fermee,
        },
        repartitionParType: {
          service,
          document,
          formation,
          technique,
          autre,
        },
        repartitionParPriorite: {
          basse,
          normale,
          haute,
          urgente,
        },
        // Stats pour les cartes admin
        total: totalReclamations,
        ouvertes: ouverte,
        enCours: enCours,
        resolues: resolue,
        fermees: fermee,
      };
    } catch (error) {
      console.error('Erreur lors du calcul des statistiques:', error);
      // Retourner des stats par défaut en cas d'erreur
      return {
        totalReclamations: 0,
        repartitionParStatut: {
          ouverte: 0,
          en_cours: 0,
          resolue: 0,
          fermee: 0,
        },
        repartitionParType: {
          service: 0,
          document: 0,
          formation: 0,
          technique: 0,
          autre: 0,
        },
        repartitionParPriorite: {
          basse: 0,
          normale: 0,
          haute: 0,
          urgente: 0,
        },
        total: 0,
        ouvertes: 0,
        enCours: 0,
        resolues: 0,
        fermees: 0,
      };
    }
  }

  // Ajouter une évaluation de satisfaction
  async addSatisfaction(id: number, satisfaction: number, commentaire?: string, userId?: number) {
    // Vérifier si l'utilisateur peut évaluer cette réclamation
    if (userId) {
      const reclamation = await this.prisma.reclamation.findUnique({
        where: { id },
        select: { userId: true, statut: true },
      });
      
      if (!reclamation || reclamation.userId !== userId) {
        throw new Error('Vous n\'êtes pas autorisé à évaluer cette réclamation');
      }

      if (reclamation.statut !== 'resolue' && reclamation.statut !== 'fermee') {
        throw new Error('Cette réclamation n\'est pas encore résolue');
      }
    }

    return this.prisma.reclamation.update({
      where: { id },
      data: {
        satisfaction,
        commentaireFinal: commentaire,
      },
    });
  }

  // Mettre à jour le statut d'une réclamation
  async updateStatus(id: number, nouveauStatut: string, adminId: number, commentaire?: string) {
    const reclamation = await this.prisma.reclamation.findUnique({
      where: { id },
      select: { statut: true },
    });

    if (!reclamation) {
      throw new Error('Réclamation non trouvée');
    }

    const ancienStatut = reclamation.statut;

    // Mettre à jour la réclamation
    const result = await this.prisma.reclamation.update({
      where: { id },
      data: {
        statut: nouveauStatut,
        adminTraitantId: adminId,
        dateTraitement: nouveauStatut === 'en_cours' ? new Date() : undefined,
        dateResolution: nouveauStatut === 'resolue' ? new Date() : undefined,
      },
      include: {
        user: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true,
          },
        },
        adminTraitant: {
          select: {
            id: true,
            nom: true,
            prenom: true,
          },
        },
      },
    });

    // Ajouter à l'historique
    await this.prisma.historiquereclamation.create({
      data: {
        reclamationId: id,
        ancienStatut,
        nouveauStatut,
        adminId,
        typeAction: 'modification',
        commentaire: commentaire || `Statut changé de ${ancienStatut} à ${nouveauStatut}`,
      },
    });

    return result;
  }
} 