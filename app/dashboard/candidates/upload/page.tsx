'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ParsedData {
  name: string;
  email: string;
  phone: string;
  location: string;
  experience: number;
  education: string;
  skills: string[];
}

export default function ResumeUploadPage() {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [parseProgress, setParseProgress] = useState(0);
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const mockParsedData: ParsedData = {
    name: 'Alex Morgan',
    email: 'alex.morgan@email.com',
    phone: '+1-555-0199',
    location: 'San Francisco, CA',
    experience: 7,
    education: 'B.S. Computer Science - UC Berkeley',
    skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker', 'SQL'],
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files[0]);
  };

  const handleFileSelect = (file: File) => {
    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      setUploadedFile(file.name);
      setIsUploading(true);

      setTimeout(() => {
        setIsUploading(false);
        simulateParsingProcess();
      }, 1500);
    }
  };

  const simulateParsingProcess = () => {
    setIsParsing(true);
    let progress = 0;

    const interval = setInterval(() => {
      progress += Math.random() * 25;
      if (progress > 100) {
        clearInterval(interval);
        setParseProgress(100);
        setIsParsing(false);
        setParsedData(mockParsedData);
      } else {
        setParseProgress(Math.min(progress, 100));
      }
    }, 400);
  };

  const handleSaveCandidate = () => {
    if (parsedData) {
      localStorage.setItem('newCandidate', JSON.stringify(parsedData));
      router.push('/dashboard/candidates');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Upload Resume</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">AI-powered resume parsing and candidate profile creation</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="space-y-4">
          {/* Drag and Drop Area */}
          {!uploadedFile && !parsedData && (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                isDragging
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                  : 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800'
              }`}
            >
              <div className="text-4xl mb-3">📄</div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Drag and drop your resume</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">or</p>
              <label className="inline-block">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
                  className="hidden"
                />
                <span className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium cursor-pointer transition-colors inline-block">
                  Browse Files
                </span>
              </label>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">Supported format: PDF</p>
            </div>
          )}

          {/* Uploading State */}
          {isUploading && (
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-8 bg-white dark:bg-slate-800">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                  <div className="animate-spin text-emerald-600">⏳</div>
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{uploadedFile}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Uploading...</p>
                </div>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div className="bg-emerald-600 h-2 rounded-full w-3/4 transition-all"></div>
              </div>
            </div>
          )}

          {/* Parsing State */}
          {isParsing && !isUploading && (
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-8 bg-white dark:bg-slate-800 space-y-4">
              <h3 className="font-medium text-slate-900 dark:text-white">AI Parsing in Progress</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Extracting personal information</span>
                    <span className="text-sm text-emerald-600 dark:text-emerald-400">{parseProgress > 30 ? '✓' : '...'}</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1">
                    <div className="bg-emerald-600 h-1 rounded-full" style={{ width: `${Math.min(parseProgress, 30)}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Identifying skills & experience</span>
                    <span className="text-sm text-emerald-600 dark:text-emerald-400">{parseProgress > 60 ? '✓' : '...'}</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1">
                    <div className="bg-emerald-600 h-1 rounded-full" style={{ width: `${Math.min(Math.max(parseProgress - 30, 0), 30)}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Analyzing education & certifications</span>
                    <span className="text-sm text-emerald-600 dark:text-emerald-400">{parseProgress > 90 ? '✓' : '...'}</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1">
                    <div className="bg-emerald-600 h-1 rounded-full" style={{ width: `${Math.min(Math.max(parseProgress - 60, 0), 40)}%` }}></div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center pt-4">{parseProgress}% complete</p>
            </div>
          )}
        </div>

        {/* Parsed Data Section */}
        {parsedData && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 space-y-6">
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Parsed Profile</h2>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-medium">
                  95% Confidence
                </span>
              </div>

              {/* Personal Info */}
              <div className="space-y-3 pb-4 border-b border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Personal Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Name</span>
                    <span className="text-slate-900 dark:text-white font-medium">{parsedData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Email</span>
                    <span className="text-slate-900 dark:text-white font-medium">{parsedData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Phone</span>
                    <span className="text-slate-900 dark:text-white font-medium">{parsedData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Location</span>
                    <span className="text-slate-900 dark:text-white font-medium">{parsedData.location}</span>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="space-y-3 pb-4 border-b border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Experience</h3>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Years of Experience</span>
                  <span className="text-slate-900 dark:text-white font-medium">{parsedData.experience} years</span>
                </div>
              </div>

              {/* Education */}
              <div className="space-y-3 pb-4 border-b border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Education</h3>
                <p className="text-slate-900 dark:text-white">{parsedData.education}</p>
              </div>

              {/* Skills */}
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Skills Identified</h3>
                <div className="flex flex-wrap gap-2">
                  {parsedData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setParsedData(null);
                    setUploadedFile(null);
                    setParseProgress(0);
                  }}
                  className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  Upload Another
                </button>
                <button
                  onClick={handleSaveCandidate}
                  className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
                >
                  Save & Continue
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
