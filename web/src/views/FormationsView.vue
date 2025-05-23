<template>
  <div class="formations-page">
    <TheHeader />
    
    <!-- Section héro -->
    <section class="formations-hero">
      <div class="formations-hero-bg"></div>
      <div class="container">
        <div class="formations-hero-content">
          <h1>🎓 Formations Disponibles</h1>
          <p>Développez vos compétences avec nos formations professionnelles</p>
        </div>
      </div>
    </section>
    
    <!-- Section principale -->
    <section class="formations-main">
      <div class="container">
        
        <!-- Loading state -->
        <div v-if="loading" class="loading-state">
          <div class="loading-spinner"></div>
          <p>Chargement des formations...</p>
        </div>
        
        <!-- État vide -->
        <div v-else-if="formations.length === 0" class="no-formations">
          <div class="empty-icon">📚</div>
          <h3>Aucune formation disponible</h3>
          <p>Aucune formation n'est actuellement proposée. Revenez bientôt !</p>
        </div>
        
        <!-- Liste des formations -->
        <div v-else class="formations-grid">
          <div 
            v-for="formation in formations" 
            :key="formation.id"
            class="formation-card"
          >
            <!-- Image/Icône de la formation -->
            <div class="formation-image">
              <i class="fas fa-graduation-cap"></i>
            </div>
            
            <!-- Contenu de la formation -->
            <div class="formation-content">
              <div class="formation-header">
                <h3>{{ formation.titre }}</h3>
                <div class="formation-price" v-if="formation.prix > 0">
                  {{ formation.prix }}€
                </div>
                <div class="formation-price free" v-else>
                  Gratuit
                </div>
              </div>
              
              <p class="formation-description">{{ formation.description }}</p>
              
              <div class="formation-details">
                <div class="detail-item">
                  <i class="fas fa-calendar-alt"></i>
                  <span>Du {{ formatDate(formation.dateDebut) }} au {{ formatDate(formation.dateFin) }}</span>
                </div>
                
                <div class="detail-item">
                  <i class="fas fa-clock"></i>
                  <span>{{ formation.heureDebut }} - {{ formation.heureFin }}</span>
                </div>
                
                <div class="detail-item">
                  <i class="fas fa-map-marker-alt"></i>
                  <span>{{ formation.lieu }}</span>
                </div>
                
                <div class="detail-item">
                  <i class="fas fa-users"></i>
                  <span>{{ formation.inscriptions.length }}/{{ formation.maxParticipants }} participants</span>
                </div>
              </div>
              
              <!-- Progress bar for participants -->
              <div class="participants-progress">
                <div 
                  class="progress-bar" 
                  :style="{ width: (formation.inscriptions.length / formation.maxParticipants * 100) + '%' }"
                ></div>
              </div>
              
              <!-- Statut de la formation -->
              <div class="formation-status">
                <span 
                  class="status-badge"
                  :class="getStatusClass(formation)"
                >
                  {{ getStatusText(formation) }}
                </span>
              </div>
            </div>
            
            <!-- Actions -->
            <div class="formation-actions">
              <button 
                @click="inscrireFormation(formation.id)"
                :disabled="!canSubscribe(formation) || subscribing === formation.id"
                class="subscribe-btn"
                :class="{ 'disabled': !canSubscribe(formation) }"
              >
                <i v-if="subscribing === formation.id" class="fas fa-spinner fa-spin"></i>
                <i v-else-if="isAlreadySubscribed(formation.id)" class="fas fa-check"></i>
                <i v-else class="fas fa-user-plus"></i>
                
                <span v-if="subscribing === formation.id">Inscription...</span>
                <span v-else-if="isAlreadySubscribed(formation.id)">Déjà inscrit</span>
                <span v-else-if="formation.inscriptions.length >= formation.maxParticipants">Complet</span>
                <span v-else>S'inscrire</span>
              </button>
            </div>
          </div>
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import axios from 'axios'

// Configuration globale d'axios
axios.defaults.withCredentials = true

const router = useRouter()
const formations = ref([])
const userInscriptions = ref([])
const loading = ref(true)
const subscribing = ref(null)
const successMessage = ref('')
const errorMessage = ref('')

// Fonctions utilitaires
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

const getStatusText = (formation) => {
  if (formation.inscriptions.length >= formation.maxParticipants) {
    return 'Complet'
  }
  if (new Date(formation.dateDebut) <= new Date()) {
    return 'En cours'
  }
  return 'Disponible'
}

const getStatusClass = (formation) => {
  if (formation.inscriptions.length >= formation.maxParticipants) {
    return 'full'
  }
  if (new Date(formation.dateDebut) <= new Date()) {
    return 'ongoing'
  }
  return 'available'
}

const canSubscribe = (formation) => {
  // Vérifier si pas complet
  if (formation.inscriptions.length >= formation.maxParticipants) {
    return false
  }
  
  // Vérifier si pas déjà commencé
  if (new Date(formation.dateDebut) <= new Date()) {
    return false
  }
  
  // Vérifier si pas déjà inscrit
  if (isAlreadySubscribed(formation.id)) {
    return false
  }
  
  return true
}

const isAlreadySubscribed = (formationId) => {
  return userInscriptions.value.some(inscription => 
    inscription.formationId === formationId && inscription.statut !== 'annulé'
  )
}

// Récupérer les formations actives
const fetchFormations = async () => {
  try {
    loading.value = true
    const response = await axios.get('http://localhost:3000/formations/active', {
      withCredentials: true
    })
    formations.value = response.data
    console.log('Formations récupérées:', response.data)
  } catch (error) {
    console.error('Erreur lors de la récupération des formations:', error)
    errorMessage.value = 'Impossible de charger les formations.'
  } finally {
    loading.value = false
  }
}

// Récupérer les inscriptions de l'utilisateur
const fetchUserInscriptions = async () => {
  try {
    const response = await axios.get('http://localhost:3000/formations/user/inscriptions', {
      withCredentials: true
    })
    userInscriptions.value = response.data
    console.log('Inscriptions utilisateur:', response.data)
  } catch (error) {
    // L'utilisateur n'est peut-être pas connecté, ce n'est pas grave
    console.log('Utilisateur non connecté ou aucune inscription')
  }
}

// S'inscrire à une formation
const inscrireFormation = async (formationId) => {
  subscribing.value = formationId
  
  try {
    const response = await axios.post(
      `http://localhost:3000/formations/${formationId}/inscription`,
      { notes: '' },
      { withCredentials: true }
    )
    
    successMessage.value = 'Inscription réussie ! Vous recevrez une confirmation par email.'
    
    // Actualiser les données
    await fetchFormations()
    await fetchUserInscriptions()
    
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
    
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error)
    if (error.response?.status === 401) {
      errorMessage.value = 'Vous devez être connecté pour vous inscrire à une formation.'
      router.push('/login')
    } else {
      errorMessage.value = error.response?.data?.error || 'Impossible de procéder à l\'inscription.'
    }
    
    setTimeout(() => {
      errorMessage.value = ''
    }, 3000)
  } finally {
    subscribing.value = null
  }
}

// Initialisation
onMounted(async () => {
  await fetchFormations()
  await fetchUserInscriptions()
})
</script>

<style scoped>
.formations-page {
  min-height: 100vh;
  margin-top: 125px;
  background: #f8fafc;
}

/* Section héro */
.formations-hero {
  position: relative;
  height: 200px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.formations-hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
}

.formations-hero-content {
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

.formations-hero h1 {
  font-size: 2.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.formations-hero p {
  font-size: 1.2rem;
  margin: 0;
  opacity: 0.9;
}

/* Section principale */
.formations-main {
  padding: 0 0 4rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Loading state */
.loading-state {
  text-align: center;
  padding: 4rem 2rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-left: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* État vide */
.no-formations {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.no-formations h3 {
  margin: 0 0 0.5rem;
  color: #1f2937;
  font-size: 1.5rem;
}

.no-formations p {
  margin: 0;
  color: #6b7280;
}

/* Grille des formations */
.formations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
}

.formation-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
}

.formation-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.formation-image {
  height: 120px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
}

.formation-content {
  padding: 1.5rem;
}

.formation-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.formation-header h3 {
  margin: 0;
  color: #1f2937;
  font-size: 1.25rem;
  flex: 1;
}

.formation-price {
  background: #3b82f6;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-left: 1rem;
}

.formation-price.free {
  background: #10b981;
}

.formation-description {
  color: #6b7280;
  margin: 0 0 1.5rem;
  line-height: 1.6;
}

.formation-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4b5563;
  font-size: 0.9rem;
}

.detail-item i {
  width: 16px;
  color: #3b82f6;
}

.participants-progress {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.progress-bar {
  height: 100%;
  background: #3b82f6;
  transition: width 0.3s ease;
}

.formation-status {
  margin-bottom: 1rem;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.status-badge.available {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.full {
  background: #fee2e2;
  color: #991b1b;
}

.status-badge.ongoing {
  background: #fef3c7;
  color: #92400e;
}

.formation-actions {
  padding: 0 1.5rem 1.5rem;
}

.subscribe-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.subscribe-btn:hover:not(.disabled) {
  background: #2563eb;
  transform: translateY(-1px);
}

.subscribe-btn.disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
}

/* Notifications */
.notification {
  position: fixed;
  top: 140px;
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
  .formations-hero h1 {
    font-size: 2rem;
  }
  
  .formations-grid {
    grid-template-columns: 1fr;
  }
  
  .formation-header {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .formation-price {
    margin-left: 0;
    align-self: flex-start;
  }
  
  .container {
    padding: 0 1rem;
  }
}
</style> 