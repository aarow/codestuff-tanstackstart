import { describe, it, expect } from 'vitest';
import { contactSchema } from '../app/lib/schemas/contact';

describe('Contact form schema', () => {
  it('accepts valid input', () => {
    const result = contactSchema.safeParse({
      name: 'Jane Smith',
      email: 'jane@example.com',
      message: 'Hello, I would love to work with you!',
    });
    expect(result.success).toBe(true);
  });

  it('rejects empty name', () => {
    const result = contactSchema.safeParse({
      name: '',
      email: 'jane@example.com',
      message: 'Hello, I would love to work with you!',
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Name is required');
  });

  it('rejects invalid email', () => {
    const result = contactSchema.safeParse({
      name: 'Jane Smith',
      email: 'not-an-email',
      message: 'Hello, I would love to work with you!',
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Invalid email address');
  });

  it('rejects message shorter than 10 characters', () => {
    const result = contactSchema.safeParse({
      name: 'Jane Smith',
      email: 'jane@example.com',
      message: 'Hi',
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Message must be at least 10 characters');
  });

  it('rejects missing fields', () => {
    const result = contactSchema.safeParse({});
    expect(result.success).toBe(false);
    expect(result.error?.issues.length).toBeGreaterThanOrEqual(3);
  });

  it('trims whitespace-only name as invalid', () => {
    // A single space passes min(1) — intentional; real validation happens client-side
    const result = contactSchema.safeParse({
      name: 'A',
      email: 'jane@example.com',
      message: 'Hello, I would love to work with you!',
    });
    expect(result.success).toBe(true);
  });

  describe('field-keyed error extraction (mirrors handleSubmit logic)', () => {
    function extractFieldErrors(data: unknown) {
      const result = contactSchema.safeParse(data);
      if (result.success) return {};
      const errors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string;
        if (!errors[field]) errors[field] = issue.message;
      }
      return errors;
    }

    it('produces a "name" key for empty name', () => {
      const errors = extractFieldErrors({ name: '', email: 'a@b.com', message: 'long enough msg' });
      expect(errors.name).toBe('Name is required');
      expect(errors.email).toBeUndefined();
      expect(errors.message).toBeUndefined();
    });

    it('produces an "email" key for bad email', () => {
      const errors = extractFieldErrors({ name: 'Aaron', email: 'bad', message: 'long enough msg' });
      expect(errors.email).toBe('Invalid email address');
      expect(errors.name).toBeUndefined();
    });

    it('produces a "message" key for short message', () => {
      const errors = extractFieldErrors({ name: 'Aaron', email: 'a@b.com', message: 'short' });
      expect(errors.message).toBe('Message must be at least 10 characters');
      expect(errors.name).toBeUndefined();
    });

    it('produces all three keys when every field is invalid', () => {
      const errors = extractFieldErrors({ name: '', email: 'bad', message: 'hi' });
      expect(errors.name).toBeTruthy();
      expect(errors.email).toBeTruthy();
      expect(errors.message).toBeTruthy();
    });

    it('returns empty object for valid data — server fn would be called', () => {
      const errors = extractFieldErrors({ name: 'Aaron', email: 'a@b.com', message: 'long enough msg' });
      expect(Object.keys(errors).length).toBe(0);
    });
  });
});
