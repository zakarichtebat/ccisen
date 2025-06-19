import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAvisDto, UpdateAvisDto } from './dto/avis.dto';

@Injectable()
export class AvisService {
  constructor(private prisma: PrismaService) {}

  // Créer un nouvel avis
  async create(createAvisDto: CreateAvisDto, userId: number) {
    return this.prisma.avis.create({
      data: {
        ...createAvisDto,
        userId,
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
  }

  // Récupérer tous les avis (avec filtres optionnels)
  async findAll(filters?: {
    typeService?: string;
    statut?: string;
    visible?: boolean;
    userId?: number;
    limit?: number;
    offset?: number;
  }) {
    try {
      console.log('Service findAll - Filtres reçus:', filters);
      
      const where: any = {};
      
      if (filters?.typeService) where.typeService = filters.typeService;
      if (filters?.statut) where.statut = filters.statut;
      if (filters?.visible !== undefined) where.visible = filters.visible;
      if (filters?.userId) where.userId = filters.userId;

      console.log('Service findAll - Clause WHERE:', where);

      const result = await this.prisma.avis.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              nom: true,
              prenom: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: filters?.limit || 50,
        skip: filters?.offset || 0,
      });

      console.log(`Service findAll - ${result.length} avis trouvés`);
      return result;
    } catch (error) {
      console.error('Erreur dans service findAll:', error);
      throw error;
    }
  }

  // Récupérer un avis par ID
  async findOne(id: number) {
    return this.prisma.avis.findUnique({
      where: { id },
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

  // Mettre à jour un avis
  async update(id: number, updateAvisDto: UpdateAvisDto, userId?: number) {
    // Vérifier si l'utilisateur peut modifier cet avis
    if (userId) {
      const avis = await this.prisma.avis.findUnique({
        where: { id },
        select: { userId: true },
      });
      
      if (!avis || avis.userId !== userId) {
        throw new Error('Vous n\'êtes pas autorisé à modifier cet avis');
      }
    }

    return this.prisma.avis.update({
      where: { id },
      data: updateAvisDto,
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

  // Supprimer un avis (soft delete)
  async remove(id: number, userId?: number) {
    // Vérifier si l'utilisateur peut supprimer cet avis
    if (userId) {
      const avis = await this.prisma.avis.findUnique({
        where: { id },
        select: { userId: true },
      });
      
      if (!avis || avis.userId !== userId) {
        throw new Error('Vous n\'êtes pas autorisé à supprimer cet avis');
      }
    }

    return this.prisma.avis.update({
      where: { id },
      data: { 
        statut: 'supprime',
        visible: false,
      },
    });
  }

  // Masquer/Afficher un avis (admin uniquement)
  async toggleVisibility(id: number) {
    const avis = await this.prisma.avis.findUnique({
      where: { id },
      select: { visible: true },
    });

    if (!avis) {
      throw new Error('Avis non trouvé');
    }

    return this.prisma.avis.update({
      where: { id },
      data: { visible: !avis.visible },
    });
  }

  // Statistiques des avis
  async getStats() {
    const stats = await this.prisma.avis.groupBy({
      by: ['typeService', 'note'],
      _count: {
        id: true,
      },
      where: {
        statut: 'actif',
        visible: true,
      },
    });

    const totalAvis = await this.prisma.avis.count({
      where: {
        statut: 'actif',
        visible: true,
      },
    });

    const moyenneNote = await this.prisma.avis.aggregate({
      _avg: {
        note: true,
      },
      where: {
        statut: 'actif',
        visible: true,
        note: {
          gt: 0,
        },
      },
    });

    return {
      totalAvis,
      moyenneNote: moyenneNote._avg.note || 0,
      repartitionParService: stats,
    };
  }
} 