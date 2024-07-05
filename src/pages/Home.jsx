// pages/Home.js
import React from 'react';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to GAPOSA Bookshop</h1>
      <p className="text-lg mb-4">Explore our wide range of books and start your reading journey!</p>
      {/* Featured books section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Example featured book card */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Book Title</h2>
          <p className="text-gray-700 mb-2">Author Name</p>
          <p className="text-gray-500">$19.99</p>
        </div>
        {/* Repeat for more featured books */}
      </div>
    </div>
  );
};

export default Home;
