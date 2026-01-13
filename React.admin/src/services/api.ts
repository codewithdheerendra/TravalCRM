import { API_BASE_URL } from '@/lib/api.config';

/**
 * API Response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * API Error class
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Request options
 */
interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | null | undefined>;
}

/**
 * API Client
 * Reusable fetch wrapper with error handling and JSON parsing
 */
export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { params, ...fetchOptions } = options;

  // Build URL with query parameters
  let url = `${API_BASE_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  // Set default headers
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    // Parse JSON response
    const data: ApiResponse<T> = await response.json();

    // Handle non-OK responses
    if (!response.ok) {
      throw new ApiError(
        data.message || data.error || `HTTP error! status: ${response.status}`,
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    // Handle network errors or JSON parsing errors
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiError(
        'Network error: Unable to connect to the server',
        0,
        error
      );
    }

    throw new ApiError(
      error instanceof Error ? error.message : 'An unknown error occurred',
      0,
      error
    );
  }
}

/**
 * GET request helper
 */
export async function apiGet<T>(
  endpoint: string,
  params?: Record<string, string | number | boolean | null | undefined>
): Promise<ApiResponse<T>> {
  return apiClient<T>(endpoint, {
    method: 'GET',
    params,
  });
}

/**
 * POST request helper
 */
export async function apiPost<T>(
  endpoint: string,
  body?: any
): Promise<ApiResponse<T>> {
  return apiClient<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

/**
 * PUT request helper
 */
export async function apiPut<T>(
  endpoint: string,
  body?: any
): Promise<ApiResponse<T>> {
  return apiClient<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

/**
 * DELETE request helper
 */
export async function apiDelete<T>(
  endpoint: string
): Promise<ApiResponse<T>> {
  return apiClient<T>(endpoint, {
    method: 'DELETE',
  });
}

