// global-router.ts
import { Router } from 'express';

const globalRouter = Router();

// Define your routes here
globalRouter.get('/test', (req, res) => {
  res.send('API is working!');
});

export default globalRouter;
