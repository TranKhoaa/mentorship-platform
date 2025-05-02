const db = require('../configs/db');

const sendRequest = (from_user_id, to_user_id, callback) => {
  const sql = 'INSERT INTO requests (from_user_id, to_user_id) VALUES (?, ?)';
  db.query(sql, [from_user_id, to_user_id], callback);
};

const getRequestsByUserId = (user_id, callback) => {
  const sql = `
    SELECT r.id, r.from_user_id, r.to_user_id, r.status,
           u.email AS from_email, p.name AS from_name
    FROM requests r
    JOIN users u ON r.from_user_id = u.id
    JOIN profiles p ON r.from_user_id = p.user_id
    WHERE r.to_user_id = ?
  `;
  db.query(sql, [user_id], callback);
};

const getSentRequestsByUserId = (user_id, callback) => {
  const sql = `
    SELECT r.id, r.from_user_id, r.to_user_id, r.status,
           u.email AS to_email, p.name AS to_name
    FROM requests r
    JOIN users u ON r.to_user_id = u.id
    JOIN profiles p ON r.to_user_id = p.user_id
    WHERE r.from_user_id = ?
  `;
  db.query(sql, [user_id], callback);
};

const updateRequestStatus = (request_id, status, callback) => {
  const sql = 'UPDATE requests SET status = ? WHERE id = ?';
  db.query(sql, [status, request_id], callback);
};

module.exports = {
  sendRequest,
  getRequestsByUserId,
  getSentRequestsByUserId,
  updateRequestStatus,
};
