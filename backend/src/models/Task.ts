export class Task {
    id: number;
    name: string;
    type: string;
    executeAt: Date;
    cron: string | null;
    state: string;
    bucket: number;
    executedAt: Date | null;

    constructor(id: number, name: string, type: string, executeAt: Date, state: string, bucket: number, cron?: string, executedAt?: Date) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.executeAt = executeAt;
        this.cron = cron || null;
        this.state = state;
        this.bucket = bucket;
        this.executedAt = executedAt || null;
    }
}