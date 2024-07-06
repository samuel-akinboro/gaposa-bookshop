import React, { useState } from 'react';
import { useBookshop } from '../store/BookshopContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PaystackButton } from 'react-paystack';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase'; // Assuming you have Firebase initialized and exported as 'db'

const Checkout = () => {
  const { state, dispatch } = useBookshop();
  const { cart, user } = state; // Accessing user details from state
  const navigate = useNavigate();

  console.log({user})

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    address: user?.address || '',
    city: user?.city || '',
    phoneNumber: user?.phoneNumber || '',
  });

  const [paymentMethod, setPaymentMethod] = useState('Paystack'); // Default to Paystack
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const createOrder = async (orderData) => {
    try {
      // Add order to Firestore
      const docRef = await addDoc(collection(db, 'orders'), orderData);
      console.log('Order placed with ID: ', docRef.id);

      // Clear cart after successful order placement
      dispatch({ type: 'CLEAR_CART' });

      // Show success message
      toast.success('Order placed successfully!');

      // Navigate to orders page
      navigate('/orders');

      // Optional: Provide proof of payment to customer
      // Example: Display order details or send confirmation email
    } catch (error) {
      console.error('Error adding order: ', error);
      toast.error('Error placing order. Please try again.');
    }
  }

  const onSuccess = (reference) => {
    // Prepare order data
    const orderData = {
      userId: user?.uid, // Assuming user object has a UID for identification
      shippingInfo: { ...shippingInfo },
      paymentMethod,
      items: cart.map(item => ({
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
      timestamp: serverTimestamp(),
      paymentReference: reference.reference, // Save Paystack reference
    };

    createOrder(orderData)
  };

  const onClose = () => {
    console.log('Payment closed');
  };

  const config = {
    reference: (new Date()).getTime().toString(),
    email: user?.email || '', // Replace with customer's email
    amount: cart.reduce((acc, item) => acc + item.price * item.quantity, 0) * 100, // Amount in kobo (100 kobo = ₦1)
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Shipping Information</h3>
            <form className="space-y-4">
              {/* Shipping information inputs */}
            </form>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Payment Method</h3>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="paymentMethod"
                  value="Paystack"
                  checked={paymentMethod === 'Paystack'}
                  onChange={handlePaymentChange}
                />
                <span className="ml-2">Paystack</span>
              </label>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-semibold">Order Summary</h3>
            {/* Order summary details */}
          </div>

          <div className="mt-8 flex justify-center">
            <PaystackButton
              {...config}
              text="Pay with Paystack"
              onSuccess={onSuccess}
              onClose={onClose}
              disabled={loading || cart.length === 0}
              className={`bg-indigo-500 text-white py-3 px-6 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ${
                loading || cart.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
