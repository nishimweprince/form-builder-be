import Joi from 'joi';
import { Task } from '../entities/task.entity';
import { TaskStatus } from '../constants/task.constants';
import { TaskPriority } from '../constants/task.constants';

// CREATE TASK
export const validateCreateTask = (task: Partial<Task>) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().max(100).optional(),
    status: Joi.string()
      .valid(...Object.values(TaskStatus))
      .required(),
    priority: Joi.string()
      .valid(...Object.values(TaskPriority))
      .required(),
    createdById: Joi.string().required(),
    assignedToId: Joi.string().optional(),
  });

  return schema.validate(task);
};

// UPDATE TASK
export const validateUpdateTask = (task: Partial<Task>) => {
  const schema = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().max(100).optional(),
    status: Joi.string()
      .valid(...Object.values(TaskStatus))
      .optional(),
    priority: Joi.string()
      .valid(...Object.values(TaskPriority))
      .optional(),
    assignedToId: Joi.string().optional(),
  });

  return schema.validate(task);
};
