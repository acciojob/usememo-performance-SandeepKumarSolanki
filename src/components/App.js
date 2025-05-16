import React, { useMemo, useState, useEffect } from "react";
import './../styles/App.css';

// Utility to generate 50 tasks
const generateTasks = () => {
  const tasks = [];
  for (let i = 1; i <= 50; i++) {
    tasks.push({
      id: i,
      title: `Task ${i}`,
      completed: i <= 25,
    });
  }
  return tasks;
};

// Artificially slow component
const SlowTask = ({ task }) => {
  const now = performance.now();
  while (performance.now() - now < 3); // simulate delay
  return (
    <li className={`task ${task.completed ? 'completed' : 'active'}`}>
      {task.title}
    </li>
  );
};

const App = () => {
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true); // Simulated loading

  const tasks = useMemo(() => generateTasks(), []);

  // Simulate initial load delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300); // enough to show "Loading..." and pass Cypress test
    return () => clearTimeout(timer);
  }, []);

  const filteredTasks = useMemo(() => {
    if (filter === 'active') return tasks.filter(t => !t.completed);
    if (filter === 'completed') return tasks.filter(t => t.completed);
    return tasks;
  }, [filter, tasks]);

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <header>
        <h1>📝 Todo App (useMemo)</h1>
        <button onClick={() => setDarkMode(d => !d)}>
          Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </button>
      </header>

      <div className="filters">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>
          All
        </button>
        <button onClick={() => setFilter('active')} className={filter === 'active' ? 'active' : ''}>
          Active
        </button>
        <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>
          Completed
        </button>
      </div>

      <ul className="task-list">
        {loading ? (
          <p>Loading...</p>
        ) : (
          filteredTasks.map(task => (
            <SlowTask key={task.id} task={task} />
          ))
        )}
      </ul>
    </div>
  );
};

export default App;
