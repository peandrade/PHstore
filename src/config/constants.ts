/**
 * Application-wide constants
 * Centralized location for magic numbers and configuration values
 */

// Timing constants (in milliseconds)
export const TIMING = {
  BANNER_ROTATION_INTERVAL: 4000,
  PROMO_BANNER_ROTATION: 4000,
  PROMO_BANNER_ANIMATION: 300,
  SEARCH_DEBOUNCE: 300,
  MODAL_CLOSE_DELAY: 200,
} as const;

// Search configuration
export const SEARCH = {
  MIN_CHARS: 2,
  RESULT_LIMIT: 5,
} as const;

// Address/CEP configuration
export const ADDRESS = {
  CEP_LENGTH: 8,
  CEP_HYPHEN_POSITION: 5,
} as const;

// Cache configuration (in seconds)
export const CACHE = {
  REVALIDATE_SECONDS: 60,
} as const;

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  DEFAULT_PAGE: 1,
} as const;

// Cookie configuration (in seconds)
export const COOKIE = {
  AUTH_MAX_AGE: 60 * 60 * 24 * 7, // 7 days
  CART_MAX_AGE: 60 * 60 * 24 * 30, // 30 days
} as const;

// Payment configuration
export const PAYMENT = {
  MAX_INSTALLMENTS: 12,
  MIN_INSTALLMENT_VALUE: 10, // R$ 10.00
} as const;

// Shipping configuration
export const SHIPPING = {
  FREE_SHIPPING_THRESHOLD: 199.0, // R$ 199.00
  FREE_SHIPPING_REGIONS: ["NE"], // Nordeste
} as const;

// Image placeholder
export const IMAGES = {
  PLACEHOLDER_PATH: "/placeholder.png",
} as const;
