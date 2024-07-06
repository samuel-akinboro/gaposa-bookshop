// src/components/CartCard.jsx
import React from 'react';
import { useBookshop } from '../store/BookshopContext';
import { toast } from 'react-toastify';

const CartCard = ({ item }) => {
  const { dispatch } = useBookshop();

  const incrementQuantity = () => {
    if (item.quantity < item.copies) {
      dispatch({ type: 'UPDATE_CART_ITEM_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } });
    } else {
      toast.error('No more copies left');
    }
  };

  const decrementQuantity = () => {
    if (item.quantity === 1) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: item.id });
    } else {
      dispatch({ type: 'UPDATE_CART_ITEM_QUANTITY', payload: { id: item.id, quantity: item.quantity - 1 } });
    }
  };

  const removeFromCart = () => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item.id });
    toast.success('Item removed from cart');
  };

  return (
    <div className="border p-4 mb-4 flex">
      <img
        src={item.imageUrl}
        alt={item.title}
        className="h-40 w-auto object-contain mr-4"
      />
      <div>
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p>Author: {item.author}</p>
        <p>Department: {item.department}</p>
        <p>Price: ₦{item.price}</p>
        <div className="flex items-center mt-2">
          <button
            onClick={decrementQuantity}
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
          >
            -
          </button>
          <span className="mx-2">{item.quantity}</span>
          <button
            onClick={incrementQuantity}
            className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded"
          >
            +
          </button>
        </div>
        <button
          onClick={removeFromCart}
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 mt-2 rounded"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartCard;
