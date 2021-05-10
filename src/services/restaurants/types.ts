export type MockProps = {
  html_attributions: Array<[]>;
  next_page_token: string;
  results: Array<{
    business_status: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
      viewport: {
        northeast: {
          lat: number;
          lng: number;
        };
        southwest: {
          lat: number;
          lng: number;
        };
      };
    };
    icon?: string;
    ix?: string;
    name: string;
    opening_hours: {
      open_now: boolean;
    };
    photos: string[];
    place_id: string;
    plus_code: {
      compound_code: string;
      global_code: string;
    };
    price_level: number;
    rating: number;
    reference: string;
    scope: string;
    types: string[];
    user_ratings_total: number;
    vicinity: string;
  }>;
  status: string;
};

export type RestaurantProps = {
  businessStatus: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
    viewport: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
  };
  icon?: string;
  ix?: string;
  name: string;
  openingHours: {
    openNow: boolean;
  };
  photos: string[];
  placeId: string;
  plusCode: {
    compoundCode: string;
    globalCode: string;
  };
  priceLevel: number;
  rating: number;
  reference: string;
  scope: string;
  types: string[];
  userRatingsTotal: number;
  address: string;
  isOpenNow: boolean;
  isClosedTemporarily: boolean;
};
