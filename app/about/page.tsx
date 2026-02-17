'use client';

import Link from 'next/link';

export default function AboutPage() {
  const values = [
    { title: 'Innovation', description: 'We constantly innovate to provide cutting-edge solutions' },
    { title: 'Integrity', description: 'We operate with transparency and honesty in all dealings' },
    { title: 'Inclusivity', description: 'We value diverse perspectives and foster an inclusive culture' },
    { title: 'Excellence', description: 'We strive for excellence in everything we do' },
  ];

  const team = [
    { name: 'Sarah Anderson', role: 'CEO & Founder', image: 'SA' },
    { name: 'Michael Chen', role: 'CTO', image: 'MC' },
    { name: 'Emily Watson', role: 'COO', image: 'EW' },
    { name: 'David Johnson', role: 'Head of HR', image: 'DJ' },
  ];

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
            <Link href="/careers" className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
              Careers
            </Link>
            <Link href="/login" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-600 to-cyan-600">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h1 className="text-5xl font-bold mb-4">About HRMS</h1>
          <p className="text-xl opacity-90">Transforming the future of recruitment and HR management</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Our Story</h2>
          <div className="space-y-4 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
            <p>
              Founded in 2020, HRMS was born from a simple insight: modern companies need modern recruitment tools. Our founder, Sarah Anderson, recognized that traditional HR processes were inefficient, time-consuming, and outdated.
            </p>
            <p>
              Today, HRMS serves hundreds of companies across industries, helping them streamline their recruitment, manage candidates effectively, and make better hiring decisions. Our platform has processed over 50,000 applications and helped companies hire some of their best talent.
            </p>
            <p>
              We're committed to continuously improving our platform and adding features that our customers need. Our success is measured by the success of our clients and the talent they bring into their organizations.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="p-6 text-center border border-slate-200 dark:border-slate-700 rounded-lg">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{value.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-24 h-24 rounded-full bg-emerald-600 text-white flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                  {member.image}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{member.name}</h3>
                <p className="text-slate-600 dark:text-slate-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-600 to-cyan-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <p className="text-4xl font-bold mb-2">500+</p>
              <p className="text-lg opacity-90">Companies Using HRMS</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">50K+</p>
              <p className="text-lg opacity-90">Applications Processed</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">100K+</p>
              <p className="text-lg opacity-90">Candidates Managed</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">4.9/5</p>
              <p className="text-lg opacity-90">Customer Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Ready to Join Our Customers?</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Experience the difference that modern recruitment technology can make for your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/careers"
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
            >
              View Open Positions
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors"
            >
              Schedule Demo
            </Link>
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
