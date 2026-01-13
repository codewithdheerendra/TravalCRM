/**
 * API Configuration
 * Centralized configuration for API base URL and endpoints
 */

/**
 * Get the API base URL from environment variable or default to local development
 */
export const getApiBaseUrl = (): string => {
  // In Next.js, environment variables prefixed with NEXT_PUBLIC_ are available on the client
  if (typeof window !== 'undefined') {
    // Client-side: use environment variable or default
    return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
  }
  
  // Server-side: use environment variable or default
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
};

/**
 * API base URL
 */
export const API_BASE_URL = getApiBaseUrl();

/**
 * API version prefix
 */
export const API_VERSION = 'v1';

/**
 * Admin API base path
 */
export const ADMIN_API_BASE = `/api/${API_VERSION}/admin`;

/**
 * Full admin API base URL
 */
export const ADMIN_API_URL = `${API_BASE_URL}${ADMIN_API_BASE}`;

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  tours: {
    list: `${ADMIN_API_BASE}/tours`,
    detail: (id: string) => `${ADMIN_API_BASE}/tours/${id}`,
    create: `${ADMIN_API_BASE}/tours`,
    update: (id: string) => `${ADMIN_API_BASE}/tours/${id}`,
    delete: (id: string) => `${ADMIN_API_BASE}/tours/${id}`,
  },
} as const;

