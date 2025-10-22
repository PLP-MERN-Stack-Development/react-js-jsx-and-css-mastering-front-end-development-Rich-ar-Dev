import React from 'react';
import TaskManager from '../components/TaskManager';

const HomePage = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          My Task Manager
        </h1>
        <TaskManager />
      </div>
    </div>
  );
};

export default HomePage;
