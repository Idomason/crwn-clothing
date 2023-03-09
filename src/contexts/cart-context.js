import { createContext, useState, useEffect } from 'react';

// Add item to cart
const addCartItem = (cartItems, productToAdd) => {
  // check if cartItems contains productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  // If found increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // Return new array with modified cartItems or new cartItems
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// Remove item from cart
const removeCartItem = (cartItems, cartItemToRemove) => {
  // Find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // Check if the quantity is equal to 1, if yes, remove that item from cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id != cartItemToRemove.id);
  }
  // Return back cart items with matching cart item with reduced quantities
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

// Remove item from checkout
const removeCheckoutItem = (cartItems, removeItemFromCheckout) => {
  // Find the checkout item to remove
  const existingCheckoutItem = cartItems.find(
    (cartItem) => cartItem.id === removeItemFromCheckout.id
  );

  // Check if the quantity is equal to 1, if yes, remove that item from checkout
  if (existingCheckoutItem) {
    return cartItems.filter(
      (cartItem) => cartItem.id != removeItemFromCheckout.id
    );
  }

  // Return cart items
  return cartItems;
};

export const CartContext = createContext({
  cartCount: 0,
  cartItems: [],
  isCartOpen: false,
  setIsCartOpen: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  removeItemFromCheckout: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [checkoutTotal, setCheckoutTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (acc, cartItem) => acc + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCheckoutTotal = cartItems.reduce(
      (acc, current) => acc + current.quantity * current.price,
      0
    );
    setCheckoutTotal(newCheckoutTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const removeItemFromCheckout = (checkoutItemToRemove) => {
    setCartItems(removeCheckoutItem(cartItems, checkoutItemToRemove));
  };

  const value = {
    cartItems,
    cartCount,
    isCartOpen,
    checkoutTotal,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    removeItemFromCheckout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
