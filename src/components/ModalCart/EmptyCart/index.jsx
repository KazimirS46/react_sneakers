import { useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './EmptyCart.module.scss';

import { cartEmpty, orderPlaced, orderBtnLeft } from '../../../assets/svg';
import { AppContext } from '../../../context';

export function EmptyCart({ complete }) {
  const staticDataEmpty = {
    title: 'Корзина пустая',
    description: 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.',
    buttonTitle: 'Вернуться назад',
  };

  const staticDataOrder = {
    title: 'Заказ оформлен!',
    description: `Ваш заказ скоро будет передан курьерской доставке`,
    buttonTitle: 'Вернуться назад',
  };

  const { closeCart } = useContext(AppContext);

  return (
    <>
      <div className={styles.cartEmpty}>
        <div className={styles.wrapper}>
          <img
            src={complete ? orderPlaced : cartEmpty}
            alt="cart-empty"
            width={120}
            height={120}
          />
          <h3>{(complete ? staticDataOrder : staticDataEmpty).title}</h3>
          <p className={styles.description}>
            {(complete ? staticDataOrder : staticDataEmpty).description}
          </p>
          <Link to="/" className={`button ${styles.back}`} onClick={closeCart}>
            <img src={orderBtnLeft} alt="Вернуться" />{' '}
            {staticDataEmpty.buttonTitle}
          </Link>
        </div>
      </div>
    </>
  );
}
