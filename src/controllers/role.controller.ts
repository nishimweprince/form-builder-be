import { Request, Response, NextFunction } from 'express';
import { RoleService } from '../services/role.service';

export class RoleController {
  private readonly roleService: RoleService;

  constructor() {
    this.roleService = new RoleService();
    this.createRole = this.createRole.bind(this);
  }

  async createRole(req: Request, res: Response, next: NextFunction) {
    try {
      const role = await this.roleService.createRole(req.body);
      return res.status(201).json({
        message: 'Role created successfully',
        data: role,
      });
    } catch (error) {
      next(error);
    }
  }
}
