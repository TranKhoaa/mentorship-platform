const db = require('../configs/db');

const createProfile = (user_id, name, skills, interests, bio, callback) => {
  const sql = 'INSERT INTO profiles (user_id, name, skills, interests, bio) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [user_id, name, skills, interests, bio], callback);
};

const getProfileByUserId = (user_id, callback) => {
  const sql = 'SELECT * FROM profiles WHERE user_id = ?';
  db.query(sql, [user_id], callback);
};

const updateProfile = (user_id, name, skills, interests, bio, callback) => {
  const sql = 'UPDATE profiles SET name = ?, skills = ?, interests = ?, bio = ? WHERE user_id = ?';
  db.query(sql, [name, skills, interests, bio, user_id], callback);
};

const deleteProfile = (user_id, callback) => {
  const sql = 'DELETE FROM profiles WHERE user_id = ?';
  db.query(sql, [user_id], callback);
};

module.exports = {
  createProfile,
  getProfileByUserId,
  updateProfile,
  deleteProfile,
};
