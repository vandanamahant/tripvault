const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const authMiddleware = require('../middleware/authMiddleware'); 


router.post('/', authMiddleware, async (req, res) => {
  try {
    const newTrip = new Trip({
      ...req.body,
      user: req.user.id 
    });
    const savedTrip = await newTrip.save();
    res.status(201).json(savedTrip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.get('/', authMiddleware, async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.id });
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;