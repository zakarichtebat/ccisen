<template>
  <div class="profile-page">
    <TheHeader />
    
    <!-- Section héro avec dégradé moderne -->
    <section class="hero-gradient-section">
      <div class="hero-gradient-bg"></div>
      <div class="container">
        <div class="profile-hero-content">
          <div class="profile-avatar-circle">
            <div class="avatar-inner" v-if="profilePhoto">
              <img :src="profilePhoto" alt="Photo de profil" />
            </div>
            <div class="avatar-inner avatar-initials" v-else>
              {{ userInitials }}
            </div>
            <div class="online-indicator"></div>
          </div>
          <div class="profile-info">
            <h1 class="profile-name">{{ user?.prenom }} {{ user?.nom }}</h1>
            <p class="profile-email">{{ user?.email }}</p>
            <p class="profile-member-since">Client depuis {{ formattedJoinDate }}</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Section principale avec onglets -->
    <section class="main-content-section">
      <div class="container">
        <div class="profile-card">
          <!-- Navigation onglets -->
          <div class="tabs-navigation">
            <button 
              class="tab-button" 
              :class="{ 'active': activeTab === 'info' }" 
              @click="activeTab = 'info'"
            >
              <i class="fas fa-user"></i>
              Informations personnelles
            </button>
            <button 
              class="tab-button" 
              :class="{ 'active': activeTab === 'rendezVous' }" 
              @click="activeTab = 'rendezVous'"
            >
              <i class="fas fa-calendar"></i>
              Mes rendez-vous
            </button>
            <button 
              class="tab-button" 
              :class="{ 'active': activeTab === 'inscriptions' }" 
              @click="activeTab = 'inscriptions'"
            >
              <i class="fas fa-graduation-cap"></i>
              Mes inscriptions ({{ userInscriptions.length }})
            </button>
          </div>
          
          <!-- Contenu des onglets -->
          <div class="tab-content-area">
            <!-- Onglet Informations personnelles -->
            <div v-if="activeTab === 'info'" class="info-tab-content">
              <form @submit.prevent="updateProfile" class="modern-profile-form">
                <!-- Informations de base -->
                <div class="form-section">
                  <div class="form-row">
                    <div class="input-group">
                      <label class="input-label">
                        <i class="fas fa-user"></i>
                        Nom
                      </label>
                      <input 
                        type="text" 
                        v-model="formData.nom" 
                        class="modern-form-input"
                        required
                      />
                    </div>
                  </div>
                  
                  <div class="form-row">
                    <div class="input-group">
                      <label class="input-label">Prénom</label>
                      <input 
                        type="text" 
                        v-model="formData.prenom" 
                        class="modern-form-input"
                        required
                      />
                    </div>
                  </div>
                  
                  <div class="form-row">
                    <div class="input-group">
                      <label class="input-label">
                        <i class="fas fa-envelope"></i>
                        Email
                      </label>
                      <input 
                        type="email" 
                        v-model="formData.email" 
                        class="modern-form-input"
                        required
                      />
                    </div>
                  </div>
                  
                  <div class="form-row">
                    <div class="input-group">
                      <label class="input-label">
                        <i class="fas fa-phone"></i>
                        Téléphone
                      </label>
                      <input 
                        type="tel" 
                        v-model="formData.telephone" 
                        class="modern-form-input"
                        required
                      />
                    </div>
                  </div>
                  
                  <div class="form-row">
                    <div class="input-group">
                      <label class="input-label">
                        <i class="fas fa-map-marker-alt"></i>
                        Adresse
                      </label>
                      <input 
                        type="text" 
                        v-model="formData.adresse" 
                        class="modern-form-input"
                        required
                      />
                    </div>
                  </div>
                  
                  <div class="form-row">
                    <div class="input-group">
                      <label class="input-label">
                        <i class="fas fa-briefcase"></i>
                        Secteur d'activité
                      </label>
                      <input 
                        type="text" 
                        v-model="formData.secteurActivite" 
                        class="modern-form-input"
                        required
                      />
                    </div>
                  </div>
                  
                  <div class="form-row">
                    <div class="input-group">
                      <label class="input-label">
                        <i class="fas fa-certificate"></i>
                        Numéro de registre de commerce
                      </label>
                      <input 
                        type="text" 
                        v-model="formData.numRegistreCommerce" 
                        class="modern-form-input readonly-input"
                        readonly
                        required
                      />
                      <small class="input-hint">Le numéro de registre de commerce ne peut pas être modifié</small>
                    </div>
                  </div>
                </div>
                
                <!-- Section changement de mot de passe -->
                <div class="password-change-section">
                  <h3 class="section-title">Changer le mot de passe</h3>
                  
                  <div class="form-row">
                    <div class="input-group">
                      <label class="input-label">Mot de passe actuel</label>
                      <div class="password-input-wrapper">
                        <input 
                          :type="showCurrentPassword ? 'text' : 'password'"
                          v-model="passwordData.currentPassword" 
                          class="modern-form-input password-input"
                          placeholder="Entrez votre mot de passe actuel"
                        />
                        <button 
                          type="button" 
                          class="password-toggle"
                          @click="showCurrentPassword = !showCurrentPassword"
                        >
                          <i :class="showCurrentPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div class="form-row">
                    <div class="input-group">
                      <label class="input-label">Nouveau mot de passe</label>
                      <div class="password-input-wrapper">
                        <input 
                          :type="showNewPassword ? 'text' : 'password'"
                          v-model="passwordData.newPassword" 
                          class="modern-form-input password-input"
                          placeholder="Entrez un nouveau mot de passe"
                        />
                        <button 
                          type="button" 
                          class="password-toggle"
                          @click="showNewPassword = !showNewPassword"
                        >
                          <i :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div class="form-row">
                    <div class="input-group">
                      <label class="input-label">Confirmer le mot de passe</label>
                      <div class="password-input-wrapper">
                        <input 
                          :type="showConfirmPassword ? 'text' : 'password'"
                          v-model="passwordData.confirmPassword" 
                          class="modern-form-input password-input"
                          placeholder="Confirmez votre nouveau mot de passe"
                        />
                        <button 
                          type="button" 
                          class="password-toggle"
                          @click="showConfirmPassword = !showConfirmPassword"
                        >
                          <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Bouton de sauvegarde -->
                <div class="form-actions">
                  <button 
                    type="submit" 
                    class="save-button"
                    :disabled="isSubmitting"
                  >
                    <i class="fas fa-save"></i>
                    {{ isSubmitting ? 'Enregistrement...' : 'Enregistrer les modifications' }}
                  </button>
                </div>
              </form>
            </div>
            
            <!-- Onglet Mes rendez-vous -->
            <div v-if="activeTab === 'rendezVous'" class="appointments-tab-content">
              <div class="appointments-header">
                <div class="appointments-filters">
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
                  class="refresh-button"
                >
                  <i class="fas fa-sync-alt"></i>
                  Actualiser
                </button>
              </div>
              
              <div v-if="filteredAppointments.length === 0" class="empty-appointments">
                <div class="empty-icon">
                  <i class="fas fa-calendar-plus"></i>
                </div>
                <h3>Aucun rendez-vous</h3>
                <p>Vous n'avez pas encore de rendez-vous {{ appointmentsFilter === 'upcoming' ? 'à venir' : appointmentsFilter === 'past' ? 'passés' : '' }}.</p>
                <router-link to="/rendez-vous" class="new-appointment-btn">
                  <i class="fas fa-plus"></i>
                  Prendre rendez-vous
                </router-link>
              </div>
              
              <div v-else class="appointments-grid">
                <div 
                  v-for="appointment in filteredAppointments" 
                  :key="appointment.id"
                  class="appointment-item"
                  :class="`status-${appointment.status}`"
                >
                  <div class="appointment-date-block">
                    <span class="date-day">{{ getDayFromDate(appointment.date) }}</span>
                    <span class="date-month">{{ getMonthFromDate(appointment.date) }}</span>
                  </div>
                  
                  <div class="appointment-info">
                    <h4>{{ appointment.service.nom }}</h4>
                    <div class="appointment-time">
                      <i class="fas fa-clock"></i>
                      {{ appointment.heure }}
                    </div>
                    <div class="appointment-status" :class="`status-${appointment.status}`">
                      {{ getStatusText(appointment.status) }}
                    </div>
                    <p v-if="appointment.notes" class="appointment-notes">{{ appointment.notes }}</p>
                  </div>
                  
                  <div class="appointment-actions" v-if="isUpcoming(appointment)">
                    <button 
                      v-if="appointment.status !== 'annulé'"
                      class="action-btn cancel"
                      @click="cancelAppointment(appointment.id)"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                    <button
                      v-if="appointment.status === 'en_attente'"
                      class="action-btn edit"
                      @click="navigateToReschedule(appointment.id)"
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Onglet Mes Inscriptions -->
            <div v-if="activeTab === 'inscriptions'" class="inscriptions-tab-content">
              <div class="inscriptions-header">
                <div class="inscriptions-stats">
                  <div class="stat-box">
                    <span class="stat-number">{{ userInscriptions.length }}</span>
                    <span class="stat-label">Total</span>
                  </div>
                  <div class="stat-box">
                    <span class="stat-number">{{ inscriptionsEnAttente.length }}</span>
                    <span class="stat-label">En attente</span>
                  </div>
                  <div class="stat-box">
                    <span class="stat-number">{{ inscriptionsConfirmees.length }}</span>
                    <span class="stat-label">Confirmées</span>
                  </div>
                  <div class="stat-box">
                    <span class="stat-number">{{ inscriptionsAnnulees.length }}</span>
                    <span class="stat-label">Annulées</span>
                  </div>
                </div>
                
                <div class="inscriptions-filters">
                  <button 
                    class="filter-btn" 
                    :class="{ 'active': inscriptionsFilter === 'all' }"
                    @click="inscriptionsFilter = 'all'"
                  >
                    Toutes
                  </button>
                  <button 
                    class="filter-btn" 
                    :class="{ 'active': inscriptionsFilter === 'en_attente' }"
                    @click="inscriptionsFilter = 'en_attente'"
                  >
                    En attente
                  </button>
                  <button 
                    class="filter-btn" 
                    :class="{ 'active': inscriptionsFilter === 'confirmé' }"
                    @click="inscriptionsFilter = 'confirmé'"
                  >
                    Confirmées
                  </button>
                  <button 
                    class="filter-btn" 
                    :class="{ 'active': inscriptionsFilter === 'annulé' }"
                    @click="inscriptionsFilter = 'annulé'"
                  >
                    Annulées
                  </button>
                </div>
                
                <button 
                  @click="refreshInscriptions" 
                  class="refresh-button"
                >
                  <i class="fas fa-sync-alt"></i>
                  Actualiser
                </button>
              </div>
              
              <div v-if="filteredInscriptions.length === 0" class="empty-inscriptions">
                <div class="empty-icon">
                  <i class="fas fa-graduation-cap"></i>
                </div>
                <h3>Aucune inscription</h3>
                <p>Vous n'avez pas encore d'inscription {{ getFilterText(inscriptionsFilter) }}.</p>
                <router-link to="/formations" class="new-inscription-btn">
                  <i class="fas fa-plus"></i>
                  Voir les formations
                </router-link>
              </div>
              
              <div v-else class="inscriptions-grid">
                <div 
                  v-for="inscription in filteredInscriptions" 
                  :key="inscription.id"
                  class="inscription-item"
                  :class="`status-${inscription.statut}`"
                >
                  <div class="inscription-status-badge" :class="`status-${inscription.statut}`">
                    {{ getInscriptionStatusText(inscription.statut) }}
                  </div>
                  
                  <div class="inscription-content">
                    <div class="formation-info">
                      <h4>{{ inscription.formation.titre }}</h4>
                      <p class="formation-description">{{ inscription.formation.description }}</p>
                      
                      <div class="formation-details">
                        <div class="detail-row">
                          <i class="fas fa-calendar-alt"></i>
                          <span>{{ formatDate(inscription.formation.dateDebut) }} - {{ formatDate(inscription.formation.dateFin) }}</span>
                        </div>
                        
                        <div class="detail-row">
                          <i class="fas fa-clock"></i>
                          <span>{{ inscription.formation.heureDebut }} - {{ inscription.formation.heureFin }}</span>
                        </div>
                        
                        <div class="detail-row">
                          <i class="fas fa-map-marker-alt"></i>
                          <span>{{ inscription.formation.lieu }}</span>
                        </div>
                        
                        <div class="detail-row">
                          <i class="fas fa-euro-sign"></i>
                          <span>{{ inscription.formation.prix === 0 ? 'Gratuit' : inscription.formation.prix + '€' }}</span>
                        </div>
                      </div>
                      
                      <div v-if="inscription.notes" class="inscription-notes">
                        <strong>Mes notes :</strong> {{ inscription.notes }}
                      </div>
                    </div>
                    
                    <div class="inscription-meta">
                      <div class="inscription-date">
                        <i class="fas fa-calendar-plus"></i>
                        <span>Inscrit le {{ formatDate(inscription.dateInscription) }}</span>
                      </div>
                      
                      <div class="formation-status" v-if="inscription.formation.statut !== 'active'">
                        <i class="fas fa-info-circle"></i>
                        <span>Formation {{ inscription.formation.statut }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
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

// Configuration globale d'axios pour envoyer les cookies avec toutes les requêtes
axios.defaults.withCredentials = true;

const router = useRouter()
const user = ref(null)
const rendezVousList = ref([])
const userInscriptions = ref([])
const activeTab = ref('info')
const appointmentsFilter = ref('upcoming')
const inscriptionsFilter = ref('all')
const profilePhoto = ref(null)
const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// États pour afficher/masquer les mots de passe
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

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
      // Récupérer les inscriptions après avoir récupéré les données utilisateur
      await fetchUserInscriptions();
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

// Récupérer les inscriptions de l'utilisateur
const fetchUserInscriptions = async () => {
  try {
    if (!user.value) {
      console.log('Utilisateur non connecté, impossible de récupérer les inscriptions');
      return;
    }
    
    console.log('Récupération des inscriptions pour l\'utilisateur ID:', user.value.id);
    const response = await axios.get('http://localhost:3000/formations/user/inscriptions', {
      withCredentials: true
    });
    userInscriptions.value = response.data;
    console.log('Inscriptions récupérées:', response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des inscriptions:', error);
    if (error.response && error.response.status === 401) {
      errorMessage.value = 'Vous devez être connecté pour voir vos inscriptions.';
    } else {
      errorMessage.value = 'Impossible de charger vos inscriptions. Veuillez réessayer plus tard.';
    }
  }
}

// Actualiser les inscriptions
const refreshInscriptions = async () => {
  await fetchUserInscriptions();
}

// Fonctions utilitaires pour les inscriptions
const getInscriptionStatusText = (status) => {
  switch (status) {
    case 'en_attente': return 'En attente';
    case 'confirmé': return 'Confirmée';
    case 'annulé': return 'Annulée';
    default: return status;
  }
}

const getFilterText = (filter) => {
  switch (filter) {
    case 'en_attente': return 'en attente';
    case 'confirmé': return 'confirmées';
    case 'annulé': return 'annulées';
    default: return '';
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

// Mettre à jour le profil utilisateur
const updateProfile = async () => {
  isSubmitting.value = true;
  errorMessage.value = '';
  successMessage.value = '';
  
  try {
    if (!user.value) {
      errorMessage.value = 'Vous devez être connecté pour modifier votre profil.';
      isSubmitting.value = false;
      return;
    }
    
    console.log('Mise à jour du profil pour l\'utilisateur ID:', user.value.id);
    
    // Préparer les données à envoyer
    const updateData = { ...formData.value };
    
    // Vérifier si le mot de passe doit être mis à jour
    if (passwordData.value.newPassword) {
      // Vérifier que les mots de passe correspondent
      if (passwordData.value.newPassword !== passwordData.value.confirmPassword) {
        errorMessage.value = 'Les nouveaux mots de passe ne correspondent pas.';
        isSubmitting.value = false;
        return;
      }
      
      // Vérifier que le mot de passe actuel est fourni
      if (!passwordData.value.currentPassword) {
        errorMessage.value = 'Veuillez saisir votre mot de passe actuel pour le modifier.';
        isSubmitting.value = false;
        return;
      }
      
      // Ajouter les données de mot de passe
      updateData.motDePasse = passwordData.value.newPassword;
      updateData.currentPassword = passwordData.value.currentPassword;
    }
    
    console.log('Données à envoyer:', updateData);
    
    // Envoyer la requête de mise à jour avec authentification
    const response = await axios.patch(`http://localhost:3000/users/${user.value.id}`, updateData, {
      withCredentials: true
    });
    
    console.log('Profil mis à jour avec succès:', response.data);
    
    // Mettre à jour les données utilisateur locales
    user.value = response.data;
    
    // Mettre à jour aussi les données du formulaire
    formData.value = {
      nom: response.data.nom,
      prenom: response.data.prenom,
      email: response.data.email,
      telephone: response.data.telephone,
      adresse: response.data.adresse,
      secteurActivite: response.data.secteurActivite,
      numRegistreCommerce: response.data.numRegistreCommerce
    };
    
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
      console.error('Détails de l\'erreur:', error.response.status, error.response.data);
      
      if (error.response.status === 401) {
        errorMessage.value = 'Vous devez être connecté pour modifier votre profil. Veuillez vous reconnecter.';
      } else if (error.response.status === 403) {
        errorMessage.value = 'Vous n\'avez pas les droits pour modifier ce profil.';
      } else if (error.response.status === 400) {
        errorMessage.value = error.response.data.error || 'Données invalides. Veuillez vérifier vos informations.';
      } else {
        errorMessage.value = error.response.data.error || 'Une erreur est survenue lors de la mise à jour du profil.';
      }
    } else if (error.request) {
      errorMessage.value = 'Le serveur ne répond pas. Veuillez vérifier votre connexion et réessayer.';
    } else {
      errorMessage.value = 'Erreur lors de la préparation de la requête. Veuillez réessayer.';
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

// Filtrer les inscriptions selon le filtre actif
const filteredInscriptions = computed(() => {
  if (!userInscriptions.value.length) return [];
  
  if (inscriptionsFilter.value === 'all') {
    return [...userInscriptions.value].sort((a, b) => new Date(b.dateInscription) - new Date(a.dateInscription));
  }
  
  return userInscriptions.value
    .filter(inscription => inscription.statut === inscriptionsFilter.value)
    .sort((a, b) => new Date(b.dateInscription) - new Date(a.dateInscription));
})

// Computed pour les statistiques des inscriptions
const inscriptionsEnAttente = computed(() => 
  userInscriptions.value.filter(inscription => inscription.statut === 'en_attente')
)

const inscriptionsConfirmees = computed(() => 
  userInscriptions.value.filter(inscription => inscription.statut === 'confirmé')
)

const inscriptionsAnnulees = computed(() => 
  userInscriptions.value.filter(inscription => inscription.statut === 'annulé')
)

onMounted(() => {
  fetchUserData();
})
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  background: #f8fafc;
}

/* Section héro avec dégradé */
.hero-gradient-section {
  position: relative;
  height: 320px;
  overflow: hidden;
  margin-bottom: -80px;
}

.hero-gradient-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #00E676 0%, #00BCD4 50%, #9C27B0 100%);
  opacity: 0.9;
}

.profile-hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
}

.profile-avatar-circle {
  width: 120px;
  height: 120px;
  border-radius: 40%;
  overflow: hidden;
  position: relative;
  margin-bottom: 1.5rem;
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.avatar-inner {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.avatar-initials {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  color: white;
  font-size: 2.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.online-indicator {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #4CAF50;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.profile-info {
  text-align: center;
  color: white;
}

.profile-name {
  font-size: 1.8rem;
  font-weight: 600;
  color: white;
  margin: 0 0 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-email {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 0.3rem;
}

.profile-member-since {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

/* Section principale */
.main-content-section {
  flex: 1;
  padding: 0 0 4rem;
  position: relative;
  z-index: 1;
  margin-top: 120px;
}

.profile-card {
  background: white;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  margin: 0 auto;
  max-width: 1000px;
  min-height: 600px;
}

/* Navigation onglets */
.tabs-navigation {
  display: flex;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  padding: 0 2rem;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1.2rem 2rem;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  font-size: 1rem;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  position: relative;
}

.tab-button.active {
  color: #3b82f6;
  border-bottom-color: #3b82f6;
  background: white;
  font-weight: 600;
}

.tab-button:hover:not(.active) {
  color: #475569;
  background: rgba(59, 130, 246, 0.05);
}

.tab-button i {
  font-size: 1rem;
}

/* Contenu des onglets */
.tab-content-area {
  padding: 3rem 2rem;
  background: white;
  min-height: 500px;
}

.info-tab-content {
  max-width: 800px;
  margin: 0 auto;
}

/* Formulaire moderne */
.modern-profile-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 0;
}

.input-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #374151;
  font-size: 0.95rem;
  margin: 0;
}

.input-label i {
  color: #6b7280;
  font-size: 1rem;
}

.modern-form-input {
  width: 100%;
  padding: 1rem 1.2rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #fafbfc;
  color: #374151;
}

.modern-form-input:focus {
  outline: none;
  border-color: #3b82f6;
  background: white;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  transform: translateY(-1px);
}

.readonly-input {
  background: #f1f5f9 !important;
  color: #64748b !important;
  cursor: not-allowed;
}

.input-hint {
  font-size: 0.8rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

/* Section mot de passe */
.password-change-section {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 2rem;
  margin-top: 2rem;
}

.section-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-title::before {
  content: '🔒';
  font-size: 1.2rem;
}

.password-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-input {
  padding-right: 3rem !important;
}

.password-toggle {
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.password-toggle:hover {
  background: #f3f4f6;
  color: #374151;
}

/* Bouton de sauvegarde */
.form-actions {
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
}

.save-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.save-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
  background: linear-gradient(135deg, #2563eb, #1e40af);
}

.save-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
}

/* Onglet rendez-vous */
.appointments-tab-content {
  max-width: 900px;
  margin: 0 auto;
}

.appointments-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.appointments-filters {
  display: flex;
  gap: 0.5rem;
  background: #f1f5f9;
  padding: 0.3rem;
  border-radius: 12px;
}

.filter-btn {
  padding: 0.7rem 1.2rem;
  background: transparent;
  border: none;
  border-radius: 10px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 0.9rem;
}

.filter-btn.active {
  background: #3b82f6;
  color: white;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
}

.filter-btn:hover:not(.active) {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.refresh-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.2rem;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2);
}

.refresh-button:hover {
  background: #059669;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

/* État vide */
.empty-appointments {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-icon {
  font-size: 4rem;
  color: #d1d5db;
  margin-bottom: 1rem;
}

.empty-appointments h3 {
  font-size: 1.5rem;
  color: #374151;
  margin: 0 0 0.5rem;
  font-weight: 600;
}

.empty-appointments p {
  color: #6b7280;
  margin: 0 0 2rem;
  font-size: 1rem;
}

.new-appointment-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.new-appointment-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
}

/* Grille des rendez-vous */
.appointments-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.appointment-item {
  display: flex;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.appointment-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-color: #d1d5db;
}

.appointment-date-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  padding: 1.5rem;
  min-width: 100px;
  border-right: 1px solid #e5e7eb;
}

.date-day {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1;
}

.date-month {
  font-size: 0.8rem;
  color: #6b7280;
  text-transform: uppercase;
  font-weight: 600;
  margin-top: 0.25rem;
}

.appointment-info {
  flex: 1;
  padding: 1.5rem;
}

.appointment-info h4 {
  margin: 0 0 0.8rem;
  font-size: 1.2rem;
  color: #1f2937;
  font-weight: 600;
}

.appointment-time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 0.8rem;
}

.appointment-status {
  display: inline-block;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
}

.status-en_attente {
  background: #fef3c7;
  color: #92400e;
}

.status-confirmé {
  background: #d1fae5;
  color: #065f46;
}

.status-annulé {
  background: #fee2e2;
  color: #991b1b;
}

.appointment-notes {
  margin: 0;
  color: #6b7280;
  font-size: 0.9rem;
  font-style: italic;
}

.appointment-actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.5rem;
  gap: 0.5rem;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.action-btn.cancel {
  background: #fee2e2;
  color: #dc2626;
}

.action-btn.cancel:hover {
  background: #fecaca;
  transform: scale(1.1);
}

.action-btn.edit {
  background: #dbeafe;
  color: #2563eb;
}

.action-btn.edit:hover {
  background: #bfdbfe;
  transform: scale(1.1);
}

/* Notifications */
.notification {
  position: fixed;
  top: 120px;
  right: 20px;
  max-width: 400px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.notification.success {
  border-left: 4px solid #10b981;
}

.notification.error {
  border-left: 4px solid #ef4444;
}

.notification.success i {
  color: #10b981;
}

.notification.error i {
  color: #ef4444;
}

.notification span {
  flex: 1;
  color: #374151;
  font-weight: 500;
}

.close-notification {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.close-notification:hover {
  background: #f3f4f6;
  color: #6b7280;
}

/* Animations */
.notification-enter-active, .notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

/* Styles pour les inscriptions */
.inscriptions-tab-content {
  padding: 0;
}

.inscriptions-header {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  border-bottom: 1px solid #f3f4f6;
  background: #fafbfc;
}

.inscriptions-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
}

.stat-box {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  transition: transform 0.2s ease;
}

.stat-box:hover {
  transform: translateY(-2px);
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.inscriptions-filters {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.empty-inscriptions {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-inscriptions .empty-icon {
  font-size: 4rem;
  color: #d1d5db;
  margin-bottom: 1rem;
}

.empty-inscriptions h3 {
  margin: 0 0 0.5rem;
  color: #374151;
  font-size: 1.25rem;
}

.empty-inscriptions p {
  color: #6b7280;
  margin: 0 0 1.5rem;
}

.new-inscription-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.new-inscription-btn:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.inscriptions-grid {
  padding: 2rem;
  display: grid;
  gap: 1.5rem;
}

.inscription-item {
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
}

.inscription-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.inscription-item.status-en_attente {
  border-left: 4px solid #f59e0b;
}

.inscription-item.status-confirmé {
  border-left: 4px solid #10b981;
}

.inscription-item.status-annulé {
  border-left: 4px solid #ef4444;
}

.inscription-status-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.inscription-status-badge.status-en_attente {
  background: #fef3c7;
  color: #92400e;
}

.inscription-status-badge.status-confirmé {
  background: #d1fae5;
  color: #065f46;
}

.inscription-status-badge.status-annulé {
  background: #fee2e2;
  color: #991b1b;
}

.inscription-content {
  padding: 1.5rem;
}

.formation-info h4 {
  margin: 0 0 0.5rem;
  color: #1f2937;
  font-size: 1.1rem;
  font-weight: 600;
  padding-right: 6rem; /* Pour laisser de la place au badge de statut */
}

.formation-description {
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0 0 1rem;
}

.formation-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #374151;
  font-size: 0.85rem;
}

.detail-row i {
  width: 14px;
  color: #9ca3af;
}

.inscription-notes {
  background: #f8fafc;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
  border-left: 3px solid #3b82f6;
}

.inscription-notes strong {
  color: #374151;
  font-size: 0.85rem;
}

.inscription-meta {
  border-top: 1px solid #f3f4f6;
  padding-top: 1rem;
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.inscription-date,
.formation-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.8rem;
}

.inscription-date i,
.formation-status i {
  color: #9ca3af;
}

/* Responsive Design */
@media (max-width: 992px) {
  .hero-gradient-section {
    height: 280px;
    margin-bottom: -60px;
  }
  
  .profile-avatar-circle {
    width: 100px;
    height: 100px;
  }
  
  .avatar-initials {
    font-size: 2rem;
  }
  
  .profile-name {
    font-size: 1.5rem;
  }
  
  .tabs-navigation {
    flex-direction: column;
    padding: 1rem;
    gap: 0.5rem;
  }
  
  .tab-button {
    border-bottom: none;
    border-radius: 10px;
    padding: 1rem;
  }
  
  .tab-button.active {
    background: #3b82f6;
    color: white;
  }
  
  .tab-content-area {
    padding: 2rem 1.5rem;
  }
}

@media (max-width: 768px) {
  .hero-gradient-section {
    height: 250px;
    margin-bottom: -40px;
  }
  
  .main-content-section {
    padding: 0 0 2rem;
  }
  
  .profile-card {
    border-radius: 16px 16px 0 0;
    margin: 0 1rem;
  }
  
  .form-row {
    flex-direction: column;
    gap: 1rem;
  }
  
  .appointments-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .inscriptions-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    padding: 1.5rem;
  }
  
  .inscriptions-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .inscriptions-filters {
    justify-content: center;
  }
  
  .appointments-filters {
    justify-content: center;
  }
  
  .appointment-item {
    flex-direction: column;
  }
  
  .appointment-date-block {
    flex-direction: row;
    justify-content: space-between;
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
    padding: 1rem 1.5rem;
  }
  
  .appointment-actions {
    flex-direction: row;
    justify-content: center;
    padding: 1rem 1.5rem;
  }
  
  .action-btn {
    width: 50px;
    height: 45px;
  }
  
  .notification {
    right: 1rem;
    left: 1rem;
    max-width: none;
  }
  
  .inscriptions-grid {
    padding: 1.5rem;
  }
  
  .formation-details {
    grid-template-columns: 1fr;
  }
  
  .inscription-meta {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 640px) {
  .tab-content-area {
    padding: 1.5rem 1rem;
  }
  
  .password-change-section {
    padding: 1.5rem;
  }
  
  .save-button {
    width: 100%;
    justify-content: center;
  }
  
  .form-actions {
    justify-content: stretch;
  }
}
</style> 