/**
 * Owner Routes
 * Handles owner registration, KYC, and earnings
 */

const express = require('express');
const router = express.Router();
const ownersController = require('../controllers/ownersController');
const { protect } = require('../middleware/auth');
const { authorize, isOwner, isAdmin } = require('../middleware/roleCheck');
const { validateObjectId, validateRequired, sanitize } = require('../middleware/validation');

// Get all owners (admin only)
router.get('/', protect, isAdmin, ownersController.getAllOwners);

// Register as owner
router.post(
  '/register',
  protect,
  sanitize,
  ownersController.registerOwner
);

// Owner-specific routes
router.get(
  '/:id',
  protect,
  validateObjectId('id'),
  ownersController.getOwnerById
);

router.put(
  '/:id',
  protect,
  validateObjectId('id'),
  sanitize,
  ownersController.updateOwner
);

router.post(
  '/:id/kyc',
  protect,
  isOwner,
  validateObjectId('id'),
  sanitize,
  ownersController.submitKYC
);

router.put(
  '/:id/verify/kyc',
  protect,
  isAdmin,
  validateObjectId('id'),
  ownersController.verifyKYC
);

router.get(
  '/:id/earnings',
  protect,
  validateObjectId('id'),
  ownersController.getEarnings
);

router.get(
  '/:id/stats',
  protect,
  validateObjectId('id'),
  ownersController.getOwnerStats
);

module.exports = router;
