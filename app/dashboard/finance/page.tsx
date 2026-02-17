'use client';

import { useState } from 'react';

export default function FinancePage() {
  const [payroll] = useState([
    { id: 1, employee: 'John Smith', position: 'Senior Developer', salary: '$145,000', status: 'Paid', date: '2025-02-01' },
    { id: 2, employee: 'Sarah Johnson', position: 'Product Manager', salary: '$135,000', status: 'Pending', date: '2025-02-15' },
    { id: 3, employee: 'Mike Chen', position: 'UI Designer', salary: '$105,000', status: 'Paid', date: '2025-02-01' },
  ]);

  const stats = [
    { label: 'Monthly Payroll', value: '$385,000', color: 'emerald' },
    { label: 'Active Employees', value: '28', color: 'blue' },
    { label: 'Pending Payments', value: '$135,000', color: 'amber' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className={`p-6 rounded-lg border border-slate-200 dark:border-slate-700 ${
            stat.color === 'emerald' ? 'bg-emerald-50 dark:bg-emerald-900/20' :
            stat.color === 'blue' ? 'bg-blue-50 dark:bg-blue-900/20' :
            'bg-amber-50 dark:bg-amber-900/20'
          }`}>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.label}</p>
            <p className={`text-3xl font-bold mt-2 ${
              stat.color === 'emerald' ? 'text-emerald-700 dark:text-emerald-400' :
              stat.color === 'blue' ? 'text-blue-700 dark:text-blue-400' :
              'text-amber-700 dark:text-amber-400'
            }`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Payroll Management */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Payroll Management</h3>
          <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors text-sm">
            + Process Payroll
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Employee</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Position</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Salary</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payroll.map((record) => (
                <tr key={record.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-6 py-4 text-slate-900 dark:text-white font-medium">{record.employee}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{record.position}</td>
                  <td className="px-6 py-4 text-slate-900 dark:text-white font-medium">{record.salary}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      record.status === 'Paid' 
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                        : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{record.date}</td>
                  <td className="px-6 py-4">
                    <button className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
