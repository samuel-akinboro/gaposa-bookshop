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
      return { ...state, cart: [...state.cart, action.payload] };
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
