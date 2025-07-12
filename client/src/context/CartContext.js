import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
  
    case 'ADD': {
      const { id, variant } = action.payload;
      const idx = state.findIndex(
        item => item.id === id && item.variant === variant
      );
      if (idx !== -1) {
        const newState = [...state];
        newState[idx].qty += action.payload.qty;
        return newState;
      }
      return [...state, action.payload];           
    }


    case 'UPDATE_QTY': {
      return state.map(item =>
        item.id === action.id && item.variant === action.variant
          ? { ...item, qty: Math.max(1, action.qty) }
          : item
      );
    }

    case 'UPDATE_VARIANT':{
  return state.map(item =>
    item.id === action.id && item.variant === action.oldVariant
      ? { ...item, variant: action.newVariant }
      : item
  );
}

    case 'REMOVE':
      return state.filter(
        item => !(item.id === action.id && item.variant === action.variant)
      );

    case 'CLEAR':
      return [];
    default:
      return state;
  }
};



const getInitial = () => {
  const stored = localStorage.getItem('velvetMuse_cart');
  return stored ? JSON.parse(stored) : [];
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(reducer, [], getInitial);

  useEffect(() => {
    localStorage.setItem('velvetMuse_cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
