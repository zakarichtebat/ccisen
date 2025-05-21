<template>
  <div class="home">
    <!-- En-tête du site -->
    <TheHeader />
    
    <!-- Section Hero - Première impression du visiteur -->
    <section class="hero" id="hero">
      <div class="hero-background"></div>
      <div class="container">
        <div class="hero-content">
          <!-- Titre principal avec animation de fondu -->
          <h1 class="animate-fade-in">Bienvenue sur CCISN</h1>
          
          <!-- Sous-titre avec animation de fondu retardé -->
          <p class="animate-fade-in-delay">Votre partenaire de confiance pour le développement de votre entreprise</p>
          
          <!-- Boutons d'action avec animation de fondu et délai plus long -->
          <div class="hero-buttons animate-fade-in-delay-2">
            <router-link to="/services" class="cta-button pulse-animation">Découvrir nos services</router-link>
            <router-link to="/contact" class="secondary-button">Nous contacter</router-link>
          </div>
        </div>
      </div>
      
      <!-- Indicateur de défilement -->
      <div class="scroll-indicator animate-bounce">
        <span>Découvrir</span>
        <i class="arrow-down"></i>
      </div>
    </section>

    <!-- Section Services - Présentation des services proposés -->
    <section class="services" id="services">
      <div class="container">
        <!-- Titre de section avec animation au défilement -->
        <h2 class="section-title animate-on-scroll">Nos Services</h2>
        
        <!-- Grille de services -->
        <div class="services-grid">
          <!-- Carte service 1 - Consultation -->
          <div class="service-card animate-slide-up">
            <div class="service-icon">📊</div>
            <h3>Consultation</h3>
            <p>Conseils stratégiques pour le développement de votre entreprise</p>
            <div class="service-overlay">
              <router-link to="/services/consultation" class="service-btn">En savoir plus</router-link>
            </div>
          </div>
          
          <!-- Carte service 2 - Réseau -->
          <div class="service-card animate-slide-up-delay">
            <div class="service-icon">🤝</div>
            <h3>Réseau</h3>
            <p>Accès à un réseau professionnel étendu</p>
            <div class="service-overlay">
              <router-link to="/services/reseau" class="service-btn">En savoir plus</router-link>
            </div>
          </div>
          
          <!-- Carte service 3 - Formation -->
          <div class="service-card animate-slide-up-delay-2">
            <div class="service-icon">📈</div>
            <h3>Formation</h3>
            <p>Programmes de formation adaptés à vos besoins</p>
            <div class="service-overlay">
              <router-link to="/services/formation" class="service-btn">En savoir plus</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Caractéristiques - Pourquoi nous choisir -->
    <section class="features" id="features">
      <div class="container">
        <div class="feature-content">
          <!-- Texte descriptif avec animation de défilement latéral -->
          <div class="feature-text animate-on-scroll-right">
            <h2>Pourquoi nous choisir ?</h2>
            <ul class="feature-list">
              <li><span class="check-mark">✓</span> Expertise reconnue</li>
              <li><span class="check-mark">✓</span> Accompagnement personnalisé</li>
              <li><span class="check-mark">✓</span> Solutions innovantes</li>
              <li><span class="check-mark">✓</span> Réseau professionnel étendu</li>
            </ul>
            <router-link to="/about" class="learn-more-btn">En savoir plus sur nous</router-link>
          </div>
          
          <!-- Image ou placeholder avec animation de défilement latéral -->
          <div class="feature-image animate-on-scroll-left">
            <div class="placeholder-image">
              <div class="placeholder-content">
                <span class="placeholder-icon">🏢</span>
                <h3>CCISN</h3>
                <p>Votre partenaire de confiance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section d'appel à l'action - Encourager l'inscription -->
    <section class="cta-section" id="cta">
      <div class="cta-background"></div>
      <div class="container">
        <!-- Contenu CTA avec animation de fondu -->
        <div class="cta-content animate-on-scroll">
          <h2>Prêt à développer votre entreprise ?</h2>
          <p>Rejoignez-nous dès aujourd'hui et bénéficiez de nos services exclusifs</p>
          <router-link to="/register" class="cta-button pulse-animation">Commencer maintenant</router-link>
        </div>
      </div>
    </section>

    <!-- Pied de page -->
    <TheFooter />
  </div>
</template>

<script setup>
// Importation des composants et fonctionnalités nécessaires
import { ref, onMounted, onUnmounted } from 'vue'   // Pour la réactivité et les hooks du cycle de vie
import { useRouter } from 'vue-router'              // Pour la navigation entre les pages
import TheHeader from '@/components/TheHeader.vue'  // Composant d'en-tête
import TheFooter from '@/components/TheFooter.vue'  // Composant de pied de page

// Initialisation du router pour la navigation
const router = useRouter()

// Variables réactives
const user = ref(null)  // Stocke les informations de l'utilisateur connecté

/**
 * Observer pour les animations au défilement
 * Détecte quand les éléments entrent dans la vue pour déclencher les animations
 */
let scrollObserver = null

/**
 * Hook exécuté au montage du composant
 * Récupère les données utilisateur et configure l'observer pour les animations au défilement
 */
onMounted(() => {
  // Récupération des données utilisateur du localStorage
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
  }
  
  // Configuration de l'Intersection Observer pour les animations au défilement
  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Si l'élément entre dans la vue
      if (entry.isIntersecting) {
        // Ajouter la classe visible pour déclencher l'animation
        entry.target.classList.add('visible');
        // Arrêter d'observer cet élément après l'animation
        scrollObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 }); // Déclencher quand 15% de l'élément est visible
  
  // Observer tous les éléments avec les classes d'animation au défilement
  document.querySelectorAll('.animate-on-scroll, .animate-on-scroll-right, .animate-on-scroll-left').forEach(el => {
    scrollObserver.observe(el);
  });
})

/**
 * Hook exécuté au démontage du composant
 * Nettoie l'observer pour éviter les fuites de mémoire
 */
onUnmounted(() => {
  // Déconnecter l'observer si présent
  if (scrollObserver) {
    scrollObserver.disconnect();
  }
})

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
/* ===== Styles généraux ===== */
.home {
  min-height: 100vh;
  overflow-x: hidden; /* Empêcher le défilement horizontal */
  width: 100%;
  position: relative;
  margin: 0;
  padding: 0;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
}

/* ===== Section Hero ===== */
.hero {
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  overflow: hidden;
  width: 100%;
}

/* Arrière-plan avec dégradé */
.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #2c3e50, #3498db);
  z-index: -1;
}

.hero-content {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.hero h1 {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.hero p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  font-weight: 300;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

/* Indicateur de défilement */
.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-size: 0.9rem;
  opacity: 0.8;
  cursor: pointer;
}

.arrow-down {
  display: block;
  width: 20px;
  height: 20px;
  margin-top: 10px;
  border-right: 3px solid white;
  border-bottom: 3px solid white;
  transform: rotate(45deg);
}

/* Animation de rebond */
.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
  40% { transform: translateY(-10px) translateX(-50%); }
  60% { transform: translateY(-5px) translateX(-50%); }
}

/* ===== Section Services ===== */
.services {
  padding: 8rem 0;
  background-color: #f8f9fa;
  position: relative;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 4rem;
  color: #2c3e50;
  position: relative;
}

.section-title:after {
  content: '';
  position: absolute;
  width: 80px;
  height: 4px;
  background: linear-gradient(45deg, #4CAF50, #2196F3);
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 2px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  width: 100%;
}

.service-card {
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.service-card:hover {
  transform: translateY(-15px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.service-icon {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  display: inline-block;
  position: relative;
  z-index: 1;
}

.service-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
  position: relative;
  z-index: 1;
}

.service-card p {
  color: #666;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

/* Overlay au survol avec bouton d'action */
.service-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.9), rgba(33, 150, 243, 0.9));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.4s ease;
  border-radius: 15px;
}

.service-card:hover .service-overlay {
  opacity: 1;
  transform: scale(1);
}

.service-btn {
  padding: 0.8rem 1.5rem;
  background-color: white;
  color: #4CAF50;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  transform: translateY(20px);
  opacity: 0;
}

.service-card:hover .service-btn {
  transform: translateY(0);
  opacity: 1;
  transition-delay: 0.1s;
}

.service-btn:hover {
  background-color: #2c3e50;
  color: white;
  transform: scale(1.05);
}

/* ===== Section Caractéristiques ===== */
.features {
  padding: 8rem 0;
  background-color: white;
  width: 100%;
  overflow: hidden;
}

.feature-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 100%;
}

.feature-text h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #2c3e50;
  position: relative;
}

.feature-text h2:after {
  content: '';
  position: absolute;
  width: 60px;
  height: 3px;
  background: linear-gradient(45deg, #4CAF50, #2196F3);
  bottom: -10px;
  left: 0;
  border-radius: 2px;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
}

.feature-list li {
  margin: 1.2rem 0;
  padding-left: 0;
  position: relative;
  font-size: 1.1rem;
  color: #555;
  display: flex;
  align-items: center;
}

.check-mark {
  color: #4CAF50;
  font-weight: bold;
  margin-right: 10px;
  font-size: 1.2rem;
}

.learn-more-btn {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: transparent;
  color: #2c3e50;
  border: 2px solid #4CAF50;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.learn-more-btn:hover {
  background-color: #4CAF50;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
}

.feature-image {
  width: 100%;
  max-width: 100%;
}

.placeholder-image {
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  transition: all 0.4s ease;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
}

.placeholder-image:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.placeholder-image:before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: rotate(45deg);
  animation: shimmer 5s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%) rotate(45deg); }
  100% { transform: translateX(100%) rotate(45deg); }
}

.placeholder-content {
  color: #2c3e50;
  position: relative;
  z-index: 1;
}

.placeholder-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  display: block;
}

.placeholder-content h3 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(45deg, #4CAF50, #2196F3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.placeholder-content p {
  font-size: 1.2rem;
  color: #666;
}

/* ===== Section CTA ===== */
.cta-section {
  padding: 7rem 0;
  position: relative;
  color: white;
  text-align: center;
  overflow: hidden;
}

.cta-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #4CAF50, #2196F3);
  z-index: -1;
}

.cta-background:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
  opacity: 0.5;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  padding: 0 20px;
}

.cta-content h2 {
  font-size: 2.8rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.cta-content p {
  font-size: 1.3rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

/* ===== Boutons ===== */
.cta-button {
  display: inline-block;
  padding: 1rem 2.5rem;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  border: 2px solid transparent;
  font-size: 1.1rem;
}

.cta-button:hover {
  background-color: #45a049;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.cta-button:active {
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

.secondary-button {
  display: inline-block;
  padding: 1rem 2.5rem;
  background-color: transparent;
  color: white;
  text-decoration: none;
  border: 2px solid white;
  border-radius: 50px;
  font-weight: 500;
  transition: all 0.3s ease;
  font-size: 1.1rem;
}

.secondary-button:hover {
  background-color: white;
  color: #2c3e50;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(255, 255, 255, 0.3);
}

.secondary-button:active {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(255, 255, 255, 0.2);
}

/* Animation de pulsation pour les boutons importants */
.pulse-animation {
  position: relative;
  overflow: visible !important;
}

.pulse-animation:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50px;
  box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7); }
  70% { box-shadow: 0 0 0 15px rgba(76, 175, 80, 0); }
  100% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0); }
}

/* ===== Animations ===== */
.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-fade-in-delay {
  animation: fadeIn 1s ease-out 0.3s both;
}

.animate-fade-in-delay-2 {
  animation: fadeIn 1s ease-out 0.6s both;
}

.animate-slide-up {
  animation: slideUp 1s ease-out;
}

.animate-slide-up-delay {
  animation: slideUp 1s ease-out 0.3s both;
}

.animate-slide-up-delay-2 {
  animation: slideUp 1s ease-out 0.6s both;
}

.animate-slide-right {
  animation: slideRight 1s ease-out;
}

.animate-slide-left {
  animation: slideLeft 1s ease-out;
}

/* Animations au défilement */
.animate-on-scroll, 
.animate-on-scroll-right, 
.animate-on-scroll-left {
  opacity: 0;
  transition: all 0.8s ease-out;
}

.animate-on-scroll {
  transform: translateY(50px);
}

.animate-on-scroll-right {
  transform: translateX(-50px);
}

.animate-on-scroll-left {
  transform: translateX(50px);
}

.animate-on-scroll.visible, 
.animate-on-scroll-right.visible, 
.animate-on-scroll-left.visible {
  opacity: 1;
  transform: translate(0);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideRight {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideLeft {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* ===== Responsive Design ===== */
@media (max-width: 992px) {
  .feature-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .feature-image {
    order: -1;
  }
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.8rem;
  }

  .hero p {
    font-size: 1.2rem;
  }

  .hero-buttons {
    flex-direction: column;
    gap: 1rem;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin: 0 auto;
  }

  .cta-button, .secondary-button {
    width: 100%;
    margin: 0.5rem 0;
    text-align: center;
  }
  
  .cta-content h2 {
    font-size: 2.2rem;
  }
  
  .cta-content p {
    font-size: 1.1rem;
  }
  
  .services, .features, .cta-section {
    padding: 5rem 0;
  }
  
  .feature-text h2 {
    font-size: 2rem;
  }
  
  .placeholder-image {
    height: 300px;
  }
}

@media (max-width: 480px) {
  .hero h1 {
    font-size: 2.2rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .feature-text h2, .cta-content h2 {
    font-size: 1.8rem;
  }
}
</style> 