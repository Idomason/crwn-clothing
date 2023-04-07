import {
  CheckoutItemContainer,
  ImageContainer,
  Img,
  Name,
  Quantity,
  Price,
  Arrow,
  Value,
  RemoveButton,
} from './checkout-item.jsx';
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
    <CheckoutItemContainer>
      <ImageContainer>
        <Img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <Name>{name}</Name>
      <Quantity>
        <div onClick={decreaseProductHandler}>&#10094;</div>
        <span>{quantity}</span>
        <div onClick={increaseProductHandler}>&#10095;</div>
      </Quantity>
      <Price>{price}</Price>
      <RemoveButton onClick={removeProductHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
