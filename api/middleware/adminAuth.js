const requireAdmin = (req, res, next) => {
  try {
    // Vérifier si l'utilisateur est connecté (déjà fait par authenticateToken)
    if (!req.user) {
      return res.status(401).json({ message: 'Authentification requise' });
    }

    // Vérifier si l'utilisateur a le rôle admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Accès refusé - Privilèges administrateur requis' });
    }

    next();
  } catch (error) {
    console.error('Erreur dans requireAdmin:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

module.exports = { requireAdmin }; 