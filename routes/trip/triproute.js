const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Trip = require('../../models/trip');

// Validation function for trip details
function validateTrip(trip) {
  const schema = Joi.object({
    title: Joi.string().min(1).max(100).required(),
    description: Joi.string().max(500).allow('', null),
    location: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    user: Joi.string().required(),
  });
  return schema.validate(trip);
}

// POST route: Create a new trip
router.post('/', async (req, res) => {
  const { error } = validateTrip(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let trip = new Trip({
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
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