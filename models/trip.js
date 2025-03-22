const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
  {
    startLocation: {
      type: String,
      required: true,
      trim: true,
    },
    locations: {
      type: [String],
      validate: {
        validator: function (val) {
          return Array.isArray(val) && val.length >= 2;
        },
        message: 'At least two locations are required.',
      },
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    guests: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
    },
    budget: {
      type: String,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
