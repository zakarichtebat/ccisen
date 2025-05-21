<template>
  <div class="home">
    <!-- En-tête du site -->
    <TheHeader />
    
    <!-- Section Hero - Première impression du visiteur -->
    <section class="hero" id="hero">
      <div class="hero-background">
        <div class="hero-overlay"></div>
        <div class="hero-pattern"></div>
      </div>
      <div class="container">
        <div class="hero-content">
          <!-- Titre principal avec animation de fondu -->
          <h1 class="animate-fade-in">Chambre de Commerce de Nador</h1>
          
          <!-- Sous-titre avec animation de fondu retardé -->
          <p class="animate-fade-in-delay">Votre partenaire de confiance pour le développement économique de la région de Nador</p>
          
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
        <div class="section-divider">
          <span class="divider-line"></span>
        </div>
        
        <!-- Grille de services -->
        <div class="services-grid">
          <!-- Carte service 1 - Accompagnement des entreprises -->
          <div class="service-card animate-slide-up">
            <div class="service-icon">
              <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" stroke="currentColor" stroke-width="2" stroke-miterlimit="10">
                  <path d="M10 10h44v44H10z"></path>
                  <path d="M18 46V26M26 46V20M34 46V30M42 46V34M18 26l8-6 8 10 8-4"></path>
                </g>
              </svg>
            </div>
            <h3>Accompagnement des Entreprises</h3>
            <p>Assistance, conseil et orientation pour le développement de votre activité</p>
            <div class="service-overlay">
              <router-link to="/services/accompagnement" class="service-btn">En savoir plus</router-link>
            </div>
          </div>
          
          <!-- Carte service 2 - Certificats et documents -->
          <div class="service-card animate-slide-up-delay">
            <div class="service-icon">
              <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" stroke="currentColor" stroke-width="2" stroke-miterlimit="10">
                  <path d="M44 5H9v54h46V16z"></path>
                  <path d="M44 5v11h11M22 25h20M22 33h20M22 41h20"></path>
                </g>
              </svg>
            </div>
            <h3>Certificats et Documents</h3>
            <p>Certificats d'origine, attestations professionnelles et visas de documents commerciaux</p>
            <div class="service-overlay">
              <router-link to="/services/certificats" class="service-btn">En savoir plus</router-link>
            </div>
          </div>
          
          <!-- Carte service 3 - Formation -->
          <div class="service-card animate-slide-up-delay-2">
            <div class="service-icon">
              <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" stroke="currentColor" stroke-width="2" stroke-miterlimit="10">
                  <path d="M32 7L5 21l27 14 27-14z"></path>
                  <path d="M14 27v15l18 9 18-9V27M32 35v16"></path>
                  <path d="M49 44c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1z"></path>
                </g>
              </svg>
            </div>
            <h3>Formation</h3>
            <p>Programmes de formation adaptés aux besoins des commerçants et entrepreneurs</p>
            <div class="service-overlay">
              <router-link to="/services/formation" class="service-btn">En savoir plus</router-link>
            </div>
          </div>

          <!-- Carte service 4 - Promotion et Export -->
         
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
      <div class="cta-background">
        <div class="cta-pattern"></div>
      </div>
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

/* Arrière-plan avec dégradé et image */
.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(44, 62, 80, 0.85), rgba(52, 152, 219, 0.85));
  background-size: cover;
  background-position: center;
  z-index: 1;
}

.hero-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/m1.jpg');
  background-size: cover;
  background-position: center;
  opacity: 10;
  filter: blur(1px);
  z-index: 0;
}

.hero-content {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  text-align: center;
}

.hero h1 {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.5px;
  line-height: 1.2;
  background: linear-gradient(45deg, #ffffff, #e0e0e0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero p {
  font-size: 1.5rem;
  margin-bottom: 2.5rem;
  opacity: 0.95;
  font-weight: 400;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

.hero .cta-button {
  display: inline-block;
  padding: 1.1rem 2.8rem;
  background: linear-gradient(45deg, #4CAF50, #2196F3);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
  border: none;
  position: relative;
  overflow: hidden;
}

.hero .cta-button::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #2196F3, #4CAF50);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.6s cubic-bezier(0.19, 1, 0.22, 1);
}

.hero .cta-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.hero .cta-button:hover::after {
  opacity: 1;
}

.hero .secondary-button {
  display: inline-block;
  padding: 1.1rem 2.8rem;
  background-color: transparent;
  color: white;
  text-decoration: none;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.hero .secondary-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  z-index: -1;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
}

.hero .secondary-button:hover {
  border-color: rgba(255, 255, 255, 0.8);
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.hero .secondary-button:hover::before {
  transform: scaleX(1);
  transform-origin: left;
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
  transition: all 0.3s ease;
  font-weight: 500;
}

.scroll-indicator:hover {
  opacity: 1;
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

/* Animations */
.animate-fade-in {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

.animate-fade-in-delay {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 1s cubic-bezier(0.165, 0.84, 0.44, 1) 0.3s forwards;
}

.animate-fade-in-delay-2 {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 1s cubic-bezier(0.165, 0.84, 0.44, 1) 0.6s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.8rem;
  }

  .hero p {
    font-size: 1.2rem;
    padding: 0 20px;
  }

  .hero-buttons {
    flex-direction: column;
    gap: 1rem;
    padding: 0 20px;
  }
  
  .hero .cta-button, 
  .hero .secondary-button {
    padding: 1rem 2rem;
  }
}

/* ===== Section Services ===== */
.services {
  padding: 8rem 0;
  background-color: #f8f9fa;
  position: relative;
  overflow: hidden;
}

.services::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.03) 0%, rgba(33, 150, 243, 0.03) 100%);
  z-index: 0;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  position: relative;
  font-weight: 700;
}

.section-divider {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4rem;
}

.divider-line {
  position: relative;
  width: 80px;
  height: 4px;
  background: linear-gradient(45deg, #4CAF50, #2196F3);
  border-radius: 2px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  width: 100%;
  position: relative;
  z-index: 1;
}

.service-card {
  background: white;
  padding: 3rem 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid rgba(0, 0, 0, 0.03);
  transform: translateY(0);
}

.service-card:hover {
  transform: translateY(-15px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: rgba(76, 175, 80, 0.2);
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, #4CAF50, #2196F3);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s ease;
}

.service-card:hover::before {
  transform: scaleX(1);
}

.service-icon {
  width: 80px;
  height: 80px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  color: #4CAF50;
  transition: all 0.5s ease;
}

.service-card:hover .service-icon {
  color: #2196F3;
  transform: scale(1.1);
}

.service-icon svg {
  width: 100%;
  height: 100%;
  transition: all 0.5s ease;
}

.service-card:hover .service-icon svg {
  filter: drop-shadow(0 0 5px rgba(33, 150, 243, 0.5));
}

.service-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}

.service-card:hover h3 {
  color: #2196F3;
}

.service-card p {
  color: #666;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
  line-height: 1.6;
}

/* Overlay au survol avec bouton d'action */
.service-overlay {
  position: absolute;
  bottom: -60px;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(255, 255, 255, 0.9), transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.service-card:hover .service-overlay {
  opacity: 1;
  bottom: 0;
}

.service-btn {
  padding: 0.8rem 1.5rem;
  background: linear-gradient(45deg, #4CAF50, #2196F3);
  color: white;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
  box-shadow: 0 5px 15px rgba(33, 150, 243, 0.3);
}

.service-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #2196F3, #4CAF50);
  z-index: -1;
  opacity: 0;
  transition: all 0.4s ease;
}

.service-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(33, 150, 243, 0.4);
}

.service-btn:hover::before {
  opacity: 1;
}

/* Animations améliorées */
.animate-slide-up {
  opacity: 0;
  transform: translateY(50px);
  animation: enhancedSlideUp 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

.animate-slide-up-delay {
  opacity: 0;
  transform: translateY(50px);
  animation: enhancedSlideUp 1s cubic-bezier(0.165, 0.84, 0.44, 1) 0.2s forwards;
}

.animate-slide-up-delay-2 {
  opacity: 0;
  transform: translateY(50px);
  animation: enhancedSlideUp 1s cubic-bezier(0.165, 0.84, 0.44, 1) 0.4s forwards;
}

.animate-slide-up-delay-3 {
  opacity: 0;
  transform: translateY(50px);
  animation: enhancedSlideUp 1s cubic-bezier(0.165, 0.84, 0.44, 1) 0.6s forwards;
}

@keyframes enhancedSlideUp {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  20% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive design */
@media (max-width: 992px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin: 0 auto;
  }
  .service-card {
    padding: 2.5rem 1.5rem;
  }
  .service-icon {
    width: 70px;
    height: 70px;
  }
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
  margin-bottom: 0; /* Suppression de la marge */
}

.cta-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #4CAF50, #2196F3);
  z-index: -1;
  overflow: hidden;
}

.cta-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.5;
  animation: patternMove 50s linear infinite;
}

@keyframes patternMove {
  0% { background-position: 0 0; }
  100% { background-position: 500px 500px; }
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  padding: 0 20px;
}

.cta-content h2 {
  font-size: 3.2rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transform: translateY(20px);
  opacity: 0;
  animation: fadeInUp 1s ease forwards;
}

.cta-content p {
  font-size: 1.5rem;
  margin-bottom: 2.5rem;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 1s ease 0.3s forwards;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.cta-button {
  display: inline-block;
  padding: 1.2rem 3rem;
  background-color: white;
  color: #2196F3;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.2rem;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
  border: 2px solid transparent;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 1s ease 0.6s forwards;
  position: relative;
  overflow: hidden;
}

.cta-button::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(76, 175, 80, 0.1), rgba(33, 150, 243, 0.1));
  z-index: -1;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
}

.cta-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  color: #4CAF50;
}

.cta-button:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.pulse-animation {
  position: relative;
}

.pulse-animation::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50px;
  box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  animation: pulse 2s infinite cubic-bezier(0.66, 0, 0, 1);
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
}

/* ===== Animations ===== */


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
    font-size: 2.5rem;
  }
  
  .cta-content p {
    font-size: 1.2rem;
  }
  
  .cta-button {
    padding: 1rem 2.5rem;
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