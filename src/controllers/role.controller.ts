import { Request, Response, NextFunction } from 'express';
import { RoleService } from '../services/role.service';

// INITIALIZE SERVICES
const roleService = new RoleService();

export class RoleController {
  async createRole(req: Request, res: Response, next: NextFunction) {
    try {
      const role = await roleService.createRole(req.body);
      return res.status(201).json({
        message: 'Role created successfully',
        data: role,
      });
    } catch (error) {
      next(error);
    }
  }
}
