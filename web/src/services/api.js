// Configuration de base de l'API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

// Service API centralisé
class ApiService {
  // Méthode générique pour faire des requêtes
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    }
    
    try {
      const response = await fetch(url, config)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || `Erreur HTTP: ${response.status}`)
      }
      
      return data
    } catch (error) {
      console.error(`Erreur API ${endpoint}:`, error)
      throw error
    }
  }
  
  // Contact
  async sendContactMessage(contactData) {
    return this.request('/contact/send', {
      method: 'POST',
      body: JSON.stringify(contactData)
    })
  }
  
  // Authentification
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
  }
  
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    })
  }
  
  async getCurrentUser(token) {
    return this.request('/auth/current-user', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
  
  // Formations
  async getFormations() {
    return this.request('/formations')
  }
  
  async getActiveFormations() {
    return this.request('/formations/active')
  }
  
  async inscriptionFormation(formationId, notes = '') {
    return this.request(`/formations/${formationId}/inscription`, {
      method: 'POST',
      body: JSON.stringify({ notes })
    })
  }
  
  async getUserInscriptions(token) {
    return this.request('/formations/user/inscriptions', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
  
  // Rendez-vous
  async createRendezVous(rendezvousData, token) {
    return this.request('/rendez-vous', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(rendezvousData)
    })
  }
  
  async getUserRendezVous(token) {
    return this.request('/rendez-vous', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
  
  // Services
  async getServices() {
    return this.request('/services')
  }
  
  // Admin endpoints
  async getAllRendezVous(token) {
    return this.request('/rendez-vous/admin/all', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
  
  async getAllInscriptions(token) {
    return this.request('/formations/admin/inscriptions', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
}

// Instance unique du service
export const apiService = new ApiService()

// Export par défaut
export default apiService 