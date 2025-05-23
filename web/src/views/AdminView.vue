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
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">📅</div>
            <div class="stat-content">
              <h3>{{ rendezVous.length }}</h3>
              <p>Total rendez-vous</p>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">⏳</div>
            <div class="stat-content">
              <h3>{{ rendezVousEnAttente.length }}</h3>
              <p>En attente</p>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">✅</div>
            <div class="stat-content">
              <h3>{{ rendezVousConfirmes.length }}</h3>
              <p>Confirmés</p>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">❌</div>
            <div class="stat-content">
              <h3>{{ rendezVousAnnules.length }}</h3>
              <p>Annulés</p>
            </div>
          </div>
        </div>
        
        <!-- Filtres -->
        <div class="admin-filters">
          <h2>Gestion du Système</h2>
          
          <!-- Onglets de navigation -->
          <div class="admin-tabs">
            <button 
              class="tab-btn"
              :class="{ 'active': activeTab === 'appointments' }"
              @click="activeTab = 'appointments'"
            >
              <i class="fas fa-calendar-alt"></i>
              Rendez-vous
            </button>
            <button 
              class="tab-btn"
              :class="{ 'active': activeTab === 'formations' }"
              @click="activeTab = 'formations'"
            >
              <i class="fas fa-graduation-cap"></i>
              Formations
            </button>
            <button 
              class="tab-btn"
              :class="{ 'active': activeTab === 'inscriptions' }"
              @click="activeTab = 'inscriptions'"
            >
              <i class="fas fa-user-graduate"></i>
              Inscriptions
            </button>
          </div>
        </div>
        
        <!-- Section Rendez-vous -->
        <div v-if="activeTab === 'appointments'" class="admin-section">
          <div class="section-header">
            <h3>Gestion des Rendez-vous</h3>
            <button @click="refreshData" class="refresh-btn">
              <i class="fas fa-sync-alt spinning"></i>
              Actualiser
            </button>
          </div>
          
          <div class="filter-buttons">
            <button 
              class="filter-btn"
              :class="{ 'active': filterStatus === 'all' }"
              @click="filterStatus = 'all'"
            >
              Tous ({{ rendezVous.length }})
            </button>
            <button 
              class="filter-btn pending"
              :class="{ 'active': filterStatus === 'en_attente' }"
              @click="filterStatus = 'en_attente'"
            >
              En attente ({{ rendezVousEnAttente.length }})
            </button>
            <button 
              class="filter-btn confirmed"
              :class="{ 'active': filterStatus === 'confirmé' }"
              @click="filterStatus = 'confirmé'"
            >
              Confirmés ({{ rendezVousConfirmes.length }})
            </button>
            <button 
              class="filter-btn cancelled"
              :class="{ 'active': filterStatus === 'annulé' }"
              @click="filterStatus = 'annulé'"
            >
              Annulés ({{ rendezVousAnnules.length }})
            </button>
          </div>
        </div>
        
        <!-- Section Formations -->
        <div v-if="activeTab === 'formations'" class="admin-section">
          <div class="section-header">
            <h3>Gestion des Formations</h3>
            <div class="header-actions">
              <button @click="showCreateFormation = true" class="create-btn">
                <i class="fas fa-plus"></i>
                Nouvelle Formation
              </button>
              <button @click="refreshFormations" class="refresh-btn">
                <i class="fas fa-sync-alt spinning"></i>
                Actualiser
              </button>
            </div>
          </div>
          
          <!-- Formations Grid -->
          <div v-if="formations.length === 0" class="no-formations">
            <div class="empty-icon">📚</div>
            <h3>Aucune formation</h3>
            <p>Aucune formation n'a été créée. Créez votre première formation !</p>
          </div>
          
          <div v-else class="formations-admin-grid">
            <div 
              v-for="formation in formations" 
              :key="formation.id"
              class="formation-admin-card"
            >
              <!-- En-tête de la formation -->
              <div class="formation-admin-header">
                <h4>{{ formation.titre }}</h4>
                <div class="formation-admin-price" :class="{ 'free': formation.prix === 0 }">
                  {{ formation.prix === 0 ? 'Gratuit' : formation.prix + '€' }}
                </div>
              </div>
              
              <!-- Détails de la formation -->
              <div class="formation-admin-body">
                <p class="formation-description">{{ formation.description }}</p>
                
                <div class="formation-admin-details">
                  <div class="detail-row">
                    <i class="fas fa-calendar-alt"></i>
                    <span>{{ formatDate(formation.dateDebut) }} - {{ formatDate(formation.dateFin) }}</span>
                  </div>
                  
                  <div class="detail-row">
                    <i class="fas fa-clock"></i>
                    <span>{{ formation.heureDebut }} - {{ formation.heureFin }}</span>
                  </div>
                  
                  <div class="detail-row">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>{{ formation.lieu }}</span>
                  </div>
                  
                  <div class="detail-row">
                    <i class="fas fa-users"></i>
                    <span>{{ formation.inscriptions.length }}/{{ formation.maxParticipants }} participants</span>
                  </div>
                </div>
                
                <!-- Statut -->
                <div class="formation-status">
                  <span class="status-badge" :class="formation.statut">
                    {{ getFormationStatusText(formation.statut) }}
                  </span>
                </div>
              </div>
              
              <!-- Actions -->
              <div class="formation-admin-actions">
                <button @click="editFormation(formation)" class="edit-btn">
                  <i class="fas fa-edit"></i>
                  Modifier
                </button>
                <button @click="deleteFormation(formation.id)" class="delete-btn">
                  <i class="fas fa-trash"></i>
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Section Inscriptions -->
        <div v-if="activeTab === 'inscriptions'" class="admin-section">
          <div class="section-header">
            <h3>Gestion des Inscriptions</h3>
            <button @click="refreshInscriptions" class="refresh-btn">
              <i class="fas fa-sync-alt spinning"></i>
              Actualiser
            </button>
          </div>
          
          <!-- Filtres des inscriptions -->
          <div class="filter-buttons">
            <button 
              class="filter-btn"
              :class="{ 'active': filterInscriptionStatus === 'all' }"
              @click="filterInscriptionStatus = 'all'"
            >
              Toutes ({{ inscriptions.length }})
            </button>
            <button 
              class="filter-btn pending"
              :class="{ 'active': filterInscriptionStatus === 'en_attente' }"
              @click="filterInscriptionStatus = 'en_attente'"
            >
              En attente ({{ inscriptionsEnAttente.length }})
            </button>
            <button 
              class="filter-btn confirmed"
              :class="{ 'active': filterInscriptionStatus === 'confirmé' }"
              @click="filterInscriptionStatus = 'confirmé'"
            >
              Confirmées ({{ inscriptionsConfirmees.length }})
            </button>
            <button 
              class="filter-btn cancelled"
              :class="{ 'active': filterInscriptionStatus === 'annulé' }"
              @click="filterInscriptionStatus = 'annulé'"
            >
              Annulées ({{ inscriptionsAnnulees.length }})
            </button>
          </div>
          
          <!-- Liste des inscriptions -->
          <div v-if="filteredInscriptions.length === 0" class="no-inscriptions">
            <div class="empty-icon">🎓</div>
            <h3>Aucune inscription</h3>
            <p>Aucune inscription trouvée pour le filtre sélectionné.</p>
          </div>
          
          <div v-else class="inscriptions-grid">
            <div 
              v-for="inscription in filteredInscriptions" 
              :key="inscription.id"
              class="inscription-admin-card"
              :class="`status-${inscription.statut}`"
            >
              <!-- En-tête de l'inscription -->
              <div class="inscription-header">
                <div class="formation-info">
                  <h4>{{ inscription.formation.titre }}</h4>
                  <span class="formation-dates">
                    {{ formatDate(inscription.formation.dateDebut) }} - {{ formatDate(inscription.formation.dateFin) }}
                  </span>
                </div>
                <div class="inscription-status" :class="`status-${inscription.statut}`">
                  {{ getInscriptionStatusText(inscription.statut) }}
                </div>
              </div>
              
              <!-- Contenu principal -->
              <div class="inscription-body">
                <!-- Informations participant -->
                <div class="participant-info">
                  <h5>Participant</h5>
                  <p class="participant-name">{{ inscription.user.prenom }} {{ inscription.user.nom }}</p>
                  <div class="contact-info">
                    <p><i class="fas fa-envelope"></i> {{ inscription.user.email }}</p>
                    <p v-if="inscription.user.telephone"><i class="fas fa-phone"></i> {{ inscription.user.telephone }}</p>
                    <p v-if="inscription.user.secteurActivite"><i class="fas fa-building"></i> {{ inscription.user.secteurActivite }}</p>
                  </div>
                </div>
                
                <!-- Informations formation -->
                <div class="formation-details">
                  <h5>Détails Formation</h5>
                  <div class="detail-row">
                    <i class="fas fa-clock"></i>
                    <span>{{ inscription.formation.heureDebut }} - {{ inscription.formation.heureFin }}</span>
                  </div>
                  <div class="detail-row">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>{{ inscription.formation.lieu }}</span>
                  </div>
                  <div class="detail-row">
                    <i class="fas fa-euro-sign"></i>
                    <span>{{ inscription.formation.prix === 0 ? 'Gratuit' : inscription.formation.prix + '€' }}</span>
                  </div>
                </div>
                
                <!-- Notes si présentes -->
                <div v-if="inscription.notes" class="inscription-notes">
                  <h5>Notes du participant</h5>
                  <p>{{ inscription.notes }}</p>
                </div>
              </div>
              
              <!-- Actions admin -->
              <div class="inscription-actions" v-if="inscription.statut === 'en_attente'">
                <button 
                  @click="confirmerInscription(inscription.id)"
                  class="action-btn confirm-btn"
                  :disabled="updatingInscription === inscription.id"
                >
                  <i class="fas fa-check-circle"></i>
                  Confirmer
                </button>
                
                <button 
                  @click="annulerInscription(inscription.id)"
                  class="action-btn reject-btn"
                  :disabled="updatingInscription === inscription.id"
                >
                  <i class="fas fa-times-circle"></i>
                  Refuser
                </button>
              </div>
              
              <!-- Métadonnées -->
              <div class="inscription-meta">
                <p class="created-at">
                  <i class="fas fa-calendar-alt"></i>
                  Inscrit le {{ formatDate(inscription.dateInscription) }}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Liste des rendez-vous -->
        <div class="appointments-list">
          <div v-if="filteredRendezVous.length === 0" class="no-appointments">
            <div class="empty-icon">📭</div>
            <h3>Aucun rendez-vous</h3>
            <p>Aucun rendez-vous trouvé pour le filtre sélectionné.</p>
          </div>
          
          <div v-else class="appointments-grid">
            <div 
              v-for="appointment in filteredRendezVous" 
              :key="appointment.id"
              class="appointment-admin-card"
              :class="`status-${appointment.status}`"
            >
              <!-- En-tête de la carte -->
              <div class="appointment-header">
                <div class="appointment-date">
                  <span class="date">{{ formatDate(appointment.date) }}</span>
                  <span class="time">{{ appointment.heure }}</span>
                </div>
                <div class="appointment-status" :class="`status-${appointment.status}`">
                  {{ getStatusText(appointment.status) }}
                </div>
              </div>
              
              <!-- Contenu principal -->
              <div class="appointment-body">
                <div class="client-info">
                  <h4>{{ appointment.user.prenom }} {{ appointment.user.nom }}</h4>
                  <div class="contact-info">
                    <p><i class="fas fa-envelope"></i> {{ appointment.user.email }}</p>
                    <p><i class="fas fa-phone"></i> {{ appointment.user.telephone }}</p>
                    <p><i class="fas fa-building"></i> {{ appointment.user.secteurActivite }}</p>
                  </div>
                </div>
                
                <div class="service-info">
                  <h5>{{ appointment.service.nom }}</h5>
                  <p class="service-duration">
                    <i class="fas fa-clock"></i>
                    {{ appointment.service.duree }} minutes
                  </p>
                </div>
                
                <div v-if="appointment.notes" class="notes">
                  <p><strong>Notes :</strong> {{ appointment.notes }}</p>
                </div>
              </div>
              
              <!-- Actions admin -->
              <div class="appointment-actions" v-if="appointment.status === 'en_attente'">
                <button 
                  @click="updateAppointmentStatus(appointment.id, 'confirmé')"
                  class="action-btn confirm-btn"
                  :disabled="updatingAppointment === appointment.id"
                >
                  <i class="fas fa-check-circle"></i>
                  Confirmer
                </button>
                
                <button 
                  @click="updateAppointmentStatus(appointment.id, 'annulé')"
                  class="action-btn reject-btn"
                  :disabled="updatingAppointment === appointment.id"
                >
                  <i class="fas fa-times-circle"></i>
                  Refuser
                </button>
              </div>
              
              <div class="appointment-meta">
                <p class="created-at">
                  <i class="fas fa-calendar-alt"></i>
                  Demandé le {{ formatDate(appointment.createdAt) }}
                </p>
              </div>
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
    
    <!-- Modal de création/modification de formation -->
    <div v-if="showCreateFormation" class="modal-overlay" @click.self="closeFormationModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ editingFormation ? 'Modifier la Formation' : 'Nouvelle Formation' }}</h3>
          <button @click="closeFormationModal" class="close-modal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <form @submit.prevent="submitFormation" class="formation-form">
          <div class="form-grid">
            <div class="form-group">
              <label for="titre">Titre de la formation *</label>
              <input
                v-model="formationForm.titre"
                type="text"
                id="titre"
                required
                placeholder="Ex: Marketing Digital Avancé"
              />
            </div>
            
            <div class="form-group">
              <label for="lieu">Lieu *</label>
              <input
                v-model="formationForm.lieu"
                type="text"
                id="lieu"
                required
                placeholder="Ex: Centre de formation CCISN"
              />
            </div>
            
            <div class="form-group span-2">
              <label for="description">Description *</label>
              <textarea
                v-model="formationForm.description"
                id="description"
                required
                rows="3"
                placeholder="Description complète de la formation..."
              ></textarea>
            </div>
            
            <div class="form-group">
              <label for="dateDebut">Date de début *</label>
              <input
                v-model="formationForm.dateDebut"
                type="date"
                id="dateDebut"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="dateFin">Date de fin *</label>
              <input
                v-model="formationForm.dateFin"
                type="date"
                id="dateFin"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="heureDebut">Heure de début *</label>
              <input
                v-model="formationForm.heureDebut"
                type="time"
                id="heureDebut"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="heureFin">Heure de fin *</label>
              <input
                v-model="formationForm.heureFin"
                type="time"
                id="heureFin"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="maxParticipants">Nombre max de participants *</label>
              <input
                v-model.number="formationForm.maxParticipants"
                type="number"
                id="maxParticipants"
                min="1"
                max="100"
                required
                placeholder="20"
              />
            </div>
            
            <div class="form-group">
              <label for="prix">Prix (€)</label>
              <input
                v-model.number="formationForm.prix"
                type="number"
                id="prix"
                min="0"
                step="0.01"
                placeholder="0 pour gratuit"
              />
            </div>
          </div>
          
          <div class="modal-actions">
            <button type="button" @click="closeFormationModal" class="cancel-btn">
              Annuler
            </button>
            <button type="submit" :disabled="submittingFormation" class="submit-btn">
              <i v-if="submittingFormation" class="fas fa-spinner fa-spin"></i>
              <span v-if="submittingFormation">{{ editingFormation ? 'Modification...' : 'Création...' }}</span>
              <span v-else>{{ editingFormation ? 'Modifier' : 'Créer' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <TheFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import axios from 'axios'

// Configuration globale d'axios
axios.defaults.withCredentials = true

const router = useRouter()
const rendezVous = ref([])
const filterStatus = ref('all')
const updatingAppointment = ref(null)
const successMessage = ref('')
const errorMessage = ref('')
const activeTab = ref('appointments')
const formations = ref([])
const showCreateFormation = ref(false)
const editingFormation = ref(null)
const formationForm = ref({})
const submittingFormation = ref(false)

// Variables pour les inscriptions
const inscriptions = ref([])
const filterInscriptionStatus = ref('all')
const updatingInscription = ref(null)

// Computed pour filtrer les rendez-vous
const filteredRendezVous = computed(() => {
  if (filterStatus.value === 'all') {
    return rendezVous.value
  }
  return rendezVous.value.filter(rv => rv.status === filterStatus.value)
})

const rendezVousEnAttente = computed(() => 
  rendezVous.value.filter(rv => rv.status === 'en_attente')
)

const rendezVousConfirmes = computed(() => 
  rendezVous.value.filter(rv => rv.status === 'confirmé')
)

const rendezVousAnnules = computed(() => 
  rendezVous.value.filter(rv => rv.status === 'annulé')
)

// Computed pour filtrer les inscriptions
const filteredInscriptions = computed(() => {
  if (filterInscriptionStatus.value === 'all') {
    return inscriptions.value
  }
  return inscriptions.value.filter(inscription => inscription.statut === filterInscriptionStatus.value)
})

const inscriptionsEnAttente = computed(() => 
  inscriptions.value.filter(inscription => inscription.statut === 'en_attente')
)

const inscriptionsConfirmees = computed(() => 
  inscriptions.value.filter(inscription => inscription.statut === 'confirmé')
)

const inscriptionsAnnulees = computed(() => 
  inscriptions.value.filter(inscription => inscription.statut === 'annulé')
)

// Fonctions utilitaires
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

const getStatusText = (status) => {
  switch (status) {
    case 'en_attente': return 'En attente'
    case 'confirmé': return 'Confirmé'
    case 'annulé': return 'Annulé'
    default: return status
  }
}

const getFormationStatusText = (status) => {
  switch (status) {
    case 'active': return 'Active'
    case 'inactive': return 'Inactive'
    case 'complet': return 'Complet'
    default: return status
  }
}

const getInscriptionStatusText = (status) => {
  switch (status) {
    case 'en_attente': return 'En attente'
    case 'confirmé': return 'Confirmée'
    case 'annulé': return 'Annulée'
    default: return status
  }
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

// Récupérer tous les rendez-vous
const fetchAllAppointments = async () => {
  try {
    const response = await axios.get('http://localhost:3000/rendez-vous/admin/all', {
      withCredentials: true
    })
    rendezVous.value = response.data
    console.log('Rendez-vous récupérés:', response.data)
  } catch (error) {
    console.error('Erreur lors de la récupération des rendez-vous:', error)
    if (error.response?.status === 403) {
      errorMessage.value = 'Accès refusé. Vous devez être administrateur.'
    } else {
      errorMessage.value = 'Impossible de charger les rendez-vous.'
    }
  }
}

// Mettre à jour le statut d'un rendez-vous
const updateAppointmentStatus = async (appointmentId, newStatus) => {
  updatingAppointment.value = appointmentId
  
  try {
    const response = await axios.patch(
      `http://localhost:3000/rendez-vous/${appointmentId}`,
      { status: newStatus },
      { withCredentials: true }
    )
    
    // Mettre à jour la liste locale
    const index = rendezVous.value.findIndex(rv => rv.id === appointmentId)
    if (index !== -1) {
      rendezVous.value[index] = response.data
    }
    
    const actionText = newStatus === 'confirmé' ? 'confirmé' : 'refusé'
    successMessage.value = `Rendez-vous ${actionText} avec succès.`
    
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
    
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error)
    errorMessage.value = 'Impossible de mettre à jour le rendez-vous.'
    
    setTimeout(() => {
      errorMessage.value = ''
    }, 3000)
  } finally {
    updatingAppointment.value = null
  }
}

// Actualiser les données
const refreshData = async () => {
  await fetchAllAppointments()
}

// Fonctions pour les formations
const fetchAllFormations = async () => {
  try {
    const response = await axios.get('http://localhost:3000/formations', {
      withCredentials: true
    })
    formations.value = response.data
    console.log('Formations récupérées:', response.data)
  } catch (error) {
    console.error('Erreur lors de la récupération des formations:', error)
    errorMessage.value = 'Impossible de charger les formations.'
  }
}

const refreshFormations = async () => {
  await fetchAllFormations()
}

// Fonctions pour les inscriptions
const fetchAllInscriptions = async () => {
  try {
    const response = await axios.get('http://localhost:3000/formations/admin/inscriptions', {
      withCredentials: true
    })
    inscriptions.value = response.data
    console.log('Inscriptions récupérées:', response.data)
  } catch (error) {
    console.error('Erreur lors de la récupération des inscriptions:', error)
    errorMessage.value = 'Impossible de charger les inscriptions.'
  }
}

const refreshInscriptions = async () => {
  await fetchAllInscriptions()
}

const confirmerInscription = async (inscriptionId) => {
  updatingInscription.value = inscriptionId
  
  try {
    const response = await axios.patch(
      `http://localhost:3000/formations/inscription/${inscriptionId}/confirmer`,
      {},
      { withCredentials: true }
    )
    
    // Mettre à jour la liste locale
    const index = inscriptions.value.findIndex(inscription => inscription.id === inscriptionId)
    if (index !== -1) {
      inscriptions.value[index] = { ...inscriptions.value[index], statut: 'confirmé' }
    }
    
    successMessage.value = 'Inscription confirmée avec succès.'
    
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
    
  } catch (error) {
    console.error('Erreur lors de la confirmation:', error)
    errorMessage.value = 'Impossible de confirmer l\'inscription.'
    
    setTimeout(() => {
      errorMessage.value = ''
    }, 3000)
  } finally {
    updatingInscription.value = null
  }
}

const annulerInscription = async (inscriptionId) => {
  updatingInscription.value = inscriptionId
  
  try {
    const response = await axios.patch(
      `http://localhost:3000/formations/inscription/${inscriptionId}/annuler`,
      {},
      { withCredentials: true }
    )
    
    // Mettre à jour la liste locale
    const index = inscriptions.value.findIndex(inscription => inscription.id === inscriptionId)
    if (index !== -1) {
      inscriptions.value[index] = { ...inscriptions.value[index], statut: 'annulé' }
    }
    
    successMessage.value = 'Inscription annulée avec succès.'
    
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
    
  } catch (error) {
    console.error('Erreur lors de l\'annulation:', error)
    errorMessage.value = 'Impossible d\'annuler l\'inscription.'
    
    setTimeout(() => {
      errorMessage.value = ''
    }, 3000)
  } finally {
    updatingInscription.value = null
  }
}

// Initialisation
onMounted(async () => {
  const hasAccess = await checkAdminAccess()
  if (hasAccess) {
    await fetchAllAppointments()
    await fetchAllFormations()
    await fetchAllInscriptions()
  }
})

// Fonctions pour la gestion de la formation
const editFormation = (formation) => {
  editingFormation.value = formation
  formationForm.value = {
    titre: formation.titre,
    lieu: formation.lieu,
    description: formation.description,
    dateDebut: formation.dateDebut,
    dateFin: formation.dateFin,
    heureDebut: formation.heureDebut,
    heureFin: formation.heureFin,
    maxParticipants: formation.maxParticipants,
    prix: formation.prix
  }
  showCreateFormation.value = true
}

const deleteFormation = async (formationId) => {
  try {
    await axios.delete(`http://localhost:3000/formations/${formationId}`, {
      withCredentials: true
    })
    await fetchAllFormations()
    successMessage.value = 'Formation supprimée avec succès.'
  } catch (error) {
    console.error('Erreur lors de la suppression de la formation:', error)
    errorMessage.value = 'Impossible de supprimer la formation.'
  }
}

const submitFormation = async () => {
  submittingFormation.value = true
  try {
    let response
    if (editingFormation.value) {
      // Modification
      response = await axios.patch(
        `http://localhost:3000/formations/${editingFormation.value.id}`,
        formationForm.value,
        { withCredentials: true }
      )
    } else {
      // Création
      response = await axios.post(
        'http://localhost:3000/formations',
        formationForm.value,
        { withCredentials: true }
      )
    }
    
    // Actualiser la liste
    await fetchAllFormations()
    
    successMessage.value = editingFormation.value 
      ? 'Formation modifiée avec succès.' 
      : 'Formation créée avec succès.'
    
    closeFormationModal()
    
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
    
  } catch (error) {
    console.error('Erreur lors de la soumission de la formation:', error)
    errorMessage.value = error.response?.data?.error || 'Impossible d\'enregistrer la formation.'
    
    setTimeout(() => {
      errorMessage.value = ''
    }, 3000)
  } finally {
    submittingFormation.value = false
  }
}

const closeFormationModal = () => {
  editingFormation.value = null
  formationForm.value = {
    titre: '',
    description: '',
    dateDebut: '',
    dateFin: '',
    heureDebut: '09:00',
    heureFin: '17:00',
    lieu: '',
    maxParticipants: 20,
    prix: 0
  }
  showCreateFormation.value = false
}
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
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
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

/* Filtres */
.admin-filters {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.admin-filters h2 {
  margin: 0 0 1.5rem;
  color: #1f2937;
  font-size: 1.5rem;
}

.admin-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
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

.refresh-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.refresh-btn:hover {
  background: #059669;
  transform: translateY(-1px);
}

/* Liste des rendez-vous */
.appointments-grid {
  display: grid;
  gap: 1.5rem;
}

.appointment-admin-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}

.appointment-admin-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.appointment-admin-card.status-en_attente {
  border-left-color: #f59e0b;
}

.appointment-admin-card.status-confirmé {
  border-left-color: #10b981;
}

.appointment-admin-card.status-annulé {
  border-left-color: #ef4444;
}

.appointment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 0;
}

.appointment-date {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.appointment-date .date {
  font-weight: 600;
  color: #1f2937;
  font-size: 1.1rem;
}

.appointment-date .time {
  color: #6b7280;
  font-size: 0.9rem;
}

.appointment-status {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.appointment-status.status-en_attente {
  background: #fef3c7;
  color: #92400e;
}

.appointment-status.status-confirmé {
  background: #d1fae5;
  color: #065f46;
}

.appointment-status.status-annulé {
  background: #fee2e2;
  color: #991b1b;
}

.appointment-body {
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1.5rem;
}

.client-info h4 {
  margin: 0 0 1rem;
  color: #1f2937;
  font-size: 1.2rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.contact-info p {
  margin: 0;
  color: #6b7280;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.contact-info i {
  width: 14px;
  color: #9ca3af;
}

.service-info h5 {
  margin: 0 0 0.5rem;
  color: #1f2937;
  font-weight: 600;
}

.service-duration {
  margin: 0;
  color: #6b7280;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.notes {
  grid-column: 1 / -1;
  margin-top: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
}

.notes p {
  margin: 0;
  color: #4b5563;
  font-size: 0.9rem;
}

.appointment-actions {
  display: flex;
  gap: 1rem;
  padding: 0 1.5rem 1.5rem;
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.confirm-btn {
  background: #10b981;
  color: white;
}

.confirm-btn:hover:not(:disabled) {
  background: #059669;
  transform: translateY(-1px);
}

.reject-btn {
  background: #ef4444;
  color: white;
}

.reject-btn:hover:not(:disabled) {
  background: #dc2626;
  transform: translateY(-1px);
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.appointment-meta {
  padding: 0 1.5rem 1.5rem;
  border-top: 1px solid #f3f4f6;
  margin-top: 1rem;
}

.created-at {
  margin: 1rem 0 0;
  color: #9ca3af;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* État vide */
.no-appointments {
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

.no-appointments h3 {
  margin: 0 0 0.5rem;
  color: #1f2937;
  font-size: 1.5rem;
}

.no-appointments p {
  margin: 0;
  color: #6b7280;
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
.spinning {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

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
  
  .appointment-body {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .appointment-actions {
    flex-direction: column;
  }
  
  .filter-buttons {
    flex-direction: column;
  }
  
  .filter-btn {
    justify-self: stretch;
  }
  
  .container {
    padding: 0 1rem;
  }
}

.admin-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h3 {
  margin: 0;
  color: #1f2937;
  font-size: 1.25rem;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.create-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.create-btn:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.filter-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid #e5e7eb;
  border-radius: 25px;
  background: white;
  color: #6b7280;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}

.filter-btn.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

.filter-btn.pending.active {
  background: #f59e0b;
  border-color: #f59e0b;
}

.filter-btn.confirmed.active {
  background: #10b981;
  border-color: #10b981;
}

.filter-btn.cancelled.active {
  background: #ef4444;
  border-color: #ef4444;
}

/* Formations */
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

.formations-admin-grid {
  display: grid;
  gap: 1.5rem;
}

.formation-admin-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
}

.formation-admin-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.formation-admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 0;
}

.formation-admin-header h4 {
  margin: 0;
  color: #1f2937;
  font-size: 1.2rem;
}

.formation-admin-price {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.formation-admin-price.free {
  background: #d1fae5;
  color: #065f46;
}

.formation-admin-body {
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1.5rem;
}

.formation-admin-body p {
  margin: 0;
  color: #6b7280;
  font-size: 0.9rem;
}

.formation-admin-details {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.formation-admin-details i {
  width: 14px;
  color: #9ca3af;
}

.formation-status {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.formation-status .status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.formation-admin-actions {
  display: flex;
  gap: 1rem;
  padding: 0 1.5rem 1.5rem;
}

.edit-btn, .delete-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.edit-btn {
  background: #3b82f6;
  color: white;
}

.edit-btn:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.delete-btn {
  background: #ef4444;
  color: white;
}

.delete-btn:hover {
  background: #dc2626;
  transform: translateY(-1px);
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  background: white;
  border-radius: 16px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 0;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1.5rem;
}

.modal-header h3 {
  margin: 0;
  color: #1f2937;
  font-size: 1.5rem;
}

.close-modal {
  background: none;
  border: none;
  color: #9ca3af;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.close-modal:hover {
  background: #f3f4f6;
  color: #6b7280;
}

.formation-form {
  padding: 0 2rem 2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group.span-2 {
  grid-column: span 2;
}

.form-group label {
  font-weight: 500;
  color: #374151;
  font-size: 0.9rem;
}

.form-group input,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.cancel-btn, .submit-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.cancel-btn {
  background: #f3f4f6;
  color: #374151;
}

.cancel-btn:hover {
  background: #e5e7eb;
}

.submit-btn {
  background: #3b82f6;
  color: white;
}

.submit-btn:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-1px);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* Inscriptions */
.no-inscriptions {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
}

.no-inscriptions h3 {
  margin: 0 0 0.5rem;
  color: #1f2937;
  font-size: 1.5rem;
}

.no-inscriptions p {
  margin: 0;
  color: #6b7280;
}

.inscriptions-grid {
  display: grid;
  gap: 1.5rem;
}

.inscription-admin-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}

.inscription-admin-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.inscription-admin-card.status-en_attente {
  border-left-color: #f59e0b;
}

.inscription-admin-card.status-confirmé {
  border-left-color: #10b981;
}

.inscription-admin-card.status-annulé {
  border-left-color: #ef4444;
}

.inscription-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem 1.5rem 0;
}

.formation-info h4 {
  margin: 0 0 0.5rem;
  color: #1f2937;
  font-size: 1.1rem;
}

.formation-dates {
  color: #6b7280;
  font-size: 0.9rem;
}

.inscription-status {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.inscription-status.status-en_attente {
  background: #fef3c7;
  color: #92400e;
}

.inscription-status.status-confirmé {
  background: #d1fae5;
  color: #065f46;
}

.inscription-status.status-annulé {
  background: #fee2e2;
  color: #991b1b;
}

.inscription-body {
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.participant-info h5,
.formation-details h5 {
  margin: 0 0 1rem;
  color: #1f2937;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.participant-name {
  margin: 0 0 0.75rem;
  color: #1f2937;
  font-weight: 600;
  font-size: 1.1rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.contact-info p {
  margin: 0;
  color: #6b7280;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.contact-info i {
  width: 12px;
  color: #9ca3af;
}

.formation-details .detail-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: #6b7280;
  font-size: 0.85rem;
}

.formation-details i {
  width: 12px;
  color: #9ca3af;
}

.inscription-notes {
  grid-column: 1 / -1;
  margin-top: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
}

.inscription-notes h5 {
  margin: 0 0 0.5rem;
  color: #374151;
  font-size: 0.9rem;
}

.inscription-notes p {
  margin: 0;
  color: #4b5563;
  font-size: 0.9rem;
  line-height: 1.5;
}

.inscription-actions {
  display: flex;
  gap: 1rem;
  padding: 0 1.5rem 1.5rem;
}

.inscription-meta {
  padding: 0 1.5rem 1.5rem;
  border-top: 1px solid #f3f4f6;
  margin-top: 1rem;
}

.inscription-meta .created-at {
  margin: 1rem 0 0;
  color: #9ca3af;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Responsive pour les inscriptions */
@media (max-width: 768px) {
  .inscription-body {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .inscription-actions {
    flex-direction: column;
  }
}
</style> 