import './checkout.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart-context';
import CheckoutItem from '../../components/checkout-item/checkout-item';

const Checkout = () => {
  const { cartItems, checkoutTotal } = useContext(CartContext);

  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>Products</span>
        </div>
        <div className='header-block'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span>
        </div>
      </div>

      {cartItems.length > 0 ? (
        cartItems.map((cartItem) => (
          <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        ))
      ) : (
        <h2>Sorry No Item in the cart</h2>
      )}

      <span className='total'>Total: ${checkoutTotal}</span>
    </div>
  );
};

export default Checkout;
