const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createTestAvis() {
  try {
    console.log('🔍 Vérification de la connexion à la base de données...');
    
    // Vérifier la connexion
    await prisma.$connect();
    console.log('✅ Connexion à la base de données réussie');
    
    // Vérifier s'il y a des utilisateurs
    const users = await prisma.user.findMany({
      take: 5,
      select: {
        id: true,
        nom: true,
        prenom: true,
        email: true
      }
    });
    
    console.log(`📊 Utilisateurs trouvés: ${users.length}`);
    
    if (users.length === 0) {
      console.log('❌ Aucun utilisateur trouvé. Création d\'un utilisateur de test...');
      
      const testUser = await prisma.user.create({
        data: {
          nom: 'Test',
          prenom: 'Utilisateur',
          email: 'test@example.com',
          motDePasse: '$2b$10$hashedpassword', // Mot de passe hashé
          numRegistreCommerce: 'TEST123456',
          secteurActivite: 'Test',
          telephone: '0123456789',
          adresse: '123 Rue Test',
          role: 'client',
          status: 'actif'
        }
      });
      
      users.push(testUser);
      console.log('✅ Utilisateur de test créé');
    }
    
    // Vérifier les avis existants
    const existingAvis = await prisma.avis.count();
    console.log(`📝 Avis existants: ${existingAvis}`);
    
    // Créer des avis de test
    const avisToCreate = [
      {
        userId: users[0].id,
        sujet: 'Excellente formation entrepreneuriat',
        commentaire: 'Formation très complète et enrichissante. Les formateurs sont compétents et à l\'écoute. Je recommande vivement !',
        note: 5,
        typeService: 'formation',
        statut: 'actif',
        visible: true
      },
      {
        userId: users[0].id,
        sujet: 'Service rapide et efficace',
        commentaire: 'J\'ai obtenu mes certificats rapidement. Le processus est bien organisé et le personnel très professionnel.',
        note: 4,
        typeService: 'document',
        statut: 'actif',
        visible: true
      },
      {
        userId: users[0].id,
        sujet: 'Rendez-vous bien organisé',
        commentaire: 'Prise de rendez-vous simple et rapide. Personnel accueillant et professionnel. Très satisfait du service.',
        note: 5,
        typeService: 'rendez-vous',
        statut: 'actif',
        visible: true
      },
      {
        userId: users[0].id,
        sujet: 'Service client au top',
        commentaire: 'Équipe très réactive et à l\'écoute. Toutes mes questions ont été répondues rapidement.',
        note: 4,
        typeService: 'general',
        statut: 'actif',
        visible: true
      }
    ];
    
    console.log('🚀 Création des avis de test...');
    
    for (const avisData of avisToCreate) {
      try {
        const avis = await prisma.avis.create({
          data: avisData,
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
        });
        
        console.log(`✅ Avis créé: "${avis.sujet}" (ID: ${avis.id})`);
      } catch (error) {
        console.error(`❌ Erreur lors de la création de l'avis "${avisData.sujet}":`, error.message);
      }
    }
    
    // Vérifier le résultat
    const finalCount = await prisma.avis.count();
    console.log(`📊 Total des avis après création: ${finalCount}`);
    
    // Tester les statistiques
    console.log('📈 Test des statistiques...');
    const stats = await prisma.avis.aggregate({
      _count: { id: true },
      _avg: { note: true },
      where: {
        statut: 'actif',
        visible: true
      }
    });
    
    console.log('📊 Statistiques:');
    console.log(`   - Total avis: ${stats._count.id}`);
    console.log(`   - Note moyenne: ${stats._avg.note?.toFixed(1) || 0}`);
    
    // Tester la récupération des avis
    console.log('🔍 Test de récupération des avis...');
    const avisRecents = await prisma.avis.findMany({
      where: {
        statut: 'actif',
        visible: true
      },
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
      take: 6
    });
    
    console.log(`✅ ${avisRecents.length} avis récupérés avec succès`);
    
    avisRecents.forEach((avis, index) => {
      console.log(`   ${index + 1}. "${avis.sujet}" - ${avis.note}/5 étoiles (${avis.user.prenom} ${avis.user.nom})`);
    });
    
    console.log('🎉 Test terminé avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter le test
createTestAvis(); 