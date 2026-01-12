'use client';

import { useState } from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'An error occurred'
      );
    }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <section className="pt-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground">
              Have a project in mind or want to discuss opportunities? I'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="glass rounded-lg p-8 space-y-6" noValidate>
            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-foreground">
                Name <span aria-label="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                aria-required="true"
                aria-describedby="name-error"
                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-colors"
                placeholder="Your name"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Email <span aria-label="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                aria-required="true"
                aria-describedby="email-error"
                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-colors"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-foreground">
                Message <span aria-label="required">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                aria-required="true"
                aria-describedby="message-error"
                rows={6}
                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-colors resize-none"
                placeholder="Tell me about your project or opportunity..."
              />
            </div>

            {/* Status Messages */}
            {status === 'success' && (
              <div 
                className="p-4 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400"
                role="alert"
                aria-live="polite"
                aria-atomic="true"
              >
                <p className="font-semibold">Message sent successfully!</p>
                <p className="text-sm">I'll get back to you as soon as possible.</p>
              </div>
            )}

            {status === 'error' && (
              <div 
                className="p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
              >
                <p className="font-semibold">Error sending message</p>
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'loading'}
              aria-busy={status === 'loading'}
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-background font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>

      {/* Alternative Contact Methods */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Other Ways to Connect</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Email */}
            <a
              href="mailto:ryan.stephens15@gmail.com"
              className="glass rounded-lg p-4 hover:border-primary/50 hover:bg-primary/10 transition-all group flex flex-col items-center gap-3"
            >
              <div className="p-2 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
                <Mail size={20} className="text-primary" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-foreground text-sm">Email</h3>
                <p className="text-xs text-muted-foreground mt-1">ryan.stephens15@gmail.com</p>
              </div>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/ryan-stephens?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-lg p-4 hover:border-primary/50 hover:bg-primary/10 transition-all group flex flex-col items-center gap-3"
            >
              <div className="p-2 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
                <Github size={20} className="text-primary" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-foreground text-sm">GitHub</h3>
                <p className="text-xs text-muted-foreground mt-1">View repositories</p>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/ryan-stephens-4a518359/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-lg p-4 hover:border-primary/50 hover:bg-primary/10 transition-all group flex flex-col items-center gap-3"
            >
              <div className="p-2 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
                <Linkedin size={20} className="text-primary" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-foreground text-sm">LinkedIn</h3>
                <p className="text-xs text-muted-foreground mt-1">Connect with me</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-foreground">FAQ</h2>

          <div className="space-y-4">
            <div className="glass rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-2">
                What's the best way to reach you?
              </h3>
              <p className="text-muted-foreground text-sm">
                Email is the most reliable way. I typically respond within 24-48 hours. You can also reach out via LinkedIn or GitHub.
              </p>
            </div>

            <div className="glass rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-2">
                Are you available for freelance work?
              </h3>
              <p className="text-muted-foreground text-sm">
                I'm open to discussing interesting projects. Whether it's building AI systems, full-stack development, or consulting, let's talk about what you have in mind.
              </p>
            </div>

            <div className="glass rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-2">
                What's your typical response time?
              </h3>
              <p className="text-muted-foreground text-sm">
                I aim to respond to all inquiries within 24-48 hours. For urgent matters, email is your best bet.
              </p>
            </div>

            <div className="glass rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-2">
                Do you offer consulting services?
              </h3>
              <p className="text-muted-foreground text-sm">
                Yes, I'm available for consulting on AI/ML architecture, full-stack development, and DevOps. Feel free to reach out to discuss your specific needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
