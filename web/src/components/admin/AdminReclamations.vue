<template>
  <div class="admin-reclamations">
    <!-- En-tête avec statistiques -->
    <div class="reclamations-header">
      <h3>
        <i class="fas fa-exclamation-triangle"></i>
        Gestion des Réclamations
      </h3>
      <div class="reclamations-stats">
        <div class="stat-item">
          <span class="stat-value">{{ totalReclamations }}</span>
          <span class="stat-label">Total</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ reclamationsOuvertes }}</span>
          <span class="stat-label">Ouvertes</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ reclamationsEnCours }}</span>
          <span class="stat-label">En cours</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ reclamationsResolues }}</span>
          <span class="stat-label">Résolues</span>
        </div>
      </div>
    </div>

    <!-- Filtres et actions -->
    <div class="reclamations-controls">
      <div class="filters">
        <select v-model="selectedStatut" @change="loadReclamations" class="filter-select">
          <option value="">Tous les statuts</option>
          <option value="ouverte">Ouverte</option>
          <option value="en_cours">En cours</option>
          <option value="resolue">Résolue</option>
          <option value="fermee">Fermée</option>
        </select>
        
        <select v-model="selectedPriorite" @change="loadReclamations" class="filter-select">
          <option value="">Toutes priorités</option>
          <option value="basse">Basse</option>
          <option value="normale">Normale</option>
          <option value="haute">Haute</option>
          <option value="urgente">Urgente</option>
        </select>

        <div class="search-box">
          <i class="fas fa-search"></i>
          <input 
            type="text" 
            v-model="searchQuery" 
            @input="debouncedSearch"
            placeholder="Rechercher par numéro..."
            class="search-input"
          />
        </div>
      </div>

      <div class="actions">
        <button @click="loadReclamations" class="btn-refresh" :disabled="loading">
          <i class="fas fa-sync-alt" :class="{ 'fa-spin': loading }"></i>
          Actualiser
        </button>
      </div>
    </div>

    <!-- Tableau des réclamations -->
    <div class="reclamations-table-container">
      <div v-if="loading" class="loading-overlay">
        <div class="spinner"></div>
        <p>Chargement des réclamations...</p>
      </div>

      <table v-else-if="reclamationsList.length > 0" class="reclamations-table">
        <thead>
          <tr>
            <th>Numéro</th>
            <th>Client</th>
            <th>Type</th>
            <th>Priorité</th>
            <th>Statut</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="reclamation in reclamationsList" :key="reclamation.id" :class="getRowClass(reclamation)">
            <td class="numero-cell">
              <strong>{{ reclamation.numeroReclamation }}</strong>
            </td>
            
            <td class="client-cell">
              <div class="client-info">
                <div class="client-avatar">
                  {{ reclamation.user.prenom.charAt(0).toUpperCase() }}
                </div>
                <div class="client-details">
                  <strong>{{ reclamation.user.prenom }} {{ reclamation.user.nom }}</strong>
                  <small>{{ reclamation.user.email }}</small>
                </div>
              </div>
            </td>
            
            <td>
              <span class="type-badge" :class="getTypeClass(reclamation.typeReclamation)">
                {{ getTypeLabel(reclamation.typeReclamation) }}
              </span>
            </td>
            
            <td>
              <span class="priority-badge" :class="getPriorityClass(reclamation.priorite)">
                {{ getPriorityLabel(reclamation.priorite) }}
              </span>
            </td>
            
            <td>
              <span class="status-badge" :class="getStatusClass(reclamation.statut)">
                {{ getStatusLabel(reclamation.statut) }}
              </span>
            </td>
            
            <td class="date-cell">
              {{ formatDate(reclamation.createdAt) }}
            </td>
            
            <td class="actions-cell">
              <div class="action-buttons">
                <button 
                  @click="viewReclamation(reclamation)" 
                  class="btn-action btn-view"
                  title="Voir détails"
                >
                  <i class="fas fa-eye"></i>
                </button>
                
                <button 
                  v-if="reclamation.statut !== 'resolue' && reclamation.statut !== 'fermee'"
                  @click="traiterReclamation(reclamation)" 
                  class="btn-action btn-process"
                  title="Traiter"
                >
                  <i class="fas fa-cog"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Aucune réclamation -->
      <div v-else-if="!loading" class="no-data">
        <i class="fas fa-clipboard-list"></i>
        <h4>Aucune réclamation trouvée</h4>
        <p>Aucune réclamation ne correspond aux critères de recherche.</p>
      </div>
    </div>

    <!-- Modal de détails -->
    <div v-if="selectedReclamation" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h4>Réclamation {{ selectedReclamation.numeroReclamation }}</h4>
          <button @click="closeModal" class="modal-close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="reclamation-details">
            <div class="detail-row">
              <strong>Client :</strong>
              <span>{{ selectedReclamation.user.prenom }} {{ selectedReclamation.user.nom }}</span>
            </div>
            <div class="detail-row">
              <strong>Email :</strong>
              <span>{{ selectedReclamation.user.email }}</span>
            </div>
            <div class="detail-row">
              <strong>Type :</strong>
              <span>{{ getTypeLabel(selectedReclamation.typeReclamation) }}</span>
            </div>
            <div class="detail-row">
              <strong>Priorité :</strong>
              <span class="priority-badge" :class="getPriorityClass(selectedReclamation.priorite)">
                {{ getPriorityLabel(selectedReclamation.priorite) }}
              </span>
            </div>
            <div class="detail-row">
              <strong>Statut :</strong>
              <span class="status-badge" :class="getStatusClass(selectedReclamation.statut)">
                {{ getStatusLabel(selectedReclamation.statut) }}
              </span>
            </div>
            <div class="detail-row">
              <strong>Description :</strong>
              <p class="description-text">{{ selectedReclamation.description }}</p>
            </div>
            <div class="detail-row">
              <strong>Date :</strong>
              <span>{{ formatDate(selectedReclamation.createdAt) }}</span>
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
import { ref, onMounted } from 'vue'

// Variables réactives
const reclamationsList = ref([])
const loading = ref(false)
const selectedStatut = ref('')
const selectedPriorite = ref('')
const searchQuery = ref('')
const selectedReclamation = ref(null)

// Statistiques
const totalReclamations = ref(0)
const reclamationsOuvertes = ref(0)
const reclamationsEnCours = ref(0)
const reclamationsResolues = ref(0)

// Émissions d'événements
const emit = defineEmits(['show-success', 'show-error'])

// Debounce pour la recherche
let searchTimeout = null
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    loadReclamations()
  }, 500)
}

/**
 * Charger les réclamations
 */
const loadReclamations = async () => {
  loading.value = true
  
  try {
    const params = new URLSearchParams()

    if (selectedStatut.value) params.append('statut', selectedStatut.value)
    if (selectedPriorite.value) params.append('priorite', selectedPriorite.value)
    if (searchQuery.value) params.append('search', searchQuery.value)

    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3000/reclamation?${params}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.ok) {
      const data = await response.json()
      reclamationsList.value = Array.isArray(data) ? data : data.items || []
    } else {
      throw new Error('Erreur lors du chargement des réclamations')
    }
  } catch (error) {
    console.error('Erreur:', error)
    emit('show-error', 'Erreur lors du chargement des réclamations')
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
    const response = await fetch('http://localhost:3000/reclamation/stats', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.ok) {
      const stats = await response.json()
      totalReclamations.value = stats.totalReclamations || reclamationsList.value.length
      
      // Calculer les statistiques additionnelles
      reclamationsOuvertes.value = reclamationsList.value.filter(r => r.statut === 'ouverte').length
      reclamationsEnCours.value = reclamationsList.value.filter(r => r.statut === 'en_cours').length
      reclamationsResolues.value = reclamationsList.value.filter(r => r.statut === 'resolue').length
    }
  } catch (error) {
    console.error('Erreur stats:', error)
    // Calculer localement si l'API n'est pas disponible
    totalReclamations.value = reclamationsList.value.length
    reclamationsOuvertes.value = reclamationsList.value.filter(r => r.statut === 'ouverte').length
    reclamationsEnCours.value = reclamationsList.value.filter(r => r.statut === 'en_cours').length
    reclamationsResolues.value = reclamationsList.value.filter(r => r.statut === 'resolue').length
  }
}

/**
 * Voir une réclamation
 */
const viewReclamation = (reclamation) => {
  selectedReclamation.value = reclamation
}

/**
 * Fermer le modal
 */
const closeModal = () => {
  selectedReclamation.value = null
}

/**
 * Traiter une réclamation
 */
const traiterReclamation = async (reclamation) => {
  const response = prompt(`Réponse pour la réclamation ${reclamation.numeroReclamation}:`)
  if (!response) return

  try {
    const token = localStorage.getItem('token')
    const result = await fetch(`http://localhost:3000/reclamation/${reclamation.id}/traiter`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ 
        statut: 'resolue',
        reponseAdmin: response
      })
    })

    if (result.ok) {
      reclamation.statut = 'resolue'
      reclamation.reponseAdmin = response
      emit('show-success', 'Réclamation traitée avec succès')
      loadStats()
    } else {
      throw new Error('Erreur lors du traitement')
    }
  } catch (error) {
    emit('show-error', 'Erreur lors du traitement de la réclamation')
  }
}

/**
 * Utilitaires
 */
const getTypeLabel = (type) => {
  const labels = {
    service: 'Service',
    technique: 'Technique',
    facturation: 'Facturation',
    autre: 'Autre'
  }
  return labels[type] || type
}

const getTypeClass = (type) => {
  const classes = {
    service: 'type-service',
    technique: 'type-technique',
    facturation: 'type-facturation',
    autre: 'type-autre'
  }
  return classes[type] || 'type-default'
}

const getPriorityLabel = (priorite) => {
  const labels = {
    basse: 'Basse',
    normale: 'Normale',
    haute: 'Haute',
    urgente: 'Urgente'
  }
  return labels[priorite] || priorite
}

const getPriorityClass = (priorite) => {
  const classes = {
    basse: 'priority-low',
    normale: 'priority-normal',
    haute: 'priority-high',
    urgente: 'priority-urgent'
  }
  return classes[priorite] || 'priority-default'
}

const getStatusLabel = (statut) => {
  const labels = {
    ouverte: 'Ouverte',
    en_cours: 'En cours',
    resolue: 'Résolue',
    fermee: 'Fermée'
  }
  return labels[statut] || statut
}

const getStatusClass = (statut) => {
  const classes = {
    ouverte: 'status-open',
    en_cours: 'status-progress',
    resolue: 'status-resolved',
    fermee: 'status-closed'
  }
  return classes[statut] || 'status-default'
}

const getRowClass = (reclamation) => {
  if (reclamation.priorite === 'urgente') return 'row-urgent'
  if (reclamation.priorite === 'haute') return 'row-high'
  if (reclamation.statut === 'ouverte') return 'row-open'
  return ''
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
  await loadReclamations()
  await loadStats()
})
</script>

<style scoped>
.admin-reclamations {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

/* En-tête */
.reclamations-header {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  padding: 25px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.reclamations-header h3 {
  margin: 0;
  font-size: 1.5em;
  display: flex;
  align-items: center;
  gap: 10px;
}

.reclamations-stats {
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
.reclamations-controls {
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
  border-color: #ff6b6b;
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
  border-color: #ff6b6b;
}

.btn-refresh {
  padding: 8px 16px;
  background: #ff6b6b;
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
  background: #ff5252;
  transform: translateY(-2px);
}

.btn-refresh:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Tableau */
.reclamations-table-container {
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
  border-top: 4px solid #ff6b6b;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.reclamations-table {
  width: 100%;
  border-collapse: collapse;
}

.reclamations-table th {
  background: #f8f9fa;
  padding: 15px 12px;
  text-align: left;
  font-weight: 600;
  color: #495057;
  border-bottom: 2px solid #e9ecef;
  font-size: 0.9em;
}

.reclamations-table td {
  padding: 15px 12px;
  border-bottom: 1px solid #e9ecef;
  vertical-align: middle;
}

.reclamations-table tbody tr {
  transition: background-color 0.2s ease;
}

.reclamations-table tbody tr:hover {
  background: #f8f9fa;
}

.row-urgent {
  background: #ffebee !important;
  border-left: 4px solid #f44336;
}

.row-high {
  background: #fff3e0 !important;
  border-left: 4px solid #ff9800;
}

.row-open {
  background: #e3f2fd !important;
}

/* Cellules spécialisées */
.numero-cell {
  font-family: monospace;
  font-weight: 600;
  color: #2c3e50;
}

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
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
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

.type-badge, .priority-badge, .status-badge {
  padding: 4px 10px;
  border-radius: 15px;
  font-size: 0.8em;
  font-weight: 500;
}

/* Types */
.type-service { background: #e3f2fd; color: #1976d2; }
.type-technique { background: #f3e5f5; color: #7b1fa2; }
.type-facturation { background: #e8f5e8; color: #388e3c; }
.type-autre { background: #fff3e0; color: #f57c00; }

/* Priorités */
.priority-low { background: #e8f5e8; color: #4caf50; }
.priority-normal { background: #e3f2fd; color: #2196f3; }
.priority-high { background: #fff3e0; color: #ff9800; }
.priority-urgent { background: #ffebee; color: #f44336; }

/* Statuts */
.status-open { background: #e3f2fd; color: #2196f3; }
.status-progress { background: #fff3e0; color: #ff9800; }
.status-resolved { background: #e8f5e8; color: #4caf50; }
.status-closed { background: #f5f5f5; color: #757575; }

.date-cell {
  font-size: 0.9em;
  color: #6c757d;
  white-space: nowrap;
}

.actions-cell {
  width: 100px;
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

.btn-process { background: #fff3e0; color: #f57c00; }
.btn-process:hover { background: #ffe0b2; }

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

.description-text {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid #ff6b6b;
  line-height: 1.6;
  margin: 0;
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
  .reclamations-header {
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }
  
  .reclamations-stats {
    gap: 15px;
    flex-wrap: wrap;
  }
  
  .reclamations-controls {
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
  
  .reclamations-table-container {
    overflow-x: auto;
  }
  
  .reclamations-table {
    min-width: 800px;
  }
  
  .modal-content {
    margin: 20px;
    max-width: none;
  }
}
</style>
