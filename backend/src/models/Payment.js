const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'USD',
    },
    paymentMethod: {
      type: String,
      enum: ['stripe', 'razorpay', 'bank_transfer', 'cash'],
      required: true,
    },
    transactionId: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentProof: String,
    notes: String,
    refundAmount: {
      type: Number,
      default: 0,
    },
    refundReason: String,
  },
  { timestamps: true }
);

paymentSchema.index({ booking: 1, user: 1 });
paymentSchema.index({ transactionId: 1 });

module.exports = mongoose.model('Payment', paymentSchema);
