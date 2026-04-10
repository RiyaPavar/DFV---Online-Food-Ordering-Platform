const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');

// GET /offers
router.get('/', offerController.getOffers);

// POST /offers (Admin protected)
router.post('/', offerController.createOffer);

module.exports = router;
