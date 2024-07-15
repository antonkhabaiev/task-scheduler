## Design Document

### Overview
The distributed task scheduler allows clients to register tasks that can be either one-time or recurring. The tasks are scheduled to be executed at a specific time or according to a cron syntax. The system ensures that tasks are picked up and executed within 10 seconds of their scheduled time. The system logs the execution of tasks and provides a UI for managing tasks.

### Core Components
1. **Frontend (React.js with TypeScript)**: Provides a GUI for clients to create, schedule, view, edit, and delete tasks.
2. **Backend (Node.js with TypeScript)**: Provides APIs for the frontend to interact with the task scheduler and storage services.
3. **Worker (Node.js with TypeScript)**: Workers to execute tasks in the background

### High-Level Architecture
- **Frontend**: React.js with TypeScript
- **Backend**: Node.js with TypeScript
- **Worker**: Node.js with TypeScript
- **Database**: PostgreSQL
- **Containerization**: Docker

### Detailed Design
Our main components for the system are:
- Backend API is used from CRUD on tasks, it is a stateless deployment that would scale horizontally based on API requests. It's main functions are to create, view and delete tasks, view tasks execution history.
- Execution of tasks is handled by Worker. Our main bottleneck here is the amount of tasks that need to be executed, if we want our system to scale to millions and beyond of tasks executed per seconds we need to make sure the task execute can scale horizontally to handle such load. To enable this we will partition our tasks into `buckets`, we will have a replica of `scheduler` to monitor a bucket for tasks that need to be executed, it's a process that would run in a loop executing `SELECT * FROM tasks WHERE execute_at < NOW()`. It will then send tasks that need to be executed into a queue where `executer` worker pool(scale horizontally based on `buckets`) will pick up the task and execute them, we would want to decouple `executer` and `scheduler` in real world scenario because we want to guarantee that a tasks gets executed once we pick it up from DB and using Kafka for it's guarantees makes sense in this scenario.
- I've designed cron execution to work in a continuos scheduling fashion where a new task gets scheduled after the old current tasks is executed, all task types follow the same flow where they have `execute_at` time according to which they get picked up by `scheduler`. In case of the cron task `scheduler` will also be responsible for scheduling the next execution time after the current task has been executed(sent to execution queue).
- We will also be able to scale our postgres database horizontally using `buckets` as shards. In current design there's only one table but we can improve performance be decluttering `tasks` table and moving executed tasks in bulk to a different table for historical storage after 1 month of time, or depending on our retention policies just clean it up completely.
- The last component which is the queue. We can use Kafka where we can partition the `execute` topic based on buckets and therefore scale horizontally as well.
Please see a diagram here: https://excalidraw.com/#json=XHFXFlnnY68gfkOz2701R,c5B2aREfADLtpRTHkrAU9w

### Prototype simplifications
- I've approached it with a simple table design where both cron and one-time tasks are stored together with history of executed tasks, in real world scenario we would want a history table for tasks to be separated from operations tasks table.
- Simple worker combines both `scheduler` and `executer` instances, in real world scenario we would want them to be separated and using a queue between them for delivery and execution guarantees. 
- Indexing and other schema design considerations were simplified, in rwc we would need to consider edge cases like creating task with same name/cron schedule etc.
- Error handling: I've demonstrated some error handling with the same task name/type/time creation, but in rwc we want to handle many other exceptional situation like for ex. when database in unavailable etc.
- Testing. Typically you would want to cover all your codebase with robust tests, here I've provided an example for testing but not the full coverage.

### Running the Solution with Docker
1. **Install Docker**: Ensure Docker is installed on your machine.
2. **Run the script**: `./run.sh`
3. **Test**: navigate to localhost:3000 to get started with GUI.