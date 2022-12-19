import { useContext } from 'react';

import styles from './Search.module.scss';

import { inputLens, cartClose } from '../../../assets/svg';
import { SearchContext } from '../../../context';

export function Search() {
  const { searchValue, clearField, onChangeSearchInput } =
    useContext(SearchContext);

  return (
    <div className={styles.searchWrapper}>
      <h2>
        {searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}
      </h2>
      <div className={styles.searchBlock}>
        <img src={inputLens} alt="Поиск" width={15} height={15} />
        {searchValue && (
          <img
            src={cartClose}
            alt="Close"
            className={styles.btnClose}
            onClick={clearField}
          />
        )}
        <input
          onChange={onChangeSearchInput}
          type="text"
          placeholder="Поиск..."
          value={searchValue}
        />
      </div>
    </div>
  );
}
