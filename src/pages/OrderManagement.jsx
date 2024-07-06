// OrderManagement.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Import your Firebase firestore instance
import { collection, getDocs, query, where } from 'firebase/firestore';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const ordersCollection = collection(db, 'orders');
      const q = query(ordersCollection); // Assuming you have 'orders' collection in Firestore
      const querySnapshot = await getDocs(q);
      const ordersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersData);
    } catch (error) {
      console.error('Error fetching orders: ', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Orders Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-2">Order ID</th>
              <th className="border border-gray-200 px-4 py-2">Customer Name</th>
              <th className="border border-gray-200 px-4 py-2">Total Amount</th>
              <th className="border border-gray-200 px-4 py-2">Status</th>
              {/* Add more columns as per your order details */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="border border-gray-200 px-4 py-2">{order.id}</td>
                <td className="border border-gray-200 px-4 py-2">{order.customerName}</td>
                <td className="border border-gray-200 px-4 py-2">₦{order.totalAmount.toFixed(2)}</td>
                <td className="border border-gray-200 px-4 py-2">{order.status}</td>
                {/* Render more details or actions here */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
