# Implementation Notes

## Component and state approach

- The App Router separates the inventory (`/products`), add form
  (`/products/new`), details (`/products/[id]`), and edit form
  (`/products/[id]/edit`).
- The root layout mounts `Providers`, a client-side React context that owns the
  product array, initial loading, request errors, and add/update actions.
- The product list and forms are Client Components because they use hooks,
  browser events, and client-side navigation. Dynamic route page files read
  Next.js 16's promised `params` on the server and pass the ID to a client
  component that reads the shared product context.
- `ProductForm` is shared by add and edit pages. It validates each required
  field before saving, leaves entered values in place on validation errors,
  and shows field-level messages.
- Search, category, and status are combined in one filter predicate. Price
  sorting is applied to a copied result array, so it does not mutate context
  state.
- `GET /api/products` serves the local mock catalog. The context loads it once
  and offers retry behavior. The UI's **Test request error** button exercises
  the failed-request message and retry path without external services.

## Key decisions

- Kept the data source local and state in React context to stay within the
  assignment's scope; edits and additions are intentionally lost on refresh.
- Used regular CSS and a small shared form component instead of introducing
  extra libraries.
- Used a local generic product thumbnail so the UI does not depend on an
  external image service.
- The request-error state is intentionally reproducible through a labeled
  control on the inventory screen.

## Time spent

Not independently tracked. Record your actual development time before
submission; do not treat the assistant session's elapsed time as your effort.

## Known limitations

- Product changes exist only in client state and reset to the 15 seeded mock
  products after refresh.
- Product images are a shared placeholder rather than product-specific photos.
- The mock API is intentionally small and does not implement persistence,
  authentication, or a separate backend.
- Desktop and mobile screenshots still need to be captured from the final
  running version and added to `screenshots/`.

## AI-use disclosure

GitHub Copilot (AI assistant using Copilot SDK in VS Code) helped implement and
review the route structure, mock API/context loading, product list and
filtering, shared validated form, details/edit flows, responsive styling, and
this documentation. The affected files include `app/`, `components/`,
`data/`, `types/`, `public/product-placeholder.svg`, `README.md`, and this
file. The output was checked with ESLint, a production build/type-check, and
browser verification of the routes and flows. The developer should review and
be prepared to explain all submitted code independently.
