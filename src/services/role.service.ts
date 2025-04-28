import { In, Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { AppDataSource } from '../data-source';
import { UUID } from '../types';
import { NotFoundError, ValidationError } from '../helpers/errors.helper';
import { RoleTypes } from '../constants/role.constants';
import { LogReferenceTypes } from '../constants/logs.constants';

export class RoleService {
  private readonly roleRepository: Repository<Role>;

  constructor() {
    this.roleRepository = AppDataSource.getRepository(Role);
  }

  // CREATE ROLE
  async createRole(role: Partial<Role>): Promise<Role> {
    // CHECK IF ROLE EXISTS
    const existingRole = await this.roleRepository.findOne({
      where: { name: role?.name },
    });

    if (existingRole) {
      return existingRole;
    }

    // CHECK IF ROLE NAME IS VALID
    if (!role?.name || !Object.values(RoleTypes).includes(role.name)) {
      throw new ValidationError('Invalid role name', {
        referenceType: LogReferenceTypes.ROLE,
      });
    }

    // CREATE ROLE
    return this.roleRepository.save(role);
  }

  // GET ROLE BY ID
  async getRoleById(id: UUID): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id },
    });

    if (!role) {
      throw new NotFoundError('Role not found');
    }

    return role;
  }

  // GET ROLES BY NAMES
  async getRolesByNames(names: Partial<RoleTypes>[]): Promise<Role[]> {
    return this.roleRepository.find({
      where: { name: In(names) },
    });
  }
}
