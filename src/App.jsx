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
import Orders from './pages/Orders';
import Users from './pages/Users';
import { BookshopProvider } from './store/BookshopContext';
import Landing from './pages/Landing';

const App = () => {
  return (
    <BookshopProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/book/:id" element={<BookDetails />} />
              <Route path="/admin/add-book" element={<AddBook />} />
              <Route path="/admin/orders" element={<Orders />} />
              <Route path="/admin/users" element={<Users />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </BookshopProvider>
  );
};

export default App;
