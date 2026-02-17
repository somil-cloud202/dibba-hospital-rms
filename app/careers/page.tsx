'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function CareersPage() {
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  const jobs = [
    { id: 1, title: 'Senior Developer', dept: 'Engineering', location: 'San Francisco', type: 'Full-time' },
    { id: 2, title: 'Junior Developer', dept: 'Engineering', location: 'Remote', type: 'Full-time' },
    { id: 3, title: 'Product Manager', dept: 'Product', location: 'San Francisco', type: 'Full-time' },
    { id: 4, title: 'UI Designer', dept: 'Design', location: 'Remote', type: 'Full-time' },
    { id: 5, title: 'Data Analyst', dept: 'Analytics', location: 'New York', type: 'Full-time' },
    { id: 6, title: 'Recruiter', dept: 'HR', location: 'San Francisco', type: 'Full-time' },
  ];

  const departments = ['Engineering', 'Product', 'Design', 'Analytics', 'HR'];
  const filteredJobs = selectedDept ? jobs.filter((job) => job.dept === selectedDept) : jobs;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Navigation */}
      <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-slate-900 dark:text-white">
            HRMS
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Home
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

      {/* Hero */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-600 to-cyan-600">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-lg opacity-90">We're hiring talented people to grow with us</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6 sticky top-24">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Filter by Department</h3>
              <button
                onClick={() => setSelectedDept(null)}
                className={`w-full text-left px-4 py-2 rounded transition-colors mb-2 ${
                  selectedDept === null
                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-medium'
                    : 'text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                All Departments
              </button>
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`w-full text-left px-4 py-2 rounded transition-colors mb-2 ${
                    selectedDept === dept
                      ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-medium'
                      : 'text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </aside>

          {/* Job Listings */}
          <main className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {selectedDept ? `${selectedDept} Positions` : 'All Positions'}
              </h2>
              <span className="text-slate-600 dark:text-slate-400">
                {filteredJobs.length} position{filteredJobs.length !== 1 ? 's' : ''}
              </span>
            </div>

            {filteredJobs.length > 0 ? (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-6 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{job.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{job.dept}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                        {job.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-4">
                      <span>📍 {job.location}</span>
                    </div>
                    <Link
                      href={`/careers/apply?jobId=${job.id}&jobTitle=${encodeURIComponent(job.title)}`}
                      className="inline-block px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Apply Now
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                <p className="text-slate-600 dark:text-slate-400">No positions available in this department</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
