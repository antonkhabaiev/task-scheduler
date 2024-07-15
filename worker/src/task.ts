import { query } from './database';
import * as cronParser from 'cron-parser';

export interface Task {
  id: number;
  name: string;
  type: string;
  execute_at: Date;
  cron: string;
  state: string;
  bucket: number;
}

export const getTasksToExecute = async (bucket: number): Promise<Task[]> => {
  const now = new Date();
  const result = await query(
    `WITH updated AS (
      UPDATE tasks
      SET state = 'in progress'
      WHERE bucket = $1 AND state = 'scheduled' AND execute_at <= $2
      RETURNING *
    )
    SELECT * FROM updated;`,
    [bucket, now]
  );
  return result.rows;
};

export const markTaskAsExecuted = async (task: Task): Promise<void> => {
  const executedAt = new Date();
  await query(
    'UPDATE tasks SET state = $1, executed_at = $2 WHERE id = $3',
    ['executed', executedAt, task.id]
  );
  if (task.type === 'cron') {
    const nextExecution = getNextExecutionTime(task.cron).toISOString();
    const bucket = getBucket();
    await query('INSERT INTO tasks (name, type, execute_at, cron, state, bucket) VALUES ($1, $2, $3, $4, $5, $6)',
      [task.name, task.type, nextExecution, task.cron, 'scheduled', bucket]);
  }
};
// these two methods would get extracted into a util library
const getNextExecutionTime = (cronString: string): Date => {
  try {
    const interval = cronParser.parseExpression(cronString);
    return interval.next().toDate();
  } catch (error) {
    console.error('Error parsing cron string:', error);
    throw new Error('Invalid cron string');
  }
};

const getBucket = (): number => {
  const bucketsCount = 2;
  return Math.floor(Math.random() * (bucketsCount));
}