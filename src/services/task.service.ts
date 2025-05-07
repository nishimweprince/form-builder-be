import {
  Between,
  FindOptionsWhere,
  ILike,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { Task } from '../entities/task.entity';
import { AppDataSource } from '../data-source';
import {
  validateCreateTask,
  validateUpdateTask,
} from '../validations/task.validations';
import {
  ForbiddenError,
  NotFoundError,
  ValidationError,
} from '../helpers/errors.helper';
import { LogReferenceTypes } from '../constants/logs.constants';
import {
  getPagination,
  getPagingData,
  Pagination,
} from '../helpers/pagination.helper';
import { UUID } from '../types';
import { generateReferenceId } from '../helpers/string.helper';
import { Request } from 'express';
import { TaskPriority } from '../constants/task.constants';
import { TaskStatus } from '../constants/task.constants';

export class TaskService {
  private readonly taskRepository: Repository<Task>;

  constructor() {
    this.taskRepository = AppDataSource.getRepository(Task);
  }

  // CREATE TASK
  async createTask(task: Partial<Task>): Promise<Task> {
    // VALIDATE TASK
    const { error, value } = validateCreateTask(task);
    if (error) {
      throw new ValidationError(error.message, {
        referenceType: LogReferenceTypes.TASK,
      });
    }

    // GENERATE REFERENCE ID
    let referenceId = generateReferenceId();

    // CHECK IF REFERENCE ID IS UNIQUE
    while (await this.taskRepository.findOne({ where: { referenceId } })) {
      referenceId = generateReferenceId();
    }

    return this.taskRepository.save({
      ...value,
      referenceId,
    });
  }

  // FETCH TASKS
  async fetchTasks({
    query,
  }: {
    query: Request['query'];
  }): Promise<Pagination<Task>> {
    const {
      startDate,
      endDate,
      status,
      priority,
      searchQuery,
      page = 0,
      size = 10,
      createdById,
    } = query;

    // INITIALIZE CONDITION
    let condition: FindOptionsWhere<Task> | FindOptionsWhere<Task>[] = {};

    if (startDate && !endDate) {
      condition.createdAt = MoreThanOrEqual(new Date(startDate as string));
    }

    if (endDate && !startDate) {
      condition.createdAt = LessThanOrEqual(new Date(endDate as string));
    }

    if (startDate && endDate) {
      condition.createdAt = Between(
        new Date(startDate as string),
        new Date(endDate as string)
      );
    }

    if (status) {
      condition.status = status as TaskStatus;
    }

    if (priority) {
      condition.priority = priority as TaskPriority;
    }

    if (createdById) {
      condition.createdById = createdById as UUID;
    }

    if (searchQuery) {
      condition = [
        {
          title: ILike(`%${searchQuery}%`),
        },
        {
          description: ILike(`%${searchQuery}%`),
        },
      ];
    }

    const { take, skip } = getPagination({
      page: Number(page),
      size: Number(size),
    });
    const tasks = await this.taskRepository.findAndCount({
      where: condition,
      take,
      skip,
    });

    return getPagingData({
      data: tasks,
      size: Number(size),
      page: Number(page),
    });
  }

  // GET TASK BY ID
  async getTaskById(id: UUID): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: {
        createdBy: true,
        assignedTo: true,
      },
    });

    if (!task) {
      throw new NotFoundError('Task not found', {
        referenceType: LogReferenceTypes.TASK,
      });
    }

    return task;
  }

  // GET TASK BY REFERENCE ID
  async getTaskByReferenceId(referenceId: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { referenceId },
      relations: {
        assignedTo: true,
      },
    });

    if (!task) {
      throw new NotFoundError('Task not found', {
        referenceType: LogReferenceTypes.TASK,
      });
    }

    return task;
  }

  // UPDATE TASK
  async updateTask(id: UUID, task: Partial<Task>): Promise<Task> {
    const { error, value } = validateUpdateTask(task);

    if (error) {
      throw new ValidationError(error.message, {
        referenceType: LogReferenceTypes.TASK,
      });
    }

    const taskExists = await this.getTaskById(id);

    if (taskExists?.createdById !== value?.createdById) {
      throw new ForbiddenError('You are not allowed to update this task');
    }

    return this.taskRepository.save({
      ...taskExists,
      ...value,
    });
  }

  // DELETE TASK
  async deleteTask(id: UUID): Promise<void> {
    // CHECK IF TASK EXISTS
    const taskExists = await this.getTaskById(id);

    // DELETE TASK
    await this.taskRepository.delete(taskExists?.id);
  }
}
