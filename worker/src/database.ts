import { Pool } from 'pg';

const pool = new Pool({
  user: 'user',
  host: 'db',
  database: 'task_scheduler',
  password: 'password',
  port: 5432,
  statement_timeout: 5000,
});

export const checkConnection = async (): Promise<void> => {
  try {
    await pool.query('SELECT COUNT(*) FROM tasks');
  } catch (error) {
    throw new Error('Database connection failed: ' + error);
  }
};

export const query = (text: string, params?: any[]) => pool.query(text, params);