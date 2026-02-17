'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface User {
  email: string;
  role: 'admin' | 'recruiter' | 'finance';
  name: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const allMenuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊', roles: ['admin', 'recruiter', 'finance'] },
    { href: '/dashboard/jobs', label: 'Job Postings', icon: '💼', roles: ['admin', 'recruiter'] },
    { href: '/dashboard/candidates', label: 'Candidates', icon: '👥', roles: ['admin', 'recruiter'] },
    { href: '/dashboard/applications', label: 'Applications', icon: '📝', roles: ['admin', 'recruiter'] },
    { href: '/dashboard/interviews', label: 'Interviews', icon: '🎤', roles: ['admin', 'recruiter'] },
    { href: '/dashboard/finance', label: 'Finance & Payroll', icon: '💰', roles: ['admin', 'finance'] },
    { href: '/dashboard/reports', label: 'Reports', icon: '📈', roles: ['admin', 'recruiter', 'finance'] },
    { href: '/dashboard/settings', label: 'Settings', icon: '⚙️', roles: ['admin', 'recruiter', 'finance'] },
  ];

  const menuItems = allMenuItems.filter((item) => user?.role && item.roles.includes(user.role));

  const isActive = (href: string) => pathname === href;

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
          {sidebarOpen && (
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">HRMS</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{user?.role}</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? '←' : '→'}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive(item.href)
                  ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-medium'
                  : 'text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* User Menu */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors ${
              !sidebarOpen && 'justify-center'
            }`}
          >
            <span className="text-xl">🚪</span>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto flex flex-col">
        {/* Top Bar */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {menuItems.find((item) => isActive(item.href))?.label || 'Dashboard'}
          </h2>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" title="Notifications">
              🔔
            </button>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                {user?.name.substring(0, 2).toUpperCase() || 'U'}
              </button>
              {sidebarOpen && (
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{user?.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{user?.role}</p>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
