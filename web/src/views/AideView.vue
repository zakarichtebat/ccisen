<template>
  <div class="aide-page">
    <TheHeader />
    
    <!-- Section Hero Aide -->
    <section class="aide-hero">
      <div class="hero-background">
        <div class="hero-overlay"></div>
      </div>
      <div class="container">
        <div class="hero-content">
          <h1 class="animate-fade-in">Aide & Support</h1>
          <p class="animate-fade-in-delay">Trouvez rapidement les réponses à vos questions</p>
          
          <!-- Barre de recherche -->
          <div class="search-container animate-fade-in-delay-2">
            <div class="search-box">
              <i class="fas fa-search"></i>
              <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="Recherchez dans l'aide..."
                @input="filterContent"
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Navigation rapide -->
    <section class="quick-nav">
      <div class="container">
        <div class="nav-cards">
          <div class="nav-card" @click="scrollToSection('faq')">
            <div class="nav-icon">
              <i class="fas fa-question-circle" aria-hidden="true">❓</i>
            </div>
            <h3>FAQ</h3>
            <p>Questions fréquentes</p>
          </div>
          
          <div class="nav-card" @click="scrollToSection('guides')">
            <div class="nav-icon">
              <i class="fas fa-book" aria-hidden="true">📖</i>
            </div>
            <h3>Guides</h3>
            <p>Tutoriels étape par étape</p>
          </div>
          
          <div class="nav-card" @click="scrollToSection('contact-support')">
            <div class="nav-icon">
              <i class="fas fa-headset" aria-hidden="true">🎧</i>
            </div>
            <h3>Support</h3>
            <p>Contactez notre équipe</p>
          </div>
          
          <div class="nav-card" @click="scrollToSection('ressources')">
            <div class="nav-icon">
              <i class="fas fa-download" aria-hidden="true">⬇️</i>
            </div>
            <h3>Ressources</h3>
            <p>Documents & téléchargements</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section FAQ -->
    <section id="faq" class="faq-section">
      <div class="container">
        <div class="section-header">
          <h2>Questions Fréquemment Posées</h2>
          <p>Retrouvez les réponses aux questions les plus courantes</p>
        </div>
        
        <div class="faq-categories">
          <div class="category-tabs">
            <button 
              v-for="category in faqCategories" 
              :key="category.id"
              @click="selectedCategory = category.id"
              :class="{ active: selectedCategory === category.id }"
              class="category-tab"
            >
              <i :class="category.icon"></i>
              {{ category.name }}
            </button>
          </div>
          
          <div class="faq-content">
            <div class="faq-list">
              <div 
                v-for="faq in filteredFAQs" 
                :key="faq.id"
                class="faq-item"
                :class="{ active: activeFAQ === faq.id }"
              >
                <div class="faq-question" @click="toggleFAQ(faq.id)">
                  <h4>{{ faq.question }}</h4>
                  <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer" v-show="activeFAQ === faq.id">
                  <div class="answer-content" v-html="faq.answer"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Guides -->
    <section id="guides" class="guides-section">
      <div class="container">
        <div class="section-header">
          <h2>Guides & Tutoriels</h2>
          <p>Apprenez à utiliser nos services étape par étape</p>
        </div>
        
        <div class="guides-grid">
          <div v-for="guide in guides" :key="guide.id" class="guide-card">
            <div class="guide-image">
              <i :class="guide.icon"></i>
            </div>
            <div class="guide-content">
              <h3>{{ guide.title }}</h3>
              <p>{{ guide.description }}</p>
              <div class="guide-meta">
                <span class="duration">
                  <i class="far fa-clock"></i>
                  {{ guide.duration }}
                </span>
                <span class="difficulty" :class="guide.difficulty">
                  {{ guide.difficulty }}
                </span>
              </div>
              <button class="guide-button" @click="openGuide(guide.id)">
                Voir le guide
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Support Contact -->
    <section id="contact-support" class="support-section">
      <div class="container">
        <div class="section-header">
          <h2>Contactez Notre Support</h2>
          <p>Notre équipe est là pour vous aider</p>
        </div>
        
        <div class="support-options">
          <div class="support-card">
            <div class="support-icon">
              <i class="fas fa-comments"></i>
            </div>
            <h3>Chat en direct</h3>
            <p>Obtenez une aide immédiate via notre chat</p>
            <button class="support-button primary" @click="openChat">
              Démarrer le chat
            </button>
            <div class="availability">
              <i class="fas fa-circle online"></i>
              En ligne - Temps de réponse: 2 min
            </div>
          </div>
          
          <div class="support-card">
            <div class="support-icon">
              <i class="fas fa-envelope"></i>
            </div>
            <h3>Email</h3>
            <p>Envoyez-nous votre question par email</p>
            <button class="support-button" @click="openEmailForm">
              Envoyer un email
            </button>
            <div class="availability">
              <i class="fas fa-clock"></i>
              Réponse sous 24h
            </div>
          </div>
          
          <div class="support-card">
            <div class="support-icon">
              <i class="fas fa-phone"></i>
            </div>
            <h3>Téléphone</h3>
            <p>Appelez-nous directement</p>
            <button class="support-button" @click="callSupport">
              +212 5 36 XX XX XX
            </button>
            <div class="availability">
              <i class="fas fa-clock"></i>
              Lun-Ven: 8h-17h, Sam: 8h-12h
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Ressources -->
    <section id="ressources" class="resources-section">
      <div class="container">
        <div class="section-header">
          <h2>Ressources & Téléchargements</h2>
          <p>Documents utiles et modèles à télécharger</p>
        </div>
        
        <div class="resources-grid">
          <div v-for="resource in resources" :key="resource.id" class="resource-card">
            <div class="resource-icon">
              <i :class="resource.icon"></i>
            </div>
            <div class="resource-content">
              <h4>{{ resource.title }}</h4>
              <p>{{ resource.description }}</p>
              <div class="resource-meta">
                <span class="file-type">{{ resource.type }}</span>
                <span class="file-size">{{ resource.size }}</span>
              </div>
            </div>
            <button class="download-button" @click="downloadResource(resource.id)">
              <i class="fas fa-download"></i>
              Télécharger
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal pour formulaire email -->
    <div v-if="showEmailForm" class="modal-overlay" @click="closeEmailForm">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Contactez notre support</h3>
          <button class="close-button" @click="closeEmailForm">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <form @submit.prevent="submitSupportForm" class="support-form">
          <div class="form-group">
            <label for="support-email">Votre email *</label>
            <input 
              type="email" 
              id="support-email" 
              v-model="supportForm.email" 
              required
            >
          </div>
          
          <div class="form-group">
            <label for="support-subject">Sujet *</label>
            <select id="support-subject" v-model="supportForm.subject" required>
              <option value="">Sélectionnez un sujet</option>
              <option value="technique">Problème technique</option>
              <option value="compte">Problème de compte</option>
              <option value="service">Question sur un service</option>
              <option value="facturation">Facturation</option>
              <option value="autre">Autre</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="support-priority">Priorité</label>
            <select id="support-priority" v-model="supportForm.priority">
              <option value="low">Faible</option>
              <option value="medium">Moyenne</option>
              <option value="high">Élevée</option>
              <option value="urgent">Urgente</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="support-message">Votre message *</label>
            <textarea 
              id="support-message" 
              v-model="supportForm.message" 
              rows="6"
              required
              placeholder="Décrivez votre problème en détail..."
            ></textarea>
          </div>
          
          <div class="form-actions">
            <button type="button" class="cancel-button" @click="closeEmailForm">
              Annuler
            </button>
            <button type="submit" class="submit-button" :disabled="isSubmittingSupport">
              {{ isSubmittingSupport ? 'Envoi...' : 'Envoyer' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue'
import TheFooter from '../components/TheFooter.vue'

export default {
  name: 'AideView',
  components: {
    TheHeader,
    TheFooter
  },
  data() {
    return {
      searchQuery: '',
      selectedCategory: 'general',
      activeFAQ: null,
      showEmailForm: false,
      isSubmittingSupport: false,
      
      supportForm: {
        email: '',
        subject: '',
        priority: 'medium',
        message: ''
      },
      
      faqCategories: [
        { id: 'general', name: 'Général', icon: 'fas fa-info-circle' },
        { id: 'compte', name: 'Compte', icon: 'fas fa-user' },
        { id: 'services', name: 'Services', icon: 'fas fa-cog' },
        { id: 'technique', name: 'Technique', icon: 'fas fa-wrench' }
      ],
      
      faqs: [
        {
          id: 1,
          category: 'general',
          question: 'Comment devenir membre de la Chambre de Commerce?',
          answer: `
            <p>Pour devenir membre de la Chambre de Commerce de Nador, suivez ces étapes:</p>
            <ol>
              <li>Remplissez le formulaire d'adhésion en ligne</li>
              <li>Fournissez les documents requis (RC, patente, etc.)</li>
              <li>Payez la cotisation annuelle</li>
              <li>Votre dossier sera traité sous 48h</li>
            </ol>
          `
        },
        {
          id: 2,
          category: 'general',
          question: 'Quels sont les avantages de l\'adhésion?',
          answer: `
            <p>L'adhésion vous donne accès à:</p>
            <ul>
              <li>Certificats d'origine et attestations</li>
              <li>Formations professionnelles</li>
              <li>Accompagnement à l'export</li>
              <li>Mise en relation d'affaires</li>
              <li>Conseils juridiques et techniques</li>
            </ul>
          `
        },
        {
          id: 3,
          category: 'compte',
          question: 'Comment modifier mes informations personnelles?',
          answer: `
            <p>Pour modifier vos informations:</p>
            <ol>
              <li>Connectez-vous à votre espace membre</li>
              <li>Accédez à la section "Mon Profil"</li>
              <li>Modifiez les informations souhaitées</li>
              <li>Sauvegardez les modifications</li>
            </ol>
          `
        },
        {
          id: 4,
          category: 'services',
          question: 'Comment obtenir un certificat d\'origine?',
          answer: `
            <p>Pour obtenir un certificat d'origine:</p>
            <ol>
              <li>Connectez-vous à votre espace membre</li>
              <li>Accédez à "Mes Services" > "Certificats"</li>
              <li>Remplissez le formulaire de demande</li>
              <li>Joignez les documents requis</li>
              <li>Payez les frais de traitement</li>
              <li>Récupérez votre certificat sous 24-48h</li>
            </ol>
          `
        },
        {
          id: 5,
          category: 'technique',
          question: 'J\'ai oublié mon mot de passe, que faire?',
          answer: `
            <p>Pour réinitialiser votre mot de passe:</p>
            <ol>
              <li>Cliquez sur "Mot de passe oublié" sur la page de connexion</li>
              <li>Saisissez votre adresse email</li>
              <li>Vérifiez votre boîte mail</li>
              <li>Cliquez sur le lien de réinitialisation</li>
              <li>Créez un nouveau mot de passe</li>
            </ol>
          `
        }
      ],
      
      guides: [
        {
          id: 1,
          title: 'Créer votre compte membre',
          description: 'Guide complet pour créer et configurer votre compte',
          icon: 'fas fa-user-plus',
          duration: '5 min',
          difficulty: 'facile'
        },
        {
          id: 2,
          title: 'Demander un certificat',
          description: 'Processus étape par étape pour obtenir vos certificats',
          icon: 'fas fa-certificate',
          duration: '10 min',
          difficulty: 'moyen'
        },
        {
          id: 3,
          title: 'Prendre rendez-vous',
          description: 'Comment planifier un rendez-vous avec nos conseillers',
          icon: 'fas fa-calendar-alt',
          duration: '3 min',
          difficulty: 'facile'
        },
        {
          id: 4,
          title: 'Services export',
          description: 'Utiliser nos services d\'accompagnement export',
          icon: 'fas fa-globe',
          duration: '15 min',
          difficulty: 'avancé'
        }
      ],
      
      resources: [
        {
          id: 1,
          title: 'Guide d\'adhésion',
          description: 'Document complet sur les démarches d\'adhésion',
          icon: 'fas fa-file-pdf',
          type: 'PDF',
          size: '2.1 MB'
        },
        {
          id: 2,
          title: 'Formulaire de demande',
          description: 'Modèle de formulaire pour vos demandes',
          icon: 'fas fa-file-word',
          type: 'DOCX',
          size: '125 KB'
        },
        {
          id: 3,
          title: 'Liste des documents requis',
          description: 'Documents nécessaires pour chaque service',
          icon: 'fas fa-list',
          type: 'PDF',
          size: '890 KB'
        },
        {
          id: 4,
          title: 'Tarifs des services',
          description: 'Grille tarifaire de tous nos services',
          icon: 'fas fa-euro-sign',
          type: 'PDF',
          size: '1.5 MB'
        }
      ]
    }
  },
  
  computed: {
    filteredFAQs() {
      let filtered = this.faqs.filter(faq => faq.category === this.selectedCategory)
      
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(faq => 
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
        )
      }
      
      return filtered
    }
  },
  
  methods: {
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    },
    
    toggleFAQ(faqId) {
      this.activeFAQ = this.activeFAQ === faqId ? null : faqId
    },
    
    filterContent() {
      // La logique de filtrage est déjà dans le computed filteredFAQs
    },
    
    openGuide(guideId) {
      // Logique pour ouvrir un guide spécifique
      console.log('Opening guide:', guideId)
      // Ici vous pourriez rediriger vers une page de guide détaillée
    },
    
    openChat() {
      // Logique pour ouvrir le chat
      console.log('Opening chat support')
      // Intégration avec un service de chat comme Zendesk, Intercom, etc.
    },
    
    openEmailForm() {
      this.showEmailForm = true
    },
    
    closeEmailForm() {
      this.showEmailForm = false
      this.supportForm = {
        email: '',
        subject: '',
        priority: 'medium',
        message: ''
      }
    },
    
    callSupport() {
      // Logique pour déclencher un appel
      window.location.href = 'tel:+2125336XXXXXX'
    },
    
    async submitSupportForm() {
      this.isSubmittingSupport = true
      
      try {
        // Ici vous intégreriez avec votre API de support
        console.log('Submitting support form:', this.supportForm)
        
        // Simulation d'envoi
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        alert('Votre message a été envoyé avec succès! Nous vous répondrons sous 24h.')
        this.closeEmailForm()
      } catch (error) {
        console.error('Erreur lors de l\'envoi:', error)
        alert('Erreur lors de l\'envoi. Veuillez réessayer.')
      } finally {
        this.isSubmittingSupport = false
      }
    },
    
    downloadResource(resourceId) {
      // Logique pour télécharger une ressource
      console.log('Downloading resource:', resourceId)
      // Ici vous déclencheriez le téléchargement du fichier
    }
  }
}
</script>

<style scoped>
.aide-page {
  width: 100%;
  overflow-x: hidden;
}

/* Section Hero */
.aide-hero {
  position: relative;
  height: 60vh;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  z-index: 1;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 3;
  max-width: 800px;
}

.hero-content h1 {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-content p {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

/* Barre de recherche */
.search-container {
  margin-top: 2rem;
}

.search-box {
  position: relative;
  max-width: 500px;
  margin: 0 auto;
}

.search-box i {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  z-index: 2;
}

.search-box input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.search-box input:focus {
  outline: none;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

/* Navigation rapide */
.quick-nav {
  padding: 4rem 0;
  background: white;
}

.nav-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.nav-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
}

.nav-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  border-color: #667eea;
}

.nav-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.nav-icon i {
  font-size: 1.5rem;
  color: white;
}

.nav-card h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.nav-card p {
  color: #666;
  font-size: 0.95rem;
}

/* Section FAQ */
.faq-section {
  padding: 5rem 0;
  background: #f8f9fa;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.section-header p {
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
}

.faq-categories {
  max-width: 1000px;
  margin: 0 auto;
}

.category-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.category-tab {
  padding: 0.8rem 1.5rem;
  border: 2px solid #e9ecef;
  background: white;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.category-tab:hover {
  border-color: #667eea;
  color: #667eea;
}

.category-tab.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-color: transparent;
}

.faq-list {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.faq-item {
  border-bottom: 1px solid #e9ecef;
}

.faq-item:last-child {
  border-bottom: none;
}

.faq-question {
  padding: 1.5rem 2rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.faq-question:hover {
  background: #f8f9fa;
}

.faq-question h4 {
  font-size: 1.1rem;
  color: #333;
  margin: 0;
}

.faq-question i {
  color: #667eea;
  transition: transform 0.3s ease;
}

.faq-item.active .faq-question i {
  transform: rotate(180deg);
}

.faq-answer {
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
}

.answer-content {
  padding: 1.5rem 2rem;
  color: #555;
  line-height: 1.6;
}

.answer-content ol, .answer-content ul {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.answer-content li {
  margin-bottom: 0.5rem;
}

/* Section Guides */
.guides-section {
  padding: 5rem 0;
  background: white;
}

.guides-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.guide-card {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.guide-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  border-color: #667eea;
}

.guide-image {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.guide-image i {
  font-size: 2rem;
  color: white;
}

.guide-content h3 {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 1rem;
}

.guide-content p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.guide-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.duration {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
}

.difficulty {
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.difficulty.facile {
  background: #d4edda;
  color: #155724;
}

.difficulty.moyen {
  background: #fff3cd;
  color: #856404;
}

.difficulty.avancé {
  background: #f8d7da;
  color: #721c24;
}

.guide-button {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.guide-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

/* Section Support */
.support-section {
  padding: 5rem 0;
  background: #f8f9fa;
}

.support-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.support-card {
  background: white;
  padding: 2.5rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.support-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.support-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.support-icon i {
  font-size: 2rem;
  color: white;
}

.support-card h3 {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 1rem;
}

.support-card p {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.support-button {
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  margin-bottom: 1rem;
}

.support-button.primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-color: transparent;
}

.support-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.support-button.primary:hover {
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.availability {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
}

.availability .online {
  color: #28a745;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

/* Section Ressources */
.resources-section {
  padding: 5rem 0;
  background: white;
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.resource-card {
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.resource-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
  border-color: #667eea;
}

.resource-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.resource-icon i {
  font-size: 1.5rem;
  color: white;
}

.resource-content {
  flex: 1;
}

.resource-content h4 {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.resource-content p {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.resource-meta {
  display: flex;
  gap: 1rem;
}

.file-type, .file-size {
  font-size: 0.8rem;
  color: #888;
}

.download-button {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.download-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  color: #333;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #666;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-button:hover {
  background: #f8f9fa;
  color: #333;
}

.support-form {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.cancel-button,
.submit-button {
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.cancel-button {
  background: white;
  color: #666;
  border: 2px solid #e9ecef;
}

.cancel-button:hover {
  background: #f8f9fa;
  border-color: #666;
}

.submit-button {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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

/* Force Font Awesome icons to display */
.fas, .far, .fab {
  font-family: "Font Awesome 6 Free", "Font Awesome 6 Brands" !important;
  font-weight: 900 !important;
  display: inline-block !important;
}

/* Specific fixes for solid icons */
.fas {
  font-family: "Font Awesome 6 Free" !important;
  font-weight: 900 !important;
  -webkit-font-feature-settings: normal !important;
  font-feature-settings: normal !important;
}

.far {
  font-family: "Font Awesome 6 Free" !important;
  font-weight: 400 !important;
}

.fab {
  font-family: "Font Awesome 6 Brands" !important;
  font-weight: 400 !important;
}

/* Force all FA icons to use proper fonts */
[class*="fa-"]:before {
  font-family: "Font Awesome 6 Free" !important;
  font-weight: 900 !important;
}

.far[class*="fa-"]:before {
  font-weight: 400 !important;
}

.fab[class*="fa-"]:before {
  font-family: "Font Awesome 6 Brands" !important;
  font-weight: 400 !important;
}

/* Fallback pour les icônes si Font Awesome ne se charge pas */
i[class*="fa"]:not(:empty) {
  font-family: inherit !important;
  font-weight: normal !important;
  font-size: 1.2em !important;
}

/* Style pour les icônes dans les nav-icon */
.nav-icon i {
  font-size: 1.5rem !important;
}

/* Style pour les icônes dans les support-icon */
.support-icon i {
  font-size: 2rem !important;
}

/* Style pour les icônes dans les guide-image */
.guide-image i {
  font-size: 2rem !important;
}

/* Style pour les icônes dans les resource-icon */
.resource-icon i {
  font-size: 1.5rem !important;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.5rem;
  }
  
  .hero-content p {
    font-size: 1.1rem;
  }
  
  .section-header h2 {
    font-size: 2rem;
  }
  
  .nav-cards,
  .guides-grid,
  .support-options {
    grid-template-columns: 1fr;
  }
  
  .category-tabs {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 1rem;
  }
  
  .faq-question {
    padding: 1rem;
  }
  
  .answer-content {
    padding: 1rem;
  }
  
  .resources-grid {
    grid-template-columns: 1fr;
  }
  
  .resource-card {
    flex-direction: column;
    text-align: center;
  }
  
  .modal-content {
    width: 95%;
    margin: 1rem;
  }
}

@media (max-width: 480px) {
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .search-box input {
    font-size: 1rem;
  }
  
  .nav-card,
  .guide-card,
  .support-card {
    padding: 1.5rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .cancel-button,
  .submit-button {
    width: 100%;
  }
}
</style> 