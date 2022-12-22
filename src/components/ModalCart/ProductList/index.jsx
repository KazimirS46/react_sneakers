import { useContext } from 'react';

import styles from './ProductList.module.scss';

import { orderBtnArrow } from '../../../assets/svg';
import { AppContext } from '../../../context';

// нужно сделать компонент карточки товара в корзине

export function ProductList({ order, loading }) {
  console.log('Render ProductList');

  const staticData = {
    mainTitle: 'Корзина',
    footerTitle: 'Итого:',
    cartAmount: `${'21 498'} руб.`,
    cartTax: 'Налог 5%: ',
    amountTax: `${'1074'} руб. `,
    buttonTitle: 'Оформить заказ ',
  };
  const { cartProducts, deleteCartProduct } = useContext(AppContext);

  return (
    <>
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
            <span>{staticData.footerTitle}</span>
            <div></div>
            <b>{staticData.cartAmount}</b>
          </li>
          <li>
            <span>{staticData.cartTax}</span>
            <div></div>
            <b>{staticData.amountTax}</b>
          </li>
        </ul>
        <button
          onClick={order}
          className={`button ${styles.orderBtn}`}
          disabled={loading}
        >
          {staticData.buttonTitle}
          <img src={orderBtnArrow} alt="place an order" />
        </button>
      </div>
    </>
  );
}
