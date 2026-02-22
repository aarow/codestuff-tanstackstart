/// <reference types="vite/client" />
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router';
import appCss from '~/styles/app.css?url';
// import Footer from '~/components/Footer';
// import Navbar from '~/components/Navbar';
import NotFound from './NotFound';

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
        {/* <Navbar /> */}
        <Outlet />
        {/* <Footer /> */}
        <Scripts />
      </body>
    </html>
  );
}
