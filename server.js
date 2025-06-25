const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // ✅ Import cors

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const chapterRoutes = require('./routes/chapterRoutes');

dotenv.config();

const app = express();
app.use(cors()); // ✅ Allow all origins (or configure it)
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', chapterRoutes);

// Test Routes (optional)
app.get('/api/login', (req, res) => {
  res.send('Hello, my Express app is working! Am waiting for Grading!');
});

app.post('/api/login', (req, res) => {
  res.send('Hello, my Express app is working! Am waiting for Grading!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});






