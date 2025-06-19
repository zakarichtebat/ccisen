<template>
  <div class="services-page">
    <!-- En-tête de la page -->
    <TheHeader />
    
    <!-- Section Hero Ultra-Professionnelle -->
    <section class="services-hero">
      <div class="hero-background">
        <div class="hero-particles"></div>
        <div class="hero-waves">
          <div class="wave wave-1"></div>
          <div class="wave wave-2"></div>
          <div class="wave wave-3"></div>
        </div>
      </div>
      <div class="hero-overlay"></div>
      <div class="container">
        <div class="hero-content">
          <div class="hero-badge animate-float">
            <span class="badge-icon animate-pulse-glow">🏆</span>
            Excellence & Innovation
          </div>
          <h1 class="hero-title animate-slide-up">
            <span class="title-main">Nos Services</span>
            <span class="title-highlight">Professionnels</span>
          </h1>
          <div class="hero-divider animate-scale-in"></div>
          <p class="hero-subtitle animate-fade-up-delay">
            Découvrez notre gamme complète de services conçus pour accompagner votre entreprise vers l'excellence et la croissance durable
          </p>
          <div class="hero-stats animate-fade-up-delay-2">
            <div class="stat-item">
              <div class="stat-number">1200+</div>
              <div class="stat-label">Entreprises accompagnées</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">15+</div>
              <div class="stat-label">Années d'expérience</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">98%</div>
              <div class="stat-label">Satisfaction client</div>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-scroll-indicator animate-bounce">
        <div class="scroll-arrow"></div>
      </div>
    </section>

    <!-- Navigation des services avec animations avancées -->
    <section class="services-nav">
      <div class="container">
        <div class="nav-container">
          <a href="#accompagnement" class="nav-item animate-nav-item" data-delay="0">
            <div class="nav-icon animate-3d-rotate">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M21.5 4h-19C1.12 4 0 5.12 0 6.5v11C0 18.88 1.12 20 2.5 20h19c1.38 0 2.5-1.12 2.5-2.5v-11C24 5.12 22.88 4 21.5 4zM9.32 15.22c-.04.2-.14.38-.29.54l-2 2c-.18.18-.4.29-.63.29-.27 0-.52-.11-.71-.29-.18-.18-.29-.41-.29-.66 0-.25.11-.48.3-.66l.84-.84H2c-.55 0-1-.45-1-1s.45-1 1-1h4.54l-.84-.84c-.38-.38-.39-1.01-.01-1.4.39-.39 1.01-.39 1.4 0l2 2c.15.15.25.34.29.55.03.16.03.37 0 .53-.03.17-.07.33-.14.47.06-.12.04-.23.07-.39zM22 10c0 .55-.45 1-1 1h-4.54l.84.84c.38.38.39 1.01.01 1.4-.39.39-1.01.39-1.4 0l-2-2c-.15-.15-.25-.34-.29-.54s-.04-.38 0-.57c.04-.19.14-.38.29-.54l2-2c.39-.39 1.01-.39 1.4 0 .38.38.38 1.01 0 1.4l-.84.84H21c.55 0 1 .45 1 1z"/>
              </svg>
            </div>
            <span class="nav-text">Accompagnement</span>
            <div class="nav-glow"></div>
          </a>
         
          <a href="#formation" class="nav-item animate-nav-item" data-delay="200">
            <div class="nav-icon animate-3d-rotate">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
              </svg>
            </div>
            <span class="nav-text">Formation</span>
            <div class="nav-glow"></div>
          </a>
       
          
        </div>
      </div>
    </section>

    <!-- Section Accompagnement des Entreprises -->
    <section id="accompagnement" class="service-section">
      <div class="section-background">
        <div class="floating-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
        </div>
      </div>
      <div class="container">
        <div class="service-content">
          <div class="service-text reveal-left">
            <div class="service-header">
              <div class="service-icon animate-morph">
                <div class="icon-glow"></div>
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M21.5 4h-19C1.12 4 0 5.12 0 6.5v11C0 18.88 1.12 20 2.5 20h19c1.38 0 2.5-1.12 2.5-2.5v-11C24 5.12 22.88 4 21.5 4zM9.32 15.22c-.04.2-.14.38-.29.54l-2 2c-.18.18-.4.29-.63.29-.27 0-.52-.11-.71-.29-.18-.18-.29-.41-.29-.66 0-.25.11-.48.3-.66l.84-.84H2c-.55 0-1-.45-1-1s.45-1 1-1h4.54l-.84-.84c-.38-.38-.39-1.01-.01-1.4.39-.39 1.01-.39 1.4 0l2 2c.15.15.25.34.29.55.03.16.03.37 0 .53-.03.17-.07.33-.14.47.06-.12.04-.23.07-.39zM22 10c0 .55-.45 1-1 1h-4.54l.84.84c.38.38.39 1.01.01 1.4-.39.39-1.01.39-1.4 0l-2-2c-.15-.15-.25-.34-.29-.54s-.04-.38 0-.57c.04-.19.14-.38.29-.54l2-2c.39-.39 1.01-.39 1.4 0 .38.38.38 1.01 0 1.4l-.84.84H21c.55 0 1 .45 1 1z"/>
                </svg>
              </div>
              <h2 class="animate-text-wave">Accompagnement des Entreprises</h2>
            </div>
            <div class="service-description">
              <p class="animate-typewriter">Notre service d'accompagnement offre un soutien complet aux entreprises à tous les stades de leur développement, de la création à l'expansion internationale.</p>
              
              <h3 class="animate-slide-in">Nos prestations d'accompagnement comprennent :</h3>
              <ul class="features-list">
                <li class="feature-item animate-cascade" data-delay="0">
                  <div class="feature-icon animate-bounce-glow">💡</div>
                  <div class="feature-content">
                    <span class="feature-title">Conseil personnalisé</span>
                    <p>Consultations individuelles avec nos experts pour analyser votre situation spécifique et vous proposer des solutions adaptées.</p>
                  </div>
                </li>
                <li class="feature-item animate-cascade" data-delay="100">
                  <div class="feature-icon animate-bounce-glow">🎯</div>
                  <div class="feature-content">
                    <span class="feature-title">Orientation stratégique</span>
                    <p>Accompagnement dans l'élaboration de votre stratégie de développement et identification des opportunités de croissance.</p>
                  </div>
                </li>
                <li class="feature-item animate-cascade" data-delay="200">
                  <div class="feature-icon animate-bounce-glow">⚖️</div>
                  <div class="feature-content">
                    <span class="feature-title">Information juridique et fiscale</span>
                    <p>Conseils sur les aspects juridiques, fiscaux et réglementaires liés à votre activité au Maroc.</p>
                  </div>
                </li>
                <li class="feature-item animate-cascade" data-delay="300">
                  <div class="feature-icon animate-bounce-glow">🤝</div>
                  <div class="feature-content">
                    <span class="feature-title">Mise en relation</span>
                    <p>Connexion avec les acteurs clés de votre secteur et partenaires potentiels pour développer votre réseau professionnel.</p>
                  </div>
                </li>
              </ul>
              
              <div class="service-cta">
                <router-link to="/rendez-vous" class="btn-service animate-magnetic">
                  <span class="btn-text">Demander un accompagnement</span>
                  <div class="btn-ripple"></div>
                  <div class="btn-arrow">→</div>
                </router-link>
              </div>
            </div>
          </div>
          <div class="service-image reveal-right">
            <div class="image-container animate-3d-tilt">
              <div class="image-frame"></div>
              <img src="/images/m1.jpg" alt="Accompagnement des entreprises" />
              <div class="image-overlay animate-gradient-flow"></div>
              <div class="image-particles">
                <div class="particle particle-1"></div>
                <div class="particle particle-2"></div>
                <div class="particle particle-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

   

    <!-- Section Formation -->
    <section id="formation" class="service-section">
      <div class="section-background">
        <div class="floating-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
        </div>
      </div>
      <div class="container">
        <div class="service-content">
          <div class="service-text reveal-left">
            <div class="service-header">
              <div class="service-icon animate-morph">
                <div class="icon-glow"></div>
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
                </svg>
              </div>
              <h2 class="animate-text-wave">Formation Professionnelle</h2>
            </div>
            <div class="service-description">
              <p class="animate-typewriter">Nous proposons des programmes de formation adaptés aux besoins spécifiques des commerçants, entrepreneurs et professionnels de la région de Nador.</p>
              
              <h3 class="animate-slide-in">Notre offre de formation comprend :</h3>
              <ul class="features-list">
                <li class="feature-item animate-cascade" data-delay="0">
                  <div class="feature-icon animate-bounce-glow">🛠️</div>
                  <div class="feature-content">
                    <span class="feature-title">Ateliers pratiques</span>
                    <p>Sessions pratiques sur des sujets concrets comme la comptabilité, le marketing digital ou la gestion d'entreprise.</p>
                  </div>
                </li>
                <li class="feature-item animate-cascade" data-delay="100">
                  <div class="feature-icon animate-bounce-glow">🎓</div>
                  <div class="feature-content">
                    <span class="feature-title">Séminaires thématiques</span>
                    <p>Événements spécialisés animés par des experts pour approfondir vos connaissances dans votre domaine d'activité.</p>
                  </div>
                </li>
                <li class="feature-item animate-cascade" data-delay="200">
                  <div class="feature-icon animate-bounce-glow">📈</div>
                  <div class="feature-content">
                    <span class="feature-title">Formation continue</span>
                    <p>Programmes de développement des compétences pour vous et vos employés, adaptés aux évolutions du marché.</p>
                  </div>
                </li>
                <li class="feature-item animate-cascade" data-delay="300">
                  <div class="feature-icon animate-bounce-glow">🏆</div>
                  <div class="feature-content">
                    <span class="feature-title">Certification professionnelle</span>
                    <p>Formations certifiantes reconnues pour valoriser vos compétences et celles de votre équipe.</p>
                  </div>
                </li>
              </ul>
              
              <div class="service-cta">
                <router-link to="/formations" class="btn-service animate-magnetic">
                  <span class="btn-text">S'inscrire à une formation</span>
                  <div class="btn-ripple"></div>
                  <div class="btn-arrow">→</div>
                </router-link>
              </div>
            </div>
          </div>
          <div class="service-image reveal-right">
            <div class="image-container animate-3d-tilt">
              <div class="image-frame"></div>
              <img src="/images/m1.jpg" alt="Formation professionnelle" />
              <div class="image-overlay animate-gradient-flow"></div>
              <div class="image-particles">
                <div class="particle particle-1"></div>
                <div class="particle particle-2"></div>
                <div class="particle particle-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    


    <!-- Section Contact Ultra-Professionnelle -->
    <section class="contact-section">
      <div class="contact-background">
        <div class="contact-particles"></div>
        <div class="contact-waves">
          <div class="wave wave-1"></div>
          <div class="wave wave-2"></div>
        </div>
      </div>
      <div class="container">
        <div class="contact-content reveal-bottom">
          <div class="contact-badge animate-float">
            <span class="badge-icon animate-pulse-glow">🚀</span>
            Transformation Digitale
          </div>
          <h2 class="contact-title animate-slide-up">
            Prêt à <span class="title-highlight">transformer</span> votre entreprise ?
          </h2>
          <p class="contact-subtitle animate-fade-up-delay">
            Notre équipe d'experts est à votre disposition pour vous accompagner dans tous vos projets de développement et de croissance
          </p>
          <div class="contact-features animate-fade-up-delay-2">
            <div class="feature-pill">✨ Consultation gratuite</div>
            <div class="feature-pill">⚡ Réponse sous 24h</div>
            <div class="feature-pill">🎯 Solutions sur mesure</div>
          </div>
          <div class="contact-actions animate-fade-up-delay-3">
            <router-link to="/rendez-vous" class="btn-primary animate-magnetic">
              <span class="btn-text">Contactez-nous</span>
              <div class="btn-ripple"></div>
            </router-link>
            <a href="tel:+212536603857" class="btn-secondary animate-magnetic">
              <i class="fas fa-phone-alt"></i>
              <span>+212 536 603 857</span>
            </a>
          </div>
          <div class="contact-stats animate-fade-up-delay-4">
            <div class="stat-item">
              <div class="stat-number animate-counter" data-target="1200">0</div>
              <div class="stat-label">Entreprises accompagnées</div>
            </div>
            <div class="stat-item">
              <div class="stat-number animate-counter" data-target="98">0</div>
              <div class="stat-label">% Satisfaction</div>
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
import { onMounted, onUnmounted } from 'vue'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'

// Configuration de l'intersection observer pour les animations au défilement
let revealObserver = null
let countersObserver = null

onMounted(() => {
  // Animation des compteurs
  const animateCounter = (element, target) => {
    let current = 0
    const increment = target / 100
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      element.textContent = Math.floor(current)
    }, 20)
  }

  // Observer pour les compteurs
  countersObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target)
        animateCounter(entry.target, target)
        countersObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.5 })

  // Observer tous les compteurs
  document.querySelectorAll('.animate-counter').forEach(counter => {
    countersObserver.observe(counter)
  })

  // Fonction pour animer les éléments au défilement
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed')
        
        // Animation spéciale pour les éléments en cascade
        if (entry.target.classList.contains('animate-cascade')) {
          const delay = parseInt(entry.target.dataset.delay) || 0
          setTimeout(() => {
            entry.target.classList.add('cascade-revealed')
          }, delay)
        }
        
        revealObserver.unobserve(entry.target)
      }
    })
  }, { 
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  })

  // Observer tous les éléments avec les classes d'animation
  document.querySelectorAll('.reveal-left, .reveal-right, .reveal-bottom, .animate-cascade').forEach(el => {
    revealObserver.observe(el)
  })

  // Animation des items de navigation au survol
  const navItems = document.querySelectorAll('.nav-item')
  
  navItems.forEach((item, index) => {
    // Animation d'entrée avec délai
    setTimeout(() => {
      item.classList.add('nav-revealed')
    }, index * 100)
    
    item.addEventListener('mouseenter', () => {
      item.classList.add('nav-item-hover')
    })
    
    item.addEventListener('mouseleave', () => {
      item.classList.remove('nav-item-hover')
    })
  })

  // Smoothscroll pour la navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault()
      
      const targetId = this.getAttribute('href')
      const targetElement = document.querySelector(targetId)
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        })
      }
    })
  })

  // Animation des particules flottantes
  const createFloatingParticles = () => {
    const particles = document.querySelectorAll('.hero-particles, .contact-particles')
    particles.forEach(container => {
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div')
        particle.className = 'floating-particle'
        particle.style.left = Math.random() * 100 + '%'
        particle.style.animationDelay = Math.random() * 10 + 's'
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's'
        container.appendChild(particle)
      }
    })
  }

  createFloatingParticles()
})

onUnmounted(() => {
  if (revealObserver) {
    revealObserver.disconnect()
  }
  if (countersObserver) {
    countersObserver.disconnect()
  }
})
</script>

<style scoped>
/* Styles généraux */
.services-page {
  width: 100%;
  overflow-x: hidden;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Animations ultra-professionnelles */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes pulse-glow {
  0%, 100% { 
    transform: scale(1);
    box-shadow: 0 0 20px rgba(255, 193, 7, 0.6);
  }
  50% { 
    transform: scale(1.1);
    box-shadow: 0 0 30px rgba(255, 193, 7, 0.8);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scaleX(0);
  }
  to {
    opacity: 1;
    transform: scaleX(1);
  }
}

@keyframes fade-up-delay {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

@keyframes rotate-3d {
  from { transform: rotateY(0deg); }
  to { transform: rotateY(360deg); }
}

@keyframes morph {
  0%, 100% { 
    transform: scale(1) rotate(0deg);
    border-radius: 50%;
  }
  25% { 
    transform: scale(1.1) rotate(90deg);
    border-radius: 30%;
  }
  50% { 
    transform: scale(1.2) rotate(180deg);
    border-radius: 20%;
  }
  75% { 
    transform: scale(1.1) rotate(270deg);
    border-radius: 40%;
  }
}

@keyframes text-wave {
  0%, 100% { transform: translateY(0); }
  25% { transform: translateY(-5px); }
  50% { transform: translateY(0); }
  75% { transform: translateY(-3px); }
}

@keyframes typewriter {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes cascade {
  from {
    opacity: 0;
    transform: translateX(-30px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes bounce-glow {
  0%, 100% { 
    transform: scale(1);
    filter: drop-shadow(0 0 10px rgba(33, 150, 243, 0.6));
  }
  50% { 
    transform: scale(1.2);
    filter: drop-shadow(0 0 20px rgba(33, 150, 243, 0.8));
  }
}

@keyframes magnetic {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

@keyframes tilt-3d {
  0%, 100% { transform: perspective(1000px) rotateX(0deg) rotateY(0deg); }
  25% { transform: perspective(1000px) rotateX(5deg) rotateY(-5deg); }
  50% { transform: perspective(1000px) rotateX(-5deg) rotateY(5deg); }
  75% { transform: perspective(1000px) rotateX(5deg) rotateY(5deg); }
}

@keyframes gradient-flow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes floating-particle {
  0%, 100% { 
    transform: translateY(0px) translateX(0px);
    opacity: 0.3;
  }
  25% { 
    transform: translateY(-20px) translateX(10px);
    opacity: 0.7;
  }
  50% { 
    transform: translateY(-10px) translateX(-15px);
    opacity: 1;
  }
  75% { 
    transform: translateY(-30px) translateX(5px);
    opacity: 0.5;
  }
}

@keyframes wave-animation {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Classes d'animation */
.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

.animate-slide-up {
  animation: slide-up 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

.animate-scale-in {
  animation: scale-in 1.2s cubic-bezier(0.165, 0.84, 0.44, 1) 0.5s forwards;
}

.animate-fade-up-delay {
  animation: fade-up-delay 1s cubic-bezier(0.165, 0.84, 0.44, 1) 0.8s forwards;
  opacity: 0;
}

.animate-fade-up-delay-2 {
  animation: fade-up-delay 1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.2s forwards;
  opacity: 0;
}

.animate-fade-up-delay-3 {
  animation: fade-up-delay 1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.6s forwards;
  opacity: 0;
}

.animate-fade-up-delay-4 {
  animation: fade-up-delay 1s cubic-bezier(0.165, 0.84, 0.44, 1) 2s forwards;
  opacity: 0;
}

.animate-bounce {
  animation: bounce 2s infinite;
}

.animate-3d-rotate:hover {
  animation: rotate-3d 1s ease-in-out;
}

.animate-morph {
  animation: morph 4s ease-in-out infinite;
}

.animate-text-wave {
  animation: text-wave 2s ease-in-out infinite;
}

.animate-typewriter {
  overflow: hidden;
  white-space: nowrap;
  animation: typewriter 3s steps(40, end) forwards;
}

.animate-slide-in {
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.animate-slide-in.revealed {
  opacity: 1;
  transform: translateX(0);
}

.animate-cascade {
  opacity: 0;
  transform: translateX(-30px) scale(0.8);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.animate-cascade.cascade-revealed {
  animation: cascade 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

.animate-bounce-glow {
  animation: bounce-glow 3s ease-in-out infinite;
}

.animate-magnetic:hover {
  animation: magnetic 0.3s ease-in-out;
}

.animate-3d-tilt {
  animation: tilt-3d 8s ease-in-out infinite;
}

.animate-gradient-flow {
  background: linear-gradient(45deg, rgba(76, 175, 80, 0.8), rgba(33, 150, 243, 0.8), rgba(156, 39, 176, 0.8));
  background-size: 300% 300%;
  animation: gradient-flow 4s ease infinite;
}

.animate-nav-item {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.animate-nav-item.nav-revealed {
  opacity: 1;
  transform: translateY(0);
}

.floating-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%);
  border-radius: 50%;
  animation: floating-particle 15s linear infinite;
}

/* Hero section ultra-professionnel */
.services-hero {
  height: 100vh;
  min-height: 600px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.hero-particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.hero-waves {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  overflow: hidden;
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 100px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  animation: wave-animation 8s linear infinite;
}

.wave-1 {
  animation-delay: 0s;
  height: 80px;
}

.wave-2 {
  animation-delay: -2s;
  height: 60px;
  opacity: 0.7;
}

.wave-3 {
  animation-delay: -4s;
  height: 40px;
  opacity: 0.5;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8));
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 900px;
  padding: 0 20px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.badge-icon {
  font-size: 1.2rem;
}

.hero-title {
  font-size: 4rem;
  margin-bottom: 2rem;
  font-weight: 800;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  line-height: 1.1;
}

.title-main {
  display: block;
  color: white;
}

.title-highlight {
  display: block;
  background: linear-gradient(45deg, #FFD700, #FFA500);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-top: 0.5rem;
}

.hero-divider {
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #FFD700, #FFA500);
  margin: 2rem auto;
  border-radius: 2px;
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
}

.hero-subtitle {
  font-size: 1.3rem;
  max-width: 700px;
  margin: 0 auto 3rem;
  line-height: 1.7;
  opacity: 0.95;
  font-weight: 400;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 3rem;
}

.stat-item {
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1.5rem 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: #FFD700;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 10px rgba(255, 215, 0, 0.3);
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
  font-weight: 500;
}

.hero-scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.scroll-arrow {
  width: 30px;
  height: 30px;
  border: 2px solid white;
  border-top: none;
  border-left: none;
  transform: rotate(45deg);
  opacity: 0.7;
}

/* Animation des éléments hero */
.slide-in-bottom {
  opacity: 0;
  transform: translateY(50px);
  animation: slideInBottom 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

.slide-in-bottom-delay {
  opacity: 0;
  transform: translateY(50px);
  animation: slideInBottom 1s cubic-bezier(0.165, 0.84, 0.44, 1) 0.3s forwards;
}

.slide-in-bottom-delay-2 {
  opacity: 0;
  transform: translateY(50px);
  animation: slideInBottom 1s cubic-bezier(0.165, 0.84, 0.44, 1) 0.6s forwards;
}

@keyframes slideInBottom {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Navigation des services avec animations avancées */
.services-nav {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.8rem 1.2rem;
  text-decoration: none;
  color: #333;
  flex: 1;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  border-bottom: 3px solid transparent;
  position: relative;
  background: transparent;
  overflow: hidden;
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}

.nav-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  opacity: 0;
  transition: opacity 0.4s ease;
}

.nav-item:hover {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.08), rgba(118, 75, 162, 0.08));
  color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.15);
}

.nav-item:hover .nav-glow {
  opacity: 1;
}

.nav-item:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.nav-icon {
  font-size: 1.5rem;
  margin-bottom: 0.8rem;
  color: #667eea;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  position: relative;
  z-index: 2;
}

.nav-icon svg {
  width: 32px;
  height: 32px;
  fill: currentColor;
  filter: drop-shadow(0 4px 8px rgba(102, 126, 234, 0.2));
}

.nav-item:hover .nav-icon {
  transform: translateY(-8px) scale(1.1);
  color: #764ba2;
}

.nav-text {
  font-weight: 600;
  font-size: 0.95rem;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

.nav-item-hover {
  color: #667eea;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.08), rgba(118, 75, 162, 0.08));
  transform: translateY(-2px);
}

.nav-item-hover .nav-icon {
  transform: translateY(-8px) scale(1.1);
  color: #764ba2;
}

/* Sections de service avec animations avancées */
.service-section {
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
}

.section-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.floating-shapes {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  animation: floating-particle 20s linear infinite;
}

.shape-1 {
  width: 100px;
  height: 100px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 60px;
  height: 60px;
  top: 60%;
  right: 15%;
  animation-delay: -5s;
}

.shape-3 {
  width: 80px;
  height: 80px;
  bottom: 20%;
  left: 70%;
  animation-delay: -10s;
}

.shape-4 {
  width: 120px;
  height: 120px;
  top: 30%;
  right: 20%;
  animation-delay: -2s;
}

.shape-5 {
  width: 40px;
  height: 40px;
  bottom: 40%;
  left: 20%;
  animation-delay: -7s;
}

.shape-6 {
  width: 90px;
  height: 90px;
  top: 70%;
  right: 60%;
  animation-delay: -12s;
}

.service-section.service-alt {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.service-content {
  display: flex;
  align-items: center;
  gap: 5rem;
  position: relative;
  z-index: 1;
}

.service-text {
  flex: 1;
  transform: translateX(-50px);
  opacity: 0;
  transition: all 1.2s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.service-text.revealed {
  transform: translateX(0);
  opacity: 1;
}

.service-image {
  flex: 1;
  transform: translateX(50px);
  opacity: 0;
  transition: all 1.2s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.service-image.revealed {
  transform: translateX(0);
  opacity: 1;
}

.reveal-left {
  transform: translateX(-50px);
  opacity: 0;
  transition: all 1.2s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.reveal-right {
  transform: translateX(50px);
  opacity: 0;
  transition: all 1.2s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.reveal-bottom {
  transform: translateY(50px);
  opacity: 0;
  transition: all 1.2s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.reveal-left.revealed,
.reveal-right.revealed,
.reveal-bottom.revealed {
  transform: translate(0);
  opacity: 1;
}

.service-header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1.5rem;
}

.service-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;
}

.icon-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  animation: rotate-3d 6s linear infinite;
}

.service-icon svg {
  width: 40px;
  height: 40px;
  fill: white;
  position: relative;
  z-index: 2;
}

.service-header h2 {
  font-size: 2.5rem;
  color: #333;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(135deg, #333, #667eea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.service-description {
  color: #555;
  position: relative;
  z-index: 1;
}

.service-description p {
  margin-bottom: 2rem;
  line-height: 1.8;
  font-size: 1.1rem;
}

.service-description h3 {
  font-size: 1.4rem;
  color: #2c3e50;
  margin: 2.5rem 0 2rem;
  font-weight: 700;
}

.features-list {
  padding-left: 0;
  list-style: none;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.feature-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 2rem;
  min-width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  border-radius: 50%;
  border: 2px solid rgba(102, 126, 234, 0.2);
}

.feature-content {
  flex: 1;
}

.feature-title {
  display: block;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.8rem;
  font-size: 1.2rem;
}

.feature-content p {
  margin: 0;
  line-height: 1.6;
  color: #666;
}

.service-cta {
  margin-top: 3rem;
}

.btn-service {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem 2.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  border: none;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.btn-ripple {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.btn-arrow {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.btn-service:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
}

.btn-service:hover .btn-ripple {
  opacity: 1;
}

.btn-service:hover .btn-arrow {
  transform: translateX(5px);
}

.image-container {
  width: 100%;
  height: 450px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.image-frame {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 25px;
  z-index: -1;
}

.image-container:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.8s ease;
}

.image-container:hover img {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3));
  z-index: 1;
}

.image-particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  animation: floating-particle 12s linear infinite;
}

.particle-1 {
  top: 20%;
  left: 20%;
  animation-delay: 0s;
}

.particle-2 {
  top: 60%;
  right: 30%;
  animation-delay: -4s;
}

.particle-3 {
  bottom: 30%;
  left: 70%;
  animation-delay: -8s;
}

/* Section Contact Ultra-Professionnelle */
.contact-section {
  padding: 6rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.contact-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.contact-particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.contact-waves {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  overflow: hidden;
}

.contact-content {
  padding: 3rem;
  position: relative;
  z-index: 2;
}

.contact-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.contact-title {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  font-weight: 800;
  line-height: 1.2;
}

.contact-subtitle {
  font-size: 1.3rem;
  margin-bottom: 2.5rem;
  opacity: 0.95;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.contact-features {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.feature-pill {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
}

.contact-actions {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem 2.5rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1.2rem 2.5rem;
  background: transparent;
  color: white;
  text-decoration: none;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: white;
  transform: translateY(-3px);
}

.contact-stats {
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin-top: 3rem;
}

.contact-stats .stat-item {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem 2.5rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.contact-stats .stat-number {
  font-size: 3rem;
  font-weight: 800;
  color: #FFD700;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 10px rgba(255, 215, 0, 0.3);
}

.contact-stats .stat-label {
  font-size: 1rem;
  opacity: 0.9;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 992px) {
  .service-content {
    flex-direction: column;
    gap: 3rem;
  }
  
  .service-section.service-alt .service-content {
    flex-direction: column;
  }
  
  .service-image {
    order: -1;
  }
  
  .reveal-left, .reveal-right {
    transform: translateY(50px);
  }
  
  .reveal-left.revealed, .reveal-right.revealed {
    transform: translateY(0);
  }
  
  .image-container {
    height: 300px;
  }
}

@media (max-width: 768px) {
  .services-hero {
    height: 40vh;
    min-height: 300px;
  }
  
  .hero-content h1 {
    font-size: 2.5rem;
  }
  
  .services-nav {
    overflow-x: auto;
    padding: 0.5rem 0;
  }
  
  .nav-container {
    width: max-content;
    padding: 0 1rem;
  }
  
  .nav-item {
    padding: 0.8rem 1.5rem;
    min-width: 120px;
  }
  
  .service-section {
    padding: 3rem 0;
  }
  
  .service-header {
    flex-direction: column;
    text-align: center;
  }
  
  .service-icon {
    margin-right: 0;
    margin-bottom: 1rem;
  }
  
  .service-header h2 {
    font-size: 1.8rem;
  }
  
  .contact-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-primary, .btn-secondary {
    width: 100%;
  }
}
</style> 