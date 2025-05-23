<template>
  <div class="admin-formations">
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// Émetteurs d'événements
const emit = defineEmits(['show-success', 'show-error'])

// Variables réactives
const formations = ref([])
const showCreateFormation = ref(false)
const editingFormation = ref(null)
const formationForm = ref({})
const submittingFormation = ref(false)

// Fonctions utilitaires
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

const getFormationStatusText = (status) => {
  switch (status) {
    case 'active': return 'Active'
    case 'inactive': return 'Inactive'
    case 'complet': return 'Complet'
    default: return status
  }
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
    emit('show-error', 'Impossible de charger les formations.')
  }
}

const refreshFormations = async () => {
  await fetchAllFormations()
}

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
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
    return
  }
  
  try {
    await axios.delete(`http://localhost:3000/formations/${formationId}`, {
      withCredentials: true
    })
    await fetchAllFormations()
    emit('show-success', 'Formation supprimée avec succès.')
  } catch (error) {
    console.error('Erreur lors de la suppression de la formation:', error)
    emit('show-error', 'Impossible de supprimer la formation.')
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
    
    emit('show-success', editingFormation.value 
      ? 'Formation modifiée avec succès.' 
      : 'Formation créée avec succès.')
    
    closeFormationModal()
    
  } catch (error) {
    console.error('Erreur lors de la soumission de la formation:', error)
    emit('show-error', error.response?.data?.error || 'Impossible d\'enregistrer la formation.')
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

// Exposer les données pour le composant parent
defineExpose({
  formations
})

// Initialisation
onMounted(async () => {
  await fetchAllFormations()
})
</script>

<style scoped>
.admin-formations {
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
  background: #3b82f6;
  color: white;
}

.formation-admin-price.free {
  background: #d1fae5;
  color: #065f46;
}

.formation-admin-body {
  padding: 1.5rem;
}

.formation-description {
  margin: 0 0 1rem;
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.5;
}

.formation-admin-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.9rem;
}

.formation-admin-details i {
  width: 14px;
  color: #9ca3af;
}

.formation-status {
  margin-bottom: 1rem;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  background: #d1fae5;
  color: #065f46;
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
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .form-group.span-2 {
    grid-column: span 1;
  }
}
</style> 