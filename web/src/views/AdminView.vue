<template>
  <div class="admin-page">
    <TheHeader />
    
    <!-- Section héro admin moderne -->
    <section class="admin-hero">
      <div class="hero-bg">
        <div class="floating-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
          <div class="shape shape-4"></div>
        </div>
        <div class="gradient-overlay"></div>
      </div>
      <div class="container">
        <div class="hero-content">
          <div class="hero-badge">
            <span class="badge-icon">⚡</span>
            <span>Dashboard Administrateur</span>
          </div>
          <h1 class="hero-title">
            <span class="title-main">Centre de</span>
            <span class="title-accent">Contrôle</span>
          </h1>
          <p class="hero-subtitle">Gérez efficacement votre plateforme avec des outils avancés et des analyses en temps réel</p>
          <div class="hero-stats">
            <div class="hero-stat">
              <div class="stat-icon">👥</div>
              <div class="stat-info">
                <span class="stat-number">{{ totalUsers }}</span>
                <span class="stat-label">Utilisateurs</span>
              </div>
            </div>
            <div class="hero-stat">
              <div class="stat-icon">📊</div>
              <div class="stat-info">
                <span class="stat-number">{{ totalActivities }}</span>
                <span class="stat-label">Activités</span>
              </div>
            </div>
            <div class="hero-stat">
              <div class="stat-icon">⭐</div>
              <div class="stat-info">
                <span class="stat-number">{{ overallRating }}</span>
                <span class="stat-label">Note globale</span>
              </div>
            </div>
          </div>
          <div class="hero-actions">
            <button @click="refreshAllData" class="hero-btn primary">
              <i class="fas fa-sync-alt" :class="{ 'spinning': refreshing }"></i>
              <span>Actualiser les données</span>
            </button>
            <button @click="exportData" class="hero-btn secondary">
              <i class="fas fa-download"></i>
              <span>Exporter rapport</span>
            </button>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Section principale -->
    <section class="admin-main">
      <div class="container">
        <!-- Dashboard Analytics -->
        <div class="dashboard-analytics">
          <div class="section-header">
            <h2>
              <i class="fas fa-chart-line"></i>
              Analytics & Aperçu
              <span class="real-time-indicator">
                <i class="fas fa-circle"></i>
                Temps réel
              </span>
            </h2>
            <div class="header-actions">
              <div class="refresh-status">
                <span class="last-update">Dernière mise à jour: {{ new Date().toLocaleTimeString('fr-FR') }}</span>
              </div>
              <div class="time-filter">
                <select v-model="selectedPeriod" @change="updateAnalytics">
                  <option value="7">7 derniers jours</option>
                  <option value="30">30 derniers jours</option>
                  <option value="90">3 derniers mois</option>
                  <option value="365">Cette année</option>
                </select>
              </div>
            </div>
          </div>
          
          <!-- Métriques principales -->
          <div class="metrics-grid">
            <div class="metric-card primary">
              <div class="metric-header">
                <div class="metric-icon">
                  <i class="fas fa-users"></i>
                </div>
                <div class="metric-trend up">
                  <i class="fas fa-arrow-up"></i>
                  <span>+12%</span>
                </div>
              </div>
              <div class="metric-content">
                <h3>{{ totalUsers }}</h3>
                <p>Utilisateurs actifs</p>
                <div class="metric-subtitle">{{ newUsersThisWeek }} nouveaux cette semaine</div>
              </div>
              <div class="metric-chart">
                <div class="mini-chart">
                  <div class="chart-bar" v-for="n in 7" :key="n" :style="{ height: Math.random() * 100 + '%' }"></div>
                </div>
              </div>
            </div>

            <div class="metric-card success">
              <div class="metric-header">
                <div class="metric-icon">
                  <i class="fas fa-calendar-check"></i>
                </div>
                <div class="metric-trend up">
                  <i class="fas fa-arrow-up"></i>
                  <span>+8%</span>
                </div>
              </div>
              <div class="metric-content">
                <h3>{{ totalRendezVous }}</h3>
                <p>Rendez-vous</p>
                <div class="metric-subtitle">{{ totalRdvConfirmes }} confirmés / {{ totalRdvEnAttente }} en attente</div>
              </div>
              <div class="metric-progress">
                <div class="progress-bar" :style="{ width: (totalRdvConfirmes / totalRendezVous * 100) + '%' }"></div>
              </div>
            </div>

            <div class="metric-card warning">
              <div class="metric-header">
                <div class="metric-icon">
                  <i class="fas fa-graduation-cap"></i>
                </div>
                <div class="metric-trend up">
                  <i class="fas fa-arrow-up"></i>
                  <span>+15%</span>
                </div>
              </div>
              <div class="metric-content">
                <h3>{{ totalFormations }}</h3>
                <p>Formations</p>
                <div class="metric-subtitle">{{ totalInscriptions }} inscriptions au total</div>
              </div>
              <div class="metric-donut">
                <div class="donut-chart">
                  <div class="donut-segment confirmed" :style="{ '--percentage': (totalInscriptionsConfirmees / totalInscriptions * 100) + '%' }"></div>
                </div>
              </div>
            </div>

            <div class="metric-card danger">
              <div class="metric-header">
                <div class="metric-icon">
                  <i class="fas fa-star"></i>
                </div>
                <div class="metric-trend">
                  <span class="rating-stars">
                    <i class="fas fa-star" v-for="n in Math.floor(moyenneNote)" :key="n"></i>
                    <i class="far fa-star" v-for="n in (5 - Math.floor(moyenneNote))" :key="n + 5"></i>
                  </span>
                </div>
              </div>
              <div class="metric-content">
                <h3>{{ moyenneNote.toFixed(1) }}</h3>
                <p>Note moyenne</p>
                <div class="metric-subtitle">{{ totalAvis }} avis clients</div>
              </div>
              <div class="metric-rating">
                <div class="rating-bar" v-for="n in 5" :key="n" :class="{ 'active': n <= Math.floor(moyenneNote) }"></div>
              </div>
            </div>
          </div>

          <!-- Graphiques et statistiques détaillées -->
          <div class="charts-section">
            <div class="chart-container">
              <div class="chart-header">
                <h3>Évolution des inscriptions</h3>
                <div class="chart-legend">
                  <div class="legend-item">
                    <div class="legend-color confirmed"></div>
                    <span>Confirmées</span>
                  </div>
                  <div class="legend-item">
                    <div class="legend-color pending"></div>
                    <span>En attente</span>
                  </div>
                  <div class="legend-item">
                    <div class="legend-color cancelled"></div>
                    <span>Annulées</span>
                  </div>
                </div>
              </div>
              <div class="chart-content">
                <div class="activity-chart">
                  <div class="chart-bars">
                    <div class="bar-group" v-for="day in chartData" :key="day.date">
                      <div class="bar confirmed" :style="{ height: (day.confirmed / day.total * 100) + '%' }"></div>
                      <div class="bar pending" :style="{ height: (day.pending / day.total * 100) + '%' }"></div>
                      <div class="bar cancelled" :style="{ height: (day.cancelled / day.total * 100) + '%' }"></div>
                      <div class="bar-label">{{ day.label }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="stats-summary">
              <div class="summary-header">
                <h3>Résumé des activités</h3>
              </div>
              <div class="summary-items">
                <div class="summary-item">
                  <div class="summary-icon success">
                    <i class="fas fa-check-circle"></i>
                  </div>
                  <div class="summary-content">
                    <h4>Taux de confirmation</h4>
                    <p>{{ Math.round((totalRdvConfirmes + totalInscriptionsConfirmees) / (totalRendezVous + totalInscriptions) * 100) }}%</p>
                  </div>
                </div>
                <div class="summary-item">
                  <div class="summary-icon warning">
                    <i class="fas fa-clock"></i>
                  </div>
                  <div class="summary-content">
                    <h4>En attente de validation</h4>
                    <p>{{ totalRdvEnAttente + totalInscriptionsEnAttente }}</p>
                  </div>
                </div>
                <div class="summary-item">
                  <div class="summary-icon danger">
                    <i class="fas fa-exclamation-triangle"></i>
                  </div>
                  <div class="summary-content">
                    <h4>Réclamations ouvertes</h4>
                    <p>{{ reclamationsOuvertes }}</p>
                  </div>
                </div>
                <div class="summary-item">
                  <div class="summary-icon info">
                    <i class="fas fa-calendar-alt"></i>
                  </div>
                  <div class="summary-content">
                    <h4>Prochains RDV</h4>
                    <p>{{ upcomingAppointments }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Navigation principale -->
        <div class="admin-navigation">
          <div class="nav-header">
            <h2>
              <i class="fas fa-cogs"></i>
              Modules de Gestion
            </h2>
            <div class="nav-stats">
              <div class="nav-stat">
                <span class="stat-value">{{ activeModulesCount }}</span>
                <span class="stat-label">Modules actifs</span>
              </div>
            </div>
          </div>
          
          <!-- Onglets de navigation modernes -->
          <div class="admin-tabs">
            <button 
              class="tab-btn"
              :class="{ 'active': activeTab === 'users' }"
              @click="changeTab('users')"
            >
              <div class="tab-main">
                <i class="fas fa-users-cog"></i>
                <span>Utilisateurs</span>
              </div>
              <div class="tab-badge" v-if="totalUsers > 0">{{ totalUsers }}</div>
            </button>
            <button 
              class="tab-btn"
              :class="{ 'active': activeTab === 'appointments' }"
              @click="changeTab('appointments')"
            >
              <div class="tab-main">
                <i class="fas fa-calendar-alt"></i>
                <span>Rendez-vous</span>
              </div>
              <div class="tab-badge" v-if="totalRdvEnAttente > 0">{{ totalRdvEnAttente }}</div>
            </button>
            <button 
              class="tab-btn"
              :class="{ 'active': activeTab === 'formations' }"
              @click="changeTab('formations')"
            >
              <div class="tab-main">
                <i class="fas fa-graduation-cap"></i>
                <span>Formations</span>
              </div>
              <div class="tab-badge" v-if="totalFormations > 0">{{ totalFormations }}</div>
            </button>
            <button 
              class="tab-btn"
              :class="{ 'active': activeTab === 'inscriptions' }"
              @click="changeTab('inscriptions')"
            >
              <div class="tab-main">
                <i class="fas fa-user-graduate"></i>
                <span>Inscriptions</span>
              </div>
              <div class="tab-badge" v-if="totalInscriptionsEnAttente > 0">{{ totalInscriptionsEnAttente }}</div>
            </button>
            <button 
              class="tab-btn"
              :class="{ 'active': activeTab === 'avis' }"
              @click="changeTab('avis')"
            >
              <div class="tab-main">
                <i class="fas fa-star"></i>
                <span>Avis clients</span>
              </div>
              <div class="tab-badge" v-if="totalAvis > 0">{{ totalAvis }}</div>
            </button>
            <button 
              class="tab-btn"
              :class="{ 'active': activeTab === 'reclamations' }"
              @click="changeTab('reclamations')"
            >
              <div class="tab-main">
                <i class="fas fa-exclamation-triangle"></i>
                <span>Réclamations</span>
              </div>
              <div class="tab-badge urgent" v-if="reclamationsOuvertes > 0">{{ reclamationsOuvertes }}</div>
            </button>
          </div>

          <!-- Actions rapides -->
          <div class="quick-actions">
            <button @click="createNewUser" class="quick-action-btn">
              <i class="fas fa-user-plus"></i>
              <span>Ajouter utilisateur</span>
            </button>
            <button @click="sendNotification" class="quick-action-btn">
              <i class="fas fa-bell"></i>
              <span>Notification</span>
            </button>
            <button @click="generateReport" class="quick-action-btn">
              <i class="fas fa-file-alt"></i>
              <span>Rapport</span>
            </button>
          </div>
        </div>
        
        <!-- Contenu des onglets -->
        <div class="admin-content">
          <!-- Section Utilisateurs -->
          <AdminUsers 
            v-if="activeTab === 'users'"
            ref="usersComponent"
            @show-success="showSuccessMessage"
            @show-error="showErrorMessage"
            @user-updated="refreshAllData"
          />
          
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
          
          <!-- Section Avis -->
          <AdminAvis 
            v-if="activeTab === 'avis'"
            ref="avisComponent"
            @show-success="showSuccessMessage"
            @show-error="showErrorMessage"
          />
          
          <!-- Section Réclamations -->
          <AdminReclamations 
            v-if="activeTab === 'reclamations'"
            ref="reclamationsComponent"
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
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import AdminRendezVous from '@/components/admin/AdminRendezVous.vue'
import AdminFormations from '@/components/admin/AdminFormations.vue'
import AdminInscriptions from '@/components/admin/AdminInscriptions.vue'
import AdminAvis from '@/components/admin/AdminAvis.vue'
import AdminReclamations from '@/components/admin/AdminReclamations.vue'
import AdminUsers from '@/components/admin/AdminUsers.vue'
import axios from 'axios'

// Configuration globale d'axios
axios.defaults.withCredentials = true

const router = useRouter()
const activeTab = ref('users')
const successMessage = ref('')
const errorMessage = ref('')

// Variables pour le dashboard
const selectedPeriod = ref(30)
const refreshing = ref(false)
const totalUsers = ref(0)
const newUsersThisWeek = ref(0)
const totalActivities = ref(0)
const overallRating = ref(4.2)
const upcomingAppointments = ref(0)

// Références aux composants enfants
const usersComponent = ref(null)
const rendezVousComponent = ref(null)
const formationsComponent = ref(null)
const inscriptionsComponent = ref(null)
const avisComponent = ref(null)
const reclamationsComponent = ref(null)

// Variables réactives pour les statistiques
const statsLoaded = ref(false)

// Données pour les graphiques
const chartData = ref([
  { date: '2024-01-01', label: 'Lun', confirmed: 25, pending: 8, cancelled: 3, total: 36 },
  { date: '2024-01-02', label: 'Mar', confirmed: 32, pending: 12, cancelled: 2, total: 46 },
  { date: '2024-01-03', label: 'Mer', confirmed: 28, pending: 6, cancelled: 4, total: 38 },
  { date: '2024-01-04', label: 'Jeu', confirmed: 35, pending: 15, cancelled: 1, total: 51 },
  { date: '2024-01-05', label: 'Ven', confirmed: 42, pending: 9, cancelled: 5, total: 56 },
  { date: '2024-01-06', label: 'Sam', confirmed: 19, pending: 4, cancelled: 2, total: 25 },
  { date: '2024-01-07', label: 'Dim', confirmed: 15, pending: 3, cancelled: 1, total: 19 }
])

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

const totalAvis = computed(() => {
  if (!statsLoaded.value || !avisComponent.value?.totalAvis) return 0
  return avisComponent.value.totalAvis
})

const moyenneNote = computed(() => {
  if (!statsLoaded.value || !avisComponent.value?.moyenneNote) return 0
  return avisComponent.value.moyenneNote
})

const totalReclamations = computed(() => {
  if (!statsLoaded.value || !reclamationsComponent.value?.totalReclamations) return 0
  return reclamationsComponent.value.totalReclamations
})

const reclamationsOuvertes = computed(() => {
  if (!statsLoaded.value || !reclamationsComponent.value?.reclamationsOuvertes) return 0
  return reclamationsComponent.value.reclamationsOuvertes
})

// Nouvelles computed properties pour le dashboard
const activeModulesCount = computed(() => {
  let count = 0
  if (totalUsers.value > 0) count++
  if (totalRendezVous.value > 0) count++
  if (totalFormations.value > 0) count++
  if (totalInscriptions.value > 0) count++
  if (totalAvis.value > 0) count++
  if (totalReclamations.value > 0) count++
  return count
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

// Nouvelles fonctions pour le dashboard
const refreshAllData = async () => {
  refreshing.value = true
  
  try {
    // Actualiser les statistiques utilisateurs
    await fetchUsersStats()
    
    // Actualiser les analytics en temps réel
    await fetchRealTimeAnalytics()
    
    // Actualiser les autres statistiques
    await refreshStats()
    
    // Actualiser les données des graphiques
    await updateAnalytics()
    
    showSuccessMessage('Données actualisées avec succès!')
  } catch (error) {
    console.error('Erreur lors de l\'actualisation:', error)
    showErrorMessage('Erreur lors de l\'actualisation des données')
  } finally {
    refreshing.value = false
  }
}

const fetchUsersStats = async () => {
  try {
    const response = await axios.get('http://localhost:3000/users/admin/stats', {
      withCredentials: true
    })
    
    totalUsers.value = response.data.totalUsers || 0
    newUsersThisWeek.value = response.data.newUsersThisWeek || 0
    totalActivities.value = response.data.totalActivities || 0
  } catch (error) {
    console.error('Erreur lors de la récupération des stats utilisateurs:', error)
    
    // Fallback avec des données simulées
    totalUsers.value = 5
    newUsersThisWeek.value = 2
    totalActivities.value = 28
  }
}

const fetchRealTimeAnalytics = async () => {
  try {
    const response = await axios.get('http://localhost:3000/analytics/real-time', {
      withCredentials: true
    })
    
    // Mettre à jour les statistiques en temps réel
    totalUsers.value = response.data.totalUsers || 0
    newUsersThisWeek.value = response.data.weekUsers || 0
    totalActivities.value = response.data.totalUsers || 0
    upcomingAppointments.value = response.data.onlineUsers || 0
    
    console.log('Analytics en temps réel mis à jour:', response.data)
  } catch (error) {
    console.error('Erreur lors de la récupération des analytics en temps réel:', error)
  }
}

const updateAnalytics = async () => {
  try {
    const [dashboardResponse, chartResponse] = await Promise.all([
      axios.get(`http://localhost:3000/analytics/dashboard?period=${selectedPeriod.value}`, {
        withCredentials: true
      }),
      axios.get(`http://localhost:3000/analytics/chart-data?period=7`, {
        withCredentials: true
      })
    ])
    
    // Mettre à jour les données du dashboard
    if (dashboardResponse.data) {
      const data = dashboardResponse.data
      totalUsers.value = data.totalUsers || 0
      newUsersThisWeek.value = data.newUsers || 0
      totalActivities.value = data.totalUsers || 0
    }
    
    // Mettre à jour les données des graphiques
    if (chartResponse.data.dailyRegistrations) {
      chartData.value = chartResponse.data.dailyRegistrations.map(item => ({
        date: item.date,
        label: item.label,
        confirmed: item.newUsers || 0,
        pending: Math.floor(item.newUsers * 0.2) || 0,
        cancelled: Math.floor(item.newUsers * 0.1) || 0,
        total: item.newUsers || 0
      }))
    }
    
    upcomingAppointments.value = dashboardResponse.data.activeUsers || 0
  } catch (error) {
    console.error('Erreur lors de la récupération des analytics:', error)
    
    // Utiliser les données par défaut déjà définies
    upcomingAppointments.value = 12
  }
}

const createNewUser = () => {
  // Changer vers l'onglet utilisateurs et ouvrir le modal de création
  activeTab.value = 'users'
  nextTick(() => {
    if (usersComponent.value && usersComponent.value.openCreateModal) {
      usersComponent.value.openCreateModal()
    }
  })
}

const sendNotification = () => {
  // Fonctionnalité à implémenter
  showSuccessMessage('Fonctionnalité de notification bientôt disponible!')
}

const generateReport = async () => {
  try {
    // Simulation de génération de rapport
    const reportContent = generateReportContent()
    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8;' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `rapport-admin-${new Date().toISOString().split('T')[0]}.txt`)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
    
    showSuccessMessage('Rapport téléchargé avec succès!')
  } catch (error) {
    console.error('Erreur lors de la génération du rapport:', error)
    showErrorMessage('Erreur lors de la génération du rapport')
  }
}

const generateReportContent = () => {
  const date = new Date().toLocaleDateString('fr-FR')
  return `RAPPORT ADMINISTRATEUR - ${date}

=== STATISTIQUES GÉNÉRALES ===
- Total utilisateurs: ${totalUsers.value}
- Nouveaux utilisateurs cette semaine: ${newUsersThisWeek.value}
- Total activités: ${totalActivities.value}
- Note moyenne: ${moyenneNote.value.toFixed(1)}/5

=== RENDEZ-VOUS ===
- Total: ${totalRendezVous.value}
- Confirmés: ${totalRdvConfirmes.value}
- En attente: ${totalRdvEnAttente.value}

=== FORMATIONS ===
- Total formations: ${totalFormations.value}
- Total inscriptions: ${totalInscriptions.value}
- Confirmées: ${totalInscriptionsConfirmees.value}
- En attente: ${totalInscriptionsEnAttente.value}
- Annulées: ${totalInscriptionsAnnulees.value}

=== AVIS ET RÉCLAMATIONS ===
- Total avis: ${totalAvis.value}
- Réclamations ouvertes: ${reclamationsOuvertes.value}

=== PROCHAINES ÉCHÉANCES ===
- Rendez-vous à venir: ${upcomingAppointments.value}

Rapport généré automatiquement le ${new Date().toLocaleString('fr-FR')}
`
}

const exportData = async () => {
  try {
    // Simulation d'export de données
    const csvContent = generateExportCSV()
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `donnees-export-${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
    
    showSuccessMessage('Données exportées avec succès!')
  } catch (error) {
    console.error('Erreur lors de l\'export:', error)
    showErrorMessage('Erreur lors de l\'export des données')
  }
}

const generateExportCSV = () => {
  const headers = ['Type', 'Nom', 'Statut', 'Date', 'Détails']
  const rows = [
    ['Statistique', 'Total Utilisateurs', 'Actuel', new Date().toISOString().split('T')[0], totalUsers.value],
    ['Statistique', 'Total RDV', 'Actuel', new Date().toISOString().split('T')[0], totalRendezVous.value],
    ['Statistique', 'Total Formations', 'Actuel', new Date().toISOString().split('T')[0], totalFormations.value],
    ['Statistique', 'Note Moyenne', 'Actuel', new Date().toISOString().split('T')[0], moyenneNote.value.toFixed(1)]
  ]
  
  const csvContent = [headers, ...rows]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n')
  
  return csvContent
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

// Actualisation automatique en temps réel
const autoRefreshInterval = ref(null)

const startAutoRefresh = () => {
  // Actualiser toutes les 30 secondes
  autoRefreshInterval.value = setInterval(async () => {
    try {
      await fetchRealTimeAnalytics()
    } catch (error) {
      console.error('Erreur lors de l\'actualisation automatique:', error)
    }
  }, 30000) // 30 secondes
}

const stopAutoRefresh = () => {
  if (autoRefreshInterval.value) {
    clearInterval(autoRefreshInterval.value)
    autoRefreshInterval.value = null
  }
}

// Initialisation
onMounted(async () => {
  const hasAccess = await checkAdminAccess()
  if (!hasAccess) {
    return
  }
  
  // Initialiser toutes les données du dashboard
  await refreshAllData()
  
  // Démarrer l'actualisation automatique
  startAutoRefresh()
})

// Nettoyer l'intervalle lors de la destruction du composant
onUnmounted(() => {
  stopAutoRefresh()
})
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  margin-top: 125px;
  background: #f8fafc;
}

/* Section héro admin moderne */
.admin-hero {
  position: relative;
  min-height: 350px;
  overflow: hidden;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
}

.floating-shapes {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 8s ease-in-out infinite;
}

.shape-1 {
  width: 120px;
  height: 120px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 80px;
  height: 80px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.shape-3 {
  width: 150px;
  height: 150px;
  top: 40%;
  left: 70%;
  animation-delay: 4s;
}

.shape-4 {
  width: 60px;
  height: 60px;
  top: 10%;
  right: 40%;
  animation-delay: 6s;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8));
}

.hero-content {
  position: relative;
  z-index: 2;
  color: white;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 2rem 0;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.15);
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: fadeInUp 0.8s ease-out;
}

.badge-icon {
  font-size: 1.2rem;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0 0 1rem;
  line-height: 1.2;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.title-main {
  display: block;
  opacity: 0.9;
}

.title-accent {
  display: block;
  background: linear-gradient(45deg, #fbbf24, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.3rem;
  margin: 0 0 2rem;
  opacity: 0.9;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  animation: fadeInUp 0.8s ease-out 0.6s both;
}

.hero-stat {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem 1.5rem;
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-icon {
  font-size: 2rem;
}

.stat-info {
  text-align: left;
}

.stat-number {
  display: block;
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  animation: fadeInUp 0.8s ease-out 0.8s both;
}

.hero-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.hero-btn.primary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.hero-btn.secondary {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.hero-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.hero-btn.primary:hover {
  background: rgba(255, 255, 255, 0.3);
}

.hero-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* Section principale */
.admin-main {
  padding: 0 0 4rem;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Dashboard Analytics */
.dashboard-analytics {
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
  overflow: hidden;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2.5rem;
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  border-bottom: 1px solid #e2e8f0;
}

.section-header h2 {
  margin: 0;
  color: #1f2937;
  font-size: 1.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.time-filter select {
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  background: white;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.time-filter select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.real-time-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 1rem;
  padding: 0.25rem 0.75rem;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.real-time-indicator i {
  animation: pulse 2s infinite;
}

.refresh-status {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.last-update {
  font-size: 0.85rem;
  color: #6b7280;
  font-weight: 500;
}

/* Métriques principales */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
  background: #f8fafc;
}

.metric-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.metric-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.metric-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
}

.metric-card.primary::before { background: linear-gradient(90deg, #667eea, #764ba2); }
.metric-card.success::before { background: linear-gradient(90deg, #10b981, #059669); }
.metric-card.warning::before { background: linear-gradient(90deg, #f59e0b, #d97706); }
.metric-card.danger::before { background: linear-gradient(90deg, #ef4444, #dc2626); }

.metric-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.metric-icon {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  color: white;
}

.metric-card.primary .metric-icon { background: linear-gradient(135deg, #667eea, #764ba2); }
.metric-card.success .metric-icon { background: linear-gradient(135deg, #10b981, #059669); }
.metric-card.warning .metric-icon { background: linear-gradient(135deg, #f59e0b, #d97706); }
.metric-card.danger .metric-icon { background: linear-gradient(135deg, #ef4444, #dc2626); }

.metric-trend {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
}

.metric-trend.up {
  background: #d1fae5;
  color: #065f46;
}

.metric-content h3 {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  color: #1f2937;
}

.metric-content p {
  margin: 0;
  color: #6b7280;
  font-size: 1rem;
  font-weight: 500;
}

.metric-subtitle {
  font-size: 0.85rem;
  color: #9ca3af;
  margin-top: 0.5rem;
}

.mini-chart {
  display: flex;
  align-items: end;
  gap: 2px;
  height: 40px;
  margin-top: 1rem;
}

.chart-bar {
  flex: 1;
  background: linear-gradient(to top, #667eea, #764ba2);
  border-radius: 2px;
  min-height: 4px;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.metric-card:hover .chart-bar {
  opacity: 1;
}

.metric-progress {
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  margin-top: 1rem;
  overflow: hidden;
}

.metric-progress .progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #10b981, #059669);
  border-radius: 4px;
  transition: width 1s ease;
}

.metric-donut {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.donut-chart {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: conic-gradient(#f59e0b 0deg, #f59e0b var(--percentage, 0), #e2e8f0 var(--percentage, 0));
}

.metric-rating {
  display: flex;
  gap: 4px;
  margin-top: 1rem;
}

.rating-bar {
  flex: 1;
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
}

.rating-bar.active {
  background: linear-gradient(90deg, #fbbf24, #f59e0b);
}

.rating-stars {
  color: #fbbf24;
}

/* Graphiques et statistiques */
.charts-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  padding: 2rem;
  background: white;
}

.chart-container {
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.5rem;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.chart-header h3 {
  margin: 0;
  color: #1f2937;
  font-size: 1.25rem;
  font-weight: 600;
}

.chart-legend {
  display: flex;
  gap: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #6b7280;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.legend-color.confirmed { background: #10b981; }
.legend-color.pending { background: #f59e0b; }
.legend-color.cancelled { background: #ef4444; }

.activity-chart {
  height: 200px;
  display: flex;
  align-items: end;
  justify-content: center;
}

.chart-bars {
  display: flex;
  align-items: end;
  gap: 1rem;
  height: 100%;
  width: 100%;
}

.bar-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  position: relative;
}

.bar {
  width: 20px;
  border-radius: 4px 4px 0 0;
  margin-bottom: 2px;
  transition: all 0.3s ease;
}

.bar.confirmed { background: #10b981; }
.bar.pending { background: #f59e0b; }
.bar.cancelled { background: #ef4444; }

.bar-label {
  position: absolute;
  bottom: -20px;
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
}

.stats-summary {
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.5rem;
}

.summary-header h3 {
  margin: 0 0 1.5rem;
  color: #1f2937;
  font-size: 1.25rem;
  font-weight: 600;
}

.summary-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.summary-item:hover {
  transform: translateX(5px);
}

.summary-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
}

.summary-icon.success { background: linear-gradient(135deg, #10b981, #059669); }
.summary-icon.warning { background: linear-gradient(135deg, #f59e0b, #d97706); }
.summary-icon.danger { background: linear-gradient(135deg, #ef4444, #dc2626); }
.summary-icon.info { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }

.summary-content h4 {
  margin: 0 0 0.25rem;
  color: #1f2937;
  font-size: 0.9rem;
  font-weight: 600;
}

.summary-content p {
  margin: 0;
  color: #6b7280;
  font-size: 1.25rem;
  font-weight: 700;
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

/* Navigation moderne */
.admin-navigation {
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
  overflow: hidden;
}

.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2.5rem;
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  border-bottom: 1px solid #e2e8f0;
}

.nav-header h2 {
  margin: 0;
  color: #1f2937;
  font-size: 1.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.nav-stats {
  display: flex;
  gap: 2rem;
}

.nav-stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
  line-height: 1;
}

.stat-label {
  font-size: 0.8rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 0.25rem;
}

.admin-tabs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0;
  background: white;
  padding: 1.5rem 2rem;
}

.tab-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 1rem;
  border: none;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  border-radius: 16px;
}

.tab-btn::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transform: translateX(-50%);
  transition: width 0.4s ease;
  border-radius: 3px;
}

.tab-btn:hover {
  background: rgba(102, 126, 234, 0.05);
  color: #667eea;
  transform: translateY(-2px);
}

.tab-btn:hover::before {
  width: 60%;
}

.tab-btn.active {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  color: #667eea;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
}

.tab-btn.active::before {
  width: 80%;
}

.tab-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.tab-main i {
  font-size: 1.5rem;
}

.tab-main span {
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tab-badge {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 10px;
  min-width: 20px;
  text-align: center;
  animation: pulse 2s infinite;
}

.tab-badge.urgent {
  background: linear-gradient(135deg, #dc2626, #991b1b);
  animation: urgentPulse 1s infinite;
}

.quick-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem 2rem 2rem;
  background: #f8fafc;
}

.quick-action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  color: #6b7280;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quick-action-btn:hover {
  background: #667eea;
  color: white;
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
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

/* Responsive Design */
@media (max-width: 1200px) {
  .container {
    max-width: 1000px;
  }

  .charts-section {
    grid-template-columns: 1fr;
  }

  .metrics-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 968px) {
  .admin-hero {
    min-height: 280px;
  }
  
  .hero-title {
    font-size: 2.8rem;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .hero-stat {
    justify-content: center;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .section-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .nav-header {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
  
  .admin-tabs {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 0.5rem;
  }
  
  .quick-actions {
    flex-direction: column;
  }
  
  .quick-action-btn {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .admin-page {
    margin-top: 100px;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  .admin-hero {
    min-height: 250px;
    margin-bottom: 2rem;
  }
  
  .hero-title {
    font-size: 2.2rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .hero-badge {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
  
  .metrics-grid {
    grid-template-columns: 1fr;
    padding: 1.5rem;
    gap: 1rem;
  }
  
  .metric-card {
    padding: 1.5rem;
  }
  
  .section-header {
    padding: 1.5rem;
  }
  
  .section-header h2 {
    font-size: 1.5rem;
  }
  
  .nav-header {
    padding: 1.5rem;
  }
  
  .nav-header h2 {
    font-size: 1.5rem;
  }
  
  .admin-tabs {
    grid-template-columns: repeat(2, 1fr);
    padding: 1rem;
    gap: 0.5rem;
  }
  
  .tab-btn {
    padding: 1rem 0.5rem;
  }
  
  .tab-main span {
    font-size: 0.8rem;
  }
  
  .quick-actions {
    padding: 1rem 1.5rem 1.5rem;
  }
  
  .charts-section {
    padding: 1.5rem;
  }
  
  .chart-container {
    padding: 1rem;
  }
  
  .stats-summary {
    padding: 1rem;
  }
  
  .summary-item {
    padding: 0.75rem;
  }
  
  .chart-legend {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .bar-group {
    gap: 0.5rem;
  }
  
  .bar {
    width: 15px;
  }
}

@media (max-width: 480px) {
  .admin-hero {
    min-height: 200px;
  }
  
  .hero-title {
    font-size: 1.8rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .hero-stats {
    gap: 0.75rem;
  }
  
  .hero-stat {
    padding: 0.75rem 1rem;
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
  
  .stat-info {
    text-align: center;
  }
  
  .stat-number {
    font-size: 1.5rem;
  }
  
  .metrics-grid {
    padding: 1rem;
  }
  
  .metric-card {
    padding: 1rem;
  }
  
  .metric-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .metric-icon {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }
  
  .metric-content h3 {
    font-size: 2rem;
  }
  
  .section-header {
    padding: 1rem;
  }
  
  .section-header h2 {
    font-size: 1.25rem;
  }
  
  .nav-header {
    padding: 1rem;
  }
  
  .nav-header h2 {
    font-size: 1.25rem;
  }
  
  .admin-tabs {
    grid-template-columns: 1fr;
  }
  
  .tab-btn {
    padding: 0.75rem;
  }
  
  .tab-main {
    flex-direction: row;
    justify-content: center;
    gap: 0.5rem;
  }
  
  .tab-main i {
    font-size: 1.25rem;
  }
  
  .tab-main span {
    font-size: 0.85rem;
  }
  
  .quick-actions {
    padding: 1rem;
  }
  
  .quick-action-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}

/* Styles pour les écrans très larges */
@media (min-width: 1600px) {
  .container {
    max-width: 1600px;
  }
  
  .metrics-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  
  .hero-title {
    font-size: 4rem;
  }
  
  .section-header h2 {
    font-size: 2rem;
  }
  
  .nav-header h2 {
    font-size: 2rem;
  }
}

/* Animations avancées */
@keyframes float {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
    opacity: 0.7;
  }
  25% { 
    transform: translateY(-10px) rotate(90deg); 
    opacity: 0.9;
  }
  50% { 
    transform: translateY(-20px) rotate(180deg); 
    opacity: 1;
  }
  75% { 
    transform: translateY(-10px) rotate(270deg); 
    opacity: 0.9;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% { 
    transform: scale(1); 
    opacity: 1;
  }
  50% { 
    transform: scale(1.05); 
    opacity: 0.8;
  }
  100% { 
    transform: scale(1); 
    opacity: 1;
  }
}

@keyframes urgentPulse {
  0% { 
    transform: scale(1); 
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
  }
  70% { 
    transform: scale(1.05); 
    box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
  }
  100% { 
    transform: scale(1); 
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes shimmer {
  0% { 
    background-position: -200px 0; 
  }
  100% { 
    background-position: calc(200px + 100%) 0; 
  }
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Effets de loading et de transition */
.loading-shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: shimmer 1.5s infinite;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(-100px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style> 