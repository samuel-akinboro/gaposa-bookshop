import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const OrderDetails = () => {
  const { orderId } = useParams(); // Get orderId from route parameters
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true); // Set loading state to true before fetching
      try {
        const orderRef = doc(db, 'orders', orderId);
        const docSnapshot = await getDoc(orderRef);
        if (docSnapshot.exists()) {
          setOrder({ id: docSnapshot.id, ...docSnapshot.data() });
          setNewStatus(docSnapshot.data().status ?? 'Book Given Out'); // Set initial status value
        } else {
          console.error('No such document!');
        }
        setLoading(false); // Set loading state to false after fetching
      } catch (error) {
        console.error('Error fetching order details:', error);
        setLoading(false); // Set loading state to false in case of error
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleStatusChange = async () => {
    setUpdatingStatus(true); // Set updating status state to true
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        status: newStatus,
      });
      toast.success('Status updated successfully!');
      // Optionally, you can fetch order details again to update UI
      setOrder({ ...order, status: newStatus });
    } catch (error) {
      toast.error('Error updating status');

      console.log('Error updating status:', error);
    }
    setUpdatingStatus(false); // Set updating status state to false after updating
  };

  if (!order) {
    return <p>Order not found!</p>; // Render message if order is not found
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Order ID: {order.id}</h3>
        <p className="text-gray-600">Status: {order.status}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Customer Information</h3>
        <p>Name: {order.customerName}</p>
        <p>Email: {order.shippingInfo.email}</p>
        <p>Phone Number: {order.shippingInfo.phoneNumber}</p>
        <p>Address: {order.shippingInfo.address}</p>
        <p>City: {order.shippingInfo.city}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Ordered Items</h3>
        <ul className="divide-y divide-gray-200">
          {order.items.map((item) => (
            <li key={item.bookId} className="py-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img src={item.imageUrl} alt={item.title} className="h-16 w-auto object-contain" />
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
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Change Status</h3>
        <div className="flex items-center space-x-4">
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="Refunded">Refunded</option>
            <option value="Book Given Out">Book Given Out</option>
          </select>
          <button
            onClick={handleStatusChange}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 flex items-center"
            disabled={updatingStatus}
          >
            {updatingStatus ? (
              <ClipLoader color="#ffffff" size={20} />
            ) : (
              'Update Status'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
