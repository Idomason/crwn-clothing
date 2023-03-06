import { useContext } from 'react';
import { ProductContext } from '../../contexts/product-context';
import ProductCard from '../../components/product-card/product-card';
import './shop.scss';

const Shop = () => {
  const { products } = useContext(ProductContext);
  return (
    <div className='products-container'>
      {products.map((product) => (
        <div key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default Shop;
