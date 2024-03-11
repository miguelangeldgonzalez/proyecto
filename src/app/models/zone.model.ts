/**
 * @description Base interface for state, municipality and borough
 */
interface GeoLocation {
  id: number;
  name: string;
}

export interface State extends GeoLocation {
  municipalities: Municipality[];
}

export interface Municipality extends GeoLocation {
  boroughs: Borough[];
}

export interface Borough extends GeoLocation {}
