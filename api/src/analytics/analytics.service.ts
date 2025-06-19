import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getDashboardAnalytics(periodDays: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - periodDays);

    const [
      totalUsers,
      activeUsers,
      newUsers,
      usersByRole,
      usersByStatus,
      userGrowth,
      activityStats
    ] = await Promise.all([
      // Total des utilisateurs
      this.prisma.user.count(),
      
      // Utilisateurs actifs
      this.prisma.user.count({ where: { status: 'actif' } }),
      
      // Nouveaux utilisateurs dans la période
      this.prisma.user.count({
        where: {
          createdAt: { gte: startDate }
        }
      }),
      
      // Répartition par rôle
      this.prisma.user.groupBy({
        by: ['role'],
        _count: { role: true }
      }),
      
      // Répartition par statut
      this.prisma.user.groupBy({
        by: ['status'],
        _count: { status: true }
      }),
      
      // Croissance des utilisateurs (par jour)
      this.getUserGrowthData(periodDays),
      
      // Statistiques d'activité (secteurs les plus représentés)
      this.getActivityStats()
    ]);

    return {
      totalUsers,
      activeUsers,
      newUsers,
      inactiveUsers: totalUsers - activeUsers,
      usersByRole: usersByRole.reduce((acc, item) => {
        acc[item.role] = item._count.role;
        return acc;
      }, {}),
      usersByStatus: usersByStatus.reduce((acc, item) => {
        acc[item.status] = item._count.status;
        return acc;
      }, {}),
      userGrowth,
      activityStats,
      period: periodDays,
      generatedAt: new Date().toISOString()
    };
  }

  async getUserAnalytics(periodDays: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - periodDays);

    const [
      totalUsers,
      newUsers,
      activeUsers,
      inactiveUsers,
      blockedUsers,
      usersByRole,
      topSectors,
      recentUsers
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({
        where: { createdAt: { gte: startDate } }
      }),
      this.prisma.user.count({
        where: { status: 'actif' }
      }),
      this.prisma.user.count({
        where: { status: 'inactif' }
      }),
      this.prisma.user.count({
        where: { status: 'bloque' }
      }),
      this.prisma.user.groupBy({
        by: ['role'],
        _count: { role: true },
        orderBy: { _count: { role: 'desc' } }
      }),
      this.prisma.user.groupBy({
        by: ['secteurActivite'],
        _count: { secteurActivite: true },
        orderBy: { _count: { secteurActivite: 'desc' } },
        take: 5
      }),
      this.prisma.user.findMany({
        where: { createdAt: { gte: startDate } },
        orderBy: { createdAt: 'desc' },
        take: 10,
        select: {
          id: true,
          nom: true,
          prenom: true,
          email: true,
          role: true,
          status: true,
          secteurActivite: true,
          createdAt: true
        }
      })
    ]);

    return {
      summary: {
        totalUsers,
        newUsers,
        activeUsers,
        inactiveUsers,
        blockedUsers,
        growthRate: totalUsers > 0 ? ((newUsers / totalUsers) * 100).toFixed(2) : 0
      },
      distribution: {
        byRole: usersByRole,
        topSectors: topSectors
      },
      recentUsers,
      period: periodDays
    };
  }

  async getActivityAnalytics(periodDays: number = 7) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - periodDays);

    const dailyStats = await this.getDailyUserStats(periodDays);
    const sectorStats = await this.getSectorStats();
    const statusChanges = await this.getStatusChangeStats(periodDays);

    return {
      dailyStats,
      sectorStats,
      statusChanges,
      period: periodDays
    };
  }

  async getChartData(periodDays: number = 7) {
    const dailyData = await this.getDailyUserStats(periodDays);
    const roleData = await this.prisma.user.groupBy({
      by: ['role'],
      _count: { role: true }
    });
    const statusData = await this.prisma.user.groupBy({
      by: ['status'],
      _count: { status: true }
    });

    return {
      dailyRegistrations: dailyData,
      roleDistribution: roleData.map(item => ({
        role: item.role,
        count: item._count.role
      })),
      statusDistribution: statusData.map(item => ({
        status: item.status,
        count: item._count.status
      })),
      period: periodDays
    };
  }

  async getRealTimeStats() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      totalUsers,
      todayUsers,
      weekUsers,
      monthUsers,
      activeUsers,
      onlineUsers,
      recentActivity
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({
        where: { createdAt: { gte: today } }
      }),
      this.prisma.user.count({
        where: { createdAt: { gte: thisWeek } }
      }),
      this.prisma.user.count({
        where: { createdAt: { gte: thisMonth } }
      }),
      this.prisma.user.count({
        where: { status: 'actif' }
      }),
      // Simulation d'utilisateurs "en ligne" (créés dans les dernières 24h)
      this.prisma.user.count({
        where: {
          updatedAt: { gte: new Date(now.getTime() - 24 * 60 * 60 * 1000) }
        }
      }),
      this.prisma.user.findMany({
        orderBy: { updatedAt: 'desc' },
        take: 5,
        select: {
          id: true,
          nom: true,
          prenom: true,
          email: true,
          role: true,
          status: true,
          updatedAt: true
        }
      })
    ]);

    return {
      totalUsers,
      todayUsers,
      weekUsers,
      monthUsers,
      activeUsers,
      onlineUsers,
      recentActivity,
      timestamp: now.toISOString()
    };
  }

  private async getUserGrowthData(periodDays: number) {
    const data: Array<{date: string, count: number, label: string}> = [];
    const today = new Date();
    
    for (let i = periodDays - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);
      
      const count = await this.prisma.user.count({
        where: {
          createdAt: {
            gte: date,
            lt: nextDate
          }
        }
      });
      
      data.push({
        date: date.toISOString().split('T')[0],
        count,
        label: this.formatDateLabel(date)
      });
    }
    
    return data;
  }

  private async getDailyUserStats(periodDays: number) {
    const data: Array<{date: string, newUsers: number, totalUsers: number, label: string}> = [];
    const today = new Date();
    
    for (let i = periodDays - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);
      
      const [newUsers, totalUsers] = await Promise.all([
        this.prisma.user.count({
          where: {
            createdAt: {
              gte: date,
              lt: nextDate
            }
          }
        }),
        this.prisma.user.count({
          where: {
            createdAt: { lte: nextDate }
          }
        })
      ]);
      
      data.push({
        date: date.toISOString().split('T')[0],
        newUsers,
        totalUsers,
        label: this.formatDateLabel(date)
      });
    }
    
    return data;
  }

  private async getSectorStats() {
    return this.prisma.user.groupBy({
      by: ['secteurActivite'],
      _count: { secteurActivite: true },
      orderBy: { _count: { secteurActivite: 'desc' } },
      take: 10
    });
  }

  private async getStatusChangeStats(periodDays: number) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - periodDays);

    // Simulation des changements de statut (basé sur updatedAt)
    const recentUpdates = await this.prisma.user.findMany({
      where: {
        updatedAt: { gte: startDate }
      },
      select: {
        status: true,
        updatedAt: true
      }
    });

    const statusChanges = recentUpdates.reduce((acc, user) => {
      const date = user.updatedAt.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { actif: 0, inactif: 0, bloque: 0 };
      }
      acc[date][user.status]++;
      return acc;
    }, {} as Record<string, { actif: number, inactif: number, bloque: number }>);

    return Object.entries(statusChanges).map(([date, counts]) => ({
      date,
      actif: counts.actif,
      inactif: counts.inactif,
      bloque: counts.bloque
    }));
  }

  private async getActivityStats() {
    const [
      totalActivities,
      sectorDistribution,
      roleDistribution
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.groupBy({
        by: ['secteurActivite'],
        _count: { secteurActivite: true },
        orderBy: { _count: { secteurActivite: 'desc' } },
        take: 5
      }),
      this.prisma.user.groupBy({
        by: ['role'],
        _count: { role: true }
      })
    ]);

    return {
      totalActivities,
      sectorDistribution,
      roleDistribution
    };
  }

  private formatDateLabel(date: Date): string {
    const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
    
    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
  }
} 