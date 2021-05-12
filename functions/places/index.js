/* eslint-disable @typescript-eslint/no-var-requires */
const url = require('url');
// const functions = require('firebase-functions');

const { mocks, addMockImage } = require('./mock');

module.exports.placesRequest = (request, response) => {
  const { location } = url.parse(request.url, true).query;
  const data = mocks[location];
  if (data) {
    data.results = data.results.map(addMockImage);
  }

  response.json(data);
};

/* const addGoogleImage = restaurant => {
  const restaurantCopy = restaurant;
  const ref = restaurant.photos[0].photo_reference;
  if (!ref) {
    restaurantCopy.photos = [
      'https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg',
    ];
    return restaurant;
  }
  restaurantCopy.photos = [
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${
      functions.config().google.key
    }`,
  ];
  return restaurantCopy;
};

module.exports.placesRequest = (request, response, client) => {
  const { location, mock } = url.parse(request.url, true).query;
  if (mock === 'true') {
    const data = mocks[location];
    if (data) {
      data.results = data.results.map(addMockImage);
    }

    return response.json(data);
  }
  return client
    .placesNearby({
      params: {
        location,
        radius: 1500,
        type: 'restaurant',
        key: functions.config().google.key,
      },
      timeout: 1000,
    })
    .then(res => {
      res.data.results = res.data.results.map(addGoogleImage);
      return response.json(res.data);
    })
    .catch(e => {
      response.status(400);
      return response.send(e.response.data.error_message);
    });
}; */
