import { useState, useContext } from 'react';
import { AppContext, SearchContext } from '../../context';

import styles from './Products.module.scss';

import { Product } from './Product';
import { Search } from './Search';

export function Products() {
  const { products } = useContext(AppContext);
  const [searchValue, setSearchValue] = useState('');

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const clearField = () => setSearchValue('');

  return (
    <div className={styles.productsContainer}>
      <SearchContext.Provider
        value={{ searchValue, onChangeSearchInput, clearField }}
      >
        <Search />
        <ul className={styles.products}>
          {products
            .filter((productItem) =>
              productItem.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((product) => (
              <Product key={product.productID} product={product} />
            ))}
        </ul>
      </SearchContext.Provider>
    </div>
  );
}
