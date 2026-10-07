const express = require('express');
const Payment = require('../models/Payment');
const Booking = require('../models/Booking');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get payment status
router.get('/:bookingId', auth, async (req, res) => {
  try {
    const payment = await Payment.findOne({ booking: req.params.bookingId });
    res.json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Process payment
router.post('/process', auth, async (req, res) => {
  try {
    const { bookingId, amount, paymentMethod, transactionId } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    const payment = new Payment({
      booking: bookingId,
      user: req.user.id,
      amount,
      paymentMethod,
      transactionId,
      status: 'completed',
    });

    await payment.save();

    booking.paymentStatus = 'paid';
    booking.status = 'confirmed';
    booking.paymentMethod = paymentMethod;
    booking.transactionId = transactionId;
    await booking.save();

    res.json({ success: true, message: 'Payment processed', payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
