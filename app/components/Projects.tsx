import { projects } from '~/lib/data/portfolio';

function ExternalLinkIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-14">
          <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-2">Portfolio</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">Selected Projects</h2>
          <p className="mt-3 text-text-secondary max-w-xl">
            A selection of things I've built — from open-source tools to production SaaS products.
          </p>
        </div>

        {/* Featured grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
          {featured.map((project) => (
            <article
              key={project.id}
              className="flex flex-col bg-surface-card border border-border rounded-2xl p-6 hover:border-brand/40 transition-colors group"
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-brand-light transition-colors">
                  {project.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">{project.description}</p>
                <ul className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <li
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-brand/10 text-brand-light text-xs font-medium"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors text-sm"
                  >
                    <GitHubIcon />
                    Code
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors text-sm ml-auto"
                  >
                    Live demo
                    <ExternalLinkIcon />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Rest of projects — compact list */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((project) => (
            <article
              key={project.id}
              className="flex flex-col bg-surface-alt border border-border rounded-xl p-5 hover:border-brand/30 transition-colors group"
            >
              <h3 className="text-base font-semibold text-text-primary mb-1 group-hover:text-brand-light transition-colors">
                {project.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-3 flex-1">{project.description}</p>
              <ul className="flex flex-wrap gap-1.5 mb-3">
                {project.tech.map((t) => (
                  <li key={t} className="px-2 py-0.5 rounded-md bg-brand/10 text-brand-light text-xs font-medium">
                    {t}
                  </li>
                ))}
              </ul>
              <div className="flex gap-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors text-xs"
                  >
                    <GitHubIcon />
                    GitHub
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
