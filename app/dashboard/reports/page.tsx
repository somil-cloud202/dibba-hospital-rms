'use client';

export default function ReportsPage() {
  const reports = [
    { title: 'Recruitment Pipeline', description: 'Overview of candidates at each stage', type: 'Dashboard', updated: '2025-02-17' },
    { title: 'Hiring Metrics', description: 'Time-to-hire, cost-per-hire, and other KPIs', type: 'Analytics', updated: '2025-02-17' },
    { title: 'Department Headcount', description: 'Current staffing levels by department', type: 'Report', updated: '2025-02-16' },
    { title: 'Candidate Source Analysis', description: 'Where candidates are coming from', type: 'Analytics', updated: '2025-02-15' },
    { title: 'Interview Feedback', description: 'Compiled feedback from all interviews', type: 'Report', updated: '2025-02-14' },
    { title: 'Payroll Summary', description: 'Monthly payroll and salary information', type: 'Finance', updated: '2025-02-14' },
  ];

  const typeColors = {
    Dashboard: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    Analytics: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    Report: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
    Finance: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Reports & Analytics</h1>
        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
          + Generate Report
        </button>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report, idx) => (
          <div
            key={idx}
            className="p-6 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{report.title}</h3>
              <span className={`px-2 py-1 rounded text-xs font-semibold ${typeColors[report.type as keyof typeof typeColors]}`}>
                {report.type}
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{report.description}</p>
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
              <span className="text-xs text-slate-500 dark:text-slate-500">Updated: {report.updated}</span>
              <button className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm font-medium">
                View →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
