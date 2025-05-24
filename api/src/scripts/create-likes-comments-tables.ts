import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createTables() {
  try {
    console.log('Création des tables Like et Comment...');

    // Créer la table Like
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS \`Like\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`userId\` int NOT NULL,
        \`formationId\` int NOT NULL,
        \`createdAt\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        PRIMARY KEY (\`id\`),
        UNIQUE KEY \`Like_userId_formationId_key\` (\`userId\`,\`formationId\`),
        KEY \`Like_userId_fkey\` (\`userId\`),
        KEY \`Like_formationId_fkey\` (\`formationId\`),
        CONSTRAINT \`Like_formationId_fkey\` FOREIGN KEY (\`formationId\`) REFERENCES \`Formation\` (\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE,
        CONSTRAINT \`Like_userId_fkey\` FOREIGN KEY (\`userId\`) REFERENCES \`User\` (\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    console.log('Table Like créée avec succès');

    // Créer la table Comment
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS \`Comment\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`content\` text COLLATE utf8mb4_unicode_ci NOT NULL,
        \`userId\` int NOT NULL,
        \`formationId\` int NOT NULL,
        \`createdAt\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        \`updatedAt\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
        PRIMARY KEY (\`id\`),
        KEY \`Comment_userId_fkey\` (\`userId\`),
        KEY \`Comment_formationId_fkey\` (\`formationId\`),
        CONSTRAINT \`Comment_formationId_fkey\` FOREIGN KEY (\`formationId\`) REFERENCES \`Formation\` (\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE,
        CONSTRAINT \`Comment_userId_fkey\` FOREIGN KEY (\`userId\`) REFERENCES \`User\` (\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    console.log('Table Comment créée avec succès');

    console.log('Toutes les tables ont été créées avec succès !');
  } catch (error) {
    console.error('Erreur lors de la création des tables:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTables(); 