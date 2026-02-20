import { load as yamlLoad } from 'js-yaml';
import type { Project, Skill, WorkExperience, SocialLink } from '../types';

/**
 * Browser-safe frontmatter parser.
 * Splits on the `---` delimiters, parses the YAML block with js-yaml,
 * and returns the remaining markdown content as the body.
 */
function matter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw.trim() };
  const data = (yamlLoad(match[1]) ?? {}) as Record<string, unknown>;
  return { data, content: match[2].trim() };
}

// Vite resolves these globs at build time; `?raw` imports each file as a string.
const personalFiles = import.meta.glob('../../content/personal.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const projectFiles = import.meta.glob('../../content/projects/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const skillFiles = import.meta.glob('../../content/skills/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const experienceFiles = import.meta.glob('../../content/experience/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

/**
 * Sort glob entries by filename (numeric prefix ensures correct order) and
 * return parsed frontmatter + trimmed body content for each file.
 */
function parseFiles(glob: Record<string, string>) {
  return Object.entries(glob)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, raw]) => {
      const { data, content } = matter(raw);
      return { data, content: content.trim() };
    });
}

// ─── Personal info ────────────────────────────────────────────────────────────

const [personal] = parseFiles(personalFiles);

export const personalInfo = {
  name: personal.data['name'] as string,
  tagline: personal.data['tagline'] as string,
  intro: personal.content,
  location: personal.data['location'] as string,
  available: personal.data['available'] as boolean,
};

export const socialLinks: SocialLink[] =
  (personal.data['social'] as SocialLink[]) ?? [];

// ─── Projects ─────────────────────────────────────────────────────────────────

export const projects: Project[] = parseFiles(projectFiles).map(
  ({ data, content }) => ({
    id: data['id'] as string,
    title: data['title'] as string,
    description: content,
    tech: data['tech'] as string[],
    liveUrl: data['liveUrl'] as string | undefined,
    githubUrl: data['githubUrl'] as string | undefined,
    featured: data['featured'] as boolean,
  }),
);

// ─── Skills ───────────────────────────────────────────────────────────────────

export const skills: Skill[] = parseFiles(skillFiles).map(({ data }) => ({
  category: data['category'] as string,
  items: data['items'] as string[],
}));

// ─── Experience ───────────────────────────────────────────────────────────────

export const experience: WorkExperience[] = parseFiles(experienceFiles).map(
  ({ data, content }) => ({
    id: data['id'] as string,
    company: data['company'] as string,
    role: data['role'] as string,
    period: data['period'] as string,
    location: data['location'] as string,
    description: content,
    highlights: data['highlights'] as string[],
  }),
);
