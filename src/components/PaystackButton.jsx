// PaystackButton.jsx

import React from 'react';
import PaystackButton from 'react-paystack/dist/react-paystack'; // Adjust path as necessary
import PaystackConfig from '../paystackConfig'; // Adjust path as necessary

const PaystackPaymentButton = ({ amount, email, onSuccess, onClose }) => {
  const publicKey = PaystackConfig.publicKey;

  const componentProps = {
    email,
    amount: amount * 100, // Paystack amount is in kobo (multiply by 100 for naira)
    publicKey,
    text: 'Pay Now',
    onSuccess,
    onClose,
  };

  return <PaystackButton {...componentProps} />;
};

export default PaystackPaymentButton;
