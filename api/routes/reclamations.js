const express = require('express');
const router = express.Router();
const { 
  getClientReclamations,
  createReclamation, 
  getReclamationHistorique,
  getAdminReclamations,
  getAdminStats,
  assignReclamation,
  updateReclamationStatus,
  respondToReclamation,
  getAdminReclamationHistorique,
  exportReclamations
} = require('../controllers/reclamationController');
const { authenticateToken } = require('../middleware/auth');
const { requireAdmin } = require('../middleware/adminAuth');

// Routes client (nécessitent une authentification)
router.get('/', authenticateToken, getClientReclamations);
router.post('/', authenticateToken, createReclamation);
router.get('/:id/historique', authenticateToken, getReclamationHistorique);

// Routes admin (nécessitent une authentification admin)
router.get('/admin/stats', authenticateToken, requireAdmin, getAdminStats);
router.get('/admin', authenticateToken, requireAdmin, getAdminReclamations);
router.get('/admin/:id/historique', authenticateToken, requireAdmin, getAdminReclamationHistorique);
router.put('/admin/:id/assign', authenticateToken, requireAdmin, assignReclamation);
router.put('/admin/:id/status', authenticateToken, requireAdmin, updateReclamationStatus);
router.put('/admin/:id/response', authenticateToken, requireAdmin, respondToReclamation);
router.get('/admin/export', authenticateToken, requireAdmin, exportReclamations);

module.exports = router; 