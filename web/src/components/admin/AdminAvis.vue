<template>
  <div class="admin-avis">
    <!-- En-tête avec statistiques -->
    <div class="avis-header">
      <h3>
        <i class="fas fa-star"></i>
        Gestion des Avis
      </h3>
      <div class="avis-stats">
        <div class="stat-item">
          <span class="stat-value">{{ totalAvis }}</span>
          <span class="stat-label">Total</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ avisEnAttente }}</span>
          <span class="stat-label">En attente</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ avisVisibles }}</span>
          <span class="stat-label">Visibles</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ moyenneNote.toFixed(1) }}</span>
          <span class="stat-label">Note moyenne</span>
        </div>
      </div>
    </div>

    <!-- Filtres et actions -->
    <div class="avis-controls">
      <div class="filters">
        <select v-model="selectedStatut" @change="loadAvis" class="filter-select">
          <option value="">Tous les statuts</option>
          <option value="actif">Actif</option>
          <option value="en_attente">En attente</option>
          <option value="masque">Masqué</option>
        </select>
        
        <select v-model="selectedService" @change="loadAvis" class="filter-select">
          <option value="">Tous les services</option>
          <option value="formation">Formation</option>
          <option value="document">Certificats et Documents</option>
          <option value="rendez-vous">Rendez-vous</option>
          <option value="general">Service général</option>
        </select>

        <div class="search-box">
          <i class="fas fa-search"></i>
          <input 
            type="text" 
            v-model="searchQuery" 
            @input="debouncedSearch"
            placeholder="Rechercher dans les avis..."
            class="search-input"
          />
        </div>
      </div>

      <div class="actions">
        <button @click="loadAvis" class="btn-refresh" :disabled="loading">
          <i class="fas fa-sync-alt" :class="{ 'fa-spin': loading }"></i>
          Actualiser
        </button>
      </div>
    </div>

    <!-- Tableau des avis -->
    <div class="avis-table-container">
      <div v-if="loading" class="loading-overlay">
        <div class="spinner"></div>
        <p>Chargement des avis...</p>
      </div>

      <table v-else-if="avisList.length > 0" class="avis-table">
        <thead>
          <tr>
            <th>Client</th>
            <th>Service</th>
            <th>Note</th>
            <th>Sujet</th>
            <th>Date</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="avis in avisList" :key="avis.id" :class="getRowClass(avis)">
            <td class="client-cell">
              <div class="client-info">
                <div class="client-avatar">
                  {{ avis.user.prenom.charAt(0).toUpperCase() }}
                </div>
                <div class="client-details">
                  <strong>{{ avis.user.prenom }} {{ avis.user.nom }}</strong>
                  <small>{{ avis.user.email }}</small>
                </div>
              </div>
            </td>
            
            <td>
              <span class="service-badge" :class="getServiceClass(avis.typeService)">
                {{ getServiceLabel(avis.typeService) }}
              </span>
            </td>
            
            <td class="rating-cell">
              <div class="stars">
                <span v-for="star in 5" :key="star" 
                      class="star" 
                      :class="{ 'filled': star <= avis.note }">★</span>
              </div>
              <span class="rating-number">({{ avis.note }}/5)</span>
            </td>
            
            <td class="subject-cell">
              <div class="subject-content">
                <strong>{{ avis.sujet }}</strong>
                <p class="comment-preview">{{ truncateText(avis.commentaire, 80) }}</p>
              </div>
            </td>
            
            <td class="date-cell">
              {{ formatDate(avis.createdAt) }}
            </td>
            
            <td>
              <span class="status-badge" :class="getStatusClass(avis.statut)">
                {{ getStatusLabel(avis.statut) }}
              </span>
              <div v-if="!avis.visible" class="visibility-indicator">
                <i class="fas fa-eye-slash"></i> Masqué
              </div>
            </td>
            
            <td class="actions-cell">
              <div class="action-buttons">
                <button 
                  @click="viewAvis(avis)" 
                  class="btn-action btn-view"
                  title="Voir détails"
                >
                  <i class="fas fa-eye"></i>
                </button>
                
                <button 
                  @click="toggleVisibility(avis)" 
                  class="btn-action btn-visibility"
                  :title="avis.visible ? 'Masquer' : 'Afficher'"
                >
                  <i :class="avis.visible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
                
                <button 
                  v-if="avis.statut === 'en_attente'"
                  @click="approveAvis(avis)" 
                  class="btn-action btn-approve"
                  title="Approuver"
                >
                  <i class="fas fa-check"></i>
                </button>
                
                <button 
                  @click="deleteAvis(avis)" 
                  class="btn-action btn-delete"
                  title="Supprimer"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Aucun avis -->
      <div v-else-if="!loading" class="no-data">
        <i class="fas fa-comments"></i>
        <h4>Aucun avis trouvé</h4>
        <p>Aucun avis ne correspond aux critères de recherche.</p>
      </div>
    </div>

    <!-- Modal de détails -->
    <div v-if="selectedAvis" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h4>Détails de l'avis</h4>
          <button @click="closeModal" class="modal-close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="avis-details">
            <div class="detail-row">
              <strong>Client :</strong>
              <span>{{ selectedAvis.user.prenom }} {{ selectedAvis.user.nom }}</span>
            </div>
            <div class="detail-row">
              <strong>Email :</strong>
              <span>{{ selectedAvis.user.email }}</span>
            </div>
            <div class="detail-row">
              <strong>Service :</strong>
              <span>{{ getServiceLabel(selectedAvis.typeService) }}</span>
            </div>
            <div class="detail-row">
              <strong>Note :</strong>
              <div class="stars">
                <span v-for="star in 5" :key="star" 
                      class="star" 
                      :class="{ 'filled': star <= selectedAvis.note }">★</span>
              </div>
            </div>
            <div class="detail-row">
              <strong>Sujet :</strong>
              <span>{{ selectedAvis.sujet }}</span>
            </div>
            <div class="detail-row">
              <strong>Commentaire :</strong>
              <p class="comment-full">{{ selectedAvis.commentaire }}</p>
            </div>
            <div class="detail-row">
              <strong>Date :</strong>
              <span>{{ formatDate(selectedAvis.createdAt) }}</span>
            </div>
            <div class="detail-row">
              <strong>Statut :</strong>
              <span class="status-badge" :class="getStatusClass(selectedAvis.statut)">
                {{ getStatusLabel(selectedAvis.statut) }}
              </span>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button @click="closeModal" class="btn-secondary">Fermer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

// Variables réactives
const avisList = ref([])
const loading = ref(false)
const selectedStatut = ref('')
const selectedService = ref('')
const searchQuery = ref('')
const selectedAvis = ref(null)

// Statistiques
const totalAvis = ref(0)
const avisEnAttente = ref(0)
const avisVisibles = ref(0)
const moyenneNote = ref(0)

// Émissions d'événements
const emit = defineEmits(['show-success', 'show-error'])

// Debounce pour la recherche
let searchTimeout = null
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    loadAvis()
  }, 500)
}

/**
 * Charger les avis
 */
const loadAvis = async () => {
  loading.value = true
  
  try {
    const params = new URLSearchParams()

    if (selectedStatut.value) params.append('statut', selectedStatut.value)
    if (selectedService.value) params.append('typeService', selectedService.value)
    if (searchQuery.value) params.append('search', searchQuery.value)

    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3000/avis?${params}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.ok) {
      const data = await response.json()
      avisList.value = Array.isArray(data) ? data : data.items || []
    } else {
      throw new Error('Erreur lors du chargement des avis')
    }
  } catch (error) {
    console.error('Erreur:', error)
    emit('show-error', 'Erreur lors du chargement des avis')
  } finally {
    loading.value = false
  }
}

/**
 * Charger les statistiques
 */
const loadStats = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:3000/avis/stats', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.ok) {
      const stats = await response.json()
      totalAvis.value = stats.totalAvis || avisList.value.length
      moyenneNote.value = stats.moyenneNote || 0
      
      // Calculer les statistiques additionnelles
      avisEnAttente.value = avisList.value.filter(a => a.statut === 'en_attente').length
      avisVisibles.value = avisList.value.filter(a => a.visible).length
    }
  } catch (error) {
    console.error('Erreur stats:', error)
    // Calculer localement si l'API n'est pas disponible
    totalAvis.value = avisList.value.length
    avisEnAttente.value = avisList.value.filter(a => a.statut === 'en_attente').length
    avisVisibles.value = avisList.value.filter(a => a.visible).length
    if (avisList.value.length > 0) {
      const sum = avisList.value.reduce((acc, avis) => acc + avis.note, 0)
      moyenneNote.value = sum / avisList.value.length
    }
  }
}

/**
 * Voir un avis
 */
const viewAvis = (avis) => {
  selectedAvis.value = avis
}

/**
 * Fermer le modal
 */
const closeModal = () => {
  selectedAvis.value = null
}

/**
 * Basculer la visibilité
 */
const toggleVisibility = async (avis) => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3000/avis/${avis.id}/visibility`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.ok) {
      avis.visible = !avis.visible
      emit('show-success', `Avis ${avis.visible ? 'affiché' : 'masqué'} avec succès`)
      loadStats()
    } else {
      throw new Error('Erreur lors de la modification')
    }
  } catch (error) {
    emit('show-error', 'Erreur lors de la modification de la visibilité')
  }
}

/**
 * Approuver un avis
 */
const approveAvis = async (avis) => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3000/avis/${avis.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ statut: 'actif' })
    })

    if (response.ok) {
      avis.statut = 'actif'
      emit('show-success', 'Avis approuvé avec succès')
      loadStats()
    } else {
      throw new Error('Erreur lors de l\'approbation')
    }
  } catch (error) {
    emit('show-error', 'Erreur lors de l\'approbation de l\'avis')
  }
}

/**
 * Supprimer un avis
 */
const deleteAvis = async (avis) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cet avis ?')) return

  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3000/avis/${avis.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.ok) {
      const index = avisList.value.findIndex(a => a.id === avis.id)
      if (index > -1) {
        avisList.value.splice(index, 1)
      }
      emit('show-success', 'Avis supprimé avec succès')
      loadStats()
    } else {
      throw new Error('Erreur lors de la suppression')
    }
  } catch (error) {
    emit('show-error', 'Erreur lors de la suppression de l\'avis')
  }
}

/**
 * Utilitaires
 */
const getServiceLabel = (type) => {
  const labels = {
    formation: 'Formation',
    document: 'Certificats',
    'rendez-vous': 'Rendez-vous',
    general: 'Général'
  }
  return labels[type] || type
}

const getServiceClass = (type) => {
  const classes = {
    formation: 'service-formation',
    document: 'service-document',
    'rendez-vous': 'service-rdv',
    general: 'service-general'
  }
  return classes[type] || 'service-default'
}

const getStatusLabel = (statut) => {
  const labels = {
    actif: 'Actif',
    en_attente: 'En attente',
    masque: 'Masqué'
  }
  return labels[statut] || statut
}

const getStatusClass = (statut) => {
  const classes = {
    actif: 'status-active',
    en_attente: 'status-pending',
    masque: 'status-hidden'
  }
  return classes[statut] || 'status-default'
}

const getRowClass = (avis) => {
  if (avis.statut === 'en_attente') return 'row-pending'
  if (!avis.visible) return 'row-hidden'
  return ''
}

const truncateText = (text, length) => {
  return text && text.length > length ? text.substring(0, length) + '...' : text
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Initialisation
onMounted(async () => {
  await loadAvis()
  await loadStats()
})
</script>

<style scoped>
.admin-avis {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

/* En-tête */
.avis-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 25px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.avis-header h3 {
  margin: 0;
  font-size: 1.5em;
  display: flex;
  align-items: center;
  gap: 10px;
}

.avis-stats {
  display: flex;
  gap: 25px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.8em;
  font-weight: 700;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.85em;
  opacity: 0.9;
}

/* Contrôles */
.avis-controls {
  padding: 20px 30px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.filters {
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;
}

.filter-select {
  padding: 8px 12px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 0.9em;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.filter-select:focus {
  outline: none;
  border-color: #667eea;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-box i {
  position: absolute;
  left: 12px;
  color: #6c757d;
  z-index: 1;
}

.search-input {
  padding: 8px 12px 8px 35px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 0.9em;
  min-width: 250px;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
}

.btn-refresh {
  padding: 8px 16px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-refresh:hover:not(:disabled) {
  background: #5a67d8;
  transform: translateY(-2px);
}

.btn-refresh:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Tableau */
.avis-table-container {
  position: relative;
  min-height: 400px;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.avis-table {
  width: 100%;
  border-collapse: collapse;
}

.avis-table th {
  background: #f8f9fa;
  padding: 15px 12px;
  text-align: left;
  font-weight: 600;
  color: #495057;
  border-bottom: 2px solid #e9ecef;
  font-size: 0.9em;
}

.avis-table td {
  padding: 15px 12px;
  border-bottom: 1px solid #e9ecef;
  vertical-align: middle;
}

.avis-table tbody tr {
  transition: background-color 0.2s ease;
}

.avis-table tbody tr:hover {
  background: #f8f9fa;
}

.row-pending {
  background: #fff3cd !important;
}

.row-hidden {
  background: #f8d7da !important;
}

/* Cellules spécialisées */
.client-cell {
  min-width: 200px;
}

.client-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.client-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.1em;
}

.client-details strong {
  display: block;
  color: #2c3e50;
  margin-bottom: 2px;
}

.client-details small {
  color: #6c757d;
  font-size: 0.85em;
}

.service-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85em;
  font-weight: 500;
}

.service-formation { background: #e3f2fd; color: #1976d2; }
.service-document { background: #e8f5e8; color: #388e3c; }
.service-rdv { background: #fff3e0; color: #f57c00; }
.service-general { background: #f3e5f5; color: #7b1fa2; }

.rating-cell {
  text-align: center;
}

.stars {
  display: flex;
  justify-content: center;
  gap: 2px;
  margin-bottom: 5px;
}

.star {
  color: #ddd;
  font-size: 1.2em;
}

.star.filled {
  color: #ffd700;
}

.rating-number {
  font-size: 0.85em;
  color: #6c757d;
}

.subject-cell {
  max-width: 250px;
}

.subject-content strong {
  display: block;
  color: #2c3e50;
  margin-bottom: 5px;
}

.comment-preview {
  margin: 0;
  color: #6c757d;
  font-size: 0.9em;
  line-height: 1.4;
}

.date-cell {
  font-size: 0.9em;
  color: #6c757d;
  white-space: nowrap;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 15px;
  font-size: 0.8em;
  font-weight: 500;
}

.status-active { background: #d4edda; color: #155724; }
.status-pending { background: #fff3cd; color: #856404; }
.status-hidden { background: #f8d7da; color: #721c24; }

.visibility-indicator {
  margin-top: 5px;
  font-size: 0.8em;
  color: #dc3545;
  display: flex;
  align-items: center;
  gap: 5px;
}

.actions-cell {
  width: 140px;
}

.action-buttons {
  display: flex;
  gap: 5px;
}

.btn-action {
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  font-size: 0.85em;
}

.btn-view { background: #e3f2fd; color: #1976d2; }
.btn-view:hover { background: #bbdefb; }

.btn-visibility { background: #f3e5f5; color: #7b1fa2; }
.btn-visibility:hover { background: #e1bee7; }

.btn-approve { background: #e8f5e8; color: #388e3c; }
.btn-approve:hover { background: #c8e6c9; }

.btn-delete { background: #ffebee; color: #d32f2f; }
.btn-delete:hover { background: #ffcdd2; }

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.modal-header {
  padding: 20px 25px;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h4 {
  margin: 0;
  color: #2c3e50;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
  color: #6c757d;
  padding: 5px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.modal-close:hover {
  background: #f8f9fa;
}

.modal-body {
  padding: 25px;
}

.detail-row {
  margin-bottom: 15px;
  display: flex;
  align-items: flex-start;
  gap: 15px;
}

.detail-row strong {
  min-width: 100px;
  color: #495057;
}

.comment-full {
  margin: 0;
  line-height: 1.6;
  color: #495057;
}

.modal-footer {
  padding: 20px 25px;
  border-top: 1px solid #e9ecef;
  text-align: right;
}

.btn-secondary {
  padding: 10px 20px;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-secondary:hover {
  background: #5a6268;
}

/* État vide */
.no-data {
  text-align: center;
  padding: 60px 20px;
  color: #6c757d;
}

.no-data i {
  font-size: 3em;
  margin-bottom: 15px;
  opacity: 0.7;
}

.no-data h4 {
  margin-bottom: 10px;
  color: #495057;
}

/* Responsive */
@media (max-width: 768px) {
  .avis-header {
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }
  
  .avis-stats {
    gap: 15px;
  }
  
  .avis-controls {
    flex-direction: column;
    align-items: stretch;
    padding: 15px 20px;
  }
  
  .filters {
    flex-direction: column;
    gap: 10px;
  }
  
  .search-input {
    min-width: 100%;
  }
  
  .avis-table-container {
    overflow-x: auto;
  }
  
  .avis-table {
    min-width: 800px;
  }
  
  .modal-content {
    margin: 20px;
    max-width: none;
  }
}
</style> 