<template>
  <div class="rendez-vous-page">
    <TheHeader />
    
    <section class="rendezvous-section">
      <div class="container">
        <div class="form-container">
          <h1>Demander un Rendez-vous</h1>
          <p class="subtitle">Complétez le formulaire ci-dessous pour planifier un rendez-vous avec nos conseillers</p>
          
          <form @submit.prevent="submitRendezVous" class="rendezvous-form">
            <div class="form-group">
              <label for="service">Service souhaité</label>
              <select id="service" v-model="formData.serviceId" required>
                <option value="" disabled selected>Sélectionnez un service</option>
                <option v-for="service in services" :key="service.id" :value="service.id">
                  {{ service.nom }}
                </option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="date">Date du rendez-vous</label>
              <input 
                type="date" 
                id="date" 
                v-model="formData.date" 
                :min="minDate"
                required
              >
              <div class="form-hint">Les rendez-vous doivent être pris au moins 24h à l'avance</div>
            </div>
            
            <div class="form-group">
              <label for="heure">Heure du rendez-vous</label>
              <select id="heure" v-model="formData.heure" required>
                <option value="" disabled selected>Sélectionnez une heure</option>
                <option v-for="(available, index) in availableHours" :key="index" :value="available">
                  {{ available }}
                </option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="notes">Notes ou questions</label>
              <textarea 
                id="notes" 
                v-model="formData.notes" 
                rows="4"
                placeholder="Précisez votre demande ou ajoutez des détails supplémentaires"
              ></textarea>
            </div>
            
            <div class="form-actions">
              <button type="submit" class="btn-primary" :disabled="isSubmitting">
                {{ isSubmitting ? 'Traitement en cours...' : 'Confirmer le rendez-vous' }}
              </button>
            </div>
          </form>
          
          <div v-if="successMessage" class="success-message">
            <div class="success-icon">✓</div>
            <h3>Rendez-vous confirmé !</h3>
            <p>{{ successMessage }}</p>
            <div class="confirmation-details">
              <p><strong>Service :</strong> {{ getServiceName(formData.serviceId) }}</p>
              <p><strong>Date :</strong> {{ formatDate(formData.date) }}</p>
              <p><strong>Heure :</strong> {{ formData.heure }}</p>
            </div>
            <p class="confirmation-info">Un email de confirmation contenant toutes les informations a été envoyé à votre adresse email.</p>
            <button @click="resetForm" class="btn-secondary">Nouveau rendez-vous</button>
          </div>
          
          <div v-if="errorMessage" class="error-message">
            <div class="error-icon">!</div>
            <h3>Impossible de confirmer le rendez-vous</h3>
            <p>{{ errorMessage }}</p>
            <div class="error-help">
              <h4>Raisons possibles :</h4>
              <ul>
                <li v-if="errorMessage.includes('24 heures')">Le délai minimum de 24h n'est pas respecté. Veuillez choisir une date ultérieure.</li>
                <li v-if="errorMessage.includes('existe déjà')">Un autre rendez-vous est déjà programmé à cette date et heure. Veuillez sélectionner un autre créneau.</li>
                <li v-else>Une erreur technique est survenue. Notre équipe a été notifiée.</li>
              </ul>
              <p>Si le problème persiste, n'hésitez pas à nous contacter directement par téléphone au <a href="tel:+212536603857">+212 536 603 857</a>.</p>
            </div>
            <button @click="errorMessage = ''" class="btn-retry">Réessayer</button>
          </div>
        </div>
      </div>
    </section>
    
    <TheFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import axios from 'axios'

// Configuration globale d'axios pour envoyer les cookies avec toutes les requêtes
axios.defaults.withCredentials = true;

const router = useRouter()
const services = ref([])
const availableHours = ref(['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'])
const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const formData = ref({
  serviceId: '',
  date: '',
  heure: '',
  notes: ''
})

// Calculer la date minimum (demain)
const minDate = computed(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
})

// Récupérer la liste des services
const fetchServices = async () => {
  try {
    const response = await axios.get('http://localhost:3000/services')
    services.value = response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des services:', error)
    errorMessage.value = 'Impossible de charger les services. Veuillez réessayer plus tard.'
  }
}

// Soumettre le formulaire de rendez-vous
const submitRendezVous = async () => {
  isSubmitting.value = true
  errorMessage.value = ''
  
  try {
    // Formater la date pour l'API
    const apiData = {
      ...formData.value,
      serviceId: parseInt(formData.value.serviceId),
      date: new Date(formData.value.date).toISOString()
    }
    
    console.log('Envoi de demande de rendez-vous pour l\'utilisateur connecté')
    
    // Envoyer la demande de rendez-vous avec les cookies
    const response = await axios.post('http://localhost:3000/rendez-vous', apiData, {
      withCredentials: true // Important pour envoyer les cookies
    })
    
    // Afficher le message de succès
    successMessage.value = `Votre rendez-vous a été confirmé pour le ${formatDate(formData.value.date)} à ${formData.value.heure}.`
    
    isSubmitting.value = false
  } catch (error) {
    isSubmitting.value = false
    
    if (error.response) {
      // Gérer spécifiquement l'erreur d'utilisateur non connecté
      if (error.response.status === 401) {
        errorMessage.value = 'Vous devez être connecté pour prendre un rendez-vous.'
      } else {
        // Afficher le message d'erreur renvoyé par l'API
        errorMessage.value = error.response.data.error || 'Une erreur est survenue. Veuillez réessayer.'
      }
      console.error('Erreur API:', error.response.data)
    } else {
      errorMessage.value = error.message || 'Impossible de se connecter au serveur. Veuillez vérifier votre connexion et réessayer.'
    }
    
    console.error('Erreur lors de la soumission du rendez-vous:', error)
  }
}

// Formater la date pour l'affichage
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('fr-FR', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  }).format(date)
}

// Obtenir le nom du service à partir de son ID
const getServiceName = (serviceId) => {
  if (!serviceId) return ''
  const service = services.value.find(s => s.id === parseInt(serviceId))
  return service ? service.nom : ''
}

// Réinitialiser le formulaire après succès
const resetForm = () => {
  formData.value = {
    serviceId: '',
    date: '',
    heure: '',
    notes: ''
  }
  successMessage.value = ''
}

onMounted(() => {
  fetchServices()
})
</script>

<style scoped>
.rendez-vous-page {
  min-height: 100vh;
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  background-color: #f5f7fa;
}

.rendezvous-section {
  flex: 1;
  padding: 4rem 0;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.form-container {
  max-width: 700px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
}

.form-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  background: linear-gradient(90deg, #4CAF50, #2196F3);
}

h1 {
  font-size: 2.5rem;
  color: #2196F3;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 700;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
}

.rendezvous-form {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 600;
  color: #333;
  font-size: 1.05rem;
}

input, select, textarea {
  padding: 0.9rem 1.2rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s;
  background-color: #f9f9f9;
}

input:focus, select:focus, textarea:focus {
  border-color: #2196F3;
  outline: none;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.15);
  background-color: white;
}

input:hover, select:hover, textarea:hover {
  border-color: #bbdefb;
}

.form-hint {
  font-size: 0.8rem;
  color: #757575;
  margin-top: 0.3rem;
  font-style: italic;
}

.form-actions {
  margin-top: 1.5rem;
}

.btn-primary {
  width: 100%;
  padding: 1.1rem;
  background: linear-gradient(45deg, #4CAF50, #2196F3);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.5px;
}

.btn-primary::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #2196F3, #4CAF50);
  opacity: 0;
  transition: opacity 0.3s;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 7px 20px rgba(33, 150, 243, 0.3);
}

.btn-primary:hover::after {
  opacity: 1;
}

.btn-primary span {
  position: relative;
  z-index: 1;
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.success-message {
  text-align: center;
  padding: 2.5rem 2rem;
  animation: fadeIn 0.6s ease;
  background-color: #f1f8e9;
  border-radius: 10px;
  border: 1px solid #c5e1a5;
}

.success-icon {
  width: 70px;
  height: 70px;
  background: #4CAF50;
  color: white;
  font-size: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
}

.success-message h3 {
  font-size: 1.8rem;
  color: #2e7d32;
  margin-bottom: 1rem;
}

.confirmation-details {
  margin: 1.5rem 0;
  padding: 1.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  text-align: left;
}

.confirmation-details p {
  margin-bottom: 0.8rem;
  color: #333;
}

.confirmation-info {
  font-size: 0.9rem;
  color: #757575;
  margin-bottom: 1.5rem;
}

.btn-secondary {
  padding: 0.9rem 2rem;
  background: #e0e0e0;
  color: #333;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 1rem;
}

.btn-secondary:hover {
  background: #d5d5d5;
  transform: translateY(-2px);
}

.error-message {
  margin-top: 1.5rem;
  padding: 2rem;
  background: #fef5f5;
  color: #d32f2f;
  border-radius: 10px;
  border: 1px solid #ffcdd2;
  text-align: center;
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

.error-icon {
  width: 60px;
  height: 60px;
  background: #f44336;
  color: white;
  font-size: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  box-shadow: 0 5px 15px rgba(244, 67, 54, 0.3);
}

.error-message h3 {
  font-size: 1.5rem;
  color: #c62828;
  margin-bottom: 1rem;
}

.error-help {
  margin-top: 1.5rem;
  padding: 1.5rem;
  background-color: white;
  border-radius: 8px;
  text-align: left;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

.error-help h4 {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 1rem;
}

.error-help ul {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.error-help li {
  margin-bottom: 0.8rem;
  color: #555;
}

.error-help a {
  color: #2196F3;
  text-decoration: none;
  font-weight: 600;
}

.error-help a:hover {
  text-decoration: underline;
}

.btn-retry {
  padding: 0.9rem 2rem;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 1.5rem;
}

.btn-retry:hover {
  background: #e53935;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(244, 67, 54, 0.2);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}

@media (max-width: 768px) {
  .form-container {
    padding: 2rem;
    border-radius: 8px;
  }
  
  h1 {
    font-size: 2rem;
  }

  .success-icon, .error-icon {
    width: 50px;
    height: 50px;
    font-size: 1.8rem;
  }

  .success-message h3, .error-message h3 {
    font-size: 1.5rem;
  }

  .confirmation-details, .error-help {
    padding: 1.2rem;
  }
}
</style> 