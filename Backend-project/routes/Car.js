const express = require('express');
const Car = require('../Models/Car');

const router = express.Router();

// Create a new car
router.post('/', async (req, res) => {
  try {
    const newCar = new Car(req.body);
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (err) {
    console.error('Error creating car:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    console.error('Error fetching cars:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a car by ID
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (err) {
    console.error('Error fetching car:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update a car by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(updatedCar);
  } catch (err) {
    console.error('Error updating car:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a car by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json({ message: 'Car deleted successfully' });
  } catch (err) {
    console.error('Error deleting car:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
