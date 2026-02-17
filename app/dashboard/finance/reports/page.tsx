'use client';

import { useState } from 'react';

export default function FinancialReportsPage() {
  const [reportType, setReportType] = useState<'income-statement' | 'expense-statement' | 'profit-loss'>('income-statement');
  const [dateRange, setDateRange] = useState({
    startDate: '2024-01-01',
    endDate: '2024-02-28',
  });

  // Mock financial data
  const incomeStatement = {
    totalIncome: 125000,
    itemizedIncome: [
      { source: 'Consulting Services', amount: 50000 },
      { source: 'Product Sales', amount: 45000 },
      { source: 'Services', amount: 30000 },
    ],
  };

  const expenseStatement = {
    totalExpenses: 75000,
    itemizedExpenses: [
      { category: 'Salaries', amount: 40000 },
      { category: 'Office Rent', amount: 12000 },
      { category: 'Utilities', amount: 5000 },
      { category: 'Marketing', amount: 10000 },
      { category: 'Other', amount: 8000 },
    ],
  };

  const profitLoss = {
    totalIncome: incomeStatement.totalIncome,
    totalExpenses: expenseStatement.totalExpenses,
    grossProfit: incomeStatement.totalIncome - expenseStatement.totalExpenses,
  };

  const handleExport = (format: 'pdf' | 'csv') => {
    alert(`Report exported as ${format.toUpperCase()}`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Financial Reports</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Generate and export financial statements</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleExport('pdf')}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Export PDF
          </button>
          <button
            onClick={() => handleExport('csv')}
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

      {/* Report Type Selection */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Report Type</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { value: 'income-statement', label: 'Income Statement' },
              { value: 'expense-statement', label: 'Expense Statement' },
              { value: 'profit-loss', label: 'Profit & Loss' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setReportType(option.value as any)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  reportType === option.value
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <p className={`font-medium ${reportType === option.value ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
                  {option.label}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Start Date</label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
              className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">End Date</label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
              className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Report Content */}
      {reportType === 'income-statement' && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Income Statement</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Period: {dateRange.startDate} to {dateRange.endDate}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 dark:text-white">Revenue Sources</h3>
            {incomeStatement.itemizedIncome.map((item, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-700 dark:text-slate-300">{item.source}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">₹{item.amount.toLocaleString()}</span>
              </div>
            ))}
            <div className="flex justify-between items-center py-3 bg-slate-50 dark:bg-slate-700/50 px-4 rounded-lg font-bold">
              <span className="text-slate-900 dark:text-white">Total Income</span>
              <span className="text-emerald-600 dark:text-emerald-400">₹{incomeStatement.totalIncome.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {reportType === 'expense-statement' && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Expense Statement</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Period: {dateRange.startDate} to {dateRange.endDate}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 dark:text-white">Operating Expenses</h3>
            {expenseStatement.itemizedExpenses.map((item, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-700 dark:text-slate-300">{item.category}</span>
                <span className="text-red-600 dark:text-red-400 font-medium">₹{item.amount.toLocaleString()}</span>
              </div>
            ))}
            <div className="flex justify-between items-center py-3 bg-slate-50 dark:bg-slate-700/50 px-4 rounded-lg font-bold">
              <span className="text-slate-900 dark:text-white">Total Expenses</span>
              <span className="text-red-600 dark:text-red-400">₹{expenseStatement.totalExpenses.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {reportType === 'profit-loss' && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Profit & Loss Statement</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Period: {dateRange.startDate} to {dateRange.endDate}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-700">
              <span className="text-slate-700 dark:text-slate-300">Total Revenue</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">₹{profitLoss.totalIncome.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-700">
              <span className="text-slate-700 dark:text-slate-300">Total Expenses</span>
              <span className="text-red-600 dark:text-red-400 font-medium">-₹{profitLoss.totalExpenses.toLocaleString()}</span>
            </div>

            <div
              className={`flex justify-between items-center py-4 px-4 rounded-lg font-bold ${
                profitLoss.grossProfit > 0
                  ? 'bg-emerald-50 dark:bg-emerald-900/20'
                  : 'bg-red-50 dark:bg-red-900/20'
              }`}
            >
              <span className={profitLoss.grossProfit > 0 ? 'text-emerald-900 dark:text-emerald-200' : 'text-red-900 dark:text-red-200'}>
                Net Profit / Loss
              </span>
              <span className={profitLoss.grossProfit > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}>
                ₹{profitLoss.grossProfit.toLocaleString()}
              </span>
            </div>

            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Profit Margin:</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {((profitLoss.grossProfit / profitLoss.totalIncome) * 100).toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Summary Table */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Financial Summary</h3>
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-slate-700 dark:text-slate-300">Metric</th>
              <th className="text-right px-4 py-3 font-medium text-slate-700 dark:text-slate-300">Amount</th>
              <th className="text-right px-4 py-3 font-medium text-slate-700 dark:text-slate-300">Percentage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            <tr>
              <td className="px-4 py-3 text-slate-900 dark:text-white">Total Income</td>
              <td className="px-4 py-3 text-right text-emerald-600 dark:text-emerald-400 font-medium">₹{incomeStatement.totalIncome.toLocaleString()}</td>
              <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-400">100%</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-slate-900 dark:text-white">Total Expenses</td>
              <td className="px-4 py-3 text-right text-red-600 dark:text-red-400 font-medium">₹{expenseStatement.totalExpenses.toLocaleString()}</td>
              <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-400">
                {((expenseStatement.totalExpenses / incomeStatement.totalIncome) * 100).toFixed(1)}%
              </td>
            </tr>
            <tr className="bg-slate-50 dark:bg-slate-700/50">
              <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">Net Profit</td>
              <td className="px-4 py-3 text-right font-bold text-emerald-600 dark:text-emerald-400">
                ₹{profitLoss.grossProfit.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-right font-bold text-slate-900 dark:text-white">
                {((profitLoss.grossProfit / incomeStatement.totalIncome) * 100).toFixed(1)}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
