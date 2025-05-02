const Discovery = require('../models/userDiscoveryModel');

const getAllProfiles = (req, res) => {
  const { role, skills, interests } = req.query;

  const filters = {
    role: role || null,
    skills: skills || null,
    interests: interests || null,
  };

  Discovery.getAllProfiles(filters, (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    res.status(200).json(results);
  });
};

module.exports = {
  getAllProfiles,
};
