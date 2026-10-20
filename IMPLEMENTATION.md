# Implementation Notes

## 1. Project Overview

This project is a Product Management Dashboard built with Next.js, React, and TypeScript. It was developed to demonstrate product management functionality, reusable components, client-side interactions, form validation, and responsive design.

## 2. Component and Route Structure

The application uses the Next.js App Router to organize its pages.

- `/products` displays the product listing and provides access to search, filters, sorting, and product management actions.
- `/products/[id]` displays details for an individual product based on its ID.

Reusable components are used where appropriate to keep the code organized and reduce duplication. Product-related types, data, and helper functions are organized according to the project structure.


## 3. State Management and Data Flow

Product data is managed in a React context (ProductsProvider) and shared across the app with a custom useProducts hook. The context loads the initial product list from GET /api/products; additions and edits update client-side React state. Changes are temporary and reset to the seeded data when the page is refreshed. The product list is used to display products and determine which products match the current search, filter, and sorting selections.

Search, category filtering, status filtering, and price sorting work together to determine the displayed results.

Adding or editing a product updates the application state so the interface reflects the saved changes. Product changes are not required to persist after a page refresh.

## 4. Form Validation

The product form supports adding and editing products.

Validation rules include:

- Name, category, and status must be provided.
- Price must be greater than zero.
- Stock must be a non-negative whole number.

Clear validation messages help users correct invalid inputs before saving. Existing form values are preserved when validation fails.

## 5. Routing and Error Handling

The product details page uses the dynamic route parameter to identify the selected product.

The application handles invalid product IDs by displaying a useful message. It also provides feedback for empty search results. While products are loading, the app displays a loading message. If the request fails, it shows an error message and a Retry button so the user can try loading the products again. The product list includes a control to simulate a request failure for demonstration.

## 6. Responsive Design and Accessibility

The interface was checked at desktop, tablet, and mobile screen sizes using browser developer tools.

The application uses labeled form inputs, clear navigation, and visible focus indicators. Layout adjustments were made as needed to keep controls and product information usable on smaller screens.

## 7. Key Technical Decisions

- Used Next.js App Router for page and dynamic route organization.
- Used TypeScript to define and validate data shapes at development time.
- Used React state and derived results to keep product interactions predictable.
- Used a lightweight data approach appropriate for the scope of the assessment.
- Avoided adding a database or external state-management library because neither was required.

## 8. Testing and Verification

The following functionality was tested manually:

- Displaying the initial product list.
- Searching by product name.
- Combining category and status filters with sorting.
- Adding and editing products.
- Validating required fields, price, and stock.
- Viewing product details and handling invalid IDs.
- Checking loading, request-error, and empty-result states.
- Testing the layout at different screen sizes.


## 9. Time Spent

Total development time: Approximately 6–7 hours (about 360–420 minutes).

Estimated time by area:
- Project setup, routing, and application structure: 50 minutes
- Product types, mock API, and shared state: 60 minutes
- Product listing, search, filters, and sorting: 80 minutes
- Add/edit form and validation: 75 minutes
- Product details and unknown-ID handling: 45 minutes
- Responsive styling and usability states: 65 minutes
- Testing, documentation, and final review: 45 minutes

These are approximate allocations. The total was around seven hours, slightly above the recommended four-to-six-hour time budget.

## 10. Known Issues and Limitations

- Product changes are held in application state and are not guaranteed to persist after refreshing the page.
- No database or authentication system is included, as neither was required.

## 11. AI Use Disclosure

GitHub Copilot in VS Code was used during development to help troubleshoot errors, explain parts of the code, and suggest ways to improve the implementation. I reviewed its suggestions and checked them against the application. I manually tested the product listing, forms, filtering, sorting, routing, and validation.

The submitted code and implementation decisions are my responsibility. I am prepared to explain how the application works and discuss its limitations during the code walkthrough.
