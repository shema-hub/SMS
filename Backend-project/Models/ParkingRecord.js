const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  slot: { type: mongoose.Schema.Types.ObjectId, ref: 'ParkingSlot', required: true },
  entryTime: { type: Date, required: true },
  exitTime: { type: Date },
  duration: { type: Number }, // in hours
});

const    recordModel = mongoose.model('recordSchema', recordSchema);
module.exports = recordModel;
