'use client';

import { useEffect, useState } from 'react';
import { getProjectBySlug } from '../app/data/projects';

export function BackToProjectLink() {
  const [projectName, setProjectName] = useState<string | null>(null);
  const [projectUrl, setProjectUrl] = useState<string | null>(null);

  useEffect(() => {
    // Check if we have a referrer and it's from a project page
    if (typeof window !== 'undefined' && document.referrer) {
      const referrerUrl = new URL(document.referrer);
      const pathname = referrerUrl.pathname;
      
      // Check if referrer is from a project page
      const projectMatch = pathname.match(/\/projects\/([^\/]+)/);
      
      if (projectMatch) {
        const projectSlug = projectMatch[1];
        
        // Get the project by slug
        const project = getProjectBySlug(projectSlug);
        
        if (project) {
          setProjectName(project.title);
          setProjectUrl(`/projects/${projectSlug}`);
        }
      }
    }
  }, []);

  // Don't show the link if no project was detected
  if (!projectName) {
    return null;
  }

  return (
    <button 
      onClick={() => {
        window.history.back();
        // Scroll to Project Overview section after navigation
        setTimeout(() => {
          // Try multiple selectors to find the Project Overview section
          const overviewSection = document.querySelector('[data-section="project-overview"]') ||
                                 Array.from(document.querySelectorAll('h2')).find(h2 => h2.textContent?.includes('Project Overview')) ||
                                 document.querySelector('h2');
          
          if (overviewSection) {
            // Get the exact position of the Project Overview section
            const rect = overviewSection.getBoundingClientRect();
            const scrollTop = window.pageYOffset + rect.top - 100; // Position Project Overview at top, hero header under nav
            
            // Scroll to position Project Overview at the top of the viewport
            window.scrollTo({ top: Math.max(0, scrollTop), behavior: 'smooth' });
          } else {
            // Fallback to top if overview section not found
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 800);
      }}
      className="inline-flex items-center text-sm text-neutral-500 hover:text-neutral-700 transition-colors duration-200 bg-transparent border-none cursor-pointer"
    >
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      Back to {projectName}
    </button>
  );
}
