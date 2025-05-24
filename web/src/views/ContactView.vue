<template>
  <div class="contact-page">
    <TheHeader />
    
    <!-- Section Hero Contact -->
    <section class="contact-hero">
      <div class="hero-background">
        <div class="hero-overlay"></div>
      </div>
      <div class="container">
        <div class="hero-content">
          <h1 class="animate-fade-in">Contactez-nous</h1>
          <p class="animate-fade-in-delay">Nous sommes là pour vous accompagner dans vos projets</p>
        </div>
      </div>
    </section>

    <!-- Section principale de contact -->
    <section class="contact-main">
      <div class="container">
        <div class="contact-content">
          <!-- Informations de contact -->
          <div class="contact-info">
            <div class="info-card">
              <div class="info-header">
                <h2>Chambre de Commerce de Nador</h2>
                <p>Votre partenaire pour le développement économique</p>
              </div>
              
              <div class="contact-details">
                <div class="contact-item">
                  <div class="contact-icon">
                    <i class="fas fa-envelope"></i>
                  </div>
                  <div class="contact-text">
                    <h4>Email</h4>
                    <p>zakariachtebat@gmail.com</p>
                  </div>
                </div>
                
                <div class="contact-item">
                  <div class="contact-icon">
                    <i class="fas fa-phone"></i>
                  </div>
                  <div class="contact-text">
                    <h4>Téléphone</h4>
                    <p>+212 5 36 XX XX XX</p>
                  </div>
                </div>
                
                <div class="contact-item">
                  <div class="contact-icon">
                    <i class="fas fa-map-marker-alt"></i>
                  </div>
                  <div class="contact-text">
                    <h4>Adresse</h4>
                    <p>Avenue Mohammed V<br>Nador, Maroc</p>
                  </div>
                </div>
                
                <div class="contact-item">
                  <div class="contact-icon">
                    <i class="fas fa-clock"></i>
                  </div>
                  <div class="contact-text">
                    <h4>Horaires d'ouverture</h4>
                    <p>Lundi - Vendredi: 8h00 - 17h00<br>Samedi: 8h00 - 12h00</p>
                  </div>
                </div>
              </div>
              
              <!-- Réseaux sociaux -->
              <div class="social-links">
                <h4>Suivez-nous</h4>
                <div class="social-icons">
                  <a href="#" class="social-link facebook">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" class="social-link linkedin">
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                  <a href="#" class="social-link twitter">
                    <i class="fab fa-twitter"></i>
                  </a>
                  <a href="#" class="social-link instagram">
                    <i class="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Formulaire de contact -->
          <div class="contact-form">
            <div class="form-card">
              <div class="form-header">
                <h3>Envoyez-nous un message</h3>
                <p>Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais</p>
              </div>
              
              <form @submit.prevent="submitForm" class="contact-form-content">
                <div class="form-row">
                  <div class="input-group">
                    <label for="nom">Nom *</label>
                    <input 
                      type="text" 
                      id="nom" 
                      v-model="formData.nom" 
                      required
                      :class="{ 'error': errors.nom }"
                    >
                    <span v-if="errors.nom" class="error-message">{{ errors.nom }}</span>
                  </div>
                  
                  <div class="input-group">
                    <label for="prenom">Prénom *</label>
                    <input 
                      type="text" 
                      id="prenom" 
                      v-model="formData.prenom" 
                      required
                      :class="{ 'error': errors.prenom }"
                    >
                    <span v-if="errors.prenom" class="error-message">{{ errors.prenom }}</span>
                  </div>
                </div>
                
                <div class="form-row">
                  <div class="input-group">
                    <label for="email">Email *</label>
                    <input 
                      type="email" 
                      id="email" 
                      v-model="formData.email" 
                      required
                      :class="{ 'error': errors.email }"
                    >
                    <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
                  </div>
                  
                  <div class="input-group">
                    <label for="telephone">Téléphone</label>
                    <input 
                      type="tel" 
                      id="telephone" 
                      v-model="formData.telephone"
                    >
                  </div>
                </div>
                
                <div class="input-group">
                  <label for="entreprise">Entreprise</label>
                  <input 
                    type="text" 
                    id="entreprise" 
                    v-model="formData.entreprise"
                  >
                </div>
                
                <div class="input-group">
                  <label for="sujet">Sujet *</label>
                  <select 
                    id="sujet" 
                    v-model="formData.sujet" 
                    required
                    :class="{ 'error': errors.sujet }"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="information">Demande d'informations</option>
                    <option value="adhesion">Adhésion</option>
                    <option value="formation">Formation</option>
                    <option value="certificat">Certificats et documents</option>
                    <option value="accompagnement">Accompagnement entreprise</option>
                    <option value="export">Export et commerce international</option>
                    <option value="autre">Autre</option>
                  </select>
                  <span v-if="errors.sujet" class="error-message">{{ errors.sujet }}</span>
                </div>
                
                <div class="input-group">
                  <label for="message">Message *</label>
                  <textarea 
                    id="message" 
                    v-model="formData.message" 
                    rows="6"
                    required
                    :class="{ 'error': errors.message }"
                    placeholder="Décrivez votre demande en détail..."
                  ></textarea>
                  <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
                </div>
                
                <div class="form-actions">
                  <button 
                    type="submit" 
                    class="submit-button"
                    :disabled="isSubmitting"
                  >
                    <i class="fas fa-paper-plane"></i>
                    {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer le message' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Section carte/localisation -->
    <section class="location-section">
      <div class="container">
        <div class="location-content">
          <div class="location-info">
            <h3>Notre localisation</h3>
            <p>Trouvez-nous facilement au cœur de Nador</p>
            <div class="location-details">
              <div class="location-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>Avenue Mohammed V, Nador, Maroc</span>
              </div>
              <div class="location-item">
                <i class="fas fa-directions"></i>
                <span>À proximité du centre-ville</span>
              </div>
              <div class="location-item">
                <i class="fas fa-car"></i>
                <span>Parking disponible</span>
              </div>
              <div class="location-item">
                <i class="fas fa-bus"></i>
                <span>Accessible en transport public</span>
              </div>
            </div>
          </div>
          
          <div class="map-container">
            <GoogleMap 
              :latitude="35.1739"
              :longitude="-2.9286"
              location-name="CCIS Nador - Avenue Mohammed V"
              :zoom="15"
            />
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
import { ref, reactive } from 'vue'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import GoogleMap from '@/components/GoogleMap.vue'
import { apiService } from '@/services/api.js'

// État réactif du formulaire
const formData = reactive({
  nom: '',
  prenom: '',
  email: '',
  telephone: '',
  entreprise: '',
  sujet: '',
  message: ''
})

// États pour la gestion des erreurs et des messages
const errors = ref({})
const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Validation du formulaire
const validateForm = () => {
  errors.value = {}
  
  if (!formData.nom.trim()) {
    errors.value.nom = 'Le nom est requis'
  }
  
  if (!formData.prenom.trim()) {
    errors.value.prenom = 'Le prénom est requis'
  }
  
  if (!formData.email.trim()) {
    errors.value.email = 'L\'email est requis'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.value.email = 'Email invalide'
  }
  
  if (!formData.sujet) {
    errors.value.sujet = 'Veuillez sélectionner un sujet'
  }
  
  if (!formData.message.trim()) {
    errors.value.message = 'Le message est requis'
  } else if (formData.message.trim().length < 10) {
    errors.value.message = 'Le message doit contenir au moins 10 caractères'
  }
  
  return Object.keys(errors.value).length === 0
}

// Soumission du formulaire
const submitForm = async () => {
  if (!validateForm()) {
    return
  }
  
  isSubmitting.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    // Appel à l'API via le service centralisé
    const result = await apiService.sendContactMessage(formData)
    
    // Succès
    successMessage.value = result.message || 'Votre message a été envoyé avec succès !'
    
    // Réinitialiser le formulaire
    Object.keys(formData).forEach(key => {
      formData[key] = ''
    })
    
    // Auto-masquer le message après 8 secondes
    setTimeout(() => {
      successMessage.value = ''
    }, 8000)
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi:', error)
    
    // Fallback vers mailto si l'API ne fonctionne pas
    const subject = encodeURIComponent(`Contact CCIS - ${formData.sujet}`)
    const body = encodeURIComponent(`
Nom: ${formData.nom} ${formData.prenom}
Email: ${formData.email}
Téléphone: ${formData.telephone || 'Non renseigné'}
Entreprise: ${formData.entreprise || 'Non renseignée'}
Sujet: ${formData.sujet}

Message:
${formData.message}
    `.trim())
    
    const mailtoLink = `mailto:zakariachtebat@gmail.com?subject=${subject}&body=${body}`
    window.location.href = mailtoLink
    
    successMessage.value = 'Votre client de messagerie s\'est ouvert. Envoyez l\'email pour finaliser votre demande.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  margin-top: 80px;
  background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
}

/* Section Hero Améliorée */
.contact-hero {
  height: 450px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(76, 175, 80, 0.95) 0%,
    rgba(33, 150, 243, 0.9) 50%,
    rgba(156, 39, 176, 0.85) 100%
  );
  animation: gradientShift 8s ease-in-out infinite;
}

@keyframes gradientShift {
  0%, 100% {
    background: linear-gradient(135deg, rgba(76, 175, 80, 0.95), rgba(33, 150, 243, 0.9));
  }
  50% {
    background: linear-gradient(135deg, rgba(33, 150, 243, 0.9), rgba(156, 39, 176, 0.85));
  }
}

.hero-content {
  text-align: center;
  z-index: 2;
  max-width: 800px;
  padding: 0 2rem;
}

.hero-content h1 {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  font-weight: 800;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.02em;
  background: linear-gradient(45deg, #ffffff, #f0f9ff);
  background-clip: text;
  -webkit-background-clip: text;
}

.hero-content p {
  font-size: 1.4rem;
  opacity: 0.95;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  font-weight: 500;
  letter-spacing: 0.025em;
}

/* Section principale */
.contact-main {
  padding: 6rem 0;
  background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
  position: relative;
}

.contact-main::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(180deg, rgba(76, 175, 80, 0.05) 0%, transparent 100%);
  pointer-events: none;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 5rem;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* Informations de contact améliorées */
.info-card {
  background: linear-gradient(145deg, #ffffff, #f8fafc);
  border-radius: 28px;
  padding: 3rem;
  box-shadow: 
    0 32px 64px rgba(0, 0, 0, 0.08),
    0 16px 32px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  height: fit-content;
  border: 1px solid rgba(255, 255, 255, 0.5);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: slideInLeft 0.8s ease-out;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.info-card:hover {
  transform: translateY(-8px);
  box-shadow: 
    0 40px 80px rgba(0, 0, 0, 0.12),
    0 24px 48px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.info-header h2 {
  color: #1e293b;
  font-size: 2.2rem;
  margin-bottom: 0.75rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #4CAF50, #2196F3);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.info-header p {
  color: #64748b;
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.6;
}

.contact-details {
  margin-bottom: 2.5rem;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  border-radius: 20px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.contact-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.05), rgba(33, 150, 243, 0.05));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.contact-item:hover::before {
  opacity: 1;
}

.contact-item:hover {
  transform: translateX(8px) scale(1.02);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}

.contact-icon {
  width: 64px;
  height: 64px;
  border-radius: 20px;
  background: linear-gradient(135deg, #4CAF50 0%, #2196F3 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 12px 24px rgba(76, 175, 80, 0.3);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 1;
}

.contact-icon:hover {
  transform: rotate(10deg) scale(1.1);
  box-shadow: 0 20px 40px rgba(76, 175, 80, 0.4);
}

.contact-icon i {
  color: white;
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.contact-icon:hover i {
  transform: scale(1.2);
}

.contact-text {
  position: relative;
  z-index: 1;
}

.contact-text h4 {
  color: #1e293b;
  margin: 0 0 0.75rem;
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: 0.025em;
}

.contact-text p {
  color: #64748b;
  margin: 0;
  line-height: 1.6;
  font-weight: 500;
}

/* Réseaux sociaux améliorés */
.social-links {
  border-top: 1px solid rgba(148, 163, 184, 0.2);
  padding-top: 2.5rem;
  margin-top: 1rem;
}

.social-links h4 {
  color: #1e293b;
  margin-bottom: 1.5rem;
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: 0.025em;
}

.social-icons {
  display: flex;
  gap: 1.5rem;
}

.social-link {
  width: 56px;
  height: 56px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.social-link::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate(-50%, -50%);
}

.social-link:hover::before {
  width: 100px;
  height: 100px;
}

.social-link.facebook { background: linear-gradient(135deg, #1877f2, #42a5f5); }
.social-link.linkedin { background: linear-gradient(135deg, #0a66c2, #1976d2); }
.social-link.twitter { background: linear-gradient(135deg, #1da1f2, #42a5f5); }
.social-link.instagram { 
  background: linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); 
}

.social-link:hover {
  transform: translateY(-6px) scale(1.1);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.25);
}

.social-link i {
  position: relative;
  z-index: 1;
  font-size: 1.4rem;
  transition: transform 0.3s ease;
}

.social-link:hover i {
  transform: scale(1.2);
}

/* Formulaire de contact amélioré */
.form-card {
  background: linear-gradient(145deg, #ffffff, #f8fafc);
  border-radius: 28px;
  padding: 3rem;
  box-shadow: 
    0 32px 64px rgba(0, 0, 0, 0.08),
    0 16px 32px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.5);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: slideInRight 0.8s ease-out 0.2s both;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.form-card:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 40px 80px rgba(0, 0, 0, 0.12),
    0 24px 48px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.form-header h3 {
  color: #1e293b;
  font-size: 2.2rem;
  margin-bottom: 0.75rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #4CAF50, #2196F3);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.form-header p {
  color: #64748b;
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.6;
}

.contact-form-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  position: relative;
}

.input-group label {
  color: #374151;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.025em;
}

.input-group input,
.input-group select,
.input-group textarea {
  padding: 1.25rem 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(145deg, #ffffff, #f8fafc);
  position: relative;
  z-index: 1;
}

.input-group input:focus,
.input-group select:focus,
.input-group textarea:focus {
  outline: none;
  border-color: #4CAF50;
  background: #ffffff;
  box-shadow: 
    0 0 0 4px rgba(76, 175, 80, 0.1),
    0 8px 16px rgba(76, 175, 80, 0.15);
  transform: translateY(-2px);
}

.input-group input.error,
.input-group select.error,
.input-group textarea.error {
  border-color: #ef4444;
  background: linear-gradient(145deg, #fef2f2, #ffffff);
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
}

.error-message {
  color: #ef4444;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.error-message::before {
  content: '⚠️';
  font-size: 0.8rem;
}

.input-group textarea {
  resize: vertical;
  min-height: 140px;
  font-family: inherit;
  line-height: 1.6;
}

.form-actions {
  margin-top: 1.5rem;
}

.submit-button {
  width: 100%;
  padding: 1.5rem 2.5rem;
  background: linear-gradient(135deg, #4CAF50 0%, #2196F3 100%);
  color: white;
  border: none;
  border-radius: 18px;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  letter-spacing: 0.025em;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 16px 32px rgba(76, 175, 80, 0.3),
    0 8px 16px rgba(76, 175, 80, 0.2);
}

.submit-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.8s ease;
}

.submit-button:hover::before {
  left: 100%;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 
    0 24px 48px rgba(76, 175, 80, 0.4),
    0 12px 24px rgba(76, 175, 80, 0.3);
}

.submit-button:active {
  transform: translateY(-2px) scale(1.01);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.submit-button i {
  font-size: 1.3rem;
  transition: transform 0.3s ease;
}

.submit-button:hover:not(:disabled) i {
  transform: translateX(4px);
}

/* Section localisation améliorée */
.location-section {
  padding: 6rem 0;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  position: relative;
}

.location-section::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(180deg, transparent 0%, rgba(33, 150, 243, 0.05) 100%);
  pointer-events: none;
}

.location-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 5rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.location-info {
  animation: slideInLeft 0.8s ease-out 0.4s both;
}

.location-info h3 {
  color: #1e293b;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #4CAF50, #2196F3);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.location-info p {
  color: #64748b;
  margin-bottom: 2.5rem;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.6;
}

.location-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.location-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: #374151;
  padding: 1.25rem;
  border-radius: 16px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.8), rgba(248, 250, 252, 0.8));
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.location-item:hover {
  background: linear-gradient(145deg, rgba(76, 175, 80, 0.05), rgba(33, 150, 243, 0.05));
  transform: translateX(8px) scale(1.02);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
}

.location-item i {
  color: #4CAF50;
  font-size: 1.5rem;
  width: 24px;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.location-item:hover i {
  transform: scale(1.2) rotate(10deg);
  color: #2196F3;
}

.location-item span {
  font-weight: 600;
  font-size: 1.05rem;
}

/* Conteneur de carte simplifié */
.map-container {
  animation: slideInRight 0.8s ease-out 0.6s both;
}

/* Notifications améliorées */
.notification {
  position: fixed;
  top: 120px;
  right: 24px;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  padding: 1.5rem 2rem;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.15),
    0 8px 16px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  animation: slideInFromRight 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideInFromRight {
  from {
    opacity: 0;
    transform: translateX(120px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.notification.success {
  border-left: 4px solid #10b981;
  background: linear-gradient(145deg, rgba(16, 185, 129, 0.05), rgba(255, 255, 255, 0.95));
}

.notification.error {
  border-left: 4px solid #ef4444;
  background: linear-gradient(145deg, rgba(239, 68, 68, 0.05), rgba(255, 255, 255, 0.95));
}

.notification.success i {
  color: #10b981;
  font-size: 1.5rem;
}

.notification.error i {
  color: #ef4444;
  font-size: 1.5rem;
}

.notification span {
  flex: 1;
  color: #374151;
  font-weight: 600;
  line-height: 1.5;
}

.close-notification {
  background: rgba(148, 163, 184, 0.1);
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-notification:hover {
  background: rgba(148, 163, 184, 0.2);
  color: #374151;
  transform: scale(1.1);
}

/* Animations améliorées */
.animate-fade-in {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.animate-fade-in-delay {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.4s forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.notification-enter-active, .notification-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(120px);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(120px);
}

/* Responsive Design Amélioré */
@media (max-width: 1200px) {
  .contact-content,
  .location-content {
    gap: 4rem;
  }
  
  .info-card,
  .form-card {
    padding: 2.5rem;
  }
}

@media (max-width: 992px) {
  .contact-content,
  .location-content {
    grid-template-columns: 1fr;
    gap: 3rem;
    max-width: 800px;
  }
  
  .hero-content h1 {
    font-size: 3rem;
  }
  
  .contact-main,
  .location-section {
    padding: 4rem 0;
  }
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.5rem;
  }
  
  .hero-content p {
    font-size: 1.2rem;
  }
  
  .contact-main,
  .location-section {
    padding: 3rem 0;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .info-card,
  .form-card {
    padding: 2rem;
    border-radius: 20px;
  }
  
  .contact-item {
    padding: 1.25rem;
  }
  
  .contact-icon {
    width: 56px;
    height: 56px;
  }
  
  .social-icons {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .notification {
    right: 1rem;
    left: 1rem;
    max-width: none;
  }
}

@media (max-width: 480px) {
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .hero-content {
    padding: 0 1rem;
  }
  
  .info-card,
  .form-card {
    padding: 1.5rem;
    border-radius: 16px;
  }
  
  .info-header h2,
  .form-header h3,
  .location-info h3 {
    font-size: 1.8rem;
  }
  
  .contact-item {
    gap: 1rem;
    padding: 1rem;
  }
  
  .contact-icon {
    width: 48px;
    height: 48px;
  }
  
  .submit-button {
    padding: 1.25rem 2rem;
    font-size: 1.1rem;
  }
}

/* États pour l'accessibilité */
@media (prefers-reduced-motion: reduce) {
  .contact-page *,
  .contact-page *::before,
  .contact-page *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Mode sombre (optionnel) */
@media (prefers-color-scheme: dark) {
  .contact-page {
    background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
  }
  
  .info-card,
  .form-card {
    background: linear-gradient(145deg, #1e293b, #334155);
    border: 1px solid rgba(71, 85, 105, 0.3);
  }
  
  .info-header h2,
  .form-header h3,
  .location-info h3 {
    color: #f1f5f9;
  }
  
  .info-header p,
  .form-header p,
  .location-info p,
  .contact-text p {
    color: #94a3b8;
  }
  
  .contact-text h4 {
    color: #e2e8f0;
  }
  
  .input-group input,
  .input-group select,
  .input-group textarea {
    background: linear-gradient(145deg, #334155, #475569);
    border-color: #475569;
    color: #f1f5f9;
  }
  
  .location-item {
    background: linear-gradient(145deg, rgba(51, 65, 85, 0.8), rgba(71, 85, 105, 0.8));
    color: #e2e8f0;
  }
}
</style>