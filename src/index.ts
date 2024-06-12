import express from 'express';
import mongoose from 'mongoose';
import eventRouter from './events/event-router';  // Adjust the path as necessary
import authRouter from './auth/auth-router';  // Adjust the path as necessary

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', eventRouter);
app.use('/api', authRouter);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/events')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });
