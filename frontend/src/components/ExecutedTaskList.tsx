import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExecutedTaskList: React.FC = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get('http://localhost:4000/executed-tasks');
      setTasks(response.data);
    };
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Executed Tasks</h1>
      <ul>
        {tasks.map((task: any) => {
          const executeAt = new Date(task.executeAt).toLocaleString();
          const executedAt = new Date(task.executedAt).toLocaleString();
          return (
            <li key={task.id}>{task.name} - {task.type} - {executeAt} - {executedAt}</li>
          );
        })}
      </ul>
    </div>
  );
};

export default ExecutedTaskList;