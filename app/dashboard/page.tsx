'use client';

import Link from 'next/link';

export default function DashboardHome() {
  const stats = [
    { label: 'Active Jobs', value: '12', color: 'emerald', icon: '💼' },
    { label: 'Total Candidates', value: '248', color: 'blue', icon: '👥' },
    { label: 'Pending Applications', value: '34', color: 'amber', icon: '📝' },
    { label: 'Interviews This Week', value: '8', color: 'purple', icon: '🎤' },
  ];

  const recentApplications = [
    { id: 1, name: 'John Smith', position: 'Senior Developer', status: 'Interview', date: '2025-02-15' },
    { id: 2, name: 'Sarah Johnson', position: 'Product Manager', status: 'Screening', date: '2025-02-14' },
    { id: 3, name: 'Mike Chen', position: 'UI Designer', status: 'Applied', date: '2025-02-13' },
    { id: 4, name: 'Emma Davis', position: 'Data Analyst', status: 'Interview', date: '2025-02-12' },
  ];

  const colorMap = {
    emerald: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  };

  const statusColors = {
    Applied: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300',
    Screening: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    Interview: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    Offer: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`p-6 rounded-lg border border-slate-200 dark:border-slate-700 ${
              colorMap[stat.color as keyof typeof colorMap]
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium opacity-75">{stat.label}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
              <span className="text-4xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/dashboard/jobs"
          className="p-6 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors"
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Post New Job</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Create and manage job listings</p>
          <div className="mt-4 text-emerald-600 dark:text-emerald-400 font-medium text-sm">Go →</div>
        </Link>

        <Link
          href="/dashboard/candidates"
          className="p-6 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors"
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Browse Candidates</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">View and manage candidate profiles</p>
          <div className="mt-4 text-emerald-600 dark:text-emerald-400 font-medium text-sm">Go →</div>
        </Link>

        <Link
          href="/dashboard/interviews"
          className="p-6 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors"
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Schedule Interviews</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Manage interview schedules</p>
          <div className="mt-4 text-emerald-600 dark:text-emerald-400 font-medium text-sm">Go →</div>
        </Link>
      </div>

      {/* Recent Applications */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Applications</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Candidate</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Position</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentApplications.map((app) => (
                <tr key={app.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-6 py-4 text-slate-900 dark:text-white font-medium">{app.name}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{app.position}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[app.status as keyof typeof statusColors]}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{app.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
