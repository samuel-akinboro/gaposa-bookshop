// pages/BookDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams();  // Assuming each book has a unique ID

  // Dummy book data (replace with actual data fetching logic)
  const book = {
    id: 1,
    title: 'Book Title 1',
    author: 'Author 1',
    price: 15.99,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    imageUrl: 'https://placeimg.com/640/480/any',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex">
          <img src={book.imageUrl} alt={book.title} className="w-1/3 rounded-lg shadow-lg" />
          <div className="ml-6 flex-1">
            <h1 className="text-3xl font-semibold mb-4">{book.title}</h1>
            <p className="text-gray-600 mb-4">by {book.author}</p>
            <p className="text-gray-700">${book.price}</p>
            <p className="mt-4">{book.description}</p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
