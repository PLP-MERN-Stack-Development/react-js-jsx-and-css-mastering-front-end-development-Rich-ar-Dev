import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Card from './Card';
import Button from './Button';

const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const activeTasks = totalTasks - completedTasks;

  return (
    <Card className="w-full">
      <div className="space-y-6">
        {/* Header - Centered */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Task Manager
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {activeTasks} active, {completedTasks} completed
          </p>
        </div>

        {/* Add Task Form - Centered */}
        <div className="flex gap-2 justify-center">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200 w-full max-w-md"
          />
          <Button 
            onClick={addTask} 
            variant="primary"
          >
            Add
          </Button>
        </div>

        {/* Filter Buttons - Centered */}
        <div className="flex gap-2 justify-center">
          <Button
            variant={filter === 'all' ? 'primary' : 'secondary'}
            onClick={() => setFilter('all')}
          >
            All ({totalTasks})
          </Button>
          <Button
            variant={filter === 'active' ? 'primary' : 'secondary'}
            onClick={() => setFilter('active')}
          >
            Active ({activeTasks})
          </Button>
          <Button
            variant={filter === 'completed' ? 'primary' : 'secondary'}
            onClick={() => setFilter('completed')}
          >
            Completed ({completedTasks})
          </Button>
        </div>

        {/* Task List - Centered */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                {filter === 'all' 
                  ? 'No tasks yet. Add one above!' 
                  : `No ${filter} tasks.`}
              </p>
            </div>
          ) : (
            filteredTasks.map(task => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                  task.completed
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <span
                    className={`${
                      task.completed
                        ? 'line-through text-gray-500 dark:text-gray-400'
                        : 'text-gray-800 dark:text-white'
                    }`}
                  >
                    {task.text}
                  </span>
                </div>
                <Button
                  variant="danger"
                  onClick={() => deleteTask(task.id)}
                  className="px-3 py-1 text-sm"
                >
                  Delete
                </Button>
              </div>
            ))
          )}
        </div>

        {/* Clear Completed Button - Centered */}
        {completedTasks > 0 && (
          <div className="text-center">
            <Button variant="danger" onClick={clearCompleted}>
              Clear Completed ({completedTasks})
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TaskManager;
