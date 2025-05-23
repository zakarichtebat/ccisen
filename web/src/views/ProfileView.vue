<template>
  <div class="profile-page">
    <TheHeader />
    
    <section class="profile-section">
      <div class="container">
        <div class="profile-container">
          <div class="profile-header">
            <h1>Mon Profil</h1>
          </div>
          
          <div class="profile-content">
            <!-- Section Photo de profil -->
            <div class="profile-sidebar">
              <div class="profile-photo-container">
                <div class="profile-photo" v-if="profilePhoto">
                  <img :src="profilePhoto" alt="Photo de profil" />
                </div>
                <div class="profile-photo profile-photo-placeholder" v-else>
                  <span>{{ userInitials }}</span>
                </div>
                <div class="photo-upload">
                  <label for="photo-input" class="upload-btn">
                    <i class="fas fa-camera"></i> Changer la photo
                  </label>
                  <input 
                    type="file" 
                    id="photo-input" 
                    accept="image/*" 
                    @change="handlePhotoUpload" 
                    hidden
                  />
                </div>
              </div>
              
              <div class="user-info-summary">
                <h3>{{ user?.nom }} {{ user?.prenom }}</h3>
                <p>{{ user?.email }}</p>
                <p class="text-muted">Client depuis {{ formattedJoinDate }}</p>
              </div>
            </div>
            
            <!-- Section des onglets -->
            <div class="profile-tabs-content">
              <div class="profile-tabs">
                <button 
                  class="tab-btn" 
                  :class="{ 'active': activeTab === 'info' }" 
                  @click="activeTab = 'info'"
                >
                  Informations personnelles
                </button>
                <button 
                  class="tab-btn" 
                  :class="{ 'active': activeTab === 'rendezVous' }" 
                  @click="activeTab = 'rendezVous'"
                >
                  Mes rendez-vous
                </button>
              </div>
              
              <!-- Contenu des onglets -->
              <div class="tab-content">
                <!-- Onglet Informations personnelles -->
                <div v-if="activeTab === 'info'" class="personal-info-tab">
                  <form @submit.prevent="updateProfile" class="profile-form">
                    <div class="form-row">
                      <div class="form-group">
                        <label for="nom">Nom</label>
                        <input 
                          type="text" 
                          id="nom" 
                          v-model="formData.nom" 
                          required
                        />
                      </div>
                      <div class="form-group">
                        <label for="prenom">Prénom</label>
                        <input 
                          type="text" 
                          id="prenom" 
                          v-model="formData.prenom" 
                          required
                        />
                      </div>
                    </div>
                    
                    <div class="form-group">
                      <label for="email">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        v-model="formData.email" 
                        required
                      />
                    </div>
                    
                    <div class="form-group">
                      <label for="telephone">Téléphone</label>
                      <input 
                        type="tel" 
                        id="telephone" 
                        v-model="formData.telephone" 
                        required
                      />
                    </div>
                    
                    <div class="form-group">
                      <label for="adresse">Adresse</label>
                      <input 
                        type="text" 
                        id="adresse" 
                        v-model="formData.adresse" 
                        required
                      />
                    </div>
                    
                    <div class="form-group">
                      <label for="secteurActivite">Secteur d'activité</label>
                      <input 
                        type="text" 
                        id="secteurActivite" 
                        v-model="formData.secteurActivite" 
                        required
                      />
                    </div>
                    
                    <div class="form-group">
                      <label for="numRegistreCommerce">Numéro de registre de commerce</label>
                      <input 
                        type="text" 
                        id="numRegistreCommerce" 
                        v-model="formData.numRegistreCommerce" 
                        required
                        readonly
                      />
                      <small class="form-hint">Le numéro de registre de commerce ne peut pas être modifié</small>
                    </div>
                    
                    <div class="password-section">
                      <h3>Changer le mot de passe</h3>
                      <div class="form-group">
                        <label for="currentPassword">Mot de passe actuel</label>
                        <input 
                          type="password" 
                          id="currentPassword" 
                          v-model="passwordData.currentPassword"
                        />
                      </div>
                      
                      <div class="form-row">
                        <div class="form-group">
                          <label for="newPassword">Nouveau mot de passe</label>
                          <input 
                            type="password" 
                            id="newPassword" 
                            v-model="passwordData.newPassword"
                          />
                        </div>
                        <div class="form-group">
                          <label for="confirmPassword">Confirmer le mot de passe</label>
                          <input 
                            type="password" 
                            id="confirmPassword" 
                            v-model="passwordData.confirmPassword"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div class="form-actions">
                      <button 
                        type="submit" 
                        class="btn-primary"
                        :disabled="isSubmitting"
                      >
                        {{ isSubmitting ? 'Enregistrement...' : 'Enregistrer les modifications' }}
                      </button>
                    </div>
                  </form>
                </div>
                
                <!-- Onglet Mes rendez-vous -->
                <div v-if="activeTab === 'rendezVous'" class="appointments-tab">
                  <div class="appointments-header">
                    <div class="appointments-filter">
                      <button 
                        class="filter-btn" 
                        :class="{ 'active': appointmentsFilter === 'all' }"
                        @click="appointmentsFilter = 'all'"
                      >
                        Tous
                      </button>
                      <button 
                        class="filter-btn" 
                        :class="{ 'active': appointmentsFilter === 'upcoming' }"
                        @click="appointmentsFilter = 'upcoming'"
                      >
                        À venir
                      </button>
                      <button 
                        class="filter-btn" 
                        :class="{ 'active': appointmentsFilter === 'past' }"
                        @click="appointmentsFilter = 'past'"
                      >
                        Passés
                      </button>
                    </div>
                    
                    <button 
                      @click="refreshAppointments" 
                      class="refresh-btn"
                      title="Actualiser les rendez-vous"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                      </svg>
                      Actualiser
                    </button>
                  </div>
                  
                  <div v-if="filteredAppointments.length === 0" class="no-appointments">
                    <div class="empty-state">
                      <svg width="100" height="100" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V5H19V19M17,12H12V7H10V12H7V14H10V17H12V14H17V12Z" />
                      </svg>
                      <p>Vous n'avez pas encore de rendez-vous {{ appointmentsFilter === 'upcoming' ? 'à venir' : appointmentsFilter === 'past' ? 'passés' : '' }}</p>
                      <router-link to="/rendez-vous" class="btn-secondary">Prendre rendez-vous</router-link>
                    </div>
                  </div>
                  
                  <div v-else class="appointments-list">
                    <div 
                      v-for="appointment in filteredAppointments" 
                      :key="appointment.id"
                      class="appointment-card"
                      :class="{
                        'status-confirmed': appointment.status === 'confirmé',
                        'status-pending': appointment.status === 'en_attente',
                        'status-cancelled': appointment.status === 'annulé'
                      }"
                    >
                      <div class="appointment-date">
                        <div class="date-indicator">
                          <span class="day">{{ getDayFromDate(appointment.date) }}</span>
                          <span class="month">{{ getMonthFromDate(appointment.date) }}</span>
                        </div>
                        <span class="time">{{ appointment.heure }}</span>
                      </div>
                      
                      <div class="appointment-details">
                        <h4>{{ appointment.service.nom }}</h4>
                        <div class="status-badge" :class="`status-${appointment.status}`">
                          {{ getStatusText(appointment.status) }}
                        </div>
                        <p v-if="appointment.notes" class="appointment-notes">{{ appointment.notes }}</p>
                      </div>
                      
                      <div class="appointment-actions">
                        <button 
                          v-if="isUpcoming(appointment)"
                          class="action-btn cancel-btn"
                          @click="cancelAppointment(appointment.id)"
                          :disabled="appointment.status === 'annulé'"
                        >
                          Annuler
                        </button>
                        <button
                          v-if="isUpcoming(appointment) && appointment.status === 'en_attente'"
                          class="action-btn reschedule-btn"
                          @click="navigateToReschedule(appointment.id)"
                        >
                          Reprogrammer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Messages de notification -->
        <div v-if="successMessage" class="success-message">
          {{ successMessage }}
        </div>
        
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
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
const user = ref(null)
const rendezVousList = ref([])
const activeTab = ref('info')
const appointmentsFilter = ref('upcoming')
const profilePhoto = ref(null)
const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Données du formulaire
const formData = ref({
  nom: '',
  prenom: '',
  email: '',
  telephone: '',
  adresse: '',
  secteurActivite: '',
  numRegistreCommerce: ''
})

// Données pour le changement de mot de passe
const passwordData = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Récupérer les initiales de l'utilisateur
const userInitials = computed(() => {
  if (!user.value) return '';
  return (user.value.prenom.charAt(0) + user.value.nom.charAt(0)).toUpperCase();
})

// Formater la date d'inscription
const formattedJoinDate = computed(() => {
  if (!user.value || !user.value.createdAt) return '';
  const date = new Date(user.value.createdAt);
  return new Intl.DateTimeFormat('fr-FR', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  }).format(date);
})

// Filtrer les rendez-vous selon le filtre actif
const filteredAppointments = computed(() => {
  if (!rendezVousList.value.length) return [];
  
  const now = new Date();
  
  switch (appointmentsFilter.value) {
    case 'upcoming':
      return rendezVousList.value.filter(rv => {
        const appointmentDate = new Date(rv.date);
        appointmentDate.setHours(parseInt(rv.heure.split(':')[0]), parseInt(rv.heure.split(':')[1]));
        return appointmentDate > now;
      }).sort((a, b) => new Date(a.date) - new Date(b.date));
      
    case 'past':
      return rendezVousList.value.filter(rv => {
        const appointmentDate = new Date(rv.date);
        appointmentDate.setHours(parseInt(rv.heure.split(':')[0]), parseInt(rv.heure.split(':')[1]));
        return appointmentDate <= now;
      }).sort((a, b) => new Date(b.date) - new Date(a.date));
      
    default: // 'all'
      return [...rendezVousList.value].sort((a, b) => new Date(b.date) - new Date(a.date));
  }
})

// Vérifier si un rendez-vous est à venir
const isUpcoming = (appointment) => {
  const appointmentDate = new Date(appointment.date);
  appointmentDate.setHours(parseInt(appointment.heure.split(':')[0]), parseInt(appointment.heure.split(':')[1]));
  return appointmentDate > new Date();
}

// Obtenir le jour à partir d'une date
const getDayFromDate = (dateString) => {
  const date = new Date(dateString);
  return date.getDate();
}

// Obtenir le mois à partir d'une date
const getMonthFromDate = (dateString) => {
  const date = new Date(dateString);
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
  return months[date.getMonth()];
}

// Obtenir le texte correspondant au statut
const getStatusText = (status) => {
  switch (status) {
    case 'en_attente': return 'En attente';
    case 'confirmé': return 'Confirmé';
    case 'annulé': return 'Annulé';
    default: return status;
  }
}

// Récupérer les données de l'utilisateur
const fetchUserData = async () => {
  try {
    const response = await axios.post('http://localhost:3000/auth/current-user', {}, {
      withCredentials: true
    });
    
    if (response.data.isLoggedIn) {
      user.value = response.data.user;
      console.log('Utilisateur connecté:', user.value);
      
      // Remplir le formulaire avec les données de l'utilisateur
      formData.value = {
        nom: user.value.nom,
        prenom: user.value.prenom,
        email: user.value.email,
        telephone: user.value.telephone,
        adresse: user.value.adresse,
        secteurActivite: user.value.secteurActivite,
        numRegistreCommerce: user.value.numRegistreCommerce
      };
      
      // Récupérer les rendez-vous après avoir récupéré les données utilisateur
      await fetchUserAppointments();
    } else {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      console.log('Utilisateur non connecté, redirection vers /login');
      router.push('/login');
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données utilisateur:', error);
    router.push('/login');
  }
}

// Récupérer les rendez-vous de l'utilisateur
const fetchUserAppointments = async () => {
  try {
    if (!user.value) {
      console.log('Utilisateur non connecté, impossible de récupérer les rendez-vous');
      return;
    }
    
    console.log('Récupération des rendez-vous pour l\'utilisateur ID:', user.value.id);
    const response = await axios.get(`http://localhost:3000/rendez-vous?userId=${user.value.id}`, {
      withCredentials: true
    });
    rendezVousList.value = response.data;
    console.log('Rendez-vous récupérés:', response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des rendez-vous:', error);
    if (error.response && error.response.status === 401) {
      errorMessage.value = 'Vous devez être connecté pour voir vos rendez-vous.';
    } else {
      errorMessage.value = 'Impossible de charger vos rendez-vous. Veuillez réessayer plus tard.';
    }
  }
}

// Mettre à jour le profil utilisateur
const updateProfile = async () => {
  isSubmitting.value = true;
  errorMessage.value = '';
  successMessage.value = '';
  
  try {
    // Vérifier si le mot de passe doit être mis à jour
    if (passwordData.value.newPassword) {
      // Vérifier que les mots de passe correspondent
      if (passwordData.value.newPassword !== passwordData.value.confirmPassword) {
        errorMessage.value = 'Les nouveaux mots de passe ne correspondent pas.';
        isSubmitting.value = false;
        return;
      }
      
      // Ajouter le mot de passe aux données à mettre à jour
      formData.value.motDePasse = passwordData.value.newPassword;
      formData.value.currentPassword = passwordData.value.currentPassword;
    }
    
    // Envoyer la requête de mise à jour
    const response = await axios.put(`http://localhost:3000/user/${user.value.id}`, formData.value);
    
    // Mettre à jour les données utilisateur locales
    user.value = response.data;
    
    // Réinitialiser les champs de mot de passe
    passwordData.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
    
    successMessage.value = 'Votre profil a été mis à jour avec succès.';
    
    // Masquer le message de succès après 5 secondes
    setTimeout(() => {
      successMessage.value = '';
    }, 5000);
    
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    
    if (error.response) {
      errorMessage.value = error.response.data.error || 'Une erreur est survenue lors de la mise à jour du profil.';
    } else {
      errorMessage.value = 'Impossible de se connecter au serveur. Veuillez vérifier votre connexion et réessayer.';
    }
  } finally {
    isSubmitting.value = false;
  }
}

// Gérer le téléchargement de la photo de profil
const handlePhotoUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  // Vérifier le type de fichier
  if (!file.type.match('image.*')) {
    errorMessage.value = 'Veuillez sélectionner une image.';
    return;
  }
  
  // Vérifier la taille du fichier (max 5 MB)
  if (file.size > 5 * 1024 * 1024) {
    errorMessage.value = 'La taille de l\'image ne doit pas dépasser 5 MB.';
    return;
  }
  
  // Créer un objet URL pour l'aperçu
  const reader = new FileReader();
  reader.onload = (e) => {
    profilePhoto.value = e.target.result;
    
    // Envoyer l'image au serveur (implémentation à venir)
    // uploadProfilePhoto(file);
  };
  reader.readAsDataURL(file);
}

// Annuler un rendez-vous
const cancelAppointment = async (appointmentId) => {
  try {
    const response = await axios.patch(`http://localhost:3000/rendez-vous/${appointmentId}`, {
      status: 'annulé'
    }, {
      withCredentials: true
    });
    
    // Mettre à jour la liste des rendez-vous
    const index = rendezVousList.value.findIndex(rv => rv.id === appointmentId);
    if (index !== -1) {
      rendezVousList.value[index] = response.data;
    }
    
    successMessage.value = 'Votre rendez-vous a été annulé avec succès.';
    
    // Masquer le message de succès après 5 secondes
    setTimeout(() => {
      successMessage.value = '';
    }, 5000);
    
    // Actualiser la liste des rendez-vous
    await fetchUserAppointments();
    
  } catch (error) {
    console.error('Erreur lors de l\'annulation du rendez-vous:', error);
    if (error.response && error.response.status === 401) {
      errorMessage.value = 'Vous devez être connecté pour annuler ce rendez-vous.';
    } else {
      errorMessage.value = 'Impossible d\'annuler ce rendez-vous. Veuillez réessayer plus tard.';
    }
  }
}

// Naviguer vers la page de reprogrammation
const navigateToReschedule = (appointmentId) => {
  router.push(`/rendez-vous?reschedule=${appointmentId}`);
}

// Actualiser les rendez-vous manuellement
const refreshAppointments = async () => {
  if (user.value) {
    console.log('Actualisation manuelle des rendez-vous...');
    await fetchUserAppointments();
  } else {
    console.log('Impossible d\'actualiser les rendez-vous: utilisateur non connecté');
  }
}

onMounted(() => {
  fetchUserData();
})
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  background-color: #f5f7fa;
}

.profile-section {
  flex: 1;
  padding: 4rem 0;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
}

.profile-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  margin-bottom: 2rem;
}

.profile-header {
  padding: 2rem;
  border-bottom: 1px solid #eee;
  position: relative;
}

.profile-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, #4CAF50, #2196F3);
}

.profile-header h1 {
  font-size: 1.8rem;
  color: #333;
  margin: 0;
}

.profile-content {
  display: flex;
  flex-wrap: wrap;
}

/* Sidebar avec photo de profil */
.profile-sidebar {
  width: 100%;
  max-width: 300px;
  padding: 2rem;
  border-right: 1px solid #eee;
}

.profile-photo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
}

.profile-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1rem;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.profile-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-photo-placeholder {
  background: linear-gradient(135deg, #4CAF50, #2196F3);
  color: white;
  font-size: 3rem;
  font-weight: 500;
}

.photo-upload {
  margin-top: 1rem;
}

.upload-btn {
  display: inline-block;
  padding: 0.6rem 1rem;
  background-color: #f1f1f1;
  color: #333;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.upload-btn:hover {
  background-color: #e0e0e0;
}

.user-info-summary {
  text-align: center;
}

.user-info-summary h3 {
  margin: 0 0 0.5rem;
  font-size: 1.3rem;
  color: #333;
}

.user-info-summary p {
  margin: 0 0 0.5rem;
  color: #666;
}

.text-muted {
  color: #999;
  font-size: 0.9rem;
}

/* Section des onglets */
.profile-tabs-content {
  flex: 1;
  padding: 2rem;
}

.profile-tabs {
  display: flex;
  border-bottom: 1px solid #eee;
  margin-bottom: 2rem;
}

.tab-btn {
  padding: 0.8rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  font-size: 1rem;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn.active {
  color: #2196F3;
  border-bottom-color: #2196F3;
  font-weight: 600;
}

.tab-btn:hover:not(.active) {
  color: #333;
  background-color: #f9f9f9;
}

/* Formulaire de profil */
.profile-form {
  max-width: 800px;
}

.form-row {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-row .form-group {
  flex: 1;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.form-group input:focus {
  outline: none;
  border-color: #2196F3;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

.form-group input[readonly] {
  background-color: #f9f9f9;
  cursor: not-allowed;
}

.form-hint {
  font-size: 0.8rem;
  color: #999;
  margin-top: 0.3rem;
}

.password-section {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
}

.password-section h3 {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-actions {
  margin-top: 2rem;
}

.btn-primary {
  padding: 0.8rem 2rem;
  background: linear-gradient(45deg, #4CAF50, #2196F3);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(33, 150, 243, 0.2);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Onglet rendez-vous */
.appointments-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.appointments-filter {
  display: flex;
  gap: 1rem;
}

.filter-btn {
  padding: 0.6rem 1.2rem;
  background-color: #f1f1f1;
  border: none;
  border-radius: 20px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn.active {
  background-color: #2196F3;
  color: white;
}

.filter-btn:hover:not(.active) {
  background-color: #e0e0e0;
}

.refresh-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.refresh-btn:hover {
  background-color: #45a049;
  transform: translateY(-1px);
}

.no-appointments {
  padding: 3rem 0;
  text-align: center;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: #999;
}

.empty-state svg {
  opacity: 0.3;
  width: 60px;
  height: 60px;
}

.btn-secondary {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
  margin-top: 1rem;
}

.btn-secondary:hover {
  background-color: #1976d2;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(33, 150, 243, 0.2);
}

.appointments-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.appointment-card {
  display: flex;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  background-color: white;
}

.appointment-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  padding: 1.5rem;
  min-width: 100px;
  border-right: 1px solid #eee;
}

.date-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.5rem;
}

.day {
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
}

.month {
  font-size: 0.9rem;
  color: #666;
  text-transform: uppercase;
}

.time {
  font-size: 0.9rem;
  color: #666;
  font-weight: 600;
}

.appointment-details {
  flex: 1;
  padding: 1.5rem;
  position: relative;
}

.appointment-details h4 {
  margin: 0 0 0.8rem;
  font-size: 1.2rem;
  color: #333;
}

.status-badge {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.status-en_attente {
  background-color: #ffecb3;
  color: #ff8f00;
}

.status-confirmé {
  background-color: #c8e6c9;
  color: #388e3c;
}

.status-annulé {
  background-color: #ffcdd2;
  color: #d32f2f;
}

.appointment-notes {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.appointment-actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.5rem;
  gap: 0.8rem;
}

.action-btn {
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn {
  background-color: #f44336;
  color: white;
}

.cancel-btn:hover:not(:disabled) {
  background-color: #d32f2f;
}

.reschedule-btn {
  background-color: #2196F3;
  color: white;
}

.reschedule-btn:hover {
  background-color: #1976d2;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Messages de notification */
.success-message, .error-message {
  position: fixed;
  top: 100px;
  right: 20px;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  animation: slideIn 0.3s ease-out forwards;
  z-index: 1000;
  max-width: 320px;
}

.success-message {
  background-color: #4caf50;
  color: white;
  box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
}

.error-message {
  background-color: #f44336;
  color: white;
  box-shadow: 0 5px 15px rgba(244, 67, 54, 0.3);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive Design */
@media (max-width: 992px) {
  .profile-content {
    flex-direction: column;
  }
  
  .profile-sidebar {
    max-width: 100%;
    border-right: none;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  
  .profile-photo-container {
    margin-bottom: 0;
  }
  
  .user-info-summary {
    text-align: left;
  }
}

@media (max-width: 768px) {
  .profile-section {
    padding: 2rem 0;
  }
  
  .profile-sidebar {
    flex-direction: column;
    align-items: center;
  }
  
  .user-info-summary {
    text-align: center;
  }
  
  .form-row {
    flex-direction: column;
    gap: 0;
    margin-bottom: 0;
  }
  
  .appointment-card {
    flex-direction: column;
  }
  
  .appointment-date {
    flex-direction: row;
    justify-content: space-between;
    border-right: none;
    border-bottom: 1px solid #eee;
  }
  
  .date-indicator {
    flex-direction: row;
    gap: 0.5rem;
    margin-bottom: 0;
  }
  
  .appointment-actions {
    flex-direction: row;
    padding: 1rem 1.5rem;
  }
}
</style> 