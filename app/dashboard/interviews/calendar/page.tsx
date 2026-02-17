'use client';

import { useState } from 'react';
import { mockInterviews } from '@/lib/dummy-data';

interface Interview {
  id: string;
  candidateName: string;
  type: string;
  scheduledDate: string;
  scheduledTime: string;
  mode: 'Online' | 'Office';
  interviewer: string;
  videoLink: string | null;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  rating?: number;
  feedback?: string;
}

export default function InterviewCalendarPage() {
  const [interviews, setInterviews] = useState<Interview[]>(mockInterviews);
  const [selectedDate, setSelectedDate] = useState('2024-03-01');
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [formData, setFormData] = useState({
    candidateName: '',
    type: 'Technical',
    date: '',
    time: '',
    mode: 'Online',
    interviewer: '',
  });

  const dayInterviews = interviews.filter((i) => i.scheduledDate === selectedDate);

  const handleScheduleInterview = () => {
    if (formData.candidateName && formData.date && formData.time) {
      const newInterview: Interview = {
        id: (Math.max(...interviews.map((i) => parseInt(i.id))) + 1).toString(),
        candidateName: formData.candidateName,
        type: formData.type,
        scheduledDate: formData.date,
        scheduledTime: formData.time,
        mode: formData.mode as 'Online' | 'Office',
        interviewer: formData.interviewer,
        videoLink: formData.mode === 'Online' ? `https://meet.google.com/${Math.random().toString(36).substr(2, 9)}` : null,
        status: 'Scheduled',
      };
      setInterviews([...interviews, newInterview]);
      setFormData({
        candidateName: '',
        type: 'Technical',
        date: '',
        time: '',
        mode: 'Online',
        interviewer: '',
      });
      setShowScheduleForm(false);
    }
  };

  const getDatesInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const currentYear = 2024;
  const currentMonth = 2;
  const daysInMonth = getDatesInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Interview Calendar</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Schedule and manage interview activities</p>
        </div>
        <button
          onClick={() => setShowScheduleForm(!showScheduleForm)}
          className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
        >
          + Schedule Interview
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">March 2024</h3>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-xs font-semibold text-slate-600 dark:text-slate-400">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => (
              <button
                key={index}
                onClick={() => {
                  if (day) setSelectedDate(`2024-03-${String(day).padStart(2, '0')}`);
                }}
                className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  day === null
                    ? 'text-slate-400 dark:text-slate-600'
                    : selectedDate.includes(String(day).padStart(2, '0'))
                    ? 'bg-emerald-600 text-white'
                    : interviews.some((i) => i.scheduledDate === `2024-03-${String(day).padStart(2, '0')}`)
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Interviews for Selected Date & Schedule Form */}
        <div className="lg:col-span-2 space-y-6">
          {showScheduleForm ? (
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 space-y-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">Schedule New Interview</h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Candidate Name *
                  </label>
                  <input
                    type="text"
                    value={formData.candidateName}
                    onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                    placeholder="John Smith"
                    className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Time *
                    </label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Interview Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option>Technical</option>
                      <option>Behavioral</option>
                      <option>HR</option>
                      <option>Final Round</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Mode
                    </label>
                    <select
                      value={formData.mode}
                      onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Online">Online</option>
                      <option value="Office">Office</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Interviewer
                  </label>
                  <input
                    type="text"
                    value={formData.interviewer}
                    onChange={(e) => setFormData({ ...formData, interviewer: e.target.value })}
                    placeholder="Alex Kumar"
                    className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowScheduleForm(false)}
                    className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleScheduleInterview}
                    className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Schedule
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                Interviews - {selectedDate}
              </h3>

              {dayInterviews.length > 0 ? (
                <div className="space-y-3">
                  {dayInterviews.map((interview) => (
                    <div
                      key={interview.id}
                      className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-white">{interview.candidateName}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{interview.type} Interview</p>
                        </div>
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded ${
                            interview.status === 'Completed'
                              ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                              : interview.status === 'Scheduled'
                              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                              : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                          }`}
                        >
                          {interview.status}
                        </span>
                      </div>

                      <div className="text-sm text-slate-600 dark:text-slate-400 mb-3 space-y-1">
                        <p>🕐 {interview.scheduledTime}</p>
                        <p>{interview.mode === 'Online' ? '🌐 Online' : '📍 Office'} • Interviewer: {interview.interviewer}</p>
                      </div>

                      {interview.videoLink && interview.mode === 'Online' && (
                        <button className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline mb-3">
                          📹 Join Video Call
                        </button>
                      )}

                      {interview.status === 'Completed' && interview.feedback && (
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded p-3 text-sm">
                          <p className="text-slate-600 dark:text-slate-400 mb-1">Feedback:</p>
                          <p className="text-slate-900 dark:text-white">{interview.feedback}</p>
                          {interview.rating && (
                            <p className="mt-2">Rating: {'⭐'.repeat(Math.round(interview.rating))}</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                  <p>No interviews scheduled for this date</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
