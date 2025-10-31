import { DistributionResponse, PickupResponse } from '@/lib/types/location';

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

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to fetch ${locationType} locations`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getDistributionLocations(search: string = ''): Promise<DistributionResponse> {
  return getLocations<DistributionResponse>('distribution', search);
}

export async function getPickupLocations(search: string = ''): Promise<PickupResponse> {
  return getLocations<PickupResponse>('pickup', search);
}