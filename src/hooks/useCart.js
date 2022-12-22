import { useContext } from 'react';
import { AppContext } from '../context';

export const useCart = () => {
  const { cartProducts, setCartProducts } = useContext(AppContext);
  const totalPrice = cartProducts.reduce((sum, obj) => obj.price + sum, 0);

  return { cartProducts, setCartProducts, totalPrice };
};
