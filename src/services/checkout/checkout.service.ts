import createStripe from 'stripe-client';

const stripe = createStripe('');

const cardTokenRequest = async card => stripe.createToken({ card });

export default cardTokenRequest;
