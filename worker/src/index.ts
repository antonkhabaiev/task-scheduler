import { startWorker } from './worker';
import { checkConnection } from './database';

const replicaCount = 2

async function ensureDBConnection(retries: number = 10, delay: number = 2000): Promise<void> {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            await checkConnection();
            console.log('Database connection successful');
            return;
        } catch (error) {
            console.log(`Attempt ${attempt} failed, retrying...`);
            if (attempt < retries) {
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                throw new Error('Maximum retries reached, failing...');
            }
        }
    }
}

(async () => {
    await ensureDBConnection();

    for (let replicaId = 0; replicaId < replicaCount; replicaId++) {
        startWorker(replicaId);
    }
})();
