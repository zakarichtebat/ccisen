<template>
  <div class="home">
    <TheHeader />
    
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="animate-fade-in">Bienvenue sur CCISN</h1>
        <p class="animate-fade-in-delay">Votre partenaire de confiance pour le développement de votre entreprise</p>
        <div class="hero-buttons animate-fade-in-delay-2">
          <router-link to="/services" class="cta-button">Découvrir nos services</router-link>
          <router-link to="/contact" class="secondary-button">Nous contacter</router-link>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services">
      <h2 class="section-title">Nos Services</h2>
      <div class="services-grid">
        <div class="service-card animate-slide-up">
          <div class="service-icon">📊</div>
          <h3>Consultation</h3>
          <p>Conseils stratégiques pour le développement de votre entreprise</p>
        </div>
        <div class="service-card animate-slide-up-delay">
          <div class="service-icon">🤝</div>
          <h3>Réseau</h3>
          <p>Accès à un réseau professionnel étendu</p>
        </div>
        <div class="service-card animate-slide-up-delay-2">
          <div class="service-icon">📈</div>
          <h3>Formation</h3>
          <p>Programmes de formation adaptés à vos besoins</p>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="feature-content">
        <div class="feature-text animate-slide-right">
          <h2>Pourquoi nous choisir ?</h2>
          <ul class="feature-list">
            <li>Expertise reconnue</li>
            <li>Accompagnement personnalisé</li>
            <li>Solutions innovantes</li>
            <li>Réseau professionnel étendu</li>
          </ul>
        </div>
        <div class="feature-image animate-slide-left">
          <div class="placeholder-image">
            <div class="placeholder-content">
              <span class="placeholder-icon">🏢</span>
              <h3>CCISN</h3>
              <p>Votre partenaire de confiance</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="cta-section">
      <div class="cta-content animate-fade-in">
        <h2>Prêt à développer votre entreprise ?</h2>
        <p>Rejoignez-nous dès aujourd'hui et bénéficiez de nos services exclusifs</p>
        <router-link to="/register" class="cta-button">Commencer maintenant</router-link>
      </div>
    </section>

    <TheFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'

const router = useRouter()
const user = ref(null)

onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
  }
})

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  user.value = null
  router.push('/login')
}
</script>

<style scoped>
.home {
  min-height: 100vh;
}

/* Hero Section */
.hero {
  height: 100vh;
  background: linear-gradient(135deg, #2c3e50, #3498db);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 0 2rem;
}

.hero-content {
  max-width: 800px;
}

.hero h1 {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
}

.hero p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

/* Services Section */
.services {
  padding: 5rem 2rem;
  background-color: #f8f9fa;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #2c3e50;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.service-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.service-card:hover {
  transform: translateY(-10px);
}

.service-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

/* Features Section */
.features {
  padding: 5rem 2rem;
  background-color: white;
}

.feature-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.feature-text h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  margin: 1rem 0;
  padding-left: 2rem;
  position: relative;
}

.feature-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #4CAF50;
}

.feature-image img {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.placeholder-image {
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}

.placeholder-content {
  color: #2c3e50;
}

.placeholder-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  display: block;
}

.placeholder-content h3 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(45deg, #4CAF50, #2196F3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.placeholder-content p {
  font-size: 1.2rem;
  color: #666;
}

/* CTA Section */
.cta-section {
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #4CAF50, #2196F3);
  color: white;
  text-align: center;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
}

.cta-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

/* Buttons */
.cta-button {
  display: inline-block;
  padding: 1rem 2rem;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background-color: #45a049;
  transform: translateY(-2px);
}

.secondary-button {
  display: inline-block;
  padding: 1rem 2rem;
  background-color: transparent;
  color: white;
  text-decoration: none;
  border: 2px solid white;
  border-radius: 5px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.secondary-button:hover {
  background-color: white;
  color: #2c3e50;
  transform: translateY(-2px);
}

/* Animations */
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

/* Responsive Design */
@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.5rem;
  }

  .hero p {
    font-size: 1.2rem;
  }

  .feature-content {
    grid-template-columns: 1fr;
  }

  .hero-buttons {
    flex-direction: column;
  }

  .cta-button, .secondary-button {
    width: 100%;
    margin: 0.5rem 0;
  }
}
</style> 