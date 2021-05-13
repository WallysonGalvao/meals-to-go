import React from 'react';
import { LiteCreditCardInput } from 'react-native-credit-card-input';

import cardTokenRequest from 'services/checkout/checkout.service';

type CreditCardInputProps = {
  name: string;
};

type FormDataProps = {
  status: 'valid' | 'invalid' | 'incomplete';
  values: {
    number: string;
    expiry: string;
    cvc: string;
  };
};

export const CreditCardInput = ({
  name = '',
}: CreditCardInputProps): JSX.Element => {
  const onChange = async (formData: FormDataProps) => {
    const { values, status } = formData;
    const isIncomplete = Object.values(status).includes('incomplete');
    const expiry = values.expiry.split('/');

    const card = {
      number: values.number,
      exp_month: expiry[0],
      exp_year: expiry[1],
      cvc: values.cvc,
      name,
    };
    const info = await cardTokenRequest(card);
    console.log(info);
  };
  return <LiteCreditCardInput onChange={onChange} />;
};
