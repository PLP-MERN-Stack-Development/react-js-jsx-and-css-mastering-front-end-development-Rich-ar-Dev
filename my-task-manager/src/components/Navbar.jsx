import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Button from './Button';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <nav className="bg-black border-b border-gray-800 transition-colors duration-500">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-white transition-colors duration-200">
            TaskMaster
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button 
                variant={location.pathname === '/' ? 'primary' : 'secondary'}
                className="transition-all duration-200"
              >
                Home
              </Button>
            </Link>
            <Link to="/api-data">
              <Button 
                variant={location.pathname === '/api-data' ? 'primary' : 'secondary'}
                className="transition-all duration-200"
              >
                API Demo
              </Button>
            </Link>
            <Button 
              variant="secondary" 
              onClick={toggleTheme}
              className="flex items-center space-x-2 transition-all duration-200 hover:scale-105"
            >
              <span className="transition-transform duration-200">{isDark ? '☀️' : '🌙'}</span>
              <span>{isDark ? 'Light' : 'Dark'}</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
