import { useState, useContext } from 'react';
import { AppContext, SearchContext } from '../../context';

import styles from './Products.module.scss';

import { Product } from './Product';
import { Search } from './Search';

export function Products() {
  const { products, cartProducts, loading, favorites } = useContext(AppContext);
  const [searchValue, setSearchValue] = useState('');

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const clearField = () => setSearchValue('');

  const renderItems = () => {
    return (
      loading
        ? [...Array(10)].map((product, index) => (
            <Product
              key={index}
              product={product}
              // inFavorites={favorites.find((i) => i.productID === product.productID)}
              // inCart={cartProducts.find((i) => i.productID === product.productID)}
              isLoading={loading}
            />
          ))
        : products.filter((productItem) =>
            productItem.name.toLowerCase().includes(searchValue.toLowerCase())
          )
    ).map((product) => (
      <Product
        key={product.productID}
        product={product}
        inFavorites={favorites.find((i) => i.productID === product.productID)}
        inCart={cartProducts.find((i) => i.productID === product.productID)}
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
        <ul className={styles.products}>
          {renderItems()}
          {/* {products
            .filter((productItem) =>
              productItem.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((product) => (
              <Product
                key={product.productID}
                product={product}
                inFavorites={favorites.find(
                  (i) => i.productID === product.productID
                )}
                inCart={cartProducts.find(
                  (i) => i.productID === product.productID
                )}
                isLoading={loading}
              />
            ))} */}
        </ul>
      </SearchContext.Provider>
    </div>
  );
}
