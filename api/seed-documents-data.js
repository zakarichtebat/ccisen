const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function seedDocumentsData() {
  try {
    console.log('🌱 Ajout des données de test pour le système de documents...\n')

    // 1. Créer des types de documents
    console.log('📋 Création des types de documents...')
    const typesDocuments = await Promise.all([
      prisma.typeDocument.upsert({
        where: { id: 1 },
        update: {},
        create: {
          nom: 'Certificat d\'origine',
          description: 'Certificat attestant l\'origine des marchandises pour l\'exportation',
          documentsRequis: JSON.stringify([
            'Registre de commerce valide',
            'Facture commerciale originale',
            'Liste de colisage détaillée',
            'Photo d\'identité du responsable'
          ]),
          delaiTraitement: 3,
          prix: 15000,
          actif: true,
          template: '<html><body><h1>Certificat d\'Origine - CCISN</h1><p>Produit: {{produit}}</p></body></html>'
        }
      }),
      prisma.typeDocument.upsert({
        where: { id: 2 },
        update: {},
        create: {
          nom: 'Attestation consulaire',
          description: 'Attestation officielle pour les démarches consulaires',
          documentsRequis: JSON.stringify([
            'Registre de commerce',
            'Pièce d\'identité',
            'Justificatif de domicile'
          ]),
          delaiTraitement: 5,
          prix: 25000,
          actif: true,
          template: '<html><body><h1>Attestation Consulaire - CCISN</h1></body></html>'
        }
      }),
      prisma.typeDocument.upsert({
        where: { id: 3 },
        update: {},
        create: {
          nom: 'Certificat de conformité',
          description: 'Certificat de conformité aux normes commerciales internationales',
          documentsRequis: JSON.stringify([
            'Registre de commerce',
            'Certificats qualité produits',
            'Rapport d\'inspection',
            'Documents techniques'
          ]),
          delaiTraitement: 7,
          prix: 35000,
          actif: true,
          template: '<html><body><h1>Certificat de Conformité - CCISN</h1></body></html>'
        }
      })
    ])

    console.log(`✅ ${typesDocuments.length} types de documents créés`)

    // 2. Vérifier qu'il y a au moins un utilisateur
    let user = await prisma.user.findFirst()
    if (!user) {
      console.log('👤 Création d\'un utilisateur de test...')
      user = await prisma.user.create({
        data: {
          nom: 'Kouassi',
          prenom: 'Jean',
          email: 'jean.kouassi@entreprise.ci',
          motDePasse: 'password123',
          numRegistreCommerce: 'RC-ABJ-2024-001',
          secteurActivite: 'Import/Export',
          telephone: '+225 01 02 03 04 05',
          adresse: 'Abidjan, Plateau',
          role: 'client'
        }
      })
      console.log(`✅ Utilisateur créé: ${user.prenom} ${user.nom}`)
    }

    // 3. Créer des demandes de test
    console.log('📄 Création de demandes de documents...')
    const demandes = await Promise.all([
      prisma.demandeDocument.upsert({
        where: { id: 1 },
        update: {},
        create: {
          userId: user.id,
          typeDocumentId: 1, // Certificat d'origine
          nomDemandeur: 'Kouassi',
          prenomDemandeur: 'Jean',
          emailDemandeur: 'jean.kouassi@entreprise.ci',
          numRegistreCommerce: 'RC-ABJ-2024-001',
          registreCommercePdf: '/uploads/registre-commerce-001.pdf',
          photoIdentite: '/uploads/photo-jean-kouassi.jpg',
          autresDocuments: JSON.stringify([
            '/uploads/facture-commerciale.pdf',
            '/uploads/liste-colisage.pdf'
          ]),
          commentairesClient: 'Demande urgente pour exportation vers le Ghana',
          statut: 'en_attente'
        }
      }),
      prisma.demandeDocument.upsert({
        where: { id: 2 },
        update: {},
        create: {
          userId: user.id,
          typeDocumentId: 2, // Attestation consulaire
          nomDemandeur: 'Kouassi',
          prenomDemandeur: 'Jean',
          emailDemandeur: 'jean.kouassi@entreprise.ci',
          numRegistreCommerce: 'RC-ABJ-2024-001',
          registreCommercePdf: '/uploads/registre-commerce-001.pdf',
          photoIdentite: '/uploads/photo-jean-kouassi.jpg',
          commentairesClient: 'Pour démarches auprès du consulat français',
          statut: 'accepte'
        }
      }),
      prisma.demandeDocument.upsert({
        where: { id: 3 },
        update: {},
        create: {
          userId: user.id,
          typeDocumentId: 3, // Certificat de conformité
          nomDemandeur: 'Kouassi',
          prenomDemandeur: 'Jean',
          emailDemandeur: 'jean.kouassi@entreprise.ci',
          numRegistreCommerce: 'RC-ABJ-2024-001',
          registreCommercePdf: '/uploads/registre-commerce-001.pdf',
          photoIdentite: '/uploads/photo-jean-kouassi.jpg',
          autresDocuments: JSON.stringify([
            '/uploads/certificat-qualite.pdf',
            '/uploads/rapport-inspection.pdf'
          ]),
          commentairesClient: 'Certification pour produits électroniques',
          statut: 'en_cours',
          adminTraitantId: user.id,
          dateTraitement: new Date()
        }
      })
    ])

    console.log(`✅ ${demandes.length} demandes créées`)

    // 4. Créer l'historique des demandes
    console.log('📊 Création de l\'historique...')
    await Promise.all([
      prisma.historiqueStatut.upsert({
        where: { id: 1 },
        update: {},
        create: {
          demandeDocumentId: 1,
          ancienStatut: null,
          nouveauStatut: 'en_attente',
          motif: 'Demande initiale créée'
        }
      }),
      prisma.historiqueStatut.upsert({
        where: { id: 2 },
        update: {},
        create: {
          demandeDocumentId: 2,
          ancienStatut: null,
          nouveauStatut: 'en_attente',
          motif: 'Demande initiale créée'
        }
      }),
      prisma.historiqueStatut.upsert({
        where: { id: 3 },
        update: {},
        create: {
          demandeDocumentId: 2,
          ancienStatut: 'en_attente',
          nouveauStatut: 'accepte',
          adminId: user.id,
          motif: 'Documents conformes, demande acceptée'
        }
      }),
      prisma.historiqueStatut.upsert({
        where: { id: 4 },
        update: {},
        create: {
          demandeDocumentId: 3,
          ancienStatut: null,
          nouveauStatut: 'en_attente',
          motif: 'Demande initiale créée'
        }
      }),
      prisma.historiqueStatut.upsert({
        where: { id: 5 },
        update: {},
        create: {
          demandeDocumentId: 3,
          ancienStatut: 'en_attente',
          nouveauStatut: 'en_cours',
          adminId: user.id,
          motif: 'Vérification des documents en cours'
        }
      })
    ])

    console.log('✅ Historique créé')

    // 5. Créer des notifications
    console.log('🔔 Création des notifications...')
    await Promise.all([
      prisma.notificationDocument.upsert({
        where: { id: 1 },
        update: {},
        create: {
          demandeDocumentId: 1,
          userId: user.id,
          titre: 'Demande reçue',
          message: 'Votre demande de Certificat d\'origine a été reçue et est en cours de traitement.',
          type: 'info',
          lu: false
        }
      }),
      prisma.notificationDocument.upsert({
        where: { id: 2 },
        update: {},
        create: {
          demandeDocumentId: 2,
          userId: user.id,
          titre: 'Demande acceptée',
          message: 'Votre demande d\'Attestation consulaire a été acceptée. Le document sera bientôt généré.',
          type: 'success',
          lu: false
        }
      }),
      prisma.notificationDocument.upsert({
        where: { id: 3 },
        update: {},
        create: {
          demandeDocumentId: 3,
          userId: user.id,
          titre: 'Demande en cours',
          message: 'Votre demande de Certificat de conformité est maintenant en cours de traitement.',
          type: 'info',
          lu: true,
          dateLecture: new Date()
        }
      })
    ])

    console.log('✅ Notifications créées')

    // 6. Créer un document généré (pour la demande acceptée)
    console.log('📄 Génération d\'un document de test...')
    const documentGenere = await prisma.documentGenere.upsert({
      where: { id: 1 },
      update: {},
      create: {
        demandeDocumentId: 2,
        typeDocumentId: 2,
        userId: user.id,
        numeroDocument: 'CCISN-AT-1704067200000',
        nomFichier: 'attestation-consulaire-CCISN-AT-1704067200000.pdf',
        cheminFichier: '/documents/generated/attestation-consulaire-CCISN-AT-1704067200000.pdf',
        tailleFichier: 245760, // 240 KB
        statut: 'genere',
        hashDocument: 'sha256:a1b2c3d4e5f6789',
        qrCode: 'QR-CCISN-AT-1704067200000',
        nbTelecharge: 0
      }
    })

    console.log('✅ Document généré créé')

    // 7. Afficher le résumé
    console.log('\n📊 RÉSUMÉ DES DONNÉES CRÉÉES:')
    const stats = {
      typesDocuments: await prisma.typeDocument.count(),
      demandes: await prisma.demandeDocument.count(),
      documentsGeneres: await prisma.documentGenere.count(),
      notifications: await prisma.notificationDocument.count(),
      historiqueStatuts: await prisma.historiqueStatut.count()
    }

    console.log(`├─ Types de documents: ${stats.typesDocuments}`)
    console.log(`├─ Demandes: ${stats.demandes}`)
    console.log(`├─ Documents générés: ${stats.documentsGeneres}`)
    console.log(`├─ Notifications: ${stats.notifications}`)
    console.log(`└─ Historique: ${stats.historiqueStatuts}`)

    console.log('\n🎉 Données de test créées avec succès!')
    console.log('\n📋 PROCHAINES ÉTAPES:')
    console.log('1. Démarrer l\'API: npm run start:dev')
    console.log('2. Aller sur: http://localhost:3000/api')
    console.log('3. Tester les routes Documents CCISN')

  } catch (error) {
    console.error('❌ Erreur lors de la création des données:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedDocumentsData() 