export const TIMING = {
  BANNER_ROTATION_INTERVAL: 4000,
  PROMO_BANNER_ROTATION: 4000,
  PROMO_BANNER_ANIMATION: 300,
  SEARCH_DEBOUNCE: 300,
  MODAL_CLOSE_DELAY: 200,
} as const;

export const SEARCH = {
  MIN_CHARS: 2,
  RESULT_LIMIT: 5,
} as const;

export const ADDRESS = {
  CEP_LENGTH: 8,
  CEP_HYPHEN_POSITION: 5,
} as const;

export const CACHE = {
  REVALIDATE_SECONDS: 60,
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  DEFAULT_PAGE: 1,
} as const;

export const COOKIE = {
  AUTH_MAX_AGE: 60 * 60 * 24 * 7,
  CART_MAX_AGE: 60 * 60 * 24 * 30,
} as const;

export const PAYMENT = {
  MAX_INSTALLMENTS: 12,
  MIN_INSTALLMENT_VALUE: 10,
} as const;

export const SHIPPING = {
  FREE_SHIPPING_THRESHOLD: 199.0,
  FREE_SHIPPING_REGIONS: ["NE"],
} as const;

export const IMAGES = {
  PLACEHOLDER_PATH: "/placeholder.png",
} as const;
