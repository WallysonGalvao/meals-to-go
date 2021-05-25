import React from 'react';

import { RestaurantProps } from 'services/restaurants/types';

import CompactRestaurantInfo from 'components/restaurant/compact-restaurant-info.component';

type MapCallout = {
  restaurant: RestaurantProps;
};

const MapCallout = ({ restaurant }: MapCallout): JSX.Element => (
  <CompactRestaurantInfo isMap restaurant={restaurant} />
);

export default MapCallout;
