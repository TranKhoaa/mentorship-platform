USE mentorship;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('mentor', 'mentee') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  skills TEXT,
  interests TEXT,
  bio TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  from_user_id INT NOT NULL,
  to_user_id INT NOT NULL,
  status ENUM('pending', 'accepted', 'declined') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (from_user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (to_user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_request (from_user_id, to_user_id)
);
