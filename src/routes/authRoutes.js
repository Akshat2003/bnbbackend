/**
 * Authentication Routes
 * Handles user registration, login, password management
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');
// const { authLimiter } = require('../middleware/rateLimit');
const { validateRequired, validateEmail, validatePassword, sanitize } = require('../middleware/validation');

// Public routes
router.post(
  '/register',
  // authLimiter,
  sanitize,
  validateRequired(['email', 'phone', 'password', 'first_name', 'last_name']),
  validateEmail,
  validatePassword,
  authController.register
);

router.post(
  '/login',
  // authLimiter,
  sanitize,
  validateRequired(['email', 'password']),
  validateEmail,
  authController.login
);

router.get('/verify/:token', authController.verifyEmail);

router.post(
  '/forgot-password',
  // authLimiter,
  sanitize,
  validateRequired(['email']),
  validateEmail,
  authController.forgotPassword
);

router.put(
  '/reset-password/:token',
  // authLimiter,
  sanitize,
  validateRequired(['password']),
  validatePassword,
  authController.resetPassword
);

router.post('/refresh-token', authController.refreshToken);

// Protected routes
router.post('/logout', protect, authController.logout);
router.get('/me', protect, authController.getMe);
router.post('/resend-verification', protect, authController.resendVerification);
router.put(
  '/change-password',
  protect,
  sanitize,
  validateRequired(['currentPassword', 'newPassword']),
  validatePassword,
  authController.changePassword
);

module.exports = router;
