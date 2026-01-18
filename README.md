# PHstore

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Zustand](https://img.shields.io/badge/Zustand-5.0-orange?style=for-the-badge)

**A modern, full-featured e-commerce platform for developer-themed merchandise**

[Features](#features) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started) • [Project Structure](#project-structure) • [API Overview](#api-overview)

</div>

---

## Overview

PHstore is a production-ready e-commerce platform built with cutting-edge web technologies. Designed for selling developer-themed products like t-shirts, hats, and merchandise bundles (kits), it provides a seamless shopping experience with features like real-time cart management, order tracking, and secure payment processing.

## Features

### Shopping Experience
- **Product Catalog** - Browse products with advanced filtering and sorting
- **Category Navigation** - Dynamic category pages with metadata-based filters
- **Product Search** - Real-time search across products and kits
- **Product Bundles (Kits)** - Curated product bundles with special discounts
- **Wishlist** - Save favorite products with persistent likes

### Cart & Checkout
- **Real-time Cart** - Add, remove, and update quantities instantly
- **Shipping Calculator** - ZIP code-based shipping cost calculation
- **Free Shipping** - Automatic free shipping for eligible orders
- **Multiple Addresses** - Save and manage delivery addresses
- **Secure Checkout** - Integrated payment gateway with installment options

### Order Management
- **Order History** - View all past orders with detailed information
- **Order Tracking** - Track order status from pending to delivered
- **Refund Requests** - Request refunds directly from order details
- **Payment Retry** - Retry failed payments without recreating orders

### User Experience
- **Responsive Design** - Mobile-first approach with seamless desktop experience
- **JWT Authentication** - Secure login with token-based sessions
- **Promotional Banners** - Rotating banner carousel for promotions
- **Toast Notifications** - Real-time feedback for user actions
- **Skeleton Loading** - Smooth loading states for better UX
- **Error Boundaries** - Graceful error handling with fallback UI

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS 4 |
| **State Management** | Zustand 5 |
| **HTTP Client** | Axios |
| **Validation** | Zod |
| **Backend** | Django REST API |

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/phstore.git
   cd phstore
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=https://your-api-url.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized production bundle |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint for code quality |

## Project Structure

```
src/
├── app/                      # Next.js App Router
│   └── (site)/               # Main site route group
│       ├── page.tsx          # Homepage
│       ├── product/          # Product detail pages
│       ├── cart/             # Shopping cart
│       ├── categories/       # Category pages
│       ├── kits/             # Product bundles
│       ├── search/           # Search results
│       ├── login/            # Authentication
│       ├── register/         # User registration
│       └── my-orders/        # Order management
│
├── components/               # React components
│   ├── layout/               # Header, footer, navigation
│   ├── product/              # Product cards, details, images
│   ├── cart/                 # Cart items, shipping, checkout
│   ├── categories/           # Category filters
│   ├── kits/                 # Kit displays
│   ├── order/                # Order actions
│   └── ui/                   # Reusable UI components
│
├── store/                    # Zustand state stores
│   ├── auth.ts               # Authentication state
│   ├── cart.ts               # Shopping cart state
│   ├── likes.ts              # Product favorites
│   └── toast.ts              # Notifications
│
├── actions/                  # Next.js server actions
│   ├── login.ts              # User authentication
│   ├── register.ts           # User registration
│   ├── finish-cart.ts        # Checkout processing
│   └── ...                   # Other server actions
│
├── libs/                     # Utility libraries
│   ├── api.ts                # Data fetching functions
│   └── authenticated-fetch.ts # Protected API calls
│
├── hooks/                    # Custom React hooks
│   ├── use-cart-sync.ts      # Cart persistence
│   ├── use-debounce.ts       # Debounced values
│   └── ...                   # Other hooks
│
├── types/                    # TypeScript definitions
├── providers/                # React context providers
├── config/                   # App configuration
└── utils/                    # Helper functions
```

## State Management

PHstore uses **Zustand** for lightweight and efficient state management:

### Auth Store
Manages user authentication state with JWT tokens and session persistence.

```typescript
const { token, setToken, clearToken } = useAuthStore()
```

### Cart Store
Handles shopping cart operations including products, kits, and shipping.

```typescript
const { cart, addItem, removeItem, updateQuantity } = useCartStore()
```

### Likes Store
Manages product wishlist/favorites functionality.

```typescript
const { likes, addLike, removeLike, isLiked } = useLikesStore()
```

## API Overview

The frontend communicates with a Django REST API. Here's an overview of the main endpoints:

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | List products with filters |
| GET | `/product/{id}` | Get product details |
| GET | `/product/{id}/related` | Get related products |

### Categories
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/category/{slug}/metadata` | Get category filters |
| GET | `/products?categorySlug=...` | Filter by category |

### Kits
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/kits` | List all kits |
| GET | `/kit/{id}` | Get kit details |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/cart/finish` | Create order |
| GET | `/orders` | List user orders |
| GET | `/order/{id}` | Get order details |
| POST | `/order/{id}/refund` | Request refund |
| POST | `/order/{id}/retry-payment` | Retry payment |

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/user/login` | User login |
| POST | `/user/register` | User registration |

## Configuration

Key configuration values can be found in `src/config/constants.ts`:

| Setting | Value | Description |
|---------|-------|-------------|
| Banner Rotation | 4000ms | Promotional banner interval |
| Min Search Chars | 2 | Minimum characters for search |
| Cache Revalidation | 60s | API response cache duration |
| Free Shipping Threshold | R$199 | Order value for free shipping |
| Max Installments | 12 | Maximum payment installments |
| Auth Cookie Expiry | 7 days | Authentication cookie lifetime |
| Cart Cookie Expiry | 30 days | Cart persistence duration |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Yes | Backend API base URL |

## Browser Support

PHstore supports all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with Next.js and React**

</div>
