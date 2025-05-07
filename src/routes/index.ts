import { Router } from 'express';
import authRoutes from './auth.routes';
import roleRoutes from './role.routes';
import taskRoutes from './task.routes';

const router = Router();

// AUTH ROUTES
router.use('/auth', authRoutes);

// ROLE ROUTES
router.use('/roles', roleRoutes);

// TASK ROUTES
router.use('/tasks', taskRoutes);

export default router;
