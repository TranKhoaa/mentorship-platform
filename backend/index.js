const express = require('express');
const cors = require('cors');
const db = require('./configs/db');
const authRoutes = require('./routes/authRoutes');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const profileRoutes = require('./routes/profileRoutes');
app.use('/api/profile', profileRoutes);

const discoveryRoutes = require('./routes/userDiscoveryRoutes');
app.use('/api/discover', discoveryRoutes);

const requestRoutes = require('./routes/requestRoutes');
app.use('/api/requests', requestRoutes);
