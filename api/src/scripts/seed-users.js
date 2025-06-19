const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function seedUsers() {
  try {
    console.log('🌱 Ajout d\'utilisateurs de test...');

    // Vérifier si des utilisateurs existent déjà
    const existingUsers = await prisma.user.count();
    if (existingUsers > 0) {
      console.log(`ℹ️ ${existingUsers} utilisateurs déjà présents dans la base`);
      return;
    }

    // Créer des utilisateurs de test
    const testUsers = [
      {
        nom: 'Admin',
        prenom: 'Super',
        email: 'admin@ccisn.ma',
        motDePasse: await bcrypt.hash('admin123', 10),
        numRegistreCommerce: 'RC000001',
        secteurActivite: 'Administration',
        telephone: '+212 522-123-456',
        adresse: 'Centre CCISN, Casablanca',
        role: 'admin',
        status: 'actif'
      },
      {
        nom: 'Alami',
        prenom: 'Ahmed',
        email: 'ahmed.alami@example.com',
        motDePasse: await bcrypt.hash('password123', 10),
        numRegistreCommerce: 'RC123456',
        secteurActivite: 'Import/Export',
        telephone: '+212 661-234-567',
        adresse: '123 Bd Mohammed V, Casablanca',
        role: 'client',
        status: 'actif'
      },
      {
        nom: 'Benali',
        prenom: 'Fatima',
        email: 'fatima.benali@example.com',
        motDePasse: await bcrypt.hash('password123', 10),
        numRegistreCommerce: 'RC789012',
        secteurActivite: 'Textile',
        telephone: '+212 662-345-678',
        adresse: '456 Rue des Entrepreneurs, Rabat',
        role: 'client',
        status: 'actif'
      },
      {
        nom: 'Moderateur',
        prenom: 'Test',
        email: 'moderateur@ccisn.ma',
        motDePasse: await bcrypt.hash('mod123', 10),
        numRegistreCommerce: 'RC000002',
        secteurActivite: 'Modération',
        telephone: '+212 522-987-654',
        adresse: 'Centre CCISN, Casablanca',
        role: 'moderateur',
        status: 'actif'
      },
      {
        nom: 'Inactive',
        prenom: 'User',
        email: 'inactive@example.com',
        motDePasse: await bcrypt.hash('password123', 10),
        numRegistreCommerce: 'RC999999',
        secteurActivite: 'Test',
        telephone: '+212 663-456-789',
        adresse: 'Adresse test',
        role: 'client',
        status: 'inactif'
      },
      {
        nom: 'Bloque',
        prenom: 'User',
        email: 'bloque@example.com',
        motDePasse: await bcrypt.hash('password123', 10),
        numRegistreCommerce: 'RC888888',
        secteurActivite: 'Test',
        telephone: '+212 664-567-890',
        adresse: 'Adresse test',
        role: 'client',
        status: 'bloque'
      }
    ];

    // Insérer les utilisateurs un par un
    for (const userData of testUsers) {
      try {
        await prisma.user.create({
          data: {
            ...userData,
            updatedAt: new Date()
          }
        });
        console.log(`✅ Utilisateur créé: ${userData.prenom} ${userData.nom} (${userData.role})`);
      } catch (error) {
        console.error(`❌ Erreur lors de la création de ${userData.email}:`, error.message);
      }
    }

    console.log('🎉 Utilisateurs de test ajoutés avec succès!');
    console.log('\n📋 Comptes de test disponibles:');
    console.log('👤 Admin: admin@ccisn.ma / admin123');
    console.log('👤 Modérateur: moderateur@ccisn.ma / mod123');
    console.log('👤 Client: ahmed.alami@example.com / password123');
    console.log('👤 Client: fatima.benali@example.com / password123');

  } catch (error) {
    console.error('❌ Erreur lors de l\'ajout des utilisateurs:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter le script si appelé directement
if (require.main === module) {
  seedUsers();
}

module.exports = { seedUsers }; 