export interface LocationRequest {
  placeName: string;
  x: number;
  y: number;
}

export interface LocationResponse {
  status: number;
  data: number; // placeId
}

export interface Marker {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
  address: string;
}
