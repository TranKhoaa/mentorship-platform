const express = require('express');
const router = express.Router();
const { createProfile, getProfile, updateProfile, deleteProfile } = require('../controllers/profileController');
const authenticateToken = require('../controllers/authMiddleware');

router.post('/', authenticateToken, createProfile);
router.get('/', authenticateToken, getProfile);
router.patch('/', authenticateToken, updateProfile);
router.delete('/', authenticateToken, deleteProfile);

module.exports = router;
