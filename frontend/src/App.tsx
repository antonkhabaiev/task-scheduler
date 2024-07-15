import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import ExecutedTaskList from './components/ExecutedTaskList';

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/tasks">Tasks</Link></li>
          <li><Link to="/executed-tasks">Executed Tasks</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" Component={TaskForm} />
        <Route path="/tasks" Component={TaskList} />
        <Route path="/executed-tasks" Component={ExecutedTaskList} />
      </Routes>
    </Router>
  );
};

export default App;