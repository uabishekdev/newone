export interface Coordinates {
  type: string;
  coordinates: [number, number];
}

export interface DistributionLocation {
  id: string;
  locationName: string;
  locationType: string;
  coordinates: Coordinates;
  mobileNumber?: string;
  days: string[];
  distanceInMiles: number;
  isNearest: boolean;
}

export interface PickupLocation {
  id: string;
  locationType: string;
  coordinates: Coordinates;
  mobileNumber?: string;
  pickupTimings?: string;
  days: string[];
  distanceInMiles: number;
  isNearest: boolean;
  address?: string;
}

export interface PickupResponse {
  data: {
    [day: string]: PickupLocation[];
  };
}

export interface DistributionResponse {
  data: DistributionLocation[];
}