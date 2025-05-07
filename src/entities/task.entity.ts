import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from './index';
import { User } from './user.entity';
import { UUID } from '../types';
import { TaskPriority, TaskStatus } from '../constants/task.constants';

@Entity('tasks')
export class Task extends AbstractEntity {
  // REFERENCE ID
  @Column({ type: 'varchar', nullable: false, name: 'reference_id' })
  referenceId: string;

  // TITLE
  @Column({ type: 'varchar', nullable: false, name: 'title' })
  title: string;

  // DESCRIPTION
  @Column({ type: 'text', nullable: true, name: 'description' })
  description: string;

  // STATUS
  @Column({
    type: 'enum',
    nullable: false,
    name: 'status',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status: TaskStatus;

  // PRIORITY
  @Column({
    type: 'enum',
    nullable: false,
    name: 'priority',
    enum: TaskPriority,
    default: TaskPriority.MEDIUM,
  })
  priority: TaskPriority;

  // CREATED BY ID
  @Column({ type: 'uuid', nullable: false, name: 'created_by_id' })
  createdById: UUID;

  // ASSIGNED TO ID
  @Column({ type: 'uuid', nullable: true, name: 'assigned_to_id' })
  assignedToId: UUID;

  /**
   * RELATIONS
   */

  // CREATED BY
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'created_by_id' })
  createdBy: User;

  // ASSIGNED TO
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'assigned_to_id' })
  assignedTo: User;
}
