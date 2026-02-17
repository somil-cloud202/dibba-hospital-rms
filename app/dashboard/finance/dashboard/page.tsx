'use client';

import { useState } from 'react';
import { mockFinance } from '@/lib/dummy-data';

export default function FinanceDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'income' | 'expense' | 'budget'>('overview');

  const currentMonthIncome = mockFinance.income.reduce((sum, i) => sum + i.amount, 0);
  const currentMonthExpense = mockFinance.expenses.reduce((sum, e) => sum + e.amount, 0);
  const netProfit = currentMonthIncome - currentMonthExpense;
  const budgetRemaining = 20000;

  // Mock 6-month trend data
  const sixMonthTrend = [
    { month: 'Sep', income: 45000, expense: 32000 },
    { month: 'Oct', income: 52000, expense: 38000 },
    { month: 'Nov', income: 48000, expense: 35000 },
    { month: 'Dec', income: 58000, expense: 42000 },
    { month: 'Jan', income: 55000, expense: 40000 },
    { month: 'Feb', income: currentMonthIncome, expense: currentMonthExpense },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Finance Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Monitor income, expenses, and cash flow</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-700 flex gap-4">
        {(['overview', 'income', 'expense', 'budget'] as const).map((tab) => (
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

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <p className="text-slate-600 dark:text-slate-400 text-sm">Current Month Income</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">₹{currentMonthIncome.toLocaleString()}</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">↑ 8% vs last month</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <p className="text-slate-600 dark:text-slate-400 text-sm">Current Month Expense</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">₹{currentMonthExpense.toLocaleString()}</p>
              <p className="text-xs text-red-600 dark:text-red-400 mt-2">↑ 3% vs last month</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <p className="text-slate-600 dark:text-slate-400 text-sm">Net Profit/Loss</p>
              <p className={`text-3xl font-bold mt-2 ${netProfit > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                ₹{netProfit.toLocaleString()}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">Margin: {((netProfit / currentMonthIncome) * 100).toFixed(1)}%</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <p className="text-slate-600 dark:text-slate-400 text-sm">Budget Remaining</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">₹{budgetRemaining.toLocaleString()}</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">Q1 Budget</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Income vs Expense Trend */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Income vs Expense (6 months)</h3>
              <div className="flex items-end gap-4 h-40">
                {sixMonthTrend.map((item, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end gap-2">
                    <div className="flex items-end gap-1 h-32">
                      <div
                        className="bg-emerald-600 rounded-t w-4"
                        style={{ height: `${(item.income / 60000) * 100}%` }}
                      ></div>
                      <div
                        className="bg-red-600 rounded-t w-4"
                        style={{ height: `${(item.expense / 60000) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{item.month}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-600 rounded"></div>
                  <span>Income</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-600 rounded"></div>
                  <span>Expense</span>
                </div>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Expense Breakdown</h3>
              <div className="space-y-3">
                {[
                  { category: 'Salaries', amount: 35000, percentage: 60 },
                  { category: 'Software', amount: 5000, percentage: 10 },
                  { category: 'Office', amount: 7500, percentage: 15 },
                  { category: 'Other', amount: 2500, percentage: 15 },
                ].map((item) => (
                  <div key={item.category}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-slate-700 dark:text-slate-300">{item.category}</span>
                      <span className="text-sm font-medium">₹{item.amount.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Recent Transactions</h3>
            <div className="space-y-3">
              {[...mockFinance.income.slice(0, 2), ...mockFinance.expenses.slice(0, 2)].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-slate-700">
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {'category' in item ? item.category : item.category}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.date}</p>
                  </div>
                  <span className={`font-medium ${item.category ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                    {item.category ? '-' : '+'}₹{item.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Income Tab */}
      {activeTab === 'income' && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Income Transactions</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-slate-700 dark:text-slate-300">Date</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-700 dark:text-slate-300">Category</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-700 dark:text-slate-300">Client</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-700 dark:text-slate-300">Amount</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-700 dark:text-slate-300">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {mockFinance.income.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="px-4 py-3 text-slate-900 dark:text-white">{item.date}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{item.category}</td>
                    <td className="px-4 py-3 text-slate-900 dark:text-white">{item.clientName}</td>
                    <td className="px-4 py-3 font-medium text-emerald-600 dark:text-emerald-400">+₹{item.amount.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        item.status === 'Approved'
                          ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                          : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Expense Tab */}
      {activeTab === 'expense' && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Expense Transactions</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-slate-700 dark:text-slate-300">Date</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-700 dark:text-slate-300">Category</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-700 dark:text-slate-300">Vendor</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-700 dark:text-slate-300">Amount</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-700 dark:text-slate-300">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {mockFinance.expenses.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="px-4 py-3 text-slate-900 dark:text-white">{item.date}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{item.category}</td>
                    <td className="px-4 py-3 text-slate-900 dark:text-white">{item.vendor}</td>
                    <td className="px-4 py-3 font-medium text-red-600 dark:text-red-400">-₹{item.amount.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        item.status === 'Approved'
                          ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                          : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Budget Tab */}
      {activeTab === 'budget' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Budget vs Actual</h3>
            <div className="space-y-4">
              {[
                { category: 'Salaries', budget: 40000, actual: 35000 },
                { category: 'Marketing', budget: 15000, actual: 12000 },
                { category: 'Operations', budget: 10000, actual: 9500 },
                { category: 'Technology', budget: 8000, actual: 5000 },
              ].map((item) => {
                const utilization = (item.actual / item.budget) * 100;
                const exceeded = utilization > 100;
                return (
                  <div key={item.category} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-slate-900 dark:text-white">{item.category}</span>
                      <span className={`text-sm font-medium ${exceeded ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                        {utilization.toFixed(1)}% used
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${exceeded ? 'bg-red-600' : 'bg-emerald-600'}`}
                        style={{ width: `${Math.min(utilization, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-slate-600 dark:text-slate-400">
                      <span>Budget: ₹{item.budget.toLocaleString()}</span>
                      <span>Actual: ₹{item.actual.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
