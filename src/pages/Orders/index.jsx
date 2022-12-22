import { useState, /*useContext,*/ useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import styles from './Orders.module.scss';

import { Product } from '../../components/Products/Product';
import { btnToHome, orderBtnLeft, orderSmile } from '../../assets/svg';
// import { AppContext } from '../../context';
import { LoadingProduct } from '../../components/Products/LoadingProduct';

const staticData = {
  mainTitle: 'Мои Заказы',
  message: 'У вас нет заказов :(',
  description: 'Вы нищеброд?  Оформите хотя бы один заказ.',
  buttonText: 'Вернуться назад',
};

export function Orders() {
  // const { URL } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const orderRequest = async () => {
    try {
      const { data } = await axios.get(
        `https://63776ba05c477765121d5144.mockapi.io/orders`
      );
      setOrders(data.map((i) => i.items).flat());
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert('Ошибка при загрузке заказов');
    }
  };

  useEffect(() => {
    orderRequest();
  }, []);

  const fakeArray = [
    { ida: 1 },
    { ida: 2 },
    { ida: 3 },
    { ida: 4 },
    { ida: 5 },
    { ida: 6 },
    { ida: 7 },
    { ida: 8 },
    { ida: 9 },
    { ida: 10 },
    { ida: 11 },
    { ida: 12 },
  ];

  const fake = () => {
    return fakeArray.map((item) => (
      <LoadingProduct key={item.ida} isLoading={loading} />
    ));
  };

  const emptyOrdersList = () => {
    return (
      <li className={styles.container}>
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
      </li>
    );
  };

  const ordersList = () => {
    return (
      <>
        {orders.length > 0
          ? orders.map((order, index) => (
              <Product
                key={index}
                product={order}
                inFavorites={true}
                inCart={true}
                isLoading={loading}
              />
            ))
          : emptyOrdersList()}
      </>
    );
  };

  return (
    <div className={styles.orders}>
      <div className={styles.header}>
        <h2>{staticData.mainTitle}</h2>
        <Link to="/">
          <img src={btnToHome} className={styles.btnToHomeButton} alt="Домой" />
        </Link>
      </div>
      <ul className={styles.ordersCards}>{loading ? fake() : ordersList()}</ul>
    </div>
  );
}
