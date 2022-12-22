import { useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './EmptyCart.module.scss';

import { cartEmpty, orderBtnLeft } from '../../../assets/svg';
import { AppContext } from '../../../context';

export function EmptyCart() {
  const { closeCart } = useContext(AppContext);

  return (
    <>
      <div className={styles.cartEmpty}>
        <div className={styles.wrapper}>
          <img src={cartEmpty} alt="cart-empty" width={120} height={120} />
          <h3>Корзина пустая</h3>
          <p className={styles.description}>
            Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
          </p>
          <Link to="/" className={`button ${styles.back}`} onClick={closeCart}>
            <img src={orderBtnLeft} alt="Вернуться" /> Вернуться назад
          </Link>
        </div>
      </div>
    </>
  );
}
