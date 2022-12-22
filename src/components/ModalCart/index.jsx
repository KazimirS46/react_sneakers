import { useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './ModalCart.module.scss';

import { cartEmpty, orderBtnLeft } from '../../assets/svg';
import { AppContext } from '../../context';
import { ProductList } from './ProductList';

// нужно сделать компонент карточки товара в корзине

export function ModalCart(props) {
  const { cartProducts } = useContext(AppContext);

  return (
    <div className={styles.overlay}>
      <div className={styles.shopingCart}>
        {cartProducts.length > 0 ? (
          <ProductList closeModal={props.closeModal} />
        ) : (
          <>
            <h2>Корзина</h2>
            <button
              className={styles.closeBtn}
              onClick={props.closeModal}
            ></button>
            <div className={styles.cartEmpty}>
              <div className={styles.wrapper}>
                <img
                  src={cartEmpty}
                  alt="cart-empty"
                  width={120}
                  height={120}
                />
                <h3>Корзина пустая</h3>
                <p className={styles.description}>
                  Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
                </p>
                <Link
                  to="/"
                  className={`button ${styles.back}`}
                  onClick={props.closeModal}
                >
                  <img src={orderBtnLeft} alt="Вернуться" /> Вернуться назад
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
