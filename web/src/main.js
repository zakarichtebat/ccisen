import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Importer les utilitaires de débogage en mode développement
if (import.meta.env.DEV) {
  import('./utils/debug.js').then(debugModule => {
    console.log('🔧 Utilitaires de débogage chargés')
  })
}

// Importer et nettoyer les données corrompues au démarrage
import { cleanupAuthData } from './utils/localStorage.js'
cleanupAuthData()

const app = createApp(App)
app.use(router)
app.mount('#app')
