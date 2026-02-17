'use client';

import { useState } from 'react';
import { mockFinance } from '@/lib/dummy-data';

interface IncomeItem {
  id: string;
  amount: number;
  date: string;
  category: string;
  paymentMethod: string;
  clientName: string;
  invoiceNumber: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}

export default function IncomeManagementPage() {
  const [income, setIncome] = useState<IncomeItem[]>(mockFinance.income);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    date: '',
    category: '',
    paymentMethod: 'Bank Transfer',
    clientName: '',
    invoiceNumber: '',
  });

  const handleAddIncome = () => {
    if (formData.amount && formData.date && formData.clientName) {
      const newIncome: IncomeItem = {
        id: (Math.max(...income.map((i) => parseInt(i.id)), 0) + 1).toString(),
        amount: parseFloat(formData.amount),
        date: formData.date,
        category: formData.category,
        paymentMethod: formData.paymentMethod,
        clientName: formData.clientName,
        invoiceNumber: formData.invoiceNumber,
        status: 'Pending',
      };
      setIncome([newIncome, ...income]);
      setFormData({
        amount: '',
        date: '',
        category: '',
        paymentMethod: 'Bank Transfer',
        clientName: '',
        invoiceNumber: '',
      });
      setShowForm(false);
    }
  };

  const handleApprove = (id: string) => {
    setIncome(income.map((item) => (item.id === id ? { ...item, status: 'Approved' } : item)));
  };

  const handleReject = (id: string) => {
    setIncome(income.map((item) => (item.id === id ? { ...item, status: 'Rejected' } : item)));
  };

  const totalIncome = income.filter((i) => i.status === 'Approved').reduce((sum, i) => sum + i.amount, 0);
  const pendingApproval = income.filter((i) => i.status === 'Pending').reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Income Management</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Track and manage income sources with approval workflow</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
        >
          + Add Income
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <p className="text-slate-600 dark:text-slate-400 text-sm">Total Approved Income</p>
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">₹{totalIncome.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <p className="text-slate-600 dark:text-slate-400 text-sm">Pending Approval</p>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">₹{pendingApproval.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <p className="text-slate-600 dark:text-slate-400 text-sm">Total Transactions</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{income.length}</p>
        </div>
      </div>

      {/* Add Income Form */}
      {showForm && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 space-y-4">
          <h3 className="font-semibold text-slate-900 dark:text-white">Add New Income</h3>
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
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Consulting"
                className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Client Name *</label>
              <input
                type="text"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                placeholder="Client Name"
                className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Invoice #</label>
              <input
                type="text"
                value={formData.invoiceNumber}
                onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                placeholder="INV-001"
                className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Payment Method</label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option>Bank Transfer</option>
                <option>Credit Card</option>
                <option>Check</option>
                <option>Cash</option>
              </select>
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
              onClick={handleAddIncome}
              className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
            >
              Add Income
            </button>
          </div>
        </div>
      )}

      {/* Income List */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {income.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <td className="px-6 py-4 text-slate-900 dark:text-white">{item.date}</td>
                <td className="px-6 py-4 text-slate-900 dark:text-white font-medium">{item.clientName}</td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{item.category}</td>
                <td className="px-6 py-4 text-emerald-600 dark:text-emerald-400 font-medium">+₹{item.amount.toLocaleString()}</td>
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
