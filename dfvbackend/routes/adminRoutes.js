const express = require('express');
const router = express.Router();
const { getPendingRequests, approveAdmin, deleteAdmin ,getApprovedAdmins} = require('../controllers/adminController');
const protect = require('../middleware/authMiddleware');
const isMaster = require('../middleware/isMaster');

// Only master can access
// Get all approved admins
router.get('/approved', protect, isMaster, getApprovedAdmins);
router.get('/requests', protect, isMaster, getPendingRequests);
router.put('/approve/:id', protect, isMaster, approveAdmin);
router.delete('/remove/:id', protect, isMaster, deleteAdmin);

module.exports = router;
