import { createFileRoute, Link } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { useState } from 'react';
import { Resend } from 'resend';
import { contactSchema } from '~/lib/schemas/contact';

const sendContactEmail = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured on the server.');
    }
    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: 'Portfolio Contact <aaron@codestuff.dev>',
      to: 'aaron@codestuff.dev',
      replyTo: data.email,
      subject: `New message from ${data.name}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br />')}</p>
      `,
    });
    if (result.error) {
      console.error('Resend error:', result.error);
      throw new Error(result.error.message);
    }
    return { success: true };
  });

export const Route = createFileRoute('/contact')({
  component: ContactPage,
});

type FieldErrors = Partial<Record<'name' | 'email' | 'message', string>>;

function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');

    // Client-side validation before touching the network
    const result = contactSchema.safeParse({ name, email, message });
    if (!result.success) {
      const errors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FieldErrors;
        if (!errors[field]) errors[field] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});

    setStatus('sending');
    try {
      await sendContactEmail({ data: result.data });
      setStatus('sent');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      );
    }
  }

  return (
    <div className="min-h-screen bg-surface pt-24 pb-16 px-6 [view-transition-name:main-content]">
      <div className="max-w-xl mx-auto">
        <Link
          to="/"
          viewTransition={{ types: ['slide-left'] }}
          className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary text-sm mb-10 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>

        <h1 className="text-3xl font-bold text-text-primary mb-2">Get in touch</h1>
        <p className="text-text-secondary mb-10">
          Have a project or opportunity in mind? Send a message and I'll get back to you.
        </p>

        {status === 'sent' ? (
          <div className="rounded-xl border border-border bg-surface-card p-8 text-center">
            <div className="text-4xl mb-4">✓</div>
            <h2 className="text-xl font-semibold text-text-primary mb-2">Message sent!</h2>
            <p className="text-text-secondary mb-6">Thanks for reaching out. I'll reply as soon as I can.</p>
            <button
              onClick={() => setStatus('idle')}
              className="px-5 py-2 rounded-lg bg-brand hover:bg-brand-dark text-white text-sm font-medium transition-colors"
            >
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1.5">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className={`w-full rounded-lg border bg-surface-card text-text-primary placeholder-text-secondary/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition ${
                  fieldErrors.name ? 'border-red-500' : 'border-border'
                }`}
              />
              {fieldErrors.name && (
                <p className="mt-1 text-xs text-red-400">{fieldErrors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={`w-full rounded-lg border bg-surface-card text-text-primary placeholder-text-secondary/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition ${
                  fieldErrors.email ? 'border-red-500' : 'border-border'
                }`}
              />
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What's on your mind?"
                className={`w-full rounded-lg border bg-surface-card text-text-primary placeholder-text-secondary/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition resize-none ${
                  fieldErrors.message ? 'border-red-500' : 'border-border'
                }`}
              />
              {fieldErrors.message && (
                <p className="mt-1 text-xs text-red-400">{fieldErrors.message}</p>
              )}
            </div>

            {status === 'error' && (
              <p className="text-red-400 text-sm">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="self-start px-6 py-3 rounded-lg bg-brand hover:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors"
            >
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
