import { useState, useContext } from 'react';

import styles from './Product.module.scss';

import {
  favoriteAdded,
  favoriteNotAdded,
  cartAdded,
  cartNotAdded,
} from '../../../assets/svg';
import { AppContext } from '../../../context';

export function Product({
  product,
  inFavorites = false /*inCart = false*/,
  isAdded = false,
}) {
  const { addingItemToCart, addingProductToFavorites } = useContext(AppContext);

  const [isAddedCart, setIsAdded] = useState(isAdded);
  const [isAddedFavorites, setIsAddedFavorites] = useState(inFavorites);

  const addToFavorite = () => {
    setIsAddedFavorites((prev) => !prev);
    addingProductToFavorites(product);
  };

  const addToCart = () => {
    setIsAdded((prev) => !prev);
    addingItemToCart(product);
  };

  return (
    <li className={styles.product}>
      <div className={styles.cardWrapper}>
        <button className={styles.favoritesAdd} onClick={addToFavorite}>
          <img
            src={isAddedFavorites ? favoriteAdded : favoriteNotAdded}
            alt="Add to favorite"
            width={32}
            height={32}
          />
        </button>
        <img
          src={product.imageURL}
          alt="Sneakers"
          width={133}
          height={112}
          className={styles.sneakers}
        />
        <h4>{product.name}</h4>
        <div>
          <div className={styles.price}>
            <p>Цена:</p>
            <b>{product.price} руб.</b>
          </div>
          <button className={styles.cartAdd} onClick={addToCart}>
            <img
              className={styles.addToCart}
              src={isAddedCart ? cartAdded : cartNotAdded}
              alt="Add to cart"
              width={32}
              height={32}
            />
          </button>
        </div>
      </div>
    </li>
  );
}
