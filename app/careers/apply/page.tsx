'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ApplyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const jobId = searchParams.get('jobId');
  const jobTitle = searchParams.get('jobTitle') || 'Position';

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    skills: '',
    education: '',
    resume: '',
    coverLetter: '',
    noticePeriod: '',
    salaryExpectation: '',
    workPreference: 'On-site',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
      setTimeout(() => {
        router.push('/careers');
      }, 3000);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-6 text-6xl">✅</div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Application Submitted!</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Thank you for applying to {jobTitle}. We'll review your application and get back to you within 2-3 business days.
          </p>
          <div className="space-y-2 text-sm">
            <p className="text-slate-600 dark:text-slate-400">Application Reference: APP-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            <p className="text-slate-600 dark:text-slate-400">Confirmation email sent to {formData.email}</p>
          </div>
          <Link href="/careers" className="inline-block mt-8 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
            Back to Careers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/careers" className="text-emerald-600 dark:text-emerald-400 hover:underline mb-4 inline-block">
            ← Back to Careers
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Apply for {jobTitle}</h1>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1">
                <div className={`h-2 rounded-full ${s <= step ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'}`}></div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">Step {s}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-8 space-y-6">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Personal Information</h2>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1-555-0000"
                    className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Location *</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="City, State"
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {/* Step 2: Experience & Skills */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Experience & Skills</h2>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Years of Experience *</label>
                <select
                  required
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Select...</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Education *</label>
                <input
                  type="text"
                  required
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  placeholder="e.g., B.S. Computer Science"
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Key Skills (comma separated) *</label>
                <textarea
                  required
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="e.g., React, Node.js, Python"
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 h-24"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Work Preference</label>
                <select
                  value={formData.workPreference}
                  onChange={(e) => setFormData({ ...formData, workPreference: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option>On-site</option>
                  <option>Remote</option>
                  <option>Hybrid</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 3: Documents & Expectations */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Final Step</h2>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Resume Upload *</label>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center">
                  <p className="text-slate-600 dark:text-slate-400 mb-3">Drag and drop or click to upload</p>
                  <input type="file" accept=".pdf,.doc,.docx" className="w-full" required />
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">PDF, DOC, DOCX (Max 5MB)</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Cover Letter</label>
                <textarea
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  placeholder="Tell us why you're interested in this role..."
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 h-32"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Salary Expectation (Annual)</label>
                <input
                  type="text"
                  value={formData.salaryExpectation}
                  onChange={(e) => setFormData({ ...formData, salaryExpectation: e.target.value })}
                  placeholder="₹800,000 - ₹1,200,000"
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="agree"
                  className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 accent-emerald-600"
                />
                <label htmlFor="agree" className="ml-2 text-sm text-slate-600 dark:text-slate-400">
                  I agree to the privacy policy and terms of service
                </label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex-1 px-6 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className={`flex-1 px-6 py-2 text-white rounded-lg font-medium transition-colors ${
                step === 3
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              {step === 3 ? 'Submit Application' : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
