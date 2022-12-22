import { useState, useContext } from 'react';
import axios from 'axios';

import styles from './ModalCart.module.scss';

import { AppContext } from '../../context';
import { ProductList } from './ProductList';
import { EmptyCart } from './EmptyCart';

const staticData = {
  mainTitle: 'Корзина',
};

export function ModalCart() {
  console.log('Render ModalCart');
  const { URL, cartProducts, setCartProducts, closeCart } =
    useContext(AppContext);

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  const placeAnOrder = async () => {
    try {
      setLoading(true);
      console.log('Click on Place An Order');
      const { data } = await axios.post(URL.orders, { items: cartProducts });
      setOrderPlaced(true);
      setCartProducts([]);
    } catch (error) {
      console.error(error);
      alert('Ошибка при добавлении в Orders');
    } finally {
      setLoading(false);
      console.log('погнали нахуй');
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.shopingCart}>
        <h2>{staticData.mainTitle}</h2>
        <button className={styles.closeBtn} onClick={closeCart}></button>
        {cartProducts.length > 0 ? (
          <ProductList order={placeAnOrder} loading={loading} />
        ) : (
          <EmptyCart complete={orderPlaced} />
        )}
      </div>
    </div>
  );
}
