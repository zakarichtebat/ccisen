<template>
  <div class="admin-page">
    <TheHeader />
    
    <!-- Section héro admin -->
    <section class="admin-hero">
      <div class="admin-hero-bg"></div>
      <div class="container">
        <div class="admin-hero-content">
          <h1>🔧 Administration</h1>
          <p>Gestion des rendez-vous et du système</p>
        </div>
      </div>
    </section>
    
    <!-- Section principale -->
    <section class="admin-main">
      <div class="container">
        <!-- Statistiques -->
        <div class="stats-section">
          <div class="stats-header">
            <h2>Tableau de Bord</h2>
            <button @click="refreshStats" class="stats-refresh-btn">
              <i class="fas fa-sync-alt" :class="{ 'spinning': !statsLoaded }"></i>
              Actualiser
            </button>
          </div>
          
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">📅</div>
              <div class="stat-content">
                <h3>{{ totalRendezVous }}</h3>
                <p>Total rendez-vous</p>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon">⏳</div>
              <div class="stat-content">
                <h3>{{ totalRdvEnAttente }}</h3>
                <p>RDV en attente</p>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon">✅</div>
              <div class="stat-content">
                <h3>{{ totalRdvConfirmes }}</h3>
                <p>RDV confirmés</p>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon">🎓</div>
              <div class="stat-content">
                <h3>{{ totalFormations }}</h3>
                <p>Formations</p>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon">👥</div>
              <div class="stat-content">
                <h3>{{ totalInscriptions }}</h3>
                <p>Inscriptions</p>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon">🕐</div>
              <div class="stat-content">
                <h3>{{ totalInscriptionsEnAttente }}</h3>
                <p>Inscriptions en attente</p>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon">✔️</div>
              <div class="stat-content">
                <h3>{{ totalInscriptionsConfirmees }}</h3>
                <p>Inscriptions confirmées</p>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon">❌</div>
              <div class="stat-content">
                <h3>{{ totalInscriptionsAnnulees }}</h3>
                <p>Inscriptions annulées</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Navigation principale -->
        <div class="admin-navigation">
          <h2>Gestion du Système</h2>
          
          <!-- Onglets de navigation -->
          <div class="admin-tabs">
            <button 
              class="tab-btn"
              :class="{ 'active': activeTab === 'appointments' }"
              @click="changeTab('appointments')"
            >
              <i class="fas fa-calendar-alt"></i>
              Rendez-vous
            </button>
            <button 
              class="tab-btn"
              :class="{ 'active': activeTab === 'formations' }"
              @click="changeTab('formations')"
            >
              <i class="fas fa-graduation-cap"></i>
              Formations
            </button>
            <button 
              class="tab-btn"
              :class="{ 'active': activeTab === 'inscriptions' }"
              @click="changeTab('inscriptions')"
            >
              <i class="fas fa-user-graduate"></i>
              Inscriptions
            </button>
          </div>
        </div>
        
        <!-- Contenu des onglets -->
        <div class="admin-content">
          <!-- Section Rendez-vous -->
          <AdminRendezVous 
            v-if="activeTab === 'appointments'"
            ref="rendezVousComponent"
            @show-success="showSuccessMessage"
            @show-error="showErrorMessage"
          />
          
          <!-- Section Formations -->
          <AdminFormations 
            v-if="activeTab === 'formations'"
            ref="formationsComponent"
            @show-success="showSuccessMessage"
            @show-error="showErrorMessage"
          />
          
          <!-- Section Inscriptions -->
          <AdminInscriptions 
            v-if="activeTab === 'inscriptions'"
            ref="inscriptionsComponent"
            @show-success="showSuccessMessage"
            @show-error="showErrorMessage"
          />
        </div>
      </div>
    </section>
    
    <!-- Messages de notification -->
    <transition name="notification">
      <div v-if="successMessage" class="notification success">
        <i class="fas fa-check-circle"></i>
        <span>{{ successMessage }}</span>
        <button @click="successMessage = ''" class="close-notification">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </transition>
    
    <transition name="notification">
      <div v-if="errorMessage" class="notification error">
        <i class="fas fa-exclamation-circle"></i>
        <span>{{ errorMessage }}</span>
        <button @click="errorMessage = ''" class="close-notification">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </transition>
    
    <TheFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import AdminRendezVous from '@/components/admin/AdminRendezVous.vue'
import AdminFormations from '@/components/admin/AdminFormations.vue'
import AdminInscriptions from '@/components/admin/AdminInscriptions.vue'
import axios from 'axios'

// Configuration globale d'axios
axios.defaults.withCredentials = true

const router = useRouter()
const activeTab = ref('appointments')
const successMessage = ref('')
const errorMessage = ref('')

// Références aux composants enfants
const rendezVousComponent = ref(null)
const formationsComponent = ref(null)
const inscriptionsComponent = ref(null)

// Variables réactives pour les statistiques
const statsLoaded = ref(false)

// Computed pour les statistiques avec vérification
const totalRendezVous = computed(() => {
  if (!statsLoaded.value || !rendezVousComponent.value?.rendezVous) return 0
  return rendezVousComponent.value.rendezVous.length
})

const totalRdvEnAttente = computed(() => {
  if (!statsLoaded.value || !rendezVousComponent.value?.rendezVousEnAttente) return 0
  return rendezVousComponent.value.rendezVousEnAttente.length
})

const totalRdvConfirmes = computed(() => {
  if (!statsLoaded.value || !rendezVousComponent.value?.rendezVousConfirmes) return 0
  return rendezVousComponent.value.rendezVousConfirmes.length
})

const totalFormations = computed(() => {
  if (!statsLoaded.value || !formationsComponent.value?.formations) return 0
  return formationsComponent.value.formations.length
})

const totalInscriptions = computed(() => {
  if (!statsLoaded.value || !inscriptionsComponent.value?.inscriptions) return 0
  return inscriptionsComponent.value.inscriptions.length
})

const totalInscriptionsEnAttente = computed(() => {
  if (!statsLoaded.value || !inscriptionsComponent.value?.inscriptionsEnAttente) return 0
  return inscriptionsComponent.value.inscriptionsEnAttente.length
})

const totalInscriptionsConfirmees = computed(() => {
  if (!statsLoaded.value || !inscriptionsComponent.value?.inscriptionsConfirmees) return 0
  return inscriptionsComponent.value.inscriptionsConfirmees.length
})

const totalInscriptionsAnnulees = computed(() => {
  if (!statsLoaded.value || !inscriptionsComponent.value?.inscriptionsAnnulees) return 0
  return inscriptionsComponent.value.inscriptionsAnnulees.length
})

// Fonction pour actualiser les statistiques
const refreshStats = async () => {
  await nextTick()
  statsLoaded.value = false
  
  // Attendre un peu pour que les composants se chargent et récupèrent leurs données
  setTimeout(async () => {
    // Vérifier si les données sont disponibles dans les composants
    let attempts = 0
    const maxAttempts = 10
    
    while (attempts < maxAttempts) {
      if (rendezVousComponent.value?.rendezVous && 
          formationsComponent.value?.formations &&
          inscriptionsComponent.value?.inscriptions) {
        statsLoaded.value = true
        break
      }
      
      // Attendre un peu plus et réessayer
      await new Promise(resolve => setTimeout(resolve, 200))
      attempts++
    }
    
    // Forcer l'activation même si les données ne sont pas disponibles
    if (attempts >= maxAttempts) {
      statsLoaded.value = true
    }
  }, 100)
}

// Vérification des droits admin
const checkAdminAccess = async () => {
  try {
    const response = await axios.post('http://localhost:3000/auth/current-user', {}, {
      withCredentials: true
    })
    
    if (!response.data.isLoggedIn) {
      router.push('/login?message=Vous devez être connecté pour accéder à cette page')
      return false
    }
    
    if (response.data.user.role !== 'administrateur') {
      router.push('/?message=Accès refusé. Vous devez être administrateur pour accéder à cette page')
      return false
    }
    
    return true
  } catch (error) {
    console.error('Erreur lors de la vérification des droits:', error)
    router.push('/login')
    return false
  }
}

// Fonctions pour les notifications
const showSuccessMessage = (message) => {
  successMessage.value = message
  setTimeout(() => {
    successMessage.value = ''
  }, 3000)
  
  // Actualiser les stats après une action réussie
  refreshStats()
}

const showErrorMessage = (message) => {
  errorMessage.value = message
  setTimeout(() => {
    errorMessage.value = ''
  }, 3000)
}

// Fonction pour changer d'onglet et actualiser les stats
const changeTab = async (tab) => {
  activeTab.value = tab
  
  // Attendre que le nouveau composant soit monté
  await nextTick()
  
  // Petite pause pour s'assurer que le composant a fini de charger ses données
  setTimeout(() => {
    refreshStats()
  }, 200)
}

// Initialisation
onMounted(async () => {
  const hasAccess = await checkAdminAccess()
  if (!hasAccess) {
    return
  }
  
  // Attendre que les composants soient montés
  await nextTick()
  await refreshStats()
})
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  margin-top: 125px;
  background: #f8fafc;
}

/* Section héro admin */
.admin-hero {
  position: relative;
  height: 200px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.admin-hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.admin-hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: white;
  text-align: center;
}

.admin-hero h1 {
  font-size: 2.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.admin-hero p {
  font-size: 1.2rem;
  margin: 0;
  opacity: 0.9;
}

/* Section principale */
.admin-main {
  padding: 0 0 4rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Statistiques */
.stats-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.stats-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.stats-header h2 {
  margin: 0;
  color: #1f2937;
  font-size: 1.5rem;
}

.stats-refresh-btn {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
  font: inherit;
  outline: inherit;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.stats-refresh-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-content h3 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.25rem;
  color: #1f2937;
}

.stat-content p {
  margin: 0;
  color: #6b7280;
  font-size: 0.9rem;
}

/* Navigation */
.admin-navigation {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.admin-navigation h2 {
  margin: 0 0 1.5rem;
  color: #1f2937;
  font-size: 1.5rem;
}

.admin-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 0;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid #e5e7eb;
  border-radius: 25px;
  background: white;
  color: #6b7280;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-btn:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}

.tab-btn.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

/* Contenu des onglets */
.admin-content {
  margin-bottom: 2rem;
}

/* Notifications */
.notification {
  position: fixed;
  top: 120px;
  right: 20px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-width: 400px;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.notification.success {
  border-left: 4px solid #10b981;
}

.notification.error {
  border-left: 4px solid #ef4444;
}

.notification.success i {
  color: #10b981;
}

.notification.error i {
  color: #ef4444;
}

.notification span {
  flex: 1;
  color: #374151;
  font-weight: 500;
}

.close-notification {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.close-notification:hover {
  background: #f3f4f6;
  color: #6b7280;
}

/* Animations */
.notification-enter-active, .notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

/* Responsive */
@media (max-width: 768px) {
  .admin-hero h1 {
    font-size: 2rem;
  }
  
  .admin-tabs {
    flex-direction: column;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}

@media (min-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Animations */
.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style> 