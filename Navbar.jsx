import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Button from './Button';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
      <div className="container mx-auto px-4 py-3">
        {/* Main navbar layout */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400"
          >
            TaskMaster
          </Link>

          {/* Links */}
          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-3">
            <Link to="/">
              <Button variant="secondary">Home</Button>
            </Link>
            <Link to="/api-data">
              <Button variant="secondary">API Demo</Button>
            </Link>
            <Button
              variant="secondary"
              onClick={toggleTheme}
              className="flex items-center gap-2"
            >
              <span>{isDark ? '☀️' : '🌙'}</span>
              <span>{isDark ? 'Light' : 'Dark'}</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
