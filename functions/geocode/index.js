/* eslint-disable @typescript-eslint/no-var-requires */
const url = require('url');
// const functions = require('firebase-functions');

const { locations: locationsMock } = require('./geocode.mock');

module.exports.geocodeRequest = (request, response) => {
  const { city } = url.parse(request.url, true).query;
  const locationMock = locationsMock[city.toLowerCase()];

  response.json(locationMock);
};

/* module.exports.geocodeRequest = (request, response, client) => {
  const { city, mock } = url.parse(request.url, true).query;
  if (mock === 'true') {
    const locationMock = locationsMock[city.toLowerCase()];
    return response.json(locationMock);
  }

  client
    .geocode({
      params: {
        address: city,
        key: functions.config().google.key,
      },
      timeout: 1000,
    })
    .then(res => {
      return response.json(res.data);
    })
    .catch(e => {
      response.status(400);
      return response.send(e.response.data.error_message);
    });
}; */
