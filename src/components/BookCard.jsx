// src/components/BookCard.jsx
import React from 'react';
import { useBookshop } from '../store/BookshopContext';
import { toast } from 'react-toastify';

const BookCard = ({ book }) => {
  const { state, dispatch } = useBookshop();
  const cartItem = state.cart.find(item => item.id === book.id);

  const addToCart = () => {
    if (cartItem && cartItem.quantity >= book.copies) {
      toast.error(`Only ${book.copies} copies available`);
      return;
    }
    if (cartItem) {
      dispatch({ type: 'UPDATE_CART_ITEM_QUANTITY', payload: { id: book.id, quantity: cartItem.quantity + 1 } });
    } else {
      dispatch({ type: 'ADD_TO_CART', payload: { ...book, id: book.id, quantity: 1 } });
    }
    toast.success(`${book.title} added to cart`);
  };

  const removeFromCart = () => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: book.id });
    toast.success(`${book.title} removed from cart`);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-center">
        <img
          src={book.imageUrl}
          alt={book.title}
          className="h-40 w-auto object-contain"
        />
      </div>
      <h2 className="text-xl font-semibold">{book.title}</h2>
      <p>{book.author}</p>
      <p>₦{book.price}</p>
      <p>Department: {book.department}</p>
      <p>Copies: {book.copies}</p>
      {cartItem ? (
        <div className="flex items-center justify-between mt-2">
          <button
            onClick={() => dispatch({ type: 'UPDATE_CART_ITEM_QUANTITY', payload: { id: book.id, quantity: cartItem.quantity - 1 } })}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            disabled={cartItem.quantity <= 1}
          >
            -
          </button>
          <span>{cartItem.quantity}</span>
          <button
            onClick={addToCart}
            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
            disabled={cartItem.quantity >= book.copies}
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={addToCart}
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 mt-2 w-full"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default BookCard;
