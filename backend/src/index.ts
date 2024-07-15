import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { TaskController } from './controllers/TaskController';
import { TaskRepository } from './repositories/TaskRepository';
import { TaskService } from './services/TaskService';

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors());

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

app.post('/tasks', taskController.createTask);
app.get('/tasks', taskController.getTasks);
app.get('/executed-tasks', taskController.getExecutedTasks);
app.delete('/tasks/:id', taskController.deleteTask);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});