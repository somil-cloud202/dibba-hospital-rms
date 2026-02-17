'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PayrollPage() {
  const [selectedPayPeriod, setSelectedPayPeriod] = useState('2025-02');
  const [payrollRecords] = useState([
    {
      id: 1,
      employee: 'John Smith',
      position: 'Senior Developer',
      baseSalary: 145000,
      bonus: 5000,
      deductions: 3200,
      netPay: 11875,
      status: 'Paid',
      paidDate: '2025-02-01',
    },
    {
      id: 2,
      employee: 'Sarah Johnson',
      position: 'Product Manager',
      baseSalary: 135000,
      bonus: 3000,
      deductions: 2850,
      netPay: 11287,
      status: 'Pending',
      paidDate: '2025-02-15',
    },
    {
      id: 3,
      employee: 'Mike Chen',
      position: 'UI Designer',
      baseSalary: 105000,
      bonus: 2000,
      deductions: 2200,
      netPay: 8816,
      status: 'Paid',
      paidDate: '2025-02-01',
    },
    {
      id: 4,
      employee: 'Emma Davis',
      position: 'Data Analyst',
      baseSalary: 120000,
      bonus: 2500,
      deductions: 2600,
      netPay: 10091,
      status: 'Paid',
      paidDate: '2025-02-01',
    },
  ]);

  const payPeriods = ['2025-01', '2025-02', '2025-03'];

  const totalPayroll = payrollRecords.reduce((acc, record) => acc + record.netPay, 0);
  const paidPayroll = payrollRecords.filter((r) => r.status === 'Paid').reduce((acc, record) => acc + record.netPay, 0);
  const pendingPayroll = payrollRecords.filter((r) => r.status === 'Pending').reduce((acc, record) => acc + record.netPay, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Payroll Management</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage employee salaries and payments</p>
        </div>
        <Link
          href="/dashboard/finance/payroll/new"
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
        >
          + Process Payroll
        </Link>
      </div>

      {/* Pay Period Selector */}
      <div className="flex gap-4">
        {payPeriods.map((period) => (
          <button
            key={period}
            onClick={() => setSelectedPayPeriod(period)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedPayPeriod === period
                ? 'bg-emerald-600 text-white'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:border-emerald-500'
            }`}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
          <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100 mb-1">Total Payroll</p>
          <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">${totalPayroll.toLocaleString()}</p>
        </div>
        <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">Paid</p>
          <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">${paidPayroll.toLocaleString()}</p>
        </div>
        <div className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
          <p className="text-sm font-medium text-amber-900 dark:text-amber-100 mb-1">Pending</p>
          <p className="text-3xl font-bold text-amber-700 dark:text-amber-400">${pendingPayroll.toLocaleString()}</p>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Employee</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Position</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-slate-900 dark:text-slate-100">Base Salary</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-slate-900 dark:text-slate-100">Bonus</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-slate-900 dark:text-slate-100">Deductions</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-slate-900 dark:text-slate-100">Net Pay</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payrollRecords.map((record) => (
                <tr key={record.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-6 py-4 text-slate-900 dark:text-white font-medium">{record.employee}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{record.position}</td>
                  <td className="px-6 py-4 text-right text-slate-900 dark:text-white">${(record.baseSalary / 12).toFixed(2)}</td>
                  <td className="px-6 py-4 text-right text-slate-900 dark:text-white">${(record.bonus / 12).toFixed(2)}</td>
                  <td className="px-6 py-4 text-right text-slate-900 dark:text-white">${record.deductions}</td>
                  <td className="px-6 py-4 text-right text-slate-900 dark:text-white font-bold">${record.netPay}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      record.status === 'Paid'
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                        : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm font-medium">
                      View
                    </button>
                    {record.status === 'Pending' && (
                      <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Employees</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{payrollRecords.length}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Base Salary</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              ${(payrollRecords.reduce((acc, r) => acc + r.baseSalary, 0) / 12).toFixed(0)}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Bonuses</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              ${(payrollRecords.reduce((acc, r) => acc + r.bonus, 0) / 12).toFixed(0)}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Deductions</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              ${payrollRecords.reduce((acc, r) => acc + r.deductions, 0).toFixed(0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
