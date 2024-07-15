import cronParser from 'cron-parser';

export const getNextExecutionTime = (cronString: string): string => {
  try {
    const interval = cronParser.parseExpression(cronString);
    return interval.next().toDate().toISOString();
  } catch (error) {
    console.error('Error parsing cron string:', error);
    throw new Error('Invalid cron string');
  }
};

export const getBucket = (): number => {
  const bucketsCount = 2;
  return Math.floor(Math.random() * (bucketsCount));
}