import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import { AppContext } from './context.js';

import { HomePage } from './pages/Home';
import { Orders } from './pages/Orders/index.jsx';
import { Favorites } from './pages/Favorites/index.jsx';
import { NotFoundPage } from './pages/NotFoundPage';
import { Layout } from './components/Layout';

const URL = {
  items: `https://63776ba05c477765121d5144.mockapi.io/items`,
  cart: `https://63776ba05c477765121d5144.mockapi.io/cart`,
  favorite: `https://63776ba05c477765121d5144.mockapi.io/favorite`,
};

function App() {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const placeAnOrder = () => console.log('Click on Place An Order');

  useEffect(() => {
    axios.get(URL.items).then(({ data }) => setProducts(data));
    axios.get(URL.cart).then(({ data }) => setCartProducts(data));
    axios.get(URL.favorite).then(({ data }) => setFavorites(data));
  }, []);

  const addingItemToCart = async (obj) => {
    try {
      const { data } = await axios.post(URL.cart, obj);
      setCartProducts((prev) => [...prev, data]);
      console.log(`Added in cart ${obj.name}`);
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
    }
  };

  const deleteCartProduct = async (id) => {
    try {
      await axios.delete(`${URL.cart}/${id}`);
      setCartProducts((prev) => prev.filter((item) => item.id !== id));
      console.log('Click on Delete Product');
    } catch (error) {
      alert('Ошибка при удалении из Корзины');
    }
  };

  const addingProductToFavorites = async (obj) => {
    try {
      if (favorites.find((favorite) => favorite.id === obj.id)) {
        axios.delete(`${URL.favorite}/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
        console.log(`Deleted in Favorites ${obj.name}`);
      } else {
        const { data } = await axios.post(URL.favorite, obj);
        setFavorites((prev) => [...prev, data]);
        console.log(`Added in Favorites ${obj.name}`);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
    }
  };

  return (
    <AppContext.Provider
      value={{
        products,
        cartProducts,
        favorites,
        setCartProducts,
        addingItemToCart,
        addingProductToFavorites,
        deleteCartProduct,
        placeAnOrder,
      }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="orders" element={<Orders />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
