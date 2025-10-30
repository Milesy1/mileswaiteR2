'use client';

import { motion } from 'framer-motion';
import { Study, TrajectoryPoint } from '@/lib/types/complex-systems';
import { useState } from 'react';

interface LorenzDataExportProps {
  studyId: string;
  study: Study;
  trajectories: TrajectoryPoint[];
}

export function LorenzDataExport({ studyId, study, trajectories }: LorenzDataExportProps) {
  const [isExporting, setIsExporting] = useState<string | null>(null);

  const downloadCSV = async () => {
    setIsExporting('csv');
    try {
      const response = await fetch(`/api/studies/lorenz/${studyId}/trajectory`);
      if (!response.ok) throw new Error('Failed to fetch trajectory data');
      
      const data = await response.json();
      const fullTrajectories = data.trajectories;
      
      // Convert to CSV
      const headers = ['timestep', 'time', 'x', 'y', 'z'];
      const csvContent = [
        headers.join(','),
        ...fullTrajectories.map((point: TrajectoryPoint) => 
          [point.timestep, point.time, point.x, point.y, point.z].join(',')
        )
      ].join('\n');
      
      // Download file
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `lorenz-trajectory-${studyId}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading CSV:', error);
    } finally {
      setIsExporting(null);
    }
  };

  const downloadJSON = async () => {
    setIsExporting('json');
    try {
      const response = await fetch(`/api/studies/lorenz/${studyId}/trajectory`);
      if (!response.ok) throw new Error('Failed to fetch trajectory data');
      
      const data = await response.json();
      
      // Download file
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `lorenz-trajectory-${studyId}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading JSON:', error);
    } finally {
      setIsExporting(null);
    }
  };

  const downloadMetadata = () => {
    setIsExporting('metadata');
    try {
      const metadata = {
        study: study,
        export_info: {
          exported_at: new Date().toISOString(),
          total_points: trajectories.length,
          time_range: trajectories.length > 0 ? {
            start: trajectories[0].time,
            end: trajectories[trajectories.length - 1].time,
            duration: trajectories[trajectories.length - 1].time - trajectories[0].time
          } : null
        }
      };
      
      // Download file
      const blob = new Blob([JSON.stringify(metadata, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `lorenz-study-metadata-${studyId}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading metadata:', error);
    } finally {
      setIsExporting(null);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const estimateFileSize = (points: number, format: 'csv' | 'json') => {
    // Rough estimation based on data structure
    if (format === 'csv') {
      return points * 50; // ~50 bytes per CSV line
    } else {
      return points * 80; // ~80 bytes per JSON object
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6"
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          Data Export
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Download trajectory data and study metadata in various formats
        </p>
      </div>

      {/* Export Options */}
      <div className="space-y-4">
        {/* Full Trajectory CSV */}
        <div className="p-4 border border-neutral-200 dark:border-neutral-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors duration-200">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                Full Trajectory (CSV)
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                Complete trajectory data in CSV format for analysis in Excel, Python, R, etc.
              </p>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                Estimated size: {formatFileSize(estimateFileSize(trajectories.length * 10, 'csv'))} 
                • Columns: timestep, time, x, y, z
              </div>
            </div>
            <button
              onClick={downloadCSV}
              disabled={isExporting !== null}
              className="ml-4 flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              {isExporting === 'csv' ? (
                <>
                  <svg className="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </>
              ) : (
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )}
              {isExporting === 'csv' ? 'Exporting...' : 'Download CSV'}
            </button>
          </div>
        </div>

        {/* Full Trajectory JSON */}
        <div className="p-4 border border-neutral-200 dark:border-neutral-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors duration-200">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                Full Trajectory (JSON)
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                Complete trajectory data in JSON format with metadata and API response structure.
              </p>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                Estimated size: {formatFileSize(estimateFileSize(trajectories.length * 10, 'json'))} 
                • Includes API metadata and sampling info
              </div>
            </div>
            <button
              onClick={downloadJSON}
              disabled={isExporting !== null}
              className="ml-4 flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              {isExporting === 'json' ? (
                <>
                  <svg className="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </>
              ) : (
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )}
              {isExporting === 'json' ? 'Exporting...' : 'Download JSON'}
            </button>
          </div>
        </div>

        {/* Study Metadata */}
        <div className="p-4 border border-neutral-200 dark:border-neutral-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors duration-200">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                Study Metadata
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                Study information, parameters, and export metadata in JSON format.
              </p>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                Small file • Includes study details and export timestamp
              </div>
            </div>
            <button
              onClick={downloadMetadata}
              disabled={isExporting !== null}
              className="ml-4 flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              {isExporting === 'metadata' ? (
                <>
                  <svg className="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </>
              ) : (
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )}
              {isExporting === 'metadata' ? 'Exporting...' : 'Download Metadata'}
            </button>
          </div>
        </div>
      </div>

      {/* Data Summary */}
      <div className="mt-6 p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
          Data Summary
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-neutral-600 dark:text-neutral-400">Sample Points:</span>
            <span className="ml-2 font-mono text-neutral-900 dark:text-neutral-100">
              {trajectories.length.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-neutral-600 dark:text-neutral-400">Time Range:</span>
            <span className="ml-2 font-mono text-neutral-900 dark:text-neutral-100">
              {trajectories.length > 0 ? `${trajectories[0].time.toFixed(2)}s - ${trajectories[trajectories.length - 1].time.toFixed(2)}s` : 'N/A'}
            </span>
          </div>
          <div>
            <span className="text-neutral-600 dark:text-neutral-400">Duration:</span>
            <span className="ml-2 font-mono text-neutral-900 dark:text-neutral-100">
              {trajectories.length > 0 ? `${(trajectories[trajectories.length - 1].time - trajectories[0].time).toFixed(2)}s` : 'N/A'}
            </span>
          </div>
          <div>
            <span className="text-neutral-600 dark:text-neutral-400">Study ID:</span>
            <span className="ml-2 font-mono text-xs text-neutral-900 dark:text-neutral-100">
              {studyId}
            </span>
          </div>
        </div>
      </div>

      {/* API Note */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
        <div className="flex items-start">
          <svg className="w-4 h-4 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              <strong>Note:</strong> Full trajectory downloads fetch complete data from the API. 
              Large datasets may take a moment to process and download.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
