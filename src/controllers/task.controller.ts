import { NextFunction, Request, Response } from 'express';
import { TaskService } from '../services/task.service';
import { UUID } from '../types';
import { AuthenticatedRequest } from '../types/auth.types';
import { Task } from '../entities/task.entity';
import {
  Between,
  FindOptionsWhere,
  ILike,
  LessThanOrEqual,
  MoreThanOrEqual,
} from 'typeorm';
import { TaskPriority, TaskStatus } from '../constants/task.constants';

// INITIALIZE SERVICES
const taskService = new TaskService();

export class TaskController {
  // CREATE TASK
  async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      // LOAD USER
      const { user } = req as AuthenticatedRequest;

      const task = await taskService.createTask({
        ...req.body,
        createdById: user.id,
      });
      return res.status(201).json({
        message: 'Task created successfully',
        data: task,
      });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE TASK
  async updateTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const task = await taskService.updateTask(id as UUID, req.body);
      return res.status(200).json({
        message: 'Task updated successfully',
        data: task,
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE TASK
  async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await taskService.deleteTask(id as UUID);
      return res.status(204).json({
        message: 'Task deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  // GET TASK BY ID
  async getTaskById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const task = await taskService.getTaskById(id as UUID);
      return res.status(200).json({
        message: 'Task fetched successfully',
        data: task,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET TASK BY REFERENCE ID
  async getTaskByReferenceId(req: Request, res: Response, next: NextFunction) {
    try {
      const { referenceId } = req.params;
      const task = await taskService.getTaskByReferenceId(referenceId);
      return res.status(200).json({
        message: 'Task fetched successfully',
        data: task,
      });
    } catch (error) {
      next(error);
    }
  }

  // FETCH TASKS
  async fetchTasks(req: Request, res: Response, next: NextFunction) {
    try {

      const tasks = await taskService.fetchTasks({
        query: req.query,
      });
      return res.status(200).json({
        message: 'Tasks fetched successfully',
        data: tasks,
      });
    } catch (error) {
      next(error);
    }
  }
}
