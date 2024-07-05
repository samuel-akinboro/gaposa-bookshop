import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to GAPOSA Bookshop</h1>
      <div>
        <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-4">Sign In</Link>
        <Link to="/signup" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">Sign Up</Link>
      </div>
    </div>
  );
};

export default Landing;
