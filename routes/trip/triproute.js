const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Trip = require('../../models/trip');

// Validation function for trip details
function validateTrip(trip) {
  const schema = Joi.object({
    startLocation: Joi.string().min(3).required(),
    locations: Joi.array().items(Joi.string().min(3).required()).min(2).required(),
    startDate: Joi.date().required(),
    guests: Joi.number().min(0).max(10).required(),
    budget: Joi.string().allow('', null),
    user: Joi.string().required(),
  });
  return schema.validate(trip);
}

// POST route: Create a new trip
router.post('/', async (req, res) => {
  const { error } = validateTrip(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let trip = new Trip({
    startLocation: req.body.startLocation,
    locations: req.body.locations,
    startDate: req.body.startDate,
    guests: req.body.guests,
    budget: req.body.budget,
    user: req.body.user,
  });

  trip = await trip.save();
  res.status(201).send(trip);
});

// GET route: Retrieve all trips
router.get('/', async (req, res) => {
  const trips = await Trip.find().populate('user', 'name email');
  res.status(200).send(trips);
});

// GET by ID route: Retrieve a specific trip by its ID
router.get('/:id', async (req, res) => {
  const trip = await Trip.findById(req.params.id).populate('user', 'name email');
  if (!trip) return res.status(404).send('Trip not found');
  res.status(200).send(trip);
});

module.exports = router;
