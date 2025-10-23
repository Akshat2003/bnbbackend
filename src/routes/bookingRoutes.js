/**
 * Booking Routes
 * Handles booking lifecycle and operations
 */

const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roleCheck');
const { validateObjectId, validateRequired, validateDateRange, sanitize } = require('../middleware/validation');
// const { bookingLimiter } = require('../middleware/rateLimit');
// const { checkIdempotency } = require('../middleware/idempotency');

// Get all bookings (admin only)
router.get('/', protect, authorize('admin'), bookingsController.getAllBookings);

// Get user's bookings
router.get(
  '/users/:userId/bookings',
  protect,
  validateObjectId('userId'),
  bookingsController.getUserBookings
);

// Get owner's bookings
router.get(
  '/owners/:ownerId/bookings',
  protect,
  validateObjectId('ownerId'),
  bookingsController.getOwnerBookings
);

// Create booking
router.post(
  '/',
  protect,
  // bookingLimiter,
  // checkIdempotency,
  sanitize,
  validateRequired(['space_id', 'start_time', 'end_time']),
  validateDateRange,
  bookingsController.createBooking
);

// Booking-specific operations
router.get('/:id', protect, validateObjectId('id'), bookingsController.getBookingById);

router.put(
  '/:id',
  protect,
  validateObjectId('id'),
  sanitize,
  validateDateRange,
  bookingsController.updateBooking
);

router.put(
  '/:id/cancel',
  protect,
  validateObjectId('id'),
  bookingsController.cancelBooking
);

router.put(
  '/:id/checkin',
  protect,
  validateObjectId('id'),
  sanitize,
  bookingsController.checkIn
);

router.put(
  '/:id/checkout',
  protect,
  validateObjectId('id'),
  bookingsController.checkOut
);

router.put(
  '/:id/extend',
  protect,
  validateObjectId('id'),
  sanitize,
  validateRequired(['new_end_time']),
  bookingsController.extendBooking
);

module.exports = router;
