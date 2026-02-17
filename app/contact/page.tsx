'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', company: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Navigation */}
      <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-slate-900 dark:text-white">
            HRMS
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
              About
            </Link>
            <Link href="/login" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-600 to-cyan-600">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl opacity-90">We'd love to hear from you. Get in touch with our team today.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Office</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  123 Business Street<br />
                  San Francisco, CA 94105<br />
                  United States
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Phone</h3>
                <a href="tel:+15551234567" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  +1 (555) 123-4567
                </a>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Email</h3>
                <a href="mailto:hello@hrms.com" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  hello@hrms.com
                </a>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Hours</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday - Sunday: Closed
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send us a Message</h2>

                {submitted ? (
                  <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg text-emerald-900 dark:text-emerald-100 text-center">
                    <p className="font-bold mb-2">Thank You!</p>
                    <p>We've received your message and will get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                        placeholder="Your company name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                        placeholder="How can we help?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                        Message *
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={5}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                        placeholder="Tell us more about your needs..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-slate-600 dark:text-slate-400">
          <p>&copy; 2025 HRMS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
