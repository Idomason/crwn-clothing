import { createContext, useState } from 'react';
import PRODUCTS from '../shop-data.json';

// Actual value you want access
export const ProductContext = createContext({
  products: [],
});

// Actual component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
