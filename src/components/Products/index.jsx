import { useState, useContext } from 'react';
import { AppContext, SearchContext } from '../../context';

import styles from './Products.module.scss';

import { Product } from './Product';
import { Search } from './Search';
import { LoadingProduct } from './LoadingProduct';

export function Products() {
  console.log('Render Products');
  const { products, cartProducts, loading, favorites } = useContext(AppContext);
  const [searchValue, setSearchValue] = useState('');

  console.log(cartProducts);

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const clearField = () => setSearchValue('');

  const fakeArray = [
    { ida: 1 },
    { ida: 2 },
    { ida: 3 },
    { ida: 4 },
    { ida: 5 },
    { ida: 6 },
    { ida: 7 },
    { ida: 8 },
    { ida: 9 },
    { ida: 10 },
    { ida: 11 },
    { ida: 12 },
  ];

  const fake = () => {
    return fakeArray.map((item) => (
      <LoadingProduct key={item.ida} isLoading={loading} />
    ));
  };

  const renderCards = () => {
    return products
      .filter((productItem) =>
        productItem.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map((product) => (
        <Product
          key={product.productID}
          product={product}
          inFavorites={favorites.some(
            (i) => Number(i.productID) === Number(product.productID)
          )}
          inCart={cartProducts.some(
            (i) => Number(i.productID) === Number(product.productID)
          )}
          isLoading={loading}
        />
      ));
  };

  return (
    <div className={styles.productsContainer}>
      <SearchContext.Provider
        value={{ searchValue, onChangeSearchInput, clearField }}
      >
        <Search />
        <ul className={styles.products}>{loading ? fake() : renderCards()}</ul>
      </SearchContext.Provider>
    </div>
  );
}
