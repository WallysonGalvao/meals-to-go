import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { List, Divider } from 'react-native-paper';

import { useCart } from 'services/cart/cart.context';
import { payRequest } from 'services/checkout/checkout.service';

import SafeArea from 'components/utility/safe-area.components';
import Spacer from 'components/spacer/spacer.component';
import Text from 'components/typography/text.component';
import RestaurantInfoCard from 'features/restaurants/components/restaurant-info-card.component';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'infrastructure/navigation/checkout.navigator';
import { CreditCardInput } from '../components/credit-card.component';

import * as S from '../components/checkout.styles';

type CheckoutScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Checkout'
>;

type CheckoutScreenProps = {
  navigation: CheckoutScreenNavigationProp;
};

const CheckoutScreen = ({ navigation }: CheckoutScreenProps): JSX.Element => {
  const { cart, restaurant, sum, clearCart } = useCart();

  const [name, setName] = useState('');
  const [card, setCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onPay = useCallback(() => {
    setIsLoading(true);
    if (!card || !card.id) {
      setIsLoading(false);
      navigation.navigate('CheckoutError', {
        error: 'Please fill in a valid credit card',
      });
      return;
    }
    payRequest(card.id, sum, name)
      .then(() => {
        setIsLoading(false);
        clearCart();
        navigation.navigate('CheckoutSuccess');
      })
      .catch(err => {
        setIsLoading(false);
        navigation.navigate('CheckoutError', {
          error: err,
        });
      });
  }, [card, name, navigation, clearCart, sum]);

  useEffect(() => {
    onPay();
  }, [onPay]);

  if (!cart.length || !restaurant) {
    return (
      <SafeArea>
        <S.CartIconContainer>
          <S.CartIcon icon="cart-off" />
          <Text>Your cart is empty!</Text>
        </S.CartIconContainer>
      </SafeArea>
    );
  }

  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />
      {isLoading && <S.PaymentProcessing />}
      <ScrollView>
        <Spacer position="left" size="medium">
          <Spacer position="top" size="large">
            <Text>Your Order</Text>
          </Spacer>
          <List.Section>
            {cart.map(({ item, price }, index) => {
              return (
                <List.Item
                  key={String(item + index)}
                  title={`${item} - ${price / 100}`}
                />
              );
            })}
          </List.Section>
          <Text>Total: {sum / 100}</Text>
        </Spacer>
        <Spacer position="top" size="large" />
        <Divider />
        <S.NameInput label="Name" value={name} onChangeText={setName} />

        <Spacer position="top" size="large">
          {name.length > 0 && (
            <CreditCardInput
              name={name}
              onSuccess={setCard}
              onError={() =>
                navigation.navigate('CheckoutError', {
                  error: 'Something went wrong processing your credit card',
                })
              }
            />
          )}
        </Spacer>

        <Spacer position="top" size="xxl" />

        <S.PayButton
          disabled={isLoading}
          icon="cash-usd"
          mode="contained"
          onPress={onPay}
        >
          Pay
        </S.PayButton>
        <Spacer position="top" size="large">
          <S.ClearButton
            disabled={isLoading}
            icon="cart-off"
            mode="contained"
            onPress={clearCart}
          >
            Clear Cart
          </S.ClearButton>
        </Spacer>
      </ScrollView>
    </SafeArea>
  );
};

export default CheckoutScreen;
