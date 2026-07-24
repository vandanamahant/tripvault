const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/upload'); 

router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const newTrip = new Trip({
      ...req.body,
      user: req.userId
    });
    const savedTrip = await newTrip.save();
    res.status(201).json(savedTrip);
  } catch (error) {
    next(error);
  }
});

router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const trips = await Trip.find({ user: req.userId });
    res.status(200).json(trips);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authMiddleware, async (req, res, next) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.userId });
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.status(200).json(trip);
  } catch (error) {
    next(error);
  }
});


router.post('/:id/upload', authMiddleware, upload.single('image'), async (req, res, next) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.userId });
    if (!trip) return res.status(404).json({ message: 'Trip not found' });

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const imageUrl = req.file.path; 

    
    if (!trip.coverImage) {
      trip.coverImage = imageUrl;
    }
    trip.photos.push(imageUrl);

    await trip.save();
    res.status(200).json({
      message: 'Photo uploaded successfully',
      coverImage: trip.coverImage,
      photos: trip.photos
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authMiddleware, async (req, res, next) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.status(200).json(trip);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const trip = await Trip.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;