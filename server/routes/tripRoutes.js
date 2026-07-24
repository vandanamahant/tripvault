const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const Trip = require('../models/Trip');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.post('/', authMiddleware, upload.single('image'), async (req, res, next) => {
  try {
    const tripData = {
      ...req.body,
      user: req.userId
    };

    if (req.file) {
      tripData.coverImage = req.file.path;
      tripData.photos = [req.file.path];
    }

    const newTrip = new Trip(tripData);
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

router.put('/:id/photo', authMiddleware, upload.single('image'), async (req, res, next) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.userId });
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    if (trip.photos && trip.photos.length > 0) {
      for (const imgUrl of trip.photos) {
        const parts = imgUrl.split('/');
        const filenameWithExtension = parts[parts.length - 1];
        const publicId = `${parts[parts.length - 2]}/${filenameWithExtension.split('.')[0]}`;
        await cloudinary.uploader.destroy(publicId);
      }
    }

    const newImageUrl = req.file.path;
    trip.coverImage = newImageUrl;
    trip.photos = [newImageUrl];

    await trip.save();
    res.status(200).json({
      message: 'Photo updated successfully',
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