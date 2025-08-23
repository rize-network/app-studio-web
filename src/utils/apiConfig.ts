import { OpenAPI } from 'src/services/api';
import { API_URL } from 'src/configs/AppConfig';

/**
 * Initialize OpenAPI configuration
 * This sets up the base URL and other configuration for the generated API service
 */
export function initializeApiConfig() {
  // Set the base URL for all API requests
  OpenAPI.BASE = API_URL;

  // Enable CORS for cross-origin requests
  OpenAPI.CORS = 'cors';

  // Set credentials to include for authentication
  OpenAPI.WITH_CREDENTIALS = false;
  OpenAPI.CREDENTIALS = 'same-origin';

  console.log('OpenAPI configuration initialized:', {
    BASE: OpenAPI.BASE,
    CORS: OpenAPI.CORS,
    WITH_CREDENTIALS: OpenAPI.WITH_CREDENTIALS,
    CREDENTIALS: OpenAPI.CREDENTIALS,
  });
}

/**
 * Set authentication token for API requests
 */
export function setApiToken(token: string) {
  OpenAPI.TOKEN = token;
  console.log('API token set:', token ? 'Token configured' : 'Token cleared');
}

/**
 * Clear authentication token
 */
export function clearApiToken() {
  OpenAPI.TOKEN = undefined;
  console.log('API token cleared');
}

/**
 * Get current API configuration
 */
export function getApiConfig() {
  return {
    BASE: OpenAPI.BASE,
    TOKEN: OpenAPI.TOKEN,
    CORS: OpenAPI.CORS,
    WITH_CREDENTIALS: OpenAPI.WITH_CREDENTIALS,
    CREDENTIALS: OpenAPI.CREDENTIALS,
    HEADERS: OpenAPI.HEADERS,
  };
}
