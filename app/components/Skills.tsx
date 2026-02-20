import { skills } from '~/lib/data/portfolio';

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-surface-alt">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-14">
          <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-2">Expertise</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">Skills & Tech Stack</h2>
          <p className="mt-3 text-text-secondary max-w-xl">
            The tools and technologies I work with day-to-day.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skillGroup) => (
            <div
              key={skillGroup.category}
              className="bg-surface border border-border rounded-2xl p-6 hover:border-brand/30 transition-colors"
            >
              <h3 className="text-sm font-semibold text-brand-light uppercase tracking-wider mb-4">
                {skillGroup.category}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {skillGroup.items.map((item) => (
                  <li
                    key={item}
                    className="px-3 py-1 rounded-full border border-border text-text-secondary text-sm hover:border-brand/40 hover:text-text-primary transition-colors"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
