'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ScheduleInterviewPage() {
  const [formData, setFormData] = useState({
    candidate: '',
    position: '',
    interviewType: 'Phone Screen',
    interviewer: '',
    date: '',
    time: '',
    duration: '60',
    location: 'Virtual',
    notes: '',
  });

  const candidates = [
    { id: 1, name: 'John Smith', position: 'Senior Developer' },
    { id: 2, name: 'Sarah Johnson', position: 'Product Manager' },
    { id: 3, name: 'Mike Chen', position: 'UI Designer' },
  ];

  const interviewers = [
    { id: 1, name: 'Alice Brown', department: 'HR' },
    { id: 2, name: 'Bob Wilson', department: 'Engineering' },
    { id: 3, name: 'Carol Davis', department: 'Hiring' },
  ];

  const interviewTypes = [
    'Phone Screen',
    'Technical Assessment',
    'Behavioral Interview',
    'Case Study',
    'Final Interview',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Interview scheduled successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/dashboard/interviews" className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-2">
          ← Back to Interviews
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Schedule Interview</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Candidate Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Candidate *
              </label>
              <select
                value={formData.candidate}
                onChange={(e) => {
                  const selected = candidates.find((c) => c.id.toString() === e.target.value);
                  setFormData({
                    ...formData,
                    candidate: e.target.value,
                    position: selected?.position || '',
                  });
                }}
                required
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="">Select Candidate</option>
                {candidates.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Position
              </label>
              <input
                type="text"
                value={formData.position}
                disabled
                className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-600 dark:text-slate-400"
              />
            </div>
          </div>

          {/* Interview Type & Interviewer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Interview Type *
              </label>
              <select
                value={formData.interviewType}
                onChange={(e) => setFormData({ ...formData, interviewType: e.target.value })}
                required
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              >
                {interviewTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Interviewer *
              </label>
              <select
                value={formData.interviewer}
                onChange={(e) => setFormData({ ...formData, interviewer: e.target.value })}
                required
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="">Select Interviewer</option>
                {interviewers.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.name} ({i.department})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Date *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Time *
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Duration (minutes) *
              </label>
              <select
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">60 minutes</option>
                <option value="90">90 minutes</option>
                <option value="120">120 minutes</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Location/Video Link *
            </label>
            <select
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 mb-2"
            >
              <option value="Virtual">Virtual (Zoom)</option>
              <option value="Zoom">Zoom Link</option>
              <option value="Teams">Microsoft Teams</option>
              <option value="GoogleMeet">Google Meet</option>
              <option value="Phone">Phone Call</option>
              <option value="In-Person">In-Person</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Interview Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Add any special instructions or notes for the interview..."
              rows={4}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
            <button
              type="submit"
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
            >
              Schedule Interview
            </button>
            <Link
              href="/dashboard/interviews"
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
