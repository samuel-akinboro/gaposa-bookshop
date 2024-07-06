// OrderItem.jsx
import React from 'react';

const OrderItem = ({ order }) => {
  const { orderId, items, totalAmount, timestamp, status } = order;

  return (
    <div className="border border-gray-200 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Order ID: {orderId}</h3>
        <span className="text-gray-600">{new Date(timestamp?.toDate()).toLocaleString()}</span>
      </div>
      <ul className="divide-y divide-gray-200">
        {items.map((item) => (
          <li key={item.bookId} className="py-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={item.title} className="h-16 w-16 object-cover rounded-lg mr-4" />
                )}
                <div>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
              </div>
              <p className="text-lg font-semibold">₦{item.price.toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-4">
        <p className="text-lg font-semibold">Total:</p>
        <p className="text-lg font-semibold">₦{totalAmount.toFixed(2)}</p>
      </div>
      <p className="mt-2">Status: {status}</p>
    </div>
  );
};

export default OrderItem;
