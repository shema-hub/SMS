const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  record: { type: mongoose.Schema.Types.ObjectId, ref: 'ParkingRecord', required: true },
  amountPaid: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now }
});


const paymentModel = mongoose.model(' paymentSchema', paymentSchema);
module.exports = paymentModel;
