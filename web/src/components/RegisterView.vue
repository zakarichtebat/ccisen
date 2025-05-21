<template>
  <!-- Container principal de la page d'inscription -->
  <div class="register-container">
    <!-- Boîte d'inscription avec animation d'entrée -->
    <div class="register-box animate-fade-in">
      <h2 class="animate-slide-down">Inscription</h2>
      <!-- Formulaire avec gestion de la soumission -->
      <form @submit.prevent="handleRegister">
        <!-- Section des informations personnelles -->
        <div class="form-section">
          <!-- Groupe pour le champ nom -->
          <div class="form-group animate-slide-right">
            <label for="nom">Nom</label>
            <input
              type="text"
              id="nom"
              v-model="nom"
              required
              placeholder="Entrez votre nom"
              class="input-field"
            />
          </div>
          <!-- Groupe pour le champ prénom -->
          <div class="form-group animate-slide-right-delay">
            <label for="prenom">Prénom</label>
            <input
              type="text"
              id="prenom"
              v-model="prenom"
              required
              placeholder="Entrez votre prénom"
              class="input-field"
            />
          </div>
        </div>

        <!-- Section des informations de contact -->
        <div class="form-section">
          <!-- Groupe pour le champ email -->
          <div class="form-group animate-slide-right-delay-2">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              required
              placeholder="Entrez votre email"
              class="input-field"
            />
          </div>
          <!-- Groupe pour le champ téléphone -->
          <div class="form-group animate-slide-right-delay-3">
            <label for="telephone">Téléphone</label>
            <input
              type="tel"
              id="telephone"
              v-model="telephone"
              required
              placeholder="Entrez votre numéro de téléphone"
              class="input-field"
            />
          </div>
        </div>

        <!-- Section des informations professionnelles -->
        <div class="form-section">
          <!-- Groupe pour le numéro de RC -->
          <div class="form-group animate-slide-right-delay-4">
            <label for="numRegistreCommerce">Numéro de Registre de Commerce</label>
            <input
              type="text"
              id="numRegistreCommerce"
              v-model="numRegistreCommerce"
              required
              placeholder="Entrez votre numéro RC"
              class="input-field"
            />
          </div>
          <!-- Groupe pour le secteur d'activité -->
          <div class="form-group animate-slide-right-delay-4">
            <label for="secteurActivite">Secteur d'Activité</label>
            <input
              type="text"
              id="secteurActivite"
              v-model="secteurActivite"
              required
              placeholder="Entrez votre secteur d'activité"
              class="input-field"
            />
          </div>
        </div>

        <!-- Groupe pour l'adresse -->
        <div class="form-group animate-slide-right-delay-5">
          <label for="adresse">Adresse</label>
          <input
            type="text"
            id="adresse"
            v-model="adresse"
            required
            placeholder="Entrez votre adresse"
            class="input-field"
          />
        </div>

        <!-- Section des informations de sécurité -->
        <div class="form-section">
          <!-- Groupe pour le mot de passe -->
          <div class="form-group animate-slide-right-delay-6">
            <label for="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              v-model="password"
              required
              placeholder="Entrez votre mot de passe"
              class="input-field"
            />
            <small class="field-hint">Minimum 8 caractères</small>
          </div>
          <!-- Groupe pour la confirmation du mot de passe -->
          <div class="form-group animate-slide-right-delay-6">
            <label for="confirmPassword">Confirmer le mot de passe</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="confirmPassword"
              required
              placeholder="Confirmez votre mot de passe"
              class="input-field"
            />
          </div>
        </div>

        <!-- Bouton de soumission avec état de chargement -->
        <button type="submit" :disabled="loading" class="submit-btn animate-slide-up">
          {{ loading ? 'Inscription en cours...' : 'S\'inscrire' }}
        </button>
        <!-- Message d'erreur affiché conditionnellement -->
        <p v-if="error" class="error animate-shake">{{ error }}</p>
      </form>
      <!-- Lien vers la page de connexion -->
      <p class="login-link animate-fade-in-delay">
        Déjà un compte ?
        <router-link to="/login" class="highlight-link">Se connecter</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
// Importation des composants et fonctionnalités nécessaires
import { ref } from 'vue'                // Pour la réactivité des données
import { useRouter } from 'vue-router'   // Pour la navigation entre les pages
import axios from 'axios'                // Pour les requêtes HTTP

// Initialisation du router pour la navigation
const router = useRouter()

// Variables réactives pour le formulaire
const nom = ref('')                     // Stocke la valeur du champ nom
const prenom = ref('')                  // Stocke la valeur du champ prénom
const email = ref('')                   // Stocke la valeur du champ email
const numRegistreCommerce = ref('')     // Stocke la valeur du champ numéro de RC
const secteurActivite = ref('')         // Stocke la valeur du champ secteur d'activité
const telephone = ref('')               // Stocke la valeur du champ téléphone
const adresse = ref('')                 // Stocke la valeur du champ adresse
const password = ref('')                // Stocke la valeur du champ mot de passe
const confirmPassword = ref('')         // Stocke la valeur du champ confirmation de mot de passe
const error = ref('')                   // Stocke les messages d'erreur
const loading = ref(false)              // Indique si une requête est en cours

/**
 * Gère la soumission du formulaire d'inscription
 * Valide les données, envoie la requête au serveur et traite la réponse
 */
const handleRegister = async () => {
  try {
    // Validation du mot de passe
    if (password.value.length < 8) {
      error.value = 'Le mot de passe doit contenir au moins 8 caractères'
      return
    }

    if (password.value !== confirmPassword.value) {
      error.value = 'Les mots de passe ne correspondent pas'
      return
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.value)) {
      error.value = 'Veuillez entrer une adresse email valide'
      return
    }

    // Validation du numéro de téléphone (format français)
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/
    if (!phoneRegex.test(telephone.value)) {
      error.value = 'Veuillez entrer un numéro de téléphone valide'
      return
    }

    // Active l'indicateur de chargement et réinitialise les erreurs
    loading.value = true
    error.value = ''
    
    // Requête d'inscription au serveur
    const response = await axios.post('http://localhost:3000/auth/register', {
      nom: nom.value,
      prenom: prenom.value,
      email: email.value,
      motDePasse: password.value,
      numRegistreCommerce: numRegistreCommerce.value,
      secteurActivite: secteurActivite.value,
      telephone: telephone.value,
      adresse: adresse.value
    })

    // Stockage des informations utilisateur en cas de succès
    localStorage.setItem('token', response.data.access_token)
    localStorage.setItem('user', JSON.stringify(response.data.user))

    // Redirection vers la page d'accueil
    router.push('/')
  } catch (err) {
    // Gestion des erreurs d'inscription
    error.value = err.response?.data?.message || 'Une erreur est survenue'
  } finally {
    // Désactive l'indicateur de chargement quoi qu'il arrive
    loading.value = false
  }
}
</script>

<style scoped>
/* Styles pour le conteneur principal */
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem;
  width: 100%;
  overflow-x: hidden; /* Empêcher le défilement horizontal */
  box-sizing: border-box;
}

/* Styles pour la boîte d'inscription */
.register-box {
  background: white;
  padding: 2.5rem;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  position: relative;
  overflow: hidden;
}

/* Style pour l'en-tête de la boîte */
h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-weight: 600;
  position: relative;
}

h2:after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 3px;
  background: linear-gradient(45deg, #4CAF50, #2196F3);
  border-radius: 3px;
}

/* Styles pour les sections de formulaire */
.form-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

/* Styles pour les groupes de formulaire */
.form-group {
  margin-bottom: 1.5rem;
  position: relative;
}

/* Styles pour les étiquettes de champs */
label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
  transition: all 0.3s ease;
}

/* Styles pour les indices des champs */
.field-hint {
  display: block;
  margin-top: 0.25rem;
  color: #888;
  font-size: 0.8rem;
}

/* Styles pour les champs de saisie */
.input-field {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #f9f9f9;
}

.input-field:focus {
  border-color: #4CAF50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  background-color: #fff;
  outline: none;
}

/* Styles pour le bouton de soumission */
.submit-btn {
  width: 100%;
  padding: 0.85rem;
  background: linear-gradient(45deg, #4CAF50, #2196F3);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 7px 10px rgba(0, 0, 0, 0.15);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.submit-btn:disabled {
  background: linear-gradient(45deg, #cccccc, #aaaaaa);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Styles pour les messages d'erreur */
.error {
  color: #dc3545;
  text-align: center;
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: rgba(220, 53, 69, 0.1);
  border-radius: 4px;
  font-weight: 500;
}

/* Styles pour le lien de connexion */
.login-link {
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
}

.highlight-link {
  color: #2196F3;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
}

.highlight-link:hover {
  color: #4CAF50;
}

.highlight-link:after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 0;
  background: linear-gradient(45deg, #4CAF50, #2196F3);
  transition: width 0.3s ease;
}

.highlight-link:hover:after {
  width: 100%;
}

/* Animations */
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

.animate-fade-in-delay {
  animation: fadeIn 0.8s ease-out 0.3s both;
}

.animate-slide-down {
  animation: slideDown 0.6s ease-out;
}

.animate-slide-right {
  animation: slideRight 0.6s ease-out;
}

.animate-slide-right-delay {
  animation: slideRight 0.6s ease-out 0.2s both;
}

.animate-slide-right-delay-2 {
  animation: slideRight 0.6s ease-out 0.3s both;
}

.animate-slide-right-delay-3 {
  animation: slideRight 0.6s ease-out 0.4s both;
}

.animate-slide-right-delay-4 {
  animation: slideRight 0.6s ease-out 0.5s both;
}

.animate-slide-right-delay-5 {
  animation: slideRight 0.6s ease-out 0.6s both;
}

.animate-slide-right-delay-6 {
  animation: slideRight 0.6s ease-out 0.7s both;
}

.animate-slide-up {
  animation: slideUp 0.6s ease-out 0.8s both;
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideRight {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

/* Responsive design pour mobile */
@media (max-width: 768px) {
  .form-section {
    grid-template-columns: 1fr;
  }
  
  .register-box {
    padding: 1.5rem;
  }
}
</style> 