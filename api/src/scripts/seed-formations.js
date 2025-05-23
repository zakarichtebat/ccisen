const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedFormations() {
  try {
    console.log('🎓 Création des formations de démonstration...');

    // Créer des formations s'il n'en existe pas
    const existingFormations = await prisma.formation.findMany();
    
    if (existingFormations.length === 0) {
      console.log('📚 Création des formations...');
      
      const formations = await Promise.all([
        prisma.formation.create({
          data: {
            titre: 'Marketing Digital Avancé',
            description: 'Formation complète sur les stratégies de marketing digital, incluant les réseaux sociaux, SEO, SEM et l\'analyse de données.',
            dateDebut: new Date('2025-06-15'),
            dateFin: new Date('2025-06-17'),
            heureDebut: '09:00',
            heureFin: '17:00',
            lieu: 'Centre de formation CCISN - Salle A',
            maxParticipants: 15,
            prix: 750,
            statut: 'active'
          }
        }),
        prisma.formation.create({
          data: {
            titre: 'Gestion de Projet Agile',
            description: 'Apprenez les méthodologies Scrum et Kanban pour gérer efficacement vos projets d\'entreprise.',
            dateDebut: new Date('2025-07-01'),
            dateFin: new Date('2025-07-02'),
            heureDebut: '09:30',
            heureFin: '16:30',
            lieu: 'Centre de formation CCISN - Salle B',
            maxParticipants: 12,
            prix: 450,
            statut: 'active'
          }
        }),
        prisma.formation.create({
          data: {
            titre: 'Comptabilité et Fiscalité pour PME',
            description: 'Formation pratique sur la comptabilité, la fiscalité et la gestion financière adaptée aux PME.',
            dateDebut: new Date('2025-06-30'),
            dateFin: new Date('2025-07-01'),
            heureDebut: '08:30',
            heureFin: '17:30',
            lieu: 'Centre de formation CCISN - Salle C',
            maxParticipants: 20,
            prix: 600,
            statut: 'active'
          }
        }),
        prisma.formation.create({
          data: {
            titre: 'Leadership et Management d\'Équipe',
            description: 'Développez vos compétences en leadership et apprenez à manager efficacement vos équipes.',
            dateDebut: new Date('2025-07-15'),
            dateFin: new Date('2025-07-16'),
            heureDebut: '09:00',
            heureFin: '18:00',
            lieu: 'Hôtel des Congrès - Salle Panorama',
            maxParticipants: 18,
            prix: 800,
            statut: 'active'
          }
        }),
        prisma.formation.create({
          data: {
            titre: 'Initiation à l\'Entrepreneuriat',
            description: 'Formation gratuite pour découvrir les bases de l\'entrepreneuriat et créer son business plan.',
            dateDebut: new Date('2025-06-20'),
            dateFin: new Date('2025-06-20'),
            heureDebut: '14:00',
            heureFin: '18:00',
            lieu: 'Espace Coworking CCISN',
            maxParticipants: 25,
            prix: 0,
            statut: 'active'
          }
        })
      ]);
      
      console.log(`✅ ${formations.length} formations créées`);
      
      // Récupérer quelques utilisateurs pour créer des inscriptions de démonstration
      const users = await prisma.user.findMany({
        where: {
          role: 'client'
        },
        take: 4
      });
      
      if (users.length > 0) {
        console.log('👥 Création d\'inscriptions de démonstration...');
        
        // Créer quelques inscriptions de démonstration
        await Promise.all([
          // Formation Marketing Digital - 3 inscrits
          prisma.inscription.create({
            data: {
              userId: users[0].id,
              formationId: formations[0].id,
              statut: 'confirmé',
              notes: 'Très intéressé par la partie SEO'
            }
          }),
          prisma.inscription.create({
            data: {
              userId: users[1].id,
              formationId: formations[0].id,
              statut: 'en_attente',
              notes: ''
            }
          }),
          prisma.inscription.create({
            data: {
              userId: users[2].id,
              formationId: formations[0].id,
              statut: 'confirmé',
              notes: ''
            }
          }),
          
          // Formation Gestion de Projet - 2 inscrits
          prisma.inscription.create({
            data: {
              userId: users[0].id,
              formationId: formations[1].id,
              statut: 'en_attente',
              notes: 'Équipe de 5 personnes à former'
            }
          }),
          prisma.inscription.create({
            data: {
              userId: users[3].id,
              formationId: formations[1].id,
              statut: 'confirmé',
              notes: ''
            }
          }),
          
          // Formation Entrepreneuriat - 5 inscrits (formation gratuite)
          prisma.inscription.create({
            data: {
              userId: users[1].id,
              formationId: formations[4].id,
              statut: 'confirmé',
              notes: 'Projet de création d\'une boutique en ligne'
            }
          }),
          prisma.inscription.create({
            data: {
              userId: users[2].id,
              formationId: formations[4].id,
              statut: 'confirmé',
              notes: ''
            }
          }),
          prisma.inscription.create({
            data: {
              userId: users[3].id,
              formationId: formations[4].id,
              statut: 'en_attente',
              notes: ''
            }
          })
        ]);
        
        console.log('✅ Inscriptions de démonstration créées');
      }
      
    } else {
      console.log(`📚 ${existingFormations.length} formations existantes trouvées`);
    }

    // Afficher un résumé
    const summary = await prisma.formation.findMany({
      include: {
        inscriptions: {
          include: {
            user: {
              select: {
                nom: true,
                prenom: true
              }
            }
          }
        }
      },
      orderBy: {
        dateDebut: 'asc'
      }
    });

    console.log('\n📊 Résumé des formations:');
    console.table(summary.map(formation => ({
      id: formation.id,
      titre: formation.titre,
      dateDebut: formation.dateDebut.toISOString().split('T')[0],
      participants: `${formation.inscriptions.length}/${formation.maxParticipants}`,
      prix: `${formation.prix}€`,
      statut: formation.statut
    })));

    console.log('\n🎉 Formations de démonstration créées avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedFormations(); 