import React from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  // Dummy data for demonstration
  const cartItems = [
    { id: 1, title: 'Book 1', price: 19.99, quantity: 2 },
    { id: 2, title: 'Book 2', price: 29.99, quantity: 1 },
    { id: 3, title: 'Book 3', price: 24.99, quantity: 3 },
  ];

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1">
            {cartItems.map(item => (
              <div key={item.id} className="border p-4 mb-4">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="col-span-1">
            <div className="border p-4">
              <h3 className="text-lg font-semibold">Order Summary</h3>
              <p>Total Items: {cartItems.length}</p>
              <p>Total Price: ${totalPrice.toFixed(2)}</p>
              <Link to="/checkout" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-4 inline-block rounded">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
