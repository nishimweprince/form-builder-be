import { Column, Entity, OneToMany } from "typeorm";
import { AbstractEntity } from "./index";
import { RoleStatus, RoleTypes } from "../constants/role.constants";
import { UserRole } from "./userRole.entity";

@Entity("roles")
export class Role extends AbstractEntity {
  // NAME
  @Column({
    name: "name",
    type: "enum",
    enum: RoleTypes,
    nullable: false,
    unique: true,
  })
  name: RoleTypes;

  // DESCRIPTION
  @Column({
    name: "description",
    type: "text",
    nullable: true,
  })
  description: string;

  // LABEL
  @Column({
    name: "label",
    type: "varchar",
    nullable: true,
  })
  label: string;

  // STATUS
  @Column({
    name: "status",
    type: "enum",
    enum: RoleStatus,
    nullable: false,
    default: RoleStatus.ACTIVE,
  })
  status: RoleStatus;
  /**
   * RELATIONS
   */

  // USER ROLES
  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles: UserRole[];
}
