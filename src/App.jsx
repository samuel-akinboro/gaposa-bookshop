// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BookDetails from './pages/BookDetails';
import AddBook from './pages/AddBook';
import Users from './pages/Users';
import { BookshopProvider } from './store/BookshopContext';
import Landing from './pages/Landing';
import AdminRoute from './components/AdminRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminBooks from './pages/AdminBooks';
import EditBook from './pages/EditBook';
import Checkout from './pages/Checkout'; // Import the Checkout page component
import OrderManagement from './pages/OrderManagement';
import UserOrder from './pages/UserOrder';

const App = () => {
  return (
    <BookshopProvider>
      <Router>
        <ToastContainer autoClose={1000} />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} /> {/* Add this route */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/book/:id" element={<BookDetails />} />
              <Route path="/admin/add-book" element={<AdminRoute><AddBook /></AdminRoute>} />
              <Route path="/admin/orders" element={<AdminRoute><OrderManagement /></AdminRoute>} />
              <Route path="/admin/users" element={<AdminRoute><Users /></AdminRoute>} />
              <Route path="/admin/books" element={<AdminRoute><AdminBooks /></AdminRoute>} />
              <Route path="/admin/edit-book/:id" element={<AdminRoute><EditBook /></AdminRoute>} />
              <Route path="/orders" element={<UserOrder />} /> 
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </BookshopProvider>
  );
};

export default App;
