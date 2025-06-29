<template>
  <div class="reclamations-container">
    <!-- Header -->
    <div class="page-header">
      <div class="header-content">
        <h1>Mes Réclamations</h1>
        <p class="subtitle">Soumettez et suivez vos réclamations</p>
        <button @click="showNewReclamationModal = true" class="btn-primary">
          <i class="fas fa-plus"></i>
          Nouvelle Réclamation
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon blue">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <div class="stat-content">
          <h3>{{ stats.total }}</h3>
          <p>Total</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange">
          <i class="fas fa-clock"></i>
        </div>
        <div class="stat-content">
          <h3>{{ stats.enCours }}</h3>
          <p>En cours</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green">
          <i class="fas fa-check-circle"></i>
        </div>
        <div class="stat-content">
          <h3>{{ stats.resolue }}</h3>
          <p>Résolues</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon red">
          <i class="fas fa-times-circle"></i>
        </div>
        <div class="stat-content">
          <h3>{{ stats.fermee }}</h3>
          <p>Fermées</p>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="filters-section">
      <div class="filters-row">
        <div class="filter-group">
          <label>Statut</label>
          <select v-model="filters.statut">
            <option value="">Tous</option>
            <option value="ouverte">Ouverte</option>
            <option value="en_cours">En cours</option>
            <option value="resolue">Résolue</option>
            <option value="fermee">Fermée</option>
          </select>
        </div>
        <div class="filter-group">
          <label>Type</label>
          <select v-model="filters.type">
            <option value="">Tous</option>
            <option value="service">Service</option>
            <option value="document">Document</option>
            <option value="formation">Formation</option>
            <option value="technique">Technique</option>
            <option value="autre">Autre</option>
          </select>
        </div>
        <div class="filter-group">
          <label>Priorité</label>
          <select v-model="filters.priorite">
            <option value="">Toutes</option>
            <option value="basse">Basse</option>
            <option value="normale">Normale</option>
            <option value="haute">Haute</option>
            <option value="urgente">Urgente</option>
          </select>
        </div>
        <button @click="loadReclamations" class="btn-secondary">
          <i class="fas fa-search"></i>
          Filtrer
        </button>
      </div>
    </div>

    <!-- Reclamations List -->
    <div class="reclamations-list">
      <div v-if="loading" class="loading-state">
        <i class="fas fa-spinner fa-spin"></i>
        <p>Chargement des réclamations...</p>
      </div>

      <div v-else-if="reclamations.length === 0" class="empty-state">
        <i class="fas fa-inbox"></i>
        <h3>Aucune réclamation</h3>
        <p>Vous n'avez pas encore de réclamations</p>
        <button @click="showNewReclamationModal = true" class="btn-primary">
          Créer une réclamation
        </button>
      </div>

      <div v-else class="reclamations-grid">
        <div
          v-for="reclamation in reclamations"
          :key="reclamation.id"
          class="reclamation-card"
          @click="viewReclamation(reclamation)"
        >
          <div class="card-header">
            <div class="card-title">
              <h3>{{ reclamation.sujet }}</h3>
              <span class="numero">{{ reclamation.numeroReclamation }}</span>
            </div>
            <div class="card-badges">
              <span :class="['badge', 'status', reclamation.statut]">
                {{ getStatusLabel(reclamation.statut) }}
              </span>
              <span :class="['badge', 'priority', reclamation.priorite]">
                {{ getPriorityLabel(reclamation.priorite) }}
              </span>
            </div>
          </div>

          <div class="card-content">
            <p class="description">{{ reclamation.description }}</p>
            <div class="metadata">
              <span class="type">
                <i class="fas fa-tag"></i>
                {{ getTypeLabel(reclamation.typeReclamation) }}
              </span>
              <span class="date">
                <i class="fas fa-calendar"></i>
                {{ formatDate(reclamation.createdAt) }}
              </span>
            </div>

            <!-- Progress Bar pour le statut -->
            <div class="status-progress">
              <div class="progress-bar">
                <div
                  class="progress-fill"
                  :style="{ width: getProgressWidth(reclamation.statut) }"
                  :class="reclamation.statut"
                ></div>
              </div>
              <div class="progress-labels">
                <span
                  :class="{
                    active: [
                      'ouverte',
                      'en_cours',
                      'resolue',
                      'fermee',
                    ].includes(reclamation.statut),
                  }"
                  >Ouverte</span
                >
                <span
                  :class="{
                    active: ['en_cours', 'resolue', 'fermee'].includes(
                      reclamation.statut
                    ),
                  }"
                  >En cours</span
                >
                <span
                  :class="{
                    active: ['resolue', 'fermee'].includes(reclamation.statut),
                  }"
                  >Résolue</span
                >
                <span :class="{ active: reclamation.statut === 'fermee' }"
                  >Fermée</span
                >
              </div>
            </div>

            <!-- Dernière mise à jour -->
            <div v-if="reclamation.dateTraitement" class="last-update">
              <i class="fas fa-clock"></i>
              <span
                >Dernière mise à jour:
                {{ formatDate(reclamation.dateTraitement) }}</span
              >
            </div>
          </div>

          <!-- Actions rapides -->
          <div class="card-actions">
            <button
              @click.stop="viewReclamationDetails(reclamation)"
              class="btn-sm btn-outline"
            >
              <i class="fas fa-eye"></i>
              Voir détails
            </button>
            <button
              v-if="reclamation.statut === 'resolue'"
              @click.stop="showSatisfactionModal(reclamation)"
              class="btn-sm btn-success"
            >
              <i class="fas fa-star"></i>
              Évaluer
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- New Reclamation Modal -->
    <div
      v-if="showNewReclamationModal"
      class="modal-overlay"
      @click="closeModal"
    >
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>Nouvelle Réclamation</h2>
          <button @click="closeModal" class="close-btn">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <form @submit.prevent="submitReclamation" class="modal-body">
          <div class="form-group">
            <label for="sujet">Sujet *</label>
            <input
              type="text"
              id="sujet"
              v-model="newReclamation.sujet"
              required
              maxlength="255"
            />
          </div>

          <div class="form-group">
            <label for="typeReclamation">Type de réclamation *</label>
            <select
              id="typeReclamation"
              v-model="newReclamation.typeReclamation"
              required
            >
              <option value="">-- Sélectionner --</option>
              <option value="service">Service</option>
              <option value="document">Document</option>
              <option value="formation">Formation</option>
              <option value="technique">Technique</option>
              <option value="autre">Autre</option>
            </select>
          </div>

          <div class="form-group">
            <label for="priorite">Priorité</label>
            <select id="priorite" v-model="newReclamation.priorite">
              <option value="normale">Normale</option>
              <option value="basse">Basse</option>
              <option value="haute">Haute</option>
              <option value="urgente">Urgente</option>
            </select>
          </div>

          <div class="form-group">
            <label for="description">Description *</label>
            <textarea
              id="description"
              v-model="newReclamation.description"
              required
              rows="5"
              placeholder="Décrivez votre réclamation en détail..."
            ></textarea>
          </div>

          <div class="modal-actions">
            <button type="button" @click="closeModal" class="btn-secondary">
              Annuler
            </button>
            <button type="submit" class="btn-primary" :disabled="submitting">
              <i v-if="submitting" class="fas fa-spinner fa-spin"></i>
              {{ submitting ? "Envoi..." : "Envoyer" }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Reclamation Detail Modal -->
    <div
      v-if="selectedReclamation"
      class="modal-overlay"
      @click="closeDetailModal"
    >
      <div class="modal-content large" @click.stop>
        <div class="modal-header">
          <h2>Réclamation #{{ selectedReclamation.numeroReclamation }}</h2>
          <button @click="closeDetailModal" class="close-btn">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="modal-body">
          <div class="detail-grid">
            <div class="detail-section">
              <h3>Informations générales</h3>
              <div class="detail-item">
                <label>Sujet:</label>
                <span>{{ selectedReclamation.sujet }}</span>
              </div>
              <div class="detail-item">
                <label>Type:</label>
                <span>{{
                  getTypeLabel(selectedReclamation.typeReclamation)
                }}</span>
              </div>
              <div class="detail-item">
                <label>Statut:</label>
                <span :class="['badge', 'status', selectedReclamation.statut]">
                  {{ getStatusLabel(selectedReclamation.statut) }}
                </span>
              </div>
              <div class="detail-item">
                <label>Priorité:</label>
                <span
                  :class="['badge', 'priority', selectedReclamation.priorite]"
                >
                  {{ getPriorityLabel(selectedReclamation.priorite) }}
                </span>
              </div>
              <div class="detail-item">
                <label>Date de création:</label>
                <span>{{ formatDateTime(selectedReclamation.createdAt) }}</span>
              </div>
            </div>

            <div class="detail-section">
              <h3>Description</h3>
              <p class="description-text">
                {{ selectedReclamation.description }}
              </p>

              <div
                v-if="selectedReclamation.reponseAdmin"
                class="admin-response"
              >
                <h4>Réponse de l'administration</h4>
                <p>{{ selectedReclamation.reponseAdmin }}</p>
                <small
                  >Traitée le
                  {{
                    formatDateTime(selectedReclamation.dateTraitement)
                  }}</small
                >
              </div>
            </div>
          </div>

          <!-- Historique -->
          <div
            v-if="reclamationHistorique.length > 0"
            class="historique-section"
          >
            <h3>Historique</h3>
            <div class="timeline">
              <div
                v-for="item in reclamationHistorique"
                :key="item.id"
                class="timeline-item"
              >
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <div class="timeline-header">
                    <span class="action">{{
                      getActionLabel(item.typeAction)
                    }}</span>
                    <span class="date">{{
                      formatDateTime(item.dateAction)
                    }}</span>
                  </div>
                  <div class="timeline-body">
                    <p v-if="item.commentaire">{{ item.commentaire }}</p>
                    <div
                      v-if="item.ancienStatut && item.nouveauStatut"
                      class="status-change"
                    >
                      <span class="old-status">{{
                        getStatusLabel(item.ancienStatut)
                      }}</span>
                      <i class="fas fa-arrow-right"></i>
                      <span class="new-status">{{
                        getStatusLabel(item.nouveauStatut)
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Satisfaction Modal -->
    <div
      v-if="showSatisfactionModalFlag"
      class="modal-overlay"
      @click="closeSatisfactionModal"
    >
      <div class="modal-content satisfaction-modal" @click.stop>
        <div class="modal-header">
          <h2>Évaluer la réclamation</h2>
          <button @click="closeSatisfactionModal" class="close-btn">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="modal-body">
          <div class="satisfaction-content">
            <h3>Comment évaluez-vous le traitement de votre réclamation ?</h3>
            <p class="reclamation-ref">
              Réclamation:
              {{ selectedReclamationForSatisfaction?.numeroReclamation }}
            </p>

            <div class="rating-section">
              <div class="stars-rating">
                <button
                  v-for="star in 5"
                  :key="star"
                  @click="satisfactionData.rating = star"
                  :class="['star', { active: star <= satisfactionData.rating }]"
                >
                  <i class="fas fa-star"></i>
                </button>
              </div>
              <p class="rating-text">
                {{ getRatingText(satisfactionData.rating) }}
              </p>
            </div>

            <div class="form-group">
              <label for="satisfaction-comment">Commentaire (optionnel)</label>
              <textarea
                id="satisfaction-comment"
                v-model="satisfactionData.commentaire"
                rows="4"
                placeholder="Partagez votre expérience..."
              ></textarea>
            </div>
          </div>

          <div class="modal-actions">
            <button @click="closeSatisfactionModal" class="btn-secondary">
              Annuler
            </button>
            <button @click="submitSatisfaction" class="btn-primary">
              <i class="fas fa-paper-plane"></i>
              Envoyer l'évaluation
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from "../services/api.js";

export default {
  name: "ReclamationsView",
  data() {
    return {
      loading: false,
      submitting: false,
      reclamations: [],
      selectedReclamation: null,
      reclamationHistorique: [],
      showNewReclamationModal: false,
      stats: {
        total: 0,
        enCours: 0,
        resolue: 0,
        fermee: 0,
      },
      filters: {
        statut: "",
        type: "",
        priorite: "",
      },
      newReclamation: {
        sujet: "",
        description: "",
        typeReclamation: "",
        priorite: "normale",
      },
      // Données pour la modal de satisfaction
      showSatisfactionModalFlag: false,
      selectedReclamationForSatisfaction: null,
      satisfactionData: {
        rating: 0,
        commentaire: "",
      },
    };
  },
  mounted() {
    this.loadReclamations();
  },
  methods: {
    async loadReclamations() {
      this.loading = true;
      try {
        const filters = {};
        if (this.filters.statut) filters.statut = this.filters.statut;
        if (this.filters.type) filters.typeReclamation = this.filters.type;
        if (this.filters.priorite) filters.priorite = this.filters.priorite;

        const response = await apiService.getReclamations(filters);

        this.reclamations = response.reclamations || response || [];

        // Calculer les stats à partir des réclamations
        this.calculateStats();
      } catch (error) {
        console.error("Erreur lors du chargement des réclamations:", error);
        this.$toast?.error("Erreur lors du chargement des réclamations");
      } finally {
        this.loading = false;
      }
    },

    calculateStats() {
      this.stats = {
        total: this.reclamations.length,
        enCours: this.reclamations.filter((r) => r.statut === "en_cours")
          .length,
        resolue: this.reclamations.filter((r) => r.statut === "resolue").length,
        fermee: this.reclamations.filter((r) => r.statut === "fermee").length,
      };
    },

    async submitReclamation() {
      this.submitting = true;
      try {
        await apiService.createReclamation(this.newReclamation);

        this.$toast?.success("Réclamation créée avec succès");
        this.closeModal();
        this.loadReclamations();
      } catch (error) {
        console.error("Erreur lors de la création de la réclamation:", error);
        this.$toast?.error("Erreur lors de la création de la réclamation");
      } finally {
        this.submitting = false;
      }
    },

    async viewReclamation(reclamation) {
      this.selectedReclamation = reclamation;

      // Charger les détails avec l'historique
      try {
        const response = await apiService.getReclamation(reclamation.id);
        this.selectedReclamation = response;
        this.reclamationHistorique = response.historique || [];
      } catch (error) {
        console.error("Erreur lors du chargement de l'historique:", error);
      }
    },

    closeModal() {
      this.showNewReclamationModal = false;
      this.newReclamation = {
        sujet: "",
        description: "",
        typeReclamation: "",
        priorite: "normale",
      };
    },

    closeDetailModal() {
      this.selectedReclamation = null;
      this.reclamationHistorique = [];
    },

    getStatusLabel(statut) {
      const labels = {
        ouverte: "Ouverte",
        en_cours: "En cours",
        resolue: "Résolue",
        fermee: "Fermée",
      };
      return labels[statut] || statut;
    },

    getPriorityLabel(priorite) {
      const labels = {
        basse: "Basse",
        normale: "Normale",
        haute: "Haute",
        urgente: "Urgente",
      };
      return labels[priorite] || priorite;
    },

    getTypeLabel(type) {
      const labels = {
        service: "Service",
        document: "Document",
        formation: "Formation",
        technique: "Technique",
        autre: "Autre",
      };
      return labels[type] || type;
    },

    getActionLabel(action) {
      const labels = {
        creation: "Création",
        modification: "Modification",
        traitement: "Traitement",
        resolution: "Résolution",
        fermeture: "Fermeture",
      };
      return labels[action] || action;
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString("fr-FR");
    },

    formatDateTime(date) {
      return new Date(date).toLocaleString("fr-FR");
    },

    // Nouvelles méthodes pour le suivi de traitement
    getProgressWidth(statut) {
      const progressMap = {
        ouverte: "25%",
        en_cours: "50%",
        resolue: "75%",
        fermee: "100%",
      };
      return progressMap[statut] || "0%";
    },

    viewReclamationDetails(reclamation) {
      // Même fonction que viewReclamation mais avec un nom plus explicite
      this.viewReclamation(reclamation);
    },

    showSatisfactionModal(reclamation) {
      // Modal pour évaluer la satisfaction
      this.selectedReclamationForSatisfaction = reclamation;
      this.showSatisfactionModalFlag = true;
    },

    async submitSatisfaction() {
      if (
        !this.selectedReclamationForSatisfaction ||
        !this.satisfactionData.rating
      ) {
        this.$toast?.error("Veuillez donner une note");
        return;
      }

      try {
        await apiService.addSatisfaction(
          this.selectedReclamationForSatisfaction.id,
          this.satisfactionData.rating,
          this.satisfactionData.commentaire
        );

        this.$toast?.success("Évaluation envoyée avec succès");
        this.closeSatisfactionModal();
        this.loadReclamations();
      } catch (error) {
        console.error("Erreur lors de l'envoi de l'évaluation:", error);
        this.$toast?.error("Erreur lors de l'envoi de l'évaluation");
      }
    },

    closeSatisfactionModal() {
      this.showSatisfactionModalFlag = false;
      this.selectedReclamationForSatisfaction = null;
      this.satisfactionData = {
        rating: 0,
        commentaire: "",
      };
    },

    getRatingText(rating) {
      const texts = {
        0: "Sélectionnez une note",
        1: "Très insatisfait",
        2: "Insatisfait",
        3: "Neutre",
        4: "Satisfait",
        5: "Très satisfait",
      };
      return texts[rating] || "";
    },
  },
};
</script>

<style scoped>
.reclamations-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 0;
}

.page-header {
  background: white;
  margin: 0 2rem 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.header-content {
  padding: 3rem;
  text-align: center;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
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
  margin-bottom: 2rem;
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
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
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

.stat-icon.blue {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}
.stat-icon.orange {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}
.stat-icon.green {
  background: linear-gradient(135deg, #10b981, #047857);
}
.stat-icon.red {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

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

.filters-section {
  background: white;
  margin: 0 2rem 2rem;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.filters-row {
  display: flex;
  gap: 1rem;
  align-items: end;
  flex-wrap: wrap;
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
  border-color: #4f46e5;
}

.reclamations-list {
  margin: 0 2rem;
}

.loading-state,
.empty-state {
  background: white;
  border-radius: 15px;
  padding: 4rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.loading-state i,
.empty-state i {
  font-size: 3rem;
  color: #9ca3af;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.5rem;
  color: #374151;
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: #6b7280;
  margin-bottom: 2rem;
}

.reclamations-grid {
  display: grid;
  gap: 1.5rem;
}

.reclamation-card {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.reclamation-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  border-color: #4f46e5;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1rem;
}

.card-title h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.numero {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.card-badges {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.badge.status.ouverte {
  background: #fef3c7;
  color: #92400e;
}
.badge.status.en_cours {
  background: #dbeafe;
  color: #1e40af;
}
.badge.status.resolue {
  background: #d1fae5;
  color: #065f46;
}
.badge.status.fermee {
  background: #fee2e2;
  color: #991b1b;
}

.badge.priority.basse {
  background: #f3f4f6;
  color: #374151;
}
.badge.priority.normale {
  background: #dbeafe;
  color: #1e40af;
}
.badge.priority.haute {
  background: #fef3c7;
  color: #92400e;
}
.badge.priority.urgente {
  background: #fee2e2;
  color: #991b1b;
}

.card-content .description {
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.metadata {
  display: flex;
  gap: 1rem;
  align-items: center;
  color: #6b7280;
  font-size: 0.875rem;
}

.metadata span {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.btn-primary,
.btn-secondary {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(79, 70, 229, 0.4);
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
}

.btn-secondary:hover {
  background: #e5e7eb;
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
  max-width: 900px;
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

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #374151;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #4f46e5;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

/* Detail Modal Styles */
.detail-grid {
  display: grid;
  gap: 2rem;
  margin-bottom: 2rem;
}

.detail-section h3 {
  color: #1f2937;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
}

.detail-item {
  display: flex;
  margin-bottom: 0.75rem;
  align-items: center;
}

.detail-item label {
  font-weight: 600;
  color: #374151;
  min-width: 120px;
  margin-right: 1rem;
}

.description-text {
  color: #4b5563;
  line-height: 1.6;
  background: #f9fafb;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.admin-response {
  background: #f0f9ff;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #0ea5e9;
}

.admin-response h4 {
  color: #0c4a6e;
  margin: 0 0 0.5rem 0;
}

.admin-response small {
  color: #0369a1;
  font-style: italic;
}

/* Timeline Styles */
.historique-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid #e5e7eb;
}

.historique-section h3 {
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: "";
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
  background: #4f46e5;
  border: 3px solid white;
  box-shadow: 0 0 0 2px #4f46e5;
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
}

.timeline-header .action {
  font-weight: 600;
  color: #1f2937;
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

/* Progress Bar Styles */
.status-progress {
  margin-top: 1rem;
}

.progress-bar {
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  transition: width 0.3s ease;
  border-radius: 4px;
}

.progress-fill.ouverte {
  background: linear-gradient(90deg, #f59e0b, #d97706);
}

.progress-fill.en_cours {
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
}

.progress-fill.resolue {
  background: linear-gradient(90deg, #10b981, #047857);
}

.progress-fill.fermee {
  background: linear-gradient(90deg, #10b981, #047857);
}

.progress-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #6b7280;
}

.progress-labels span.active {
  color: #1f2937;
  font-weight: 600;
}

/* Last Update Styles */
.last-update {
  margin-top: 0.75rem;
  padding: 0.5rem;
  background: #f3f4f6;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.last-update i {
  color: #9ca3af;
}

/* Card Actions Styles */
.card-actions {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-outline {
  background: transparent;
  color: #4f46e5;
  border: 1px solid #4f46e5;
}

.btn-outline:hover {
  background: #4f46e5;
  color: white;
}

.btn-success {
  background: #10b981;
  color: white;
}

.btn-success:hover {
  background: #047857;
}

/* Satisfaction Modal Styles */
.satisfaction-modal {
  max-width: 500px;
}

.satisfaction-content {
  text-align: center;
}

.satisfaction-content h3 {
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.reclamation-ref {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 2rem;
}

.rating-section {
  margin: 2rem 0;
}

.stars-rating {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.star {
  background: none;
  border: none;
  font-size: 2rem;
  color: #d1d5db;
  cursor: pointer;
  transition: color 0.2s ease;
}

.star:hover,
.star.active {
  color: #fbbf24;
}

.rating-text {
  font-weight: 600;
  color: #4f46e5;
  margin: 0;
}

.satisfaction-modal .form-group {
  text-align: left;
  margin-top: 1.5rem;
}

@media (max-width: 768px) {
  .reclamations-container {
    padding: 1rem 0;
  }

  .page-header,
  .stats-grid,
  .filters-section,
  .reclamations-list {
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

  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .metadata {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .modal-overlay {
    padding: 1rem;
  }

  .modal-actions {
    flex-direction: column;
  }
}
</style>
