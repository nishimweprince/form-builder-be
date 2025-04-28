import { Router } from 'express';
import { RoleController } from '../controllers/role.controller';

const router = Router();

const roleController = new RoleController();

router.post('/', roleController.createRole);

export default router;
