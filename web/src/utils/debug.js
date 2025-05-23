/**
 * Utilitaires de débogage pour l'application
 */

/**
 * Affiche l'état complet du localStorage
 */
export const debugLocalStorage = () => {
  console.group('🔍 État du localStorage')
  
  const keys = ['user', 'token', 'isAuthenticated']
  keys.forEach(key => {
    const value = localStorage.getItem(key)
    console.log(`${key}:`, value)
    
    if (value) {
      try {
        const parsed = JSON.parse(value)
        console.log(`${key} (parsed):`, parsed)
      } catch (error) {
        console.error(`❌ ${key} contient du JSON invalide:`, error.message)
      }
    }
  })
  
  console.groupEnd()
}

/**
 * Nettoie complètement le localStorage
 */
export const clearAllStorage = () => {
  console.log('🧹 Nettoyage complet du localStorage...')
  localStorage.clear()
  console.log('✅ localStorage nettoyé')
}

/**
 * Vérifie l'état de l'authentification
 */
export const debugAuthState = async () => {
  console.group('🔐 État de l\'authentification')
  
  // Vérifier le localStorage
  debugLocalStorage()
  
  // Vérifier avec l'API
  try {
    const response = await fetch('http://localhost:3000/auth/current-user', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    const data = await response.json()
    console.log('📡 Réponse de l\'API:', data)
    
    if (data.isLoggedIn) {
      console.log('✅ Utilisateur connecté selon l\'API')
    } else {
      console.log('❌ Utilisateur non connecté selon l\'API')
    }
  } catch (error) {
    console.error('❌ Erreur lors de la vérification API:', error)
  }
  
  console.groupEnd()
}

/**
 * Teste la connectivité avec l'API
 */
export const testApiConnection = async () => {
  console.group('🌐 Test de connectivité API')
  
  const endpoints = [
    'http://localhost:3000/',
    'http://localhost:3000/formations',
    'http://localhost:3000/formations/active',
    'http://localhost:3000/formations/user/inscriptions'
  ]
  
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        credentials: 'include'
      })
      
      if (response.ok) {
        console.log(`✅ ${endpoint} - OK (${response.status})`)
      } else {
        console.log(`⚠️ ${endpoint} - ${response.status} ${response.statusText}`)
      }
    } catch (error) {
      console.error(`❌ ${endpoint} - Erreur:`, error.message)
    }
  }
  
  console.groupEnd()
}

/**
 * Affiche un diagnostic complet
 */
export const fullDiagnostic = async () => {
  console.log('🏥 === DIAGNOSTIC COMPLET DE L\'APPLICATION ===')
  
  await debugAuthState()
  await testApiConnection()
  
  // Vérifier les routes
  console.group('🗺️ État des routes')
  console.log('URL actuelle:', window.location.href)
  console.log('Hash:', window.location.hash)
  console.log('Pathname:', window.location.pathname)
  console.groupEnd()
  
  console.log('✅ Diagnostic terminé')
}

// Exposer les fonctions globalement pour le débogage en console
if (typeof window !== 'undefined') {
  window.debugApp = {
    localStorage: debugLocalStorage,
    auth: debugAuthState,
    api: testApiConnection,
    full: fullDiagnostic,
    clear: clearAllStorage
  }
  
  console.log('🔧 Fonctions de débogage disponibles dans window.debugApp')
} 