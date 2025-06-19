<template>
  <div class="admin-reclamations-container">
    <!-- Header -->
    <div class="page-header">
      <div class="header-content">
        <h1>Gestion des Réclamations</h1>
        <p class="subtitle">Visualisez et traitez toutes les réclamations clients</p>
      </div>
    </div>

    <!-- Stats Dashboard -->
    <div class="stats-grid">
      <div class="stat-card urgent">
        <div class="stat-icon">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <div class="stat-content">
          <h3>{{ stats.urgentes }}</h3>
          <p>Urgentes</p>
        </div>
      </div>
      <div class="stat-card pending">
        <div class="stat-icon">
          <i class="fas fa-clock"></i>
        </div>
        <div class="stat-content">
          <h3>{{ stats.enAttente }}</h3>
          <p>En attente</p>
        </div>
      </div>
      <div class="stat-card in-progress">
        <div class="stat-icon">
          <i class="fas fa-cog"></i>
        </div>
        <div class="stat-content">
          <h3>{{ stats.enCours }}</h3>
          <p>En cours</p>
        </div>
      </div>
      <div class="stat-card resolved">
        <div class="stat-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <div class="stat-content">
          <h3>{{ stats.resolues }}</h3>
          <p>Résolues</p>
        </div>
      </div>
    </div>

    <!-- Filters and Actions -->
    <div class="controls-section">
      <div class="filters-row">
        <div class="filter-group">
          <label>Statut</label>
          <select v-model="filters.statut" @change="loadReclamations">
            <option value="">Tous</option>
            <option value="ouverte">Ouverte</option>
            <option value="en_cours">En cours</option>
            <option value="resolue">Résolue</option>
            <option value="fermee">Fermée</option>
          </select>
        </div>
        <div class="filter-group">
          <label>Priorité</label>
          <select v-model="filters.priorite" @change="loadReclamations">
            <option value="">Toutes</option>
            <option value="urgente">Urgente</option>
            <option value="haute">Haute</option>
            <option value="normale">Normale</option>
            <option value="basse">Basse</option>
          </select>
        </div>
        <div class="filter-group">
          <label>Type</label>
          <select v-model="filters.type" @change="loadReclamations">
            <option value="">Tous</option>
            <option value="service">Service</option>
            <option value="document">Document</option>
            <option value="formation">Formation</option>
            <option value="technique">Technique</option>
            <option value="autre">Autre</option>
          </select>
        </div>
        <div class="filter-group">
          <label>Assigné à</label>
          <select v-model="filters.assigneA" @change="loadReclamations">
            <option value="">Tous</option>
            <option value="me">Mes réclamations</option>
            <option value="unassigned">Non assignées</option>
          </select>
        </div>
      </div>
      <div class="actions-row">
        <button @click="loadReclamations" class="btn-secondary">
          <i class="fas fa-sync"></i>
          Actualiser
        </button>
        <button @click="exportReclamations" class="btn-secondary">
          <i class="fas fa-download"></i>
          Exporter
        </button>
      </div>
    </div>

    <!-- Reclamations Table -->
    <div class="reclamations-table-container">
      <div v-if="loading" class="loading-state">
        <i class="fas fa-spinner fa-spin"></i>
        <p>Chargement des réclamations...</p>
      </div>

      <div v-else-if="reclamations.length === 0" class="empty-state">
        <i class="fas fa-inbox"></i>
        <h3>Aucune réclamation</h3>
        <p>Aucune réclamation ne correspond aux filtres sélectionnés</p>
      </div>

      <div v-else class="table-wrapper">
        <table class="reclamations-table">
          <thead>
            <tr>
              <th>N° Réclamation</th>
              <th>Client</th>
              <th>Sujet</th>
              <th>Type</th>
              <th>Priorité</th>
              <th>Statut</th>
              <th>Date</th>
              <th>Assigné à</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="reclamation in reclamations" 
              :key="reclamation.id"
              :class="{ 'urgent-row': reclamation.priorite === 'urgente' }"
            >
              <td>
                <span class="numero">{{ reclamation.numeroReclamation }}</span>
              </td>
              <td>
                <div class="client-info">
                  <strong>{{ reclamation.user?.nom }} {{ reclamation.user?.prenom }}</strong>
                  <small>{{ reclamation.user?.email }}</small>
                </div>
              </td>
              <td>
                <div class="sujet-cell">
                  <strong>{{ reclamation.sujet }}</strong>
                  <p class="description-preview">{{ truncateText(reclamation.description, 100) }}</p>
                </div>
              </td>
              <td>
                <span class="type-badge">{{ getTypeLabel(reclamation.typeReclamation) }}</span>
              </td>
              <td>
                <span :class="['badge', 'priority', reclamation.priorite]">
                  {{ getPriorityLabel(reclamation.priorite) }}
                </span>
              </td>
              <td>
                <span :class="['badge', 'status', reclamation.statut]">
                  {{ getStatusLabel(reclamation.statut) }}
                </span>
              </td>
              <td>
                <div class="date-cell">
                  <span>{{ formatDate(reclamation.createdAt) }}</span>
                  <small v-if="reclamation.dateTraitement">
                    Traitée: {{ formatDate(reclamation.dateTraitement) }}
                  </small>
                </div>
              </td>
              <td>
                <div class="assignee-cell">
                  <span v-if="reclamation.adminTraitant">
                    {{ reclamation.adminTraitant.nom }} {{ reclamation.adminTraitant.prenom }}
                  </span>
                  <span v-else class="unassigned">Non assignée</span>
                </div>
              </td>
              <td>
                <div class="actions-cell">
                  <button 
                    @click="viewReclamation(reclamation)" 
                    class="btn-sm btn-primary"
                    title="Voir détails"
                  >
                    <i class="fas fa-eye"></i>
                  </button>
                  <button 
                    @click="assignToMe(reclamation)" 
                    class="btn-sm btn-secondary"
                    title="M'assigner"
                    v-if="!reclamation.adminTraitantId"
                  >
                    <i class="fas fa-user-plus"></i>
                  </button>
                  <button 
                    @click="respondToReclamation(reclamation)" 
                    class="btn-sm btn-success"
                    title="Répondre"
                  >
                    <i class="fas fa-reply"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="pagination.totalPages > 1" class="pagination">
        <button 
          @click="changePage(pagination.currentPage - 1)"
          :disabled="pagination.currentPage === 1"
          class="btn-secondary"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        <span class="page-info">
          Page {{ pagination.currentPage }} sur {{ pagination.totalPages }}
        </span>
        <button 
          @click="changePage(pagination.currentPage + 1)"
          :disabled="pagination.currentPage === pagination.totalPages"
          class="btn-secondary"
        >
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>

    <!-- Detail Modal -->
    <div v-if="selectedReclamation" class="modal-overlay" @click="closeDetailModal">
      <div class="modal-content large" @click.stop>
        <div class="modal-header">
          <h2>Réclamation #{{ selectedReclamation.numeroReclamation }}</h2>
          <div class="modal-actions">
            <select v-model="selectedReclamation.statut" @change="updateStatus" class="select-sm">
              <option value="ouverte">Ouverte</option>
              <option value="en_cours">En cours</option>
              <option value="resolue">Résolue</option>
              <option value="fermee">Fermée</option>
            </select>
            <button @click="closeDetailModal" class="close-btn">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        
        <div class="modal-body">
          <div class="detail-grid">
            <!-- Client Info -->
            <div class="detail-section">
              <h3>Informations Client</h3>
              <div class="client-details">
                <div class="detail-item">
                  <label>Nom:</label>
                  <span>{{ selectedReclamation.user?.nom }} {{ selectedReclamation.user?.prenom }}</span>
                </div>
                <div class="detail-item">
                  <label>Email:</label>
                  <span>{{ selectedReclamation.user?.email }}</span>
                </div>
                <div class="detail-item">
                  <label>Téléphone:</label>
                  <span>{{ selectedReclamation.user?.telephone }}</span>
                </div>
                <div class="detail-item">
                  <label>Registre de commerce:</label>
                  <span>{{ selectedReclamation.user?.numRegistreCommerce }}</span>
                </div>
              </div>
            </div>

            <!-- Reclamation Info -->
            <div class="detail-section">
              <h3>Détails de la réclamation</h3>
              <div class="detail-item">
                <label>Sujet:</label>
                <span>{{ selectedReclamation.sujet }}</span>
              </div>
              <div class="detail-item">
                <label>Type:</label>
                <span>{{ getTypeLabel(selectedReclamation.typeReclamation) }}</span>
              </div>
              <div class="detail-item">
                <label>Priorité:</label>
                <span :class="['badge', 'priority', selectedReclamation.priorite]">
                  {{ getPriorityLabel(selectedReclamation.priorite) }}
                </span>
              </div>
              <div class="detail-item">
                <label>Date de création:</label>
                <span>{{ formatDateTime(selectedReclamation.createdAt) }}</span>
              </div>
              <div class="detail-item">
                <label>Assignée à:</label>
                <div class="assignee-actions">
                  <span v-if="selectedReclamation.adminTraitant">
                    {{ selectedReclamation.adminTraitant.nom }} {{ selectedReclamation.adminTraitant.prenom }}
                  </span>
                  <span v-else class="unassigned">Non assignée</span>
                  <button 
                    @click="assignToMe(selectedReclamation, true)" 
                    class="btn-sm btn-secondary"
                    v-if="!selectedReclamation.adminTraitantId"
                  >
                    M'assigner
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="detail-section full-width">
            <h3>Description</h3>
            <div class="description-box">
              {{ selectedReclamation.description }}
            </div>
          </div>

          <!-- Admin Response -->
          <div class="detail-section full-width">
            <h3>Réponse de l'administration</h3>
            <div v-if="selectedReclamation.reponseAdmin" class="existing-response">
              <div class="response-box">
                {{ selectedReclamation.reponseAdmin }}
              </div>
              <small class="response-date">
                Réponse envoyée le {{ formatDateTime(selectedReclamation.dateTraitement) }}
              </small>
            </div>
            <div v-else class="no-response">
              <p>Aucune réponse administrative pour le moment</p>
            </div>
            
            <div class="response-form">
              <h4>{{ selectedReclamation.reponseAdmin ? 'Modifier la réponse' : 'Nouvelle réponse' }}</h4>
              <textarea 
                v-model="responseText"
                placeholder="Tapez votre réponse ici..."
                rows="5"
                class="response-textarea"
              ></textarea>
              <div class="response-actions">
                <button @click="sendResponse" class="btn-primary" :disabled="!responseText.trim()">
                  <i class="fas fa-paper-plane"></i>
                  {{ selectedReclamation.reponseAdmin ? 'Modifier la réponse' : 'Envoyer la réponse' }}
                </button>
                <button @click="sendResponseAndClose" class="btn-success" :disabled="!responseText.trim()">
                  <i class="fas fa-check"></i>
                  Répondre et clôturer
                </button>
              </div>
            </div>
          </div>

          <!-- Historique -->
          <div v-if="reclamationHistorique.length > 0" class="detail-section full-width">
            <h3>Historique des actions</h3>
            <div class="timeline">
              <div 
                v-for="item in reclamationHistorique" 
                :key="item.id"
                class="timeline-item"
              >
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <div class="timeline-header">
                    <span class="action">{{ getActionLabel(item.typeAction) }}</span>
                    <span class="admin" v-if="item.admin">
                      par {{ item.admin.nom }} {{ item.admin.prenom }}
                    </span>
                    <span class="date">{{ formatDateTime(item.dateAction) }}</span>
                  </div>
                  <div class="timeline-body">
                    <p v-if="item.commentaire">{{ item.commentaire }}</p>
                    <div v-if="item.ancienStatut && item.nouveauStatut" class="status-change">
                      <span class="old-status">{{ getStatusLabel(item.ancienStatut) }}</span>
                      <i class="fas fa-arrow-right"></i>
                      <span class="new-status">{{ getStatusLabel(item.nouveauStatut) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AdminReclamationsView',
  data() {
    return {
      loading: false,
      reclamations: [],
      selectedReclamation: null,
      reclamationHistorique: [],
      responseText: '',
      stats: {
        urgentes: 0,
        enAttente: 0,
        enCours: 0,
        resolues: 0
      },
      filters: {
        statut: '',
        priorite: '',
        type: '',
        assigneA: ''
      },
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 20
      }
    }
  },
  mounted() {
    this.loadReclamations()
    this.loadStats()
  },
  methods: {
    async loadReclamations() {
      this.loading = true
      try {
        const params = new URLSearchParams()
        params.append('page', this.pagination.currentPage)
        params.append('limit', this.pagination.itemsPerPage)
        
        if (this.filters.statut) params.append('statut', this.filters.statut)
        if (this.filters.priorite) params.append('priorite', this.filters.priorite)
        if (this.filters.type) params.append('type', this.filters.type)
        if (this.filters.assigneA) params.append('assigneA', this.filters.assigneA)

        const response = await axios.get(`http://localhost:3000/reclamations?${params}`, {
          withCredentials: true
        })
        
        this.reclamations = response.data.reclamations || []
        this.pagination = response.data.pagination || this.pagination
      } catch (error) {
        console.error('Erreur lors du chargement des réclamations:', error)
        this.$toast?.error('Erreur lors du chargement des réclamations')
      } finally {
        this.loading = false
      }
    },

    async loadStats() {
      try {
        const response = await axios.get('http://localhost:3000/reclamations/stats', {
          withCredentials: true
        })
        this.stats = response.data
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error)
      }
    },

    async viewReclamation(reclamation) {
      this.selectedReclamation = { ...reclamation }
      this.responseText = reclamation.reponseAdmin || ''
      
      // Charger l'historique
      try {
        const response = await axios.get(`http://localhost:3000/api/admin/reclamations/${reclamation.id}/historique`, {
          withCredentials: true
        })
        this.reclamationHistorique = response.data || []
      } catch (error) {
        console.error('Erreur lors du chargement de l\'historique:', error)
      }
    },

    async assignToMe(reclamation, updateModal = false) {
      try {
        await axios.post(`http://localhost:3000/reclamations/${reclamation.id}/assign`, { adminId: this.$user?.id }, {
          withCredentials: true
        })
        
        this.$toast?.success('Réclamation assignée avec succès')
        
        if (updateModal) {
          this.viewReclamation(reclamation)
        }
        this.loadReclamations()
      } catch (error) {
        console.error('Erreur lors de l\'assignation:', error)
        this.$toast?.error('Erreur lors de l\'assignation')
      }
    },

    async updateStatus() {
      try {
        await axios.patch(`http://localhost:3000/reclamations/${this.selectedReclamation.id}/traiter`, {
          statut: this.selectedReclamation.statut
        }, {
          withCredentials: true
        })
        
        this.$toast?.success('Statut mis à jour avec succès')
        this.loadReclamations()
      } catch (error) {
        console.error('Erreur lors de la mise à jour du statut:', error)
        this.$toast?.error('Erreur lors de la mise à jour du statut')
      }
    },

    async sendResponse() {
      try {
        await axios.put(`http://localhost:3000/api/admin/reclamations/${this.selectedReclamation.id}/response`, {
          reponse: this.responseText
        }, {
          withCredentials: true
        })
        
        this.$toast?.success('Réponse envoyée avec succès')
        this.viewReclamation(this.selectedReclamation)
        this.loadReclamations()
      } catch (error) {
        console.error('Erreur lors de l\'envoi de la réponse:', error)
        this.$toast?.error('Erreur lors de l\'envoi de la réponse')
      }
    },

    async sendResponseAndClose() {
      try {
        await axios.put(`http://localhost:3000/api/admin/reclamations/${this.selectedReclamation.id}/response`, {
          reponse: this.responseText,
          fermer: true
        }, {
          withCredentials: true
        })
        
        this.$toast?.success('Réponse envoyée et réclamation clôturée')
        this.closeDetailModal()
        this.loadReclamations()
      } catch (error) {
        console.error('Erreur lors de la clôture:', error)
        this.$toast?.error('Erreur lors de la clôture')
      }
    },

    async exportReclamations() {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/reclamations/export', {
          withCredentials: true,
          responseType: 'blob'
        })
        
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `reclamations_${new Date().toISOString().split('T')[0]}.xlsx`)
        document.body.appendChild(link)
        link.click()
        link.remove()
        
        this.$toast?.success('Export réalisé avec succès')
      } catch (error) {
        console.error('Erreur lors de l\'export:', error)
        this.$toast?.error('Erreur lors de l\'export')
      }
    },

    changePage(page) {
      if (page >= 1 && page <= this.pagination.totalPages) {
        this.pagination.currentPage = page
        this.loadReclamations()
      }
    },

    closeDetailModal() {
      this.selectedReclamation = null
      this.reclamationHistorique = []
      this.responseText = ''
    },

    respondToReclamation(reclamation) {
      this.viewReclamation(reclamation)
    },

    truncateText(text, maxLength) {
      if (text.length <= maxLength) return text
      return text.substring(0, maxLength) + '...'
    },

    getStatusLabel(statut) {
      const labels = {
        'ouverte': 'Ouverte',
        'en_cours': 'En cours',
        'resolue': 'Résolue',
        'fermee': 'Fermée'
      }
      return labels[statut] || statut
    },

    getPriorityLabel(priorite) {
      const labels = {
        'basse': 'Basse',
        'normale': 'Normale',
        'haute': 'Haute',
        'urgente': 'Urgente'
      }
      return labels[priorite] || priorite
    },

    getTypeLabel(type) {
      const labels = {
        'service': 'Service',
        'document': 'Document',
        'formation': 'Formation',
        'technique': 'Technique',
        'autre': 'Autre'
      }
      return labels[type] || type
    },

    getActionLabel(action) {
      const labels = {
        'creation': 'Création',
        'modification': 'Modification',
        'traitement': 'Traitement',
        'resolution': 'Résolution',
        'fermeture': 'Fermeture',
        'assignation': 'Assignation',
        'reponse': 'Réponse'
      }
      return labels[action] || action
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString('fr-FR')
    },

    formatDateTime(date) {
      return new Date(date).toLocaleString('fr-FR')
    }
  }
}
</script>

<style scoped>
.admin-reclamations-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 0;
}

.page-header {
  background: white;
  margin: 0 2rem 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  overflow: hidden;
}

.header-content {
  padding: 3rem;
  text-align: center;
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  color: white;
}

.header-content h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 0 2rem 2rem;
}

.stat-card {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.stat-card.urgent .stat-icon { background: linear-gradient(135deg, #ef4444, #dc2626); }
.stat-card.pending .stat-icon { background: linear-gradient(135deg, #f59e0b, #d97706); }
.stat-card.in-progress .stat-icon { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
.stat-card.resolved .stat-icon { background: linear-gradient(135deg, #10b981, #047857); }

.stat-content h3 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  color: #1f2937;
}

.stat-content p {
  margin: 0;
  color: #6b7280;
  font-weight: 500;
}

.controls-section {
  background: white;
  margin: 0 2rem 2rem;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.filters-row {
  display: flex;
  gap: 1rem;
  align-items: end;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 150px;
}

.filter-group label {
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
}

.filter-group select {
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.filter-group select:focus {
  outline: none;
  border-color: #dc2626;
}

.actions-row {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.reclamations-table-container {
  margin: 0 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  overflow: hidden;
}

.loading-state, .empty-state {
  padding: 4rem;
  text-align: center;
}

.loading-state i, .empty-state i {
  font-size: 3rem;
  color: #9ca3af;
  margin-bottom: 1rem;
}

.table-wrapper {
  overflow-x: auto;
}

.reclamations-table {
  width: 100%;
  border-collapse: collapse;
}

.reclamations-table th,
.reclamations-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.reclamations-table th {
  background: #f9fafb;
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.reclamations-table tbody tr {
  transition: background-color 0.3s ease;
}

.reclamations-table tbody tr:hover {
  background: #f9fafb;
}

.urgent-row {
  background: #fef2f2;
  border-left: 4px solid #dc2626;
}

.urgent-row:hover {
  background: #fef2f2;
}

.numero {
  font-family: 'Courier New', monospace;
  font-weight: 700;
  color: #dc2626;
  font-size: 0.875rem;
}

.client-info strong {
  display: block;
  color: #1f2937;
  font-size: 0.875rem;
}

.client-info small {
  color: #6b7280;
  font-size: 0.75rem;
}

.sujet-cell strong {
  display: block;
  color: #1f2937;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.description-preview {
  color: #6b7280;
  font-size: 0.75rem;
  margin: 0;
  line-height: 1.4;
}

.type-badge {
  background: #f3f4f6;
  color: #374151;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.badge.status.ouverte { background: #fef3c7; color: #92400e; }
.badge.status.en_cours { background: #dbeafe; color: #1e40af; }
.badge.status.resolue { background: #d1fae5; color: #065f46; }
.badge.status.fermee { background: #f3f4f6; color: #374151; }

.badge.priority.basse { background: #f3f4f6; color: #374151; }
.badge.priority.normale { background: #dbeafe; color: #1e40af; }
.badge.priority.haute { background: #fef3c7; color: #92400e; }
.badge.priority.urgente { background: #fee2e2; color: #991b1b; }

.date-cell span {
  display: block;
  font-size: 0.875rem;
  color: #1f2937;
}

.date-cell small {
  color: #6b7280;
  font-size: 0.75rem;
}

.assignee-cell .unassigned {
  color: #6b7280;
  font-style: italic;
  font-size: 0.875rem;
}

.actions-cell {
  display: flex;
  gap: 0.5rem;
}

.btn-sm {
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.btn-sm.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-sm.btn-secondary {
  background: #6b7280;
  color: white;
}

.btn-sm.btn-success {
  background: #10b981;
  color: white;
}

.btn-sm:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  border-top: 1px solid #e5e7eb;
}

.page-info {
  color: #6b7280;
  font-size: 0.875rem;
}

.btn-primary, .btn-secondary, .btn-success {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background: linear-gradient(135deg, #dc2626, #b91c1c);
  color: white;
}

.btn-secondary {
  background: #6b7280;
  color: white;
}

.btn-success {
  background: linear-gradient(135deg, #10b981, #047857);
  color: white;
}

.btn-primary:hover, .btn-secondary:hover, .btn-success:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

/* Modal Styles */
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
  padding: 2rem;
}

.modal-content {
  background: white;
  border-radius: 15px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

.modal-content.large {
  max-width: 1200px;
}

.modal-header {
  padding: 2rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
  color: #1f2937;
}

.modal-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.select-sm {
  padding: 0.5rem;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.875rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.close-btn:hover {
  background: #f3f4f6;
}

.modal-body {
  padding: 2rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.detail-section {
  margin-bottom: 2rem;
}

.detail-section.full-width {
  grid-column: 1 / -1;
}

.detail-section h3 {
  color: #1f2937;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
}

.detail-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
}

.detail-item label {
  font-weight: 600;
  color: #374151;
  min-width: 120px;
  margin-right: 1rem;
}

.client-details .detail-item {
  display: block;
  margin-bottom: 1rem;
}

.client-details .detail-item label {
  display: block;
  margin-bottom: 0.25rem;
  min-width: auto;
  margin-right: 0;
}

.assignee-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.description-box {
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
  line-height: 1.6;
  color: #4b5563;
}

.existing-response {
  margin-bottom: 2rem;
}

.response-box {
  background: #f0f9ff;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #0ea5e9;
  line-height: 1.6;
  color: #0c4a6e;
  margin-bottom: 0.5rem;
}

.response-date {
  color: #6b7280;
  font-style: italic;
}

.no-response {
  background: #fef3c7;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #f59e0b;
  margin-bottom: 2rem;
}

.no-response p {
  margin: 0;
  color: #92400e;
}

.response-form h4 {
  color: #1f2937;
  margin-bottom: 1rem;
}

.response-textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.3s ease;
}

.response-textarea:focus {
  outline: none;
  border-color: #dc2626;
}

.response-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

/* Timeline Styles */
.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0.75rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e5e7eb;
}

.timeline-item {
  position: relative;
  margin-bottom: 1.5rem;
}

.timeline-marker {
  position: absolute;
  left: -2rem;
  top: 0.5rem;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #dc2626;
  border: 3px solid white;
  box-shadow: 0 0 0 2px #dc2626;
}

.timeline-content {
  background: #f9fafb;
  padding: 1rem;
  border-radius: 8px;
  margin-left: 1rem;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.timeline-header .action {
  font-weight: 600;
  color: #1f2937;
}

.timeline-header .admin {
  color: #6b7280;
  font-size: 0.875rem;
}

.timeline-header .date {
  color: #6b7280;
  font-size: 0.875rem;
}

.status-change {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.status-change i {
  color: #6b7280;
}

@media (max-width: 1024px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .admin-reclamations-container {
    padding: 1rem 0;
  }
  
  .page-header,
  .stats-grid,
  .controls-section,
  .reclamations-table-container {
    margin: 0 1rem 1rem;
  }
  
  .header-content {
    padding: 2rem;
  }
  
  .header-content h1 {
    font-size: 2rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .filters-row {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-group {
    min-width: auto;
  }
  
  .actions-row {
    justify-content: center;
  }
  
  .modal-overlay {
    padding: 1rem;
  }
  
  .response-actions {
    flex-direction: column;
  }
  
  .timeline-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style> 