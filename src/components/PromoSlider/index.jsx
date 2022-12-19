import styles from './sliderPromo.module.scss';
import { slideLogotype, sliderImage } from '../../assets/jpg';

export function PromoSlider() {
  return (
    <div className={styles.promo}>
      <div className="container">
        <div className={styles.slider}>
          <div>
            <ul className={styles.sliderList}>
              <li className={styles.sliderSlide}>
                <div className="content">
                  <img
                    src={slideLogotype}
                    alt="sponsors"
                    className={styles.sponsors}
                  />
                  <h2 className={styles.title}>
                    <span>Stan Smith</span>, Forever!
                  </h2>
                  <a href="/" className={`button ${styles.sliderBuyButton}`}>
                    Купить
                  </a>
                </div>
                <img src={sliderImage} alt="promoPhoto" />
              </li>
            </ul>
          </div>
          <button className={styles.prew}>Prew</button>
          <button className={styles.next}>Next</button>
        </div>
      </div>
    </div>
  );
}
