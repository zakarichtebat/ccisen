<template>
  <section class="avis-section" id="avis">
    <div class="container">
      <!-- En-tête -->
      <div class="avis-header">
        <div class="avis-badge">
          <span class="badge-icon">⭐</span>
          <span>Votre Opinion Compte</span>
        </div>
        
        <h2 class="avis-title">
          Partagez votre <span class="highlight">expérience</span>
        </h2>
        
        <p class="avis-subtitle">
          Votre avis nous aide à améliorer nos services et guide d'autres entrepreneurs.
        </p>
      </div>

      <!-- Contenu principal -->
      <div class="avis-content">
        <!-- Formulaire d'avis -->
        <div class="avis-form-container">
          <div class="form-header">
            <h3>Laissez votre avis</h3>
            <p>Votre retour d'expérience est précieux</p>
          </div>

          <form @submit.prevent="submitAvis" class="avis-form">
            <!-- Évaluation par étoiles -->
            <div class="rating-container">
              <label>Votre note</label>
              <div class="star-rating">
                <button 
                  v-for="star in 5" 
                  :key="star"
                  type="button"
                  class="star"
                  :class="{ 'active': star <= formData.note }"
                  @click="setRating(star)"
                >
                  ★
                </button>
              </div>
              <span class="rating-text">{{ getRatingText() }}</span>
            </div>

            <!-- Type de service -->
            <div class="form-group">
              <label for="service-type">Service évalué</label>
              <select id="service-type" v-model="formData.typeService" required>
                <option value="">Sélectionnez un service</option>
                <option value="formation">Formation</option>
                <option value="document">Certificats et Documents</option>
                <option value="rendez-vous">Rendez-vous</option>
                <option value="general">Service général</option>
              </select>
            </div>

            <!-- Sujet -->
            <div class="form-group">
              <label for="sujet">Sujet de votre avis</label>
              <input 
                type="text" 
                id="sujet" 
                v-model="formData.sujet" 
                placeholder="Ex: Excellente formation sur l'entrepreneuriat"
                required
                maxlength="100"
              />
              <span class="char-count">{{ formData.sujet.length }}/100</span>
            </div>

            <!-- Commentaire -->
            <div class="form-group">
              <label for="commentaire">Votre commentaire</label>
              <textarea 
                id="commentaire" 
                v-model="formData.commentaire" 
                placeholder="Partagez votre expérience en détail..."
                required
                rows="4"
                maxlength="500"
              ></textarea>
              <span class="char-count">{{ formData.commentaire.length }}/500</span>
            </div>

            <!-- Bouton de soumission -->
            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              <span v-if="!isSubmitting">
                <i class="fas fa-paper-plane"></i>
                Publier mon avis
              </span>
              <span v-else>
                <i class="fas fa-spinner fa-spin"></i>
                Publication...
              </span>
            </button>
          </form>
        </div>

        <!-- Avis récents -->
        <div class="avis-list-container">
          <div class="list-header">
            <h3>Avis récents</h3>
            <div class="avis-stats">
              <div class="avg-rating">
                <div class="rating-stars">
                  <span v-for="n in 5" :key="n" class="star">★</span>
                </div>
                <span class="rating-number">4.8/5</span>
              </div>
              <span class="total-avis">{{ totalAvis }} avis</span>
            </div>
          </div>

          <div class="avis-list">
            <div 
              v-for="avis in avisList" 
              :key="avis.id" 
              class="avis-card"
            >
              <div class="avis-header">
                <div class="user-info">
                  <div class="user-avatar">
                    {{ getUserInitial(avis.user) }}
                  </div>
                  <div class="user-details">
                    <h4>{{ getUserName(avis.user) }}</h4>
                    <span class="service-type">{{ getServiceLabel(avis.typeService) }}</span>
                  </div>
                </div>
                <div class="avis-rating">
                  <div class="stars">
                    <span 
                      v-for="star in 5" 
                      :key="star" 
                      class="star" 
                      :class="{ 'filled': star <= avis.note }"
                    >★</span>
                  </div>
                  <span class="avis-date">{{ formatDate(avis.createdAt) }}</span>
                </div>
              </div>
              <div class="avis-content">
                <h5>{{ avis.sujet }}</h5>
                <p>{{ avis.commentaire }}</p>
              </div>
            </div>
          </div>

          <div class="avis-actions" v-if="hasMoreAvis">
            <button @click="loadMoreAvis" class="load-more-btn">
              Voir plus d'avis
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Variables réactives
const formData = ref({
  note: 0,
  typeService: '',
  sujet: '',
  commentaire: ''
})

const isSubmitting = ref(false)
const avisList = ref([])
const totalAvis = ref(0)
const hasMoreAvis = ref(false)
const currentPage = ref(0)

// Données par défaut pour l'affichage
const defaultAvis = [
  {
    id: 1,
    user: { prenom: 'Marie', nom: 'Dubois' },
    typeService: 'formation',
    sujet: 'Excellente formation entrepreneuriat',
    commentaire: 'Formation très complète et enrichissante. Les formateurs sont compétents et à l\'écoute.',
    note: 5,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    user: { prenom: 'Ahmed', nom: 'El Mansouri' },
    typeService: 'document',
    sujet: 'Service rapide et efficace',
    commentaire: 'J\'ai obtenu mes certificats rapidement. Le processus est bien organisé.',
    note: 4,
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    user: { prenom: 'Fatima', nom: 'Benali' },
    typeService: 'rendez-vous',
    sujet: 'Personnel très accueillant',
    commentaire: 'Rendez-vous pris facilement, personnel très professionnel et à l\'écoute.',
    note: 5,
    createdAt: new Date().toISOString()
  }
]

// Fonctions utilitaires
const getUserInitial = (user) => {
  if (!user || !user.prenom) return '?'
  return user.prenom.charAt(0).toUpperCase()
}

const getUserName = (user) => {
  if (!user) return 'Utilisateur anonyme'
  const prenom = user.prenom || 'Utilisateur'
  const nomInitial = user.nom ? user.nom.charAt(0) + '.' : ''
  return `${prenom} ${nomInitial}`
}

const getServiceLabel = (type) => {
  const labels = {
    formation: 'Formation',
    document: 'Certificats',
    'rendez-vous': 'Rendez-vous',
    general: 'Service général'
  }
  return labels[type] || type
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const setRating = (rating) => {
  formData.value.note = rating
}

const getRatingText = () => {
  const texts = {
    0: 'Aucune note',
    1: 'Très insatisfait',
    2: 'Insatisfait',
    3: 'Correct',
    4: 'Satisfait',
    5: 'Très satisfait'
  }
  return texts[formData.value.note] || 'Aucune note'
}

// Fonction pour charger les avis
const loadAvis = async () => {
  try {
    console.log('Chargement des avis...')
    
    const response = await fetch('http://localhost:3000/avis/public?limit=6')
    
    if (response.ok) {
      const data = await response.json()
      console.log('Avis reçus:', data)
      
      if (Array.isArray(data) && data.length > 0) {
        avisList.value = data
        totalAvis.value = data.length
      } else {
        // Utiliser les données par défaut
        avisList.value = defaultAvis
        totalAvis.value = 45
      }
    } else {
      throw new Error('Erreur API')
    }
  } catch (error) {
    console.error('Erreur lors du chargement des avis:', error)
    // Utiliser les données par défaut
    avisList.value = defaultAvis
    totalAvis.value = 45
  }
}

// Fonction pour soumettre un avis
const submitAvis = async () => {
  if (formData.value.note === 0) {
    alert('Veuillez sélectionner une note')
    return
  }

  if (!formData.value.sujet.trim()) {
    alert('Veuillez saisir un sujet')
    return
  }

  if (!formData.value.commentaire.trim()) {
    alert('Veuillez saisir un commentaire')
    return
  }

  if (!formData.value.typeService) {
    alert('Veuillez sélectionner le type de service')
    return
  }

  // Vérifier si l'utilisateur est connecté
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  if (!user) {
    alert('Vous devez être connecté pour laisser un avis')
    router.push('/login')
    return
  }

  isSubmitting.value = true

  try {
    const token = localStorage.getItem('token')
    
    // Préparer les données avec l'ID utilisateur
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const avisData = {
      ...formData.value,
      userId: user.id
    }
    
    console.log('Données à envoyer:', avisData)
    
    const response = await fetch('http://localhost:3000/avis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(avisData)
    })

    if (response.ok) {
      alert('Votre avis a été publié avec succès!')
      
      // Réinitialiser le formulaire
      formData.value = {
        note: 0,
        typeService: '',
        sujet: '',
        commentaire: ''
      }
      
      // Recharger les avis
      await loadAvis()
    } else {
      const errorData = await response.json().catch(() => ({}))
      console.error('Erreur API:', errorData)
      throw new Error(errorData.message || `Erreur ${response.status}: ${response.statusText}`)
    }
  } catch (error) {
    console.error('Erreur:', error)
    alert('Erreur lors de la publication de votre avis')
  } finally {
    isSubmitting.value = false
  }
}

const loadMoreAvis = () => {
  // Fonction pour charger plus d'avis
  console.log('Chargement de plus d\'avis...')
}

// Charger les avis au montage
onMounted(() => {
  loadAvis()
})
</script>

<style scoped>
.avis-section {
  padding: 8rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.avis-header {
  text-align: center;
  margin-bottom: 4rem;
}

.avis-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.9);
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  margin-bottom: 1.5rem;
  color: #667eea;
  font-weight: 600;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.badge-icon {
  font-size: 1.2rem;
}

.avis-title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 1rem;
  color: #1f2937;
}

.avis-title .highlight {
  background: linear-gradient(45deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.avis-subtitle {
  font-size: 1.2rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.avis-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

/* Formulaire d'avis */
.avis-form-container {
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.form-header h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem;
}

.form-header p {
  color: #6b7280;
  margin: 0;
}

.avis-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.rating-container {
  text-align: center;
}

.rating-container label {
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
}

.star-rating {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.star {
  background: none;
  border: none;
  font-size: 2rem;
  color: #d1d5db;
  cursor: pointer;
  transition: all 0.3s ease;
}

.star:hover,
.star.active {
  color: #fbbf24;
  transform: scale(1.1);
}

.rating-text {
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 500;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #374151;
}

.form-group input,
.form-group select,
.form-group textarea {
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
  border-color: #667eea;
}

.char-count {
  font-size: 0.8rem;
  color: #9ca3af;
  text-align: right;
}

.submit-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Liste des avis */
.avis-list-container {
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.list-header h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.avis-stats {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avg-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.rating-stars {
  display: flex;
  gap: 2px;
}

.rating-stars .star {
  color: #fbbf24;
  font-size: 1rem;
}

.rating-number {
  font-weight: 700;
  color: #1f2937;
}

.total-avis {
  color: #6b7280;
  font-size: 0.9rem;
}

.avis-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.avis-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.avis-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  background: white;
}

.avis-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
}

.user-details h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem;
}

.service-type {
  font-size: 0.8rem;
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 500;
}

.avis-rating {
  text-align: right;
}

.avis-rating .stars {
  display: flex;
  gap: 2px;
  margin-bottom: 0.25rem;
  justify-content: flex-end;
}

.avis-rating .star {
  font-size: 0.9rem;
  color: #d1d5db;
}

.avis-rating .star.filled {
  color: #fbbf24;
}

.avis-date {
  font-size: 0.75rem;
  color: #9ca3af;
}

.avis-content h5 {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem;
}

.avis-content p {
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
  font-size: 0.9rem;
}

.avis-actions {
  text-align: center;
  margin-top: 2rem;
}

.load-more-btn {
  background: #f3f4f6;
  color: #374151;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.load-more-btn:hover {
  background: #e5e7eb;
  transform: translateY(-1px);
}

/* Responsive */
@media (max-width: 1024px) {
  .avis-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .avis-section {
    padding: 6rem 0;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  .avis-title {
    font-size: 2.5rem;
  }
  
  .avis-form-container,
  .avis-list-container {
    padding: 2rem;
  }
  
  .avis-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .avis-title {
    font-size: 2rem;
  }
  
  .star-rating .star {
    font-size: 1.5rem;
  }
  
  .avis-form-container,
  .avis-list-container {
    padding: 1.5rem;
  }
}
</style> 