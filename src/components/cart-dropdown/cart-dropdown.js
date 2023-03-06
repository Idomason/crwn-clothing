import './cart-dropdown.scss';
import Button from '../button/button';

const CartDropdown = () => {
  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items' />
      <Button>CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
