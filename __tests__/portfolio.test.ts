import { describe, it, expect } from 'vitest';
import { projects, skills, experience, personalInfo } from '../app/lib/data/portfolio';

describe('Portfolio data', () => {
  it('should have personal info', () => {
    expect(personalInfo.name).toBe('Aaron Neville');
    expect(personalInfo.tagline).toBeTruthy();
  });

  it('should have at least one featured project', () => {
    const featured = projects.filter((p) => p.featured);
    expect(featured.length).toBeGreaterThan(0);
  });

  it('each project should have required fields', () => {
    for (const project of projects) {
      expect(project.id).toBeTruthy();
      expect(project.title).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(Array.isArray(project.tech)).toBe(true);
    }
  });

  it('should have skill categories', () => {
    expect(skills.length).toBeGreaterThan(0);
    for (const skill of skills) {
      expect(skill.category).toBeTruthy();
      expect(skill.items.length).toBeGreaterThan(0);
    }
  });

  it('should have work experience entries', () => {
    expect(experience.length).toBeGreaterThan(0);
    for (const job of experience) {
      expect(job.company).toBeTruthy();
      expect(job.role).toBeTruthy();
      expect(job.highlights.length).toBeGreaterThan(0);
    }
  });
});
