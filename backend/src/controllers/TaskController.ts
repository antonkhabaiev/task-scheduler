import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';

export class TaskController {
  constructor(private taskService: TaskService) { }

  createTask = async (req: Request, res: Response) => {
    const task = req.body;
    try {
      await this.taskService.createTask(task);
      res.status(201).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create task: check task name exists", error: error });
    }
  };

  getTasks = async (req: Request, res: Response) => {
    const tasks = await this.taskService.getTasks();
    res.status(200).json(tasks);
  };

  getExecutedTasks = async (req: Request, res: Response) => {
    const tasks = await this.taskService.getExecutedTasks();
    res.status(200).json(tasks);
  };

  deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.taskService.deleteTask(Number(id));
    res.status(204).send();
  };
}