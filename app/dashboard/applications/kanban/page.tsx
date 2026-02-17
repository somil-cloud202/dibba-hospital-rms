'use client';

import { useState } from 'react';
import { mockApplications, mockCandidates, mockJobs } from '@/lib/dummy-data';

interface KanbanApplication {
  id: string;
  candidateId: string;
  jobId: string;
  candidateName: string;
  jobTitle: string;
  status: string;
  assignedRecruiter: string;
  appliedDate: string;
  notes: string;
}

const stages = ['Applied', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Interview Completed', 'Offer Extended', 'Hired', 'Rejected'];

export default function KanbanBoardPage() {
  const [applications, setApplications] = useState<KanbanApplication[]>(() => {
    return mockApplications.map((app) => ({
      ...app,
      candidateName: mockCandidates.find((c) => c.id === app.candidateId)?.name || '',
      jobTitle: mockJobs.find((j) => j.id === app.jobId)?.title || '',
    }));
  });

  const [draggedItem, setDraggedItem] = useState<KanbanApplication | null>(null);
  const [selectedCard, setSelectedCard] = useState<KanbanApplication | null>(null);

  const handleDragStart = (item: KanbanApplication) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (stage: string) => {
    if (draggedItem) {
      setApplications(
        applications.map((app) =>
          app.id === draggedItem.id
            ? { ...app, status: stage, stage: stage }
            : app
        )
      );
      setDraggedItem(null);
    }
  };

  const getApplicationsByStage = (stage: string) => {
    return applications.filter((app) => app.stage === stage);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Application Workflow</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Drag and drop to move applications through stages</p>
      </div>

      {/* Kanban Board */}
      <div className="overflow-x-auto">
        <div className="flex gap-6 pb-4" style={{ minWidth: 'min-content' }}>
          {stages.map((stage) => {
            const stageApps = getApplicationsByStage(stage);
            return (
              <div
                key={stage}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(stage)}
                className="flex-shrink-0 w-80 bg-slate-50 dark:bg-slate-800 rounded-lg p-4"
              >
                {/* Stage Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white">{stage}</h3>
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300">
                    {stageApps.length}
                  </span>
                </div>

                {/* Cards */}
                <div className="space-y-3">
                  {stageApps.map((app) => (
                    <div
                      key={app.id}
                      draggable
                      onDragStart={() => handleDragStart(app)}
                      onClick={() => setSelectedCard(app)}
                      className="bg-white dark:bg-slate-700 rounded-lg p-4 shadow hover:shadow-md transition-all cursor-move border border-slate-200 dark:border-slate-600"
                    >
                      <h4 className="font-medium text-slate-900 dark:text-white mb-1">{app.candidateName}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{app.jobTitle}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-1 rounded">
                          {app.assignedRecruiter}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{app.appliedDate}</span>
                      </div>
                    </div>
                  ))}
                  {stageApps.length === 0 && (
                    <div className="text-center py-8 text-slate-400 dark:text-slate-500">
                      <p className="text-sm">No applications</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Details Panel */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg max-w-md w-full">
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{selectedCard.candidateName}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{selectedCard.jobTitle}</p>
                </div>
                <button
                  onClick={() => setSelectedCard(null)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 border-t border-slate-200 dark:border-slate-700 pt-4">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Current Status</p>
                  <p className="font-medium text-slate-900 dark:text-white">{selectedCard.stage}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Assigned Recruiter</p>
                  <p className="font-medium text-slate-900 dark:text-white">{selectedCard.assignedRecruiter}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Applied Date</p>
                  <p className="font-medium text-slate-900 dark:text-white">{selectedCard.appliedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Recruiter Notes</p>
                  <p className="font-medium text-slate-900 dark:text-white">{selectedCard.notes}</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setSelectedCard(null)}
                  className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  Close
                </button>
                <button className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
