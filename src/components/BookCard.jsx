import React from 'react';

const BookCard = ({ book }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full">
      <img src={book.imageUrl} alt={book.title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
        <p className="text-gray-600 mb-2">by {book.author}</p>
        <p className="text-gray-700">₦{book.price}</p>
        <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BookCard;
