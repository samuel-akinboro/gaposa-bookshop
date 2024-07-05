import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useBookshop } from '../store/BookshopContext';
import { auth } from '../firebase';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { state, dispatch } = useBookshop();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (confirmed) {
      try {
        await signOut(auth);
        dispatch({ type: 'SET_USER', payload: null });
        toast.success('Logged out successfully.');
        navigate('/login');
      } catch (error) {
        toast.error('Failed to log out. Please try again.');
      }
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-white text-xl font-bold">GAPOSA Bookshop</Link>
        <div>
          <ul className="flex space-x-4">
            {state.user ? (
              <>
                <li><Link to="/catalog" className="text-white hover:text-gray-300">Book Catalog</Link></li>
                <li><Link to="/cart" className="text-white hover:text-gray-300">Cart</Link></li>
                <li><button onClick={handleLogout} className="text-white hover:text-gray-300">Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/" className="text-white hover:text-gray-300">Home</Link></li>
                <li><Link to="/login" className="text-white hover:text-gray-300">Login</Link></li>
                <li><Link to="/signup" className="text-white hover:text-gray-300">Signup</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
