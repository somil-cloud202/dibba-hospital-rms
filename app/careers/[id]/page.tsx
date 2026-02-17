'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: '',
    coverLetter: '',
  });

  // Mock job data - in a real app, fetch based on params.id
  const job = {
    id: params.id,
    title: 'Senior Developer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$145,000 - $180,000',
    description: `
      We're looking for an experienced Senior Developer to lead our platform development efforts.
      You'll work with cutting-edge technologies and mentor junior developers on our team.
    `,
    requirements: [
      '5+ years of software development experience',
      'Strong proficiency in TypeScript/JavaScript',
      'Experience with React and Node.js',
      'Experience with database design and optimization',
      'Excellent communication and leadership skills',
      'Bachelor\'s degree in Computer Science or related field',
    ],
    benefits: [
      'Competitive salary and equity',
      'Comprehensive health insurance',
      '401(k) matching',
      'Unlimited PTO',
      'Remote work options',
      'Professional development budget',
    ],
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Application submitted! We will review your profile soon.');
    setShowApplyForm(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Navigation */}
      <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-slate-900 dark:text-white">
            HRMS
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/careers"
              className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              ← Back to Careers
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Job Header */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-8 mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{job.title}</h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg">{job.department}</p>
            </div>
            <button
              onClick={() => setShowApplyForm(!showApplyForm)}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
            >
              Apply Now
            </button>
          </div>

          <div className="flex flex-wrap gap-6 text-slate-600 dark:text-slate-400 mb-6">
            <div>
              <p className="text-sm font-medium">Location</p>
              <p className="text-lg">{job.location}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Type</p>
              <p className="text-lg">{job.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Salary</p>
              <p className="text-lg">{job.salary}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">About This Role</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </section>

            {/* Requirements */}
            <section className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex gap-3 text-slate-600 dark:text-slate-400">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Benefits */}
            <section className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Benefits</h2>
              <ul className="space-y-3">
                {job.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex gap-3 text-slate-600 dark:text-slate-400">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">★</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <aside>
            {/* Application Form */}
            {showApplyForm && (
              <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6 sticky top-24">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Apply for this Position</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">
                      Resume (optional)
                    </label>
                    <textarea
                      value={formData.resume}
                      onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 text-sm"
                      placeholder="Paste resume content here..."
                      rows={3}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Submit Application
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowApplyForm(false)}
                    className="w-full px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            )}

            {!showApplyForm && (
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800 p-6">
                <p className="text-emerald-900 dark:text-emerald-100 mb-4">
                  Ready to apply? Click the button above to submit your application.
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
