export type EarthquakeResponse = {
  type: string;

  metadata: {
    generated: number;
    url: string;
    title: string;
    status: number;
    api: string;
    limit: number;
    offset: number;
  };

  features: Earthquake[];

  bbox: number[];
};

export type Earthquake = {
  type: string;

  properties: {
    mag: number;
    place: string;
    time: number;
    updated: number;

    tz: number | null;

    url: string;
    detail: string;

    felt?: number | null;
    cdi?: number | null;
    mmi?: number | null;

    alert: string | null;

    status: string;

    tsunami: number;

    sig: number;

    net: string;
    code: string;

    ids: string;
    sources: string;
    types: string;

    nst: number;

    dmin?: number;

    rms: number;
    gap: number;

    magType: string;

    type: string;
    title: string;
  };

  geometry: {
    type: string;

    coordinates: [longitude: number, latitude: number, depth: number];
  };

  id: string;
};
