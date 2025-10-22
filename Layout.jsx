import React from 'react';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />

      {/* Centered main content */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-8">
        <div className="w-full max-w-3xl">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
