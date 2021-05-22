/* eslint-disable @typescript-eslint/no-var-requires */
const functions = require('firebase-functions');
// const { Client } = require('@googlemaps/google-maps-services-js');
// const stripeClient = require('stripe')(functions.config().stripe.key);

const { geocodeRequest } = require('./geocode');
const { placesRequest } = require('./places');
const { payRequest } = require('./pay');

// const googleClient = new Client({});

exports.geocode = functions.https.onRequest((request, response) => {
  geocodeRequest(request, response);
  // geocodeRequest(request, response, googleClient);
});

exports.placesNearby = functions.https.onRequest((request, response) => {
  placesRequest(request, response);
  // placesRequest(request, response, googleClient);
});

exports.pay = functions.https.onRequest((request, response) => {
  // payRequest(request, response, stripeClient);
  payRequest(request, response);
});
