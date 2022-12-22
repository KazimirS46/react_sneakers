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
  orders: `https://63776ba05c477765121d5144.mockapi.io/orders`,
};

function App() {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderID, setOrderID] = useState(null);

  const openCart = () => setModal(true);

  const closeCart = () => {
    setModal(false);
  };

  async function dataRequest() {
    const cartResponse = await axios.get(URL.cart);
    const ordersResponse = await axios.get(URL.orders);
    const favoriteResponse = await axios.get(URL.favorite);
    const productResponse = await axios.get(URL.items);
    setLoading(false);

    setCartProducts(cartResponse.data);
    setOrders(ordersResponse.data);
    setFavorites(favoriteResponse.data);
    setProducts(productResponse.data);
  }

  const addingItemToCart = async (obj) => {
    try {
      if (
        cartProducts.find((product) => Number(product.id) === Number(obj.id))
      ) {
        setCartProducts((prev) =>
          prev.filter((i) => Number(i.id) !== Number(obj.id))
        );
        axios.delete(`${URL.cart}/${obj.id}`);
        console.log(`Удалили из корзины ${(obj.id, obj.name)}`);
      } else {
        const { data } = await axios.post(URL.cart, obj);
        setCartProducts((prev) => [...prev, data]);
        console.log(`Добавили в корзину ${obj.name}`);
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
    }
  };

  const deleteCartProduct = async (id) => {
    try {
      setCartProducts((prev) => prev.filter((item) => item.id !== id));
      await axios.delete(`${URL.cart}/${id}`);
      console.log('Click on Delete Product from Cart');
    } catch (error) {
      alert('Ошибка при удалении из Корзины');
    }
  };

  const addingProductToFavorites = async (obj) => {
    try {
      if (
        favorites.find(
          (favorite) => Number(favorite.productID) === Number(obj.productID)
        )
      ) {
        setFavorites((prev) =>
          prev.filter(
            (item) => Number(item.productID) !== Number(obj.productID)
          )
        );
        axios.delete(`${URL.favorite}/${obj.id}`);
        console.log(`Удалили из Избранного ${(obj.id, obj.name)}`);
      } else {
        const { data } = await axios.post(URL.favorite, obj);
        setFavorites((prev) => [...prev, data]);
        console.log(`Добавили в избранное ${(obj.id, obj.name)}`);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
    }
  };

  useEffect(() => {
    dataRequest();
  }, []);

  const context = {
    URL,
    products,
    cartProducts,
    favorites,
    loading,
    modal,
    orderID,
    orders,
    setCartProducts,
    addingItemToCart,
    addingProductToFavorites,
    deleteCartProduct,
    openCart,
    closeCart,
    setOrderID,
  };

  return (
    <AppContext.Provider value={context}>
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
