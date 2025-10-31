export interface Coordinates {
  type: string;
  coordinates: [number, number];
}

export interface BaseLocation {
  id: string;
  locationName?: string;
  locationType: 'distribution' | 'pickup' | 'farm' | 'user';
  coordinates: Coordinates;
  address?: string;
  mobileNumber?: string;
  pickupTimings?: string;
  days: string[];
  distanceInMiles: number;
  isNearest: boolean;
}

export interface DistributionLocation extends BaseLocation {
  locationName: string;
  locationType: 'distribution' | 'farm';
}

export interface PickupLocation extends BaseLocation {
  locationType: 'pickup';
  address?: string;
  pickupTimings?: string;
}

export interface PickupResponse {
  data: {
    [day: string]: PickupLocation[];
  };
  searchCoordinates?: Coordinates;
}

export interface DistributionResponse {
  data: BaseLocation[];
  searchCoordinates?: Coordinates;
}

export interface AllLocationsResponse {
  distribution: DistributionLocation[];
  farm: DistributionLocation[];
  searchCoordinates?: Coordinates;
  allLocations: BaseLocation[];
}