'use client';

import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { personalInfo } from '~/lib/data/portfolio';

type Theme = 'dark' | 'light';

function SunIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" strokeWidth={2} />
      <path strokeLinecap="round" strokeWidth={2} d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
    </svg>
  );
}

const navLinks = [
  { label: 'About', href: '#about' },
  // { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const stored = (localStorage.getItem('theme') as Theme | null) ?? 'dark';
    setTheme(stored);
    document.documentElement.setAttribute('data-theme', stored);
  }, []);

  function toggleTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/90 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-bold text-lg tracking-tight text-text-primary hover:text-brand-light transition-colors">
          Code Stuff Co
          <span className="text-brand">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              {link.href.startsWith('/') ? (
                <Link
                  to={link.href}
                  viewTransition={{ types: ['slide-right'] }}
                  className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  href={link.href}
                  className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium"
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* CTA + theme toggle */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-alt transition-colors"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <Link
            to="/contact"
            viewTransition={{ types: ['slide-right'] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand hover:bg-brand-dark transition-colors text-white text-sm font-medium"
          >
            Hire me
          </Link>
        </div>

        {/* Mobile controls: theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-1">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-md text-text-secondary hover:text-text-primary transition-colors"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            className="p-2 rounded-md text-text-secondary hover:text-text-primary transition-colors"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface-alt border-b border-border px-6 pb-4">
          <ul className="flex flex-col gap-4 pt-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                {link.href.startsWith('/') ? (
                  <Link
                    to={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
            <li>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand hover:bg-brand-dark transition-colors text-white text-sm font-medium"
                viewTransition={{ types: ['slide-right'] }}
              >
                Hire me
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
