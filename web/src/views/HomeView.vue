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
      <div class="services-background">
        <div class="services-pattern"></div>
      </div>
      <div class="container">
        <!-- En-tête de section moderne avec animations avancées -->
        <div class="services-header animate-on-scroll">
          <div class="services-badge animate-badge-pulse">
            <span class="badge-icon animate-icon-rotate">✨</span>
            <span class="badge-text">Excellence & Innovation</span>
          </div>
          <h2 class="services-title animate-title-reveal">
            
            <span class="title-word highlight-gradient" data-delay="200">Services</span>
          </h2>
          <p class="services-subtitle animate-subtitle-typewriter">
            Des solutions professionnelles de haute qualité, conçues pour propulser votre entreprise vers le succès
          </p>
        </div>
        
        <!-- Grille de services moderne avec animations spectaculaires -->
        <div class="services-grid">
          <!-- Carte service 1 - Accompagnement des entreprises -->
          <div class="service-card premium animate-card-morph" data-delay="0">
            <div class="card-glow"></div>
            <div class="card-particles"></div>
            <div class="card-header">
              <div class="service-badge animate-badge-float">Conseil & Stratégie</div>
              <div class="service-icon animate-icon-3d">
                <div class="icon-wrapper">
                  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <g fill="none" stroke="currentColor" stroke-width="2.5">
                      <path d="M10 10h44v44H10z"></path>
                      <path d="M18 46V26M26 46V20M34 46V30M42 46V34M18 26l8-6 8 10 8-4"></path>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
            
            <div class="card-body">
              <h3 class="service-title animate-text-wave">Accompagnement Stratégique</h3>
              <p class="service-description animate-text-reveal">
                Expertise personnalisée et conseils stratégiques pour accélérer la croissance et optimiser les performances de votre entreprise.
              </p>
              
              <div class="service-features animate-features-cascade">
                <div class="feature-item animate-feature-pop" data-delay="0">
                  <span class="feature-icon animate-icon-bounce">🎯</span>
                  <span>Audit complet & diagnostic</span>
                </div>
                <div class="feature-item animate-feature-pop" data-delay="100">
                  <span class="feature-icon animate-icon-bounce">📈</span>
                  <span>Plan de développement</span>
                </div>
                <div class="feature-item animate-feature-pop" data-delay="200">
                  <span class="feature-icon animate-icon-bounce">🤝</span>
                  <span>Accompagnement personnalisé</span>
                </div>
              </div>
            </div>
            
            <div class="card-footer">
              <router-link to="/services/accompagnement" class="service-cta animate-cta-magnetic">
                <span class="cta-text">Découvrir</span>
                <i class="cta-arrow animate-arrow-slide">→</i>
                <div class="cta-ripple"></div>
              </router-link>
            </div>
          </div>
          

          <!-- Carte service 2 - Formation -->
          <div class="service-card premium animate-card-morph" data-delay="200">
            <div class="card-glow"></div>
            <div class="card-particles"></div>
            <div class="card-header">
              <div class="service-badge animate-badge-float">Formation & Développement</div>
              <div class="service-icon animate-icon-3d">
                <div class="icon-wrapper">
                  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <g fill="none" stroke="currentColor" stroke-width="2.5">
                      <path d="M32 7L5 21l27 14 27-14z"></path>
                      <path d="M14 27v15l18 9 18-9V27M32 35v16"></path>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
            
            <div class="card-body">
              <h3 class="service-title animate-text-wave">Formation Professionnelle</h3>
              <p class="service-description animate-text-reveal">
                Programmes de formation innovants et certifiants, conçus par des experts pour répondre aux défis actuels du marché.
              </p>
              
              <div class="service-features animate-features-cascade">
                <div class="feature-item animate-feature-pop" data-delay="0">
                  <span class="feature-icon animate-icon-bounce">🎓</span>
                  <span>Formations certifiantes</span>
                </div>
                <div class="feature-item animate-feature-pop" data-delay="100">
                  <span class="feature-icon animate-icon-bounce">👨‍🏫</span>
                  <span>Experts reconnus</span>
                </div>
                <div class="feature-item animate-feature-pop" data-delay="200">
                  <span class="feature-icon animate-icon-bounce">📊</span>
                  <span>Suivi personnalisé</span>
                </div>
              </div>
            </div>
            
            <div class="card-footer">
              <router-link to="/services/formation" class="service-cta animate-cta-magnetic">
                <span class="cta-text">Découvrir</span>
                <i class="cta-arrow animate-arrow-slide">→</i>
                <div class="cta-ripple"></div>
              </router-link>
            </div>
          </div>
        </div>
        
        <!-- Section statistiques avec animations spectaculaires -->
        <div class="services-stats animate-on-scroll">
          <div class="stats-background">
            <div class="stats-particles"></div>
            <div class="stats-waves"></div>
          </div>
          <div class="stats-container">
            <div class="stat-card animate-stat-counter" data-delay="0">
              <div class="stat-icon">🏢</div>
              <div class="stat-number" data-target="1200">0</div>
              <div class="stat-plus">+</div>
              <div class="stat-label">Entreprises accompagnées</div>
              <div class="stat-glow"></div>
            </div>
            <div class="stat-card animate-stat-counter" data-delay="200">
              <div class="stat-icon">⭐</div>
              <div class="stat-number" data-target="15">0</div>
              <div class="stat-plus">+</div>
              <div class="stat-label">Années d'expertise</div>
              <div class="stat-glow"></div>
            </div>
            <div class="stat-card animate-stat-counter" data-delay="400">
              <div class="stat-icon">❤️</div>
              <div class="stat-number" data-target="98">0</div>
              <div class="stat-plus">%</div>
              <div class="stat-label">Taux de satisfaction</div>
              <div class="stat-glow"></div>
            </div>
            <div class="stat-card animate-stat-counter" data-delay="600">
              <div class="stat-icon">🎓</div>
              <div class="stat-number" data-target="500">0</div>
              <div class="stat-plus">+</div>
              <div class="stat-label">Formations dispensées</div>
              <div class="stat-glow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Caractéristiques - Pourquoi nous choisir -->
    <section class="why-choose-us" id="features">
      <div class="why-background">
        <div class="why-pattern"></div>
      </div>
      <div class="container">
        <div class="why-content">
          <!-- Contenu principal moderne -->
          <div class="why-main animate-on-scroll-right">
            <div class="why-header">
              <div class="why-badge">
                <span class="badge-icon">⭐</span>
                Services
              </div>
              <h2 class="why-title">Pourquoi faire confiance à CCISN ?</h2>
              <p class="why-subtitle">
                Une expertise reconnue et des solutions innovantes pour propulser votre entreprise vers le succès
              </p>
            </div>

            <div class="advantages-grid">
              <div class="advantage-card">
                <div class="advantage-icon">
                  <div class="icon-container expertise">
                    <span>🎯</span>
                  </div>
                </div>
                <div class="advantage-content">
                  <h4>Expertise Reconnue</h4>
                  <p>Plus de 15 ans d'expérience dans l'accompagnement des entreprises avec des résultats prouvés</p>
                </div>
              </div>

              <div class="advantage-card">
                <div class="advantage-icon">
                  <div class="icon-container personalized">
                    <span>🤝</span>
                  </div>
                </div>
                <div class="advantage-content">
                  <h4>Accompagnement Personnalisé</h4>
                  <p>Solutions sur-mesure adaptées à votre secteur d'activité et vos objectifs spécifiques</p>
                </div>
              </div>

              <div class="advantage-card">
                <div class="advantage-icon">
                  <div class="icon-container innovation">
                    <span>🚀</span>
                  </div>
                </div>
                <div class="advantage-content">
                  <h4>Solutions Innovantes</h4>
                  <p>Technologies de pointe et méthodes modernes pour optimiser vos performances</p>
                </div>
              </div>

              <div class="advantage-card">
                <div class="advantage-icon">
                  <div class="icon-container network">
                    <span>🌐</span>
                  </div>
                </div>
                <div class="advantage-content">
                  <h4>Réseau Professionnel Étendu</h4>
                  <p>Connexions stratégiques et partenariats pour accélérer votre développement</p>
                </div>
              </div>
            </div>

            <div class="why-cta">
              <router-link to="/about" class="premium-btn">
                <span>Découvrir notre histoire</span>
                <div class="btn-arrow">→</div>
              </router-link>
            </div>
          </div>
          
          <!-- Section visuelle moderne -->
          <div class="why-visual animate-on-scroll-left">
            <div class="visual-container">
              <div class="company-showcase">
                <div class="showcase-header">
                  <div class="company-avatar">
                    <span class="avatar-icon">🏢</span>
                  </div>
                  <div class="company-info">
                    <h3 class="company-name">CCISN</h3>
                    <p class="company-tagline">Excellence & Innovation</p>
                  </div>
                </div>
                
                <div class="metrics-display">
                  <div class="metric-item">
                    <div class="metric-value">1200+</div>
                    <div class="metric-label">Entreprises</div>
                  </div>
                  <div class="metric-item">
                    <div class="metric-value">15+</div>
                    <div class="metric-label">Années</div>
                  </div>
                  <div class="metric-item">
                    <div class="metric-value">98%</div>
                    <div class="metric-label">Satisfaction</div>
                  </div>
                </div>

                <div class="trust-indicators">
                  <div class="trust-item">
                    <span class="trust-icon">🏆</span>
                    <span>Certifié Excellence</span>
                  </div>
                  <div class="trust-item">
                    <span class="trust-icon">✅</span>
                    <span>Partenaire Officiel</span>
                  </div>
                  <div class="trust-item">
                    <span class="trust-icon">🔒</span>
                    <span>Sécurité Garantie</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section d'appel à l'action - Encourager l'inscription -->
    <section class="cta-section" id="cta">
      <div class="cta-background">
        <div class="cta-gradient"></div>
        <div class="cta-particles"></div>
        <div class="cta-waves"></div>
      </div>
      <div class="container">
        <!-- Contenu CTA avec animations avancées -->
        <div class="cta-content animate-on-scroll">
          <div class="cta-badge animate-float">
            <span class="badge-icon">🚀</span>
            <span>Transformation Digitale</span>
          </div>
          
          <h2 class="cta-title animate-scale-in">
            Prêt à <span class="highlight-text">révolutionner</span><br>
            votre entreprise ?
          </h2>
          
          <p class="cta-description animate-fade-up">
            Rejoignez notre écosystème d'excellence et bénéficiez d'un accompagnement personnalisé 
            pour propulser votre entreprise vers de nouveaux sommets de réussite.
          </p>
          
          <div class="cta-features animate-slide-up">
            <div class="feature-pill">
              <span class="pill-icon">⚡</span>
              <span>Démarrage rapide</span>
            </div>
            <div class="feature-pill">
              <span class="pill-icon">🛡️</span>
              <span>Accompagnement premium</span>
            </div>
            <div class="feature-pill">
              <span class="pill-icon">📈</span>
              <span>Croissance garantie</span>
            </div>
          </div>
          
          <div class="cta-actions animate-zoom-in">
            <router-link to="/register" class="cta-primary-btn">
              <span class="btn-content">
                <span class="btn-text">Commencer maintenant</span>
                <span class="btn-icon">→</span>
              </span>
              <div class="btn-ripple"></div>
            </router-link>
            
            <router-link to="/contact" class="cta-secondary-btn">
              <span class="btn-content">
                <span class="btn-icon">💬</span>
                <span class="btn-text">Parlons de votre projet</span>
              </span>
            </router-link>
          </div>
          
          <div class="trust-elements animate-fade-in">
            <div class="trust-item">
              <span class="trust-number">1200+</span>
              <span class="trust-label">Entreprises transformées</span>
            </div>
            <div class="separator"></div>
            <div class="trust-item">
              <span class="trust-number">98%</span>
              <span class="trust-label">Taux de réussite</span>
            </div>
            <div class="separator"></div>
            <div class="trust-item">
              <span class="trust-number">15+</span>
              <span class="trust-label">Années d'expertise</span>
            </div>
          </div>
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
import { getLocalStorageItem, removeLocalStorageItem, cleanupAuthData } from '@/utils/localStorage.js'

// Initialisation du router pour la navigation
const router = useRouter()

// Variables réactives
const user = ref(null)  // Stocke les informations de l'utilisateur connecté

/**
 * Variable pour stocker l'observer des animations au défilement
 */
let scrollObserver = null

/**
 * Hook exécuté au montage du composant
 * Récupère les données utilisateur et configure l'observer pour les animations au défilement
 */
onMounted(() => {
  // Nettoyage des données corrompues
  cleanupAuthData()
  
  // Récupération des données utilisateur du localStorage de manière sécurisée
  user.value = getLocalStorageItem('user')
  
  // Configuration de l'Intersection Observer pour les animations au défilement
  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Si l'élément entre dans la vue
      if (entry.isIntersecting) {
        // Ajouter la classe visible pour déclencher l'animation
        entry.target.classList.add('visible');
        
        // Animation de compteur pour les statistiques
        if (entry.target.classList.contains('animate-stat-counter')) {
          animateCounter(entry.target)
        }
        
        // Arrêter d'observer cet élément après l'animation
        scrollObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 }); // Déclencher quand 15% de l'élément est visible
  
  // Observer tous les éléments avec les classes d'animation au défilement
  document.querySelectorAll('.animate-on-scroll, .animate-on-scroll-right, .animate-on-scroll-left, .animate-stat-counter').forEach(el => {
    scrollObserver.observe(el);
  });

  // Initialiser les animations de titre
  initTitleAnimations()
})

/**
 * Animation de compteur pour les statistiques
 */
const animateCounter = (element) => {
  const numberElement = element.querySelector('.stat-number')
  if (!numberElement) return

  const target = parseInt(numberElement.getAttribute('data-target'))
  const duration = 2000 // 2 secondes
  const increment = target / (duration / 16) // 60 FPS

  let current = 0
  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      current = target
      clearInterval(timer)
    }
    numberElement.textContent = Math.floor(current)
  }, 16)
}

/**
 * Initialiser les animations de titre
 */
const initTitleAnimations = () => {
  // Les animations CSS se déclenchent automatiquement
  console.log('Animations de titre initialisées')
}

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
  removeLocalStorageItem('token')
  removeLocalStorageItem('user')
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
  padding: 10rem 0;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #f8fffe 0%, #f0f9ff 100%);
}

.services-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.services-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(76, 175, 80, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(33, 150, 243, 0.05) 0%, transparent 50%);
  background-size: 400px 400px;
  animation: patternMove 60s linear infinite;
}

@keyframes patternMove {
  0% { background-position: 0% 0%, 100% 100%; }
  50% { background-position: 100% 50%, 0% 50%; }
  100% { background-position: 0% 0%, 100% 100%; }
}

/* ===== En-tête Services ===== */
.services-header {
  text-align: center;
  margin-bottom: 6rem;
  position: relative;
  z-index: 1;
}

.services-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #4CAF50, #2196F3);
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 20px rgba(76, 175, 80, 0.3);
  letter-spacing: 0.3px;
}

.badge-icon {
  font-size: 1.2rem;
}

.services-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: #1a202c;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  background: linear-gradient(135deg, #2d3748, #4a5568);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.services-subtitle {
  font-size: 1.25rem;
  color: #64748b;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.7;
  font-weight: 400;
}

/* ===== Grille Services ===== */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 3rem;
  width: 100%;
  position: relative;
  z-index: 1;
  margin-bottom: 6rem;
}

.service-card.premium {
  background: white;
  border-radius: 24px;
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(226, 232, 240, 0.8);
  transform: translateY(0);
  backdrop-filter: blur(10px);
}

.service-card.premium:hover {
  transform: translateY(-12px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border-color: rgba(76, 175, 80, 0.3);
}

.service-card.premium::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(135deg, #4CAF50, #2196F3);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.6s ease;
}

.service-card.premium:hover::before {
  transform: scaleX(1);
}

/* ===== En-tête de carte ===== */
.card-header {
  padding: 2rem 2rem 1rem;
  text-align: center;
  position: relative;
}

.service-badge {
  display: inline-block;
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(33, 150, 243, 0.1));
  color: #4CAF50;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(76, 175, 80, 0.2);
  letter-spacing: 0.3px;
}

.service-icon {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  position: relative;
}

.icon-wrapper {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(33, 150, 243, 0.1));
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  border: 2px solid rgba(76, 175, 80, 0.2);
}

.service-card.premium:hover .icon-wrapper {
  background: linear-gradient(135deg, #4CAF50, #2196F3);
  border-color: transparent;
  transform: rotate(5deg) scale(1.05);
}

.icon-wrapper svg {
  width: 50px;
  height: 50px;
  color: #4CAF50;
  transition: all 0.5s ease;
}

.service-card.premium:hover .icon-wrapper svg {
  color: white;
  transform: scale(1.1);
}

/* ===== Corps de carte ===== */
.card-body {
  padding: 1rem 2rem 2rem;
  text-align: left;
}

.service-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.service-description {
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 2rem;
  font-size: 1rem;
}

.service-features {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.95rem;
  color: #475569;
}

.feature-icon {
  font-size: 1.2rem;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ===== Pied de carte ===== */
.card-footer {
  padding: 0 2rem 2rem;
}

.service-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #4CAF50, #2196F3);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(76, 175, 80, 0.3);
  width: 100%;
  justify-content: center;
}

.service-cta::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #2196F3, #4CAF50);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.service-cta:hover::before {
  opacity: 1;
}

.service-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(76, 175, 80, 0.4);
}

.cta-arrow {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.service-cta:hover .cta-arrow {
  transform: translateX(4px);
}

/* ===== Section Statistiques ===== */
.services-stats {
  background: linear-gradient(135deg, #1a202c, #2d3748);
  border-radius: 24px;
  padding: 4rem 2rem;
  margin-top: 4rem;
  position: relative;
  overflow: hidden;
}

.services-stats::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(33, 150, 243, 0.1));
  z-index: 0;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  position: relative;
  z-index: 1;
}

.stat-card {
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.stat-card:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-5px);
}

.stat-number {
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #4CAF50, #2196F3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  font-weight: 500;
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

/* ===== Responsive Design Services ===== */
@media (max-width: 992px) {
  .services {
    padding: 8rem 0;
  }
  
  .services-title {
    font-size: 2.8rem;
  }
  
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
  
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .services {
    padding: 6rem 0;
  }
  
  .services-header {
    margin-bottom: 4rem;
  }
  
  .services-title {
    font-size: 2.2rem;
  }
  
  .services-subtitle {
    font-size: 1.1rem;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 4rem;
  }
  
  .service-card.premium {
    border-radius: 20px;
  }
  
  .card-header {
    padding: 1.5rem 1.5rem 1rem;
  }
  
  .card-body {
    padding: 1rem 1.5rem 1.5rem;
  }
  
  .card-footer {
    padding: 0 1.5rem 1.5rem;
  }
  
  .service-icon {
    width: 80px;
    height: 80px;
  }
  
  .icon-wrapper {
    border-radius: 20px;
  }
  
  .icon-wrapper svg {
    width: 40px;
    height: 40px;
  }
  
  .services-stats {
    padding: 3rem 1.5rem;
    margin-top: 3rem;
  }
  
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  .stat-number {
    font-size: 2.2rem;
  }
}

@media (max-width: 480px) {
  .services-title {
    font-size: 1.8rem;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
    max-width: 100%;
  }
  
  .stats-container {
    grid-template-columns: 1fr;
  }
  
  .stat-card {
    padding: 1rem;
  }
}

/* ===== Section Pourquoi Nous Choisir ===== */
.why-choose-us {
  padding: 10rem 0;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #ffffff 0%, #f8fffe 100%);
}

.why-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.why-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(76, 175, 80, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(33, 150, 243, 0.05) 0%, transparent 50%);
  background-size: 600px 600px;
  animation: whyPatternMove 40s linear infinite;
}

@keyframes whyPatternMove {
  0% { background-position: 0% 0%, 100% 100%; }
  50% { background-position: 100% 100%, 0% 0%; }
  100% { background-position: 0% 0%, 100% 100%; }
}

.why-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

/* ===== En-tête Section ===== */
.why-header {
  margin-bottom: 3rem;
}

.why-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #4CAF50, #2196F3);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 20px rgba(76, 175, 80, 0.3);
}

.badge-icon {
  font-size: 1.2rem;
}

.why-title {
  font-size: 3rem;
  font-weight: 800;
  color: #1a202c;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  background: linear-gradient(135deg, #2d3748, #4a5568);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.why-subtitle {
  font-size: 1.2rem;
  color: #64748b;
  line-height: 1.7;
  font-weight: 400;
}

/* ===== Grille des Avantages ===== */
.advantages-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.advantage-card {
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(226, 232, 240, 0.8);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.advantage-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(135deg, #4CAF50, #2196F3);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.4s ease;
}

.advantage-card:hover::before {
  transform: scaleY(1);
}

.advantage-card:hover {
  transform: translateX(8px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.advantage-icon {
  flex-shrink: 0;
}

.icon-container {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  transition: all 0.4s ease;
}

.icon-container.expertise {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.2));
}

.icon-container.personalized {
  background: linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(33, 150, 243, 0.2));
}

.icon-container.innovation {
  background: linear-gradient(135deg, rgba(156, 39, 176, 0.1), rgba(156, 39, 176, 0.2));
}

.icon-container.network {
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.1), rgba(255, 152, 0, 0.2));
}

.advantage-card:hover .icon-container {
  transform: scale(1.1) rotate(5deg);
}

.advantage-content h4 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 0.5rem;
}

.advantage-content p {
  color: #64748b;
  line-height: 1.6;
  font-size: 1rem;
}

/* ===== Bouton Premium ===== */
.why-cta {
  text-align: left;
}

.premium-btn {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem 2.5rem;
  background: linear-gradient(135deg, #4CAF50, #2196F3);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 0 8px 30px rgba(76, 175, 80, 0.3);
  position: relative;
  overflow: hidden;
}

.premium-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #2196F3, #4CAF50);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.premium-btn:hover::before {
  opacity: 1;
}

.premium-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(76, 175, 80, 0.4);
}

.btn-arrow {
  font-size: 1.3rem;
  transition: transform 0.3s ease;
}

.premium-btn:hover .btn-arrow {
  transform: translateX(4px);
}

/* ===== Section Visuelle ===== */
.why-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.visual-container {
  width: 100%;
  max-width: 450px;
}

.company-showcase {
  background: white;
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(226, 232, 240, 0.8);
  position: relative;
  overflow: hidden;
}

.company-showcase::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(135deg, #4CAF50, #2196F3);
}

.showcase-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.company-avatar {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #4CAF50, #2196F3);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
}

.avatar-icon {
  color: white;
}

.company-name {
  font-size: 2rem;
  font-weight: 800;
  color: #1a202c;
  margin-bottom: 0.5rem;
}

.company-tagline {
  color: #64748b;
  font-size: 1.1rem;
  font-weight: 500;
}

.metrics-display {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.metric-item {
  text-align: center;
  padding: 1rem;
  background: rgba(76, 175, 80, 0.05);
  border-radius: 12px;
}

.metric-value {
  font-size: 1.8rem;
  font-weight: 800;
  color: #4CAF50;
  margin-bottom: 0.3rem;
}

.metric-label {
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;
}

.trust-indicators {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem;
  background: rgba(33, 150, 243, 0.05);
  border-radius: 10px;
  font-size: 0.95rem;
  color: #475569;
  font-weight: 500;
}

.trust-icon {
  font-size: 1.2rem;
}

/* ===== Section CTA Ultra-Moderne ===== */
.cta-section {
  padding: 12rem 0;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
  margin-bottom: 0;
}

.cta-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.cta-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, 
    rgba(76, 175, 80, 0.95) 0%, 
    rgba(33, 150, 243, 0.95) 50%, 
    rgba(156, 39, 176, 0.95) 100%);
  animation: gradientShift 8s ease-in-out infinite;
}

@keyframes gradientShift {
  0%, 100% { 
    background: linear-gradient(135deg, 
      rgba(76, 175, 80, 0.95) 0%, 
      rgba(33, 150, 243, 0.95) 50%, 
      rgba(156, 39, 176, 0.95) 100%);
  }
  50% { 
    background: linear-gradient(135deg, 
      rgba(33, 150, 243, 0.95) 0%, 
      rgba(156, 39, 176, 0.95) 50%, 
      rgba(76, 175, 80, 0.95) 100%);
  }
}

.cta-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 2px, transparent 2px),
    radial-gradient(circle at 60% 40%, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
    radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.12) 1.5px, transparent 1.5px);
  background-size: 80px 80px, 120px 120px, 160px 160px;
  animation: particlesFloat 25s linear infinite;
}

@keyframes particlesFloat {
  0% { transform: translateY(0) rotate(0deg); }
  100% { transform: translateY(-100px) rotate(360deg); }
}

.cta-waves {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25' fill='%23ffffff'%3E%3C/path%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.5' fill='%23ffffff'%3E%3C/path%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' fill='%23ffffff'%3E%3C/path%3E%3C/svg%3E") no-repeat;
  background-size: cover;
  opacity: 0.2;
  animation: wavesMove 12s ease-in-out infinite;
}

@keyframes wavesMove {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(-50px); }
}

.cta-content {
  position: relative;
  z-index: 1;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  color: white;
  padding: 0 20px;
}

/* ===== Badge CTA ===== */
.cta-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  padding: 1rem 2rem;
  border-radius: 50px;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-weight: 600;
  font-size: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.badge-icon {
  font-size: 1.3rem;
}

/* ===== Titre CTA ===== */
.cta-title {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 2rem;
  line-height: 1.2;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.highlight-text {
  background: linear-gradient(135deg, #FFD700, #FFA500);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
}

.highlight-text::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(135deg, #FFD700, #FFA500);
  border-radius: 2px;
  animation: highlightGlow 2s ease-in-out infinite;
}

@keyframes highlightGlow {
  0%, 100% { box-shadow: 0 0 10px rgba(255, 215, 0, 0.5); }
  50% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.8); }
}

/* ===== Description CTA ===== */
.cta-description {
  font-size: 1.3rem;
  margin-bottom: 3rem;
  opacity: 0.95;
  line-height: 1.8;
  font-weight: 300;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

/* ===== Pills de fonctionnalités CTA ===== */
.cta-features {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.feature-pill {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease;
}

.feature-pill:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.pill-icon {
  font-size: 1.1rem;
}

/* ===== Actions CTA ===== */
.cta-actions {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;
}

.cta-primary-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 1.5rem 3rem;
  background: linear-gradient(135deg, #fff, #f8f9fa);
  color: #2196F3;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.15),
    0 0 0 0 rgba(255, 255, 255, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.8);
  overflow: hidden;
}

.cta-primary-btn .btn-content {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  position: relative;
  z-index: 2;
}

.cta-primary-btn .btn-icon {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.cta-primary-btn:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 
    0 15px 50px rgba(0, 0, 0, 0.25),
    0 0 0 10px rgba(255, 255, 255, 0.1);
  color: #1976D2;
}

.cta-primary-btn:hover .btn-icon {
  transform: translateX(5px);
}

.btn-ripple {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(33, 150, 243, 0.1), rgba(76, 175, 80, 0.1));
  z-index: 1;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s ease;
  border-radius: 50px;
}

.cta-primary-btn:hover .btn-ripple {
  transform: scaleX(1);
}

.cta-secondary-btn {
  display: inline-flex;
  align-items: center;
  padding: 1.5rem 2.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.cta-secondary-btn .btn-content {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.cta-secondary-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* ===== Éléments de confiance ===== */
.trust-elements {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  opacity: 0.9;
  flex-wrap: wrap;
}

.trust-item {
  text-align: center;
}

.trust-number {
  display: block;
  font-size: 2rem;
  font-weight: 800;
  color: #FFD700;
  text-shadow: 0 2px 10px rgba(255, 215, 0, 0.3);
  margin-bottom: 0.3rem;
}

.trust-label {
  font-size: 0.9rem;
  font-weight: 400;
  opacity: 0.9;
}

.separator {
  width: 1px;
  height: 50px;
  background: rgba(255, 255, 255, 0.3);
}

/* ===== Animations Services Ultra-Professionnelles ===== */

/* Badge Services Animé */
.animate-badge-pulse {
  animation: badgePulseAdvanced 3s ease-in-out infinite;
}

@keyframes badgePulseAdvanced {
  0%, 100% { 
    transform: scale(1);
    box-shadow: 0 8px 32px rgba(76, 175, 80, 0.3);
  }
  50% { 
    transform: scale(1.05);
    box-shadow: 0 12px 40px rgba(76, 175, 80, 0.5);
  }
}

.animate-icon-rotate {
  animation: iconGentleGlow 3s ease-in-out infinite;
}

@keyframes iconGentleGlow {
  0%, 100% { 
    transform: scale(1);
    filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.6));
  }
  50% { 
    transform: scale(1.1);
    filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.9));
  }
}

/* Titre Animé avec Révélation */
.animate-title-reveal .title-word {
  display: inline-block;
  opacity: 0;
  transform: translateY(30px);
  animation: titleWordReveal 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.title-word[data-delay="0"] { animation-delay: 0.2s; }
.title-word[data-delay="100"] { animation-delay: 0.4s; }
.title-word[data-delay="200"] { animation-delay: 0.6s; }

@keyframes titleWordReveal {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.highlight-gradient {
  background: linear-gradient(135deg, #FFD700, #FFA500, #FF6347);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
}

.highlight-gradient::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(135deg, #FFD700, #FFA500, #FF6347);
  border-radius: 2px;
  animation: highlightPulse 2s ease-in-out infinite;
}

@keyframes highlightPulse {
  0%, 100% { 
    opacity: 0.7;
    transform: scaleX(1);
  }
  50% { 
    opacity: 1;
    transform: scaleX(1.05);
  }
}

/* Sous-titre Typewriter Amélioré */
.animate-subtitle-typewriter {
  opacity: 0;
  transform: translateY(20px);
  animation: subtitleFadeIn 0.8s ease forwards 0.8s;
}

@keyframes subtitleFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ===== Cartes Services Ultra-Modernes ===== */

/* Animation Morphing des Cartes */
.animate-card-morph {
  opacity: 0;
  transform: scale(0.8) rotateY(-15deg);
  animation: cardMorphReveal 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.animate-card-morph[data-delay="0"] { animation-delay: 0.3s; }
.animate-card-morph[data-delay="200"] { animation-delay: 0.6s; }

@keyframes cardMorphReveal {
  0% {
    opacity: 0;
    transform: scale(0.8) rotateY(-15deg) translateY(50px);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05) rotateY(5deg) translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotateY(0deg) translateY(0);
  }
}

/* Effets Lumineux des Cartes */
.card-glow {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #4CAF50, #2196F3, #FF6B6B, #4CAF50);
  border-radius: 26px;
  z-index: -1;
  opacity: 0;
  animation: cardGlowPulse 3s ease-in-out infinite;
}

@keyframes cardGlowPulse {
  0%, 100% { 
    opacity: 0;
    transform: scale(1);
  }
  50% { 
    opacity: 0.3;
    transform: scale(1.02);
  }
}

.service-card:hover .card-glow {
  opacity: 0.5;
  animation: cardGlowActive 2s ease-in-out infinite;
}

@keyframes cardGlowActive {
  0%, 100% { 
    opacity: 0.3;
    background: linear-gradient(45deg, #4CAF50, #2196F3, #FF6B6B, #4CAF50);
  }
  50% { 
    opacity: 0.7;
    background: linear-gradient(45deg, #2196F3, #FF6B6B, #4CAF50, #2196F3);
  }
}

/* Particules Flottantes */
.card-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  border-radius: 24px;
}

.card-particles::before,
.card-particles::after {
  content: '';
  position: absolute;
  width: 4px;
  height: 4px;
  background: #4CAF50;
  border-radius: 50%;
  opacity: 0;
  animation: particleFloat 4s ease-in-out infinite;
}

.card-particles::before {
  top: 20%;
  left: 20%;
  animation-delay: 0s;
}

.card-particles::after {
  top: 60%;
  right: 20%;
  background: #2196F3;
  animation-delay: 2s;
}

@keyframes particleFloat {
  0%, 100% { 
    opacity: 0;
    transform: translateY(0) scale(1);
  }
  50% { 
    opacity: 1;
    transform: translateY(-20px) scale(1.5);
  }
}

/* Badge Flottant */
.animate-badge-float {
  animation: badgeFloat 3s ease-in-out infinite;
}

@keyframes badgeFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

/* Icônes 3D */
.animate-icon-3d {
  animation: icon3DRotate 6s ease-in-out infinite;
}

@keyframes icon3DRotate {
  0%, 100% { 
    transform: rotateY(0deg) rotateX(0deg);
  }
  25% { 
    transform: rotateY(90deg) rotateX(10deg);
  }
  50% { 
    transform: rotateY(180deg) rotateX(0deg);
  }
  75% { 
    transform: rotateY(270deg) rotateX(-10deg);
  }
}

/* Texte Vague */
.animate-text-wave {
  background: linear-gradient(45deg, #1a202c, #4CAF50, #2196F3, #1a202c);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: textWaveGradient 3s ease-in-out infinite;
}

@keyframes textWaveGradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Révélation de Texte */
.animate-text-reveal {
  opacity: 0;
  transform: translateY(20px);
  animation: textRevealSlide 0.8s ease forwards 0.5s;
}

@keyframes textRevealSlide {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Cascade de Fonctionnalités */
.animate-features-cascade .feature-item {
  opacity: 0;
  transform: translateX(-30px);
  animation: featureCascade 0.6s ease forwards;
}

.animate-feature-pop[data-delay="0"] { animation-delay: 0.7s; }
.animate-feature-pop[data-delay="100"] { animation-delay: 0.9s; }
.animate-feature-pop[data-delay="200"] { animation-delay: 1.1s; }

@keyframes featureCascade {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Icônes Rebondissantes */
.animate-icon-bounce {
  animation: iconBounceGlow 2s ease-in-out infinite;
}

@keyframes iconBounceGlow {
  0%, 100% { 
    transform: scale(1);
    filter: drop-shadow(0 0 5px rgba(76, 175, 80, 0.3));
  }
  50% { 
    transform: scale(1.2);
    filter: drop-shadow(0 0 10px rgba(76, 175, 80, 0.6));
  }
}

/* CTA Magnétique */
.animate-cta-magnetic {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.animate-cta-magnetic:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(33, 150, 243, 0.4);
}

.cta-ripple {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(33, 150, 243, 0.3) 0%, transparent 70%);
  transform: scale(0);
  opacity: 0;
  transition: all 0.6s ease;
  border-radius: 8px;
}

.animate-cta-magnetic:hover .cta-ripple {
  transform: scale(1);
  opacity: 1;
}

/* Flèche Glissante */
.animate-arrow-slide {
  transition: transform 0.3s ease;
}

.animate-cta-magnetic:hover .animate-arrow-slide {
  transform: translateX(5px);
}

/* ===== Statistiques Ultra-Animées ===== */

/* Fond des Statistiques */
.stats-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.stats-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(76, 175, 80, 0.1) 2px, transparent 2px),
    radial-gradient(circle at 75% 75%, rgba(33, 150, 243, 0.1) 1px, transparent 1px);
  background-size: 100px 100px, 150px 150px;
  animation: statsParticlesMove 20s linear infinite;
}

@keyframes statsParticlesMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(-100px, -100px); }
}

.stats-waves {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: linear-gradient(90deg, 
    rgba(76, 175, 80, 0.1) 0%, 
    rgba(33, 150, 243, 0.1) 50%, 
    rgba(76, 175, 80, 0.1) 100%);
  animation: statsWavesFlow 8s ease-in-out infinite;
}

@keyframes statsWavesFlow {
  0%, 100% { transform: translateX(0) scaleY(1); }
  50% { transform: translateX(-20px) scaleY(1.2); }
}

/* Cartes Statistiques */
.stats-container {
  position: relative;
  z-index: 1;
}

.animate-stat-counter {
  opacity: 0;
  transform: scale(0.5) rotateY(90deg);
  animation: statCounterReveal 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}

.animate-stat-counter[data-delay="0"] { animation-delay: 0.5s; }
.animate-stat-counter[data-delay="200"] { animation-delay: 0.7s; }
.animate-stat-counter[data-delay="400"] { animation-delay: 0.9s; }
.animate-stat-counter[data-delay="600"] { animation-delay: 1.1s; }

@keyframes statCounterReveal {
  0% {
    opacity: 0;
    transform: scale(0.5) rotateY(90deg) translateY(50px);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1) rotateY(-10deg) translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotateY(0deg) translateY(0);
  }
}

/* Icônes des Statistiques */
.stat-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  animation: statIconFloat 3s ease-in-out infinite;
}

@keyframes statIconFloat {
  0%, 100% { 
    transform: translateY(0) rotate(0deg);
    filter: drop-shadow(0 5px 15px rgba(76, 175, 80, 0.3));
  }
  50% { 
    transform: translateY(-10px) rotate(5deg);
    filter: drop-shadow(0 10px 25px rgba(76, 175, 80, 0.5));
  }
}

/* Compteur Animé */
.stat-number {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #4CAF50, #2196F3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  position: relative;
}

.stat-plus {
  font-size: 2rem;
  color: #FFD700;
  font-weight: 800;
  display: inline-block;
  animation: statPlusGlow 2s ease-in-out infinite;
}

@keyframes statPlusGlow {
  0%, 100% { 
    transform: scale(1);
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
  }
  50% { 
    transform: scale(1.2);
    text-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
  }
}

/* Lueur des Statistiques */
.stat-glow {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: linear-gradient(45deg, 
    rgba(76, 175, 80, 0.2), 
    rgba(33, 150, 243, 0.2), 
    rgba(255, 215, 0, 0.2));
  border-radius: 20px;
  z-index: -1;
  opacity: 0;
  animation: statGlowPulse 4s ease-in-out infinite;
}

@keyframes statGlowPulse {
  0%, 100% { 
    opacity: 0;
    transform: scale(1);
  }
  50% { 
    opacity: 0.4;
    transform: scale(1.05);
  }
}

.stat-card:hover .stat-glow {
  opacity: 0.6;
  animation: statGlowActive 2s ease-in-out infinite;
}

@keyframes statGlowActive {
  0%, 100% { 
    opacity: 0.4;
    transform: scale(1.05);
  }
  50% { 
    opacity: 0.8;
    transform: scale(1.1);
  }
}

/* ===== Animations CTA Professionnelles ===== */
.animate-float {
  animation: floatUpDown 3s ease-in-out infinite;
}

@keyframes floatUpDown {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-scale-in {
  animation: scaleInBounce 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  opacity: 0;
  transform: scale(0.8);
}

@keyframes scaleInBounce {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-up {
  animation: fadeUpSlide 0.8s ease forwards;
  opacity: 0;
  transform: translateY(30px);
}

@keyframes fadeUpSlide {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slideUpStagger 0.6s ease forwards;
  opacity: 0;
  transform: translateY(40px);
}

@keyframes slideUpStagger {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-zoom-in {
  animation: zoomInElastic 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  opacity: 0;
  transform: scale(0.3);
}

@keyframes zoomInElastic {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.98);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fadeInGentle 1s ease forwards;
  opacity: 0;
}

@keyframes fadeInGentle {
  to {
    opacity: 1;
  }
}

/* Séquençage des animations */
.animate-scale-in {
  animation-delay: 0.2s;
}

.animate-fade-up {
  animation-delay: 0.4s;
}

.animate-slide-up {
  animation-delay: 0.6s;
}

.animate-zoom-in {
  animation-delay: 0.8s;
}

.animate-fade-in {
  animation-delay: 1s;
}

/* ===== Animations de base ===== */
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

/* ===== Responsive Design General ===== */
@media (max-width: 992px) {
  .why-content {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
  
  .why-visual {
    order: -1;
  }
  
  .why-title {
    font-size: 2.5rem;
  }
  
  .visual-container {
    max-width: 400px;
    margin: 0 auto;
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
  
  /* CTA Responsive pour tablettes et mobiles */
  .cta-section {
    padding: 8rem 0;
    min-height: auto;
  }
  
  .cta-title {
    font-size: 2.8rem;
    line-height: 1.3;
  }
  
  .cta-description {
    font-size: 1.1rem;
    margin-bottom: 2.5rem;
  }
  
  .cta-features {
    gap: 1rem;
    margin-bottom: 2.5rem;
  }
  
  .feature-pill {
    padding: 0.6rem 1.2rem;
    font-size: 0.85rem;
  }
  
  .cta-actions {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
  
  .cta-primary-btn, .cta-secondary-btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
    padding: 1.3rem 2rem;
  }
  
  .trust-elements {
    gap: 1.5rem;
  }
  
  .trust-number {
    font-size: 1.8rem;
  }
  
  .trust-label {
    font-size: 0.8rem;
  }
  
  .separator {
    display: none;
  }
  
  .services, .why-choose-us, .cta-section {
    padding: 5rem 0;
  }
  
  .why-choose-us {
    padding: 6rem 0;
  }
  
  .why-content {
    gap: 3rem;
  }
  
  .why-title {
    font-size: 2rem;
  }
  
  .why-subtitle {
    font-size: 1.1rem;
  }
  
  .advantage-card {
    padding: 1.2rem;
    gap: 1rem;
  }
  
  .icon-container {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }
  
  .advantage-content h4 {
    font-size: 1.2rem;
  }
  
  .premium-btn {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
  
  .company-showcase {
    padding: 2rem;
  }
  
  .showcase-header {
    gap: 1rem;
  }
  
  .company-avatar {
    width: 60px;
    height: 60px;
    font-size: 2rem;
  }
  
  .company-name {
    font-size: 1.5rem;
  }
  
  .metrics-display {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.8rem;
  }
  
  .metric-item {
    padding: 0.8rem;
  }
  
  .metric-value {
    font-size: 1.4rem;
  }
}

@media (max-width: 480px) {
  .hero h1 {
    font-size: 2.2rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .why-title {
    font-size: 1.8rem;
  }
  
  .advantage-card {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .company-showcase {
    padding: 1.5rem;
  }
  
  .metrics-display {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .premium-btn {
    width: 100%;
    justify-content: center;
  }
  
  /* CTA Responsive pour petits écrans */
  .cta-section {
    padding: 6rem 0;
  }
  
  .cta-title {
    font-size: 2.2rem;
  }
  
  .cta-description {
    font-size: 1rem;
    padding: 0 10px;
  }
  
  .cta-badge {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
  
  .trust-elements {
    flex-direction: column;
    gap: 1rem;
  }
  
  .trust-item {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .trust-number {
    margin-bottom: 0;
  }
}
</style> 