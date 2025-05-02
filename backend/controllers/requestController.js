const Request = require('../models/requestModel');

const sendRequest = (req, res) => {
  const from_user_id = req.user.userId;
  const { to_user_id } = req.body;

  if (from_user_id === to_user_id) {
    return res.status(400).json({ message: 'Cannot send request to yourself' });
  }

  Request.sendRequest(from_user_id, to_user_id, (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'Request already sent to this mentor' });
      }
      return res.status(500).json({ message: 'DB error' });
    }

    res.status(201).json({ message: 'Request sent successfully' });
  });
};

const getIncomingRequests = (req, res) => {
  const user_id = req.user.userId;

  Request.getRequestsByUserId(user_id, (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    res.status(200).json(results);
  });
};

const getSentRequests = (req, res) => {
  const user_id = req.user.userId;

  Request.getSentRequestsByUserId(user_id, (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    res.status(200).json(results);
  });
};

const updateRequest = (req, res) => {
  const { request_id, status } = req.body;
  const allowedStatuses = ['accepted', 'declined'];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  Request.updateRequestStatus(request_id, status, (err, result) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    res.status(200).json({ message: `Request ${status}` });
  });
};

module.exports = {
  sendRequest,
  getIncomingRequests,
  getSentRequests,
  updateRequest,
};
