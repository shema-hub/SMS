const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  slotNumber: { type: String, required: true, unique: true },
  slotStatus: { type: String, enum: ['available', 'occupied'], default: 'available' }
});

const  ParkingSlot = mongoose.model('slotSchema', slotSchema);
module.exports = ParkingSlot;
