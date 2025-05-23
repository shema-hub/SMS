const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  plateNumber: { type: String, required: true, unique: true },
  driverName: { type: String, required: true },
  phoneNumber: { type: String, required: true }
});

const Car = mongoose.model('carSchema', carSchema);
module.exports = Car;
