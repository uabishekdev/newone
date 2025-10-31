import { DistributionResponse, PickupResponse, AllLocationsResponse, BaseLocation } from '@/lib/types/location';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL environment variable is not set');
}

async function getLocations<T>(locationType: 'distribution' | 'pickup', search: string = ''): Promise<T> {
  try {
    const url = new URL(`${API_BASE_URL}/invictus/locations`);
    if (search) {
      url.searchParams.append('search', search);
    }
    url.searchParams.append('locationType', locationType);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`Failed to fetch ${locationType} locations: ${response.status}`);
    }

    const responseText = await response.text();
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      throw new Error('Invalid JSON response from server');
    }
    
    return data;
  } catch (error) {
    console.error('Location Service Error:', error);
    throw error;
  }
}

export async function getDistributionLocations(search: string = ''): Promise<DistributionResponse> {
  const response = await getLocations<any>('distribution', search);
  
  let locations: BaseLocation[] = [];
  
  if (response.data) {
    if (Array.isArray(response.data)) {
      locations = response.data.filter((loc: BaseLocation) => loc.locationType !== 'user');
    } else if (typeof response.data === 'object') {
      const allDays = Object.values(response.data);
      locations = (allDays.flat() as BaseLocation[]).filter((loc: BaseLocation) => loc.locationType !== 'user');
    }
  }
  
  return {
    data: locations,
    searchCoordinates: response.searchCoordinates
  };
}

export async function getPickupLocations(search: string = ''): Promise<PickupResponse> {
  return getLocations<PickupResponse>('pickup', search);
}

export async function getAllLocations(search: string = ''): Promise<AllLocationsResponse> {
  const response = await getDistributionLocations(search);
  
  const allLocations = response.data;
  
  const distribution = allLocations.filter(loc => loc.locationType === 'distribution');
  const farm = allLocations.filter(loc => loc.locationType === 'farm');
  
  return {
    distribution: distribution as any,
    farm: farm as any,
    searchCoordinates: response.searchCoordinates,
    allLocations
  };
}