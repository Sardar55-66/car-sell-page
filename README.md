# Car Listing Application

A Next.js application for displaying car listings with sorting and pagination functionality.

## Features

- Display car listings with images and details
- Sort cars by price (ascending/descending)
- Pagination with 12 items per page
- Responsive design for all screen sizes
- URL-based state management for sorting and pagination

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- React Hooks for state management

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## API

The application uses the following API endpoint:
- Base URL: `https://testing-api.ru-rating.ru/cars`
- Parameters:
  - `_limit`: Number of items per page (default: 12)
  - `_page`: Page number
  - `_sort`: Field to sort by (price)
  - `_order`: Sort order (asc/desc)

## Deployment

The application can be deployed to Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy the application

## License

MIT
