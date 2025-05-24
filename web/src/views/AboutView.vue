<template>
  <div class="about">
    <!-- En-tête du site -->
    <TheHeader />
    
    <!-- Section Hero About -->
    <section class="hero-about" id="hero-about">
      <div class="hero-background">
        <div class="hero-overlay"></div>
        <div class="hero-pattern"></div>
      </div>
      <div class="container">
        <div class="hero-content">
          <h1 class="animate-fade-in">À Propos de la CCISN</h1>
          <p class="animate-fade-in-delay">Découvrez notre histoire, notre mission et notre engagement envers le développement économique de la région de Nador</p>
          <div class="breadcrumb animate-fade-in-delay-2">
            <router-link to="/">Accueil</router-link>
            <span>/</span>
            <span>À Propos</span>
          </div>
        </div>
      </div>
      
      <!-- Indicateur de défilement -->
      <div class="scroll-indicator animate-bounce">
        <span>En savoir plus</span>
        <i class="arrow-down"></i>
      </div>
    </section>

    <!-- Section Mission & Vision -->
    <section class="mission-vision" id="mission-vision">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Notre Mission & Vision</h2>
          <div class="section-divider">
            <span class="divider-line"></span>
          </div>
        </div>
        
        <div class="mission-vision-grid">
          <!-- Mission -->
          <div class="mission-card">
            <div class="card-icon">
              <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" stroke="currentColor" stroke-width="2" stroke-miterlimit="10">
                  <circle cx="32" cy="32" r="20"></circle>
                  <path d="M32 12V4M32 60v-8M52 32h8M4 32h8M45.255 18.745l5.657-5.657M13.088 50.912l5.657-5.657M45.255 45.255l5.657 5.657M13.088 13.088l5.657 5.657"></path>
                  <circle cx="32" cy="32" r="4"></circle>
                </g>
              </svg>
            </div>
            <h3>Notre Mission</h3>
            <p>Promouvoir et soutenir le développement économique et commercial de la région de Nador en offrant des services de qualité aux entreprises et entrepreneurs.</p>
            <ul class="mission-points">
              <li>Accompagner les entreprises dans leur croissance</li>
              <li>Faciliter les échanges commerciaux</li>
              <li>Promouvoir l'innovation et l'entrepreneuriat</li>
            </ul>
          </div>
          
          <!-- Vision -->
          <div class="vision-card">
            <div class="card-icon">
              <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" stroke="currentColor" stroke-width="2" stroke-miterlimit="10">
                  <path d="M32 8C18.745 8 8 18.745 8 32s10.745 24 24 24 24-10.745 24-24S45.255 8 32 8z"></path>
                  <path d="M32 20c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12z"></path>
                  <circle cx="32" cy="32" r="4"></circle>
                </g>
              </svg>
            </div>
            <h3>Notre Vision</h3>
            <p>Devenir le partenaire de référence pour le développement économique durable de la région orientale du Maroc et un hub d'excellence entrepreneuriale.</p>
            <ul class="vision-points">
              <li>Excellence dans les services</li>
              <li>Innovation et modernisation</li>
              <li>Partenariats stratégiques</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Histoire -->
    <section class="history" id="history">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Notre Histoire</h2>
          <div class="section-divider">
            <span class="divider-line"></span>
          </div>
        </div>
        
        <div class="history-container">
          <!-- Timeline -->
          <div class="timeline-section">
            <div class="timeline-wrapper">
              <div class="timeline-line"></div>
              
              <div class="timeline-event">
                <div class="timeline-dot">
                  <span>1960</span>
                </div>
                <div class="timeline-card">
                  <h4>Création</h4>
                  <p>Fondation de la Chambre de Commerce, d'Industrie et de Services de Nador pour soutenir le développement économique de la région.</p>
                </div>
              </div>
              
              <div class="timeline-event">
                <div class="timeline-dot">
                  <span>1990</span>
                </div>
                <div class="timeline-card">
                  <h4>Modernisation</h4>
                  <p>Modernisation des services et mise en place de nouveaux programmes d'accompagnement des entreprises.</p>
                </div>
              </div>
              
              <div class="timeline-event">
                <div class="timeline-dot">
                  <span>2010</span>
                </div>
                <div class="timeline-card">
                  <h4>Digitalisation</h4>
                  <p>Lancement de la transformation digitale et des services en ligne pour faciliter les démarches administratives.</p>
                </div>
              </div>
              
              <div class="timeline-event">
                <div class="timeline-dot">
                  <span>2024</span>
                </div>
                <div class="timeline-card">
                  <h4>Innovation</h4>
                  <p>Nouvelle plateforme numérique et services innovants pour l'accompagnement des entrepreneurs du 21ème siècle.</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Statistiques -->
          <div class="stats-section">
            <div class="stats-container">
              <div class="stat-item animate-counter" data-target="60">
                <div class="stat-value">0</div>
                <div class="stat-text">Années d'expérience</div>
              </div>
              <div class="stat-item animate-counter" data-target="5000">
                <div class="stat-value">0</div>
                <div class="stat-text">Entreprises accompagnées</div>
              </div>
              <div class="stat-item animate-counter" data-target="25">
                <div class="stat-value">0</div>
                <div class="stat-text">Services proposés</div>
              </div>
              <div class="stat-item animate-counter" data-target="50">
                <div class="stat-value">0</div>
                <div class="stat-text">Partenaires</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Valeurs -->
    <section class="values" id="values">
      <div class="values-background">
        <div class="values-pattern"></div>
      </div>
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Nos Valeurs</h2>
          <div class="section-divider">
            <span class="divider-line"></span>
          </div>
          <p class="section-subtitle">Les principes qui guident notre action quotidienne</p>
        </div>
        
        <div class="values-grid">
          <div class="value-card">
            <div class="value-icon">
              <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" stroke="currentColor" stroke-width="2" stroke-miterlimit="10">
                  <path d="M32 4L8 16v24c0 12.15 10.85 22.99 24 24 13.15-1.01 24-11.85 24-24V16L32 4z"></path>
                  <path d="M24 32l8 8 16-16"></path>
                </g>
              </svg>
            </div>
            <h3>Intégrité</h3>
            <p>Nous agissons avec transparence et honnêteté dans toutes nos relations professionnelles.</p>
          </div>
          
          <div class="value-card">
            <div class="value-icon">
              <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" stroke="currentColor" stroke-width="2" stroke-miterlimit="10">
                  <circle cx="32" cy="32" r="28"></circle>
                  <path d="M32 8v48M8 32h48"></path>
                  <circle cx="32" cy="32" r="12"></circle>
                </g>
              </svg>
            </div>
            <h3>Excellence</h3>
            <p>Nous nous engageons à fournir des services de la plus haute qualité à nos membres.</p>
          </div>
          
          <div class="value-card">
            <div class="value-icon">
              <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" stroke="currentColor" stroke-width="2" stroke-miterlimit="10">
                  <circle cx="20" cy="20" r="16"></circle>
                  <circle cx="44" cy="44" r="16"></circle>
                  <path d="M36 28L28 36"></path>
                </g>
              </svg>
            </div>
            <h3>Innovation</h3>
            <p>Nous embrassons les nouvelles technologies pour améliorer constamment nos services.</p>
          </div>
          
          <div class="value-card">
            <div class="value-icon">
              <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" stroke="currentColor" stroke-width="2" stroke-miterlimit="10">
                  <circle cx="32" cy="20" r="12"></circle>
                  <path d="M32 32c-8 0-16 4-16 12v8h32v-8c0-8-8-12-16-12z"></path>
                  <path d="M48 24v8M52 28h-8"></path>
                </g>
              </svg>
            </div>
            <h3>Collaboration</h3>
            <p>Nous favorisons les partenariats et la coopération pour le bien de l'écosystème économique.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Équipe -->
    <section class="team" id="team">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Notre Équipe</h2>
          <div class="section-divider">
            <span class="divider-line"></span>
          </div>
          <p class="section-subtitle">Des professionnels dévoués à votre service</p>
        </div>
        
        <div class="team-grid">
          <div class="team-member">
            <div class="member-photo">
              <div class="photo-placeholder">
                <span class="member-initial">DG</span>
              </div>
              <div class="member-overlay">
                <div class="social-links">
                  <a href="#" class="social-link">
                    <svg viewBox="0 0 24 24">
                      <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div class="member-info">
              <h4>Directeur Général</h4>
              <p class="member-title">Direction Générale</p>
              <p class="member-description">Leader visionnaire avec plus de 20 ans d'expérience dans le développement économique régional.</p>
            </div>
          </div>
          
          <div class="team-member">
            <div class="member-photo">
              <div class="photo-placeholder">
                <span class="member-initial">RS</span>
              </div>
              <div class="member-overlay">
                <div class="social-links">
                  <a href="#" class="social-link">
                    <svg viewBox="0 0 24 24">
                      <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div class="member-info">
              <h4>Responsable Services</h4>
              <p class="member-title">Département Services</p>
              <p class="member-description">Expert en services aux entreprises, spécialisé dans l'accompagnement et le conseil stratégique.</p>
            </div>
          </div>
          
          <div class="team-member">
            <div class="member-photo">
              <div class="photo-placeholder">
                <span class="member-initial">RF</span>
              </div>
              <div class="member-overlay">
                <div class="social-links">
                  <a href="#" class="social-link">
                    <svg viewBox="0 0 24 24">
                      <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div class="member-info">
              <h4>Responsable Formation</h4>
              <p class="member-title">Département Formation</p>
              <p class="member-description">Spécialiste en développement des compétences et formation professionnelle continue.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Partenaires -->
    <section class="partners" id="partners">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Nos Partenaires</h2>
          <div class="section-divider">
            <span class="divider-line"></span>
          </div>
          <p class="section-subtitle">Ensemble pour le développement économique</p>
        </div>
        
        <div class="partners-grid">
          <div class="partner-card">
            <div class="partner-logo">
              <span class="partner-text">Ministère de l'Industrie</span>
            </div>
          </div>
          <div class="partner-card">
            <div class="partner-logo">
              <span class="partner-text">CGEM</span>
            </div>
          </div>
          <div class="partner-card">
            <div class="partner-logo">
              <span class="partner-text">ANAPEC</span>
            </div>
          </div>
          <div class="partner-card">
            <div class="partner-logo">
              <span class="partner-text">OFPPT</span>
            </div>
          </div>
          <div class="partner-card">
            <div class="partner-logo">
              <span class="partner-text">Banques Partenaires</span>
            </div>
          </div>
          <div class="partner-card">
            <div class="partner-logo">
              <span class="partner-text">Université Mohammed Premier</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section CTA -->
    <section class="cta-section" id="cta">
      <div class="cta-background">
        <div class="cta-pattern"></div>
      </div>
      <div class="container">
        <div class="cta-content">
          <h2>Prêt à nous rejoindre ?</h2>
          <p>Découvrez comment nous pouvons vous accompagner dans votre développement</p>
          <div class="cta-buttons">
            <router-link to="/contact" class="cta-button pulse-animation">Nous contacter</router-link>
            <router-link to="/services" class="secondary-button">Nos services</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Pied de page -->
    <TheFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'

let scrollObserver = null
let counterObserver = null

onMounted(() => {
  // Délai pour s'assurer que tous les éléments sont rendus
  setTimeout(() => {
    // Configuration de l'Intersection Observer pour les animations au défilement
    scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Ne pas désobserver immédiatement pour permettre la répétition si nécessaire
          // scrollObserver.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    // Observer tous les éléments avec les classes d'animation au défilement
    const elementsToObserve = document.querySelectorAll('.animate-on-scroll-hidden, .animate-on-scroll-right-hidden, .animate-on-scroll-left-hidden, .animate-slide-up-hidden, .animate-fade-in-up-hidden');
    elementsToObserve.forEach(el => {
      scrollObserver.observe(el);
    });

    // Configuration de l'observer pour les compteurs
    counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    // Observer tous les compteurs
    document.querySelectorAll('.animate-counter').forEach(el => {
      counterObserver.observe(el);
    });
  }, 100);
});

onUnmounted(() => {
  if (scrollObserver) {
    scrollObserver.disconnect();
  }
  if (counterObserver) {
    counterObserver.disconnect();
  }
});

// Animation des compteurs
const animateCounter = (element) => {
  const target = parseInt(element.dataset.target);
  const numberElement = element.querySelector('.stat-value');
  const duration = 2000; // 2 secondes
  const step = target / (duration / 16); // 60 FPS
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      numberElement.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      numberElement.textContent = Math.floor(current).toLocaleString();
    }
  }, 16);
};
</script>

<style scoped>
/* ===== Styles généraux ===== */
.about {
  min-height: 100vh;
  overflow-x: hidden;
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

/* ===== Section Hero About ===== */
.hero-about {
  height: 80vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  overflow: hidden;
  width: 100%;
}

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
  background: linear-gradient(135deg, rgba(44, 62, 80, 0.9), rgba(52, 152, 219, 0.8));
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
  opacity: 0.3;
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

.hero-about h1 {
  font-size: 3.5rem;
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

.hero-about p {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.95;
  font-weight: 400;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  line-height: 1.6;
}

.breadcrumb {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 1.1rem;
  opacity: 0.8;
}

.breadcrumb a {
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumb a:hover {
  color: #4CAF50;
}

.breadcrumb span {
  color: rgba(255, 255, 255, 0.6);
}

/* ===== Sections communes ===== */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.8rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.section-divider {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.divider-line {
  width: 80px;
  height: 4px;
  background: linear-gradient(45deg, #4CAF50, #2196F3);
  border-radius: 2px;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* ===== Section Mission & Vision ===== */
.mission-vision {
  padding: 5rem 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.mission-vision-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 3rem;
  margin-top: 3rem;
}

.mission-card, .vision-card {
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  position: relative;
  overflow: hidden;
  min-height: 400px;
  display: flex;
  flex-direction: column;
}

.mission-card::before, .vision-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(45deg, #4CAF50, #2196F3);
}

.mission-card:hover, .vision-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.card-icon {
  width: 80px;
  height: 80px;
  margin-bottom: 2rem;
  color: #2196F3;
}

.card-icon svg {
  width: 100%;
  height: 100%;
}

.mission-card h3, .vision-card h3 {
  font-size: 1.8rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.mission-card p, .vision-card p {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.7;
  margin-bottom: 2rem;
}

.mission-points, .vision-points {
  list-style: none;
  padding: 0;
}

.mission-points li, .vision-points li {
  padding: 0.5rem 0;
  color: #555;
  position: relative;
  padding-left: 2rem;
}

.mission-points li::before, .vision-points li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #4CAF50;
  font-weight: bold;
}

/* ===== Section Histoire ===== */
.history {
  padding: 5rem 0;
  background: white;
}

.history-container {
  display: flex;
  gap: 4rem;
  align-items: flex-start;
  margin-top: 3rem;
}

.timeline-section {
  flex: 1;
  min-width: 0;
}

.timeline-wrapper {
  position: relative;
  padding-left: 2rem;
}

.timeline-line {
  position: absolute;
  left: 35px;
  top: 35px;
  bottom: 35px;
  width: 4px;
  background: linear-gradient(to bottom, #4CAF50, #2196F3);
  border-radius: 2px;
  z-index: 1;
}

.timeline-event {
  position: relative;
  margin-bottom: 3rem;
  display: flex;
  align-items: flex-start;
  gap: 2rem;
}

.timeline-event:last-child {
  margin-bottom: 0;
}

.timeline-dot {
  position: relative;
  width: 70px;
  height: 70px;
  background: linear-gradient(45deg, #4CAF50, #2196F3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  border: 4px solid white;
  z-index: 2;
  flex-shrink: 0;
}

.timeline-card {
  flex: 1;
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  position: relative;
  margin-top: 10px;
  min-height: 120px;
}

.timeline-card::before {
  content: '';
  position: absolute;
  left: -15px;
  top: 25px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 15px 10px 0;
  border-color: transparent #f8f9fa transparent transparent;
}

.timeline-card h4 {
  font-size: 1.4rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.timeline-card h4::before {
  content: '';
  width: 6px;
  height: 6px;
  background: #4CAF50;
  border-radius: 50%;
  flex-shrink: 0;
}

.timeline-card p {
  color: #666;
  line-height: 1.7;
  font-size: 1rem;
  margin: 0;
}

.stats-section {
  flex: 1;
  min-width: 0;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.stat-item {
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 2px solid #f0f0f0;
  position: relative;
  overflow: hidden;
}

.stat-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(45deg, #4CAF50, #2196F3);
}

.stat-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border-color: #e0e0e0;
}

.stat-value {
  display: block;
  font-size: 3rem;
  font-weight: 700;
  color: #2196F3;
  margin-bottom: 0.8rem;
  line-height: 1;
}

.stat-text {
  display: block;
  font-size: 0.95rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
}

/* ===== Section Valeurs ===== */
.values {
  padding: 5rem 0;
  position: relative;
  background: #f8f9fa;
}

.values-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.values-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/m1.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.05;
}

.values .container {
  position: relative;
  z-index: 1;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.value-card {
  background: white;
  padding: 2.5rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  position: relative;
  overflow: hidden;
}

.value-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(45deg, #4CAF50, #2196F3);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.value-card:hover::before {
  transform: scaleX(1);
}

.value-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
}

.value-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 2rem;
  color: #2196F3;
}

.value-icon svg {
  width: 100%;
  height: 100%;
}

.value-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.value-card p {
  color: #666;
  line-height: 1.6;
}

/* ===== Section Équipe ===== */
.team {
  padding: 5rem 0;
  background: white;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-top: 3rem;
}

.team-member {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.team-member:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.member-photo {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.photo-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.member-initial {
  font-size: 3rem;
  font-weight: bold;
  color: white;
}

.member-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.member-photo:hover .member-overlay {
  opacity: 1;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #4CAF50;
  transform: scale(1.1);
}

.social-link svg {
  width: 20px;
  height: 20px;
}

.member-info {
  padding: 2rem;
}

.member-info h4 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.member-title {
  font-size: 1rem;
  color: #2196F3;
  font-weight: 500;
  margin-bottom: 1rem;
}

.member-description {
  color: #666;
  line-height: 1.6;
  font-size: 0.95rem;
}

/* ===== Section Partenaires ===== */
.partners {
  padding: 5rem 0;
  background: #f8f9fa;
}

.partners-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.partner-card {
  background: white;
  padding: 3rem 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;
}

.partner-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.partner-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
}

.partner-text {
  font-weight: 600;
  color: #2c3e50;
  font-size: 1.1rem;
  text-align: center;
}

/* ===== Section CTA ===== */
.cta-section {
  padding: 5rem 0;
  position: relative;
  color: white;
  text-align: center;
}

.cta-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  z-index: 0;
}

.cta-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/m1.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.1;
}

.cta-content {
  position: relative;
  z-index: 1;
}

.cta-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.cta-content p {
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-button {
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
}

.cta-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.secondary-button {
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
}

.secondary-button:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: white;
  transform: translateY(-2px);
}

/* ===== Animations ===== */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

/* Classes d'animation */
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
  opacity: 1;
  transform: translateY(0);
  transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.animate-slide-up-delay {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) 0.2s;
}

.animate-slide-up-delay-2 {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) 0.4s;
}

.animate-slide-up-delay-3 {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) 0.6s;
}

.animate-fade-in-up {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.animate-fade-in-up-delay {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) 0.2s;
}

.animate-fade-in-up-delay-2 {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) 0.4s;
}

.animate-fade-in-up-delay-3 {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) 0.6s;
}

.animate-on-scroll {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.animate-on-scroll-right {
  opacity: 1;
  transform: translateX(0);
  transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.animate-on-scroll-left {
  opacity: 1;
  transform: translateX(0);
  transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}

/* Animation on scroll with initial hidden state */
.animate-on-scroll-hidden {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.animate-on-scroll-right-hidden {
  opacity: 0;
  transform: translateX(-50px);
  transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.animate-on-scroll-left-hidden {
  opacity: 0;
  transform: translateX(50px);
  transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.animate-slide-up-hidden {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.animate-fade-in-up-hidden {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.animate-on-scroll.visible,
.animate-on-scroll-right.visible,
.animate-on-scroll-left.visible,
.animate-slide-up.visible,
.animate-slide-up-delay.visible,
.animate-slide-up-delay-2.visible,
.animate-slide-up-delay-3.visible,
.animate-fade-in-up.visible,
.animate-fade-in-up-delay.visible,
.animate-fade-in-up-delay-2.visible,
.animate-fade-in-up-delay-3.visible,
.animate-on-scroll-hidden.visible,
.animate-on-scroll-right-hidden.visible,
.animate-on-scroll-left-hidden.visible,
.animate-slide-up-hidden.visible,
.animate-fade-in-up-hidden.visible {
  opacity: 1;
  transform: translate(0);
}

.animate-bounce {
  animation: bounce 2s infinite;
}

.pulse-animation {
  animation: pulse 2s infinite;
}

/* Indicateur de défilement */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  cursor: pointer;
}

.scroll-indicator span {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  opacity: 0.8;
}

.arrow-down {
  width: 2px;
  height: 30px;
  background: white;
  position: relative;
}

.arrow-down::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: -4px;
  width: 10px;
  height: 10px;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  transform: rotate(45deg);
}

/* ===== Responsive Design ===== */
@media (max-width: 1024px) {
  .mission-vision-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .history-container {
    flex-direction: column;
  }
  
  .timeline-wrapper {
    padding-left: 1rem;
  }
  
  .timeline-event {
    padding-left: 70px;
  }
  
  .timeline-dot {
    width: 60px;
    height: 60px;
    font-size: 0.9rem;
  }
  
  .timeline-card {
    padding: 1.5rem;
  }
  
  .timeline-card h4 {
    font-size: 1.3rem;
  }
}

@media (max-width: 768px) {
  .hero-about h1 {
    font-size: 2.5rem;
  }
  
  .hero-about p {
    font-size: 1.1rem;
  }
  
  .section-title {
    font-size: 2.2rem;
  }
  
  .history-container {
    gap: 3rem;
  }
  
  .stats-container {
    grid-template-columns: 1fr;
  }
  
  .values-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
  
  .team-grid {
    grid-template-columns: 1fr;
  }
  
  .partners-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .breadcrumb {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .hero-about h1 {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .mission-card, .vision-card {
    padding: 2rem;
  }
  
  .value-card {
    padding: 2rem;
  }
  
  .timeline-wrapper {
    padding-left: 0.5rem;
  }
  
  .timeline-line {
    left: 25px;
  }
  
  .timeline-event {
    padding-left: 60px;
    margin-bottom: 3rem;
  }
  
  .timeline-dot {
    width: 50px;
    height: 50px;
    font-size: 0.8rem;
  }
  
  .timeline-card {
    padding: 1.2rem;
    margin-top: 0;
  }
  
  .timeline-card h4 {
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
  }
  
  .timeline-card p {
    font-size: 0.9rem;
  }
  
  .stats-container {
    gap: 1rem;
  }
  
  .stat-item {
    padding: 2rem 1.5rem;
  }
  
  .stat-value {
    font-size: 2.5rem;
  }
  
  .stat-text {
    font-size: 0.85rem;
  }
  
  .history-container {
    gap: 3rem;
  }
}
</style> 