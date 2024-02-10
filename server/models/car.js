const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    Manufactur: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    color: { type: String },
    licensePlate: { type: String, unique: true },
    availabilityStatus: { type: String },
    rentalPricePerDay: { type: Number }
  });

exports.Car = mongoose.model('Car', carSchema);
exports.carSchema = carSchema;