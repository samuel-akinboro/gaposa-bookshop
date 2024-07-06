// components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <p>&copy; 2024 GAPOSA Bookshop. All rights reserved.</p>
          {/* <div>
            <a href="#" className="text-gray-300 hover:text-gray-100 px-3 py-2">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-gray-100 px-3 py-2">Terms of Service</a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
