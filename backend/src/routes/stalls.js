const express = require('express');
const Stall = require('../models/Stall');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all stalls
router.get('/', async (req, res) => {
  try {
    const { area, isAvailable, minPrice, maxPrice } = req.query;
    let query = {};

    if (area) query['location.area'] = area;
    if (isAvailable) query.isAvailable = isAvailable === 'true';
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const stalls = await Stall.find(query).populate('createdBy', 'firstName lastName email');
    res.json({ success: true, stalls });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single stall
router.get('/:id', async (req, res) => {
  try {
    const stall = await Stall.findById(req.params.id)
      .populate('createdBy', 'firstName lastName email')
      .populate('bookings');
    
    if (!stall) {
      return res.status(404).json({ success: false, message: 'Stall not found' });
    }

    res.json({ success: true, stall });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create stall (admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const { stallNumber, name, description, location, dimensions, price, capacity, amenities } = req.body;

    const stall = new Stall({
      stallNumber,
      name,
      description,
      location,
      dimensions,
      area: dimensions.length * dimensions.width,
      price,
      capacity,
      amenities,
      createdBy: req.user.id,
    });

    await stall.save();
    res.status(201).json({ success: true, message: 'Stall created', stall });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update stall (admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const stall = await Stall.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!stall) {
      return res.status(404).json({ success: false, message: 'Stall not found' });
    }

    res.json({ success: true, message: 'Stall updated', stall });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete stall (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const stall = await Stall.findByIdAndDelete(req.params.id);

    if (!stall) {
      return res.status(404).json({ success: false, message: 'Stall not found' });
    }

    res.json({ success: true, message: 'Stall deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
