'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { mockJobs } from '@/lib/dummy-data';

interface JobFilters {
  department: string;
  location: string;
  status: string;
  dateRange: string;
}

export default function JobsManagementPage() {
  const [jobs, setJobs] = useState(mockJobs);
  const [filters, setFilters] = useState<JobFilters>({
    department: '',
    location: '',
    status: '',
    dateRange: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = !filters.department || job.department === filters.department;
      const matchesLocation = !filters.location || job.location === filters.location;
      const matchesStatus = !filters.status || job.status === filters.status;
      return matchesSearch && matchesDept && matchesLocation && matchesStatus;
    });
  }, [jobs, searchTerm, filters]);

  const handleDuplicateJob = (jobId: string) => {
    const jobToDuplicate = jobs.find((j) => j.id === jobId);
    if (jobToDuplicate) {
      const newJob = {
        ...jobToDuplicate,
        id: (Math.max(...jobs.map((j) => parseInt(j.id))) + 1).toString(),
        title: `${jobToDuplicate.title} (Copy)`,
        status: 'Active',
      };
      setJobs([...jobs, newJob]);
    }
  };

  const handleUpdateStatus = (jobId: string, status: 'Active' | 'Closed' | 'On Hold') => {
    setJobs(jobs.map((job) => (job.id === jobId ? { ...job, status } : job)));
  };

  const departments = [...new Set(jobs.map((j) => j.department))];
  const locations = [...new Set(jobs.map((j) => j.location))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Job Postings</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage and track all job openings</p>
        </div>
        <Link
          href="/dashboard/jobs/new"
          className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
        >
          + Create Job
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 space-y-4">
        {/* Search Bar */}
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search jobs by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            Filters
          </button>
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilter && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <select
              value={filters.department}
              onChange={(e) => setFilters({ ...filters, department: e.target.value })}
              className="px-3 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            <select
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              className="px-3 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>

            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="px-3 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Closed">Closed</option>
              <option value="On Hold">On Hold</option>
            </select>

            <button
              onClick={() =>
                setFilters({
                  department: '',
                  location: '',
                  status: '',
                  dateRange: '',
                })
              }
              className="px-4 py-2 bg-slate-200 dark:bg-slate-600 text-slate-900 dark:text-white rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Jobs Table */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Salary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Applicants</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{job.title}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Posted {job.postedDate}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{job.department}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{job.location}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                    ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
                      {job.applicants}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={job.status}
                      onChange={(e) => handleUpdateStatus(job.id, e.target.value as any)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        job.status === 'Active'
                          ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                          : job.status === 'Closed'
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                          : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                      }`}
                    >
                      <option value="Active">Active</option>
                      <option value="Closed">Closed</option>
                      <option value="On Hold">On Hold</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <button
                      onClick={() => setSelectedJob(job.id)}
                      className="text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDuplicateJob(job.id)}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Duplicate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredJobs.length === 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-12 text-center">
          <p className="text-slate-600 dark:text-slate-400 text-lg">No jobs found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
