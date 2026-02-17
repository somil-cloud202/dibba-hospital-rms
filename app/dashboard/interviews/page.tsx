'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function InterviewsPage() {
  const [interviews] = useState([
    { id: 1, candidate: 'John Smith', position: 'Senior Developer', type: 'Technical', date: '2025-02-20', time: '10:00 AM', interviewer: 'Alice Brown' },
    { id: 2, candidate: 'Sarah Johnson', position: 'Product Manager', type: 'Behavioral', date: '2025-02-21', time: '2:00 PM', interviewer: 'Bob Wilson' },
    { id: 3, candidate: 'Emma Davis', position: 'Data Analyst', type: 'Case Study', date: '2025-02-22', time: '11:30 AM', interviewer: 'Carol Davis' },
    { id: 4, candidate: 'Alex Martinez', position: 'UI Designer', type: 'Portfolio Review', date: '2025-02-23', time: '3:30 PM', interviewer: 'David Lee' },
  ]);

  return (
    <div className="space-y-6">
      {/* Header with Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Interviews</h1>
        <Link
          href="/dashboard/interviews/schedule"
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
        >
          + Schedule Interview
        </Link>
      </div>

      {/* Interviews Table */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Candidate</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Position</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Date & Time</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Interviewer</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Actions</th>
            </tr>
          </thead>
          <tbody>
            {interviews.map((interview) => (
              <tr key={interview.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-6 py-4 text-slate-900 dark:text-white font-medium">{interview.candidate}</td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{interview.position}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
                    {interview.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                  {interview.date} at {interview.time}
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{interview.interviewer}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm font-medium">
                    Edit
                  </button>
                  <button className="text-slate-600 dark:text-slate-400 hover:underline text-sm font-medium">
                    Cancel
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
