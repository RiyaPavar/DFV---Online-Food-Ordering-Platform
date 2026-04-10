const Offer = require('../models/Offer');

// Get all active offers
exports.getOffers = async (req, res) => {
  try {
    const offers = await Offer.find({ active: true }).populate('itemId');
    res.json(offers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch offers' });
  }
};

// Create a new offer (Admin only)
exports.createOffer = async (req, res) => {
  try {
    const offer = await Offer.create(req.body);
    res.status(201).json(offer);
  } catch (err) {
    res.status(400).json({ error: 'Invalid offer data' });
  }
};
