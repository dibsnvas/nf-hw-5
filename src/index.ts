import express from 'express';
import mongoose from 'mongoose';
import eventRouter from './events/event-router';  // Adjust the path as necessary
import authRouter from './auth/auth-router';  // Adjust the path as necessary
import connectDB from './db';

const app = express();
const port =  process.env.PORT;

connectDB()

// Middleware
app.use(express.json());

// Routes
app.use('/api', eventRouter);
app.use('/api', authRouter);

app.listen(port, () => {
  console.log('Server started')
})
