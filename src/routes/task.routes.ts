import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

const taskController = new TaskController();

// CREATE TASK
router.post('/', authMiddleware, taskController.createTask);

// UPDATE TASK
router.patch('/:id', authMiddleware, taskController.updateTask);

// DELETE TASK
router.delete('/:id', authMiddleware, taskController.deleteTask);

// GET TASK BY ID
router.get('/:id', authMiddleware, taskController.getTaskById);

// GET TASK BY REFERENCE ID
router.get(
  '/reference/:referenceId',
  authMiddleware,
  taskController.getTaskByReferenceId
);

// FETCH TASKS
router.get('/', authMiddleware, taskController.fetchTasks);

export default router;
