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
                  :class="[
                    'time-slot', 
                    getTimeSlotClass(time),
                    { 'selected': formData.heure === time }
                  ]"
                  @click="selectTimeSlot(time)"
                >
                  {{ time }}
                  <span class="time-period">{{ getTimePeriodLabel(time) }}</span>
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
            <div class="error-actions">
              <button @click="errorMessage = ''" class="btn-retry">Fermer</button>
              <button @click="reloadData" class="btn-reload">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                </svg>
                Recharger les données
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <TheFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive, watch, nextTick } from 'vue'
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

// Classifier les créneaux horaires par période
const getTimeSlotClass = (time) => {
  const hour = parseInt(time.split(':')[0])
  if (hour < 12) return 'morning'
  if (hour < 17) return 'afternoon'
  return 'evening'
}

// Obtenir le label de la période
const getTimePeriodLabel = (time) => {
  const hour = parseInt(time.split(':')[0])
  if (hour < 12) return 'Matin'
  if (hour < 17) return 'Après-midi'
  return 'Soir'
}

// Afficher/masquer le calendrier avec animation
const toggleCalendar = () => {
  showCalendar.value = !showCalendar.value
  if (showCalendar.value) {
    // Focus sur le calendrier après ouverture
    nextTick(() => {
      const calendar = document.querySelector('.calendar-inline')
      if (calendar) {
        calendar.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    })
  }
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
    console.log('Tentative de récupération des rendez-vous...')
    const response = await axios.get('http://localhost:3000/rendez-vous', {
      withCredentials: true // Important pour envoyer les cookies
    })
    existingRendezVous.value = response.data
    console.log('Rendez-vous récupérés avec succès:', response.data)
  } catch (error) {
    errorMessage.value = handleApiError(error, 'de la récupération des rendez-vous')
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
  fetchCurrentUserAndAppointments()
})

watch(() => formData.value.date, () => {
  // Mettre à jour les créneaux disponibles lorsque la date change
  if (formData.value.date) {
    formData.value.heure = ''
  }
})

const fetchUserAppointments = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:3000/rendez-vous?userId=${userId}`, {
      withCredentials: true
    });
    console.log('Rendez-vous utilisateur récupérés:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des rendez-vous:', error);
    throw error;
  }
}

const fetchAllAppointments = async () => {
  try {
    const response = await axios.get('http://localhost:3000/rendez-vous', {
      withCredentials: true
    });
    console.log('Tous les rendez-vous récupérés:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des rendez-vous:', error);
    throw error;
  }
}

const cancelAppointment = async (appointmentId) => {
  try {
    const response = await axios.patch(`http://localhost:3000/rendez-vous/${appointmentId}`, {
      status: 'annulé'
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'annulation du rendez-vous:', error);
    throw error;
  }
}

// Fonction pour filtrer les rendez-vous à venir
const getUpcomingAppointments = (appointments) => {
  const now = new Date();
  return appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    appointmentDate.setHours(parseInt(appointment.heure.split(':')[0]), parseInt(appointment.heure.split(':')[1]));
    return appointmentDate > now;
  }).sort((a, b) => new Date(a.date) - new Date(b.date));
}

// Fonction pour filtrer les rendez-vous passés
const getPastAppointments = (appointments) => {
  const now = new Date();
  return appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    appointmentDate.setHours(parseInt(appointment.heure.split(':')[0]), parseInt(appointment.heure.split(':')[1]));
    return appointmentDate <= now;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Récupérer l'utilisateur actuel et ses rendez-vous
const fetchCurrentUserAndAppointments = async () => {
  try {
    // Vérifier si l'utilisateur est connecté
    const userResponse = await axios.post('http://localhost:3000/auth/current-user', {}, {
      withCredentials: true
    });
    
    if (userResponse.data.isLoggedIn) {
      const userId = userResponse.data.user.id;
      console.log('Utilisateur connecté avec ID:', userId);
      
      // Récupérer les rendez-vous de l'utilisateur
      try {
        const appointmentsResponse = await axios.get(`http://localhost:3000/rendez-vous?userId=${userId}`, {
          withCredentials: true
        });
        
        console.log('Rendez-vous personnels:', appointmentsResponse.data);
        
        // Vous pouvez stocker ces rendez-vous dans une variable réactive si nécessaire
        // userAppointments.value = appointmentsResponse.data;
      } catch (appointmentError) {
        errorMessage.value = handleApiError(appointmentError, 'de la récupération de vos rendez-vous')
      }
    }
  } catch (error) {
    errorMessage.value = handleApiError(error, 'de la vérification de l\'utilisateur')
  }
}

// Utilitaire pour gérer les erreurs d'API
const handleApiError = (error, context = 'opération') => {
  console.error(`Erreur lors de ${context}:`, error)
  
  if (error.response) {
    // La requête a été faite et le serveur a répondu avec un code d'erreur
    console.error('Détails erreur serveur:', error.response.status, error.response.data)
    
    if (error.response.status === 401) {
      return 'Vous devez être connecté pour effectuer cette action. Veuillez vous connecter.'
    } else if (error.response.status === 403) {
      return 'Vous n\'avez pas les droits nécessaires pour effectuer cette action.'
    } else if (error.response.status === 404) {
      return 'La ressource demandée n\'existe pas.'
    } else {
      return `Erreur ${error.response.status}: ${error.response.data.error || `Erreur lors de ${context}`}`
    }
  } else if (error.request) {
    // La requête a été faite mais aucune réponse n'a été reçue
    console.error('Aucune réponse reçue du serveur:', error.request)
    return 'Le serveur ne répond pas. Veuillez vérifier votre connexion ou réessayer plus tard.'
  } else {
    // Une erreur s'est produite lors de la configuration de la requête
    console.error('Erreur de configuration de la requête:', error.message)
    return 'Erreur lors de la tentative de connexion au serveur.'
  }
}

// Ajouter cette fonction pour recharger toutes les données
const reloadData = () => {
  console.log('Rechargement des données...')
  errorMessage.value = ''
  
  // Recharger les services
  fetchServices()
  
  // Recharger les plages horaires
  fetchPlagesHoraires()
  
  // Recharger les rendez-vous
  fetchExistingRendezVous()
  
  // Recharger les données utilisateur
  fetchCurrentUserAndAppointments()
}
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

/* Style du sélecteur de date - Version Professionnelle */
.date-picker-group {
  position: relative;
}

.date-picker-simple {
  position: relative;
  display: flex;
  align-items: center;
  border: 2px solid #e3e8ef;
  border-radius: 12px;
  background: linear-gradient(145deg, #ffffff, #f8fafc);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.date-picker-simple:hover {
  border-color: #6366f1;
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.1);
  transform: translateY(-1px);
}

.date-picker-simple:focus-within {
  border-color: #6366f1;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1), 0 4px 16px rgba(99, 102, 241, 0.15);
}

.date-input {
  width: 100%;
  padding: 16px 20px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #1f2937;
  letter-spacing: 0.025em;
}

.date-input::placeholder {
  color: #9ca3af;
  font-weight: 400;
}

.calendar-icon-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.2);
}

.calendar-icon-btn:hover {
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3);
}

.calendar-icon-btn:active {
  transform: translateY(-50%) scale(0.95);
}

/* Style du calendrier intégré - Version Professionnelle */
.calendar-inline {
  background: linear-gradient(145deg, #ffffff, #f8fafc);
  border-radius: 20px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 8px 16px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  padding: 2rem;
  margin-top: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.calendar-inline::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899);
  border-radius: 20px 20px 0 0;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 0 0.5rem;
}

.current-month {
  font-weight: 700;
  color: #1f2937;
  font-size: 1.5rem;
  letter-spacing: 0.025em;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.month-nav {
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
  border: none;
  color: #4b5563;
  cursor: pointer;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.month-nav:hover {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  transform: scale(1.1);
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.2);
}

.month-nav:active {
  transform: scale(0.95);
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 1rem;
  padding: 0 0.5rem;
}

.weekday {
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
  padding: 1rem 0;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  padding: 0 0.5rem;
}

.day-cell {
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin: 2px auto;
  position: relative;
  overflow: hidden;
}

.day-cell::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.day-cell:hover::before {
  opacity: 1;
}

.day-cell.other-month {
  color: #d1d5db;
  opacity: 0.5;
}

.day-cell.today {
  font-weight: 700;
  color: #6366f1;
  background: linear-gradient(135deg, #ede9fe, #e0e7ff);
  border: 2px solid #6366f1;
  animation: pulse 2s infinite;
}

.day-cell.selected {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  font-weight: 700;
  transform: scale(1.1);
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
}

.day-cell.available {
  background: linear-gradient(135deg, #f0fdf4, #ecfdf5);
  color: #047857;
  border: 1px solid #a7f3d0;
}

.day-cell.available:hover {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.day-cell.available.selected {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border-color: #6366f1;
}

.day-cell.unavailable {
  color: #d1d5db;
  cursor: not-allowed;
  background: #f9fafb;
  opacity: 0.4;
  position: relative;
}

.day-cell.unavailable::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 10%;
  right: 10%;
  height: 1px;
  background: #ef4444;
  transform: translateY(-50%);
}

/* Style des créneaux horaires - Version Professionnelle */
.time-slots-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: linear-gradient(145deg, #f8fafc, #f1f5f9);
  border-radius: 16px;
  border: 1px solid #e2e8f0;
}

.time-slot {
  background: linear-gradient(145deg, #ffffff, #f8fafc);
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem 0.75rem;
  text-align: center;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  color: #475569;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  letter-spacing: 0.025em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.time-slot::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.5s ease;
}

.time-slot:hover::before {
  left: 100%;
}

.time-slot:hover {
  background: linear-gradient(135deg, #ede9fe, #e0e7ff);
  border-color: #6366f1;
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.15);
  color: #6366f1;
}

.time-slot.selected {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border-color: #6366f1;
  font-weight: 700;
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 12px 32px rgba(99, 102, 241, 0.3);
}

.time-slot.selected::after {
  content: '✓';
  position: absolute;
  top: 4px;
  right: 8px;
  font-size: 0.75rem;
  opacity: 0.8;
}

.time-period {
  display: block;
  font-size: 0.7rem;
  opacity: 0.7;
  margin-top: 0.25rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.time-slot.selected .time-period {
  opacity: 0.9;
}

.no-slots-message {
  grid-column: 1 / -1;
  padding: 2rem;
  text-align: center;
  color: #ef4444;
  background: linear-gradient(135deg, #fef2f2, #fee2e2);
  border: 2px dashed #fca5a5;
  border-radius: 16px;
  font-size: 1rem;
  font-weight: 500;
  position: relative;
  overflow: hidden;
}

.no-slots-message::before {
  content: '⚠️';
  font-size: 2rem;
  display: block;
  margin-bottom: 0.5rem;
}

/* Animations */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.5);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(99, 102, 241, 0);
  }
}

@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

/* Indicateurs visuels améliorés */
.time-slot.morning {
  border-left: 4px solid #f59e0b;
}

.time-slot.afternoon {
  border-left: 4px solid #3b82f6;
}

.time-slot.evening {
  border-left: 4px solid #8b5cf6;
}

/* Amélioration de l'accessibilité */
.day-cell:focus,
.time-slot:focus {
  outline: 3px solid #6366f1;
  outline-offset: 2px;
}

/* Responsive amélioré */
@media (max-width: 768px) {
  .calendar-inline {
    padding: 1.5rem;
    border-radius: 16px;
  }
  
  .current-month {
    font-size: 1.25rem;
  }
  
  .day-cell {
    height: 40px;
    width: 40px;
    font-size: 0.85rem;
  }
  
  .time-slots-container {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 0.75rem;
    padding: 1rem;
  }
  
  .time-slot {
    padding: 0.75rem 0.5rem;
    font-size: 0.875rem;
  }
}

@media (max-width: 480px) {
  .time-slots-container {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  }
  
  .calendar-days {
    gap: 4px;
  }
  
  .day-cell {
    height: 36px;
    width: 36px;
    font-size: 0.8rem;
  }
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

.btn-primary {
  width: 100%;
  padding: 1.2rem 2rem;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  letter-spacing: 0.025em;
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3);
  text-transform: uppercase;
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.btn-primary:hover::before {
  left: 100%;
}

.btn-primary:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.4);
  background: linear-gradient(135deg, #7c3aed, #6366f1);
}

.btn-primary:active {
  transform: translateY(-1px) scale(0.98);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  background: linear-gradient(135deg, #9ca3af, #6b7280);
  box-shadow: none;
}

.btn-reload {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 2rem;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 1rem;
  margin-left: 1rem;
}

.btn-reload:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
}

.error-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
}
</style> 