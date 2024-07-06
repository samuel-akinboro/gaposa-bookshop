import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const ordersCollection = collection(db, 'orders');
      const q = query(ordersCollection, orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const ordersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersData);
      setLoading(false); // Set loading state to false after data fetch
    } catch (error) {
      console.error('Error fetching orders: ', error);
      setLoading(false); // Ensure loading state is set to false in case of error
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Orders Management</h2>
      {loading ? (
        <p className="text-center">Loading...</p> // Show loading message or spinner
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-200 px-4 py-2">Order ID</th>
                <th className="border border-gray-200 px-4 py-2">Customer Name</th>
                <th className="border border-gray-200 px-4 py-2">Total Amount</th>
                <th className="border border-gray-200 px-4 py-2">Status</th>
                <th className="border border-gray-200 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="border border-gray-200 px-4 py-2">{order.id}</td>
                  <td className="border border-gray-200 px-4 py-2">{order.customerName ?? 'John doe'}</td>
                  <td className="border border-gray-200 px-4 py-2">₦{order.totalAmount.toFixed(2)}</td>
                  <td className="border border-gray-200 px-4 py-2">{order.status ?? 'pending'}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    <Link
                      to={`/admin/orders/${order.id}`}
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 whitespace-nowrap"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
