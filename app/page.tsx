'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Navigation */}
      <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">HRMS</h1>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/careers"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
            >
              View Careers
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            Enterprise Recruitment Management System
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
            Streamline your hiring process with our comprehensive recruitment platform. From job posting to onboarding, we've got you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/careers"
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
            >
              Explore Opportunities
            </Link>
            <Link
              href="/login"
              className="px-8 py-3 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
            Powerful Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Job Management', description: 'Create and manage job postings across multiple departments' },
              { title: 'Candidate Tracking', description: 'Track candidates through the entire recruitment pipeline' },
              { title: 'Interview Scheduling', description: 'Automated scheduling and interview management tools' },
              { title: 'Application Workflow', description: 'Streamlined application review and decision process' },
              { title: 'Financial Integration', description: 'Integrated payroll and financial management systems' },
              { title: 'Advanced Analytics', description: 'Detailed reports and insights on your recruitment process' },
            ].map((feature, idx) => (
              <div key={idx} className="p-6 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h4>
                <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-lg p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Recruitment?</h3>
          <p className="text-lg mb-8">Join hundreds of companies using HRMS for their recruitment needs.</p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-white text-emerald-600 font-medium rounded-lg hover:bg-slate-100 transition-colors"
          >
            Get Started
          </Link>
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
