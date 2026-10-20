# Product Management Dashboard

A responsive product inventory dashboard built with Next.js App Router, React,
and TypeScript. The app demonstrates product search, combined filters, sorting,
and client-side add/edit/detail flows using a local mock API.

## Prerequisites

- Node.js 20 or later
- npm

## Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root route redirects
to `/products`.

To create an optimized production build:

```bash
npm run build
npm start
```

## Data source

The seeded mock catalog is in `data/products.ts` and is returned by
`GET /api/products` from `app/api/products/route.ts`. Additions and edits are
stored in React context in the browser; refreshing resets the catalog to the
seed data. No database or external product API is used.

The **Test request error** button in the product list deliberately requests a
failing mock response. Use **Retry** to load the catalog again.

## Libraries

- Next.js App Router
- React
- TypeScript
- Regular CSS (no component library or external state-management library)

## Screenshots

Add current screenshots of the running app here before submission:

- Desktop: `screenshots/products-desktop.png`
- Mobile: `screenshots/products-mobile.png`

## Project routes

- `/products` — searchable and filterable product inventory
- `/products/new` — validated add form
- `/products/[id]` — product details, with a useful unknown-ID message
- `/products/[id]/edit` — validated edit form

See [IMPLEMENTATION.md](./IMPLEMENTATION.md) for implementation decisions,
known limitations, and AI-use disclosure.
