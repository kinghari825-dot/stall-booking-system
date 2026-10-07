const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    bookingNumber: {
      type: String,
      unique: true,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    stall: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Stall',
      required: true,
    },
    bookingPeriod: {
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
      duration: Number, // in days
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'partial', 'paid', 'refunded'],
      default: 'unpaid',
    },
    paymentMethod: {
      type: String,
      enum: ['credit_card', 'debit_card', 'stripe', 'razorpay', 'bank_transfer'],
    },
    transactionId: String,
    notes: String,
    cancellationReason: String,
    cancellationDate: Date,
    cancellationCharges: Number,
  },
  { timestamps: true }
);

bookingSchema.index({ user: 1, createdAt: -1 });
bookingSchema.index({ stall: 1, 'bookingPeriod.startDate': 1 });
bookingSchema.index({ bookingNumber: 1 });

// Auto-generate booking number
bookingSchema.pre('save', async function (next) {
  if (!this.bookingNumber) {
    const count = await mongoose.model('Booking').countDocuments();
    this.bookingNumber = `BK-${Date.now()}-${count + 1}`;
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
