<template>
  <div class="admin-formations">
    <div class="section-header">
      <div class="header-info">
        <div class="title-section">
          <div class="title-icon">
            <i class="fas fa-graduation-cap"></i>
          </div>
          <div class="title-content">
            <h3>Gestion des Formations</h3>
            <div class="formations-count">
              <span class="count-badge">
                <i class="fas fa-layer-group"></i>
                {{ formations.length }} formation{{ formations.length > 1 ? 's' : '' }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="header-actions">
        <div class="search-filter-container">
          <div class="search-filter">
            <div class="search-box">
              <i class="fas fa-search search-icon"></i>
              <input 
                v-model="searchTerm" 
                type="text" 
                placeholder="Rechercher une formation..."
                class="search-input"
              >
            </div>
            <div class="filter-box">
              <i class="fas fa-filter filter-icon"></i>
              <select v-model="statusFilter" class="status-filter">
                <option value="">Tous les statuts</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="complet">Complet</option>
              </select>
            </div>
          </div>
        </div>
        <div class="action-buttons">
          <button @click="showCreateFormation = true" class="create-btn">
            <i class="fas fa-plus"></i>
            <span>Nouvelle Formation</span>
          </button>
          <button @click="refreshFormations" class="refresh-btn" :disabled="isRefreshing">
            <i class="fas fa-sync-alt" :class="{ 'spinning': isRefreshing }"></i>
            <span>Actualiser</span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Formations Grid -->
    <div v-if="filteredFormations.length === 0 && formations.length === 0" class="no-formations">
      <div class="empty-icon">📚</div>
      <h3>Aucune formation</h3>
      <p>Aucune formation n'a été créée. Créez votre première formation !</p>
    </div>
    
    <div v-else-if="filteredFormations.length === 0" class="no-results">
      <div class="empty-icon">🔍</div>
      <h3>Aucun résultat</h3>
      <p>Aucune formation ne correspond à vos critères de recherche.</p>
      <button @click="clearFilters" class="clear-filters-btn">
        Effacer les filtres
      </button>
    </div>
    
    <div v-else class="formations-admin-grid">
      <div 
        v-for="formation in filteredFormations" 
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
              <span>{{ formation.inscription.length }}/{{ formation.maxParticipants }} participants</span>
              <div class="progress-bar">
                <div 
                  class="progress-fill" 
                  :style="{ width: `${(formation.inscription.length / formation.maxParticipants) * 100}%` }"
                ></div>
              </div>
            </div>
            
            <!-- Informations supplémentaires -->
            <div v-if="formation.inscription.length > 0" class="detail-row">
              <i class="fas fa-chart-line"></i>
              <span>Taux d'occupation: {{ Math.round((formation.inscription.length / formation.maxParticipants) * 100) }}%</span>
            </div>
            
            <div class="detail-row">
              <i class="fas fa-calendar-plus"></i>
              <span>Créée le {{ formatDate(formation.createdAt) }}</span>
            </div>
          </div>
          
          <!-- Statut -->
          <div class="formation-status">
            <span class="status-badge" :class="formation.statut">
              {{ getFormationStatusText(formation.statut) }}
            </span>
            <!-- Indicateur d'urgence si la formation est bientôt -->
            <span v-if="isFormationSoon(formation.dateDebut)" class="urgency-badge">
              <i class="fas fa-exclamation-triangle"></i>
              Bientôt
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
                max="200"
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
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

// Émetteurs d'événements
const emit = defineEmits(['show-success', 'show-error'])

// Variables réactives
const formations = ref([])
const showCreateFormation = ref(false)
const editingFormation = ref(null)
const formationForm = ref({})
const submittingFormation = ref(false)
const searchTerm = ref('')
const statusFilter = ref('')
const isRefreshing = ref(false)

// Computed pour les formations filtrées
const filteredFormations = computed(() => {
  let result = formations.value
  
  // Filtrage par terme de recherche
  if (searchTerm.value.trim()) {
    const search = searchTerm.value.toLowerCase().trim()
    result = result.filter(formation => 
      formation.titre.toLowerCase().includes(search) ||
      formation.description.toLowerCase().includes(search) ||
      formation.lieu.toLowerCase().includes(search)
    )
  }
  
  // Filtrage par statut
  if (statusFilter.value) {
    result = result.filter(formation => formation.statut === statusFilter.value)
  }
  
  // Tri par date de début
  return result.sort((a, b) => new Date(a.dateDebut) - new Date(b.dateDebut))
})

// Fonction pour effacer les filtres
const clearFilters = () => {
  searchTerm.value = ''
  statusFilter.value = ''
}

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

// Fonction pour vérifier si une formation est bientôt (dans les 7 jours)
const isFormationSoon = (dateDebut) => {
  const now = new Date()
  const formationDate = new Date(dateDebut)
  const diffTime = formationDate - now
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays > 0 && diffDays <= 7
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
  isRefreshing.value = true
  await fetchAllFormations()
  isRefreshing.value = false
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
  // Vérifier s'il y a des inscriptions
  const formation = formations.value.find(f => f.id === formationId)
  const hasInscriptions = formation?.inscription?.length > 0
  
  let confirmMessage = 'Êtes-vous sûr de vouloir supprimer cette formation ?'
  if (hasInscriptions) {
    confirmMessage = `⚠️ ATTENTION: Cette formation a ${formation.inscription.length} inscription(s) active(s).\n\nSupprimer cette formation supprimera également :\n- Toutes les inscriptions\n- Tous les commentaires\n- Tous les likes\n\nÊtes-vous vraiment sûr de vouloir continuer ?`
  }
  
  if (!confirm(confirmMessage)) {
    return
  }
  
  try {
    const response = await axios.delete(`http://localhost:3000/formations/${formationId}`, {
      withCredentials: true
    })
    
    // Actualiser la liste
    await fetchAllFormations()
    
    emit('show-success', response.data.message || 'Formation supprimée avec succès.')
  } catch (error) {
    console.error('Erreur lors de la suppression de la formation:', error)
    
    // Gestion d'erreur plus précise
    if (error.response?.status === 404) {
      emit('show-error', 'Formation non trouvée.')
    } else if (error.response?.status === 403) {
      emit('show-error', 'Vous n\'avez pas les droits pour supprimer cette formation.')
    } else if (error.response?.data?.error) {
      emit('show-error', error.response.data.error)
    } else {
      emit('show-error', 'Impossible de supprimer la formation. Veuillez réessayer.')
    }
  }
}

const submitFormation = async () => {
  // Validations côté client
  if (!formationForm.value.titre || formationForm.value.titre.trim().length < 3) {
    emit('show-error', 'Le titre doit contenir au moins 3 caractères.')
    return
  }
  
  if (!formationForm.value.description || formationForm.value.description.trim().length < 10) {
    emit('show-error', 'La description doit contenir au moins 10 caractères.')
    return
  }
  
  // Vérification des dates
  const dateDebut = new Date(formationForm.value.dateDebut)
  const dateFin = new Date(formationForm.value.dateFin)
  const aujourdhui = new Date()
  aujourdhui.setHours(0, 0, 0, 0)
  
  if (dateDebut <= aujourdhui) {
    emit('show-error', 'La date de début doit être dans le futur.')
    return
  }
  
  if (dateFin <= dateDebut) {
    emit('show-error', 'La date de fin doit être après la date de début.')
    return
  }
  
  // Vérification des heures
  if (formationForm.value.heureDebut >= formationForm.value.heureFin) {
    emit('show-error', 'L\'heure de fin doit être après l\'heure de début.')
    return
  }
  
  // Vérification du nombre de participants
  if (formationForm.value.maxParticipants < 1 || formationForm.value.maxParticipants > 200) {
    emit('show-error', 'Le nombre de participants doit être entre 1 et 200.')
    return
  }
  
  // Vérification du prix
  if (formationForm.value.prix < 0) {
    emit('show-error', 'Le prix ne peut pas être négatif.')
    return
  }
  
  submittingFormation.value = true
  try {
    let response
    const formData = {
      ...formationForm.value,
      titre: formationForm.value.titre.trim(),
      description: formationForm.value.description.trim(),
      lieu: formationForm.value.lieu.trim()
    }
    
    if (editingFormation.value) {
      // Modification
      response = await axios.patch(
        `http://localhost:3000/formations/${editingFormation.value.id}`,
        formData,
        { withCredentials: true }
      )
    } else {
      // Création
      response = await axios.post(
        'http://localhost:3000/formations',
        formData,
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
    
    // Gestion d'erreur détaillée
    if (error.response?.status === 400) {
      emit('show-error', error.response.data.error || 'Données invalides.')
    } else if (error.response?.status === 403) {
      emit('show-error', 'Vous n\'avez pas les droits pour cette action.')
    } else if (error.response?.data?.error) {
      emit('show-error', error.response.data.error)
    } else {
      emit('show-error', 'Impossible d\'enregistrer la formation. Vérifiez votre connexion.')
    }
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
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 1.5rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.title-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.title-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.title-icon i {
  font-size: 1.5rem;
  color: white;
}

.title-content h3 {
  margin: 0 0 0.5rem 0;
  color: #1e293b;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.025em;
}

.formations-count .count-badge {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 0.375rem 1rem;
  border-radius: 25px;
  font-size: 0.875rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

.search-filter-container {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.search-filter {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.search-box, .filter-box {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.search-box:focus-within, .filter-box:focus-within {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  transform: translateY(-1px);
}

.search-icon, .filter-icon {
  color: #64748b;
  width: 16px;
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.search-input, .status-filter {
  border: none;
  outline: none;
  font-size: 0.9rem;
  color: #334155;
  background: transparent;
  font-weight: 500;
}

.search-input {
  min-width: 220px;
}

.status-filter {
  cursor: pointer;
  min-width: 140px;
}

.action-buttons {
  margin-left: 100px;
  margin-top: 20px;
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.create-btn, .refresh-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.create-btn {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.create-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
}

.refresh-btn {
  background: linear-gradient(135deg, #10b981 0%, #047857 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.refresh-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
}

.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Formations */
.no-formations {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.6;
}

.no-formations h3 {
  margin: 0 0 0.5rem;
  color: #1e293b;
  font-size: 1.5rem;
  font-weight: 600;
}

.no-formations p {
  margin: 0;
  color: #64748b;
}

.formations-admin-grid {
  display: grid;
  gap: 1.5rem;
}

.formation-admin-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.04);
  position: relative;
}

.formation-admin-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.formation-admin-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
}

.formation-admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 0;
}

.formation-admin-header h4 {
  margin: 0;
  color: #1e293b;
  font-size: 1.25rem;
  font-weight: 700;
}

.formation-admin-price {
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.875rem;
  font-weight: 700;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.formation-admin-price.free {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

.formation-admin-body {
  padding: 1.5rem;
}

.formation-description {
  margin: 0 0 1.5rem;
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.6;
}

.formation-admin-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #6b7280;
}

.detail-row i {
  color: #9ca3af;
  width: 16px;
  text-align: center;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
  margin-left: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #10b981, #059669);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.formation-status {
  margin-bottom: 1rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.status-badge {
  padding: 0.375rem 1rem;
  border-radius: 25px;
  font-size: 0.8rem;
  font-weight: 600;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);
}

.status-badge.inactive {
  background: linear-gradient(135deg, #64748b 0%, #475569 100%);
  box-shadow: 0 2px 4px rgba(100, 116, 139, 0.2);
}

.status-badge.complet {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  box-shadow: 0 2px 4px rgba(245, 158, 11, 0.2);
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
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.edit-btn {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.edit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
}

.delete-btn {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.delete-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: white;
  border-radius: 20px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { 
    opacity: 0; 
    transform: translateY(30px) scale(0.95); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0) scale(1); 
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 0;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 20px 20px 0 0;
}

.modal-header h3 {
  margin: 0;
  color: #1e293b;
  font-size: 1.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.modal-header h3::before {
  content: '';
  width: 6px;
  height: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 3px;
}

.close-modal {
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  color: #64748b;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-modal:hover {
  background: #e2e8f0;
  color: #475569;
  transform: scale(1.05);
}

.formation-form {
  padding: 2rem;
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
  gap: 0.75rem;
}

.form-group.span-2 {
  grid-column: span 2;
}

.form-group label {
  font-weight: 600;
  color: #1e293b;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-group label::before {
  content: '';
  width: 3px;
  height: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
}

.form-group input,
.form-group textarea {
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background: #f8fafc;
  font-weight: 500;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  background: white;
  transform: translateY(-1px);
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
  border-radius: 0 0 20px 20px;
  margin: 0 -2rem -2rem;
}

.cancel-btn, .submit-btn {
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cancel-btn {
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  color: #475569;
  border: 1px solid #e2e8f0;
}

.cancel-btn:hover {
  background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
  transform: translateY(-1px);
}

.submit-btn {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Responsive */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .form-group.span-2 {
    grid-column: span 1;
  }
  
  .modal-actions {
    flex-direction: column;
  }
  
  .search-filter-container {
    flex-direction: column;
    align-items: stretch;
  }
  
  .action-buttons {
    flex-direction: column;
  }
}

.urgency-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: #fef3c7;
  color: #d97706;
  border: 1px solid #fcd34d;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  animation: pulse-warning 2s infinite;
}

@keyframes pulse-warning {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Messages et résultats */
.no-results {
  text-align: center;
  padding: 3rem 2rem;
  background: white;
  border-radius: 16px;
  border: 2px dashed #e2e8f0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
}

.no-results .empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.6;
}

.no-results h3 {
  color: #1e293b;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.no-results p {
  color: #64748b;
  margin-bottom: 1.5rem;
}

.clear-filters-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  color: #475569;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.clear-filters-btn:hover {
  background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
  transform: translateY(-1px);
}
</style> 