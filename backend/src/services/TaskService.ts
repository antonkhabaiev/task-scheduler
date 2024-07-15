import { TaskRepository } from '../repositories/TaskRepository';

export class TaskService {
  constructor(private taskRepository: TaskRepository) { }

  createTask = async (task: any) => {
    await this.taskRepository.createTask(task);
  };

  getTasks = async () => {
    return await this.taskRepository.getTasks();
  };

  getExecutedTasks = async () => {
    return await this.taskRepository.getExecutedTasks();
  };
  deleteTask = async (id: number) => {
    await this.taskRepository.deleteTask(id);
  };
}