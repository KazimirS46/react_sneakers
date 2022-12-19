import { useContext } from 'react';
import { AppContext } from '../../context';

import styles from './Favorites.module.scss';

import { Product } from '../../components/Products/Product';

export function Favorites() {
  const { favorites } = useContext(AppContext);
  return (
    <div className={styles.favorites}>
      <h2>Favorites</h2>
      <ul className={styles.favoritesCards}>
        {favorites.map((favorite) => (
          <Product key={favorite.id} product={favorite} favorited={true} />
        ))}
      </ul>
    </div>
  );
}
