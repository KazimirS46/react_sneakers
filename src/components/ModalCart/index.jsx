import { useContext } from 'react';

import styles from './ModalCart.module.scss';

import { AppContext } from '../../context';
import { ProductList } from './ProductList';
import { EmptyCart } from './EmptyCart';

export function ModalCart() {
  const { cartProducts, closeCart } = useContext(AppContext);

  const staticData = {
    mainTitle: 'Корзина',
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.shopingCart}>
        <h2>{staticData.mainTitle}</h2>
        <button className={styles.closeBtn} onClick={closeCart}></button>
        {cartProducts.length > 0 ? <ProductList /> : <EmptyCart />}
      </div>
    </div>
  );
}
