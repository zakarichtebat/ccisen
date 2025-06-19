const axios = require('axios');

// Configuration
const API_BASE = 'http://localhost:3000';
axios.defaults.withCredentials = true;

// Fonction pour tester la connexion avec différents statuts
async function testUserStatusLogin() {
  console.log('🧪 Test des connexions selon le statut utilisateur\n');

  // Test 1: Utilisateur actif (devrait fonctionner)
  console.log('1️⃣ Test utilisateur ACTIF:');
  try {
    const response = await axios.post(`${API_BASE}/auth/login`, {
      email: 'admin@ccisn.ma',
      motDePasse: 'admin123'
    });
    console.log('✅ Connexion réussie pour utilisateur actif');
    console.log(`   Utilisateur: ${response.data.user.nom} ${response.data.user.prenom}`);
    console.log(`   Statut: ${response.data.user.status}`);
    
    // Déconnexion
    await axios.post(`${API_BASE}/auth/logout`);
  } catch (error) {
    console.log('❌ Erreur inattendue pour utilisateur actif:', error.response?.data?.message);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test 2: Utilisateur inactif (devrait échouer)
  console.log('2️⃣ Test utilisateur INACTIF:');
  try {
    // D'abord, changer le statut d'un utilisateur en inactif
    console.log('   Changement du statut de l\'utilisateur...');
    
    // Se connecter en admin d'abord
    const adminLogin = await axios.post(`${API_BASE}/auth/login`, {
      email: 'admin@ccisn.ma',
      motDePasse: 'admin123'
    });
    
    // Changer le statut d'un utilisateur test (ID 2 par exemple)
    await axios.patch(`${API_BASE}/users/2/status`, {
      status: 'inactif'
    });
    
    // Déconnexion admin
    await axios.post(`${API_BASE}/auth/logout`);
    
    // Maintenant tenter de se connecter avec cet utilisateur
    const response = await axios.post(`${API_BASE}/auth/login`, {
      email: 'ahmed.alami@example.com',
      motDePasse: 'password123'
    });
    
    console.log('❌ PROBLÈME: Utilisateur inactif a pu se connecter!');
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('✅ Connexion correctement refusée pour utilisateur inactif');
      console.log(`   Message: ${error.response.data.message}`);
    } else {
      console.log('❌ Erreur inattendue:', error.response?.data?.message);
    }
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test 3: Utilisateur bloqué (devrait échouer)
  console.log('3️⃣ Test utilisateur BLOQUÉ:');
  try {
    // Se connecter en admin
    const adminLogin = await axios.post(`${API_BASE}/auth/login`, {
      email: 'admin@ccisn.ma',
      motDePasse: 'admin123'
    });
    
    // Changer le statut d'un utilisateur en bloqué (ID 3 par exemple)
    await axios.patch(`${API_BASE}/users/3/status`, {
      status: 'bloque'
    });
    
    // Déconnexion admin
    await axios.post(`${API_BASE}/auth/logout`);
    
    // Tenter de se connecter avec cet utilisateur
    const response = await axios.post(`${API_BASE}/auth/login`, {
      email: 'fatima.benali@example.com',
      motDePasse: 'password123'
    });
    
    console.log('❌ PROBLÈME: Utilisateur bloqué a pu se connecter!');
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('✅ Connexion correctement refusée pour utilisateur bloqué');
      console.log(`   Message: ${error.response.data.message}`);
    } else {
      console.log('❌ Erreur inattendue:', error.response?.data?.message);
    }
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test 4: Vérification du statut pendant une session
  console.log('4️⃣ Test vérification statut pendant session:');
  try {
    // Se connecter avec un utilisateur
    const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
      email: 'admin@ccisn.ma',
      motDePasse: 'admin123'
    });
    console.log('   Connexion initiale réussie');
    
    // Vérifier le statut
    const statusCheck = await axios.post(`${API_BASE}/auth/check-status`);
    console.log(`   Statut vérifié: ${statusCheck.data.message}`);
    console.log(`   Valide: ${statusCheck.data.isValid}`);
    
    // Déconnexion
    await axios.post(`${API_BASE}/auth/logout`);
  } catch (error) {
    console.log('❌ Erreur lors du test de vérification:', error.response?.data?.message);
  }

  console.log('\n🏁 Tests terminés!');
}

// Test de restauration des statuts
async function restoreUserStatuses() {
  console.log('\n🔄 Restauration des statuts utilisateur...');
  
  try {
    // Se connecter en admin
    await axios.post(`${API_BASE}/auth/login`, {
      email: 'admin@ccisn.ma',
      motDePasse: 'admin123'
    });
    
    // Remettre les utilisateurs en actif
    await axios.patch(`${API_BASE}/users/2/status`, { status: 'actif' });
    await axios.patch(`${API_BASE}/users/3/status`, { status: 'actif' });
    
    console.log('✅ Statuts restaurés à "actif"');
    
    // Déconnexion
    await axios.post(`${API_BASE}/auth/logout`);
  } catch (error) {
    console.log('❌ Erreur lors de la restauration:', error.response?.data?.message);
  }
}

// Exécution des tests
async function runTests() {
  try {
    await testUserStatusLogin();
    await restoreUserStatuses();
  } catch (error) {
    console.error('Erreur générale:', error.message);
  }
}

// Lancer les tests si le script est exécuté directement
if (require.main === module) {
  runTests();
}

module.exports = { testUserStatusLogin, restoreUserStatuses }; 