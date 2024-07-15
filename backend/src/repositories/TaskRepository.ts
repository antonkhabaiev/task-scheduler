import { Pool } from 'pg';
import { getNextExecutionTime, getBucket } from '../utils/CronParser';
import { Task } from '../models/Task';

export class TaskRepository {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: 'user',
      host: 'db',
      database: 'task_scheduler',
      password: 'password',
      port: 5432,
    });
  }

  createTask = async (task: any) => {
    const { name, type, time, cron } = task;
    let bucket = getBucket();
    let executeAt = time;
    // If a cron schedule is provided, calculate the next execution time
    if (type === 'cron') {
      executeAt = getNextExecutionTime(cron);
    }
    console.log('Creating task:', name, type, executeAt, cron, bucket)
    await this.pool.query('INSERT INTO tasks (name, type, execute_at, cron, state, bucket) VALUES ($1, $2, $3, $4, $5, $6)', [name, type, executeAt, cron, 'scheduled', bucket]);
  };

  getTasks = async (): Promise<Task[]> => {
    const result = await this.pool.query('SELECT * FROM tasks WHERE state = $1 OR state = $2', ['scheduled', 'queued']);
    return result.rows.map(row => new Task(row.id, row.name, row.type, row.execute_at, row.state, row.bucket, row.cron, row.executed_at));
  };

  getExecutedTasks = async (): Promise<Task[]> => {
    const result = await this.pool.query('SELECT * FROM tasks WHERE state = $1', ['executed']);
    return result.rows.map(row => new Task(row.id, row.name, row.type, row.execute_at, row.state, row.bucket, row.cron, row.executed_at));
  };

  deleteTask = async (id: number) => {
    const taskRow = await this.pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    const task = taskRow.rows[0];
    if (task.type === 'cron') {
      await this.pool.query('DELETE FROM tasks WHERE name = $1 AND type = $2 AND state=$3 AND cron=$4', [task.name, task.type, 'scheduled', task.cron]);
    } else {
      await this.pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    }
  };
}