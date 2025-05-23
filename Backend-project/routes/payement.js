const express = require('express');
const Payment = require('../Models/Payment');

const router = express.Router();

// Create a new payment
router.post('/', async (req, res) => {
  try {
    const newPayment = new Payment(req.body);
    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (err) {
    console.error('Error creating payment:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all payments
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    console.error('Error fetching payments:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a payment by ID
router.get('/:id', async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(payment);
  } catch (err) {
    console.error('Error fetching payment:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update a payment by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(updatedPayment);
  } catch (err) {
    console.error('Error updating payment:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a payment by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
    if (!deletedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json({ message: 'Payment deleted successfully' });
  } catch (err) {
    console.error('Error deleting payment:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
