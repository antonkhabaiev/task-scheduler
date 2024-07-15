import { getNextExecutionTime, getBucket } from './CronParser';

describe('CronParser', () => {
    describe('getNextExecutionTime', () => {
        it('should return a valid ISO string for a valid cron string', () => {
            const cronString = '*/5 * * * *'; // Every 5 minutes
            const result = getNextExecutionTime(cronString);
            expect(result).toMatch(/^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d{3}Z$/);
        });

        it('should throw an error for an invalid cron string', () => {
            const cronString = 'invalid-cron';
            expect(() => getNextExecutionTime(cronString)).toThrow('Invalid cron string');
        });
    });

    describe('getBucket', () => {
        it('should return a number', () => {
            const result = getBucket();
            expect(typeof result).toBe('number');
        });

        it('should return either 0 or 1', () => {
            const result = getBucket();
            expect([0, 1]).toContain(result);
        });
    });
});