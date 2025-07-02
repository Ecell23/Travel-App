const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
  {
    startLocation: {
      placeId: { type: String, required: true, minlength: 1, trim: true },
      placeName: { type: String, required: true, minlength: 3, trim: true },
      day: { type: Number, required: true, min: 1, max: 1 },
    },
    locations: {
      type: [
        {
          placeId: { type: String, required: true, minlength: 1, trim: true },
          placeName: { type: String, required: true, minlength: 3, trim: true },
          day: { type: Number, required: true, min: 1 },
        }
      ],
      validate: {
        validator: function (val) {
          return (
            Array.isArray(val) &&
            val.length >= 2 &&
            val.every(
              loc =>
                typeof loc.placeId === 'string' &&
                loc.placeId.length >= 1 &&
                typeof loc.placeName === 'string' &&
                loc.placeName.length >= 3 &&
                typeof loc.day === 'number' &&
                loc.day >= 1
            )
          );
        },
        message: 'At least two locations are required, each with a valid placeId, placeName (min 3 chars), and day (>=1).',
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
