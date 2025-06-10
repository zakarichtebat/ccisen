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
          <h2>📋 Ressources & Téléchargements</h2>
          <p>Documents utiles et modèles à télécharger pour faciliter vos démarches</p>
          
          <!-- Statistiques de téléchargement -->
          <div class="download-stats">
            <div class="stat-item">
              <div class="stat-number">{{ totalDownloads }}</div>
              <div class="stat-label">Téléchargements</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">{{ resources.length }}</div>
              <div class="stat-label">Documents disponibles</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">{{ Math.round(totalSizeMB) }} MB</div>
              <div class="stat-label">Taille totale</div>
            </div>
          </div>
        </div>

        <!-- Filtres de catégories -->
        <div class="resource-filters">
          <h3>🔍 Filtrer par catégorie :</h3>
          <div class="filter-tabs">
            <button 
              v-for="category in resourceCategories" 
              :key="category.id"
              @click="selectedResourceCategory = category.id"
              :class="{ active: selectedResourceCategory === category.id }"
              class="filter-tab"
            >
              <i :class="category.icon"></i>
              <span>{{ category.name }}</span>
              <div class="tab-count">{{ category.count }}</div>
            </button>
          </div>
        </div>
        
        <!-- Grille des ressources améliorée -->
        <div class="resources-grid-enhanced">
          <div 
            v-for="resource in filteredResources" 
            :key="resource.id" 
            class="resource-card-enhanced"
            :class="{ 'downloading': resource.downloading }"
          >
            <!-- Header avec icône et statut -->
            <div class="resource-header">
              <div class="resource-icon-large" :class="getResourceColorClass(resource.type)">
                <i :class="resource.icon"></i>
              </div>
              <div class="resource-status">
                <span class="status-badge" :class="resource.status">
                  {{ getStatusText(resource.status) }}
                </span>
                <div v-if="resource.isNew" class="new-badge">Nouveau</div>
              </div>
            </div>

            <!-- Contenu principal -->
            <div class="resource-main-content">
              <h4>{{ resource.title }}</h4>
              <p>{{ resource.description }}</p>
              
              <!-- Détails du fichier -->
              <div class="file-details">
                <div class="detail-row">
                  <span class="detail-label">📄 Format :</span>
                  <span class="detail-value file-type" :class="resource.type.toLowerCase()">
                    {{ resource.type }}
                  </span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">📏 Taille :</span>
                  <span class="detail-value">{{ resource.size }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">📅 Dernière MAJ :</span>
                  <span class="detail-value">{{ resource.lastUpdated }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">⬇️ Téléchargements :</span>
                  <span class="detail-value">{{ resource.downloads || 0 }}</span>
                </div>
              </div>

              <!-- Aperçu du contenu -->
              <div v-if="resource.preview" class="content-preview">
                <h6>📖 Aperçu du contenu :</h6>
                <ul>
                  <li v-for="item in resource.preview" :key="item">{{ item }}</li>
                </ul>
              </div>
            </div>

            <!-- Actions de téléchargement -->
            <div class="resource-actions">
              <!-- Barre de progression -->
              <div v-if="resource.downloading" class="download-progress">
                <div class="progress-bar">
                  <div 
                    class="progress-fill" 
                    :style="{ width: resource.downloadProgress + '%' }"
                  ></div>
                </div>
                <span class="progress-text">{{ resource.downloadProgress }}%</span>
              </div>

              <!-- Boutons d'action -->
              <div class="action-buttons">
                <button 
                  v-if="!resource.downloading"
                  @click="downloadResource(resource.id)" 
                  class="download-btn primary"
                  :disabled="resource.status === 'maintenance'"
                >
                  <i class="fas fa-download"></i>
                  <span>Télécharger</span>
                </button>
                
                <button 
                  v-if="resource.downloading"
                  @click="cancelDownload(resource.id)" 
                  class="download-btn cancel"
                >
                  <i class="fas fa-times"></i>
                  <span>Annuler</span>
                </button>

                <button 
                  @click="previewResource(resource.id)" 
                  class="download-btn secondary"
                  :disabled="resource.status === 'maintenance'"
                >
                  <i class="fas fa-eye"></i>
                  <span>Aperçu</span>
                </button>

                <button 
                  @click="shareResource(resource)" 
                  class="download-btn tertiary"
                >
                  <i class="fas fa-share-alt"></i>
                  <span>Partager</span>
                </button>
              </div>
            </div>

            <!-- Footer avec tags -->
            <div class="resource-footer">
              <div class="resource-tags">
                <span 
                  v-for="tag in resource.tags" 
                  :key="tag" 
                  class="resource-tag"
                >
                  {{ tag }}
                </span>
              </div>
              <div class="resource-rating">
                <div class="stars">
                  <i 
                    v-for="n in 5" 
                    :key="n"
                    :class="n <= resource.rating ? 'fas fa-star' : 'far fa-star'"
                  ></i>
                </div>
                <span class="rating-text">({{ resource.reviews }} avis)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Section d'aide pour le téléchargement -->
        <div class="download-help">
          <div class="help-card">
            <div class="help-icon">
              <i class="fas fa-question-circle"></i>
            </div>
            <div class="help-content">
              <h5>💡 Besoin d'aide pour télécharger ?</h5>
              <div class="help-steps">
                <div class="help-step">
                  <span class="step-number">1</span>
                  <span>Cliquez sur "Télécharger" pour lancer le téléchargement</span>
                </div>
                <div class="help-step">
                  <span class="step-number">2</span>
                  <span>Le fichier sera sauvegardé dans votre dossier de téléchargements</span>
                </div>
                <div class="help-step">
                  <span class="step-number">3</span>
                  <span>Ouvrez le fichier avec l'application appropriée</span>
                </div>
              </div>
              <div class="help-links">
                <a href="#contact-support" class="help-link">
                  <i class="fas fa-headset"></i>
                  Contacter le support
                </a>
                <a href="#faq" class="help-link">
                  <i class="fas fa-question"></i>
                  FAQ Téléchargements
                </a>
              </div>
            </div>
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

    <!-- Modal de confirmation de téléchargement -->
    <transition name="modal">
      <div v-if="showDownloadModal" class="modal-overlay" @click="closeDownloadModal">
        <div class="download-modal" @click.stop>
          <div class="modal-header">
            <div class="header-icon">
              <i class="fas fa-download"></i>
            </div>
            <h3>Confirmer le téléchargement</h3>
            <button @click="closeDownloadModal" class="close-modal">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="modal-content" v-if="selectedDownloadResource">
            <div class="download-info">
              <div class="file-preview">
                <div class="file-icon" :class="getResourceColorClass(selectedDownloadResource.type)">
                  <i :class="selectedDownloadResource.icon"></i>
                </div>
                <div class="file-details">
                  <h4>{{ selectedDownloadResource.title }}</h4>
                  <p>{{ selectedDownloadResource.description }}</p>
                  
                  <div class="file-specs">
                    <div class="spec-item">
                      <strong>Format :</strong> {{ selectedDownloadResource.type }}
                    </div>
                    <div class="spec-item">
                      <strong>Taille :</strong> {{ selectedDownloadResource.size }}
                    </div>
                    <div class="spec-item">
                      <strong>Dernière mise à jour :</strong> {{ selectedDownloadResource.lastUpdated }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="download-terms">
                <div class="terms-box">
                  <h6>📋 Conditions d'utilisation :</h6>
                  <ul>
                    <li>✅ Ce document est fourni à titre informatif</li>
                    <li>✅ Utilisation autorisée dans un cadre professionnel</li>
                    <li>✅ Redistribution autorisée avec mention de la source</li>
                    <li>❌ Modification du contenu interdite</li>
                  </ul>
                  
                  <div class="agreement-checkbox">
                    <label>
                      <input type="checkbox" v-model="agreedToTerms">
                      <span class="checkmark"></span>
                      J'accepte les conditions d'utilisation
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="modal-actions">
              <button 
                type="button" 
                class="cancel-btn" 
                @click="closeDownloadModal"
              >
                Annuler
              </button>
              <button 
                type="button" 
                class="download-btn primary"
                @click="confirmDownload"
                :disabled="!agreedToTerms"
              >
                <i class="fas fa-download"></i>
                Commencer le téléchargement
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

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
          title: 'Guide d\'adhésion CCISN',
          description: 'Document complet sur les démarches d\'adhésion à la Chambre de Commerce',
          icon: 'fas fa-file-pdf',
          type: 'PDF',
          size: '2.1 MB',
          lastUpdated: '15 Décembre 2024',
          downloads: 1247,
          category: 'guide',
          status: 'available',
          isNew: true,
          rating: 4.8,
          reviews: 156,
          tags: ['Adhésion', 'Guide', 'Démarches'],
          preview: [
            'Conditions d\'adhésion',
            'Documents requis',
            'Processus de validation',
            'Avantages membres',
            'Cotisations et tarifs'
          ],
          downloading: false,
          downloadProgress: 0
        },
        {
          id: 2,
          title: 'Formulaire de demande de certificat',
          description: 'Modèle de formulaire pré-rempli pour vos demandes de certificats',
          icon: 'fas fa-file-word',
          type: 'DOCX',
          size: '125 KB',
          lastUpdated: '10 Décembre 2024',
          downloads: 892,
          category: 'template',
          status: 'available',
          isNew: false,
          rating: 4.5,
          reviews: 89,
          tags: ['Formulaire', 'Certificat', 'Modèle'],
          preview: [
            'Informations entreprise',
            'Type de certificat',
            'Documents à joindre',
            'Signature électronique'
          ],
          downloading: false,
          downloadProgress: 0
        },
        {
          id: 3,
          title: 'Liste des documents requis par service',
          description: 'Documents nécessaires pour chaque type de service CCISN',
          icon: 'fas fa-list-ul',
          type: 'PDF',
          size: '890 KB',
          lastUpdated: '08 Décembre 2024',
          downloads: 2156,
          category: 'list',
          status: 'available',
          isNew: false,
          rating: 4.9,
          reviews: 234,
          tags: ['Documents', 'Services', 'Exigences'],
          preview: [
            'Certificat d\'origine',
            'Attestation de domiciliation',
            'Licence d\'importation',
            'Carnet ATA',
            'Formations professionnelles'
          ],
          downloading: false,
          downloadProgress: 0
        },
        {
          id: 4,
          title: 'Grille tarifaire 2024',
          description: 'Tarifs officiels de tous les services CCISN pour l\'année 2024',
          icon: 'fas fa-calculator',
          type: 'PDF',
          size: '1.5 MB',
          lastUpdated: '01 Janvier 2024',
          downloads: 3421,
          category: 'tarif',
          status: 'available',
          isNew: false,
          rating: 4.7,
          reviews: 189,
          tags: ['Tarifs', '2024', 'Services', 'Coûts'],
          preview: [
            'Services aux entreprises',
            'Formations et séminaires',
            'Services export',
            'Conseils juridiques',
            'Réductions membres'
          ],
          downloading: false,
          downloadProgress: 0
        },
        {
          id: 5,
          title: 'Guide export - Commerce international',
          description: 'Guide complet pour développer vos activités d\'exportation',
          icon: 'fas fa-globe-africa',
          type: 'PDF',
          size: '3.2 MB',
          lastUpdated: '20 Novembre 2024',
          downloads: 567,
          category: 'guide',
          status: 'available',
          isNew: true,
          rating: 4.6,
          reviews: 45,
          tags: ['Export', 'International', 'Commerce'],
          preview: [
            'Étude de marché',
            'Réglementation douanière',
            'Incoterms 2020',
            'Financement export',
            'Assurance crédit'
          ],
          downloading: false,
          downloadProgress: 0
        },
        {
          id: 6,
          title: 'Modèle de contrat commercial',
          description: 'Template de contrat pour vos relations commerciales',
          icon: 'fas fa-handshake',
          type: 'DOCX',
          size: '78 KB',
          lastUpdated: '15 Novembre 2024',
          downloads: 734,
          category: 'template',
          status: 'maintenance',
          isNew: false,
          rating: 4.3,
          reviews: 67,
          tags: ['Contrat', 'Commercial', 'Juridique'],
          preview: [
            'Clauses générales',
            'Conditions de paiement',
            'Livraison et transport',
            'Résolution de conflits'
          ],
          downloading: false,
          downloadProgress: 0
        }
      ],
      
      totalDownloads: 0,
      totalSizeMB: 0,
      resourceCategories: [
        { id: 'all', name: 'Tout', icon: 'fas fa-globe', count: 0 },
        { id: 'guide', name: 'Guides', icon: 'fas fa-book', count: 0 },
        { id: 'document', name: 'Documents', icon: 'fas fa-file-pdf', count: 0 },
        { id: 'template', name: 'Modèles', icon: 'fas fa-file-word', count: 0 },
        { id: 'list', name: 'Listes', icon: 'fas fa-list', count: 0 },
        { id: 'tarif', name: 'Tarifs', icon: 'fas fa-euro-sign', count: 0 }
      ],
      
      selectedResourceCategory: 'all',
      filteredResources: [],
      showDownloadModal: false,
      selectedDownloadResource: null,
      agreedToTerms: false
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
    },

    filteredResources() {
      if (this.selectedResourceCategory === 'all') {
        return this.resources
      }
      return this.resources.filter(resource => resource.category === this.selectedResourceCategory)
    },

    totalDownloadsComputed() {
      return this.resources.reduce((sum, resource) => sum + (resource.downloads || 0), 0)
    },

    totalSizeMBComputed() {
      return this.resources.reduce((sum, resource) => {
        const sizeNum = parseFloat(resource.size.replace(/[^\d.]/g, ''))
        const unit = resource.size.includes('KB') ? 0.001 : 1
        return sum + (sizeNum * unit)
      }, 0)
    }
  },
  
  mounted() {
    // Initialiser les statistiques
    this.totalDownloads = this.totalDownloadsComputed
    this.totalSizeMB = this.totalSizeMBComputed
    
    // Compter les ressources par catégorie
    this.updateCategoryCounts()
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
      // Trouver la ressource
      const resource = this.resources.find(r => r.id === resourceId)
      if (!resource) {
        alert('Ressource non trouvée')
        return
      }

      // Vérifier le statut
      if (resource.status === 'maintenance') {
        alert('Ce document est temporairement indisponible pour maintenance')
        return
      }

      // Ouvrir la modal de confirmation
      this.selectedDownloadResource = resource
      this.showDownloadModal = true
    },

    async confirmDownload() {
      if (!this.agreedToTerms) {
        alert('Veuillez accepter les conditions d\'utilisation')
        return
      }

      const resource = this.selectedDownloadResource
      if (!resource) return

      // Fermer la modal
      this.closeDownloadModal()

      // Commencer le téléchargement simulé
      await this.startDownload(resource)
    },

    async startDownload(resource) {
      // Marquer comme en cours de téléchargement
      resource.downloading = true
      resource.downloadProgress = 0

      try {
        // Simulation du téléchargement avec progression
        for (let progress = 0; progress <= 100; progress += 10) {
          resource.downloadProgress = progress
          await new Promise(resolve => setTimeout(resolve, 200))
        }

        // Créer et télécharger un fichier de démonstration
        this.createDownloadFile(resource)

        // Incrémenter le compteur de téléchargements
        resource.downloads = (resource.downloads || 0) + 1
        this.totalDownloads = this.totalDownloadsComputed

        // Afficher le succès
        alert(`✅ Téléchargement terminé : ${resource.title}`)

      } catch (error) {
        console.error('Erreur de téléchargement:', error)
        alert('❌ Erreur lors du téléchargement. Veuillez réessayer.')
      } finally {
        // Réinitialiser l'état
        resource.downloading = false
        resource.downloadProgress = 0
      }
    },

    createDownloadFile(resource) {
      // Créer un contenu de fichier de démonstration
      let content = ''
      let mimeType = ''
      let filename = ''

      switch (resource.type) {
        case 'PDF':
          // Créer un contenu PDF simple (en réalité, vous utiliseriez une vraie librairie PDF)
          content = this.generatePDFContent(resource)
          mimeType = 'application/pdf'
          filename = `${resource.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`
          break
          
        case 'DOCX':
          // Créer un contenu Word simple
          content = this.generateDOCXContent(resource)
          mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          filename = `${resource.title.replace(/[^a-zA-Z0-9]/g, '_')}.docx`
          break
          
        default:
          // Fichier texte par défaut
          content = this.generateTextContent(resource)
          mimeType = 'text/plain'
          filename = `${resource.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`
      }

      // Créer et télécharger le fichier
      const blob = new Blob([content], { type: mimeType })
      const url = window.URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      
      // Nettoyer
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    },

    generatePDFContent(resource) {
      // En réalité, vous utiliseriez une librairie comme jsPDF
      // Ici on simule avec du texte
      return `
CHAMBRE DE COMMERCE DE NADOR
===========================

Titre: ${resource.title}
Description: ${resource.description}

Contenu du document:
${resource.preview ? resource.preview.join('\n- ') : ''}

Date de génération: ${new Date().toLocaleDateString('fr-FR')}
Taille: ${resource.size}
Type: ${resource.type}

---
Ce document a été généré automatiquement par le système CCISN.
Pour plus d'informations, contactez-nous à support@ccisn.ma
      `
    },

    generateDOCXContent(resource) {
      // En réalité, vous utiliseriez une librairie comme docx
      // Ici on simule avec du texte formaté
      return `
CHAMBRE DE COMMERCE DE NADOR
============================

${resource.title}

${resource.description}

CONTENU:
${resource.preview ? resource.preview.map(item => `• ${item}`).join('\n') : ''}

Informations techniques:
- Format: ${resource.type}
- Taille: ${resource.size}
- Dernière mise à jour: ${resource.lastUpdated}
- Téléchargements: ${resource.downloads}

---
Document généré le ${new Date().toLocaleDateString('fr-FR')}
© CCISN - Tous droits réservés
      `
    },

    generateTextContent(resource) {
      return `
CCISN - ${resource.title}
${'='.repeat(resource.title.length + 8)}

Description: ${resource.description}

Contenu:
${resource.preview ? resource.preview.map((item, index) => `${index + 1}. ${item}`).join('\n') : ''}

Détails:
- Type: ${resource.type}
- Taille: ${resource.size}
- Dernière MAJ: ${resource.lastUpdated}
- Téléchargements: ${resource.downloads}
- Note: ${resource.rating}/5 (${resource.reviews} avis)

Tags: ${resource.tags ? resource.tags.join(', ') : ''}

---
Généré automatiquement le ${new Date().toISOString()}
Chambre de Commerce de Nador
      `
    },

    cancelDownload(resourceId) {
      const resource = this.resources.find(r => r.id === resourceId)
      if (resource) {
        resource.downloading = false
        resource.downloadProgress = 0
        alert('Téléchargement annulé')
      }
    },
    
    getResourceColorClass(type) {
      const colorClasses = {
        'PDF': 'pdf-color',
        'DOCX': 'docx-color', 
        'XLSX': 'xlsx-color',
        'TXT': 'txt-color'
      }
      return colorClasses[type] || 'default-color'
    },
    
    getStatusText(status) {
      const statuses = {
        'available': '✅ Disponible',
        'maintenance': '🔧 Maintenance',
        'coming-soon': '🔜 Bientôt disponible',
        'premium': '⭐ Premium',
        'archived': '📦 Archivé'
      }
      return statuses[status] || status
    },
    
    previewResource(resourceId) {
      const resource = this.resources.find(r => r.id === resourceId)
      if (!resource) return

      // Ouvrir une fenêtre de prévisualisation simple
      const previewWindow = window.open('', '_blank', 'width=800,height=600')
      
      // Utiliser document.write avec une approche sécurisée
      previewWindow.document.open()
      previewWindow.document.write('<!DOCTYPE html>')
      previewWindow.document.write('<html><head>')
      previewWindow.document.write(`<title>Aperçu - ${resource.title}</title>`)
      previewWindow.document.write('<style>')
      previewWindow.document.write('body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }')
      previewWindow.document.write('.header { border-bottom: 2px solid #667eea; padding-bottom: 15px; margin-bottom: 20px; }')
      previewWindow.document.write('.title { color: #667eea; font-size: 24px; margin: 0; }')
      previewWindow.document.write('.meta { color: #666; font-size: 14px; margin-top: 5px; }')
      previewWindow.document.write('.content { background: #f8f9fa; padding: 15px; border-radius: 8px; }')
      previewWindow.document.write('</style>')
      previewWindow.document.write('</head>')
      
      // Corps du document
      previewWindow.document.write('<body>')
      previewWindow.document.write('<div class="header">')
      previewWindow.document.write(`<h1 class="title">${resource.title}</h1>`)
      previewWindow.document.write(`<div class="meta">${resource.type} • ${resource.size} • ${resource.lastUpdated}</div>`)
      previewWindow.document.write('</div>')
      
      previewWindow.document.write('<div class="content">')
      previewWindow.document.write('<h3>Description</h3>')
      previewWindow.document.write(`<p>${resource.description}</p>`)
      previewWindow.document.write('<h3>Contenu du document</h3>')
      previewWindow.document.write('<ul>')
      if (resource.preview) {
        resource.preview.forEach(item => {
          previewWindow.document.write(`<li>📄 ${item}</li>`)
        })
      } else {
        previewWindow.document.write('<li>Aperçu non disponible</li>')
      }
      previewWindow.document.write('</ul>')
      
      previewWindow.document.write('<h3>Informations</h3>')
      previewWindow.document.write(`<p><strong>Note:</strong> ${resource.rating}/5 ⭐ (${resource.reviews} avis)</p>`)
      previewWindow.document.write(`<p><strong>Téléchargements:</strong> ${resource.downloads}</p>`)
      previewWindow.document.write(`<p><strong>Catégorie:</strong> ${resource.category}</p>`)
      previewWindow.document.write(`<p><strong>Tags:</strong> ${resource.tags ? resource.tags.join(', ') : 'Aucun'}</p>`)
      previewWindow.document.write('</div>')
      
      // Fermer le document
      previewWindow.document.write('</body></html>')
      previewWindow.document.close()
      
      // Programmer la fermeture automatique
      setTimeout(() => {
        if (previewWindow && !previewWindow.closed) {
          if (confirm('Fermer la fenêtre d\'aperçu ?')) {
            previewWindow.close()
          }
        }
      }, 30000)
    },
    
    shareResource(resource) {
      const shareData = {
        title: `CCISN - ${resource.title}`,
        text: `Découvrez ce document utile de la Chambre de Commerce de Nador : ${resource.description}`,
        url: window.location.href + `#resource-${resource.id}`
      }

      if (navigator.share) {
        // API de partage native (mobile)
        navigator.share(shareData)
          .then(() => console.log('Partage réussi'))
          .catch(err => console.log('Erreur de partage:', err))
      } else {
        // Fallback pour desktop
        const shareText = `${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`
        
        if (navigator.clipboard) {
          navigator.clipboard.writeText(shareText)
            .then(() => alert('✅ Lien copié dans le presse-papier !'))
            .catch(() => this.showShareFallback(shareText))
        } else {
          this.showShareFallback(shareText)
        }
      }
    },

    showShareFallback(text) {
      // Afficher une modal avec le texte à copier manuellement
      const modal = prompt('Copiez ce lien pour partager:', text)
    },
    
    closeDownloadModal() {
      this.showDownloadModal = false
      this.selectedDownloadResource = null
      this.agreedToTerms = false
    },
    
    updateCategoryCounts() {
      // Compter les ressources par catégorie
      this.resourceCategories.forEach(category => {
        if (category.id === 'all') {
          category.count = this.resources.length
        } else {
          category.count = this.resources.filter(resource => resource.category === category.id).length
        }
      })
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

.resources-grid-enhanced {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.resource-card-enhanced {
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.resource-card-enhanced:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
  border-color: #667eea;
}

.resource-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.resource-icon-large {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.resource-icon-large i {
  font-size: 1.5rem;
  color: white;
}

.resource-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-badge {
  padding: 0.2rem 0.5rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.new-badge {
  padding: 0.2rem 0.5rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  background: #d4edda;
  color: #155724;
}

.resource-main-content {
  flex: 1;
}

.resource-main-content h4 {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.resource-main-content p {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.file-details {
  display: flex;
  gap: 1rem;
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.detail-label {
  font-size: 0.8rem;
  color: #888;
}

.detail-value {
  font-size: 0.9rem;
  color: #333;
}

.content-preview {
  margin-top: 1rem;
}

.content-preview h6 {
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.content-preview ul {
  padding-left: 1.5rem;
}

.resource-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.download-progress {
  width: 100%;
  height: 10px;
  background: #e9ecef;
  border-radius: 5px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: #667eea;
}

.progress-fill {
  height: 100%;
  background: #28a745;
}

.progress-text {
  font-size: 0.8rem;
  color: #333;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.download-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
}

.download-btn.primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.download-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.download-btn.cancel {
  background: none;
  color: #666;
  padding: 0;
  margin: 0;
}

.download-btn.secondary {
  background: none;
  color: #666;
  padding: 0;
  margin: 0;
}

.download-btn.tertiary {
  background: none;
  color: #666;
  padding: 0;
  margin: 0;
}

.resource-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.resource-tags {
  display: flex;
  gap: 0.5rem;
}

.resource-tag {
  font-size: 0.8rem;
  color: #666;
}

.resource-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stars {
  display: flex;
  gap: 0.2rem;
}

.rating-text {
  font-size: 0.8rem;
  color: #666;
}

/* Section d'aide pour le téléchargement */
.download-help {
  padding: 2rem;
  background: #f8f9fa;
}

.help-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.help-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.help-icon i {
  font-size: 2rem;
  color: white;
}

.help-content {
  margin-bottom: 1.5rem;
}

.help-content h5 {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.help-steps {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.help-step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.step-number {
  font-size: 0.9rem;
  color: #666;
}

.help-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.help-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  text-decoration: none;
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
.resource-icon-large i {
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
  
  .resources-grid-enhanced {
    grid-template-columns: 1fr;
  }
  
  .resource-card-enhanced {
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

/* Section Ressources améliorée */
.resources-section {
  padding: 5rem 0;
  background: white;
}

/* Statistiques de téléchargement */
.download-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 2rem 0;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 15px;
  color: white;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  opacity: 0.9;
}

/* Filtres de ressources */
.resource-filters {
  margin: 3rem 0;
  text-align: center;
}

.resource-filters h3 {
  color: #333;
  margin-bottom: 1.5rem;
}

.filter-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  border: 2px solid #e9ecef;
  background: white;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  position: relative;
}

.filter-tab:hover {
  border-color: #667eea;
  color: #667eea;
  transform: translateY(-2px);
}

.filter-tab.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-color: transparent;
}

.tab-count {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 600;
}

.filter-tab.active .tab-count {
  background: rgba(255, 255, 255, 0.3);
}

/* Grille des ressources améliorée */
.resources-grid-enhanced {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.resource-card-enhanced {
  background: white;
  border-radius: 20px;
  padding: 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
}

.resource-card-enhanced:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  border-color: #667eea;
}

.resource-card-enhanced.downloading {
  border-color: #28a745;
  box-shadow: 0 4px 20px rgba(40, 167, 69, 0.3);
}

/* Header de la carte */
.resource-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem 1.5rem 0;
}

.resource-icon-large {
  width: 70px;
  height: 70px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* Classes de couleur par type de fichier */
.pdf-color {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
}

.docx-color {
  background: linear-gradient(135deg, #4c84ff, #3742fa);
}

.xlsx-color {
  background: linear-gradient(135deg, #26de81, #20bf6b);
}

.txt-color {
  background: linear-gradient(135deg, #a55eea, #8854d0);
}

.default-color {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.resource-icon-large i {
  font-size: 2rem;
  color: white;
}

/* Statut de la ressource */
.resource-status {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
}

.status-badge {
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  white-space: nowrap;
}

.status-badge.available {
  background: #d4edda;
  color: #155724;
}

.status-badge.maintenance {
  background: #fff3cd;
  color: #856404;
}

.new-badge {
  padding: 0.2rem 0.6rem;
  border-radius: 15px;
  font-size: 0.7rem;
  font-weight: 600;
  background: #ff6b6b;
  color: white;
  animation: pulse 2s infinite;
}

/* Contenu principal */
.resource-main-content {
  padding: 0 1.5rem 1rem;
}

.resource-main-content h4 {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 0.8rem;
  line-height: 1.3;
}

.resource-main-content p {
  color: #666;
  line-height: 1.5;
  margin-bottom: 1rem;
}

/* Détails du fichier */
.file-details {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.detail-row:last-child {
  margin-bottom: 0;
}

.detail-label {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

.detail-value {
  font-size: 0.9rem;
  color: #333;
  font-weight: 600;
}

.file-type.pdf {
  color: #ff6b6b;
}

.file-type.docx {
  color: #4c84ff;
}

.file-type.xlsx {
  color: #26de81;
}

/* Aperçu du contenu */
.content-preview {
  background: #f1f3f4;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}

.content-preview h6 {
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.8rem;
  font-weight: 600;
}

.content-preview ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.content-preview li {
  padding: 0.3rem 0;
  color: #555;
  position: relative;
  padding-left: 1.5rem;
}

.content-preview li:before {
  content: "▪";
  color: #667eea;
  position: absolute;
  left: 0;
  font-weight: bold;
}

/* Actions de téléchargement */
.resource-actions {
  padding: 1rem 1.5rem;
  border-top: 1px solid #f1f3f4;
}

.download-progress {
  margin-bottom: 1rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #28a745, #20c997);
  border-radius: 4px;
  transition: width 0.3s ease;
  position: relative;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%);
  animation: progress-shine 1.5s infinite;
}

@keyframes progress-shine {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.progress-text {
  font-size: 0.8rem;
  color: #28a745;
  font-weight: 600;
  margin-top: 0.5rem;
  display: block;
  text-align: center;
}

/* Boutons d'action */
.action-buttons {
  display: flex;
  gap: 0.8rem;
  justify-content: space-between;
}

.download-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  text-decoration: none;
  font-size: 0.9rem;
}

.download-btn.primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.download-btn.primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.download-btn.secondary {
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
}

.download-btn.secondary:hover:not(:disabled) {
  background: #667eea;
  color: white;
}

.download-btn.tertiary {
  background: #f8f9fa;
  color: #666;
  border: 1px solid #e9ecef;
}

.download-btn.tertiary:hover:not(:disabled) {
  background: #e9ecef;
  color: #333;
}

.download-btn.cancel {
  background: #dc3545;
  color: white;
}

.download-btn.cancel:hover {
  background: #c82333;
}

.download-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

/* Footer de la carte */
.resource-footer {
  padding: 1rem 1.5rem;
  background: #f8f9fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.resource-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.resource-tag {
  background: white;
  color: #667eea;
  font-size: 0.75rem;
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  font-weight: 500;
}

.resource-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stars {
  display: flex;
  gap: 0.1rem;
}

.stars i {
  font-size: 0.9rem;
  color: #ffc107;
}

.rating-text {
  font-size: 0.8rem;
  color: #666;
}

/* Section d'aide pour le téléchargement */
.download-help {
  margin-top: 4rem;
  padding: 3rem 0;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 20px;
}

.help-card {
  background: white;
  padding: 3rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
}

.help-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
}

.help-icon i {
  font-size: 2rem;
  color: white;
}

.help-content h5 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 2rem;
}

.help-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.help-step {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  text-align: left;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
}

.step-number {
  background: #667eea;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.help-links {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.help-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  padding: 0.8rem 1.5rem;
  border: 2px solid #667eea;
  border-radius: 50px;
  transition: all 0.3s ease;
}

.help-link:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
}

/* Modal de téléchargement */
.download-modal {
  background: white;
  border-radius: 20px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.download-modal .modal-header {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-icon {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-icon i {
  font-size: 1.5rem;
}

.download-modal h3 {
  margin: 0;
  flex: 1;
}

.close-modal {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 0.8rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-modal:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Contenu de la modal */
.download-info {
  padding: 2rem;
}

.file-preview {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 15px;
}

.file-icon {
  width: 80px;
  height: 80px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.file-icon i {
  font-size: 2rem;
  color: white;
}

.file-details h4 {
  margin: 0 0 0.5rem;
  color: #333;
}

.file-specs {
  margin-top: 1rem;
}

.spec-item {
  margin-bottom: 0.5rem;
  color: #666;
}

/* Conditions d'utilisation */
.download-terms {
  background: #f1f3f4;
  padding: 1.5rem;
  border-radius: 15px;
}

.terms-box h6 {
  color: #333;
  margin-bottom: 1rem;
}

.terms-box ul {
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;
}

.terms-box li {
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.agreement-checkbox {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 10px;
  border: 2px solid #e9ecef;
  cursor: pointer;
  transition: all 0.3s ease;
}

.agreement-checkbox:hover {
  border-color: #667eea;
}

.agreement-checkbox input[type="checkbox"] {
  display: none;
}

.checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid #667eea;
  border-radius: 4px;
  position: relative;
  transition: all 0.3s ease;
}

.agreement-checkbox input:checked + .checkmark {
  background: #667eea;
}

.agreement-checkbox input:checked + .checkmark:after {
  content: '✓';
  position: absolute;
  color: white;
  font-size: 14px;
  top: -2px;
  left: 2px;
}

/* Actions de la modal */
.modal-actions {
  padding: 2rem;
  border-top: 1px solid #e9ecef;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.cancel-btn {
  background: white;
  color: #666;
  border: 2px solid #e9ecef;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  background: #f8f9fa;
  border-color: #666;
}

/* Animations spécifiques */
@keyframes downloadPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.resource-card-enhanced.downloading {
  animation: downloadPulse 2s infinite;
}

/* Responsive pour les ressources */
@media (max-width: 768px) {
  .download-stats {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
  
  .filter-tabs {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 1rem;
  }
  
  .resources-grid-enhanced {
    grid-template-columns: 1fr;
  }
  
  .resource-header {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    text-align: center;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .download-btn {
    justify-content: center;
  }
  
  .help-steps {
    grid-template-columns: 1fr;
  }
  
  .help-links {
    flex-direction: column;
    gap: 1rem;
  }
  
  .file-preview {
    flex-direction: column;
    text-align: center;
  }
  
  .modal-actions {
    flex-direction: column;
  }
}
</style> 