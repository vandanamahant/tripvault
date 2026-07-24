const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Trip = require('../models/Trip');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/:id/profile', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password -email');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const trips = await Trip.find({ user: user._id });

    res.status(200).json({
      success: true,
      user,
      trips
    });
  } catch (error) {
    next(error);
  }
});

router.put('/profile', authMiddleware, async (req, res, next) => {
  try {
    const { username, bio } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { 
        ...(username && { username }), 
        ...(bio !== undefined && { bio }) 
      },
      { new: true, runValidators: true }
    ).select('-password -email');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;