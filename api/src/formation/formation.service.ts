import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FormationService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    titre: string;
    description: string;
    dateDebut: Date;
    dateFin: Date;
    heureDebut: string;
    heureFin: string;
    lieu: string;
    maxParticipants?: number;
    prix?: number;
  }) {
    // Vérifier que la date de début est dans le futur
    if (new Date(data.dateDebut) <= new Date()) {
      throw new BadRequestException('La date de début doit être dans le futur');
    }

    // Vérifier que la date de fin est après la date de début
    if (new Date(data.dateFin) <= new Date(data.dateDebut)) {
      throw new BadRequestException('La date de fin doit être après la date de début');
    }

    return this.prisma.formation.create({
      data,
      include: {
        inscriptions: {
          include: {
            user: {
              select: {
                id: true,
                nom: true,
                prenom: true,
                email: true
              }
            }
          }
        }
      }
    });
  }

  async findAll() {
    return this.prisma.formation.findMany({
      include: {
        inscriptions: {
          include: {
            user: {
              select: {
                id: true,
                nom: true,
                prenom: true,
                email: true
              }
            }
          }
        }
      },
      orderBy: {
        dateDebut: 'asc'
      }
    });
  }

  async findActive() {
    return this.prisma.formation.findMany({
      where: {
        statut: 'active',
        dateDebut: {
          gte: new Date()
        }
      },
      include: {
        inscriptions: {
          include: {
            user: {
              select: {
                id: true,
                nom: true,
                prenom: true,
                email: true
              }
            }
          }
        }
      },
      orderBy: {
        dateDebut: 'asc'
      }
    });
  }

  async findOne(id: number) {
    const formation = await this.prisma.formation.findUnique({
      where: { id },
      include: {
        inscriptions: {
          include: {
            user: {
              select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                telephone: true,
                secteurActivite: true
              }
            }
          }
        }
      }
    });

    if (!formation) {
      throw new NotFoundException(`Formation avec l'ID ${id} non trouvée`);
    }

    return formation;
  }

  async update(id: number, data: {
    titre?: string;
    description?: string;
    dateDebut?: Date;
    dateFin?: Date;
    heureDebut?: string;
    heureFin?: string;
    lieu?: string;
    maxParticipants?: number;
    prix?: number;
    statut?: string;
  }) {
    // Vérifier que la formation existe
    await this.findOne(id);

    // Vérifications de dates si elles sont modifiées
    if (data.dateDebut && new Date(data.dateDebut) <= new Date()) {
      throw new BadRequestException('La date de début doit être dans le futur');
    }

    if (data.dateDebut && data.dateFin && new Date(data.dateFin) <= new Date(data.dateDebut)) {
      throw new BadRequestException('La date de fin doit être après la date de début');
    }

    return this.prisma.formation.update({
      where: { id },
      data,
      include: {
        inscriptions: {
          include: {
            user: {
              select: {
                id: true,
                nom: true,
                prenom: true,
                email: true
              }
            }
          }
        }
      }
    });
  }

  async remove(id: number) {
    // Vérifier que la formation existe
    await this.findOne(id);

    // Supprimer d'abord les inscriptions
    await this.prisma.inscription.deleteMany({
      where: { formationId: id }
    });

    // Puis supprimer la formation
    return this.prisma.formation.delete({
      where: { id }
    });
  }

  // Méthodes pour les inscriptions
  async inscrireUtilisateur(formationId: number, userId: number, notes?: string) {
    const formation = await this.findOne(formationId);
    
    // Vérifier si la formation est active
    if (formation.statut !== 'active') {
      throw new BadRequestException('Cette formation n\'est plus disponible pour inscription');
    }

    // Vérifier si la formation n'est pas complète
    if (formation.inscriptions.length >= formation.maxParticipants) {
      throw new BadRequestException('Cette formation est complète');
    }

    // Vérifier si l'utilisateur n'est pas déjà inscrit
    const existingInscription = await this.prisma.inscription.findUnique({
      where: {
        userId_formationId: {
          userId,
          formationId
        }
      }
    });

    if (existingInscription) {
      throw new BadRequestException('Vous êtes déjà inscrit à cette formation');
    }

    return this.prisma.inscription.create({
      data: {
        userId,
        formationId,
        notes
      },
      include: {
        user: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true
          }
        },
        formation: true
      }
    });
  }

  async getInscriptionsUtilisateur(userId: number) {
    return this.prisma.inscription.findMany({
      where: { userId },
      include: {
        formation: true
      },
      orderBy: {
        dateInscription: 'desc'
      }
    });
  }

  async confirmerInscription(inscriptionId: number) {
    return this.prisma.inscription.update({
      where: { id: inscriptionId },
      data: { statut: 'confirmé' }
    });
  }

  async annulerInscription(inscriptionId: number) {
    return this.prisma.inscription.update({
      where: { id: inscriptionId },
      data: { statut: 'annulé' }
    });
  }

  // Méthode pour l'admin - récupérer toutes les inscriptions
  async getAllInscriptions() {
    return this.prisma.inscription.findMany({
      include: {
        user: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true,
            telephone: true,
            secteurActivite: true
          }
        },
        formation: {
          select: {
            id: true,
            titre: true,
            description: true,
            dateDebut: true,
            dateFin: true,
            heureDebut: true,
            heureFin: true,
            lieu: true,
            prix: true,
            statut: true
          }
        }
      },
      orderBy: {
        dateInscription: 'desc'
      }
    });
  }
}
