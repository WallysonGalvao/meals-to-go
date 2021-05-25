import createStripe from 'stripe-client';
import { host } from 'utils/env';

const stripe = createStripe('');

export const cardTokenRequest = async (card): Promise<string> =>
  stripe.createToken({ card });

export const payRequest = async (
  token: string,
  amount: number,
  name: string,
): Promise<any> => {
  const res = await fetch(`${host}/pay`, {
    body: JSON.stringify({
      token,
      name,
      amount,
    }),
    method: 'POST',
  });
  if (res.status > 200) {
    // return Promise.reject();
    throw new Error("'something went wrong processing your payment'");
  }
  return res.json();
};
