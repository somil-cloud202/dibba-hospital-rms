'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CandidatesPage() {
  const [candidates] = useState([
    { id: 1, name: 'John Smith', email: 'john@example.com', position: 'Senior Developer', status: 'Screening', rating: 4.5 },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', position: 'Product Manager', status: 'Interview', rating: 4.8 },
    { id: 3, name: 'Mike Chen', email: 'mike@example.com', position: 'UI Designer', status: 'Applied', rating: 4.2 },
    { id: 4, name: 'Emma Davis', email: 'emma@example.com', position: 'Data Analyst', status: 'Offer', rating: 4.6 },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Candidates</h1>
        <input
          type="search"
          placeholder="Search candidates..."
          className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
        />
      </div>

      {/* Candidates Table */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Position</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Rating</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-6 py-4 text-slate-900 dark:text-white font-medium">{candidate.name}</td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{candidate.email}</td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{candidate.position}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    candidate.status === 'Offer' 
                      ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  }`}>
                    {candidate.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-900 dark:text-white">
                  {'⭐'.repeat(Math.floor(candidate.rating))}
                </td>
                <td className="px-6 py-4">
                  <Link href={`/dashboard/candidates/${candidate.id}`} className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm font-medium">
                    View Profile
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
