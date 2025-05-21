<template>
  <div class="register-container">
    <div class="register-box">
      <h2>Inscription</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="nom">Nom</label>
          <input
            type="text"
            id="nom"
            v-model="nom"
            required
            placeholder="Entrez votre nom"
          />
        </div>
        <div class="form-group">
          <label for="prenom">Prénom</label>
          <input
            type="text"
            id="prenom"
            v-model="prenom"
            required
            placeholder="Entrez votre prénom"
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="Entrez votre email"
          />
        </div>
        <div class="form-group">
          <label for="numRegistreCommerce">Numéro de Registre de Commerce</label>
          <input
            type="text"
            id="numRegistreCommerce"
            v-model="numRegistreCommerce"
            required
            placeholder="Entrez votre numéro RC"
          />
        </div>
        <div class="form-group">
          <label for="secteurActivite">Secteur d'Activité</label>
          <input
            type="text"
            id="secteurActivite"
            v-model="secteurActivite"
            required
            placeholder="Entrez votre secteur d'activité"
          />
        </div>
        <div class="form-group">
          <label for="telephone">Téléphone</label>
          <input
            type="tel"
            id="telephone"
            v-model="telephone"
            required
            placeholder="Entrez votre numéro de téléphone"
          />
        </div>
        <div class="form-group">
          <label for="adresse">Adresse</label>
          <input
            type="text"
            id="adresse"
            v-model="adresse"
            required
            placeholder="Entrez votre adresse"
          />
        </div>
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Entrez votre mot de passe"
          />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirmer le mot de passe</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            required
            placeholder="Confirmez votre mot de passe"
          />
        </div>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Inscription en cours...' : 'S\'inscrire' }}
        </button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
      <p class="login-link">
        Déjà un compte ?
        <router-link to="/login">Se connecter</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const nom = ref('')
const prenom = ref('')
const email = ref('')
const numRegistreCommerce = ref('')
const secteurActivite = ref('')
const telephone = ref('')
const adresse = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const loading = ref(false)

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

    loading.value = true
    error.value = ''
    
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

    // Stocker le token dans le localStorage
    localStorage.setItem('token', response.data.access_token)
    localStorage.setItem('user', JSON.stringify(response.data.user))

    // Rediriger vers la page d'accueil
    router.push('/')
  } catch (err) {
    error.value = err.response?.data?.message || 'Une erreur est survenue'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.register-box {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error {
  color: #dc3545;
  text-align: center;
  margin-top: 1rem;
}

.login-link {
  text-align: center;
  margin-top: 1rem;
}

.login-link a {
  color: #4CAF50;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style> 