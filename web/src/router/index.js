import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../components/LoginView.vue'
import RegisterView from '../components/RegisterView.vue'
import axios from 'axios'

// Fonction utilitaire pour vérifier si l'utilisateur est connecté
const isAuthenticated = async () => {
  try {
    // Vérifier d'abord le localStorage pour une vérification rapide
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    
    if (!token || !user) {
      return false
    }
    
    // Vérifier avec le serveur si la session est toujours valide
    const response = await axios.post('http://localhost:3000/auth/current-user', {}, {
      withCredentials: true
    })
    
    return response.data.isLoggedIn
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'authentification:', error)
    // En cas d'erreur, nettoyer le localStorage et considérer comme non connecté
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return false
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/aide',
      name: 'aide',
      component: () => import('../views/AideView.vue')
    },
    {
      path: '/test-icons',
      name: 'test-icons',
      component: () => import('../views/TestIconsView.vue')
    },
    {
      path: '/actualites',
      name: 'actualites',
      component: () => import('../views/HomeView.vue') // Temporairement redirigé vers home
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('../views/AideView.vue') // Redirection vers la page d'aide
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('../views/HomeView.vue') // Temporairement redirigé vers home
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('../views/HomeView.vue') // Temporairement redirigé vers home
    },
    {
      path: '/legal',
      name: 'legal',
      component: () => import('../views/HomeView.vue') // Temporairement redirigé vers home
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('../views/ServicesView.vue')
    },
    {
      path: '/services/accompagnement',
      name: 'services-accompagnement',
      component: () => import('../views/ServicesView.vue')
    },
    {
      path: '/services/certificats',
      name: 'services-certificats',
      component: () => import('../views/ServicesView.vue')
    },
    {
      path: '/services/formation',
      name: 'services-formation',
      component: () => import('../views/ServicesView.vue')
    },
    {
      path: '/services/export',
      name: 'services-export',
      component: () => import('../views/ServicesView.vue')
    },
    {
      path: '/services/carte-adherent',
      name: 'services-carte-adherent',
      component: () => import('../views/ServicesView.vue')
    },
    {
      path: '/formations',
      name: 'formations',
      component: () => import('../views/FormationsView.vue')
    },
    {
      path: '/rendez-vous',
      name: 'rendezVous',
      component: () => import('../views/RendezVousView.vue'),
      meta: { requiresAuth: true } // Marquer cette route comme nécessitant une authentification
    },
    {
      path: '/reclamations',
      name: 'reclamations',
      component: () => import('../views/ReclamationsView.vue'),
      meta: { requiresAuth: true } // Marquer cette route comme nécessitant une authentification
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      meta: { requiresAuth: true } // Marquer cette route comme nécessitant une authentification
    },
    {
      path: '/admin/reclamations',
      name: 'admin-reclamations',
      component: () => import('../views/AdminReclamationsView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true } // Marquer cette route comme nécessitant une authentification admin
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { requiresAuth: true } // Marquer cette route comme nécessitant une authentification
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { hideForAuth: true } // Cacher cette page si l'utilisateur est déjà connecté
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { hideForAuth: true } // Cacher cette page si l'utilisateur est déjà connecté
    }
  ]
})

// Guard de navigation global pour protéger les routes
router.beforeEach(async (to, from, next) => {
  // Vérifier si la route nécessite une authentification
  if (to.meta.requiresAuth) {
    const authenticated = await isAuthenticated()
    
    if (!authenticated) {
      // Rediriger vers la page de connexion avec une notification
      console.log('Accès non autorisé à', to.path, '- redirection vers /login')
      next({
        path: '/login',
        query: { 
          redirect: to.fullPath,
          message: 'Vous devez être connecté pour accéder à cette page'
        }
      })
      return
    }
  }
  
  // Vérifier si la route doit être cachée pour les utilisateurs connectés
  if (to.meta.hideForAuth) {
    const authenticated = await isAuthenticated()
    
    if (authenticated) {
      // Rediriger vers la page d'accueil si déjà connecté
      console.log('Utilisateur déjà connecté - redirection vers /')
      next('/')
      return
    }
  }
  
  // Continuer la navigation
  next()
})

export default router 