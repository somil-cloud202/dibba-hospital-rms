'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    companyName: 'Acme Corporation',
    email: 'admin@acme.com',
    phone: '+1 (555) 123-4567',
  });

  const tabs = [
    { id: 'general', label: 'General Settings' },
    { id: 'team', label: 'Team Management' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'notifications', label: 'Notifications' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>

      {/* Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-700 flex gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-medium transition-colors border-b-2 ${
              activeTab === tab.id
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* General Settings Tab */}
      {activeTab === 'general' && (
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Company Name
            </label>
            <input
              type="text"
              value={settings.companyName}
              onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          <button className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
            Save Changes
          </button>
        </div>
      )}

      {/* Team Management Tab */}
      {activeTab === 'team' && (
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Team Members</h3>
          <div className="space-y-4">
            {[
              { name: 'Alice Brown', role: 'HR Manager', email: 'alice@acme.com' },
              { name: 'Bob Wilson', role: 'Recruiter', email: 'bob@acme.com' },
              { name: 'Carol Davis', role: 'Team Lead', email: 'carol@acme.com' },
            ].map((member, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{member.name}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{member.email}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 rounded text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                    {member.role}
                  </span>
                  <button className="text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
            + Add Team Member
          </button>
        </div>
      )}

      {/* Integrations Tab */}
      {activeTab === 'integrations' && (
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Available Integrations</h3>
          <div className="space-y-4">
            {[
              { name: 'Slack', status: 'Connected', icon: '💬' },
              { name: 'Google Calendar', status: 'Not Connected', icon: '📅' },
              { name: 'Email Sync', status: 'Connected', icon: '📧' },
            ].map((integration, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{integration.icon}</span>
                  <p className="font-medium text-slate-900 dark:text-white">{integration.name}</p>
                </div>
                <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  integration.status === 'Connected'
                    ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-red-200 dark:hover:bg-red-900/30'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}>
                  {integration.status === 'Connected' ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Notification Preferences</h3>
          {[
            { label: 'Email notifications', description: 'Receive email updates about applications' },
            { label: 'Interview reminders', description: 'Get reminded before scheduled interviews' },
            { label: 'Weekly digest', description: 'Receive a summary of weekly activities' },
          ].map((pref, idx) => (
            <label key={idx} className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked={idx < 2}
                className="mt-1 w-4 h-4 bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded accent-emerald-600"
              />
              <div>
                <p className="font-medium text-slate-900 dark:text-white">{pref.label}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{pref.description}</p>
              </div>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
