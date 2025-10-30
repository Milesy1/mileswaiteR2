-- Seed Lorenz Attractor Trajectory Data
-- Generates realistic trajectory using 4th-order Runge-Kutta integration
-- Parameters: σ=10, ρ=28, β=8/3
-- Initial conditions: x=1, y=1, z=1
-- Timestep: dt=0.01, 10,000 steps total, sample every 10th point

-- Temporarily drop indexes to speed up bulk insert
DROP INDEX IF EXISTS idx_trajectories_study_timestep;
DROP INDEX IF EXISTS idx_trajectories_study_time;
DROP INDEX IF EXISTS idx_trajectories_xyz;

DO $body$
DECLARE
  study_uuid TEXT := '123e4567-e89b-12d3-a456-426614174000';
  sigma NUMERIC := 10.0;
  rho NUMERIC := 28.0;
  beta NUMERIC := 8.0 / 3.0;
  dt NUMERIC := 0.01;
  
  -- Current state
  x NUMERIC := 1.0;
  y NUMERIC := 1.0;
  z NUMERIC := 1.0;
  
  -- Runge-Kutta variables
  k1x NUMERIC;
  k1y NUMERIC;
  k1z NUMERIC;
  k2x NUMERIC;
  k2y NUMERIC;
  k2z NUMERIC;
  k3x NUMERIC;
  k3y NUMERIC;
  k3z NUMERIC;
  k4x NUMERIC;
  k4y NUMERIC;
  k4z NUMERIC;
  
  -- Temporary variables for RK4 steps
  x_temp NUMERIC;
  y_temp NUMERIC;
  z_temp NUMERIC;
  
  timestep INTEGER := 0;
  t NUMERIC := 0.0;
  sample_rate INTEGER := 10; -- Sample every 10th point
BEGIN
  -- Lorenz system differential equations
  -- dx/dt = σ(y - x)
  -- dy/dt = x(ρ - z) - y
  -- dz/dt = xy - βz
  
  -- Insert initial point
  INSERT INTO trajectories (study_id, timestep, time, x, y, z)
  VALUES (study_uuid::uuid, 0, 0.0, x, y, z);
  
  -- Generate trajectory using 4th-order Runge-Kutta
  FOR timestep IN 1..10000 LOOP
    t := timestep * dt;
    
    -- Step 1: k1 = f(t, y)
    k1x := sigma * (y - x);
    k1y := x * (rho - z) - y;
    k1z := x * y - beta * z;
    
    -- Step 2: k2 = f(t + dt/2, y + dt*k1/2)
    x_temp := x + dt * k1x / 2.0;
    y_temp := y + dt * k1y / 2.0;
    z_temp := z + dt * k1z / 2.0;
    
    k2x := sigma * (y_temp - x_temp);
    k2y := x_temp * (rho - z_temp) - y_temp;
    k2z := x_temp * y_temp - beta * z_temp;
    
    -- Step 3: k3 = f(t + dt/2, y + dt*k2/2)
    x_temp := x + dt * k2x / 2.0;
    y_temp := y + dt * k2y / 2.0;
    z_temp := z + dt * k2z / 2.0;
    
    k3x := sigma * (y_temp - x_temp);
    k3y := x_temp * (rho - z_temp) - y_temp;
    k3z := x_temp * y_temp - beta * z_temp;
    
    -- Step 4: k4 = f(t + dt, y + dt*k3)
    x_temp := x + dt * k3x;
    y_temp := y + dt * k3y;
    z_temp := z + dt * k3z;
    
    k4x := sigma * (y_temp - x_temp);
    k4y := x_temp * (rho - z_temp) - y_temp;
    k4z := x_temp * y_temp - beta * z_temp;
    
    -- Update state: y_{n+1} = y_n + (dt/6)(k1 + 2*k2 + 2*k3 + k4)
    x := x + (dt / 6.0) * (k1x + 2.0 * k2x + 2.0 * k3x + k4x);
    y := y + (dt / 6.0) * (k1y + 2.0 * k2y + 2.0 * k3y + k4y);
    z := z + (dt / 6.0) * (k1z + 2.0 * k2z + 2.0 * k3z + k4z);
    
    -- Sample every Nth point to keep dataset manageable (~1000 points)
    IF timestep % sample_rate = 0 THEN
      INSERT INTO trajectories (study_id, timestep, time, x, y, z)
      VALUES (study_uuid::uuid, timestep, t, x, y, z);
    END IF;
  END LOOP;
  
  RAISE NOTICE 'Lorenz trajectory seeded: 1001 points (sampled from 10,000 timesteps)';
END $body$;

-- Recreate indexes
CREATE INDEX IF NOT EXISTS idx_trajectories_study_timestep ON trajectories(study_id, timestep);
CREATE INDEX IF NOT EXISTS idx_trajectories_study_time ON trajectories(study_id, time);
CREATE INDEX IF NOT EXISTS idx_trajectories_xyz ON trajectories(x, y, z) WHERE z IS NOT NULL;

-- Verify the seeded data
SELECT 
  COUNT(*) AS total_points,
  MIN(time) AS min_time,
  MAX(time) AS max_time,
  ROUND(AVG(x)::numeric, 4) AS avg_x,
  ROUND(AVG(y)::numeric, 4) AS avg_y,
  ROUND(AVG(z)::numeric, 4) AS avg_z,
  ROUND(MIN(x)::numeric, 4) AS min_x,
  ROUND(MAX(x)::numeric, 4) AS max_x,
  ROUND(MIN(y)::numeric, 4) AS min_y,
  ROUND(MAX(y)::numeric, 4) AS max_y,
  ROUND(MIN(z)::numeric, 4) AS min_z,
  ROUND(MAX(z)::numeric, 4) AS max_z
FROM trajectories
WHERE study_id = '123e4567-e89b-12d3-a456-426614174000'::uuid;

