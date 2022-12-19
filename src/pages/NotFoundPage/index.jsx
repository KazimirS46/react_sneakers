import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export function NotFoundPage() {
  return (
    <div className={styles.error}>
      <h2 className={styles.mainTitle}>Старница не найдена</h2>
      <button className={`button ${styles.button}`}>
        <Link to="/" className={styles.homeLink}>
          На главную
        </Link>
      </button>
    </div>
  );
}
