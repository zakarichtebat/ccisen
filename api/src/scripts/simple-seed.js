const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedData() {
  try {
    console.log('🌱 Création des données de démonstration...');

    // Créer des services s'ils n'existent pas
    const existingServices = await prisma.service.findMany();
    
    if (existingServices.length === 0) {
      console.log('📋 Création des services...');
      
      await prisma.service.createMany({
        data: [
          {
            nom: 'Consultation juridique',
            description: 'Conseil juridique pour votre entreprise',
            duree: 60
          },
          {
            nom: 'Aide à la création d\'entreprise',
            description: 'Accompagnement dans la création de votre société',
            duree: 90
          },
          {
            nom: 'Formation commerciale',
            description: 'Formation pour développer vos compétences commerciales',
            duree: 120
          },
          {
            nom: 'Audit comptable',
            description: 'Audit de vos comptes et conseils financiers',
            duree: 180
          }
        ]
      });
      
      console.log('✅ Services créés');
    }

    // Récupérer les services et utilisateurs
    const services = await prisma.service.findMany();
    const users = await prisma.user.findMany();
    
    console.log(`📋 ${services.length} services trouvés`);
    console.log(`👥 ${users.length} utilisateurs trouvés`);

    if (users.length === 0) {
      console.log('❌ Aucun utilisateur trouvé.');
      return;
    }

    // Créer des rendez-vous s'ils n'existent pas
    const existingAppointments = await prisma.rendezVous.findMany();
    
    if (existingAppointments.length === 0) {
      console.log('📅 Création des rendez-vous de démonstration...');
      
      await prisma.rendezVous.createMany({
        data: [
          {
            date: new Date('2025-05-26'),
            heure: '09:00',
            status: 'en_attente',
            notes: 'Consultation urgente pour conseils juridiques',
            userId: users[0].id,
            serviceId: services[0].id
          },
          {
            date: new Date('2025-05-27'),
            heure: '10:30',
            status: 'confirmé',
            notes: 'Première consultation pour création SARL',
            userId: users[Math.min(1, users.length - 1)].id,
            serviceId: services[Math.min(1, services.length - 1)].id
          },
          {
            date: new Date('2025-05-28'),
            heure: '14:00',
            status: 'en_attente',
            notes: 'Formation équipe commerciale - 5 personnes',
            userId: users[0].id,
            serviceId: services[Math.min(2, services.length - 1)].id
          },
          {
            date: new Date('2025-05-29'),
            heure: '15:30',
            status: 'confirmé',
            notes: 'Audit annuel obligatoire',
            userId: users[Math.min(1, users.length - 1)].id,
            serviceId: services[Math.min(3, services.length - 1)].id
          },
          {
            date: new Date('2025-05-30'),
            heure: '16:00',
            status: 'annulé',
            notes: 'Rendez-vous annulé par le client',
            userId: users[0].id,
            serviceId: services[0].id
          }
        ]
      });
      
      console.log('✅ Rendez-vous créés');
    }

    // Afficher un résumé
    const summary = await prisma.rendezVous.findMany({
      include: {
        user: {
          select: {
            nom: true,
            prenom: true,
            email: true
          }
        },
        service: {
          select: {
            nom: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log('\n📊 Résumé des rendez-vous:');
    console.table(summary.map(rv => ({
      id: rv.id,
      date: rv.date.toISOString().split('T')[0],
      heure: rv.heure,
      status: rv.status,
      client: `${rv.user.prenom} ${rv.user.nom}`,
      service: rv.service.nom
    })));

    console.log('\n🎉 Données de démonstration créées avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedData(); 