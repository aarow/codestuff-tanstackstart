/// <reference types="vite/client" />
import * as React from 'react';
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
  Link,
} from '@tanstack/react-router';
import appCss from '~/styles/app.css?url';

function NotFound() {
  return (
    <div className="min-h-screen bg-surface text-text-primary flex flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold text-brand">404</h1>
      <p className="text-text-secondary text-lg">Page not found.</p>
      <Link
        to="/"
        className="px-4 py-2 rounded-lg bg-brand hover:bg-brand-dark transition-colors text-white text-sm font-medium"
      >
        Go home
      </Link>
    </div>
  );
}

export const Route = createRootRoute({
  notFoundComponent: NotFound,
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Aaron Neville — Developer Portfolio' },
      {
        name: 'description',
        content:
          'Full-stack developer portfolio showcasing projects, skills, and experience.',
      },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <HeadContent />
      </head>
      <body className="bg-surface text-text-primary antialiased">
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
