'use client';

import { useState } from 'react';
import { mockJobs, mockApplications, mockCandidates } from '@/lib/dummy-data';

interface ReportMetrics {
  totalApplications: number;
  activeJobs: number;
  hiredCandidates: number;
  timeToHire: number;
  conversionRate: number;
  recruiterPerformance: Array<{ name: string; hired: number; pending: number }>;
  applicationsByStatus: Record<string, number>;
  applicationsBySource: Record<string, number>;
  applicationsByJob: Array<{ job: string; count: number }>;
}

export default function RMSReportingPage() {
  const [selectedMetric, setSelectedMetric] = useState<'overview' | 'applications' | 'recruiter' | 'source'>('overview');

  // Mock metrics calculation
  const metrics: ReportMetrics = {
    totalApplications: mockApplications.length,
    activeJobs: mockJobs.filter((j) => j.status === 'Active').length,
    hiredCandidates: 8,
    timeToHire: 24,
    conversionRate: 2.5,
    recruiterPerformance: [
      { name: 'Sarah Wilson', hired: 5, pending: 12 },
      { name: 'Tom Harris', hired: 3, pending: 8 },
      { name: 'Jessica Lee', hired: 0, pending: 15 },
    ],
    applicationsByStatus: {
      Applied: 15,
      'Under Review': 8,
      Shortlisted: 5,
      'Interview Scheduled': 3,
      'Offer Extended': 2,
      Hired: 8,
      Rejected: 10,
    },
    applicationsBySource: {
      LinkedIn: 18,
      Indeed: 12,
      'Company Website': 15,
      Referral: 10,
    },
    applicationsByJob: [
      { job: 'Senior React Developer', count: 24 },
      { job: 'Product Manager', count: 18 },
      { job: 'UX/UI Designer', count: 32 },
      { job: 'Data Analyst', count: 45 },
    ],
  };

  const downloadCSV = (data: any[], filename: string) => {
    const csv = [
      Object.keys(data[0]).join(','),
      ...data.map((row) => Object.values(row).join(',')),
    ].join('\n');

    const element = document.createElement('a');
    element.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`);
    element.setAttribute('download', filename);
    element.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">RMS Analytics</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Recruitment performance metrics and insights</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => downloadCSV(mockApplications, 'recruitment-report.csv')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Export CSV
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Print
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-700 flex gap-4 overflow-x-auto">
        {(['overview', 'applications', 'recruiter', 'source'] as const).map((metric) => (
          <button
            key={metric}
            onClick={() => setSelectedMetric(metric)}
            className={`px-4 py-2 font-medium border-b-2 transition-colors whitespace-nowrap ${
              selectedMetric === metric
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
          >
            {metric.charAt(0).toUpperCase() + metric.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {selectedMetric === 'overview' && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <p className="text-slate-600 dark:text-slate-400 text-sm">Total Applications</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{metrics.totalApplications}</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">↑ 12% this month</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <p className="text-slate-600 dark:text-slate-400 text-sm">Active Jobs</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{metrics.activeJobs}</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">Openings</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <p className="text-slate-600 dark:text-slate-400 text-sm">Hired This Month</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{metrics.hiredCandidates}</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">Placements</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <p className="text-slate-600 dark:text-slate-400 text-sm">Time to Hire</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{metrics.timeToHire}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">days (avg)</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <p className="text-slate-600 dark:text-slate-400 text-sm">Conversion Rate</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{metrics.conversionRate}%</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">Applied → Hired</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Applications by Status */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Applications by Status</h3>
              <div className="space-y-3">
                {Object.entries(metrics.applicationsByStatus).map(([status, count]) => (
                  <div key={status}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-700 dark:text-slate-300">{status}</span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{count}</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-emerald-600 h-2 rounded-full"
                        style={{
                          width: `${(count / metrics.totalApplications) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Time to Hire Trend */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">6-Month Trend</h3>
              <div className="flex items-end gap-2 h-40">
                {[28, 26, 24, 22, 20, 24].map((value, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center justify-end">
                    <div className="w-full bg-blue-600 rounded-t" style={{ height: `${(value / 30) * 100}%` }}></div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">M{index + 9}</p>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-4">Average Time to Hire (Days)</p>
            </div>
          </div>
        </div>
      )}

      {/* Applications Tab */}
      {selectedMetric === 'applications' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Applications by Job */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Applications by Job</h3>
              <div className="space-y-3">
                {metrics.applicationsByJob.map((item) => (
                  <div key={item.job}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-700 dark:text-slate-300 truncate">{item.job}</span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{item.count}</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${(item.count / 45) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Applications by Source */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Applications by Source</h3>
              <div className="space-y-3">
                {Object.entries(metrics.applicationsBySource).map(([source, count]) => (
                  <div key={source}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-700 dark:text-slate-300">{source}</span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{count}</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{
                          width: `${(count / 55) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recruiter Performance Tab */}
      {selectedMetric === 'recruiter' && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Recruiter Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-700 dark:text-slate-300">Recruiter</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-700 dark:text-slate-300">Hired</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-700 dark:text-slate-300">Pending</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-700 dark:text-slate-300">Success Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {metrics.recruiterPerformance.map((recruiter) => (
                  <tr key={recruiter.name} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="px-4 py-4 font-medium text-slate-900 dark:text-white">{recruiter.name}</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                        {recruiter.hired}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                        {recruiter.pending}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {((recruiter.hired / (recruiter.hired + recruiter.pending)) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Source Tab - Placeholder for custom analysis */}
      {selectedMetric === 'source' && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Custom Report Generator</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Select Date Range</label>
              <input type="date" className="px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg" />
            </div>
            <button className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
              Generate Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
