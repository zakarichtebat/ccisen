<template>
  <div class="rendez-vous-page">
    <TheHeader />
    
    <section class="rendezvous-section">
      <div class="container">
        <div class="form-container">
          <div class="form-header-gradient"></div>
          
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
            
            <!-- Date picker amélioré -->
            <div class="form-group date-picker-group">
              <label for="date">Date du rendez-vous</label>
              <div class="date-picker-simple">
                <input 
                  type="text" 
                  id="date" 
                  readonly 
                  :value="formattedSelectedDate"
                  placeholder="JJ/MM/AAAA"
                  required
                  @click="toggleCalendar"
                  class="date-input"
                >
                <button type="button" class="calendar-icon-btn" @click="toggleCalendar">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M19,3H18V1H16V3H8V1H6V3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19M7,10H12V15H7V10Z"/>
                  </svg>
                </button>
              </div>
              
              <div class="form-hint">Les rendez-vous doivent être pris au moins 24h à l'avance</div>
            </div>
            
            <!-- Calendrier intégré -->
            <div v-if="showCalendar" class="calendar-inline">
              <div class="calendar-header">
                <button type="button" @click="previousMonth" class="month-nav">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"/>
                  </svg>
                </button>
                <div class="current-month">{{ currentMonthName }} {{ currentYear }}</div>
                <button type="button" @click="nextMonth" class="month-nav">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
                  </svg>
                </button>
              </div>
              
              <div class="calendar-weekdays">
                <div class="weekday" v-for="day in weekdays" :key="day">{{ day }}</div>
              </div>
              
              <div class="calendar-days">
                <div
                  v-for="(day, index) in calendarDays"
                  :key="index"
                  class="day-cell"
                  :class="{
                    'other-month': !day.currentMonth,
                    'today': day.isToday,
                    'selected': isSelectedDate(day.date),
                    'available': isAvailableDate(day.date),
                    'unavailable': !isAvailableDate(day.date)
                  }"
                  @click="selectDate(day)"
                >
                  {{ day.day }}
                </div>
              </div>
            </div>
            
            <div class="form-group" v-if="formData.date">
              <label for="heure">Heure du rendez-vous</label>
              <div class="time-slots-container">
                <button 
                  type="button"
                  v-for="time in availableTimeSlots" 
                  :key="time"
                  :class="['time-slot', formData.heure === time ? 'selected' : '']"
                  @click="selectTimeSlot(time)"
                >
                  {{ time }}
                </button>
                <div v-if="availableTimeSlots.length === 0" class="no-slots-message">
                  Aucun créneau disponible pour cette date. Veuillez sélectionner une autre date.
                </div>
              </div>
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
              <button type="submit" class="btn-primary" :disabled="isSubmitting || !formData.date || !formData.heure">
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
import { ref, computed, onMounted, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import axios from 'axios'

// Configuration globale d'axios pour envoyer les cookies avec toutes les requêtes
axios.defaults.withCredentials = true;

const router = useRouter()
const services = ref([])
const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Variables pour le calendrier
const showCalendar = ref(false)
const currentDate = ref(new Date())
const currentMonth = ref(new Date().getMonth())
const currentYear = ref(new Date().getFullYear())
const weekdays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
const plagesHoraires = ref([])
const existingRendezVous = ref([])

const formData = ref({
  serviceId: '',
  date: '',
  heure: '',
  notes: ''
})

// Calculer les jours du calendrier
const calendarDays = computed(() => {
  const days = []
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)
  
  // Ajouter les jours du mois précédent pour compléter la première semaine
  const firstDayOfWeek = firstDay.getDay()
  if (firstDayOfWeek > 0) {
    const prevMonth = new Date(currentYear.value, currentMonth.value, 0)
    const prevMonthDays = prevMonth.getDate()
    
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(currentYear.value, currentMonth.value - 1, prevMonthDays - i)
      days.push({
        day: prevMonthDays - i,
        date: date,
        currentMonth: false,
        isToday: isSameDay(date, new Date())
      })
    }
  }
  
  // Ajouter les jours du mois actuel
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(currentYear.value, currentMonth.value, i)
    days.push({
      day: i,
      date: date,
      currentMonth: true,
      isToday: isSameDay(date, new Date())
    })
  }
  
  // Ajouter les jours du mois suivant pour compléter la dernière semaine
  const remainingDays = 7 - (days.length % 7)
  if (remainingDays < 7) {
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(currentYear.value, currentMonth.value + 1, i)
      days.push({
        day: i,
        date: date,
        currentMonth: false,
        isToday: isSameDay(date, new Date())
      })
    }
  }
  
  return days
})

// Disponibilité des créneaux horaires pour la date sélectionnée
const availableTimeSlots = computed(() => {
  if (!formData.value.date) return []
  
  const selectedDate = new Date(formData.value.date)
  const dayOfWeek = selectedDate.getDay()
  const dayNames = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
  const selectedDayName = dayNames[dayOfWeek]
  
  // Trouver la plage horaire correspondant au jour sélectionné
  const plageHoraire = plagesHoraires.value.find(p => p.jour.toLowerCase() === selectedDayName)
  if (!plageHoraire) return []
  
  // Générer tous les créneaux horaires possibles basés sur la plage horaire
  const startHour = parseInt(plageHoraire.heureDebut.split(':')[0])
  const endHour = parseInt(plageHoraire.heureFin.split(':')[0])
  
  const slots = []
  for (let hour = startHour; hour <= endHour; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`)
    // Ajouter également les créneaux de 30 minutes si ce n'est pas la dernière heure
    if (hour < endHour) {
      slots.push(`${hour.toString().padStart(2, '0')}:30`)
    }
  }
  
  // Filtrer les créneaux déjà réservés
  const selectedDateStr = selectedDate.toISOString().split('T')[0]
  const bookedSlots = existingRendezVous.value
    .filter(rv => {
      const rvDate = new Date(rv.date)
      return isSameDay(rvDate, selectedDate)
    })
    .map(rv => rv.heure)
  
  return slots.filter(slot => !bookedSlots.includes(slot))
})

// Sélection du mois précédent
const previousMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

// Sélection du mois suivant
const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

// Formater le nom du mois actuel
const currentMonthName = computed(() => {
  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
                  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
  return months[currentMonth.value]
})

// Date formatée pour l'affichage
const formattedSelectedDate = computed(() => {
  if (!formData.value.date) return ''
  return formatDate(formData.value.date)
})

// Vérifier si deux dates sont le même jour
const isSameDay = (date1, date2) => {
  return date1.getDate() === date2.getDate() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getFullYear() === date2.getFullYear()
}

// Vérifier si une date est sélectionnée
const isSelectedDate = (date) => {
  if (!formData.value.date) return false
  const selectedDate = new Date(formData.value.date)
  return isSameDay(date, selectedDate)
}

// Vérifier si une date est disponible pour un rendez-vous
const isAvailableDate = (date) => {
  // Date minimum: demain
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  if (date < tomorrow) return false
  
  // Vérifier si le jour correspond à une plage horaire
  const dayOfWeek = date.getDay()
  const dayNames = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
  const dayName = dayNames[dayOfWeek]
  
  const hasPlageHoraire = plagesHoraires.value.some(p => p.jour.toLowerCase() === dayName)
  return hasPlageHoraire
}

// Obtenir le nombre de créneaux disponibles pour une date
const getAvailableSlotCount = (date) => {
  if (!isAvailableDate(date)) return 0
  
  const dayOfWeek = date.getDay()
  const dayNames = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
  const selectedDayName = dayNames[dayOfWeek]
  
  // Trouver la plage horaire correspondant au jour sélectionné
  const plageHoraire = plagesHoraires.value.find(p => p.jour.toLowerCase() === selectedDayName)
  if (!plageHoraire) return 0
  
  // Calculer le nombre total de créneaux
  const startHour = parseInt(plageHoraire.heureDebut.split(':')[0])
  const endHour = parseInt(plageHoraire.heureFin.split(':')[0])
  const totalSlots = (endHour - startHour + 1) * 2 - 1 // 2 créneaux par heure, sauf pour la dernière heure
  
  // Calculer le nombre de créneaux déjà réservés
  const bookedSlots = existingRendezVous.value
    .filter(rv => isSameDay(new Date(rv.date), date))
    .length
  
  return totalSlots - bookedSlots
}

// Sélection d'une date
const selectDate = (day) => {
  if (!day.currentMonth || !isAvailableDate(day.date)) return
  
  // Utiliser directement la date de l'objet jour sans modification
  const selectedDate = new Date(day.date)
  formData.value.date = selectedDate.toISOString().split('T')[0]
  formData.value.heure = '' // Réinitialiser l'heure lorsqu'une nouvelle date est sélectionnée
  
  // Enregistrer également le jour pour vérification
  console.log(`Date sélectionnée: jour ${day.day}, date ${formData.value.date}`)
}

// Sélection d'un créneau horaire
const selectTimeSlot = (time) => {
  formData.value.heure = time
}

// Afficher/masquer le calendrier
const toggleCalendar = () => {
  showCalendar.value = !showCalendar.value
}

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

// Récupérer les plages horaires
const fetchPlagesHoraires = async () => {
  try {
    const response = await axios.get('http://localhost:3000/plages-horaires')
    plagesHoraires.value = response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des plages horaires:', error)
  }
}

// Récupérer les rendez-vous existants
const fetchExistingRendezVous = async () => {
  try {
    const response = await axios.get('http://localhost:3000/rendez-vous')
    existingRendezVous.value = response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des rendez-vous existants:', error)
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

// Fermer le calendrier lorsqu'on clique ailleurs sur la page
const handleClickOutside = (event) => {
  const calendar = document.querySelector('.date-picker-container')
  if (calendar && !calendar.contains(event.target) && showCalendar.value) {
    showCalendar.value = false
  }
}

onMounted(() => {
  fetchServices()
  fetchPlagesHoraires()
  fetchExistingRendezVous()
})

watch(() => formData.value.date, () => {
  // Mettre à jour les créneaux disponibles lorsque la date change
  if (formData.value.date) {
    formData.value.heure = ''
  }
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

.form-header-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
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

/* Style du sélecteur de date */
.date-picker-group {
  position: relative;
}

.date-picker-simple {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  overflow: hidden;
}

.date-input {
  width: 100%;
  padding: 12px 15px;
  font-size: 16px;
  border: none;
  background: transparent;
  cursor: pointer;
}

.calendar-icon-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #2196F3;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
}

.calendar-icon-btn:hover {
  color: #0b7dda;
}

/* Style du calendrier intégré */
.calendar-inline {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  padding: 1rem;
  margin-top: 0.8rem;
  border: 1px solid #eee;
  max-width: 100%;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
}

.current-month {
  font-weight: 600;
  color: #333;
  font-size: 1.1rem;
}

.month-nav {
  background: none;
  border: none;
  color: #2196F3;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.3s;
}

.month-nav:hover {
  background-color: rgba(33, 150, 243, 0.1);
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 0.5rem;
}

.weekday {
  font-size: 0.85rem;
  color: #666;
  text-align: center;
  padding: 0.5rem 0;
  font-weight: 600;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.day-cell {
  height: 36px;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
  margin: 3px auto;
}

.day-cell.other-month {
  color: #ccc;
}

.day-cell.today {
  font-weight: 700;
  color: #2196F3;
}

.day-cell.selected {
  background-color: #2196F3;
  color: white;
  font-weight: 600;
}

.day-cell.available {
  background-color: #e3f2fd;
  color: #333;
}

.day-cell.available:hover {
  background-color: #bbdefb;
}

.day-cell.available.selected {
  background-color: #2196F3;
  color: white;
}

.day-cell.unavailable {
  color: #ccc;
  cursor: not-allowed;
  text-decoration: line-through;
  opacity: 0.5;
}

/* Style des créneaux horaires */
.time-slots-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 0.8rem;
  margin-top: 0.5rem;
}

.time-slot {
  background-color: #f1f3f5;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0.8rem 0.5rem;
  text-align: center;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.time-slot:hover {
  background-color: #e3f2fd;
  border-color: #bbdefb;
}

.time-slot.selected {
  background-color: #2196F3;
  color: white;
  border-color: #2196F3;
  font-weight: 600;
}

.no-slots-message {
  grid-column: 1 / -1;
  padding: 1rem;
  text-align: center;
  color: #f44336;
  background-color: #ffebee;
  border-radius: 8px;
  font-size: 0.9rem;
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

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 7px 20px rgba(33, 150, 243, 0.3);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

/* Messages de succès et d'erreur */
.success-message, .error-message {
  text-align: center;
  padding: 2.5rem 2rem;
  animation: fadeIn 0.6s ease;
}

.success-message {
  background-color: #f1f8e9;
  border-radius: 10px;
  border: 1px solid #c5e1a5;
}

.error-message {
  margin-top: 1.5rem;
  padding: 2rem;
  background: #fef5f5;
  color: #d32f2f;
  border-radius: 10px;
  border: 1px solid #ffcdd2;
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
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

.success-message h3, .error-message h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.success-message h3 {
  color: #2e7d32;
}

.error-message h3 {
  color: #c62828;
}

.confirmation-details, .error-help {
  margin: 1.5rem 0;
  padding: 1.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

.confirmation-details {
  text-align: left;
}

.error-help {
  text-align: left;
}

.confirmation-details p, .error-help li {
  margin-bottom: 0.8rem;
}

.confirmation-info {
  font-size: 0.9rem;
  color: #757575;
  margin-bottom: 1.5rem;
}

.btn-secondary, .btn-retry {
  padding: 0.9rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 1rem;
}

.btn-secondary {
  background: #e0e0e0;
  color: #333;
  border: none;
}

.btn-retry {
  background: #f44336;
  color: white;
  border: none;
}

.btn-secondary:hover, .btn-retry:hover {
  transform: translateY(-2px);
}

/* Animations */
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

/* Responsive Design */
@media (max-width: 768px) {
  .form-container {
    padding: 2rem;
    border-radius: 8px;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  .time-slots-container {
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  }
  
  .day-cell {
    font-size: 0.8rem;
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