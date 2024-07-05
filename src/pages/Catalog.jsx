// src/pages/Catalog.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useBookshop } from '../store/BookshopContext'; // Assuming you have a context for user details

const Catalog = () => {
  const { state, dispatch } = useBookshop(); // Assuming state.cart exists for cart management
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const q = collection(db, 'books');
        const querySnapshot = await getDocs(q);
        const booksData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        
        // Filter books based on user's department
        const filteredBooks = booksData.filter(book => book.department === state.user.department);
        
        setBooks(filteredBooks);
      } catch (err) {
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false);
      }
    };

    if (state.user && state.user.department) {
      fetchBooks();
    }
  }, [state.user]);

  const addToCart = (book) => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...book, quantity: 1 } });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Book Catalog</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <div key={book.id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-center">
                <img
                  src={book.imageUrl} // Assuming imageUrl is the field storing the image URL
                  alt={book.title}
                  className="h-40 w-auto object-contain"
                />
              </div>
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p>{book.author}</p>
              <p>₦{book.price}</p>
              <button
                onClick={() => addToCart(book)}
                className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 mt-2 w-full"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalog;
