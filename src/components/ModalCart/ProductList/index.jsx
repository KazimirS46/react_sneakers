import { useContext } from 'react';
import axios from 'axios';

import styles from './ProductList.module.scss';

import { orderBtnArrow } from '../../../assets/svg';
import { AppContext } from '../../../context';

// нужно сделать компонент карточки товара в корзине

export function ProductList() {
  console.log('Render ProductList');

  const staticData = {
    mainTitle: 'Корзина',
    footerTitle: 'Итого:',
    cartAmount: `${'21 498'} руб.`,
    cartTax: 'Налог 5%: ',
    amountTax: `${'1074'} руб. `,
    buttonTitle: 'Оформить заказ ',
  };
  const {
    URL,
    cartProducts,
    setCartProducts,
    deleteCartProduct,
    setOrderPlaced,
    orderID,
    setOrderID,
  } = useContext(AppContext);

  const placeAnOrder = async () => {
    try {
      console.log('Click on Place An Order');
      const { data } = await axios.post(URL.orders, { cartProducts });
      console.log(data.id);
      setOrderID(data.id);
      console.log(orderID);
      setOrderPlaced(true);
      setCartProducts([]);
    } catch (error) {
      console.error(error);
      alert('Ошибка при добавлении в Orders');
    } finally {
      console.log('погнали нахуй');
    }
  };

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
        <button className={`button ${styles.orderBtn}`} onClick={placeAnOrder}>
          {staticData.buttonTitle}
          <img src={orderBtnArrow} alt="place an order" />
        </button>
      </div>
    </>
  );
}
