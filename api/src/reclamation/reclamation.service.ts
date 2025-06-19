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
    const where: any = {};
    
    if (filters?.typeReclamation) where.typeReclamation = filters.typeReclamation;
    if (filters?.statut) where.statut = filters.statut;
    if (filters?.priorite) where.priorite = filters.priorite;
    if (filters?.userId) where.userId = filters.userId;
    if (filters?.adminTraitantId) where.adminTraitantId = filters.adminTraitantId;

    return this.prisma.reclamation.findMany({
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
    const totalReclamations = await this.prisma.reclamation.count();
    
    const statusCounts = await this.prisma.reclamation.groupBy({
      by: ['statut'],
      _count: {
        id: true,
      },
    });

    const typeCounts = await this.prisma.reclamation.groupBy({
      by: ['typeReclamation'],
      _count: {
        id: true,
      },
    });

    const prioriteCounts = await this.prisma.reclamation.groupBy({
      by: ['priorite'],
      _count: {
        id: true,
      },
    });

    // Temps de résolution moyen
    const resolvedReclamations = await this.prisma.reclamation.findMany({
      where: {
        statut: 'resolue',
        dateResolution: { not: null },
      },
      select: {
        createdAt: true,
        dateResolution: true,
      },
    });

    const avgResolutionTime = resolvedReclamations.length > 0 
      ? resolvedReclamations.reduce((acc, rec) => {
          const diff = new Date(rec.dateResolution!).getTime() - new Date(rec.createdAt).getTime();
          return acc + diff;
        }, 0) / resolvedReclamations.length / (1000 * 60 * 60 * 24) // en jours
      : 0;

    return {
      totalReclamations,
      repartitionParStatut: statusCounts,
      repartitionParType: typeCounts,
      repartitionParPriorite: prioriteCounts,
      tempsResolutionMoyen: Math.round(avgResolutionTime * 100) / 100,
    };
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
} 