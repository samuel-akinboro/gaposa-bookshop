// pages/Catalog.js
import React from 'react';
import BookCard from '../components/BookCard';

const books = [
  {
    id: 1,
    title: 'Book Title 1',
    author: 'Author 1',
    price: 15.99,
    imageUrl: 'https://placeimg.com/640/480/any',
  },
  {
    id: 2,
    title: 'Book Title 2',
    author: 'Author 2',
    price: 12.99,
    imageUrl: 'https://placeimg.com/640/480/any',
  },
  // Add more books as needed
];

const Catalog = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Catalog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
