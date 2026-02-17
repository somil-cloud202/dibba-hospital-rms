'use client';

import { useState } from 'react';
import { emailTemplates } from '@/lib/dummy-data';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
}

interface SentEmail {
  id: string;
  to: string[];
  template: string;
  sentDate: string;
  status: 'Sent' | 'Pending' | 'Failed';
  count: number;
}

export default function EmailCommunicationPage() {
  const [templates, setTemplates] = useState<EmailTemplate[]>(emailTemplates);
  const [sentEmails, setSentEmails] = useState<SentEmail[]>([
    {
      id: '1',
      to: ['john.smith@email.com', 'sarah.johnson@email.com'],
      template: 'Interview Invitation',
      sentDate: '2024-02-20',
      status: 'Sent',
      count: 2,
    },
  ]);

  const [activeTab, setActiveTab] = useState<'templates' | 'sent' | 'compose'>('templates');
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showCompose, setShowCompose] = useState(false);
  const [composeData, setComposeData] = useState({
    recipients: '',
    template: '',
    subject: '',
    body: '',
    count: 0,
  });

  const handleSendBulkEmail = () => {
    if (composeData.template && composeData.recipients) {
      const recipients = composeData.recipients.split(',').map((r) => r.trim());
      const newEmail: SentEmail = {
        id: (Math.max(...sentEmails.map((e) => parseInt(e.id)), 0) + 1).toString(),
        to: recipients,
        template: templates.find((t) => t.id === composeData.template)?.name || '',
        sentDate: new Date().toISOString().split('T')[0],
        status: 'Sent',
        count: recipients.length,
      };
      setSentEmails([newEmail, ...sentEmails]);
      setComposeData({
        recipients: '',
        template: '',
        subject: '',
        body: '',
        count: 0,
      });
      setShowCompose(false);
    }
  };

  const handleSelectTemplate = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setShowPreview(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Email Communication</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage templates and track email communications</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-700 flex gap-4">
        {(['templates', 'sent', 'compose'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div key={template.id} className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{template.name}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{template.subject}</p>
              <p className="text-sm text-slate-500 dark:text-slate-500 line-clamp-2 mb-4">{template.body}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleSelectTemplate(template)}
                  className="flex-1 px-3 py-2 border border-emerald-600 text-emerald-600 dark:text-emerald-400 dark:border-emerald-500 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors text-sm"
                >
                  Preview
                </button>
                <button
                  onClick={() => {
                    setComposeData({ ...composeData, template: template.id });
                    setActiveTab('compose');
                  }}
                  className="flex-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm"
                >
                  Use
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sent Tab */}
      {activeTab === 'sent' && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Template</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Recipients</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Sent Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {sentEmails.map((email) => (
                <tr key={email.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{email.template}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{email.count} recipients</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{email.sentDate}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        email.status === 'Sent'
                          ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                          : email.status === 'Pending'
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      }`}
                    >
                      {email.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Compose Tab */}
      {activeTab === 'compose' && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 space-y-4">
          <h3 className="font-semibold text-slate-900 dark:text-white">Send Bulk Email</h3>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Template *</label>
            <select
              value={composeData.template}
              onChange={(e) => setComposeData({ ...composeData, template: e.target.value })}
              className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Select a template...</option>
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Recipients *</label>
            <textarea
              value={composeData.recipients}
              onChange={(e) => setComposeData({ ...composeData, recipients: e.target.value })}
              placeholder="Enter email addresses separated by commas"
              className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 h-20"
            />
            {composeData.recipients && (
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                {composeData.recipients.split(',').filter((r) => r.trim()).length} recipients
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setActiveTab('templates')}
              className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSendBulkEmail}
              disabled={!composeData.template || !composeData.recipients}
              className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
            >
              Send to {composeData.recipients ? composeData.recipients.split(',').filter((r) => r.trim()).length : '0'} Recipients
            </button>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg max-w-2xl w-full">
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{selectedTemplate.name}</h3>
                </div>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-700 pt-4 space-y-3">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Subject:</p>
                  <p className="font-medium text-slate-900 dark:text-white">{selectedTemplate.subject}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Body:</p>
                  <p className="text-slate-900 dark:text-white whitespace-pre-wrap">{selectedTemplate.body}</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setShowPreview(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setComposeData({ ...composeData, template: selectedTemplate.id });
                    setShowPreview(false);
                    setActiveTab('compose');
                  }}
                  className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
                >
                  Use This Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
