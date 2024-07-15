import cron from 'node-cron';
import { getTasksToExecute, markTaskAsExecuted } from './task';

export const startWorker = (replicaId: number) => {
  cron.schedule('*/5 * * * * *', async () => {
    console.log(`Replica ${replicaId} checking for tasks...`);
    const tasks = await getTasksToExecute(replicaId);
    console.log(`Replica ${replicaId} found ${tasks.length} tasks to execute`);
    for (const task of tasks) {
      console.log(`Replica ${replicaId} executing task ${task.id}`);
      await markTaskAsExecuted(task);
    }
  });
};