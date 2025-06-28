// Configuration de base de l'API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

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
      credentials: 'include', // Important pour les cookies d'authentification
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

  // Réclamations
  async getReclamations(filters = {}) {
    const params = new URLSearchParams()
    Object.keys(filters).forEach(key => {
      if (filters[key]) params.append(key, filters[key])
    })
    
    return this.request(`/reclamations?${params}`)
  }

  async createReclamation(reclamationData) {
    return this.request('/reclamations', {
      method: 'POST',
      body: JSON.stringify(reclamationData)
    })
  }

  async getReclamation(id) {
    return this.request(`/reclamations/${id}`)
  }

  async updateReclamation(id, data) {
    return this.request(`/reclamations/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    })
  }

  async getReclamationStats() {
    return this.request('/reclamations/stats')
  }

  async assignReclamation(id, adminId) {
    return this.request(`/reclamations/${id}/assign`, {
      method: 'POST',
      body: JSON.stringify({ adminId })
    })
  }

  async traiterReclamation(id, data) {
    return this.request(`/reclamations/${id}/traiter`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    })
  }

  async closeReclamation(id, commentaire) {
    return this.request(`/reclamations/${id}/close`, {
      method: 'PATCH',
      body: JSON.stringify({ commentaire })
    })
  }

  async addSatisfaction(id, satisfaction, commentaire) {
    return this.request(`/reclamations/${id}/satisfaction`, {
      method: 'POST',
      body: JSON.stringify({ satisfaction, commentaire })
    })
  }
  
  // Nouvelle méthode pour changer le statut
  async updateReclamationStatus(id, statut, commentaire) {
    return this.request(`/reclamations/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ statut, commentaire })
    })
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