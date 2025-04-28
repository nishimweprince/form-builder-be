import { Router } from 'express';
import authRoutes from './auth.routes';
import roleRoutes from './role.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/roles', roleRoutes);

export default router;
