// src/store/BookshopContext.jsx
import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
  user: null,
  cart: [],
  books: [],
  orders: [],
  users: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'ADD_TO_CART':
      // Check if the item is already in the cart
      const existingItemIndex = state.cart.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex !== -1) {
        // Item already exists, update quantity
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += 1;
        return { ...state, cart: updatedCart };
      } else {
        // Item does not exist, add it to the cart
        return { ...state, cart: [...state.cart, action.payload] };
      }
    case 'UPDATE_CART_ITEM_QUANTITY':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
    case 'DECREMENT_CART_ITEM':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item
        ).filter((item) => item.quantity > 0), // Remove items with quantity <= 0
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case 'SET_BOOKS':
      return { ...state, books: action.payload };
    case 'SET_ORDERS':
      return { ...state, orders: action.payload };
    case 'SET_USERS':
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

const BookshopContext = createContext();

export const BookshopProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BookshopContext.Provider value={{ state, dispatch }}>
      {children}
    </BookshopContext.Provider>
  );
};

export const useBookshop = () => useContext(BookshopContext);
