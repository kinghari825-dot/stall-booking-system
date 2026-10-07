const express = require('express');
const { adminAuth } = require('../middleware/auth');
const Booking = require('../models/Booking');
const User = require('../models/User');
const Stall = require('../models/Stall');
const Payment = require('../models/Payment');

const router = express.Router();

// Dashboard stats
router.get('/dashboard', adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStalls = await Stall.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
    const totalRevenue = await Payment.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalStalls,
        totalBookings,
        confirmedBookings,
        totalRevenue: totalRevenue[0]?.total || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all bookings
router.get('/bookings', adminAuth, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'firstName lastName email')
      .populate('stall', 'stallNumber name')
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all users
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all payments
router.get('/payments', adminAuth, async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('user', 'firstName lastName email')
      .populate('booking')
      .sort({ createdAt: -1 });

    res.json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
