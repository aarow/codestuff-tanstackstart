This is a TanStack Start React-based developer portfolio site with TypeScript and Markdown content for easy content updates. The application uses React components, server components, and client components as part of the Tanstack Router architecture. Please follow these guidelines when contributing:

## Code Standards

### Required Before Each Commit
- Run `npm run lint` to ensure code follows project standards
- Make sure all components follow TanStack Router patterns
- Client components should be marked with 'use client' when they use browser APIs or React hooks
- When adding new functionality, make sure you update the README
- Make sure that the repository structure documentation is correct and accurate in the Copilot Instructions file
- Ensure all tests pass by running `npm run test` in the terminal

### TypeScript and React Patterns
- Use TypeScript interfaces/types for all props and data structures
- Follow React best practices (hooks, functional components)
- Use proper state management techniques
- Components should be modular and follow single-responsibility principle

### Styling
- You must prioritize using Tailwind CSS classes as much as possible. If needed, you may define custom Tailwind Classes / Styles. Creating custom CSS should be the last approach.

## Development Flow
- Install dependencies: `npm install`
- Development server: `npm run dev`
- Build: `npm run build`
- Test: `npm run test`
- Lint: `npm run lint`

## Repository Structure
- `app/`: TanStack Router pages and layouts organized by route
- `components/`: Reusable React components
  - `components/ui/`: UI components (buttons, inputs, etc.)
- `__tests__/`: Unit test components
- `lib/`: Core logic and services
  - `lib/data/`: Data models and mock data
  - `lib/types/`: TypeScript type definitions
- `public/`: Static assets
- `tests/`: Test files and test utilities
- `README.md`: Project documentation

## Key Guidelines
1. Make sure to evaluate the components you're creating, and whether they need 'use client'
2. Images should contain meaningful alt text unless they are purely for decoration. If they are for decoration only, a null (empty) alt text should be provided (alt="") so that the images are ignored by the screen reader.
3. Follow Tanstack Start best practices for data fetching, routing, and rendering
4. Use proper error handling and loading states
5. Optimize components and pages for performance