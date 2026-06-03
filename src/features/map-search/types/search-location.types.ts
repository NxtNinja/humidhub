export type SearchLocationResponse = {
  type: string;
  features: SearchLocation[];
};

export type SearchLocation = {
  type: string;

  properties: {
    osm_type: string;
    osm_id: number;
    osm_key: string;
    osm_value: string;

    type: string;
    name: string;

    county?: string;
    district?: string;
    city?: string;
    state?: string;

    country: string;
    postcode?: string;
    countrycode: string;

    street?: string;
  };

  geometry: {
    type: string;

    coordinates: [longitude: number, latitude: number];
  };
};
