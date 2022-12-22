import { useContext } from 'react';

import styles from './ProductList.module.scss';

import { orderBtnArrow } from '../../../assets/svg';
import { AppContext } from '../../../context';

export function ProductList(props) {
  const { cartProducts, deleteCartProduct, placeAnOrder } =
    useContext(AppContext);

  return (
    <>
      <h2>Корзина</h2>
      <button className={styles.closeBtn} onClick={props.closeModal}></button>
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
        <button className={`button ${styles.orderBtn}`} onClick={placeAnOrder}>
          Оформить заказ <img src={orderBtnArrow} alt="place an order" />
        </button>
      </div>
    </>
  );
}
