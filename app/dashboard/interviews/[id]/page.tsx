'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function InterviewDetailPage({ params }: { params: { id: string } }) {
  const [feedback, setFeedback] = useState({
    overall: 4,
    technicalSkills: 4,
    communication: 5,
    culture: 3,
    comments: '',
  });
  const [submitted, setSubmitted] = useState(false);

  // Mock interview data
  const interview = {
    id: params.id,
    candidate: 'John Smith',
    position: 'Senior Developer',
    interviewType: 'Technical Interview',
    interviewer: 'Bob Wilson',
    date: '2025-02-20',
    time: '10:00 AM',
    duration: '60 minutes',
    location: 'Zoom',
    meetingLink: 'https://zoom.us/j/123456789',
    status: 'Completed',
    feedbackReceived: false,
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    alert('Feedback submitted successfully!');
  };

  const RatingSelector = ({ label, value, onChange }: any) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-slate-900 dark:text-white mb-3">
        {label}
      </label>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onChange(star)}
            className={`w-10 h-10 rounded-lg font-bold transition-colors ${
              star <= value
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            {star}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Link */}
      <Link href="/dashboard/interviews" className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-2">
        ← Back to Interviews
      </Link>

      {/* Interview Header */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{interview.candidate}</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">{interview.position} • {interview.interviewType}</p>
          </div>
          <span className="px-4 py-2 rounded-full text-sm font-semibold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
            {interview.status}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold mb-1">Interviewer</p>
            <p className="text-slate-900 dark:text-white font-medium">{interview.interviewer}</p>
          </div>
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold mb-1">Date & Time</p>
            <p className="text-slate-900 dark:text-white">{interview.date} at {interview.time}</p>
          </div>
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold mb-1">Duration</p>
            <p className="text-slate-900 dark:text-white">{interview.duration}</p>
          </div>
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400 uppercase font-semibold mb-1">Location</p>
            <p className="text-slate-900 dark:text-white">{interview.location}</p>
          </div>
        </div>

        {interview.status === 'Completed' && (
          <a
            href={interview.meetingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            View Recording
          </a>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feedback Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Interview Feedback</h2>

            {submitted ? (
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg text-emerald-900 dark:text-emerald-100">
                <p className="font-bold mb-2">Thank you!</p>
                <p>Your feedback has been recorded and shared with the hiring team.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitFeedback} className="space-y-6">
                <RatingSelector
                  label="Overall Assessment"
                  value={feedback.overall}
                  onChange={(val: number) => setFeedback({ ...feedback, overall: val })}
                />

                <RatingSelector
                  label="Technical Skills"
                  value={feedback.technicalSkills}
                  onChange={(val: number) => setFeedback({ ...feedback, technicalSkills: val })}
                />

                <RatingSelector
                  label="Communication Skills"
                  value={feedback.communication}
                  onChange={(val: number) => setFeedback({ ...feedback, communication: val })}
                />

                <RatingSelector
                  label="Culture Fit"
                  value={feedback.culture}
                  onChange={(val: number) => setFeedback({ ...feedback, culture: val })}
                />

                <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-white mb-3">
                    Additional Comments
                  </label>
                  <textarea
                    value={feedback.comments}
                    onChange={(e) => setFeedback({ ...feedback, comments: e.target.value })}
                    placeholder="Provide detailed feedback about the candidate's performance..."
                    rows={6}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Submit Feedback
                  </button>
                  <button
                    type="button"
                    className="px-6 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-medium transition-colors"
                  >
                    Save as Draft
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Sidebar - Candidate Info & Actions */}
        <aside className="space-y-6">
          {/* Candidate Quick Info */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Candidate Details</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-slate-600 dark:text-slate-400 mb-1">Position Applied</p>
                <p className="text-slate-900 dark:text-white font-medium">{interview.position}</p>
              </div>
              <div>
                <p className="text-slate-600 dark:text-slate-400 mb-1">Interview Type</p>
                <p className="text-slate-900 dark:text-white font-medium">{interview.interviewType}</p>
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors text-sm">
                View Full Profile
              </button>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-3">Next Steps</h3>
            <ol className="space-y-2 text-sm text-blue-800 dark:text-blue-200 list-decimal list-inside">
              <li>Complete your feedback</li>
              <li>Wait for other interviewers' feedback</li>
              <li>Schedule debrief meeting</li>
              <li>Make hiring decision</li>
            </ol>
          </div>
        </aside>
      </div>
    </div>
  );
}
