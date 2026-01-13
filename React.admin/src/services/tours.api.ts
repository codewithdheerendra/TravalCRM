import { apiGet, apiPost, apiPut, apiDelete, ApiResponse } from './api';
import { API_ENDPOINTS } from '@/lib/api.config';

/**
 * Tour data types matching the backend model
 */

export interface TripDate {
  Year: string;
  Month: string;
  dates: string;
}

export interface DepartureCityPrice {
  transferType: string;
  adultPrice: number;
  childPrice: number;
}

export interface DepartureCity {
  State: string;
  City: string;
  tripDuration: string;
  dates: TripDate[];
  price: DepartureCityPrice[];
  availableSlots: string;
  partialPayment: string;
  bookingCutoffDays: string;
}

export interface ItineraryItem {
  day: string;
  header: string;
  description: string;
}

export interface Tour {
  _id: string;
  name: string;
  state: string;
  imageurl?: string;
  bannerimages?: string[];
  isActive: boolean;
  destinations: string;
  route: string;
  days: string;
  price: number;
  about: string;
  tripType: string;
  altitude: string;
  bestSession: string[];
  tripCategories: string[];
  bestMonthToVisit: string[];
  travelerType: string[];
  deptcities: DepartureCity[];
  trip_dates: TripDate[];
  activities: string;
  itinerary: ItineraryItem[];
  things_to_carry: string;
  includenexclude: string;
  package_cost: string;
  infonfaq: string;
  bookncancel: string;
  guidelines: string;
  upcomingtrip: Date[];
  imageUrlAll: string[];
  youtubeUrl: string;
  documentUrl: string;
  displayOrder: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Tour list query parameters
 */
export interface GetToursParams {
  searchValue?: string;
  filterValue?: string | Record<string, any>;
  page?: number;
  limit?: number;
  sortByLatestUpdate?: boolean;
}

/**
 * Tours API Service
 */

/**
 * Get all tours with optional filtering and pagination
 */
export async function getTours(
  params?: GetToursParams
): Promise<ApiResponse<Tour[]>> {
  const queryParams: Record<string, any> = {};

  if (params?.searchValue) {
    queryParams.searchValue = params.searchValue;
  }

  if (params?.filterValue) {
    queryParams.filterValue =
      typeof params.filterValue === 'string'
        ? params.filterValue
        : JSON.stringify(params.filterValue);
  }

  if (params?.page) {
    queryParams.page = params.page;
  }

  if (params?.limit) {
    queryParams.limit = params.limit;
  }

  if (params?.sortByLatestUpdate !== undefined) {
    queryParams.sortByLatestUpdate = params.sortByLatestUpdate.toString();
  }

  return apiGet<Tour[]>(API_ENDPOINTS.tours.list, queryParams);
}

/**
 * Get a single tour by ID
 */
export async function getTourById(id: string): Promise<ApiResponse<Tour>> {
  return apiGet<Tour>(API_ENDPOINTS.tours.detail(id));
}

/**
 * Create a new tour
 */
export async function createTour(
  tourData: Partial<Tour>
): Promise<ApiResponse<Tour>> {
  return apiPost<Tour>(API_ENDPOINTS.tours.create, tourData);
}

/**
 * Update an existing tour
 */
export async function updateTour(
  id: string,
  tourData: Partial<Tour>
): Promise<ApiResponse<Tour>> {
  return apiPut<Tour>(API_ENDPOINTS.tours.update(id), tourData);
}

/**
 * Delete a tour (soft delete)
 */
export async function deleteTour(id: string): Promise<ApiResponse<void>> {
  return apiDelete<void>(API_ENDPOINTS.tours.delete(id));
}

/**
 * Transform backend Tour to frontend TourItem format
 * Helper function to convert API response to UI format
 */
export function tourToTourItem(tour: Tour, baseImageUrl?: string): {
  title: string;
  image: string;
  subtitle: string;
  address: string;
  price: number;
  duration: string;
  isDrafted: boolean;
  uniqueId: string;
} {
  // Build image URL
  let imageUrl = '/images/default_img.jpg';
  if (tour.imageurl) {
    if (tour.imageurl.startsWith('http')) {
      imageUrl = tour.imageurl;
    } else if (baseImageUrl) {
      imageUrl = `${baseImageUrl}${tour.imageurl}`;
    } else {
      imageUrl = tour.imageurl;
    }
  }

  // Get first departure city for address
  const firstCity =
    tour.deptcities && tour.deptcities.length > 0
      ? `${tour.deptcities[0].City}, ${tour.deptcities[0].State}`
      : tour.state;

  // Get price from package_cost or price field
  const priceValue = tour.package_cost
    ? parseInt(tour.package_cost.replace(/[₹,]/g, '')) || tour.price || 0
    : tour.price || 0;

  return {
    title: tour.name,
    image: imageUrl,
    subtitle: tour.destinations || tour.about || '',
    address: firstCity,
    price: priceValue,
    duration: tour.days || 'N/A',
    isDrafted: !tour.isActive,
    uniqueId: tour._id,
  };
}

