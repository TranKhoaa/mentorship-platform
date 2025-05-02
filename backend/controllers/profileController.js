const Profile = require('../models/profileModel');

const createProfile = (req, res) => {
  const { name, skills, interests, bio } = req.body;
  const user_id = req.user.userId;

  Profile.createProfile(user_id, name, skills, interests, bio, (err, result) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    res.status(201).json({ message: 'Profile created successfully' });
  });
};

const getProfile = (req, res) => {
  const user_id = req.user.userId;

  Profile.getProfileByUserId(user_id, (err, result) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    res.status(200).json(result[0]);
  });
};

const updateProfile = (req, res) => {
  const { name, skills, interests, bio } = req.body;
  const user_id = req.user.userId;

  Profile.updateProfile(user_id, name, skills, interests, bio, (err, result) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    res.status(200).json({ message: 'Profile updated successfully' });
  });
};


const deleteProfile = (req, res) => {
  const user_id = req.user.userId;

  Profile.deleteProfile(user_id, (err, result) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    res.status(200).json({ message: 'Profile deleted successfully' });
  });
};

module.exports = {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
};
