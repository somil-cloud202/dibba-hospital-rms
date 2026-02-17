'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NewJobPage() {
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    jobType: 'Full-time',
    salaryMin: '',
    salaryMax: '',
    description: '',
    requirements: '',
    benefits: '',
    status: 'Draft',
  });

  const departments = ['Engineering', 'Product', 'Design', 'Analytics', 'HR', 'Marketing', 'Sales'];
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle job creation
    alert('Job posting created successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/dashboard/jobs" className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-2">
          ← Back to Jobs
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Create New Job Posting</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3">
              Basic Information
            </h2>

            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Job Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Senior Software Engineer"
                required
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                  Department *
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  required
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., San Francisco, CA"
                  required
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                  Job Type *
                </label>
                <select
                  value={formData.jobType}
                  onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                >
                  {jobTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                  Salary Min
                </label>
                <input
                  type="text"
                  value={formData.salaryMin}
                  onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                  placeholder="$100,000"
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                  Salary Max
                </label>
                <input
                  type="text"
                  value={formData.salaryMax}
                  onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                  placeholder="$150,000"
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3">
              Job Details
            </h2>

            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Job Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the role, responsibilities, and what success looks like..."
                required
                rows={6}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Requirements *
              </label>
              <textarea
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                placeholder="List required qualifications (one per line)&#10;- 5+ years of experience&#10;- Strong communication skills"
                required
                rows={4}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Benefits & Perks
              </label>
              <textarea
                value={formData.benefits}
                onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                placeholder="List benefits (one per line)&#10;- Health insurance&#10;- 401k matching"
                rows={4}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Status */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3">
              Publication
            </h2>

            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Draft">Save as Draft</option>
                <option value="Published">Publish Immediately</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
            <button
              type="submit"
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
            >
              Create Job Posting
            </button>
            <Link
              href="/dashboard/jobs"
              className="px-6 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-medium transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
