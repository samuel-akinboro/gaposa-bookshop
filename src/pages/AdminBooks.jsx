import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useBookshop } from '../store/BookshopContext'; // Using the Bookshop context
import { Link } from 'react-router-dom';

const AdminBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { state } = useBookshop(); // Using the Bookshop context to get the current user

  useEffect(() => {
    const fetchBooks = async () => {
      if (!state.user) return;

      setLoading(true);
      try {
        const q = collection(db, 'books');
        const querySnapshot = await getDocs(q);
        const booksData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBooks(booksData);
      } catch (err) {
        console.error('Error fetching books:', err);
        toast.error('Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [state.user]);

  const handleDelete = async (bookId) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;

    try {
      await deleteDoc(doc(db, 'books', bookId));
      setBooks(books.filter((book) => book.id !== bookId));
      toast.success('Book deleted successfully');
    } catch (err) {
      console.error('Error deleting book:', err);
      toast.error('Failed to delete book');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Admin Books</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <div key={book.id} className="bg-white p-4 rounded shadow">
              {book.imageUrl && <img src={book.imageUrl} alt={book.title} className="w-full h-48 object-cover mb-4 rounded" />}
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p>{book.author}</p>
              <p>{book.price}</p>
              <p>Copies: {book.copies}</p>
              <p className={`${book?.copies === 0 ? 'text-red-500' : 'text-green-500'}`}>{book.copies === 0 ? 'Out of Stock' : 'Available'}</p> {/* Indicator for out of stock */}
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleDelete(book.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <Link to={`/admin/edit-book/${book.id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBooks;
