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
                    <span>{{ isSubmitting ? 'Envoi en cours...' : 'Envoyer le message' }}</span>
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

    <!-- Modal professionnelle pour l'envoi d'email -->
    <transition name="modal">
      <div v-if="showEmailModal" class="modal-overlay" @click="closeEmailModal">
        <div class="email-modal" @click.stop>
          <div class="modal-header">
            <div class="header-icon">
              <i class="fas fa-envelope-open"></i>
            </div>
            <h3>Choisissez votre méthode d'envoi</h3>
            <p>Sélectionnez comment vous souhaitez envoyer votre message</p>
            <button @click="closeEmailModal" class="close-modal">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="modal-content">
            <div class="email-options">
              <div class="email-option" @click="openOutlook">
                <div class="option-icon outlook">
                  <i class="fas fa-envelope"></i>
                </div>
                <div class="option-content">
                  <h4>Microsoft Outlook</h4>
                  <p>Ouvrir dans l'application Outlook</p>
                </div>
                <div class="option-arrow">
                  <i class="fas fa-chevron-right"></i>
                </div>
              </div>
              
              <div class="email-option" @click="openGmail">
                <div class="option-icon gmail">
                  <i class="fab fa-google"></i>
                </div>
                <div class="option-content">
                  <h4>Gmail</h4>
                  <p>Ouvrir dans Gmail (navigateur)</p>
                </div>
                <div class="option-arrow">
                  <i class="fas fa-chevron-right"></i>
                </div>
              </div>
              
              <div class="email-option" @click="copyToClipboard">
                <div class="option-icon copy">
                  <i class="fas fa-copy"></i>
                </div>
                <div class="option-content">
                  <h4>Copier les informations</h4>
                  <p>Copier le contenu dans le presse-papier</p>
                </div>
                <div class="option-arrow">
                  <i class="fas fa-chevron-right"></i>
                </div>
              </div>
              
              <div class="email-option" @click="openDefaultEmail">
                <div class="option-icon default">
                  <i class="fas fa-mail-bulk"></i>
                </div>
                <div class="option-content">
                  <h4>Client email par défaut</h4>
                  <p>Ouvrir avec votre application email</p>
                </div>
                <div class="option-arrow">
                  <i class="fas fa-chevron-right"></i>
                </div>
              </div>
            </div>
            
            <div class="contact-info-modal">
              <h5>Ou contactez-nous directement :</h5>
              <div class="direct-contacts">
                <a href="tel:+212536603857" class="direct-contact">
                  <i class="fas fa-phone"></i>
                  <span>+212 5 36 60 38 57</span>
                </a>
                <a href="mailto:zakariachtebat@gmail.com" class="direct-contact">
                  <i class="fas fa-envelope"></i>
                  <span>zakariachtebat@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
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
const showEmailModal = ref(false)

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

// Générer le contenu de l'email
const generateEmailContent = () => {
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
  
  return { subject, body }
}

// Fonctions pour les différentes options d'envoi
const openOutlook = () => {
  const { subject, body } = generateEmailContent()
  const mailtoLink = `mailto:zakariachtebat@gmail.com?subject=${subject}&body=${body}`
  window.location.href = mailtoLink
  closeEmailModal()
  successMessage.value = 'Outlook a été ouvert. Veuillez envoyer l\'email pour finaliser votre demande.'
}

const openGmail = () => {
  const { subject, body } = generateEmailContent()
  const gmailLink = `https://mail.google.com/mail/?view=cm&to=zakariachtebat@gmail.com&su=${subject}&body=${body}`
  window.open(gmailLink, '_blank')
  closeEmailModal()
  successMessage.value = 'Gmail a été ouvert dans un nouvel onglet. Veuillez envoyer l\'email pour finaliser votre demande.'
}

const copyToClipboard = async () => {
  const emailContent = `
À: zakariachtebat@gmail.com
Sujet: Contact CCIS - ${formData.sujet}

Nom: ${formData.nom} ${formData.prenom}
Email: ${formData.email}
Téléphone: ${formData.telephone || 'Non renseigné'}
Entreprise: ${formData.entreprise || 'Non renseignée'}
Sujet: ${formData.sujet}

Message:
${formData.message}
  `.trim()
  
  try {
    await navigator.clipboard.writeText(emailContent)
    closeEmailModal()
    successMessage.value = 'Les informations ont été copiées dans votre presse-papier !'
  } catch (err) {
    errorMessage.value = 'Impossible de copier dans le presse-papier.'
  }
}

const openDefaultEmail = () => {
  const { subject, body } = generateEmailContent()
  const mailtoLink = `mailto:zakariachtebat@gmail.com?subject=${subject}&body=${body}`
  window.location.href = mailtoLink
  closeEmailModal()
  successMessage.value = 'Votre client email par défaut a été ouvert.'
}

const closeEmailModal = () => {
  showEmailModal.value = false
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
    
    // Ouvrir la modal professionnelle au lieu de la popup native
    showEmailModal.value = true
    
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
  color: #1e293b;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    #ffffff 0%,
    #f8fafc 25%,
    #e2e8f0 50%,
    #f1f5f9 75%,
    #ffffff 100%
  );
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
    rgba(76, 175, 80, 0.05) 0%,
    rgba(33, 150, 243, 0.08) 50%,
    rgba(156, 39, 176, 0.05) 100%
  );
  animation: gradientShift 8s ease-in-out infinite;
}

@keyframes gradientShift {
  0%, 100% {
    background: linear-gradient(135deg, rgba(76, 175, 80, 0.05), rgba(33, 150, 243, 0.08));
  }
  50% {
    background: linear-gradient(135deg, rgba(33, 150, 243, 0.08), rgba(156, 39, 176, 0.05));
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
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #1e293b 0%, #4CAF50 50%, #2196F3 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: none;
}

.hero-content p {
  font-size: 1.4rem;
  color: #64748b;
  font-weight: 500;
  letter-spacing: 0.025em;
  text-shadow: none;
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

/* Formulaire de contact ultra-professionnel */
.form-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px) saturate(180%);
  border-radius: 32px;
  padding: 0;
  box-shadow: 
    0 32px 80px rgba(0, 0, 0, 0.12),
    0 16px 40px rgba(0, 0, 0, 0.08),
    0 8px 20px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
  position: relative;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  animation: slideInRight 1.2s cubic-bezier(0.23, 1, 0.32, 1) 0.4s both;
}

/* Bordure animée en dégradé */
.form-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(
    90deg,
    #FF6B6B 0%,
    #4ECDC4 25%,
    #45B7D1 50%,
    #96CEB4 75%,
    #FFEAA7 100%
  );
  background-size: 200% 100%;
  animation: rainbowShift 4s ease-in-out infinite;
}

@keyframes rainbowShift {
  0%, 100% { background-position: 0% 0%; }
  50% { background-position: 100% 0%; }
}

/* Effet de particules flottantes */
.form-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(76, 175, 80, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(33, 150, 243, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(156, 39, 176, 0.1) 0%, transparent 50%);
  pointer-events: none;
  animation: particleFloat 8s ease-in-out infinite;
}

@keyframes particleFloat {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
}

.form-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 
    0 50px 100px rgba(0, 0, 0, 0.15),
    0 25px 60px rgba(0, 0, 0, 0.12),
    0 12px 30px rgba(0, 0, 0, 0.08);
}

/* Header du formulaire avec glassmorphism */
.form-header {
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.95) 0%,
    rgba(118, 75, 162, 0.95) 100%
  );
  backdrop-filter: blur(30px) saturate(200%);
  padding: 3.5rem 3rem;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
}

/* Animations de fond ondulantes */
.form-header::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(
    from 0deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  animation: conicSpin 12s linear infinite;
}

@keyframes conicSpin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Effet de vagues */
.form-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30px;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.1) 25%,
    transparent 25%,
    transparent 75%,
    rgba(255, 255, 255, 0.1) 75%
  );
  background-size: 20px 20px;
  animation: waveMove 3s linear infinite;
}

@keyframes waveMove {
  0% { transform: translateX(0); }
  100% { transform: translateX(20px); }
}

.form-header h3 {
  font-size: 2.8rem;
  margin-bottom: 1rem;
  font-weight: 900;
  position: relative;
  z-index: 2;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.02em;
  background: linear-gradient(45deg, #ffffff, #f0f9ff, #ffffff);
  background-size: 200% 200%;
  background-clip: text;
  -webkit-background-clip: text;
  animation: textShimmer 3s ease-in-out infinite;
}

@keyframes textShimmer {
  0%, 100% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
}

.form-header p {
  font-size: 1.3rem;
  margin-bottom: 0;
  opacity: 0.95;
  position: relative;
  z-index: 2;
  line-height: 1.6;
  font-weight: 500;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

/* Contenu du formulaire */
.contact-form-content {
  padding: 3.5rem;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(248, 250, 252, 0.9) 100%
  );
  position: relative;
}

/* Grille responsive avec animations */
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  margin-bottom: 2rem;
}

/* Groupes d'input avec design moderne */
.input-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

.input-group:nth-child(1) { animation-delay: 0.1s; }
.input-group:nth-child(2) { animation-delay: 0.2s; }
.input-group:nth-child(3) { animation-delay: 0.3s; }
.input-group:nth-child(4) { animation-delay: 0.4s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Labels modernes avec icônes intégrées */
.input-group label {
  color: #1e293b;
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: 0.02em;
  position: relative;
  padding-left: 1.5rem;
  transition: all 0.3s ease;
}

.input-group label::before {
  content: '●';
  position: absolute;
  left: 0;
  top: 0;
  color: #4CAF50;
  font-size: 1.2rem;
  animation: pulse 2s ease-in-out infinite;
}

/* Champs de saisie ultra-modernes */
.input-group input,
.input-group select,
.input-group textarea {
  padding: 1.5rem 2rem;
  border: 2px solid transparent;
  border-radius: 20px;
  font-size: 1.1rem;
  font-weight: 500;
  background: linear-gradient(#ffffff, #ffffff) padding-box,
              linear-gradient(135deg, #e2e8f0, #cbd5e1) border-box;
  color: #1e293b;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.input-group input::placeholder,
.input-group textarea::placeholder {
  color: #94a3b8;
  font-weight: 400;
  font-style: italic;
}

/* États focus avec effets avancés */
.input-group input:focus,
.input-group select:focus,
.input-group textarea:focus {
  outline: none;
  background: linear-gradient(#ffffff, #ffffff) padding-box,
              linear-gradient(135deg, #4CAF50, #2196F3) border-box;
  color: #1e293b;
  transform: translateY(-3px) scale(1.02);
  box-shadow: 
    0 12px 30px rgba(76, 175, 80, 0.2),
    0 6px 15px rgba(76, 175, 80, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 1);
}

/* Animation de typing pour les champs actifs */
.input-group input:focus::after,
.input-group textarea:focus::after {
  content: '|';
  position: absolute;
  right: 1rem;
  color: #4CAF50;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* États d'erreur avec animations */
.input-group input.error,
.input-group select.error,
.input-group textarea.error {
  background: linear-gradient(#ffffff, #ffffff) padding-box,
              linear-gradient(135deg, #ef4444, #dc2626) border-box;
  animation: shake 0.6s ease-in-out, errorGlow 2s ease-in-out infinite;
}

@keyframes errorGlow {
  0%, 100% { 
    box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
  }
  50% { 
    box-shadow: 0 0 30px rgba(239, 68, 68, 0.5);
  }
}

/* Messages d'erreur avec design moderne */
.error-message {
  color: #ef4444;
  font-size: 0.95rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05));
  padding: 1rem 1.5rem;
  border-radius: 16px;
  border-left: 4px solid #ef4444;
  backdrop-filter: blur(10px);
  animation: errorSlideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes errorSlideIn {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.error-message::before {
  content: '⚠️';
  font-size: 1.2rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

/* Textarea avec design spécial */
.input-group textarea {
  resize: vertical;
  min-height: 160px;
  font-family: inherit;
  line-height: 1.7;
  background-attachment: local;
  background-image: 
    linear-gradient(to right, rgba(76, 175, 80, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, transparent 24px, rgba(226, 232, 240, 0.5) 25px);
  background-size: 30px 25px;
}

/* Actions du formulaire */
.form-actions {
  margin-top: 3rem;
  text-align: center;
  position: relative;
}

/* Bouton de soumission ultra-moderne */
.submit-button {
  width: 100%;
  padding: 0;
  border: none;
  border-radius: 24px;
  font-size: 1.3rem;
  font-weight: 800;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  height: 70px;
  background: transparent;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Fond du bouton avec dégradé animé */
.submit-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    #4CAF50 0%,
    #45a049 25%,
    #2196F3 50%,
    #1976d2 75%,
    #4CAF50 100%
  );
  background-size: 300% 300%;
  border-radius: 24px;
  animation: gradientShift 3s ease infinite;
  transition: all 0.4s ease;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Contenu du bouton */
.submit-button span,
.submit-button i {
  position: relative;
  z-index: 2;
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  display: inline-block;
  transition: all 0.3s ease;
}

/* Effet de brillance au survol */
.submit-button::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: left 0.8s ease;
  z-index: 1;
}

.submit-button:hover::after {
  left: 100%;
}

/* États du bouton */
.submit-button:hover:not(:disabled) {
  transform: translateY(-6px) scale(1.05);
  box-shadow: 
    0 20px 50px rgba(76, 175, 80, 0.4),
    0 10px 25px rgba(76, 175, 80, 0.3);
}

.submit-button:hover:not(:disabled)::before {
  animation-duration: 1.5s;
  filter: brightness(1.1) saturate(1.2);
}

.submit-button:active:not(:disabled) {
  transform: translateY(-3px) scale(1.02);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.submit-button:disabled::before {
  background: linear-gradient(135deg, #94a3b8, #64748b);
  animation: none;
}

/* Animation de l'icône */
.submit-button i {
  font-size: 1.4rem;
  margin-right: 1rem;
  transition: transform 0.3s ease;
}

.submit-button:hover:not(:disabled) i {
  transform: translateX(8px) rotate(15deg);
  animation: iconBounce 0.6s ease;
}

@keyframes iconBounce {
  0%, 100% { transform: translateX(8px) rotate(15deg) scale(1); }
  50% { transform: translateX(8px) rotate(15deg) scale(1.2); }
}

/* Effet de particules au clic */
.submit-button:active::before {
  background: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0.3) 0%,
    transparent 70%
  ),
  linear-gradient(135deg, #4CAF50, #2196F3);
  animation: ripple 0.6s ease-out;
}

@keyframes ripple {
  0% {
    transform: scale(0.95);
    filter: brightness(1.2);
  }
  100% {
    transform: scale(1);
    filter: brightness(1);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .form-card {
    border-radius: 24px;
  }
  
  .form-header {
    padding: 2.5rem 2rem;
  }
  
  .form-header h3 {
    font-size: 2.2rem;
  }
  
  .contact-form-content {
    padding: 2.5rem 2rem;
  }
  
  .input-group input,
  .input-group select,
  .input-group textarea {
    padding: 1.25rem 1.5rem;
    font-size: 1rem;
  }
  
  .submit-button {
    height: 60px;
    font-size: 1.1rem;
  }
}

/* Animation d'entrée pour l'ensemble du formulaire */
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(60px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
  20%, 40%, 60%, 80% { transform: translateX(4px); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
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
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .form-card {
    border-radius: 24px;
  }
  
  .form-header {
    padding: 2.5rem 2rem;
  }
  
  .form-header h3 {
    font-size: 2.2rem;
  }
  
  .contact-form-content {
    padding: 2.5rem 2rem;
  }
  
  .input-group input,
  .input-group select,
  .input-group textarea {
    padding: 1.25rem 1.5rem;
    font-size: 1rem;
  }
  
  .submit-button {
    height: 60px;
    font-size: 1.1rem;
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

/* Modal professionnelle pour l'envoi d'email */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.email-modal {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(30px) saturate(180%);
  border-radius: 32px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 
    0 40px 120px rgba(0, 0, 0, 0.2),
    0 20px 60px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  animation: modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(40px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Header de la modal */
.modal-header {
  background: linear-gradient(
    135deg,
    rgba(76, 175, 80, 0.95) 0%,
    rgba(33, 150, 243, 0.95) 100%
  );
  color: white;
  padding: 2.5rem 2rem;
  border-radius: 32px 32px 0 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.modal-header::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: rotate 15s linear infinite;
}

.header-icon {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  position: relative;
  z-index: 2;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.header-icon i {
  font-size: 2rem;
  color: white;
  animation: pulse 2s ease-in-out infinite;
}

.modal-header h3 {
  font-size: 2rem;
  margin-bottom: 0.75rem;
  font-weight: 800;
  position: relative;
  z-index: 2;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.modal-header p {
  font-size: 1.1rem;
  opacity: 0.95;
  position: relative;
  z-index: 2;
  margin: 0;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

.close-modal {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 3;
  backdrop-filter: blur(10px);
}

.close-modal:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg) scale(1.1);
}

/* Contenu de la modal */
.modal-content {
  padding: 2.5rem 2rem;
}

.email-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.email-option {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.9));
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(226, 232, 240, 0.5);
  position: relative;
  overflow: hidden;
}

.email-option::before {
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

.email-option:hover::before {
  opacity: 1;
}

.email-option:hover {
  transform: translateX(8px) scale(1.02);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  border-color: rgba(76, 175, 80, 0.3);
}

.option-icon {
  width: 60px;
  height: 60px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}

.option-icon.outlook {
  background: linear-gradient(135deg, #0078d4, #106ebe);
  box-shadow: 0 8px 20px rgba(0, 120, 212, 0.3);
}

.option-icon.gmail {
  background: linear-gradient(135deg, #ea4335, #fbbc04);
  box-shadow: 0 8px 20px rgba(234, 67, 53, 0.3);
}

.option-icon.copy {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
}

.option-icon.default {
  background: linear-gradient(135deg, #64748b, #475569);
  box-shadow: 0 8px 20px rgba(100, 116, 139, 0.3);
}

.option-icon i {
  color: white;
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.email-option:hover .option-icon {
  transform: rotate(10deg) scale(1.1);
}

.email-option:hover .option-icon i {
  transform: scale(1.2);
}

.option-content {
  flex: 1;
  position: relative;
  z-index: 1;
}

.option-content h4 {
  color: #1e293b;
  margin: 0 0 0.5rem;
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: 0.025em;
}

.option-content p {
  color: #64748b;
  margin: 0;
  font-weight: 500;
  line-height: 1.4;
}

.option-arrow {
  color: #94a3b8;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.email-option:hover .option-arrow {
  color: #4CAF50;
  transform: translateX(4px);
}

/* Informations de contact dans la modal */
.contact-info-modal {
  background: linear-gradient(145deg, rgba(248, 250, 252, 0.8), rgba(241, 245, 249, 0.8));
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
  backdrop-filter: blur(10px);
}

.contact-info-modal h5 {
  color: #1e293b;
  margin: 0 0 1.5rem;
  font-weight: 700;
  font-size: 1.1rem;
  text-align: center;
  letter-spacing: 0.025em;
}

.direct-contacts {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.direct-contact {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: linear-gradient(145deg, #ffffff, #f8fafc);
  border-radius: 16px;
  text-decoration: none;
  color: #374151;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 1px solid rgba(226, 232, 240, 0.5);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.direct-contact:hover {
  background: linear-gradient(145deg, #4CAF50, #2196F3);
  color: white;
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 12px 24px rgba(76, 175, 80, 0.3);
}

.direct-contact i {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.direct-contact:hover i {
  transform: scale(1.2);
}

/* Animations de transition pour la modal */
.modal-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.modal-enter-from .email-modal {
  transform: scale(0.8) translateY(40px);
}

.modal-leave-to .email-modal {
  transform: scale(0.9) translateY(20px);
}

/* Responsive pour la modal */
@media (max-width: 768px) {
  .email-modal {
    margin: 1rem;
    border-radius: 24px;
  }
  
  .modal-header {
    padding: 2rem 1.5rem;
    border-radius: 24px 24px 0 0;
  }
  
  .modal-header h3 {
    font-size: 1.7rem;
  }
  
  .modal-content {
    padding: 2rem 1.5rem;
  }
  
  .email-option {
    padding: 1.25rem;
    gap: 1rem;
  }
  
  .option-icon {
    width: 50px;
    height: 50px;
  }
  
  .option-content h4 {
    font-size: 1.1rem;
  }
  
  .direct-contacts {
    flex-direction: column;
    align-items: stretch;
  }
  
  .direct-contact {
    justify-content: center;
  }
}

/* États pour l'accessibilité */
</style>