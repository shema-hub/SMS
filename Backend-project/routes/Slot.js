const express = require('express');
const ParkingSlot = require('../Models/ParkingSlot');

const router = express.Router();

// Create a new slot
router.post('/', async (req, res) => {
  try {
    const newSlot = new ParkingSlot(req.body);
    const savedSlot = await newSlot.save();
    res.status(201).json(savedSlot);
  } catch (err) {
    console.error('Error creating slot:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all slots
router.get('/', async (req, res) => {
  try {
    const slots = await ParkingSlot.find();
    res.json(slots);
  } catch (err) {
    console.error('Error fetching slots:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a slot by ID
router.get('/:id', async (req, res) => {
  try {
    const slot = await ParkingSlot.findById(req.params.id);
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }
    res.json(slot);
  } catch (err) {
    console.error('Error fetching slot:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update a slot by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedSlot = await ParkingSlot.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSlot) {
      return res.status(404).json({ message: 'Slot not found' });
    }
    res.json(updatedSlot);
  } catch (err) {
    console.error('Error updating slot:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a slot by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedSlot = await ParkingSlot.findByIdAndDelete(req.params.id);
    if (!deletedSlot) {
      return res.status(404).json({ message: 'Slot not found' });
    }
    res.json({ message: 'Slot deleted successfully' });
  } catch (err) {
    console.error('Error deleting slot:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
