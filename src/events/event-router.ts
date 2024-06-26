// src/events/event-router.ts
import { Router } from 'express';
import EventController from './event-controller';
import EventService from './event-service';
import { authMiddleware } from '../middlewares/auth-middleware';

const eventRouter = Router();

const eventService = new EventService();
const eventController = new EventController(eventService);

eventRouter.get('/events', authMiddleware, eventController.getEvents);
eventRouter.post('/events', authMiddleware, eventController.createEvent);
eventRouter.get('/events/:id', authMiddleware, eventController.getEventById);

export default eventRouter;
