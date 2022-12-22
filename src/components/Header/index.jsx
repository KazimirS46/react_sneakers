import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { ModalCart } from '../ModalCart';
import { mainLogo } from '../../assets/png';
import {
  headerCartBtn,
  headerFavoriteBtn,
  headerUserBtn,
} from '../../assets/svg';

import styles from './Header.module.scss';
import { AppContext } from '../../context';

export function Header() {
  const { openCart, modal } = useContext(AppContext);

  return (
    <>
      <header>
        <nav>
          <Link to="/">
            <div className={styles.logoWrapper}>
              <img src={mainLogo} alt="logo" width={40} height={40} />
              <div>
                <h1>REACT SNEAKERS</h1>
                <p>Магазин лучших кроссовок</p>
              </div>
            </div>
          </Link>

          <ul>
            <li className={styles.cartWrapper} onClick={openCart}>
              <a href="#!">
                <img
                  src={headerCartBtn}
                  alt="Cart link"
                  className={styles.cartLinkImg}
                />
                <p>1205 руб.</p>
              </a>
            </li>
            <li>
              <Link to="/favorites" className={styles.favoriteLink}>
                <img src={headerFavoriteBtn} alt="Favorite link" />
              </Link>
            </li>
            <li>
              <Link to="/user" className={styles.userLink}>
                <img src={headerUserBtn} alt="User Link" />
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {modal && <ModalCart />}
    </>
  );
}
