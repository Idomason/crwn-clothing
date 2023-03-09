import './checkout-item.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart-context';

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const { removeItemFromCheckout, addItemToCart, removeItemFromCart } =
    useContext(CartContext);

  // Remove product from checkout
  const removeProductHandler = () => removeItemFromCheckout(cartItem);
  // Increase Item on checkout page
  const increaseProductHandler = () => addItemToCart(cartItem);
  // Decrease Item on checkout page
  const decreaseProductHandler = () => removeItemFromCart(cartItem);

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className='arrow' onClick={decreaseProductHandler}>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={increaseProductHandler}>
          &#10095;
        </div>
      </span>
      <span className='price'>{price}</span>
      <div className='remove-button' onClick={removeProductHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
