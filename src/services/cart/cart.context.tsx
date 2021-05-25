import React, { createContext, useState, useContext, useEffect } from 'react';

import { RestaurantProps } from 'services/restaurants/types';
import { useAuth } from 'services/authentication/authentication.context';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Cart = { id: string; item: string; price: number };

type CartContextData = {
  addToCart: (item: Cart, rst: RestaurantProps) => void;
  clearCart: () => void;
  saveCart: (rst: RestaurantProps, crt: Cart, uid: string) => Promise<void>;
  loadCart: (uid: string) => Promise<void>;
  restaurant: RestaurantProps;
  cart: Cart[];
  sum: number;
};

type Props = {
  children: React.ReactNode;
};

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartContextProvider = ({ children }: Props): JSX.Element => {
  const { user } = useAuth();

  const [cart, setCart] = useState<Cart[]>([]);
  const [sum, setSum] = useState(0);
  const [restaurant, setRestaurant] = useState<RestaurantProps>(
    {} as RestaurantProps,
  );

  const saveCart = async (
    rst: RestaurantProps,
    crt: Cart,
    uid: string,
  ): Promise<void> => {
    try {
      const jsonValue = JSON.stringify({ restaurant: rst, cart: crt });
      await AsyncStorage.setItem(`@cart-${uid}`, jsonValue);
    } catch (e) {
      console.log('error storing', e);
    }
  };

  const loadCart = async (uid: string): Promise<void> => {
    try {
      const value = await AsyncStorage.getItem(`@cart-${uid}`);
      if (value !== null) {
        const { restaurant: rst, cart: crt } = JSON.parse(value);
        setRestaurant(rst);
        setCart(crt);
      }
    } catch (e) {
      console.log('error storing', e);
    }
  };

  const add = (item: Cart, rst: RestaurantProps) => {
    if (!restaurant || restaurant.placeId !== rst.placeId) {
      setRestaurant(rst);
      setCart([item]);
    } else {
      setCart([...cart, item]);
    }
  };

  const clear = () => {
    setCart([]);
    setRestaurant({} as RestaurantProps);
  };

  useEffect(() => {
    if (user && user.uid) {
      loadCart(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.uid) {
      saveCart(restaurant, cart, user.uid);
    }
  }, [restaurant, cart, user]);

  useEffect(() => {
    if (!cart.length) {
      setSum(0);
      return;
    }
    const newSum = cart.reduce((acc, { price }) => (acc += price), 0);
    setSum(newSum);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        addToCart: add,
        clearCart: clear,
        saveCart,
        loadCart,
        restaurant,
        cart,
        sum,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  if (!context) throw new Error('useCart must be used within an CartProvider');

  return context;
}
