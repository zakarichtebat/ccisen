<template>
  <!-- En-tête du site avec effet de défilement -->
  <header class="header" :class="{ 'header-scrolled': isScrolled }">
    <div class="container">
      <!-- Logo du site avec animation au survol -->
      <div class="logo animate-fade-in">
        <router-link to="/">
          <img src="/images/logoccis-removebg-preview.png" alt="CCISN" class="logo-image">
        </router-link>
      </div>
      
      <!-- Menu de navigation principal -->
      <nav class="nav-menu animate-fade-in-delay">
        <!-- Liens de navigation -->
        <router-link to="/" class="nav-link">Accueil</router-link>
        <router-link to="/services" class="nav-link">Services</router-link>
        <router-link to="/formations" class="nav-link">Formations</router-link>
        <router-link to="/about" class="nav-link">À propos</router-link>
      
        <router-link to="/contact" class="nav-link">Contact</router-link>
   
        <!-- Menu utilisateur affiché seulement si connecté -->
        <div v-if="user" class="user-menu">
          <div class="user-trigger" @click="toggleDropdown">
            <div class="user-avatar">
              <span class="avatar-initials">{{ getUserInitials() }}</span>
            </div>
            <span class="user-name">{{ user.nom }} {{ user.prenom }}</span>
            <i class="fas fa-chevron-down dropdown-arrow" :class="{ 'rotated': isDropdownOpen }"></i>
          </div>
          
          <!-- Menu déroulant -->
          <div v-if="isDropdownOpen" class="dropdown-menu" @click.stop>
            <!-- En-tête du dropdown -->
            <div class="dropdown-header">
              <div class="header-avatar">
                <span class="header-avatar-initials">{{ getUserInitials() }}</span>
              </div>
              <div class="header-info">
                <h4>{{ user.prenom }} {{ user.nom }}</h4>
                <span class="user-role">{{ getUserRole() }}</span>
              </div>
            </div>
            
            <!-- Options du menu -->
            <div class="dropdown-options">
              <router-link to="/profile" class="dropdown-item" @click="closeDropdown">
                <i class="fas fa-user"></i>
                <span>Mon Profil</span>
              </router-link>
             
              
              <router-link v-if="user && user.role === 'administrateur'" to="/admin" class="dropdown-item" @click="closeDropdown">
                <i class="fas fa-shield-alt"></i>
                <span>Administration</span>
              </router-link>
              
             
              
              <router-link to="/notifications" class="dropdown-item" @click="closeDropdown">
                <i class="fas fa-bell"></i>
                <span>Notifications</span>
              </router-link>
              
              <router-link to="/aide" class="dropdown-item" @click="closeDropdown">
                <i class="fas fa-question-circle"></i>
                <span>Aide & Support</span>
              </router-link>
              
              <div class="dropdown-divider"></div>
              
              <button @click="handleLogout" class="dropdown-item logout-item">
                <i class="fas fa-sign-out-alt"></i>
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
          
          <!-- Overlay pour fermer le dropdown -->
          <div v-if="isDropdownOpen" class="dropdown-overlay" @click="closeDropdown"></div>
        </div>
        
        <!-- Boutons d'authentification si non connecté -->
        <div v-else class="auth-buttons">
          <router-link to="/login" class="login-btn animate-slide-down">Connexion</router-link>
          <router-link to="/register" class="register-btn animate-slide-up">Inscription</router-link>
        </div>
      </nav>
      
      <!-- Bouton de menu mobile (à implémenter) -->
      <div class="mobile-menu-btn animate-fade-in-delay">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </header>
</template>

<script setup>
// Importation des composants et fonctionnalités nécessaires
import { ref, computed, onMounted, onUnmounted } from 'vue'  // Pour la réactivité et les hooks du cycle de vie
import { useRouter } from 'vue-router'             // Pour la navigation entre les pages
import axios from 'axios'                          // Pour les requêtes HTTP
import { getLocalStorageItem, removeLocalStorageItem, cleanupAuthData, setLocalStorageItem } from '@/utils/localStorage.js'

// Configuration d'axios pour inclure les cookies dans les requêtes
axios.defaults.withCredentials = true;

// Initialisation du router pour la navigation
const router = useRouter()

// Variables réactives
const user = ref(null)           // Stocke les informations de l'utilisateur connecté
const isScrolled = ref(false)    // Indique si la page a été défilée
const isDropdownOpen = ref(false) // Indique si le dropdown est ouvert

/**
 * Récupère les informations utilisateur depuis l'API
 */
const fetchUserData = async () => {
  try {
    const response = await axios.post('http://localhost:3000/auth/current-user', {}, {
      withCredentials: true
    })
    
    if (response.data.isLoggedIn && response.data.user) {
      user.value = response.data.user
      // Mettre à jour le localStorage avec les données complètes
      setLocalStorageItem('user', response.data.user)
      console.log('Données utilisateur mises à jour:', response.data.user)
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données utilisateur:', error)
  }
}

/**
 * Hook exécuté au montage du composant
 * Récupère les informations utilisateur du localStorage et configure les écouteurs d'événements
 */
onMounted(async () => {
  // Nettoyage des données corrompues
  cleanupAuthData()
  
  // Récupération des données utilisateur du localStorage de manière sécurisée
  user.value = getLocalStorageItem('user')
  
  // Récupérer les données à jour depuis l'API
  await fetchUserData()
  
  // Ajout d'un écouteur pour détecter le défilement de la page
  window.addEventListener('scroll', handleScroll)
})

/**
 * Hook exécuté au démontage du composant
 * Nettoie les écouteurs d'événements pour éviter les fuites de mémoire
 */
onUnmounted(() => {
  // Suppression de l'écouteur de défilement
  window.removeEventListener('scroll', handleScroll)
})

/**
 * Gère l'événement de défilement de la page
 * Met à jour l'état isScrolled selon la position de défilement
 */
const handleScroll = () => {
  // Met à jour isScrolled si la page est défilée de plus de 50px
  isScrolled.value = window.scrollY > 50
}

/**
 * Gère la déconnexion de l'utilisateur
 * Supprime les données d'authentification et redirige vers la page de connexion
 */
const handleLogout = () => {
  // Suppression des données d'authentification
  removeLocalStorageItem('token')
  removeLocalStorageItem('user')
  user.value = null
  
  // Redirection vers la page de connexion
  router.push('/login')
}

/**
 * Gère l'ouverture et la fermeture du dropdown
 */
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

/**
 * Gère la fermeture du dropdown
 */
const closeDropdown = () => {
  isDropdownOpen.value = false
}

/**
 * Retourne les initiales de l'utilisateur
 */
const getUserInitials = () => {
  if (user.value) {
    const name = user.value.nom.toUpperCase()
    const prenom = user.value.prenom.toUpperCase()
    return name.charAt(0) + prenom.charAt(0)
  }
  return ''
}

/**
 * Retourne le rôle de l'utilisateur
 */
const getUserRole = () => {
  if (user.value && user.value.role) {
    // Capitaliser la première lettre du rôle
    return user.value.role.charAt(0).toUpperCase() + user.value.role.slice(1).toLowerCase()
  }
  return 'Utilisateur'
}
</script>

<style scoped>
/* Styles pour l'en-tête */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 1000;
}

/* Style appliqué à l'en-tête lorsque la page est défilée */
.header-scrolled {
  background-color: rgba(255, 255, 255, 0.98);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

/* Conteneur principal de l'en-tête */
.container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 1.2rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Styles pour le logo */
.logo {
  position: relative;
  overflow: hidden;
}

.logo a {
  text-decoration: none;
  color: #2c3e50;
  display: block;
  position: relative;
}

/* Effet de brillance occasionnel */
.logo::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 255, 255, 0.4), 
    transparent
  );
  animation: logoShine 4s ease-in-out infinite;
  z-index: 1;
  pointer-events: none;
}

@keyframes logoShine {
  0%, 90%, 100% {
    left: -100%;
    opacity: 0;
  }
  50% {
    left: 100%;
    opacity: 1;
  }
}

.logo h1 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(45deg, #4CAF50, #2196F3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: transform 0.3s ease, filter 0.3s ease;
}

.logo h1:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}

.logo-image {
  height: 70px;
  width: auto;
  max-width: 500px;
  object-fit: contain;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: logoFloat 3s ease-in-out infinite, logoAppear 1s ease-out;
  transform-origin: center;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.logo-image:hover {
  transform: scale(1.1) rotate(2deg);
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2)) brightness(1.1);
  animation-play-state: paused;
}

/* Animation de flottement subtile */
@keyframes logoFloat {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-3px) rotate(1deg);
  }
  50% {
    transform: translateY(0px) rotate(0deg);
  }
  75% {
    transform: translateY(-2px) rotate(-1deg);
  }
}

/* Animation d'apparition au chargement */
@keyframes logoAppear {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(-20px);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05) translateY(-5px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0px);
  }
}

/* Animation de pulsation au clic */
.logo-image:active {
  animation: logoPulse 0.3s ease-in-out;
}

@keyframes logoPulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}

/* Styles pour le menu de navigation */
.nav-menu {
  display: flex;
  align-items: center;
  gap: 2rem;
}

/* Styles pour les liens de navigation */
.nav-link {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  position: relative;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(45deg, #4CAF50, #2196F3);
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: #4CAF50;
}

.nav-link:hover::after {
  width: 100%;
}

/* Styles pour le lien actif */
.router-link-active {
  color: #4CAF50;
}

.router-link-active::after {
  width: 100%;
}

/* Styles pour le menu utilisateur */
.user-menu {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-trigger {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.user-trigger:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
}

.user-avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.avatar-initials {
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.user-name {
  color: #2c3e50;
  font-weight: 500;
  padding: 0.5rem 1rem;
  background-color: rgba(76, 175, 80, 0.1);
  border-radius: 20px;
  transition: all 0.3s ease;
}

.user-name:hover {
  background-color: rgba(76, 175, 80, 0.2);
}

.dropdown-arrow {
  color: #6b7280;
  font-size: 0.8rem;
  transition: transform 0.3s ease;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

/* Menu déroulant */
.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: 280px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 1001;
  animation: dropdownSlide 0.3s ease-out;
  border: 1px solid #e5e7eb;
}

@keyframes dropdownSlide {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* En-tête du dropdown */
.dropdown-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.header-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.header-avatar-initials {
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.header-info h4 {
  margin: 0 0 0.2rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.user-role {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.85rem;
  font-weight: 400;
}

/* Options du menu */
.dropdown-options {
  padding: 0.5rem 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  color: #374151;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  border: none;
  background: none;
  width: 100%;
  cursor: pointer;
}

.dropdown-item:hover {
  background: #f8fafc;
  color: #1f2937;
}

.dropdown-item i {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-size: 1rem;
}

.dropdown-item:hover i {
  color: #4f46e5;
}

.dropdown-divider {
  height: 1px;
  background: #e5e7eb;
  margin: 0.5rem 0;
}

.logout-item {
  color: #dc2626 !important;
}

.logout-item:hover {
  background: #fef2f2 !important;
  color: #b91c1c !important;
}

.logout-item i {
  color: #dc2626 !important;
}

.logout-item:hover i {
  color: #b91c1c !important;
}

/* Overlay */
.dropdown-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  z-index: 1000;
}

/* Styles pour les boutons d'authentification */
.auth-buttons {
  display: flex;
  gap: 1rem;
}

.login-btn, .register-btn {
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.login-btn {
  color: #4CAF50;
  border: 2px solid #4CAF50;
  background-color: transparent;
}

.register-btn {
  background-color: #4CAF50;
  color: white;
  border: 2px solid transparent;
}

.login-btn:hover {
  background-color: #4CAF50;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(76, 175, 80, 0.3);
}

.register-btn:hover {
  background-color: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(76, 175, 80, 0.3);
}

/* Styles pour le bouton de menu mobile */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 22px;
  cursor: pointer;
}

.mobile-menu-btn span {
  height: 3px;
  width: 100%;
  background-color: #2c3e50;
  border-radius: 3px;
  transition: all 0.3s ease;
}

/* Animations */
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

.animate-fade-in-delay {
  animation: fadeIn 0.5s ease-out 0.2s forwards;
}

.animate-slide-down {
  animation: slideDown 0.5s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Media queries pour le responsive design */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  
  .mobile-menu-btn {
    display: flex;
  }
  
  .container {
    padding: 0.8rem 1.5rem;
  }
}
</style> 