import { useContext } from 'react';

import styles from './ModalCart.module.scss';

import { AppContext } from '../../context';
import { ProductList } from './ProductList';
import { EmptyCart } from './EmptyCart';

const staticData = {
  mainTitle: 'Корзина',
};

export function ModalCart() {
  console.log('Render ModalCart');

  const { cartProducts, closeCart, orderPlaced } = useContext(AppContext);

  return (
    <div className={styles.overlay}>
      <div className={styles.shopingCart}>
        <h2>{staticData.mainTitle}</h2>
        <button className={styles.closeBtn} onClick={closeCart}></button>
        {cartProducts.length > 0 ? (
          <ProductList />
        ) : (
          <EmptyCart complete={orderPlaced} />
        )}
      </div>
    </div>
  );
}
