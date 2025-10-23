const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password_hash: {
    type: String,
    required: true,
    select: false
  },
  first_name: {
    type: String,
    required: true,
    trim: true
  },
  last_name: {
    type: String,
    required: true,
    trim: true
  },
  profile_picture_url: {
    type: String,
    default: null
  },
  user_type: {
    type: String,
    enum: ['user', 'owner', 'admin'],
    default: 'user'
  },
  location_lat: {
    type: Number
  },
  location_lng: {
    type: Number
  },
  is_verified: {
    type: Boolean,
    default: false
  },
  is_active: {
    type: Boolean,
    default: true
  },
  verification_token: {
    type: String,
    select: false
  },
  verification_token_expiry: {
    type: Date,
    select: false
  },
  reset_password_token: {
    type: String,
    select: false
  },
  reset_password_expiry: {
    type: Date,
    select: false
  },
  last_login: {
    type: Date
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Note: Password hashing is done in the controller, not here
// This prevents double-hashing issues

// Method to compare password
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password_hash);
};

module.exports = mongoose.model('User', userSchema);
