"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import LorenzAttractor3D, { TrajectoryPoint } from './LorenzAttractor3D';

// Dynamically import the 3D component to avoid SSR issues
const Lorenz3D = dynamic(() => import('./LorenzAttractor3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-neutral-900 rounded-lg">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-neutral-400">Loading visualization...</p>
      </div>
    </div>
  )
});

interface LorenzVisualizationProps {
  studyId: string;
}

function LorenzVisualization({ studyId }: LorenzVisualizationProps) {
  const [trajectoryData, setTrajectoryData] = useState<TrajectoryPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTrajectory() {
      try {
        setLoading(true);
        const url = `/api/studies/lorenz/${studyId}/trajectory`;
        console.log('Fetching trajectory from:', url, 'Study ID:', studyId);
        
        const response = await fetch(url);
        
        console.log('Trajectory response status:', response.status, response.statusText);
        console.log('Trajectory response headers:', Object.fromEntries(response.headers.entries()));
        
        if (!response.ok) {
          let errorMessage = `Failed to fetch trajectory: ${response.statusText} (${response.status})`;
          const contentType = response.headers.get('content-type');
          console.log('Error response content-type:', contentType);
          
          try {
            const text = await response.text();
            console.log('=== FULL ERROR RESPONSE ===');
            console.log('Status:', response.status);
            console.log('Status Text:', response.statusText);
            console.log('Content-Type:', contentType);
            console.log('Response Text (first 500 chars):', text.substring(0, 500));
            console.log('Response Text Length:', text.length);
            console.log('Response Text (full):', text);
            
            if (contentType?.includes('application/json')) {
              try {
                const errorData = JSON.parse(text);
                console.error('Trajectory API error (parsed):', errorData);
                if (errorData.message) {
                  errorMessage = errorData.message;
                } else if (errorData.error) {
                  errorMessage = errorData.error;
                } else if (Object.keys(errorData).length === 0) {
                  errorMessage = `Empty JSON response from server (status ${response.status}). Route may not be matching.`;
                }
              } catch (parseError) {
                console.error('Failed to parse as JSON:', parseError);
                errorMessage = `Invalid JSON response: ${text.substring(0, 100)}`;
              }
            } else {
              console.warn('Response is not JSON, appears to be:', contentType || 'unknown');
              errorMessage = `Server returned ${contentType || 'non-JSON'} response (status ${response.status}). Route may not exist.`;
            }
          } catch (e) {
            console.error('Failed to read error response:', e);
          }
          throw new Error(errorMessage);
        }
        
        const data = await response.json();
        console.log('Trajectory data received:', { 
          pointCount: data.points?.length, 
          studyId: data.study_id,
          totalPoints: data.total_points 
        });
        
        if (data.points && Array.isArray(data.points)) {
          // Map API response to TrajectoryPoint format
          const points: TrajectoryPoint[] = data.points.map((p: any) => ({
            x: Number(p.x),
            y: Number(p.y),
            z: Number(p.z),
            timestep: p.timestep,
            time: p.time
          }));
          setTrajectoryData(points);
        } else {
          throw new Error('Invalid trajectory data format');
        }
      } catch (err) {
        console.error('Error fetching trajectory:', err);
        setError(err instanceof Error ? err.message : 'Failed to load trajectory data');
      } finally {
        setLoading(false);
      }
    }

    if (studyId) {
      fetchTrajectory();
    }
  }, [studyId]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-neutral-900 rounded-lg">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-400">Loading trajectory data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-neutral-900 rounded-lg">
        <div className="text-center text-red-400">
          <p className="mb-2">Error loading visualization</p>
          <p className="text-sm text-neutral-500">{error}</p>
        </div>
      </div>
    );
  }

  if (trajectoryData.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-neutral-900 rounded-lg">
        <p className="text-neutral-400">No trajectory data available</p>
      </div>
    );
  }

  return <LorenzAttractor3D points={trajectoryData} autoRotate={true} />;
}

export default LorenzVisualization;
