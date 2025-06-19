<template>
  <div class="avis-list-container">
    <div class="avis-list-header">
      <h3>Avis de nos clients</h3>
      <p>Découvrez ce que pensent nos clients de nos services</p>
    </div>

    <!-- Filtres -->
    <div class="filters">
      <select v-model="selectedService" @change="loadAvis" class="filter-select">
        <option value="">Tous les services</option>
        <option value="formation">Formation</option>
        <option value="document">Certificats et Documents</option>
        <option value="rendez-vous">Rendez-vous</option>
        <option value="general">Service général</option>
      </select>
    </div>

    <!-- Statistiques -->
    <div v-if="stats" class="stats-container">
      <div class="stat-item">
        <span class="stat-number">{{ stats.totalAvis }}</span>
        <span class="stat-label">Avis total</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">{{ stats.moyenneNote.toFixed(1) }}</span>
        <span class="stat-label">Note moyenne</span>
      </div>
      <div class="rating-stars">
        <span v-for="star in 5" :key="star" class="star" :class="{ 'filled': star <= Math.round(stats.moyenneNote) }">★</span>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Chargement des avis...</p>
    </div>

    <!-- Liste des avis -->
    <div v-else-if="avisList.length > 0" class="avis-list">
      <div 
        v-for="avis in avisList" 
        :key="avis.id" 
        class="avis-card"
      >
        <div class="avis-header">
          <div class="user-info">
            <div class="user-avatar">
              {{ avis.user.prenom.charAt(0).toUpperCase() }}
            </div>
            <div class="user-details">
              <h4>{{ avis.user.prenom }} {{ avis.user.nom.charAt(0).toUpperCase() }}.</h4>
              <span class="service-type">{{ getServiceLabel(avis.typeService) }}</span>
            </div>
          </div>
          <div class="avis-rating">
            <div class="stars">
              <span v-for="star in 5" :key="star" class="star" :class="{ 'filled': star <= avis.note }">★</span>
            </div>
            <span class="rating-number">({{ avis.note }}/5)</span>
          </div>
        </div>

        <div class="avis-content">
          <h5 class="avis-subject">{{ avis.sujet }}</h5>
          <p class="avis-comment">{{ avis.commentaire }}</p>
        </div>

        <div class="avis-footer">
          <span class="avis-date">{{ formatDate(avis.createdAt) }}</span>
        </div>
      </div>
    </div>

    <!-- Aucun avis -->
    <div v-else class="no-avis">
      <div class="no-avis-icon">💬</div>
      <h4>Aucun avis disponible</h4>
      <p>Soyez le premier à donner votre avis sur nos services !</p>
    </div>

    <!-- Bouton pour voir plus -->
    <div v-if="hasMore && !loading" class="load-more-container">
      <button @click="loadMoreAvis" class="load-more-btn">
        Voir plus d'avis
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Variables réactives
const avisList = ref([])
const stats = ref(null)
const loading = ref(false)
const selectedService = ref('')
const currentPage = ref(0)
const hasMore = ref(true)
const pageSize = 6

/**
 * Charger les avis
 */
const loadAvis = async (loadMore = false) => {
  loading.value = true
  
  if (!loadMore) {
    currentPage.value = 0
    avisList.value = []
  }

  try {
    const params = new URLSearchParams({
      limit: pageSize.toString(),
      offset: (currentPage.value * pageSize).toString(),
      visible: 'true',
      statut: 'actif'
    })

    if (selectedService.value) {
      params.append('typeService', selectedService.value)
    }

    const response = await fetch(`http://localhost:3000/avis?${params}`)
    
    if (response.ok) {
      const data = await response.json()
      
      if (loadMore) {
        avisList.value = [...avisList.value, ...data]
      } else {
        avisList.value = data
      }
      
      hasMore.value = data.length === pageSize
      currentPage.value++
    } else {
      console.error('Erreur lors du chargement des avis')
    }
  } catch (error) {
    console.error('Erreur:', error)
  } finally {
    loading.value = false
  }
}

/**
 * Charger plus d'avis
 */
const loadMoreAvis = () => {
  loadAvis(true)
}

/**
 * Charger les statistiques
 */
const loadStats = async () => {
  try {
    const response = await fetch('http://localhost:3000/avis/stats')
    
    if (response.ok) {
      stats.value = await response.json()
    }
  } catch (error) {
    console.error('Erreur lors du chargement des statistiques:', error)
  }
}

/**
 * Obtenir le label du service
 */
const getServiceLabel = (type) => {
  const labels = {
    formation: 'Formation',
    document: 'Certificats et Documents',
    'rendez-vous': 'Rendez-vous',
    general: 'Service général'
  }
  return labels[type] || type
}

/**
 * Formater la date
 */
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Charger les données au montage
onMounted(() => {
  loadAvis()
  loadStats()
})
</script>

<style scoped>
.avis-list-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.avis-list-header {
  text-align: center;
  margin-bottom: 30px;
}

.avis-list-header h3 {
  color: #2c3e50;
  font-size: 1.8em;
  margin-bottom: 8px;
  font-weight: 600;
}

.avis-list-header p {
  color: #6c757d;
  font-size: 1em;
  margin: 0;
}

.filters {
  margin-bottom: 30px;
  text-align: center;
}

.filter-select {
  padding: 10px 15px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1em;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.filter-select:focus {
  outline: none;
  border-color: #3498db;
}

.stats-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e1e5e9;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2em;
  font-weight: 700;
  color: #3498db;
}

.stat-label {
  font-size: 0.9em;
  color: #6c757d;
  margin-top: 5px;
}

.rating-stars {
  display: flex;
  gap: 2px;
}

.rating-stars .star {
  font-size: 1.5em;
  color: #ddd;
}

.rating-stars .star.filled {
  color: #ffd700;
}

.loading {
  text-align: center;
  padding: 40px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.avis-list {
  display: grid;
  gap: 20px;
}

.avis-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  border: 1px solid #e1e5e9;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.avis-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
}

.avis-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.2em;
}

.user-details h4 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.1em;
  font-weight: 600;
}

.service-type {
  color: #6c757d;
  font-size: 0.85em;
}

.avis-rating {
  text-align: right;
}

.stars {
  display: flex;
  gap: 2px;
  margin-bottom: 5px;
  justify-content: flex-end;
}

.star {
  font-size: 1.2em;
  color: #ddd;
}

.star.filled {
  color: #ffd700;
}

.rating-number {
  color: #6c757d;
  font-size: 0.9em;
}

.avis-content {
  margin: 15px 0;
}

.avis-subject {
  color: #2c3e50;
  font-size: 1.1em;
  font-weight: 600;
  margin: 0 0 10px 0;
}

.avis-comment {
  color: #555;
  line-height: 1.6;
  margin: 0;
}

.avis-footer {
  text-align: right;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #f1f3f4;
}

.avis-date {
  color: #6c757d;
  font-size: 0.85em;
}

.no-avis {
  text-align: center;
  padding: 60px 20px;
}

.no-avis-icon {
  font-size: 4em;
  margin-bottom: 20px;
  opacity: 0.7;
}

.no-avis h4 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.no-avis p {
  color: #6c757d;
  margin: 0;
}

.load-more-container {
  text-align: center;
  margin-top: 30px;
}

.load-more-btn {
  padding: 12px 30px;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1em;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.load-more-btn:hover {
  background: linear-gradient(135deg, #2980b9, #1f618d);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
}

/* Responsive */
@media (max-width: 768px) {
  .avis-list-container {
    padding: 15px;
  }
  
  .stats-container {
    flex-direction: column;
    gap: 20px;
  }
  
  .avis-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .avis-rating {
    text-align: left;
  }
  
  .stars {
    justify-content: flex-start;
  }
}
</style> 