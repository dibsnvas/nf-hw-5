import express from 'express';
import mongoose from 'mongoose';
import eventRouter from './events/event-router';  // Adjust the path as necessary
import authRouter from './auth/auth-router';  // Adjust the path as necessary
import connectDB from './db';

const app = express();
const port = 3000;

connectDB()

// Middleware
app.use(express.json());

// Routes
app.use('/api', eventRouter);
app.use('/api', authRouter);

app.listen(8000, () => {
  console.log('Server started')
})
