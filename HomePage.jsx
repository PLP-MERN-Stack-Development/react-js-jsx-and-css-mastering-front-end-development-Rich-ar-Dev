import { Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import useLocalStorage from '../hooks/useLocalStorage';

const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <Card className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Task Manager</h1>
      <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow p-2 border rounded-md bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        />
        <Button type="submit" variant="primary" className="flex items-center gap-2">
          <Plus size={18} /> Add
        </Button>
      </form>

      <div className="flex justify-center gap-2 mb-4">
        <Button
          variant={filter === 'all' ? 'primary' : 'secondary'}
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button
          variant={filter === 'active' ? 'primary' : 'secondary'}
          onClick={() => setFilter('active')}
        >
          Active
        </Button>
        <Button
          variant={filter === 'completed' ? 'primary' : 'secondary'}
          onClick={() => setFilter('completed')}
        >
          Completed
        </Button>
      </div>

      <ul className="space-y-2">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-md animate-fadeIn"
          >
            <span
              onClick={() => toggleTask(task.id)}
              className={`cursor-pointer ${
                task.completed ? 'line-through text-gray-500' : ''
              }`}
            >
              {task.text}
            </span>
            <Button
              variant="danger"
              onClick={() => deleteTask(task.id)}
              className="p-1 h-8 w-8 flex items-center justify-center"
            >
              <Trash2 size={16} />
            </Button>
          </li>
        ))}
      </ul>
      {filteredTasks.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          {filter === 'completed' ? 'No completed tasks.' : 'No tasks yet. Add one!'}
        </p>
      )}
    </Card>
  );
};

const HomePage = () => {
  return (
    <div>
      <TaskManager />
    </div>
  );
};

export default HomePage;