import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';

const TaskForm: React.FC = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('one-time');
  const [time, setTime] = useState('');
  const [cron, setCron] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    setErrorMessage('');
    e.preventDefault();
    let timeTz = moment(time).tz(moment.tz.guess()).format();
    const task = { name, type, time: timeTz, cron };
    try {
      await axios.post('http://localhost:4000/tasks', task);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.message || 'An error occurred while submitting the form.');
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Task Name" required />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="one-time">One-Time</option>
        <option value="cron">Recurring</option>
      </select>
      {type === 'one-time' ? (
        <input type="datetime-local" value={time} onChange={(e) => setTime(e.target.value)} required />
      ) : (
        <input type="text" value={cron} onChange={(e) => setCron(e.target.value)} placeholder="Cron Syntax" required />
      )}
      <button type="submit">Submit</button>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </form>
  );
};

export default TaskForm;