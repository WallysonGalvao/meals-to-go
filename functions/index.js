/* eslint-disable @typescript-eslint/no-var-requires */
const functions = require('firebase-functions');
// const { Client } = require('@googlemaps/google-maps-services-js');
const { geocodeRequest } = require('./geocode');
const { placesRequest } = require('./places');

// const client = new Client({});

exports.geocode = functions.https.onRequest((request, response) => {
  geocodeRequest(request, response);
  // geocodeRequest(request, response, client);
});

exports.placesNearby = functions.https.onRequest((request, response) => {
  placesRequest(request, response);
  // placesRequest(request, response, client);
});
