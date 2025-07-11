import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 5002;

// To check that PORT is working fine
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  // Connect the MongoDB
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('MongoDB Connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});