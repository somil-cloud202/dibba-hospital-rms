'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ApplicationDetailPage({ params }: { params: { id: string } }) {
  const [status, setStatus] = useState('Screening');
  const [notes, setNotes] = useState('');
  const [showNoteForm, setShowNoteForm] = useState(false);

  // Mock application data
  const application = {
    id: params.id,
    candidate: {
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
    },
    position: 'Senior Developer',
    status: 'Screening',
    appliedDate: '2025-02-15',
    timeline: [
      { event: 'Application Submitted', date: '2025-02-15', status: 'completed' },
      { event: 'Application Reviewed', date: '2025-02-16', status: 'completed' },
      { event: 'Screening Interview', date: '2025-02-20', status: 'pending' },
      { event: 'Technical Interview', date: '', status: 'upcoming' },
      { event: 'Final Interview', date: '', status: 'upcoming' },
      { event: 'Offer Decision', date: '', status: 'upcoming' },
    ],
    activityLog: [
      { action: 'Status changed to Screening', by: 'Sarah Johnson', date: '2025-02-16 10:30 AM' },
      { action: 'Scheduled for screening interview', by: 'Alice Brown', date: '2025-02-15 3:45 PM' },
      { action: 'Application submitted', by: 'System', date: '2025-02-15 2:20 PM' },
    ],
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Note added successfully!');
    setNotes('');
    setShowNoteForm(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Back Link */}
      <Link href="/dashboard/applications" className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-2">
        ← Back to Applications
      </Link>

      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">{application.candidate.name}</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Position: {application.position}</p>
          </div>
          <div className="text-right">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="Applied">Applied</option>
              <option value="Screening">Screening</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold">Email</p>
            <p className="text-slate-900 dark:text-white">{application.candidate.email}</p>
          </div>
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold">Phone</p>
            <p className="text-slate-900 dark:text-white">{application.candidate.phone}</p>
          </div>
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold">Applied</p>
            <p className="text-slate-900 dark:text-white">{application.appliedDate}</p>
          </div>
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold">Status</p>
            <p className="text-emerald-600 dark:text-emerald-400 font-bold">{application.status}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timeline */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Workflow Timeline</h2>
            <div className="space-y-6">
              {application.timeline.map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        step.status === 'completed'
                          ? 'bg-emerald-600 text-white'
                          : step.status === 'pending'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {step.status === 'completed' ? '✓' : idx + 1}
                    </div>
                    {idx < application.timeline.length - 1 && (
                      <div className="w-1 h-8 bg-slate-200 dark:bg-slate-700 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="font-bold text-slate-900 dark:text-white">{step.event}</p>
                    {step.date && <p className="text-sm text-slate-600 dark:text-slate-400">{step.date}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Activity Log</h2>
            <div className="space-y-4">
              {application.activityLog.map((activity, idx) => (
                <div key={idx} className="pb-4 border-b border-slate-200 dark:border-slate-700 last:border-0">
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-medium text-slate-900 dark:text-white">{activity.action}</p>
                    <span className="text-xs text-slate-500 dark:text-slate-500">{activity.date}</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">by {activity.by}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Actions */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
            <button className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors text-sm">
              Move to Next Stage
            </button>
            <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm">
              Schedule Interview
            </button>
            <button className="w-full px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-medium transition-colors text-sm">
              Send Email
            </button>
            <button className="w-full px-4 py-2 border-2 border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg font-medium transition-colors text-sm">
              Reject
            </button>
          </div>

          {/* Notes Section */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Internal Notes</h3>
            {!showNoteForm && (
              <button
                onClick={() => setShowNoteForm(true)}
                className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg font-medium transition-colors text-sm hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                + Add Note
              </button>
            )}
            {showNoteForm && (
              <form onSubmit={handleAddNote} className="space-y-3">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add internal notes about this candidate..."
                  rows={4}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 text-sm"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors text-sm"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNoteForm(false)}
                    className="flex-1 px-3 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-medium transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Interview Info */}
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-6">
            <h3 className="font-bold text-emerald-900 dark:text-emerald-100 mb-3">Next Interview</h3>
            <p className="text-sm text-emerald-800 dark:text-emerald-200 mb-3">Screening Interview scheduled for Feb 20, 2025 at 10:00 AM</p>
            <button className="w-full px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-medium transition-colors text-sm">
              View Details
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
