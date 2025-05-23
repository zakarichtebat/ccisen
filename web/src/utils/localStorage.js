/**
 * Utilitaires pour gérer le localStorage de manière sécurisée
 */

/**
 * Récupère une valeur du localStorage en toute sécurité
 * @param {string} key - La clé à récupérer
 * @param {any} defaultValue - Valeur par défaut si la clé n'existe pas ou est corrompue
 * @returns {any} La valeur parsée ou la valeur par défaut
 */
export const getLocalStorageItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key)
    
    // Vérifier si l'item existe et n'est pas une chaîne invalide
    if (!item || item === 'undefined' || item === 'null') {
      return defaultValue
    }
    
    // Tenter de parser le JSON
    return JSON.parse(item)
  } catch (error) {
    console.error(`Erreur lors de la récupération de ${key} du localStorage:`, error)
    // Nettoyer la clé corrompue
    localStorage.removeItem(key)
    return defaultValue
  }
}

/**
 * Stocke une valeur dans le localStorage en toute sécurité
 * @param {string} key - La clé à stocker
 * @param {any} value - La valeur à stocker
 */
export const setLocalStorageItem = (key, value) => {
  try {
    const stringValue = JSON.stringify(value)
    localStorage.setItem(key, stringValue)
  } catch (error) {
    console.error(`Erreur lors de la sauvegarde de ${key} dans le localStorage:`, error)
  }
}

/**
 * Supprime une valeur du localStorage
 * @param {string} key - La clé à supprimer
 */
export const removeLocalStorageItem = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Erreur lors de la suppression de ${key} du localStorage:`, error)
  }
}

/**
 * Nettoie toutes les données d'authentification corrompues
 */
export const cleanupAuthData = () => {
  const authKeys = ['user', 'token', 'isAuthenticated']
  
  authKeys.forEach(key => {
    const item = localStorage.getItem(key)
    if (item === 'undefined' || item === 'null' || item === '') {
      localStorage.removeItem(key)
      console.log(`Nettoyage de la clé corrompue: ${key}`)
    }
  })
}

/**
 * Vérifie si l'utilisateur est connecté de manière sécurisée
 * @returns {boolean} True si l'utilisateur semble connecté
 */
export const isUserLoggedIn = () => {
  const user = getLocalStorageItem('user')
  const token = getLocalStorageItem('token')
  
  return user && token && user.id
} 