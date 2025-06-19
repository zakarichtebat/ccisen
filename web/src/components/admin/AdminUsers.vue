<template>
  <div class="admin-users">
    <!-- En-tête de section -->
    <div class="users-header">
      <div class="header-title">
        <h2>
          <i class="fas fa-users-cog"></i>
          Gestion des Utilisateurs
        </h2>
        <p>Gérez les comptes utilisateurs, les rôles et les permissions</p>
      </div>
      <div class="header-actions">
        <button @click="openCreateModal" class="btn-primary">
          <i class="fas fa-user-plus"></i>
          Nouvel utilisateur
        </button>
        <button @click="exportUsers" class="btn-secondary">
          <i class="fas fa-download"></i>
          Exporter
        </button>
      </div>
    </div>

    <!-- Statistiques des utilisateurs -->
    <div class="users-stats">
      <div class="stat-card">
        <div class="stat-icon primary">
          <i class="fas fa-users"></i>
        </div>
        <div class="stat-content">
          <h3>{{ totalUsers }}</h3>
          <p>Total utilisateurs</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon success">
          <i class="fas fa-user-check"></i>
        </div>
        <div class="stat-content">
          <h3>{{ totalActifs }}</h3>
          <p>Utilisateurs actifs</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon warning">
          <i class="fas fa-user-clock"></i>
        </div>
        <div class="stat-content">
          <h3>{{ totalEnAttente }}</h3>
          <p>En attente</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon danger">
          <i class="fas fa-user-slash"></i>
        </div>
        <div class="stat-content">
          <h3>{{ totalBloques }}</h3>
          <p>Bloqués</p>
        </div>
      </div>
    </div>

    <!-- Filtres et recherche -->
    <div class="users-filters">
      <div class="search-bar">
        <i class="fas fa-search"></i>
        <input 
          v-model="searchTerm" 
          type="text" 
          placeholder="Rechercher un utilisateur..."
          @input="searchUsers"
        />
      </div>
      <div class="filter-options">
        <select v-model="selectedRole" @change="searchUsers">
          <option value="tous">Tous les rôles</option>
          <option value="admin">Administrateur</option>
          <option value="client">Client</option>
          <option value="moderateur">Modérateur</option>
        </select>
        <select v-model="selectedStatus" @change="searchUsers">
          <option value="tous">Tous les statuts</option>
          <option value="actif">Actif</option>
          <option value="inactif">Inactif</option>
          <option value="bloque">Bloqué</option>
        </select>
      </div>
    </div>

    <!-- Liste des utilisateurs -->
    <div class="users-table-container">
      <table class="users-table">
        <thead>
          <tr>
            <th>
              <input 
                type="checkbox" 
                v-model="selectAll" 
                @change="toggleSelectAll"
                class="checkbox-custom"
              />
            </th>
            <th @click="sortBy('nom')" class="sortable">
              Utilisateur
              <i class="fas fa-sort" :class="getSortIcon('nom')"></i>
            </th>
            <th @click="sortBy('email')" class="sortable">
              Email
              <i class="fas fa-sort" :class="getSortIcon('email')"></i>
            </th>
            <th>Rôle</th>
            <th>Statut</th>
            <th @click="sortBy('createdAt')" class="sortable">
              Inscription
              <i class="fas fa-sort" :class="getSortIcon('createdAt')"></i>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in paginatedUsers" :key="user.id" class="user-row">
            <td>
              <input 
                type="checkbox" 
                v-model="selectedUsers" 
                :value="user.id"
                class="checkbox-custom"
              />
            </td>
            <td>
              <div class="user-info">
                <div class="user-avatar">
                  <img :src="getUserAvatar(user)" :alt="user.nom" />
                  <div class="status-indicator" :class="user.status"></div>
                </div>
                <div class="user-details">
                  <div class="user-name">{{ user.nom }} {{ user.prenom }}</div>
                  <div class="user-id">ID: {{ user.id }}</div>
                </div>
              </div>
            </td>
            <td>
              <div class="user-email">
                {{ user.email }}
                <i class="fas fa-check-circle verified" title="Email vérifié"></i>
              </div>
            </td>
            <td>
              <span class="role-badge" :class="user.role">
                {{ user.role }}
              </span>
            </td>
            <td>
              <span class="status-badge" :class="user.status">
                {{ user.status }}
              </span>
            </td>
            <td>
              <div class="date-info">
                {{ formatDate(user.createdAt) }}
              </div>
            </td>
            <td>
              <div class="action-buttons">
                <button @click="editUser(user)" class="btn-action edit" title="Modifier">
                  <i class="fas fa-edit"></i>
                </button>
                <button @click="updateUserStatus(user.id, user.status === 'actif' ? 'bloque' : 'actif')" class="btn-action toggle" :title="user.status === 'actif' ? 'Bloquer' : 'Activer'">
                  <i :class="user.status === 'actif' ? 'fas fa-ban' : 'fas fa-check'"></i>
                </button>
                <button @click="deleteUser(user.id)" class="btn-action delete" title="Supprimer">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="pagination">
      <button 
        @click="currentPage--" 
        :disabled="currentPage === 1"
        class="pagination-btn"
      >
        <i class="fas fa-chevron-left"></i>
      </button>
      <span class="pagination-info">
        Page {{ currentPage }} sur {{ computedTotalPages }}
      </span>
      <button 
        @click="currentPage++" 
        :disabled="currentPage === computedTotalPages"
        class="pagination-btn"
      >
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>

    <!-- Modal de création -->
    <transition name="modal">
      <div v-if="showCreateModal" class="modal-overlay" @click.self="closeCreateModal">
        <div class="modal-content user-modal">
          <div class="modal-header">
            <h3>Nouvel utilisateur</h3>
            <button @click="closeCreateModal" class="close-modal">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="modal-body">
            <form @submit.prevent="createUser">
              <div class="form-grid">
                <div class="form-group">
                  <label for="prenom">Prénom</label>
                  <input 
                    id="prenom"
                    v-model="newUser.prenom" 
                    type="text" 
                    required
                    class="form-input"
                  />
                </div>
                <div class="form-group">
                  <label for="nom">Nom</label>
                  <input 
                    id="nom"
                    v-model="newUser.nom" 
                    type="text" 
                    required
                    class="form-input"
                  />
                </div>
              </div>
              
              <div class="form-group">
                <label for="email">Email</label>
                <input 
                  id="email"
                  v-model="newUser.email" 
                  type="email" 
                  required
                  class="form-input"
                />
              </div>
              
              <div class="form-group">
                <label for="numRegistreCommerce">Numéro RC</label>
                <input 
                  id="numRegistreCommerce"
                  v-model="newUser.numRegistreCommerce" 
                  type="text" 
                  required
                  class="form-input"
                />
              </div>
              
              <div class="form-group">
                <label for="secteurActivite">Secteur d'activité</label>
                <input 
                  id="secteurActivite"
                  v-model="newUser.secteurActivite" 
                  type="text" 
                  required
                  class="form-input"
                />
              </div>
              
              <div class="form-group">
                <label for="telephone">Téléphone</label>
                <input 
                  id="telephone"
                  v-model="newUser.telephone" 
                  type="tel" 
                  required
                  class="form-input"
                />
              </div>
              
              <div class="form-group">
                <label for="adresse">Adresse</label>
                <input 
                  id="adresse"
                  v-model="newUser.adresse" 
                  type="text" 
                  required
                  class="form-input"
                />
              </div>
              
              <div class="form-group">
                <label for="role">Rôle</label>
                <select id="role" v-model="newUser.role" class="form-select">
                  <option value="client">Client</option>
                  <option value="moderateur">Modérateur</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="password">Mot de passe</label>
                <input 
                  id="password"
                  v-model="newUser.motDePasse" 
                  type="password" 
                  required
                  class="form-input"
                />
              </div>
              
              <div class="modal-actions">
                <button type="button" @click="closeCreateModal" class="btn-secondary">
                  Annuler
                </button>
                <button type="submit" class="btn-primary">
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>

    <!-- Modal d'édition -->
    <transition name="modal">
      <div v-if="showEditModal && currentEditUser" class="modal-overlay" @click.self="closeEditModal">
        <div class="modal-content user-modal">
          <div class="modal-header">
            <h3>Modifier l'utilisateur</h3>
            <button @click="closeEditModal" class="close-modal">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="modal-body">
            <form @submit.prevent="updateUser">
              <div class="form-grid">
                <div class="form-group">
                  <label for="edit-prenom">Prénom</label>
                  <input 
                    id="edit-prenom"
                    v-model="currentEditUser.prenom" 
                    type="text" 
                    required
                    class="form-input"
                  />
                </div>
                <div class="form-group">
                  <label for="edit-nom">Nom</label>
                  <input 
                    id="edit-nom"
                    v-model="currentEditUser.nom" 
                    type="text" 
                    required
                    class="form-input"
                  />
                </div>
              </div>
              
              <div class="form-group">
                <label for="edit-email">Email</label>
                <input 
                  id="edit-email"
                  v-model="currentEditUser.email" 
                  type="email" 
                  required
                  class="form-input"
                />
              </div>
              
              <div class="form-group">
                <label for="edit-numRegistreCommerce">Numéro RC</label>
                <input 
                  id="edit-numRegistreCommerce"
                  v-model="currentEditUser.numRegistreCommerce" 
                  type="text" 
                  required
                  class="form-input"
                />
              </div>
              
              <div class="form-group">
                <label for="edit-secteurActivite">Secteur d'activité</label>
                <input 
                  id="edit-secteurActivite"
                  v-model="currentEditUser.secteurActivite" 
                  type="text" 
                  required
                  class="form-input"
                />
              </div>
              
              <div class="form-group">
                <label for="edit-telephone">Téléphone</label>
                <input 
                  id="edit-telephone"
                  v-model="currentEditUser.telephone" 
                  type="tel" 
                  required
                  class="form-input"
                />
              </div>
              
              <div class="form-group">
                <label for="edit-adresse">Adresse</label>
                <input 
                  id="edit-adresse"
                  v-model="currentEditUser.adresse" 
                  type="text" 
                  required
                  class="form-input"
                />
              </div>
              
              <div class="form-group">
                <label for="edit-role">Rôle</label>
                <select id="edit-role" v-model="currentEditUser.role" class="form-select">
                  <option value="client">Client</option>
                  <option value="moderateur">Modérateur</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="edit-status">Statut</label>
                <select id="edit-status" v-model="currentEditUser.status" class="form-select">
                  <option value="actif">Actif</option>
                  <option value="inactif">Inactif</option>
                  <option value="bloque">Bloqué</option>
                </select>
              </div>
              
              <div class="modal-actions">
                <button type="button" @click="closeEditModal" class="btn-secondary">
                  Annuler
                </button>
                <button type="submit" class="btn-primary">
                  Mettre à jour
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000'

// Variables réactives
const users = ref([])
const totalUsers = ref(0)
const loading = ref(true)
const searchTerm = ref('')
const selectedRole = ref('')
const selectedStatus = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const totalPages = ref(1)

// État des modals
const showCreateModal = ref(false)
const showEditModal = ref(false)
const currentEditUser = ref(null)

// Formulaire de création
const newUser = ref({
  nom: '',
  prenom: '',
  email: '',
  motDePasse: '',
  numRegistreCommerce: '',
  secteurActivite: '',
  telephone: '',
  adresse: '',
  role: 'client'
})

// Statistiques
const totalActifs = computed(() => users.value.filter(user => user.status === 'actif').length)
const totalEnAttente = computed(() => users.value.filter(user => user.status === 'inactif').length)
const totalBloques = computed(() => users.value.filter(user => user.status === 'bloque').length)

// Utilisateurs filtrés
const filteredUsers = computed(() => {
  let filtered = [...users.value]

  if (searchTerm.value) {
    const search = searchTerm.value.toLowerCase()
    filtered = filtered.filter(user => 
      user.nom.toLowerCase().includes(search) ||
      user.prenom.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) ||
      user.secteurActivite.toLowerCase().includes(search) ||
      user.numRegistreCommerce.toLowerCase().includes(search)
    )
  }

  if (selectedRole.value && selectedRole.value !== 'tous') {
    filtered = filtered.filter(user => user.role === selectedRole.value)
  }

  if (selectedStatus.value && selectedStatus.value !== 'tous') {
    filtered = filtered.filter(user => user.status === selectedStatus.value)
  }

  return filtered
})

// Utilisateurs paginés
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredUsers.value.slice(start, start + itemsPerPage.value)
})

// Calculer le nombre total de pages
const computedTotalPages = computed(() => {
  return Math.ceil(filteredUsers.value.length / itemsPerPage.value)
})

// Fonction pour récupérer tous les utilisateurs
const fetchUsers = async () => {
  try {
    loading.value = true
    const response = await axios.get(`${API_BASE_URL}/users`, {
      withCredentials: true,
      params: {
        page: 1,
        limit: 1000 // Récupérer tous les utilisateurs pour le filtering côté client
      }
    })
    
    if (response.data.users) {
      users.value = response.data.users
      totalUsers.value = response.data.pagination?.total || response.data.users.length
    } else {
      // Fallback pour les anciennes versions de l'API
      users.value = Array.isArray(response.data) ? response.data : []
      totalUsers.value = users.value.length
    }
    
    console.log(`${users.value.length} utilisateurs récupérés depuis la base de données`)
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error)
    emit('show-error', 'Erreur lors de la récupération des utilisateurs')
    
    // Fallback avec données de test en cas d'erreur
    await loadFallbackData()
  } finally {
    loading.value = false
  }
}

// Fonction de recherche avec l'API
const searchUsers = async () => {
  if (!searchTerm.value && !selectedRole.value && !selectedStatus.value) {
    await fetchUsers()
    return
  }

  try {
    loading.value = true
    const response = await axios.post(`${API_BASE_URL}/users/admin/search`, {
      search: searchTerm.value || undefined,
      role: selectedRole.value && selectedRole.value !== 'tous' ? selectedRole.value : undefined,
      status: selectedStatus.value && selectedStatus.value !== 'tous' ? selectedStatus.value : undefined,
      page: 1,
      limit: 1000
    }, {
      withCredentials: true
    })
    
    if (response.data.users) {
      users.value = response.data.users
      totalUsers.value = response.data.pagination?.total || response.data.users.length
    }
  } catch (error) {
    console.error('Erreur lors de la recherche:', error)
    // Utiliser le filtrage côté client en cas d'erreur
    await fetchUsers()
  } finally {
    loading.value = false
  }
}

// Fonction pour créer un nouvel utilisateur
const createUser = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, newUser.value, {
      withCredentials: true
    })
    
    emit('show-success', 'Utilisateur créé avec succès!')
    await fetchUsers()
    closeCreateModal()
  } catch (error) {
    console.error('Erreur lors de la création:', error)
    const errorMessage = error.response?.data?.message || 'Erreur lors de la création de l\'utilisateur'
    emit('show-error', errorMessage)
  }
}

// Fonction pour modifier un utilisateur
const updateUser = async () => {
  if (!currentEditUser.value) {
    emit('show-error', 'Aucun utilisateur sélectionné pour la modification')
    return
  }

  try {
    const { id, createdAt, updatedAt, ...updateData } = currentEditUser.value
    
    // Nettoyer les données - enlever les champs en lecture seule
    const cleanData = {
      nom: updateData.nom,
      prenom: updateData.prenom,
      email: updateData.email,
      numRegistreCommerce: updateData.numRegistreCommerce,
      secteurActivite: updateData.secteurActivite,
      telephone: updateData.telephone,
      adresse: updateData.adresse,
      role: updateData.role
    }
    
    // Mettre à jour les données principales
    const response = await axios.patch(`${API_BASE_URL}/users/${id}`, cleanData, {
      withCredentials: true
    })
    
    // Mettre à jour le statut séparément si nécessaire
    if (updateData.status) {
      await axios.patch(`${API_BASE_URL}/users/${id}/status`, { status: updateData.status }, {
        withCredentials: true
      })
    }
    
    emit('show-success', 'Utilisateur mis à jour avec succès!')
    await fetchUsers()
    closeEditModal()
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error)
    const errorMessage = error.response?.data?.message || 'Erreur lors de la mise à jour de l\'utilisateur'
    emit('show-error', errorMessage)
  }
}

// Fonction pour modifier le rôle d'un utilisateur
const updateUserRole = async (userId, newRole) => {
  try {
    await axios.patch(`${API_BASE_URL}/users/${userId}/role`, { role: newRole }, {
      withCredentials: true
    })
    
    emit('show-success', `Rôle mis à jour vers ${newRole}`)
    await fetchUsers()
  } catch (error) {
    console.error('Erreur lors de la mise à jour du rôle:', error)
    const errorMessage = error.response?.data?.message || 'Erreur lors de la mise à jour du rôle'
    emit('show-error', errorMessage)
  }
}

// Fonction pour modifier le statut d'un utilisateur
const updateUserStatus = async (userId, newStatus) => {
  try {
    await axios.patch(`${API_BASE_URL}/users/${userId}/status`, { status: newStatus }, {
      withCredentials: true
    })
    
    const statusLabels = {
      'actif': 'Actif',
      'inactif': 'Inactif', 
      'bloque': 'Bloqué'
    }
    
    emit('show-success', `Statut mis à jour vers ${statusLabels[newStatus]}`)
    await fetchUsers()
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut:', error)
    const errorMessage = error.response?.data?.message || 'Erreur lors de la mise à jour du statut'
    emit('show-error', errorMessage)
  }
}

// Fonction pour supprimer un utilisateur
const deleteUser = async (userId) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
    return
  }

  try {
    await axios.delete(`${API_BASE_URL}/users/${userId}`, {
      withCredentials: true
    })
    
    emit('show-success', 'Utilisateur supprimé avec succès!')
    await fetchUsers()
  } catch (error) {
    console.error('Erreur lors de la suppression:', error)
    const errorMessage = error.response?.data?.message || 'Erreur lors de la suppression de l\'utilisateur'
    emit('show-error', errorMessage)
  }
}

// Fonction pour exporter les données
const exportUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/admin/export`, {
      withCredentials: true
    })
    
    const { filename, content } = response.data
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
    
    emit('show-success', 'Export CSV téléchargé avec succès!')
  } catch (error) {
    console.error('Erreur lors de l\'export:', error)
    
    // Fallback: export local
    await exportUsersLocal()
  }
}

// Export local en cas d'erreur API
const exportUsersLocal = async () => {
  const headers = ['ID', 'Nom', 'Prénom', 'Email', 'Téléphone', 'Rôle', 'Statut', 'Date création']
  const rows = users.value.map(user => [
    user.id,
    user.nom,
    user.prenom,
    user.email,
    user.telephone,
    user.role,
    user.status,
    new Date(user.createdAt).toLocaleDateString('fr-FR')
  ])
  
  const csvContent = [headers, ...rows]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n')
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `utilisateurs-export-${new Date().toISOString().split('T')[0]}.csv`)
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.URL.revokeObjectURL(url)
  
  emit('show-success', 'Export CSV téléchargé avec succès!')
}

// Fonction de fallback avec données de test
const loadFallbackData = async () => {
  console.log('⚠️ Utilisation des données de test - API non disponible')
  emit('show-error', 'API non disponible - Utilisation des données de démonstration')
  
  // Données de test existantes...
  users.value = [
    {
      id: 1,
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'jean.dupont@example.com',
      telephone: '+212 6XX-XXXXXX',
      numRegistreCommerce: 'RC001234',
      secteurActivite: 'Informatique',
      adresse: '123 Rue Example, Casablanca',
      role: 'admin',
      status: 'actif',
      createdAt: '2024-01-15T10:00:00.000Z',
      updatedAt: '2024-01-20T15:30:00.000Z'
    },
    {
      id: 2,
      nom: 'Martin',
      prenom: 'Marie',
      email: 'marie.martin@example.com',
      telephone: '+212 6XX-YYYYYY',
      numRegistreCommerce: 'RC005678',
      secteurActivite: 'Commerce',
      adresse: '456 Avenue Test, Rabat',
      role: 'client',
      status: 'actif',
      createdAt: '2024-01-10T08:00:00.000Z',
      updatedAt: '2024-01-18T12:00:00.000Z'
    },
    {
      id: 3,
      nom: 'Bernard',
      prenom: 'Pierre',
      email: 'pierre.bernard@example.com',
      telephone: '+212 6XX-ZZZZZZ',
      numRegistreCommerce: 'RC009012',
      secteurActivite: 'Industrie',
      adresse: '789 Boulevard Demo, Fès',
      role: 'moderateur',
      status: 'inactif',
      createdAt: '2024-01-05T14:00:00.000Z',
      updatedAt: '2024-01-12T16:45:00.000Z'
    },
    {
      id: 4,
      nom: 'Leroy',
      prenom: 'Sophie',
      email: 'sophie.leroy@example.com',
      telephone: '+212 6XX-AAAAAA',
      numRegistreCommerce: 'RC003456',
      secteurActivite: 'Services',
      adresse: '321 Rue Sample, Marrakech',
      role: 'client',
      status: 'bloque',
      createdAt: '2024-01-08T09:30:00.000Z',
      updatedAt: '2024-01-15T11:15:00.000Z'
    },
    {
      id: 5,
      nom: 'Moreau',
      prenom: 'Lucas',
      email: 'lucas.moreau@example.com',
      telephone: '+212 6XX-BBBBBB',
      numRegistreCommerce: 'RC007890',
      secteurActivite: 'Technologie',
      adresse: '654 Place Example, Agadir',
      role: 'client',
      status: 'actif',
      createdAt: '2024-01-12T11:00:00.000Z',
      updatedAt: '2024-01-19T14:20:00.000Z'
    }
  ]
  
  totalUsers.value = users.value.length
}

// Références réactives pour les anciennes fonctions
const searchQuery = ref('')
const selectedUsers = ref([])
const selectAll = ref(false)
const sortField = ref('nom')
const sortOrder = ref('asc')

// Anciennes variables de modal supprimées

// Anciennes computed properties supprimées

// Émissions
const emit = defineEmits(['show-success', 'show-error', 'user-updated'])

// Fonctions pour les modals
const openCreateModal = () => {
  newUser.value = {
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    numRegistreCommerce: '',
    secteurActivite: '',
    telephone: '',
    adresse: '',
    role: 'client'
  }
  showCreateModal.value = true
}

const closeCreateModal = () => {
  showCreateModal.value = false
}

const editUser = (user) => {
  // Créer une copie profonde de l'utilisateur pour éviter les modifications directes
  currentEditUser.value = {
    id: user.id,
    nom: user.nom,
    prenom: user.prenom,
    email: user.email,
    numRegistreCommerce: user.numRegistreCommerce,
    secteurActivite: user.secteurActivite,
    telephone: user.telephone,
    adresse: user.adresse,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  currentEditUser.value = null
}

// Fonctions
const filterUsers = () => {
  let filtered = users.value

  if (searchQuery.value) {
    filtered = filtered.filter(user => 
      user.nom.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.prenom.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedRole.value) {
    filtered = filtered.filter(user => user.role === selectedRole.value)
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(user => user.statut === selectedStatus.value)
  }

  filteredUsers.value = filtered
}

const sortBy = (field) => {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortOrder.value = 'asc'
  }

  filteredUsers.value.sort((a, b) => {
    let aValue = a[field]
    let bValue = b[field]

    if (field === 'createdAt') {
      aValue = new Date(aValue)
      bValue = new Date(bValue)
    }

    if (sortOrder.value === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })
}

const getSortIcon = (field) => {
  if (sortField.value !== field) return ''
  return sortOrder.value === 'asc' ? 'fa-sort-up' : 'fa-sort-down'
}

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedUsers.value = filteredUsers.value.map(user => user.id)
  } else {
    selectedUsers.value = []
  }
}

// Anciennes fonctions supprimées - remplacées par les nouvelles versions

const saveUser = async () => {
  try {
    if (isEditing.value) {
      // Simulation de la modification
      const userIndex = users.value.findIndex(u => u.id === currentUser.value.id)
      if (userIndex !== -1) {
        users.value[userIndex] = { ...currentUser.value }
        filteredUsers.value = users.value
      }
      emit('show-success', 'Utilisateur modifié avec succès (simulation)')
    } else {
      // Simulation de la création
      const newUser = {
        ...currentUser.value,
        id: Date.now(), // ID temporaire
        createdAt: new Date().toISOString(),
        emailVerified: false,
        avatar: null
      }
      users.value.unshift(newUser)
      filteredUsers.value = users.value
      emit('show-success', 'Utilisateur créé avec succès (simulation)')
    }
    
    closeModal()
    emit('user-updated')
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error)
    emit('show-error', 'Erreur lors de la sauvegarde de l\'utilisateur')
  }
}

const toggleUserStatus = async (user) => {
  try {
    const newStatus = user.statut === 'actif' ? 'bloqué' : 'actif'
    
    // Simulation du changement de statut
    user.statut = newStatus
    
    emit('show-success', `Utilisateur ${newStatus === 'actif' ? 'activé' : 'bloqué'} avec succès (simulation)`)
    emit('user-updated')
  } catch (error) {
    console.error('Erreur lors du changement de statut:', error)
    emit('show-error', 'Erreur lors du changement de statut')
  }
}

const getUserAvatar = (user) => {
  if (user.avatar) return user.avatar
  const initials = `${user.prenom.charAt(0)}${user.nom.charAt(0)}`.toUpperCase()
  return `https://ui-avatars.com/api/?name=${initials}&background=667eea&color=fff&size=40`
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

// Exposition de la fonction pour le parent
defineExpose({
  openCreateModal
})

// Initialisation
onMounted(async () => {
  await fetchUsers()
})

// La fonction openCreateModal est déjà exposée dans le premier defineExpose
</script>

<style scoped>
.admin-users {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* En-tête */
.users-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  border-bottom: 1px solid #e2e8f0;
}

.header-title h2 {
  margin: 0 0 0.5rem;
  color: #1f2937;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header-title p {
  margin: 0;
  color: #6b7280;
  font-size: 0.9rem;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.btn-primary, .btn-secondary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.btn-secondary {
  background: white;
  color: #6b7280;
  border: 1px solid #d1d5db;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.btn-secondary:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

/* Statistiques */
.users-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem 2rem;
  background: #f8fafc;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
}

.stat-icon.primary { background: linear-gradient(135deg, #667eea, #764ba2); }
.stat-icon.success { background: linear-gradient(135deg, #10b981, #059669); }
.stat-icon.warning { background: linear-gradient(135deg, #f59e0b, #d97706); }
.stat-icon.danger { background: linear-gradient(135deg, #ef4444, #dc2626); }

.stat-content h3 {
  margin: 0 0 0.25rem;
  font-size: 1.8rem;
  font-weight: 700;
  color: #1f2937;
}

.stat-content p {
  margin: 0;
  color: #6b7280;
  font-size: 0.9rem;
}

/* Filtres */
.users-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: white;
  border-bottom: 1px solid #e2e8f0;
}

.search-bar {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.search-bar i {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}

.search-bar input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: border-color 0.3s ease;
}

.search-bar input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.filter-options {
  display: flex;
  gap: 1rem;
}

.filter-options select {
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: white;
  font-size: 0.9rem;
  cursor: pointer;
}

/* Table */
.users-table-container {
  overflow-x: auto;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.users-table th,
.users-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.users-table th {
  background: #f8fafc;
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.users-table th.sortable {
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s ease;
}

.users-table th.sortable:hover {
  background: #e2e8f0;
}

.user-row:hover {
  background: #f8fafc;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-avatar {
  position: relative;
  width: 40px;
  height: 40px;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.status-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
}

.status-indicator.actif { background: #10b981; }
.status-indicator.inactif { background: #f59e0b; }
.status-indicator.bloqué { background: #ef4444; }

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 600;
  color: #1f2937;
}

.user-id {
  font-size: 0.8rem;
  color: #9ca3af;
}

.user-email {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.verified {
  color: #10b981;
}

.role-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.role-badge.administrateur {
  background: #fef3c7;
  color: #92400e;
}

.role-badge.moderateur {
  background: #dbeafe;
  color: #1e40af;
}

.role-badge.utilisateur {
  background: #e5e7eb;
  color: #374151;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-badge.actif {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.inactif {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.bloqué {
  background: #fee2e2;
  color: #991b1b;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn-action {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-action.edit {
  background: #dbeafe;
  color: #1e40af;
}

.btn-action.toggle {
  background: #fef3c7;
  color: #92400e;
}

.btn-action.delete {
  background: #fee2e2;
  color: #991b1b;
}

.btn-action:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8fafc;
}

.pagination-btn {
  width: 40px;
  height: 40px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: white;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-btn:hover:not(:disabled) {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.pagination-info {
  font-size: 0.9rem;
  color: #6b7280;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e2e8f0;
}

.modal-header h3 {
  margin: 0;
  color: #1f2937;
  font-size: 1.25rem;
}

.close-modal {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: #f3f4f6;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-modal:hover {
  background: #e5e7eb;
  color: #374151;
}

.modal-body {
  padding: 2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #374151;
  font-weight: 500;
}

.form-input,
.form-select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: border-color 0.3s ease;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.checkbox-custom {
  width: 18px;
  height: 18px;
  accent-color: #667eea;
}

/* Animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-enter-active, .modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Responsive */
@media (max-width: 768px) {
  .users-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .header-actions {
    justify-content: center;
  }

  .users-stats {
    grid-template-columns: 1fr;
  }

  .users-filters {
    flex-direction: column;
    gap: 1rem;
  }

  .filter-options {
    flex-direction: column;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .modal-actions {
    flex-direction: column;
  }

  .users-table-container {
    font-size: 0.8rem;
  }

  .users-table th,
  .users-table td {
    padding: 0.5rem;
  }

  .user-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style> 