<template>
  <div class="avis-form-container">
    <div class="avis-form-card">
      <div class="form-header">
        <h3>Donner votre avis</h3>
        <p>Partagez votre expérience avec nos services</p>
      </div>

      <form @submit.prevent="submitAvis" class="avis-form">
        <!-- Sélection du service -->
        <div class="form-group">
          <label for="typeService">Type de service *</label>
          <select 
            id="typeService" 
            v-model="avisData.typeService" 
            required
            class="form-control"
          >
            <option value="">Sélectionnez un service</option>
            <option value="formation">Formation</option>
            <option value="document">Certificats et Documents</option>
            <option value="rendez-vous">Rendez-vous</option>
            <option value="general">Service général</option>
          </select>
        </div>

        <!-- Sujet de l'avis -->
        <div class="form-group">
          <label for="sujet">Sujet *</label>
          <input 
            type="text" 
            id="sujet" 
            v-model="avisData.sujet" 
            required
            class="form-control"
            placeholder="Résumé de votre avis"
            maxlength="100"
          />
        </div>

        <!-- Note avec étoiles -->
        <div class="form-group">
          <label>Note *</label>
          <div class="star-rating">
            <button 
              v-for="star in 5" 
              :key="star"
              type="button"
              class="star"
              :class="{ 'active': star <= avisData.note }"
              @click="setRating(star)"
            >
              ★
            </button>
          </div>
          <span class="rating-text">{{ getRatingText() }}</span>
        </div>

        <!-- Commentaire -->
        <div class="form-group">
          <label for="commentaire">Votre commentaire *</label>
          <textarea 
            id="commentaire" 
            v-model="avisData.commentaire" 
            required
            class="form-control"
            rows="4"
            placeholder="Décrivez votre expérience en détail..."
            maxlength="500"
          ></textarea>
          <small class="char-count">{{ avisData.commentaire.length }}/500 caractères</small>
        </div>

        <!-- Boutons -->
        <div class="form-actions">
          <button 
            type="button" 
            @click="resetForm" 
            class="btn-secondary"
            :disabled="isSubmitting"
          >
            Annuler
          </button>
          <button 
            type="submit" 
            class="btn-primary"
            :disabled="isSubmitting || !isFormValid"
          >
            <span v-if="isSubmitting">Envoi en cours...</span>
            <span v-else>Publier l'avis</span>
          </button>
        </div>
      </form>

      <!-- Message de succès/erreur -->
      <div v-if="message" class="message" :class="messageType">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getLocalStorageItem } from '@/utils/localStorage.js'

// Variables réactives
const avisData = ref({
  sujet: '',
  commentaire: '',
  note: 0,
  typeService: '',
  serviceId: null
})

const isSubmitting = ref(false)
const message = ref('')
const messageType = ref('')

// Utilisateur connecté
const user = computed(() => getLocalStorageItem('user'))

// Validation du formulaire
const isFormValid = computed(() => {
  return avisData.value.sujet.trim() && 
         avisData.value.commentaire.trim() && 
         avisData.value.note > 0 && 
         avisData.value.typeService
})

/**
 * Définir la note avec les étoiles
 */
const setRating = (rating) => {
  avisData.value.note = rating
}

/**
 * Obtenir le texte correspondant à la note
 */
const getRatingText = () => {
  const texts = {
    0: 'Aucune note',
    1: 'Très insatisfait',
    2: 'Insatisfait',
    3: 'Correct',
    4: 'Satisfait',
    5: 'Très satisfait'
  }
  return texts[avisData.value.note] || 'Aucune note'
}

/**
 * Soumettre l'avis
 */
const submitAvis = async () => {
  if (!user.value) {
    showMessage('Vous devez être connecté pour donner un avis', 'error')
    return
  }

  isSubmitting.value = true
  
  try {
    const response = await fetch('http://localhost:3000/avis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getLocalStorageItem('token')}`
      },
      body: JSON.stringify({
        ...avisData.value,
        userId: user.value.id
      })
    })

    if (response.ok) {
      showMessage('Votre avis a été publié avec succès !', 'success')
      resetForm()
    } else {
      const error = await response.json()
      showMessage(error.message || 'Erreur lors de la publication de l\'avis', 'error')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showMessage('Erreur de connexion. Veuillez réessayer.', 'error')
  } finally {
    isSubmitting.value = false
  }
}

/**
 * Réinitialiser le formulaire
 */
const resetForm = () => {
  avisData.value = {
    sujet: '',
    commentaire: '',
    note: 0,
    typeService: '',
    serviceId: null
  }
  message.value = ''
}

/**
 * Afficher un message
 */
const showMessage = (text, type) => {
  message.value = text
  messageType.value = type
  setTimeout(() => {
    message.value = ''
    messageType.value = ''
  }, 5000)
}
</script>

<style scoped>
.avis-form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.avis-form-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  border: 1px solid #e1e5e9;
}

.form-header {
  text-align: center;
  margin-bottom: 30px;
}

.form-header h3 {
  color: #2c3e50;
  font-size: 1.8em;
  margin-bottom: 8px;
  font-weight: 600;
}

.form-header p {
  color: #6c757d;
  font-size: 1em;
  margin: 0;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
  font-weight: 500;
  font-size: 0.95em;
}

.form-control {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1em;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-control:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.star-rating {
  display: flex;
  gap: 5px;
  margin-bottom: 8px;
}

.star {
  background: none;
  border: none;
  font-size: 2em;
  color: #ddd;
  cursor: pointer;
  transition: color 0.2s ease;
  padding: 0;
}

.star:hover,
.star.active {
  color: #ffd700;
}

.rating-text {
  color: #6c757d;
  font-size: 0.9em;
  margin-left: 10px;
}

.char-count {
  color: #6c757d;
  font-size: 0.85em;
  float: right;
  margin-top: 5px;
}

.form-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 30px;
}

.btn-primary,
.btn-secondary {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1em;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
}

.btn-primary {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #2980b9, #1f618d);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
}

.btn-secondary {
  background: #f8f9fa;
  color: #6c757d;
  border: 2px solid #e1e5e9;
}

.btn-secondary:hover:not(:disabled) {
  background: #e9ecef;
  border-color: #ced4da;
}

.btn-primary:disabled,
.btn-secondary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.message {
  margin-top: 20px;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
}

.message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

/* Responsive */
@media (max-width: 768px) {
  .avis-form-container {
    padding: 15px;
  }
  
  .avis-form-card {
    padding: 20px;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .btn-primary,
  .btn-secondary {
    width: 100%;
  }
}
</style> 