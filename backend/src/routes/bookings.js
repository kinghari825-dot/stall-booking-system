const express = require('express');
const Booking = require('../models/Booking');
const Stall = require('../models/Stall');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get user bookings
router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('stall')
      .populate('user')
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single booking
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('stall')
      .populate('user');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.user._id.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create booking
router.post('/', auth, async (req, res) => {
  try {
    const { stallId, startDate, endDate } = req.body;

    const stall = await Stall.findById(stallId);
    if (!stall) {
      return res.status(404).json({ success: false, message: 'Stall not found' });
    }

    if (!stall.isAvailable) {
      return res.status(400).json({ success: false, message: 'Stall is not available' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalPrice = stall.price * duration;

    const booking = new Booking({
      user: req.user.id,
      stall: stallId,
      bookingPeriod: {
        startDate: start,
        endDate: end,
        duration,
      },
      totalPrice,
      status: 'pending',
    });

    await booking.save();
    await booking.populate('stall');

    res.status(201).json({ success: true, message: 'Booking created', booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Cancel booking
router.put('/:id/cancel', auth, async (req, res) => {
  try {
    const { reason, charges } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    booking.status = 'cancelled';
    booking.cancellationReason = reason;
    booking.cancellationDate = new Date();
    booking.cancellationCharges = charges || 0;

    await booking.save();
    res.json({ success: true, message: 'Booking cancelled', booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
