<template>
  <div class="admin-inscriptions">
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
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

// Émetteurs d'événements
const emit = defineEmits(['show-success', 'show-error'])

// Variables réactives
const inscriptions = ref([])
const filterInscriptionStatus = ref('all')
const updatingInscription = ref(null)

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

const getInscriptionStatusText = (status) => {
  switch (status) {
    case 'en_attente': return 'En attente'
    case 'confirmé': return 'Confirmée'
    case 'annulé': return 'Annulée'
    default: return status
  }
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
    emit('show-error', 'Impossible de charger les inscriptions.')
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
    
    emit('show-success', 'Inscription confirmée avec succès.')
    
  } catch (error) {
    console.error('Erreur lors de la confirmation:', error)
    emit('show-error', 'Impossible de confirmer l\'inscription.')
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
    
    emit('show-success', 'Inscription annulée avec succès.')
    
  } catch (error) {
    console.error('Erreur lors de l\'annulation:', error)
    emit('show-error', 'Impossible d\'annuler l\'inscription.')
  } finally {
    updatingInscription.value = null
  }
}

// Exposer les données pour le composant parent
defineExpose({
  inscriptions,
  inscriptionsEnAttente,
  inscriptionsConfirmees,
  inscriptionsAnnulees
})

// Initialisation
onMounted(async () => {
  await fetchAllInscriptions()
})
</script>

<style scoped>
.admin-inscriptions {
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

/* Inscriptions */
.no-inscriptions {
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

/* Animations */
.spinning {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
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
  
  .filter-buttons {
    flex-direction: column;
  }
}
</style> 