import { useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './Favorites.module.scss';

import { AppContext } from '../../context';
import { Product } from '../../components/Products/Product';
import { btnToHome, orderBtnLeft, sadSmile } from '../../assets/svg';

const staticData = {
  mainTitle: 'Мои закладки',
  message: 'Закладок нет :(',
  description: 'Вы ничего не добавляли в закладки',
  buttonText: 'Вернуться назад',
};

export function Favorites() {
  const { favorites, cartProducts } = useContext(AppContext);

  const favoritesList = () => {
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
        <ul className={styles.favoritesCards}>
          {favorites.map((favorite) => (
            <Product
              key={favorite.id}
              product={favorite}
              inFavorites={true}
              inCart={cartProducts.some(
                (i) => Number(i.productID) === Number(favorite.productID)
              )}
            />
          ))}
        </ul>
      </>
    );
  };

  const emptyFavoritesList = () => {
    return (
      <div className={styles.container}>
        <div className={styles.messageContent}>
          <h3>{staticData.message}</h3>
          <img
            className={styles.messageImage}
            src={sadSmile}
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
    <div className={styles.favorites}>
      {favorites.length ? favoritesList() : emptyFavoritesList()}
    </div>
  );
}
