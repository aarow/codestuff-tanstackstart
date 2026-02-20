import { experience } from '~/lib/data/portfolio';

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="mb-14">
          <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-2">Career</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">Work Experience</h2>
          <p className="mt-3 text-text-secondary max-w-xl">
            Where I've worked and what I've accomplished.
          </p>
        </div>

        {/* Timeline */}
        <ol className="relative border-l border-border ml-3">
          {experience.map((job, idx) => (
            <li key={job.id} className={`ml-8 ${idx < experience.length - 1 ? 'mb-14' : ''}`}>
              {/* Timeline dot */}
              <span className="absolute -left-[9px] flex h-4 w-4 items-center justify-center rounded-full bg-surface-alt border-2 border-brand">
                <span className="sr-only">Milestone</span>
              </span>

              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1 mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">{job.role}</h3>
                  <p className="text-brand-light font-medium text-sm">{job.company}</p>
                </div>
                <div className="text-right">
                  <time className="text-text-secondary text-sm">{job.period}</time>
                  <p className="text-text-secondary text-xs mt-0.5">{job.location}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-text-secondary text-sm leading-relaxed mb-4">{job.description}</p>

              {/* Highlights */}
              <ul className="space-y-2">
                {job.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-sm text-text-secondary">
                    <svg
                      className="w-4 h-4 text-brand mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                    </svg>
                    {highlight}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
