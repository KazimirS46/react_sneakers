import { useState, useContext } from 'react';
import ContentLoader from 'react-content-loader';

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
  inFavorites = false,
  inCart = false,
  isLoading = false,
}) {
  const {
    // cartProducts,
    // favorites,
    addingItemToCart,
    addingProductToFavorites,
  } = useContext(AppContext);

  // const inFavorites = favorites.find((i) => i.productID === product.productID);
  // const inCart = cartProducts.find((i) => i.productID === product.productID);

  const [isAddedCart, setIsAdded] = useState(inCart);
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
        {isLoading ? (
          <ContentLoader
            speed={2}
            width={150}
            height={187}
            viewBox="0 0 150 187"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="10" ry="10" width="150" height="91" />
            <rect x="0" y="107" rx="3" ry="3" width="150" height="15" />
            <rect x="0" y="126" rx="3" ry="3" width="93" height="15" />
            <rect x="0" y="163" rx="8" ry="8" width="80" height="24" />
            <rect x="118" y="155" rx="8" ry="8" width="32" height="32" />
          </ContentLoader>
        ) : (
          <>
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
            <h3>{product.name}</h3>
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
          </>
        )}
      </div>
    </li>
  );
}
