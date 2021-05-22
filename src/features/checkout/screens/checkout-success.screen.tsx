import React from 'react';

import Text from 'components/typography/text.component';
import SafeArea from 'components/utility/safe-area.components';
import { CartIconContainer, CartIcon } from '../components/checkout.styles';

export const CheckoutSuccessScreen = (): JSX.Element => (
  <SafeArea>
    <CartIconContainer>
      <CartIcon icon="check-bold" />
      <Text variant="label">Success!</Text>
    </CartIconContainer>
  </SafeArea>
);
