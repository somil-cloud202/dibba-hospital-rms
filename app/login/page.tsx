'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'recruiter' | 'finance'>('recruiter');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Mock authentication with role-based routing
      if (email && password) {
        const user = { email, role, name: email.split('@')[0] };
        localStorage.setItem('user', JSON.stringify(user));
        router.push('/dashboard');
      } else {
        setError('Please enter both email and password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">HRMS</h1>
          <p className="text-slate-400">Enterprise Recruitment Management</p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-800 rounded-lg shadow-xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-6">Sign In</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-slate-300 mb-1">
                Login as
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as 'admin' | 'recruiter' | 'finance')}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              >
                <option value="recruiter">Recruiter</option>
                <option value="admin">Admin</option>
                <option value="finance">Finance Manager</option>
              </select>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 bg-slate-700 border-slate-600 rounded accent-emerald-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-slate-400">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-slate-700 text-center">
            <p className="text-sm text-slate-400">
              Don't have an account?{' '}
              <Link href="/signup" className="text-emerald-500 hover:text-emerald-400">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
