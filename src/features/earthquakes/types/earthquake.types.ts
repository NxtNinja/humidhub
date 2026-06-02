export type Earthquake = {
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
  features: Array<{
    type: string;
    properties: {
      mag: number;
      place: string;
      time: number;
      updated: number;
      tz: any;
      url: string;
      detail: string;
      felt?: number;
      cdi?: number;
      mmi?: number;
      alert: any;
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
      coordinates: Array<number>;
    };
    id: string;
  }>;
  bbox: Array<number>;
};
