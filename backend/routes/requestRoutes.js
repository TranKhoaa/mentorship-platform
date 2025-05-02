const express = require('express');
const router = express.Router();
const { sendRequest, getIncomingRequests, getSentRequests, updateRequest } = require('../controllers/requestController');
const authenticateToken = require('../controllers/authMiddleware');

router.post('/', authenticateToken, sendRequest);
router.get('/incoming', authenticateToken, getIncomingRequests);
router.get('/sent', authenticateToken, getSentRequests);
router.patch('/', authenticateToken, updateRequest);

module.exports = router;
