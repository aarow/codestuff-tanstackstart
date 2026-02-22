import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/NotFound')({
  component: NotFound,
})

export default function NotFound() {
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

