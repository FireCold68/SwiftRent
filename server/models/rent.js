const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    totalCost: { type: Number },
    rentalStatus: { type: String }
  });

exports.rent = mongoose.model('rent', rentalSchema);
exports.rentalSchema = rentalSchema;