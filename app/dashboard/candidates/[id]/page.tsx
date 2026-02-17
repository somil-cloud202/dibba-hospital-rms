'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function CandidateProfilePage({ params }: { params: { id: string } }) {
  const [status, setStatus] = useState('Screening');
  const [rating, setRating] = useState(4.5);

  // Mock candidate data
  const candidate = {
    id: params.id,
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    position: 'Senior Developer',
    appliedDate: '2025-02-15',
    rating: 4.5,
    status: 'Screening',
    resume: 'Senior Software Engineer with 6+ years of experience in full-stack development...',
    experience: [
      { company: 'Tech Corp', role: 'Senior Developer', duration: '2021 - Present' },
      { company: 'StartUp Inc', role: 'Full Stack Developer', duration: '2019 - 2021' },
      { company: 'Web Solutions', role: 'Junior Developer', duration: '2018 - 2019' },
    ],
    education: [
      { school: 'MIT', degree: 'BS Computer Science', year: '2018' },
    ],
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker', 'Git'],
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    alert(`Status updated to: ${newStatus}`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Back Link */}
      <Link href="/dashboard/candidates" className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-2">
        ← Back to Candidates
      </Link>

      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">{candidate.name}</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">{candidate.position}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl mb-2">{'⭐'.repeat(Math.floor(rating))}</div>
            <p className="text-sm text-slate-600 dark:text-slate-400">({rating}/5)</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold">Email</p>
            <p className="text-slate-900 dark:text-white">{candidate.email}</p>
          </div>
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold">Phone</p>
            <p className="text-slate-900 dark:text-white">{candidate.phone}</p>
          </div>
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold">Location</p>
            <p className="text-slate-900 dark:text-white">{candidate.location}</p>
          </div>
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold">Applied</p>
            <p className="text-slate-900 dark:text-white">{candidate.appliedDate}</p>
          </div>
        </div>

        {/* Status and Rating Controls */}
        <div className="flex gap-4 flex-wrap">
          <div className="flex gap-2">
            <select
              value={status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="Applied">Applied</option>
              <option value="Screening">Screening</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="flex gap-2">
            <select
              value={rating.toString()}
              onChange={(e) => setRating(parseFloat(e.target.value))}
              className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="5">5 Stars</option>
              <option value="4.5">4.5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>

          <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
            Schedule Interview
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">About</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{candidate.resume}</p>
          </div>

          {/* Experience */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Experience</h2>
            <div className="space-y-4">
              {candidate.experience.map((exp, idx) => (
                <div key={idx} className="pb-4 border-b border-slate-200 dark:border-slate-700 last:border-0">
                  <p className="font-bold text-slate-900 dark:text-white">{exp.role}</p>
                  <p className="text-slate-600 dark:text-slate-400">{exp.company}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-500">{exp.duration}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Education</h2>
            <div className="space-y-4">
              {candidate.education.map((edu, idx) => (
                <div key={idx}>
                  <p className="font-bold text-slate-900 dark:text-white">{edu.degree}</p>
                  <p className="text-slate-600 dark:text-slate-400">{edu.school}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-500">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Skills */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Actions</h3>
            <button className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
              Send Email
            </button>
            <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              Schedule Call
            </button>
            <button className="w-full px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-medium transition-colors">
              Add Note
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
