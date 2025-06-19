import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    nom: string;
    prenom: string;
    email: string;
    motDePasse: string;
    numRegistreCommerce: string;
    secteurActivite: string;
    telephone: string;
    adresse: string;
    role?: string;
  }) {
    // Hacher le mot de passe avant de l'enregistrer
    const hashedPassword = await bcrypt.hash(data.motDePasse, 10);
    
    const userData = {
      ...data,
      motDePasse: hashedPassword,
      role: data.role || 'client',
      status: 'actif',
      updatedAt: new Date()
    };

    const user = await this.prisma.user.create({ 
      data: userData
    });

    // Retourner l'utilisateur sans le mot de passe
    const { motDePasse, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          nom: true,
          prenom: true,
          email: true,
          numRegistreCommerce: true,
          secteurActivite: true,
          telephone: true,
          adresse: true,
          role: true,
          status: true,
          createdAt: true,
          updatedAt: true
        }
      }),
      this.prisma.user.count()
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ 
      where: { id },
      select: {
        id: true,
        nom: true,
        prenom: true,
        email: true,
        numRegistreCommerce: true,
        secteurActivite: true,
        telephone: true,
        adresse: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async getAdminStats() {
    const [totalUsers, activeUsers, inactiveUsers, blockedUsers, newUsersThisWeek] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { status: 'actif' } }),
      this.prisma.user.count({ where: { status: 'inactif' } }),
      this.prisma.user.count({ where: { status: 'bloque' } }),
      this.prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      })
    ]);

    const roleStats = await this.prisma.user.groupBy({
      by: ['role'],
      _count: { role: true }
    });

    return {
      totalUsers,
      activeUsers,
      inactiveUsers,
      blockedUsers,
      newUsersThisWeek,
      roleStats,
      statusStats: {
        actif: activeUsers,
        inactif: inactiveUsers,
        bloque: blockedUsers
      }
    };
  }

  async searchUsers(params: {
    search?: string;
    role?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) {
    const { search, role, status, page = 1, limit = 10 } = params;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { nom: { contains: search, mode: 'insensitive' } },
        { prenom: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { secteurActivite: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (role) {
      where.role = role;
    }

    if (status) {
      where.status = status;
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          nom: true,
          prenom: true,
          email: true,
          numRegistreCommerce: true,
          secteurActivite: true,
          telephone: true,
          adresse: true,
          role: true,
          status: true,
          createdAt: true,
          updatedAt: true
        }
      }),
      this.prisma.user.count({ where })
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async updateUserRole(id: number, role: string) {
    const validRoles = ['admin', 'client', 'moderateur'];
    
    if (!validRoles.includes(role)) {
      throw new Error(`Rôle invalide. Rôles autorisés : ${validRoles.join(', ')}`);
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: { 
        role,
        updatedAt: new Date()
      },
      select: {
        id: true,
        nom: true,
        prenom: true,
        email: true,
        role: true,
        status: true,
        updatedAt: true
      }
    });

    return user;
  }

  async updateUserStatus(id: number, status: string) {
    const validStatuses = ['actif', 'inactif', 'bloque'];
    
    if (!validStatuses.includes(status)) {
      throw new Error(`Statut invalide. Statuts autorisés : ${validStatuses.join(', ')}`);
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: { 
        status,
        updatedAt: new Date()
      },
      select: {
        id: true,
        nom: true,
        prenom: true,
        email: true,
        role: true,
        status: true,
        updatedAt: true
      }
    });

    return user;
  }

  async update(id: number, data: {
    nom?: string;
    prenom?: string;
    email?: string;
    motDePasse?: string;
    currentPassword?: string;
    numRegistreCommerce?: string;
    secteurActivite?: string;
    telephone?: string;
    adresse?: string;
    role?: string;
  }) {
    // Créer une copie des données sans currentPassword pour l'update
    const { currentPassword, ...updateData } = data;
    
    // Si un nouveau mot de passe est fourni, le valider et le hacher
    if (data.motDePasse) {
      // Récupérer l'utilisateur actuel pour vérifier le mot de passe
      const currentUser = await this.prisma.user.findUnique({ where: { id } });
      if (!currentUser) {
        throw new Error('Utilisateur non trouvé');
      }
      
      // Vérifier le mot de passe actuel si fourni
      if (currentPassword) {
        const isPasswordValid = await bcrypt.compare(currentPassword, currentUser.motDePasse);
        if (!isPasswordValid) {
          throw new Error('Mot de passe actuel incorrect');
        }
      }
      
      // Hacher le nouveau mot de passe
      updateData.motDePasse = await bcrypt.hash(data.motDePasse, 10);
    }
    
    // Ajouter updatedAt
    (updateData as any).updatedAt = new Date();
    
    // Effectuer la mise à jour
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        nom: true,
        prenom: true,
        email: true,
        numRegistreCommerce: true,
        secteurActivite: true,
        telephone: true,
        adresse: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    return updatedUser;
  }

  async remove(id: number) {
    const user = await this.prisma.user.delete({ 
      where: { id },
      select: {
        id: true,
        nom: true,
        prenom: true,
        email: true
      }
    });
    
    return { message: 'Utilisateur supprimé avec succès', user };
  }

  async exportUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        nom: true,
        prenom: true,
        email: true,
        numRegistreCommerce: true,
        secteurActivite: true,
        telephone: true,
        adresse: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: { createdAt: 'desc' }
    });

    // Générer le CSV
    const csvHeaders = [
      'ID',
      'Nom',
      'Prénom',
      'Email',
      'Numéro RC',
      'Secteur d\'activité',
      'Téléphone',
      'Adresse',
      'Rôle',
      'Statut',
      'Date création',
      'Dernière modification'
    ];

    const csvRows = users.map(user => [
      user.id,
      user.nom,
      user.prenom,
      user.email,
      user.numRegistreCommerce,
      user.secteurActivite,
      user.telephone,
      user.adresse,
      user.role,
      user.status,
      user.createdAt.toISOString().split('T')[0],
      user.updatedAt.toISOString().split('T')[0]
    ]);

    const csvContent = [
      csvHeaders.join(','),
      ...csvRows.map(row => row.map(field => `"${field}"`).join(','))
    ].join('\n');

    return {
      filename: `utilisateurs-export-${new Date().toISOString().split('T')[0]}.csv`,
      content: csvContent,
      count: users.length
    };
  }
}