'use client';

import { useState } from 'react';
import { mockFinance } from '@/lib/dummy-data';

interface ExpenseItem {
  id: string;
  amount: number;
  date: string;
  category: string;
  vendor: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}

export default function ExpenseManagementPage() {
  const [expenses, setExpenses] = useState<ExpenseItem[]>(mockFinance.expenses);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    date: '',
    category: '',
    vendor: '',
  });

  const categoryBudgets = {
    'Office Supplies': 5000,
    Software: 8000,
    'Travel & Meals': 4000,
    Utilities: 2000,
    Other: 3000,
  };

  const handleAddExpense = () => {
    if (formData.amount && formData.date && formData.vendor) {
      const newExpense: ExpenseItem = {
        id: (Math.max(...expenses.map((e) => parseInt(e.id)), 0) + 1).toString(),
        amount: parseFloat(formData.amount),
        date: formData.date,
        category: formData.category || 'Other',
        vendor: formData.vendor,
        status: 'Pending',
      };
      setExpenses([newExpense, ...expenses]);
      setFormData({
        amount: '',
        date: '',
        category: '',
        vendor: '',
      });
      setShowForm(false);
    }
  };

  const handleApprove = (id: string) => {
    setExpenses(expenses.map((item) => (item.id === id ? { ...item, status: 'Approved' } : item)));
  };

  const handleReject = (id: string) => {
    setExpenses(expenses.map((item) => (item.id === id ? { ...item, status: 'Rejected' } : item)));
  };

  const getCategoryExpenses = (category: string) => {
    return expenses.filter((e) => e.category === category && e.status === 'Approved').reduce((sum, e) => sum + e.amount, 0);
  };

  const totalExpenses = expenses.filter((e) => e.status === 'Approved').reduce((sum, e) => sum + e.amount, 0);
  const pendingApproval = expenses.filter((e) => e.status === 'Pending').reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Expense Management</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Track expenses with budget limits and approval workflow</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
        >
          + Add Expense
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <p className="text-slate-600 dark:text-slate-400 text-sm">Total Approved Expenses</p>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">₹{totalExpenses.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <p className="text-slate-600 dark:text-slate-400 text-sm">Pending Approval</p>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">₹{pendingApproval.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <p className="text-slate-600 dark:text-slate-400 text-sm">Total Transactions</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{expenses.length}</p>
        </div>
      </div>

      {/* Add Expense Form */}
      {showForm && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 space-y-4">
          <h3 className="font-semibold text-slate-900 dark:text-white">Add New Expense</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Amount *</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="0.00"
                className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date *</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Select Category</option>
                <option value="Office Supplies">Office Supplies</option>
                <option value="Software">Software</option>
                <option value="Travel & Meals">Travel & Meals</option>
                <option value="Utilities">Utilities</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Vendor Name *</label>
              <input
                type="text"
                value={formData.vendor}
                onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                placeholder="Vendor Name"
                className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddExpense}
              className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
            >
              Add Expense
            </button>
          </div>
        </div>
      )}

      {/* Budget Tracking */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Budget vs Actual</h3>
        <div className="space-y-4">
          {Object.entries(categoryBudgets).map(([category, budget]) => {
            const spent = getCategoryExpenses(category);
            const percentage = (spent / budget) * 100;
            const exceeded = percentage > 100;
            return (
              <div key={category} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-slate-900 dark:text-white">{category}</span>
                  <span className={`text-sm font-medium ${exceeded ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                    {percentage.toFixed(0)}% used {exceeded && '⚠️'}
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${exceeded ? 'bg-red-600' : 'bg-emerald-600'}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mt-2">
                  <span>Spent: ₹{spent.toLocaleString()}</span>
                  <span>Budget: ₹{budget.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expense List */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Vendor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {expenses.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <td className="px-6 py-4 text-slate-900 dark:text-white">{item.date}</td>
                <td className="px-6 py-4 text-slate-900 dark:text-white font-medium">{item.vendor}</td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{item.category}</td>
                <td className="px-6 py-4 text-red-600 dark:text-red-400 font-medium">-₹{item.amount.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded ${
                      item.status === 'Approved'
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                        : item.status === 'Pending'
                        ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-2 text-sm">
                  {item.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="text-emerald-600 dark:text-emerald-400 hover:underline"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(item.id)}
                        className="text-red-600 dark:text-red-400 hover:underline"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
