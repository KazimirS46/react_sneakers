import { useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './Orders.module.scss';

import { AppContext } from '../../context';
import { Product } from '../../components/Products/Product';
import { btnToHome, orderBtnLeft, orderSmile } from '../../assets/svg';

const staticData = {
  mainTitle: 'Мои Заказы',
  message: 'У вас нет заказов :(',
  description: 'Вы нищеброд?  Оформите хотя бы один заказ.',
  buttonText: 'Вернуться назад',
};

export function Orders() {
  const { orders } = useContext(AppContext);

  const ordersList = () => {
    return (
      <>
        <div className={styles.header}>
          <h2>{staticData.mainTitle}</h2>
          <Link to="/">
            <img
              src={btnToHome}
              className={styles.btnToHomeButton}
              alt="Домой"
            />
          </Link>
        </div>
        <ul className={styles.ordersCards}>
          {orders.map((order) => (
            <Product key={order.id} product={order} inFavorites={true} />
          ))}
        </ul>
      </>
    );
  };

  const emptyOrdersList = () => {
    return (
      <div className={styles.container}>
        <div className={styles.messageContent}>
          <h3>{staticData.message}</h3>
          <img
            className={styles.messageImage}
            src={orderSmile}
            alt="Грустный смайлик"
          />
          <p className={styles.description}>{staticData.description}</p>
          <Link to="/" className={`button ${styles.backBtn}`}>
            <img src={orderBtnLeft} alt="Назад" />
            <p>{staticData.buttonText}</p>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.orders}>
      {orders.length ? ordersList() : emptyOrdersList()}
    </div>
  );
}
