const db = require('../configs/db');

const getAllProfiles = (filters, callback) => {
  let sql = 'SELECT users.id AS user_id, email, role, name, skills, interests, bio FROM users JOIN profiles ON users.id = profiles.user_id WHERE 1=1';
  let params = [];

  if (filters.role) {
    sql += ' AND role = ?';
    params.push(filters.role);
  }

  if (filters.skills) {
    sql += ' AND skills LIKE ?';
    params.push(`%${filters.skills}%`);
  }

  if (filters.interests) {
    sql += ' AND interests LIKE ?';
    params.push(`%${filters.interests}%`);
  }

  db.query(sql, params, callback);
};

module.exports = {
  getAllProfiles,
};
