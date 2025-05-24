import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanupAnonymousUsers() {
  try {
    console.log('Nettoyage des utilisateurs anonymes anciens...');

    // Supprimer les utilisateurs anonymes créés il y a plus de 30 jours
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // D'abord supprimer leurs likes et commentaires
    const anonymousUsers = await prisma.user.findMany({
      where: {
        role: 'anonymous',
        createdAt: {
          lt: thirtyDaysAgo
        }
      },
      select: { id: true }
    });

    const userIds = anonymousUsers.map(user => user.id);

    if (userIds.length > 0) {
      // Supprimer les likes
      await prisma.like.deleteMany({
        where: {
          userId: {
            in: userIds
          }
        }
      });

      // Supprimer les commentaires
      await prisma.comment.deleteMany({
        where: {
          userId: {
            in: userIds
          }
        }
      });

      // Supprimer les utilisateurs anonymes
      const deletedUsers = await prisma.user.deleteMany({
        where: {
          id: {
            in: userIds
          }
        }
      });

      console.log(`${deletedUsers.count} utilisateurs anonymes supprimés.`);
    } else {
      console.log('Aucun utilisateur anonyme ancien à supprimer.');
    }

  } catch (error) {
    console.error('Erreur lors du nettoyage:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanupAnonymousUsers(); 