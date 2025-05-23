const express = require('express');
const ParkingRecord = require('../Models/ParkingRecord');

const router = express.Router();

// Create a new record
router.post('/', async (req, res) => {
  try {
    const newRecord = new ParkingRecord(req.body);
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (err) {
    console.error('Error creating record:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all records
router.get('/', async (req, res) => {
  try {
    const records = await ParkingRecord.find()
      .populate('car')
      .populate('slot')
      .exec();
    res.json(records);
  } catch (err) {
    console.error('Error fetching records:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a record by ID
router.get('/:id', async (req, res) => {
  try {
    const record = await ParkingRecord.findById(req.params.id)
      .populate('car')
      .populate('slot')
      .exec();
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json(record);
  } catch (err) {
    console.error('Error fetching record:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update a record by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedRecord = await ParkingRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json(updatedRecord);
  } catch (err) {
    console.error('Error updating record:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a record by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedRecord = await ParkingRecord.findByIdAndDelete(req.params.id);
    if (!deletedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json({ message: 'Record deleted successfully' });
  } catch (err) {
    console.error('Error deleting record:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
