<template>
  <div class="formations-page">
    <TheHeader />
    
    <!-- Section héro moderne -->
    <section class="formations-hero">
      <div class="hero-bg">
        <div class="floating-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
        </div>
      </div>
      <div class="container">
        <div class="hero-content">
          <h1>🎓 Formations Professionnelles</h1>
          <p>Développez vos compétences avec nos formations d'excellence</p>
          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-number">{{ formations.length }}</span>
              <span class="stat-label">Formations</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ totalInscriptions }}</span>
              <span class="stat-label">Participants</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ totalLikes }}</span>
              <span class="stat-label">Likes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Section principale -->
    <section class="formations-main">
      <div class="container">
        
        <!-- Loading state -->
        <div v-if="loading" class="loading-state">
          <div class="loading-spinner"></div>
          <p>Chargement des formations...</p>
        </div>
        
        <!-- État vide -->
        <div v-else-if="formations.length === 0" class="no-formations">
          <div class="empty-illustration">
            <div class="empty-icon">📚</div>
            <div class="empty-circles">
              <div class="circle circle-1"></div>
              <div class="circle circle-2"></div>
              <div class="circle circle-3"></div>
            </div>
          </div>
          <h3>Aucune formation disponible</h3>
          <p>Aucune formation n'est actuellement proposée. Revenez bientôt !</p>
        </div>
        
        <!-- Liste des formations avec design amélioré -->
        <div v-else class="formations-grid">
          <div 
            v-for="formation in formations" 
            :key="formation.id"
            class="formation-card"
            @click="openFormationDetails(formation)"
          >
            <!-- Image de la formation -->
            <div class="formation-image-container">
              <img 
                :src="getFormationImage(formation)" 
                :alt="formation.titre"
                class="formation-image"
                @error="onImageError"
              />
              <div class="image-overlay">
                <div class="overlay-content">
                  <i class="fas fa-play-circle play-icon"></i>
                  <span>Voir les détails</span>
                </div>
              </div>
              <div class="formation-category">
                <i class="fas fa-graduation-cap"></i>
                <span>Formation</span>
              </div>
            </div>
            
            <!-- Contenu de la formation -->
            <div class="formation-content">
              <div class="formation-header">
                <h3>{{ formation.titre }}</h3>
                <div class="formation-price" :class="{ 'free': formation.prix === 0 }">
                  {{ formation.prix === 0 ? 'Gratuit' : formation.prix + '€' }}
                </div>
              </div>
              
              <p class="formation-description">{{ formation.description }}</p>
              
              <div class="formation-details">
                <div class="detail-item">
                  <i class="fas fa-calendar-alt"></i>
                  <span>{{ formatDateRange(formation.dateDebut, formation.dateFin) }}</span>
                </div>
                
                <div class="detail-item">
                  <i class="fas fa-clock"></i>
                  <span>{{ formation.heureDebut }} - {{ formation.heureFin }}</span>
                </div>
                
                <div class="detail-item">
                  <i class="fas fa-map-marker-alt"></i>
                  <span>{{ formation.lieu }}</span>
                </div>
                
                <div class="detail-item">
                  <i class="fas fa-users"></i>
                  <span>{{ formation.inscriptions.length }}/{{ formation.maxParticipants }} participants</span>
                </div>
              </div>
              
              <!-- Progress bar for participants -->
              <div class="participants-progress">
                <div 
                  class="progress-bar" 
                  :style="{ width: (formation.inscriptions.length / formation.maxParticipants * 100) + '%' }"
                ></div>
                <span class="progress-text">
                  {{ Math.round((formation.inscriptions.length / formation.maxParticipants) * 100) }}% complet
                </span>
              </div>
              
              <!-- Statut de la formation -->
              <div class="formation-status">
                <span 
                  class="status-badge"
                  :class="getStatusClass(formation)"
                >
                  {{ getStatusText(formation) }}
                </span>
              </div>
              
              <!-- Section likes et commentaires -->
              <div class="engagement-section" @click.stop>
                <div class="engagement-stats" @click.stop>
                  <button 
                    @click.stop="toggleLike(formation.id)"
                    class="like-btn"
                    :class="{ 'liked': isLiked(formation.id) }"
                  >
                    <i :class="isLiked(formation.id) ? 'fas fa-heart' : 'far fa-heart'" @click.stop></i>
                    <span @click.stop>{{ formation.likes?.length || 0 }}</span>
                  </button>
                  
                  <div class="comment-info" @click.stop>
                    <i class="far fa-comment" @click.stop></i>
                    <span @click.stop>{{ formation.comments?.length || 0 }} commentaires</span>
                  </div>
                  
                  <button @click.stop="shareFormation(formation)" class="share-btn">
                    <i class="fas fa-share-alt" @click.stop></i>
                    <span @click.stop>Partager</span>
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Section commentaires complètement séparée -->
            <div class="comments-wrapper" @click.stop @mousedown.stop @mouseup.stop>
              <!-- Section commentaires (toujours visible et simplifiée) -->
              <div class="comments-section" @click.stop @mousedown.stop @mouseup.stop>
                <div class="comments-header" @click.stop @mousedown.stop @mouseup.stop>
                  <h4 @click.stop @mousedown.stop @mouseup.stop>💬 Commentaires ({{ formation.comments?.length || 0 }})</h4>
                </div>
                
                <!-- Formulaire d'ajout de commentaire (en haut) -->
                <div class="add-comment" @click.stop @mousedown.stop @mouseup.stop>
                  <div class="comment-form" @click.stop @mousedown.stop @mouseup.stop>
                    <div class="user-avatar" @click.stop @mousedown.stop @mouseup.stop>
                      <img :src="currentUserAvatar" alt="Votre avatar" @click.stop @mousedown.stop @mouseup.stop />
                    </div>
                    <div class="comment-input-container" @click.stop @mousedown.stop @mouseup.stop>
                      <!-- Champ nom pour utilisateurs anonymes -->
                      <div v-if="!isAuthenticated" class="anonymous-name-input" @click.stop @mousedown.stop @mouseup.stop>
                        <input
                          v-model="anonymousNames[formation.id]"
                          placeholder="Votre nom (optionnel)"
                          class="name-input"
                          maxlength="50"
                          @click.stop
                          @focus.stop
                          @mousedown.stop
                          @mouseup.stop
                        />
                      </div>
                      
                      <div class="input-with-button" @click.stop @mousedown.stop @mouseup.stop>
                        <textarea
                          v-model="newComments[formation.id]"
                          placeholder="Écrivez votre commentaire..."
                          class="comment-input"
                          rows="2"
                          @keydown.enter.prevent="addComment(formation.id)"
                          @click.stop
                          @focus.stop
                          @mousedown.stop
                          @mouseup.stop
                        ></textarea>
                        <button 
                          @click.stop="addComment(formation.id)"
                          @mousedown.stop
                          @mouseup.stop
                          class="send-comment-btn"
                          :disabled="!newComments[formation.id]?.trim()"
                        >
                          <i class="fas fa-paper-plane" @click.stop @mousedown.stop @mouseup.stop></i>
                          Publier
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Liste des commentaires -->
                <div v-if="formation.comments && formation.comments.length > 0" class="comments-list" @click.stop @mousedown.stop @mouseup.stop>
                  <div 
                    v-for="comment in formation.comments" 
                    :key="comment.id"
                    class="comment-item"
                    @click.stop
                    @mousedown.stop
                    @mouseup.stop
                  >
                    <div class="comment-avatar" @click.stop @mousedown.stop @mouseup.stop>
                      <img :src="getAvatarUrl(comment.user)" :alt="comment.user.nom" @click.stop @mousedown.stop @mouseup.stop />
                    </div>
                    <div class="comment-content" @click.stop @mousedown.stop @mouseup.stop>
                      <div class="comment-header" @click.stop @mousedown.stop @mouseup.stop>
                        <span class="comment-author" @click.stop @mousedown.stop @mouseup.stop>{{ comment.user.nom }} {{ comment.user.prenom }}</span>
                        <span class="comment-date" @click.stop @mousedown.stop @mouseup.stop>{{ formatCommentDate(comment.createdAt) }}</span>
                      </div>
                      <p class="comment-text" @click.stop @mousedown.stop @mouseup.stop>{{ comment.content }}</p>
                    </div>
                  </div>
                </div>
                
                <!-- Message quand pas de commentaires -->
                <div v-else class="no-comments" @click.stop @mousedown.stop @mouseup.stop>
                  <i class="far fa-comment-dots" @click.stop @mousedown.stop @mouseup.stop></i>
                  <p @click.stop @mousedown.stop @mouseup.stop>Soyez le premier à commenter cette formation !</p>
                </div>
              </div>
            </div>
            
            <!-- Actions -->
            <div class="formation-actions">
              <button 
                @click.stop="inscrireFormation(formation.id)"
                :disabled="!canSubscribe(formation) || subscribing === formation.id"
                class="subscribe-btn"
                :class="{ 'disabled': !canSubscribe(formation) }"
              >
                <i v-if="subscribing === formation.id" class="fas fa-spinner fa-spin"></i>
                <i v-else-if="isAlreadySubscribed(formation.id)" class="fas fa-check"></i>
                <i v-else class="fas fa-user-plus"></i>
                
                <span v-if="subscribing === formation.id">Inscription...</span>
                <span v-else-if="isAlreadySubscribed(formation.id)">Déjà inscrit</span>
                <span v-else-if="formation.inscriptions.length >= formation.maxParticipants">Complet</span>
                <span v-else>S'inscrire</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Modal détails formation -->
    <transition name="modal">
      <div v-if="selectedFormation" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content formation-modal">
          <div class="modal-header">
            <h3>{{ selectedFormation.titre }}</h3>
            <button @click="closeModal" class="close-modal">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="modal-body">
            <div class="formation-modal-image">
              <img :src="getFormationImage(selectedFormation)" :alt="selectedFormation.titre" />
            </div>
            
            <div class="formation-modal-details">
              <p>{{ selectedFormation.description }}</p>
              
              <div class="modal-formation-info">
                <div class="info-grid">
                  <div class="info-item">
                    <i class="fas fa-calendar-alt"></i>
                    <div>
                      <strong>Dates</strong>
                      <span>{{ formatDateRange(selectedFormation.dateDebut, selectedFormation.dateFin) }}</span>
                    </div>
                  </div>
                  
                  <div class="info-item">
                    <i class="fas fa-clock"></i>
                    <div>
                      <strong>Horaires</strong>
                      <span>{{ selectedFormation.heureDebut }} - {{ selectedFormation.heureFin }}</span>
                    </div>
                  </div>
                  
                  <div class="info-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <div>
                      <strong>Lieu</strong>
                      <span>{{ selectedFormation.lieu }}</span>
                    </div>
                  </div>
                  
                  <div class="info-item">
                    <i class="fas fa-euro-sign"></i>
                    <div>
                      <strong>Prix</strong>
                      <span>{{ selectedFormation.prix === 0 ? 'Gratuit' : selectedFormation.prix + '€' }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="modal-actions">
            <button @click="closeModal" class="cancel-btn">Fermer</button>
            <button 
              @click="inscrireFormation(selectedFormation.id)"
              :disabled="!canSubscribe(selectedFormation)"
              class="subscribe-btn"
            >
              S'inscrire
            </button>
          </div>
        </div>
      </div>
    </transition>
    
    <!-- Messages de notification -->
    <transition name="notification">
      <div v-if="successMessage" class="notification success">
        <i class="fas fa-check-circle"></i>
        <span>{{ successMessage }}</span>
        <button @click="successMessage = ''" class="close-notification">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </transition>
    
    <transition name="notification">
      <div v-if="errorMessage" class="notification error">
        <i class="fas fa-exclamation-circle"></i>
        <span>{{ errorMessage }}</span>
        <button @click="errorMessage = ''" class="close-notification">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </transition>
    
    <TheFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import axios from 'axios'

// Configuration globale d'axios
axios.defaults.withCredentials = true

const router = useRouter()
const formations = ref([])
const userInscriptions = ref([])
const userLikes = ref([])
const loading = ref(true)
const subscribing = ref(null)
const successMessage = ref('')
const errorMessage = ref('')
const selectedFormation = ref(null)
const newComments = ref({})
const isAuthenticated = ref(false)
const currentUser = ref(null)
const anonymousNames = ref({})

// Images par défaut pour les formations
const formationImages = [
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
]

// Computed properties
const totalInscriptions = computed(() => {
  return formations.value.reduce((total, formation) => total + formation.inscriptions.length, 0)
})

const totalLikes = computed(() => {
  return formations.value.reduce((total, formation) => total + (formation.likes?.length || 0), 0)
})

const currentUserAvatar = computed(() => {
  return getAvatarUrl(currentUser.value)
})

// Fonctions utilitaires
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

const formatDateRange = (dateDebut, dateFin) => {
  const debut = formatDate(dateDebut)
  const fin = formatDate(dateFin)
  return debut === fin ? debut : `${debut} - ${fin}`
}

const formatCommentDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffMinutes = Math.floor(diffTime / (1000 * 60))
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  // Moins d'une minute
  if (diffMinutes < 1) return 'À l\'instant'
  
  // Moins d'une heure
  if (diffMinutes < 60) return `Il y a ${diffMinutes} min`
  
  // Moins de 24h (aujourd'hui)
  if (diffHours < 24 && date.getDate() === now.getDate()) {
    return `Aujourd'hui à ${date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })}`
  }
  
  // Hier
  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)
  if (date.getDate() === yesterday.getDate() && 
      date.getMonth() === yesterday.getMonth() && 
      date.getFullYear() === yesterday.getFullYear()) {
    return `Hier à ${date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })}`
  }
  
  // Cette semaine
  if (diffDays < 7) {
    const dayNames = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
    return `${dayNames[date.getDay()]} à ${date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })}`
  }
  
  // Plus ancien
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getFormationImage = (formation) => {
  // Utiliser l'image de la formation ou une image par défaut basée sur l'ID
  return formation.image || formationImages[formation.id % formationImages.length]
}

const getAvatarUrl = (user) => {
  if (user?.avatar) {
    return user.avatar
  }
  
  // Avatar par défaut basé sur la première lettre du nom
  if (user?.nom && user?.prenom) {
    const initials = `${user.prenom.charAt(0)}${user.nom.charAt(0)}`.toUpperCase()
    return `https://ui-avatars.com/api/?name=${initials}&background=667eea&color=fff&size=150&font-size=0.6`
  }
  
  // Avatar par défaut
  return 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
}

const onImageError = (event) => {
  event.target.src = formationImages[0] // Image par défaut
}

const getStatusText = (formation) => {
  if (formation.inscriptions.length >= formation.maxParticipants) {
    return 'Complet'
  }
  if (new Date(formation.dateDebut) <= new Date()) {
    return 'En cours'
  }
  return 'Disponible'
}

const getStatusClass = (formation) => {
  if (formation.inscriptions.length >= formation.maxParticipants) {
    return 'full'
  }
  if (new Date(formation.dateDebut) <= new Date()) {
    return 'ongoing'
  }
  return 'available'
}

const canSubscribe = (formation) => {
  if (formation.inscriptions.length >= formation.maxParticipants) return false
  if (new Date(formation.dateDebut) <= new Date()) return false
  if (isAlreadySubscribed(formation.id)) return false
  return true
}

const isAlreadySubscribed = (formationId) => {
  return userInscriptions.value.some(inscription => 
    inscription.formationId === formationId && inscription.statut !== 'annulé'
  )
}

const isLiked = (formationId) => {
  if (isAuthenticated.value) {
    return userLikes.value.includes(formationId)
  } else {
    // Pour les utilisateurs anonymes, vérifier le localStorage
    const likedFormations = JSON.parse(localStorage.getItem('likedFormations') || '[]')
    return likedFormations.includes(formationId)
  }
}

// Fonctions pour les formations
const fetchFormations = async () => {
  try {
    loading.value = true
    const response = await axios.get('http://localhost:3000/formations/active', {
      withCredentials: true
    })
    
    // Utiliser les vraies données avec likes et commentaires du serveur
    formations.value = response.data
    
    console.log('Formations récupérées:', formations.value)
  } catch (error) {
    console.error('Erreur lors de la récupération des formations:', error)
    errorMessage.value = 'Impossible de charger les formations.'
  } finally {
    loading.value = false
  }
}

const fetchUserInscriptions = async () => {
  try {
    const response = await axios.get('http://localhost:3000/formations/user/inscriptions', {
      withCredentials: true
    })
    userInscriptions.value = response.data
    isAuthenticated.value = true
  } catch (error) {
    console.log('Utilisateur non connecté')
    isAuthenticated.value = false
  }
}

const fetchCurrentUser = async () => {
  try {
    const response = await axios.get('http://localhost:3000/auth/me', {
      withCredentials: true
    })
    currentUser.value = response.data
    isAuthenticated.value = true
    console.log('Utilisateur connecté:', currentUser.value)
  } catch (error) {
    console.log('Utilisateur non connecté')
    currentUser.value = null
    isAuthenticated.value = false
  }
}

const fetchUserLikes = async () => {
  if (!isAuthenticated.value) return
  
  try {
    const response = await axios.get('http://localhost:3000/formations/user/likes', {
      withCredentials: true
    })
    userLikes.value = response.data
  } catch (error) {
    console.log('Erreur lors de la récupération des likes utilisateur')
  }
}

// Fonctions pour les likes et commentaires
const toggleLike = async (formationId) => {
  try {
    const response = await axios.post(`http://localhost:3000/formations/${formationId}/like`, {}, {
      withCredentials: true
    })
    
    // Mettre à jour les données localement
    const formation = formations.value.find(f => f.id === formationId)
    if (formation) {
      if (response.data.liked) {
        // Ajouter le like
        formation.likes = formation.likes || []
        formation.likes.push({
          id: Date.now(),
          userId: currentUser.value?.id || 'anonymous',
          formationId: formationId,
          user: currentUser.value || { nom: 'Utilisateur', prenom: 'Anonyme' }
        })
        userLikes.value.push(formationId)
        
        // Stocker dans localStorage pour les utilisateurs anonymes
        if (!isAuthenticated.value) {
          const likedFormations = JSON.parse(localStorage.getItem('likedFormations') || '[]')
          likedFormations.push(formationId)
          localStorage.setItem('likedFormations', JSON.stringify(likedFormations))
        }
      } else {
        // Retirer le like
        formation.likes = formation.likes.filter(like => 
          isAuthenticated.value ? like.userId !== currentUser.value?.id : like.userId === 'anonymous'
        )
        userLikes.value = userLikes.value.filter(id => id !== formationId)
        
        // Retirer du localStorage pour les utilisateurs anonymes
        if (!isAuthenticated.value) {
          const likedFormations = JSON.parse(localStorage.getItem('likedFormations') || '[]')
          const updatedLikes = likedFormations.filter(id => id !== formationId)
          localStorage.setItem('likedFormations', JSON.stringify(updatedLikes))
        }
      }
    }
    
  } catch (error) {
    console.error('Erreur lors du like:', error)
    errorMessage.value = 'Erreur lors du like'
    setTimeout(() => { errorMessage.value = '' }, 3000)
  }
}

const addComment = async (formationId) => {
  const content = newComments.value[formationId]?.trim()
  if (!content) return
  
  try {
    const commentData = {
      content: content
    }
    
    // Ajouter le nom de l'auteur pour les utilisateurs anonymes
    if (!isAuthenticated.value && anonymousNames.value[formationId]) {
      commentData.authorName = anonymousNames.value[formationId]
    }
    
    const response = await axios.post(`http://localhost:3000/formations/${formationId}/comment`, commentData, {
      withCredentials: true
    })
    
    // Ajouter le commentaire à la liste locale
    const formation = formations.value.find(f => f.id === formationId)
    if (formation) {
      if (!formation.comments) formation.comments = []
      formation.comments.unshift(response.data)
    }
    
    newComments.value[formationId] = ''
    if (!isAuthenticated.value) {
      anonymousNames.value[formationId] = ''
    }
    
    successMessage.value = 'Commentaire ajouté avec succès!'
    setTimeout(() => { successMessage.value = '' }, 3000)
    
  } catch (error) {
    console.error('Erreur lors de l\'ajout du commentaire:', error)
    errorMessage.value = error.response?.data?.error || 'Impossible d\'ajouter le commentaire.'
    setTimeout(() => { errorMessage.value = '' }, 3000)
  }
}

const shareFormation = async (formation) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: formation.titre,
        text: formation.description,
        url: window.location.href
      })
    } catch (error) {
      console.log('Partage annulé')
    }
  } else {
    // Fallback: copier le lien
    navigator.clipboard.writeText(window.location.href)
    successMessage.value = 'Lien copié dans le presse-papier!'
    setTimeout(() => { successMessage.value = '' }, 3000)
  }
}

const openFormationDetails = (formation) => {
  selectedFormation.value = formation
}

const closeModal = () => {
  selectedFormation.value = null
}

// S'inscrire à une formation
const inscrireFormation = async (formationId) => {
  subscribing.value = formationId
  
  try {
    const response = await axios.post(
      `http://localhost:3000/formations/${formationId}/inscription`,
      { notes: '' },
      { withCredentials: true }
    )
    
    successMessage.value = 'Inscription réussie ! Vous recevrez une confirmation par email.'
    
    await fetchFormations()
    await fetchUserInscriptions()
    
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
    
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error)
    if (error.response?.status === 401) {
      errorMessage.value = 'Vous devez être connecté pour vous inscrire à une formation.'
      router.push('/login')
    } else {
      errorMessage.value = error.response?.data?.error || 'Impossible de procéder à l\'inscription.'
    }
    
    setTimeout(() => {
      errorMessage.value = ''
    }, 3000)
  } finally {
    subscribing.value = null
  }
}

// Initialisation
onMounted(async () => {
  await fetchFormations()
  await fetchUserInscriptions()
  await fetchCurrentUser()
  await fetchUserLikes()
  
  // Charger les likes des utilisateurs anonymes depuis localStorage
  if (!isAuthenticated.value) {
    const likedFormations = JSON.parse(localStorage.getItem('likedFormations') || '[]')
    userLikes.value = likedFormations
  }
})
</script>

<style scoped>
.formations-page {
  min-height: 100vh;
  margin-top: 125px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

/* Section héro moderne */
.formations-hero {
  position: relative;
  height: 300px;
  overflow: hidden;
  margin-bottom: 3rem;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.floating-shapes {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 80px;
  height: 80px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 120px;
  height: 120px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.shape-3 {
  width: 60px;
  height: 60px;
  top: 40%;
  left: 70%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: white;
  text-align: center;
  padding: 2rem;
}

.hero-content h1 {
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 1rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  animation: slideInDown 1s ease-out;
}

.hero-content p {
  font-size: 1.3rem;
  margin: 0 0 2rem;
  opacity: 0.95;
  animation: slideInUp 1s ease-out 0.3s both;
}

.hero-stats {
  display: flex;
  gap: 3rem;
  animation: fadeInUp 1s ease-out 0.6s both;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #fbbf24;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Section principale */
.formations-main {
  padding: 0 0 4rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Loading state */
.loading-state {
  text-align: center;
  padding: 4rem 2rem;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e5e7eb;
  border-left: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* État vide */
.no-formations {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.empty-illustration {
  position: relative;
  margin-bottom: 2rem;
}

.empty-icon {
  font-size: 5rem;
  opacity: 0.3;
  animation: bounce 2s infinite;
}

.empty-circles {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.circle {
  position: absolute;
  border-radius: 50%;
  border: 2px solid #667eea;
  opacity: 0.3;
}

.circle-1 {
  width: 100px;
  height: 100px;
  animation: pulse 2s infinite;
}

.circle-2 {
  width: 150px;
  height: 150px;
  animation: pulse 2s infinite 0.5s;
}

.circle-3 {
  width: 200px;
  height: 200px;
  animation: pulse 2s infinite 1s;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-30px); }
  60% { transform: translateY(-15px); }
}

@keyframes pulse {
  0% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.7; }
  50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.3; }
  100% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.7; }
}

.no-formations h3 {
  margin: 0 0 0.5rem;
  color: #1f2937;
  font-size: 1.8rem;
}

.no-formations p {
  margin: 0;
  color: #6b7280;
  font-size: 1.1rem;
}

/* Grille des formations */
.formations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
  gap: 2.5rem;
}

.formation-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  animation: slideInUp 0.6s ease-out;
}

.formation-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.formation-card:hover .image-overlay {
  opacity: 1;
}

.formation-image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.formation-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.formation-card:hover .formation-image {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.overlay-content {
  color: white;
  text-align: center;
  font-weight: 600;
}

.play-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  display: block;
}

.formation-category {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(0, 0, 0, 0.7);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: white;
  font-size: 0.85rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
}

.formation-content {
  padding: 2rem;
}

.formation-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.formation-header h3 {
  margin: 0;
  color: #1f2937;
  font-size: 1.4rem;
  font-weight: 600;
  flex: 1;
  line-height: 1.3;
}

.formation-price {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-left: 1rem;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.formation-price.free {
  background: linear-gradient(135deg, #10b981, #059669);
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

.formation-description {
  color: #6b7280;
  margin: 0 0 1.5rem;
  line-height: 1.7;
  font-size: 1rem;
}

.formation-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #4b5563;
  font-size: 0.95rem;
  padding: 0.5rem;
  background: #f8fafc;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.detail-item:hover {
  background: #e2e8f0;
  transform: translateX(4px);
}

.detail-item i {
  width: 18px;
  color: #667eea;
  font-size: 1.1rem;
}

.participants-progress {
  position: relative;
  width: 100%;
  height: 12px;
  background: #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 6px;
}

.progress-text {
  position: absolute;
  top: -25px;
  right: 0;
  color: #6b7280;
  font-size: 0.85rem;
  font-weight: 500;
}

.formation-status {
  margin-bottom: 1.5rem;
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-badge.available {
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  color: #065f46;
}

.status-badge.full {
  background: linear-gradient(135deg, #fee2e2, #fecaca);
  color: #991b1b;
}

.status-badge.ongoing {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  color: #92400e;
}

/* Section engagement */
.engagement-section {
  border-top: 1px solid #e5e7eb;
  padding-top: 1.5rem;
  margin-bottom: 1.5rem;
}

.engagement-stats {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.like-btn, .comment-btn, .share-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #6b7280;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.like-btn:hover, .share-btn:hover {
  background: #f3f4f6;
  color: #374151;
  transform: translateY(-2px);
}

.like-btn.liked {
  color: #ef4444;
  background: #fef2f2;
}

.like-btn.liked:hover {
  background: #fee2e2;
}

.comment-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.9rem;
  padding: 0.75rem 1rem;
  font-weight: 500;
}

.comment-info i {
  color: #667eea;
}

/* Section commentaires */
.comments-wrapper {
  margin-top: 1.5rem;
  padding: 0 2rem 2rem;
  pointer-events: auto;
  position: relative;
  z-index: 10;
}

.comments-section {
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  pointer-events: auto;
}

.comments-header {
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e2e8f0;
}

.comments-header h4 {
  margin: 0;
  color: #1f2937;
  font-size: 1.1rem;
  font-weight: 600;
}

.add-comment {
  margin-bottom: 1.5rem;
}

.comment-form {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.comment-input-container {
  flex: 1;
}

.input-with-button {
  display: flex;
  gap: 0.75rem;
  align-items: flex-end;
}

.comment-input {
  flex: 1;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 0.95rem;
  resize: vertical;
  transition: all 0.3s ease;
  font-family: inherit;
  min-height: 80px;
}

.comment-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.send-comment-btn {
  background: #667eea;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  height: fit-content;
  font-size: 0.9rem;
}

.send-comment-btn:hover:not(:disabled) {
  background: #5a67d8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.send-comment-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.comments-list {
  margin-top: 1.5rem;
}

.comment-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1.25rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #f1f5f9;
}

.comment-item:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
  border-color: #e2e8f0;
}

.comment-item:last-child {
  margin-bottom: 0;
}

.comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.comment-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.comment-author {
  color: #1f2937;
  font-weight: 600;
  font-size: 0.95rem;
}

.comment-date {
  color: #9ca3af;
  font-size: 0.8rem;
}

.comment-text {
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
  font-size: 0.95rem;
}

.no-comments {
  text-align: center;
  padding: 2rem;
  color: #9ca3af;
  background: white;
  border-radius: 12px;
  border: 2px dashed #e5e7eb;
}

.no-comments i {
  font-size: 2rem;
  margin-bottom: 0.75rem;
  display: block;
  color: #d1d5db;
}

.no-comments p {
  margin: 0;
  font-style: italic;
  font-size: 0.95rem;
}

/* Actions des formations */
.formation-actions {
  padding: 0 2rem 2rem;
}

.subscribe-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.subscribe-btn:hover:not(.disabled) {
  background: linear-gradient(135deg, #5a67d8, #6b46c1);
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
}

.subscribe-btn.disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: white;
  border-radius: 20px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  animation: modalSlideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(50px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  margin: 0;
  color: #1f2937;
  font-size: 1.8rem;
  font-weight: 700;
}

.close-modal {
  background: #f3f4f6;
  border: none;
  color: #6b7280;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-modal:hover {
  background: #e5e7eb;
  color: #374151;
  transform: rotate(90deg);
}

.modal-body {
  padding: 2rem;
}

.formation-modal-image {
  width: 100%;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.formation-modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.formation-modal-details p {
  color: #4b5563;
  line-height: 1.7;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.info-item:hover {
  background: #e2e8f0;
  transform: translateY(-2px);
}

.info-item i {
  color: #667eea;
  font-size: 1.25rem;
  width: 20px;
}

.info-item div {
  flex: 1;
}

.info-item strong {
  display: block;
  color: #1f2937;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.info-item span {
  color: #6b7280;
  font-size: 0.95rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding: 1rem 2rem 2rem;
  border-top: 1px solid #e5e7eb;
}

.cancel-btn {
  padding: 0.75rem 2rem;
  background: #f3f4f6;
  color: #374151;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  background: #e5e7eb;
  transform: translateY(-1px);
}

/* Notifications */
.notification {
  position: fixed;
  top: 150px;
  right: 20px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 1.5rem 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  z-index: 1001;
  max-width: 400px;
  display: flex;
  align-items: center;
  gap: 1rem;
  backdrop-filter: blur(10px);
}

.notification.success {
  border-left: 4px solid #10b981;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.05), white);
}

.notification.error {
  border-left: 4px solid #ef4444;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.05), white);
}

.notification.success i {
  color: #10b981;
  font-size: 1.25rem;
}

.notification.error i {
  color: #ef4444;
  font-size: 1.25rem;
}

.notification span {
  flex: 1;
  color: #374151;
  font-weight: 500;
  line-height: 1.5;
}

.close-notification {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.close-notification:hover {
  background: #f3f4f6;
  color: #6b7280;
}

/* Animations */
@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.notification-enter-active, .notification-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100px) scale(0.8);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100px) scale(0.8);
}

.comments-enter-active, .comments-leave-active {
  transition: all 0.3s ease;
}

.comments-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.comments-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.modal-enter-active, .modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.8) translateY(50px);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.5rem;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .formations-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .formation-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .formation-price {
    margin-left: 0;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  .engagement-stats {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .like-btn, .share-btn {
    width: 100%;
    justify-content: center;
  }
  
  .comment-info {
    width: 100%;
    justify-content: center;
  }
  
  .input-with-button {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .send-comment-btn {
    width: 100%;
    justify-content: center;
  }
  
  .modal-content {
    margin: 1rem;
    max-height: calc(100vh - 2rem);
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .modal-actions {
    flex-direction: column;
  }
  
  .cancel-btn, .subscribe-btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .formations-hero {
    height: 250px;
  }
  
  .hero-content {
    padding: 1rem;
  }
  
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .formation-content {
    padding: 1.5rem;
  }
  
  .formation-actions {
    padding: 0 1.5rem 1.5rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
  
  .comment-form {
    flex-direction: column;
    gap: 1rem;
  }
  
  .comments-section {
    padding: 1rem;
  }
  
  .comment-item {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .comment-avatar {
    align-self: flex-start;
  }
  
  .comment-input {
    min-height: 60px;
  }
}

/* Section commentaires */
.anonymous-name-input {
  margin-bottom: 0.75rem;
}

.name-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  font-family: inherit;
  background: white;
}

.name-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.name-input::placeholder {
  color: #9ca3af;
  font-style: italic;
}
</style> 