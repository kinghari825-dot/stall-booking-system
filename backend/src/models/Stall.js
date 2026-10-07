const mongoose = require('mongoose');

const stallSchema = new mongoose.Schema(
  {
    stallNumber: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      area: String,
      floor: String,
      section: String,
    },
    dimensions: {
      length: Number,
      width: Number,
      unit: { type: String, default: 'feet' },
    },
    area: Number, // in sq ft
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'USD',
    },
    capacity: {
      type: Number,
      required: true,
    },
    amenities: [String], // e.g., ['WiFi', 'Power', 'Water']
    images: [String],
    availability: {
      startDate: Date,
      endDate: Date,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    bookings: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
    }],
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

stallSchema.index({ stallNumber: 1, isAvailable: 1 });
stallSchema.index({ 'location.area': 1 });

module.exports = mongoose.model('Stall', stallSchema);
