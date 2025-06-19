const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Générer un numéro de réclamation unique
const generateNumeroReclamation = () => {
  const prefix = 'REC';
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}`;
};

// CLIENT ENDPOINTS

// Obtenir les réclamations du client connecté
const getClientReclamations = async (req, res) => {
  try {
    const userId = req.user.id;
    const { statut, type, priorite, page = 1, limit = 10 } = req.query;

    const where = { userId };
    if (statut) where.statut = statut;
    if (type) where.typeReclamation = type;
    if (priorite) where.priorite = priorite;

    const offset = (page - 1) * limit;

    const [reclamations, total] = await Promise.all([
      prisma.reclamation.findMany({
        where,
        include: {
          adminTraitant: {
            select: { nom: true, prenom: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: parseInt(limit)
      }),
      prisma.reclamation.count({ where })
    ]);

    // Calculer les statistiques
    const stats = await prisma.reclamation.groupBy({
      by: ['statut'],
      where: { userId },
      _count: { id: true }
    });

    const formattedStats = {
      total: total,
      ouverte: stats.find(s => s.statut === 'ouverte')?._count.id || 0,
      enCours: stats.find(s => s.statut === 'en_cours')?._count.id || 0,
      resolue: stats.find(s => s.statut === 'resolue')?._count.id || 0,
      fermee: stats.find(s => s.statut === 'fermee')?._count.id || 0
    };

    res.json({
      reclamations,
      stats: formattedStats,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des réclamations:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Créer une nouvelle réclamation
const createReclamation = async (req, res) => {
  try {
    const userId = req.user.id;
    const { sujet, description, typeReclamation, priorite = 'normale' } = req.body;

    if (!sujet || !description || !typeReclamation) {
      return res.status(400).json({ message: 'Tous les champs obligatoires doivent être renseignés' });
    }

    const numeroReclamation = generateNumeroReclamation();

    const reclamation = await prisma.reclamation.create({
      data: {
        userId,
        sujet,
        description,
        typeReclamation,
        priorite,
        numeroReclamation,
        statut: 'ouverte'
      },
      include: {
        user: {
          select: { nom: true, prenom: true, email: true }
        }
      }
    });

    // Créer une entrée dans l'historique
    await prisma.historiquereclamation.create({
      data: {
        reclamationId: reclamation.id,
        nouveauStatut: 'ouverte',
        typeAction: 'creation',
        commentaire: 'Réclamation créée par le client'
      }
    });

    res.status(201).json({ reclamation, message: 'Réclamation créée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la création de la réclamation:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Obtenir l'historique d'une réclamation (client)
const getReclamationHistorique = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Vérifier que la réclamation appartient au client
    const reclamation = await prisma.reclamation.findFirst({
      where: { id: parseInt(id), userId }
    });

    if (!reclamation) {
      return res.status(404).json({ message: 'Réclamation non trouvée' });
    }

    const historique = await prisma.historiquereclamation.findMany({
      where: { reclamationId: parseInt(id) },
      include: {
        admin: {
          select: { nom: true, prenom: true }
        }
      },
      orderBy: { dateAction: 'desc' }
    });

    res.json(historique);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'historique:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// ADMIN ENDPOINTS

// Obtenir toutes les réclamations (admin)
const getAdminReclamations = async (req, res) => {
  try {
    const { statut, priorite, type, assigneA, page = 1, limit = 20 } = req.query;
    const adminId = req.user.id;

    const where = {};
    if (statut) where.statut = statut;
    if (priorite) where.priorite = priorite;
    if (type) where.typeReclamation = type;
    if (assigneA === 'me') where.adminTraitantId = adminId;
    if (assigneA === 'unassigned') where.adminTraitantId = null;

    const offset = (page - 1) * limit;

    const [reclamations, total] = await Promise.all([
      prisma.reclamation.findMany({
        where,
        include: {
          user: {
            select: { nom: true, prenom: true, email: true, telephone: true, numRegistreCommerce: true }
          },
          adminTraitant: {
            select: { nom: true, prenom: true }
          }
        },
        orderBy: [
          { priorite: 'desc' },
          { createdAt: 'desc' }
        ],
        skip: offset,
        take: parseInt(limit)
      }),
      prisma.reclamation.count({ where })
    ]);

    res.json({
      reclamations,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des réclamations admin:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Obtenir les statistiques admin
const getAdminStats = async (req, res) => {
  try {
    const stats = await prisma.reclamation.groupBy({
      by: ['statut', 'priorite'],
      _count: { id: true }
    });

    const formattedStats = {
      urgentes: stats.filter(s => s.priorite === 'urgente').reduce((sum, s) => sum + s._count.id, 0),
      enAttente: stats.filter(s => s.statut === 'ouverte').reduce((sum, s) => sum + s._count.id, 0),
      enCours: stats.filter(s => s.statut === 'en_cours').reduce((sum, s) => sum + s._count.id, 0),
      resolues: stats.filter(s => s.statut === 'resolue').reduce((sum, s) => sum + s._count.id, 0)
    };

    res.json(formattedStats);
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Assigner une réclamation à l'admin connecté
const assignReclamation = async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.user.id;

    const reclamation = await prisma.reclamation.findUnique({
      where: { id: parseInt(id) }
    });

    if (!reclamation) {
      return res.status(404).json({ message: 'Réclamation non trouvée' });
    }

    const updatedReclamation = await prisma.reclamation.update({
      where: { id: parseInt(id) },
      data: {
        adminTraitantId: adminId,
        statut: reclamation.statut === 'ouverte' ? 'en_cours' : reclamation.statut
      }
    });

    // Créer une entrée dans l'historique
    await prisma.historiquereclamation.create({
      data: {
        reclamationId: parseInt(id),
        ancienStatut: reclamation.statut,
        nouveauStatut: updatedReclamation.statut,
        adminId,
        typeAction: 'assignation',
        commentaire: 'Réclamation assignée à un administrateur'
      }
    });

    res.json({ message: 'Réclamation assignée avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'assignation:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Mettre à jour le statut d'une réclamation
const updateReclamationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { statut } = req.body;
    const adminId = req.user.id;

    const reclamation = await prisma.reclamation.findUnique({
      where: { id: parseInt(id) }
    });

    if (!reclamation) {
      return res.status(404).json({ message: 'Réclamation non trouvée' });
    }

    const updatedReclamation = await prisma.reclamation.update({
      where: { id: parseInt(id) },
      data: { statut }
    });

    // Créer une entrée dans l'historique
    await prisma.historiquereclamation.create({
      data: {
        reclamationId: parseInt(id),
        ancienStatut: reclamation.statut,
        nouveauStatut: statut,
        adminId,
        typeAction: 'modification',
        commentaire: `Statut modifié de "${reclamation.statut}" vers "${statut}"`
      }
    });

    res.json({ message: 'Statut mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Répondre à une réclamation
const respondToReclamation = async (req, res) => {
  try {
    const { id } = req.params;
    const { reponse, fermer = false } = req.body;
    const adminId = req.user.id;

    if (!reponse) {
      return res.status(400).json({ message: 'La réponse est obligatoire' });
    }

    const reclamation = await prisma.reclamation.findUnique({
      where: { id: parseInt(id) }
    });

    if (!reclamation) {
      return res.status(404).json({ message: 'Réclamation non trouvée' });
    }

    const updateData = {
      reponseAdmin: reponse,
      dateTraitement: new Date(),
      adminTraitantId: adminId
    };

    if (fermer) {
      updateData.statut = 'fermee';
      updateData.dateResolution = new Date();
    } else if (reclamation.statut === 'ouverte') {
      updateData.statut = 'en_cours';
    }

    await prisma.reclamation.update({
      where: { id: parseInt(id) },
      data: updateData
    });

    // Créer une entrée dans l'historique
    await prisma.historiquereclamation.create({
      data: {
        reclamationId: parseInt(id),
        ancienStatut: reclamation.statut,
        nouveauStatut: updateData.statut || reclamation.statut,
        adminId,
        typeAction: fermer ? 'fermeture' : 'reponse',
        commentaire: fermer ? 'Réclamation résolue et fermée' : 'Réponse administrative ajoutée'
      }
    });

    res.json({ message: fermer ? 'Réponse envoyée et réclamation fermée' : 'Réponse envoyée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la réponse:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Obtenir l'historique d'une réclamation (admin)
const getAdminReclamationHistorique = async (req, res) => {
  try {
    const { id } = req.params;

    const reclamation = await prisma.reclamation.findUnique({
      where: { id: parseInt(id) }
    });

    if (!reclamation) {
      return res.status(404).json({ message: 'Réclamation non trouvée' });
    }

    const historique = await prisma.historiquereclamation.findMany({
      where: { reclamationId: parseInt(id) },
      include: {
        admin: {
          select: { nom: true, prenom: true }
        }
      },
      orderBy: { dateAction: 'desc' }
    });

    res.json(historique);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'historique:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Exporter les réclamations
const exportReclamations = async (req, res) => {
  try {
    // Cette fonction devra être implémentée avec une librairie comme xlsx
    res.json({ message: 'Fonction d\'export à implémenter' });
  } catch (error) {
    console.error('Erreur lors de l\'export:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

module.exports = {
  // Client endpoints
  getClientReclamations,
  createReclamation,
  getReclamationHistorique,
  
  // Admin endpoints
  getAdminReclamations,
  getAdminStats,
  assignReclamation,
  updateReclamationStatus,
  respondToReclamation,
  getAdminReclamationHistorique,
  exportReclamations
}; 