<template>
  <div class="admin-rendez-vous">
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
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

// Émetteurs d'événements
const emit = defineEmits(['show-success', 'show-error'])

// Variables réactives
const rendezVous = ref([])
const filterStatus = ref('all')
const updatingAppointment = ref(null)

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
      emit('show-error', 'Accès refusé. Vous devez être administrateur.')
    } else {
      emit('show-error', 'Impossible de charger les rendez-vous.')
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
    emit('show-success', `Rendez-vous ${actionText} avec succès.`)
    
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error)
    emit('show-error', 'Impossible de mettre à jour le rendez-vous.')
  } finally {
    updatingAppointment.value = null
  }
}

// Actualiser les données
const refreshData = async () => {
  await fetchAllAppointments()
}

// Exposer les données pour le composant parent
defineExpose({
  rendezVous,
  rendezVousEnAttente,
  rendezVousConfirmes,
  rendezVousAnnules
})

// Initialisation
onMounted(async () => {
  await fetchAllAppointments()
})
</script>

<style scoped>
.admin-rendez-vous {
  background: white;
  border-radius: 12px;
  padding: 2rem;
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

/* Animations */
.spinning {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 768px) {
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
}
</style> 