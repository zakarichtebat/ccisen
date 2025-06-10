import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Request } from 'express';

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
      data: { ...data, updatedAt: new Date() },
      include: {
        inscription: {
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
        inscription: {
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
        inscription: {
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
        },
        like: {
          include: {
            user: {
              select: {
                id: true,
                nom: true,
                prenom: true
              }
            }
          }
        },
        comment: {
          include: {
            user: {
              select: {
                id: true,
                nom: true,
                prenom: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 10 // Limiter à 10 commentaires les plus récents
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
        inscription: {
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
      data: { ...data, updatedAt: new Date() },
      include: {
        inscription: {
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

    // Supprimer dans l'ordre des dépendances pour éviter les erreurs de contrainte
    // 1. Supprimer d'abord les commentaires
    await this.prisma.comment.deleteMany({
      where: { formationId: id }
    });

    // 2. Supprimer les likes
    await this.prisma.like.deleteMany({
      where: { formationId: id }
    });

    // 3. Supprimer les inscriptions
    await this.prisma.inscription.deleteMany({
      where: { formationId: id }
    });

    // 4. Enfin supprimer la formation
    const deletedFormation = await this.prisma.formation.delete({
      where: { id }
    });

    return {
      message: 'Formation supprimée avec succès',
      formation: deletedFormation
    };
  }

  // Méthodes pour les inscriptions
  async inscrireUtilisateur(formationId: number, userId: number, notes?: string) {
    const formation = await this.findOne(formationId);
    
    // Vérifier si la formation est active
    if (formation.statut !== 'active') {
      throw new BadRequestException('Cette formation n\'est plus disponible pour inscription');
    }

    // Vérifier si la formation n'est pas complète
    if (formation.inscription.length >= formation.maxParticipants) {
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
        notes,
        updatedAt: new Date()
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
            dateDebut: true,
            dateFin: true,
            heureDebut: true,
            heureFin: true,
            lieu: true,
            prix: true
          }
        }
      },
      orderBy: {
        dateInscription: 'desc'
      }
    });
  }

  // Méthodes pour les likes
  async toggleLike(formationId: number, userId: number) {
    // Vérifier que la formation existe
    await this.findOne(formationId);

    // Vérifier si l'utilisateur a déjà liké cette formation
    const existingLike = await this.prisma.like.findUnique({
      where: {
        userId_formationId: {
          userId,
          formationId
        }
      }
    });

    if (existingLike) {
      // Retirer le like
      await this.prisma.like.delete({
        where: {
          userId_formationId: {
            userId,
            formationId
          }
        }
      });
      return { message: 'Like retiré', liked: false };
    } else {
      // Ajouter le like
      await this.prisma.like.create({
        data: {
          userId,
          formationId
        }
      });
      return { message: 'Formation likée', liked: true };
    }
  }

  async getLikes(formationId: number) {
    // Vérifier que la formation existe
    await this.findOne(formationId);

    const likes = await this.prisma.like.findMany({
      where: { formationId },
      include: {
        user: {
          select: {
            id: true,
            nom: true,
            prenom: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return {
      count: likes.length,
      likes: likes
    };
  }

  async getUserLikes(userId: number) {
    const likes = await this.prisma.like.findMany({
      where: { userId },
      select: {
        formationId: true
      }
    });

    return likes.map(like => like.formationId);
  }

  // Méthodes pour les commentaires
  async addComment(formationId: number, userId: number, content: string) {
    // Vérifier que la formation existe
    await this.findOne(formationId);

    const comment = await this.prisma.comment.create({
      data: {
        content,
        userId,
        formationId,
        updatedAt: new Date()
      },
      include: {
        user: {
          select: {
            id: true,
            nom: true,
            prenom: true
          }
        }
      }
    });

    return comment;
  }

  async getComments(formationId: number) {
    // Vérifier que la formation existe
    await this.findOne(formationId);

    const comments = await this.prisma.comment.findMany({
      where: { formationId },
      include: {
        user: {
          select: {
            id: true,
            nom: true,
            prenom: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return comments;
  }

  async deleteComment(commentId: number, userId: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
      include: {
        user: {
          select: {
            id: true,
            role: true
          }
        }
      }
    });

    if (!comment) {
      throw new NotFoundException(`Commentaire avec l'ID ${commentId} non trouvé`);
    }

    // Vérifier que l'utilisateur est le propriétaire du commentaire ou admin
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });

    if (comment.userId !== userId && user?.role !== 'admin') {
      throw new BadRequestException('Vous n\'avez pas le droit de supprimer ce commentaire');
    }

    await this.prisma.comment.delete({
      where: { id: commentId }
    });

    return { message: 'Commentaire supprimé avec succès' };
  }

  // Méthode modifiée pour inclure les likes et commentaires
  async findActiveWithEngagement() {
    return this.prisma.formation.findMany({
      where: {
        statut: 'active',
        dateDebut: {
          gte: new Date()
        }
      },
      include: {
        inscription: {
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
        },
        like: {
          include: {
            user: {
              select: {
                id: true,
                nom: true,
                prenom: true
              }
            }
          }
        },
        comment: {
          include: {
            user: {
              select: {
                id: true,
                nom: true,
                prenom: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      },
      orderBy: {
        dateDebut: 'asc'
      }
    });
  }

  // Méthode pour créer un utilisateur anonyme temporaire
  async createAnonymousUser(req: Request, authorName?: string) {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';
    
    // Créer un hash unique basé sur IP et User-Agent
    const anonymousId = `anon_${Buffer.from(ip + userAgent).toString('base64').slice(0, 16)}`;
    
    // Vérifier si cet utilisateur anonyme existe déjà
    const existingUser = await this.prisma.user.findUnique({
      where: { email: `${anonymousId}@anonymous.temp` }
    });
    
    if (existingUser) {
      return existingUser.id;
    }
    
    // Créer un nouvel utilisateur anonyme
    const anonymousUser = await this.prisma.user.create({
      data: {
        nom: authorName || 'Utilisateur',
        prenom: 'Anonyme',
        email: `${anonymousId}@anonymous.temp`,
        motDePasse: 'anonymous_temp_password',
        numRegistreCommerce: `ANON_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        secteurActivite: 'Non spécifié',
        telephone: 'Non renseigné',
        adresse: 'Non renseignée',
        role: 'anonymous',
        updatedAt: new Date()
      }
    });
    
    return anonymousUser.id;
  }
}
