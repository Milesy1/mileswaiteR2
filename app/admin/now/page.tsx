'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Types
interface NowEntry {
  month: string;
  lastUpdated: string;
  building: string[];
  exploring: string[];
  reading: { title: string; author: string }[];
  listening: {
    title: string;
    artist: string;
    link: string;
  };
  producing: {
    title: string;
    file: string;
  }[];
  using: string[];
  location: string;
  openTo: string[];
}

interface FormData {
  month: string;
  lastUpdated: string;
  building: string;
  exploring: string;
  reading: string;
  listeningTitle: string;
  listeningArtist: string;
  listeningLink: string;
  producing: string;
  using: string;
  location: string;
  openTo: string;
}

export default function AdminNowPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<FormData>({
    month: '',
    lastUpdated: '',
    building: '',
    exploring: '',
    reading: '',
    listeningTitle: '',
    listeningArtist: '',
    listeningLink: '',
    producing: '',
    using: '',
    location: '',
    openTo: ''
  });

  // Simple password protection (you can enhance this later) - v1.1
  const ADMIN_PASSWORD = 'milesadmin2025';

  // Load latest data for pre-filling
  useEffect(() => {
    if (isAuthenticated) {
      loadLatestData();
    }
  }, [isAuthenticated]);

  // Auto-save to localStorage
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('nowAdminDraft', JSON.stringify(formData));
    }
  }, [formData, isAuthenticated]);

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('nowAdminDraft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setFormData(draft);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  const loadLatestData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/now/latest');
      const data: NowEntry = await response.json();
      
      // Pre-fill form with latest data
      setFormData({
        month: data.month || '',
        lastUpdated: data.lastUpdated || '',
        building: data.building?.join('\n') || '',
        exploring: data.exploring?.join('\n') || '',
        reading: data.reading?.map(book => `${book.title} — ${book.author}`).join('\n') || '',
        listeningTitle: data.listening?.title || '',
        listeningArtist: data.listening?.artist || '',
        listeningLink: data.listening?.link || '',
        producing: data.producing?.map(track => `${track.title} | ${track.file}`).join('\n') || '',
        using: data.using?.join('\n') || '',
        location: data.location || '',
        openTo: data.openTo?.join('\n') || ''
      });
    } catch (error) {
      console.error('Error loading latest data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus('idle');

    try {
      // Parse form data back to proper format
      const nowEntry: NowEntry = {
        month: formData.month,
        lastUpdated: formData.lastUpdated,
        building: formData.building.split('\n').filter(item => item.trim()),
        exploring: formData.exploring.split('\n').filter(item => item.trim()),
        reading: formData.reading.split('\n').filter(item => item.trim()).map(line => {
          const parts = line.split(' — ');
          return {
            title: parts[0]?.trim() || '',
            author: parts[1]?.trim() || ''
          };
        }),
        listening: {
          title: formData.listeningTitle,
          artist: formData.listeningArtist,
          link: formData.listeningLink
        },
        producing: formData.producing.split('\n').filter(item => item.trim()).map(line => {
          const parts = line.split(' | ');
          return {
            title: parts[0]?.trim() || '',
            file: parts[1]?.trim() || ''
          };
        }),
        using: formData.using.split('\n').filter(item => item.trim()),
        location: formData.location,
        openTo: formData.openTo.split('\n').filter(item => item.trim())
      };

      const response = await fetch('/api/now', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nowEntry),
      });

      if (response.ok) {
        setSaveStatus('success');
        // Clear localStorage draft
        localStorage.removeItem('nowAdminDraft');
        // Reset form to show success
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Error saving data:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-light text-neutral-900 dark:text-white mb-6 text-center">
              Now Page Admin
            </h1>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (password === ADMIN_PASSWORD) {
                setIsAuthenticated(true);
              } else {
                alert('Incorrect password');
              }
            }}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-neutral-700 dark:text-white"
                  placeholder="Enter admin password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md transition-colors duration-200"
              >
                Access Admin
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-light text-neutral-900 dark:text-white">
              Update Now Page
            </h1>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
            >
              Logout
            </button>
          </div>

          {isLoading && (
            <div className="text-center py-4">
              <div className="text-neutral-500 dark:text-neutral-400">Loading latest data...</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Month */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Month
              </label>
              <input
                type="text"
                value={formData.month}
                onChange={(e) => handleInputChange('month', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-neutral-700 dark:text-white"
                placeholder="e.g., NOVEMBER 2025"
                required
              />
            </div>

            {/* Last Updated */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Last Updated
              </label>
              <input
                type="text"
                value={formData.lastUpdated}
                onChange={(e) => handleInputChange('lastUpdated', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-neutral-700 dark:text-white"
                placeholder="e.g., November 15, 2025"
                required
              />
            </div>

            {/* Building */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Building (one per line)
              </label>
              <textarea
                value={formData.building}
                onChange={(e) => handleInputChange('building', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-neutral-700 dark:text-white"
                placeholder="Project 1&#10;Project 2&#10;Project 3"
              />
            </div>

            {/* Exploring */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Exploring (one per line)
              </label>
              <textarea
                value={formData.exploring}
                onChange={(e) => handleInputChange('exploring', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-neutral-700 dark:text-white"
                placeholder="Technology 1&#10;Technology 2&#10;Technology 3"
              />
            </div>

            {/* Reading */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Reading (one per line, format: "Title — Author")
              </label>
              <textarea
                value={formData.reading}
                onChange={(e) => handleInputChange('reading', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-neutral-700 dark:text-white"
                placeholder="Book Title — Author Name&#10;Another Book — Another Author"
              />
            </div>

            {/* Listening */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Listening - Title
                </label>
                <input
                  type="text"
                  value={formData.listeningTitle}
                  onChange={(e) => handleInputChange('listeningTitle', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-neutral-700 dark:text-white"
                  placeholder="Track title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Listening - Artist
                </label>
                <input
                  type="text"
                  value={formData.listeningArtist}
                  onChange={(e) => handleInputChange('listeningArtist', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-neutral-700 dark:text-white"
                  placeholder="Artist name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Listening - Link
              </label>
              <input
                type="url"
                value={formData.listeningLink}
                onChange={(e) => handleInputChange('listeningLink', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-neutral-700 dark:text-white"
                placeholder="https://music.amazon.co.uk/..."
              />
            </div>

            {/* Producing */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Producing (one per line, format: "Title | /music/file.mp3")
              </label>
              <textarea
                value={formData.producing}
                onChange={(e) => handleInputChange('producing', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-neutral-700 dark:text-white"
                placeholder="Track Title | /music/track.mp3&#10;Another Track | /music/another.mp3"
              />
            </div>

            {/* Using */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Using (one per line)
              </label>
              <textarea
                value={formData.using}
                onChange={(e) => handleInputChange('using', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-neutral-700 dark:text-white"
                placeholder="Tool 1&#10;Tool 2&#10;Tool 3"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-neutral-700 dark:text-white"
                placeholder="e.g., Brooklyn, NY"
              />
            </div>

            {/* Open To */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Open To (one per line)
              </label>
              <textarea
                value={formData.openTo}
                onChange={(e) => handleInputChange('openTo', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-neutral-700 dark:text-white"
                placeholder="Opportunity 1&#10;Opportunity 2&#10;Opportunity 3"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSaving}
                className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-400 text-white py-3 px-4 rounded-md transition-colors duration-200 font-medium"
              >
                {isSaving ? 'Saving...' : 'Update Now Page'}
              </button>
            </div>

            {/* Status Messages */}
            {saveStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-green-600 dark:text-green-400 py-2"
              >
                ✅ Now page updated successfully!
              </motion.div>
            )}

            {saveStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-red-600 dark:text-red-400 py-2"
              >
                ❌ Error saving. Please try again.
              </motion.div>
            )}
          </form>

          {/* Help Text */}
          <div className="mt-8 p-4 bg-neutral-100 dark:bg-neutral-700 rounded-md">
            <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              💡 Smart Persistence Tips:
            </h3>
            <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
              <li>• Form auto-saves to localStorage as you type</li>
              <li>• Pre-fills with your latest data on load</li>
              <li>• Only change what's new - everything else persists</li>
              <li>• Use line breaks to separate multiple items</li>
              <li>• Format: "Title — Author" for reading, "Title | /path" for producing</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
