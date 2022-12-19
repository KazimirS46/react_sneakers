// import { useState } from 'react';
// import axios from 'axios';

import styles from './ModalCart.module.scss';
import { orderBtnArrow, cartEmpty, orderBtnLeft } from '../../assets/svg';
import { AppContext } from '../../context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

// нужно сделать компонент карточки товара в корзине

export function ModalCart(props) {
  const { cartProducts, deleteCartProduct, placeAnOrder } =
    useContext(AppContext);

  return (
    <div className={styles.overlay}>
      <div className={styles.shopingCart}>
        {cartProducts.length > 0 ? (
          <>
            <h2>Корзина</h2>
            <button
              className={styles.closeBtn}
              onClick={props.closeModal}
            ></button>
            <ul className={styles.productCards}>
              {cartProducts.map((cartProduct) => (
                <li key={cartProduct.productID} className={styles.productCard}>
                  <img
                    src={cartProduct.imageURL}
                    alt="Sneackers"
                    width={70}
                    height={70}
                  />
                  <div className={styles.description}>
                    <p>{cartProduct.name}</p>
                    <b>{cartProduct.price} руб.</b>
                  </div>
                  <button
                    className={styles.closeProduct}
                    onClick={() => deleteCartProduct(cartProduct.id)}
                  ></button>
                </li>
              ))}
            </ul>
            <div className={styles.cartTotal}>
              <ul>
                <li>
                  <span>Итого: </span>
                  <div></div>
                  <b>21 498 руб. </b>
                </li>
                <li>
                  <span>Налог 5%: </span>
                  <div></div>
                  <b>1074 руб. </b>
                </li>
              </ul>
              <button
                className={`button ${styles.orderBtn}`}
                onClick={placeAnOrder}
              >
                Оформить заказ <img src={orderBtnArrow} alt="place an order" />
              </button>
            </div>
          </>
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
