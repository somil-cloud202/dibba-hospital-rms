'use client';

import { useState } from 'react';

export default function ApplicationsPage() {
  const [applications] = useState([
    { id: 1, candidate: 'John Smith', position: 'Senior Developer', status: 'Interview Scheduled', date: '2025-02-15' },
    { id: 2, candidate: 'Sarah Johnson', position: 'Product Manager', status: 'Screening', date: '2025-02-14' },
    { id: 3, candidate: 'Mike Chen', position: 'UI Designer', status: 'Applied', date: '2025-02-13' },
    { id: 4, candidate: 'Emma Davis', position: 'Data Analyst', status: 'Offer Extended', date: '2025-02-12' },
    { id: 5, candidate: 'Lisa Wang', position: 'Senior Developer', status: 'Applied', date: '2025-02-11' },
  ]);

  const statusBadgeColor = (status: string) => {
    switch(status) {
      case 'Interview Scheduled':
        return 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400';
      case 'Screening':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      case 'Offer Extended':
        return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400';
      default:
        return 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Applications</h1>
        <select className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500">
          <option>All Statuses</option>
          <option>Applied</option>
          <option>Screening</option>
          <option>Interview Scheduled</option>
          <option>Offer Extended</option>
        </select>
      </div>

      {/* Applications Table */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Candidate</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Position</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Applied</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-6 py-4 text-slate-900 dark:text-white font-medium">{app.candidate}</td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{app.position}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeColor(app.status)}`}>
                    {app.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{app.date}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm font-medium">
                    Review
                  </button>
                  <button className="text-slate-600 dark:text-slate-400 hover:underline text-sm font-medium">
                    More
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
