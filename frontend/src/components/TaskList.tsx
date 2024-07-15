import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState([]);

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:4000/tasks/${id}`);
    setTasks(tasks.filter((task: any) => task.id !== id));
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get('http://localhost:4000/tasks');
      setTasks(response.data);
    };
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Scheduled Tasks</h1>
      <ul>
        {tasks.map((task: any) => {
          const displayTime = new Date(task.executeAt).toLocaleString();

          return (
            <li key={task.id}>
              {task.name} - {task.type} - {task.state} - {displayTime}
              <button onClick={() => handleDelete(task.id)} style={{ marginLeft: '10px' }}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TaskList;