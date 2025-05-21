<template>
  <!-- En-tête du site avec effet de défilement -->
  <header class="header" :class="{ 'header-scrolled': isScrolled }">
    <div class="container">
      <!-- Logo du site avec animation au survol -->
      <div class="logo animate-fade-in">
        <router-link to="/">
          <h1>CCISN</h1>
        </router-link>
      </div>
      
      <!-- Menu de navigation principal -->
      <nav class="nav-menu animate-fade-in-delay">
        <!-- Liens de navigation -->
        <router-link to="/" class="nav-link">Accueil</router-link>
        <router-link to="/services" class="nav-link">Services</router-link>
        <router-link to="/about" class="nav-link">À propos</router-link>
        <router-link to="/actualites" class="nav-link">Actualités</router-link>
        <router-link to="/contact" class="nav-link">Contact</router-link>
        
        <!-- Menu utilisateur affiché seulement si connecté -->
        <div v-if="user" class="user-menu">
          <span class="user-name animate-slide-down">{{ user.nom }} {{ user.prenom }}</span>
          <button @click="handleLogout" class="logout-btn animate-slide-up">Déconnexion</button>
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
import { ref, onMounted, onUnmounted } from 'vue'  // Pour la réactivité et les hooks du cycle de vie
import { useRouter } from 'vue-router'             // Pour la navigation entre les pages

// Initialisation du router pour la navigation
const router = useRouter()

// Variables réactives
const user = ref(null)           // Stocke les informations de l'utilisateur connecté
const isScrolled = ref(false)    // Indique si la page a été défilée

/**
 * Hook exécuté au montage du composant
 * Récupère les informations utilisateur du localStorage et configure les écouteurs d'événements
 */
onMounted(() => {
  // Récupération des données utilisateur du localStorage
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
  }
  
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
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  user.value = null
  
  // Redirection vers la page de connexion
  router.push('/login')
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
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Styles pour le logo */
.logo a {
  text-decoration: none;
  color: #2c3e50;
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
  display: flex;
  align-items: center;
  gap: 1rem;
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

/* Styles pour le bouton de déconnexion */
.logout-btn {
  padding: 0.5rem 1rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.logout-btn:hover {
  background-color: #c82333;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(220, 53, 69, 0.3);
}

.logout-btn:active {
  transform: translateY(0);
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