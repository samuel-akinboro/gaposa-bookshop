// AdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useBookshop } from '../store/BookshopContext';

const AdminRoute = ({ children }) => {
  const { state } = useBookshop();

  if (!state.user || state.user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute;
