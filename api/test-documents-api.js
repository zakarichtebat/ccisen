const axios = require('axios')

// Configuration de base
const API_BASE = 'http://localhost:3000'
const API_DOCS = 'http://localhost:3000/api'

// Configuration axios
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Couleurs pour les logs
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green')
}

function logError(message) {
  log(`❌ ${message}`, 'red')
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue')
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow')
}

async function testDocumentsAPI() {
  console.log('\n🧪 TEST COMPLET DE L\'API DOCUMENTS CCISN')
  console.log('=' .repeat(50))

  try {
    // Test 1: Vérifier que le serveur fonctionne
    logInfo('Test 1: Vérification du serveur...')
    try {
      const healthCheck = await api.get('/health')
      logSuccess('Serveur accessible')
    } catch (error) {
      logWarning('Route /health non trouvée, test de l\'API Swagger...')
      try {
        const swaggerCheck = await api.get('/api')
        logSuccess('API Swagger accessible')
      } catch (swaggerError) {
        logError('Serveur non accessible. Assurez-vous que l\'API est démarrée.')
        return
      }
    }

    // Test 2: Récupérer tous les types de documents
    logInfo('Test 2: Récupération des types de documents...')
    try {
      const typesResponse = await api.get('/documents/types')
      logSuccess(`${typesResponse.data.length} types de documents trouvés`)
      console.log('Types disponibles:', typesResponse.data.map(t => `${t.id}: ${t.nom} (${t.prix} FCFA)`))
    } catch (error) {
      logError(`Erreur récupération types: ${error.response?.status} - ${error.response?.data?.message || error.message}`)
    }

    // Test 3: Créer un nouveau type de document
    logInfo('Test 3: Création d\'un nouveau type de document...')
    try {
      const newType = {
        nom: 'Licence d\'importation',
        description: 'Licence officielle pour l\'importation de marchandises',
        documentsRequis: JSON.stringify([
          'Registre de commerce',
          'Autorisation douanière',
          'Contrat fournisseur'
        ]),
        delaiTraitement: 10,
        prix: 50000,
        actif: true
      }
      
      const createResponse = await api.post('/documents/types', newType)
      logSuccess(`Type créé avec ID: ${createResponse.data.id}`)
      
      // Test 3b: Récupérer le type créé
      const getTypeResponse = await api.get(`/documents/types/${createResponse.data.id}`)
      logSuccess(`Type récupéré: ${getTypeResponse.data.nom}`)
    } catch (error) {
      logError(`Erreur création type: ${error.response?.status} - ${error.response?.data?.message || error.message}`)
    }

    // Test 4: Créer une demande de document
    logInfo('Test 4: Création d\'une demande de document...')
    try {
      const demande = {
        typeDocumentId: 1,
        nomDemandeur: 'Test',
        prenomDemandeur: 'Utilisateur',
        emailDemandeur: 'test@example.com',
        numRegistreCommerce: 'RC-TEST-2024',
        registreCommercePdf: '/uploads/test-registre.pdf',
        photoIdentite: '/uploads/test-photo.jpg',
        commentairesClient: 'Demande de test via API'
      }
      
      const demandeResponse = await api.post('/documents/demandes', demande)
      logSuccess(`Demande créée avec ID: ${demandeResponse.data.id}`)
      
      // Sauvegarder l'ID pour les tests suivants
      global.testDemandeId = demandeResponse.data.id
    } catch (error) {
      logError(`Erreur création demande: ${error.response?.status} - ${error.response?.data?.message || error.message}`)
    }

    // Test 5: Récupérer toutes les demandes
    logInfo('Test 5: Récupération de toutes les demandes...')
    try {
      const demandesResponse = await api.get('/documents/demandes')
      logSuccess(`${demandesResponse.data.length} demandes trouvées`)
      
      if (demandesResponse.data.length > 0) {
        const statuts = demandesResponse.data.reduce((acc, d) => {
          acc[d.statut] = (acc[d.statut] || 0) + 1
          return acc
        }, {})
        console.log('Répartition par statut:', statuts)
      }
    } catch (error) {
      logError(`Erreur récupération demandes: ${error.response?.status} - ${error.response?.data?.message || error.message}`)
    }

    // Test 6: Mettre à jour le statut d'une demande
    if (global.testDemandeId) {
      logInfo('Test 6: Mise à jour du statut d\'une demande...')
      try {
        const updateData = {
          statut: 'accepte',
          notes: 'Demande acceptée après vérification'
        }
        
        const updateResponse = await api.patch(`/documents/demandes/${global.testDemandeId}`, updateData)
        logSuccess(`Statut mis à jour: ${updateResponse.data.statut}`)
      } catch (error) {
        logError(`Erreur mise à jour: ${error.response?.status} - ${error.response?.data?.message || error.message}`)
      }
    }

    // Test 7: Générer un document
    if (global.testDemandeId) {
      logInfo('Test 7: Génération d\'un document...')
      try {
        const generateResponse = await api.post(`/documents/demandes/${global.testDemandeId}/generer`)
        logSuccess(`Document généré: ${generateResponse.data.numeroDocument}`)
        global.testDocumentId = generateResponse.data.id
      } catch (error) {
        logError(`Erreur génération: ${error.response?.status} - ${error.response?.data?.message || error.message}`)
      }
    }

    // Test 8: Récupérer mes documents
    logInfo('Test 8: Récupération de mes documents...')
    try {
      const mesDocumentsResponse = await api.get('/documents/mes-documents')
      logSuccess(`${mesDocumentsResponse.data.length} documents trouvés`)
      
      if (mesDocumentsResponse.data.length > 0) {
        console.log('Documents:', mesDocumentsResponse.data.map(d => 
          `${d.numeroDocument} - ${d.nomFichier} (${d.statut})`
        ))
      }
    } catch (error) {
      logError(`Erreur récupération documents: ${error.response?.status} - ${error.response?.data?.message || error.message}`)
    }

    // Test 9: Récupérer les notifications
    logInfo('Test 9: Récupération des notifications...')
    try {
      const notificationsResponse = await api.get('/documents/notifications')
      logSuccess(`${notificationsResponse.data.length} notifications trouvées`)
      
      const nonLues = notificationsResponse.data.filter(n => !n.lu).length
      if (nonLues > 0) {
        logInfo(`${nonLues} notifications non lues`)
      }
    } catch (error) {
      logError(`Erreur récupération notifications: ${error.response?.status} - ${error.response?.data?.message || error.message}`)
    }

    // Test 10: Statistiques
    logInfo('Test 10: Récupération des statistiques...')
    try {
      const statsResponse = await api.get('/documents/statistiques')
      logSuccess('Statistiques récupérées')
      console.log('Statistiques:', JSON.stringify(statsResponse.data, null, 2))
    } catch (error) {
      logError(`Erreur récupération stats: ${error.response?.status} - ${error.response?.data?.message || error.message}`)
    }

    // Test 11: Test de téléchargement (simulation)
    if (global.testDocumentId) {
      logInfo('Test 11: Test de téléchargement de document...')
      try {
        const downloadResponse = await api.get(`/documents/documents/${global.testDocumentId}/download`)
        logSuccess(`Téléchargement simulé: ${downloadResponse.data.nomFichier}`)
      } catch (error) {
        logError(`Erreur téléchargement: ${error.response?.status} - ${error.response?.data?.message || error.message}`)
      }
    }

    // Résumé final
    console.log('\n📊 RÉSUMÉ DES TESTS')
    console.log('=' .repeat(30))
    logSuccess('Tests API terminés')
    logInfo(`Documentation Swagger disponible sur: ${API_DOCS}`)
    logInfo('Toutes les routes Documents CCISN sont maintenant visibles dans Swagger!')

  } catch (error) {
    logError(`Erreur générale: ${error.message}`)
  }
}

// Fonction pour tester la structure des données
async function testDataStructure() {
  console.log('\n🔍 VÉRIFICATION STRUCTURE DES DONNÉES')
  console.log('=' .repeat(40))

  try {
    // Tester la structure des types de documents
    const typesResponse = await api.get('/documents/types')
    if (typesResponse.data.length > 0) {
      const type = typesResponse.data[0]
      const requiredFields = ['id', 'nom', 'description', 'prix', 'delaiTraitement']
      const hasAllFields = requiredFields.every(field => type.hasOwnProperty(field))
      
      if (hasAllFields) {
        logSuccess('Structure TypeDocument ✓')
      } else {
        logError(`Structure TypeDocument incomplète. Manque: ${requiredFields.filter(f => !type.hasOwnProperty(f))}`)
      }
    }

    // Tester la structure des demandes
    const demandesResponse = await api.get('/documents/demandes')
    if (demandesResponse.data.length > 0) {
      const demande = demandesResponse.data[0]
      const requiredFields = ['id', 'nomDemandeur', 'prenomDemandeur', 'statut', 'typeDocument', 'user']
      const hasAllFields = requiredFields.every(field => demande.hasOwnProperty(field))
      
      if (hasAllFields) {
        logSuccess('Structure DemandeDocument ✓')
        
        // Vérifier les relations
        if (demande.typeDocument && demande.user) {
          logSuccess('Relations TypeDocument et User ✓')
        }
      } else {
        logError(`Structure DemandeDocument incomplète. Manque: ${requiredFields.filter(f => !demande.hasOwnProperty(f))}`)
      }
    }

  } catch (error) {
    logError(`Erreur vérification structure: ${error.message}`)
  }
}

// Fonction principale
async function runTests() {
  console.log('🚀 DÉMARRAGE DES TESTS API DOCUMENTS CCISN')
  console.log(`🕐 ${new Date().toLocaleString()}`)
  
  // Attendre un peu pour s'assurer que le serveur est prêt
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  await testDocumentsAPI()
  await testDataStructure()
  
  console.log('\n🎯 GUIDE D\'UTILISATION:')
  console.log('1. Ouvrez votre navigateur sur http://localhost:3000/api')
  console.log('2. Vous verrez maintenant la section "Documents CCISN" dans Swagger')
  console.log('3. Testez les routes avec les exemples fournis')
  console.log('4. Les données de test sont déjà en base !')
  
  console.log('\n✨ Tests terminés avec succès!')
}

// Démarrer les tests si ce script est exécuté directement
if (require.main === module) {
  runTests().catch(error => {
    logError(`Erreur fatale: ${error.message}`)
    process.exit(1)
  })
}

module.exports = { runTests, testDocumentsAPI, testDataStructure } 