import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedData() {
  try {
    console.log('🌱 Création des données de démonstration...');

    // Vérifier s'il y a déjà des services
    const existingServices = await prisma.service.findMany();
    
    let services;
    
    if (existingServices.length === 0) {
      // Créer des services de démonstration
      console.log('📋 Création des services...');
      services = await Promise.all([
        prisma.service.create({
          data: {
            nom: 'Consultation juridique',
            description: 'Conseil juridique pour votre entreprise',
            duree: 60
          }
        }),
        prisma.service.create({
          data: {
            nom: 'Aide à la création d\'entreprise',
            description: 'Accompagnement dans la création de votre société',
            duree: 90
          }
        }),
        prisma.service.create({
          data: {
            nom: 'Formation commerciale',
            description: 'Formation pour développer vos compétences commerciales',
            duree: 120
          }
        }),
        prisma.service.create({
          data: {
            nom: 'Audit comptable',
            description: 'Audit de vos comptes et conseils financiers',
            duree: 180
          }
        })
      ]);
      
      console.log(`✅ ${services.length} services créés`);
    } else {
      services = existingServices;
      console.log(`📋 ${services.length} services existants trouvés`);
    }

    // Récupérer tous les utilisateurs
    const users = await prisma.user.findMany();
    console.log(`👥 ${users.length} utilisateurs trouvés`);

    if (users.length === 0) {
      console.log('❌ Aucun utilisateur trouvé. Veuillez d\'abord créer des utilisateurs.');
      return;
    }

    // Vérifier s'il y a déjà des rendez-vous
    const existingAppointments = await prisma.rendezVous.findMany();
    
    if (existingAppointments.length === 0) {
      console.log('📅 Création des rendez-vous de démonstration...');
      
      // Créer des rendez-vous de démonstration
      const appointments: any[] = [];
      
      // Dates pour les rendez-vous (dans le futur)
      const dates = [
        new Date('2025-05-26'),
        new Date('2025-05-27'),
        new Date('2025-05-28'),
        new Date('2025-05-29'),
        new Date('2025-05-30'),
        new Date('2025-06-02'),
        new Date('2025-06-03'),
      ];
      
      const heures = ['09:00', '10:30', '14:00', '15:30', '16:00'];
      const statuses = ['en_attente', 'confirmé', 'en_attente', 'confirmé', 'en_attente'];
      const notes = [
        'Besoin urgent de conseils juridiques',
        'Première consultation pour création SARL',
        'Formation équipe commerciale - 5 personnes',
        'Audit annuel obligatoire',
        'Consultation de suivi',
        'Nouvelle demande de formation',
        'Rendez-vous de contrôle comptable'
      ];

      for (let i = 0; i < Math.min(dates.length, users.length, services.length); i++) {
        const appointment = await prisma.rendezVous.create({
          data: {
            date: dates[i],
            heure: heures[i % heures.length],
            status: statuses[i % statuses.length],
            notes: notes[i],
            userId: users[i % users.length].id,
            serviceId: services[i % services.length].id
          }
        });
        
        appointments.push(appointment);
      }
      
      // Créer quelques rendez-vous supplémentaires avec d'autres utilisateurs
      for (let i = 0; i < 3; i++) {
        const appointment = await prisma.rendezVous.create({
          data: {
            date: dates[(i + 3) % dates.length],
            heure: heures[(i + 2) % heures.length],
            status: ['en_attente', 'confirmé', 'annulé'][i],
            notes: `Rendez-vous supplémentaire ${i + 1}`,
            userId: users[Math.min(i + 1, users.length - 1)].id,
            serviceId: services[(i + 1) % services.length].id
          }
        });
        
        appointments.push(appointment);
      }

      console.log(`✅ ${appointments.length} rendez-vous créés`);
    } else {
      console.log(`📅 ${existingAppointments.length} rendez-vous existants trouvés`);
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
    console.error('❌ Erreur lors de la création des données de démonstration:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedData(); 