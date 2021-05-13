import React from 'react';

import SafeArea from 'components/utility/safe-area.components';

import { CreditCardInput } from '../components/credit-card.component';

const CheckoutScreen = (): JSX.Element => (
  <SafeArea>
    <CreditCardInput name="" />
  </SafeArea>
);

export default CheckoutScreen;
