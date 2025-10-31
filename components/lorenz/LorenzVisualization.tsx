"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import LorenzAttractor3D, { TrajectoryPoint } from './LorenzAttractor3D';

// Generate demo trajectory data using Lorenz equations
// This is used as a fallback when database is not available
function generateDemoTrajectory(): TrajectoryPoint[] {
  const points: TrajectoryPoint[] = [];
  const sigma = 10.0;
  const rho = 28.0;
  const beta = 8.0 / 3.0;
  const dt = 0.01;
  
  let x = 1.0;
  let y = 1.0;
  let z = 1.0;
  let time = 0.0;
  
  // Generate 1000 points (every 10th point from 10,000 steps)
  for (let timestep = 0; timestep < 10000; timestep++) {
    // Runge-Kutta 4th order integration
    const k1x = sigma * (y - x);
    const k1y = x * (rho - z) - y;
    const k1z = x * y - beta * z;
    
    const k2x = sigma * ((y + dt * k1y / 2) - (x + dt * k1x / 2));
    const k2y = (x + dt * k1x / 2) * (rho - (z + dt * k1z / 2)) - (y + dt * k1y / 2);
    const k2z = (x + dt * k1x / 2) * (y + dt * k1y / 2) - beta * (z + dt * k1z / 2);
    
    const k3x = sigma * ((y + dt * k2y / 2) - (x + dt * k2x / 2));
    const k3y = (x + dt * k2x / 2) * (rho - (z + dt * k2z / 2)) - (y + dt * k2y / 2);
    const k3z = (x + dt * k2x / 2) * (y + dt * k2y / 2) - beta * (z + dt * k2z / 2);
    
    const k4x = sigma * ((y + dt * k3y) - (x + dt * k3x));
    const k4y = (x + dt * k3x) * (rho - (z + dt * k3z)) - (y + dt * k3y);
    const k4z = (x + dt * k3x) * (y + dt * k3y) - beta * (z + dt * k3z);
    
    x += (dt / 6) * (k1x + 2 * k2x + 2 * k3x + k4x);
    y += (dt / 6) * (k1y + 2 * k2y + 2 * k3y + k4y);
    z += (dt / 6) * (k1z + 2 * k2z + 2 * k3z + k4z);
    time += dt;
    
    // Sample every 10th point to reduce data size
    if (timestep % 10 === 0) {
      points.push({
        x: Number(x.toFixed(6)),
        y: Number(y.toFixed(6)),
        z: Number(z.toFixed(6)),
        timestep,
        time: Number(time.toFixed(6))
      });
    }
  }
  
  return points;
}

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
          totalPoints: data.total_points,
          message: data.message
        });
        
        // Handle empty data gracefully (e.g., database not configured)
        if (data.message && (data.message.includes('Database') || data.message.includes('unavailable'))) {
          console.warn('Database unavailable, generating demo trajectory data');
          // Generate demo trajectory data using Lorenz equations
          const demoPoints = generateDemoTrajectory();
          setTrajectoryData(demoPoints);
          setError(null); // Clear error since we have demo data
          return;
        }
        
        // Also check if points array is empty and generate demo data
        if (data.points && Array.isArray(data.points)) {
          if (data.points.length === 0) {
            console.warn('Empty trajectory data, generating demo trajectory');
            const demoPoints = generateDemoTrajectory();
            setTrajectoryData(demoPoints);
            setError(null);
            return;
          }
          
          // Map API response to TrajectoryPoint format
          const points: TrajectoryPoint[] = data.points.map((p: any) => ({
            x: Number(p.x),
            y: Number(p.y),
            z: Number(p.z),
            timestep: p.timestep,
            time: p.time
          }));
          setTrajectoryData(points);
          // Clear any previous errors if we got valid data
          setError(null);
        } else {
          // If no points array, generate demo data as fallback
          console.warn('Invalid trajectory data format, generating demo trajectory');
          const demoPoints = generateDemoTrajectory();
          setTrajectoryData(demoPoints);
          setError(null);
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
