CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    execute_at TIMESTAMPTZ NOT NULL,
    cron VARCHAR(255),
    state VARCHAR(50) NOT NULL,
    bucket INTEGER NOT NULL,
    executed_at TIMESTAMPTZ
);

CREATE UNIQUE INDEX idx_tasks_name_type_cron_state_execute_at ON tasks (name, type, cron, execute_at);