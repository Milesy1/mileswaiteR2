-- Seed Logistic Map bifurcation data and Feigenbaum constants
-- This populates the bifurcation diagram and universal constants

BEGIN;

-- Add Feigenbaum constants for Logistic Map study
INSERT INTO universal_constants (study_id, constant_name, value, uncertainty, computation_method)
VALUES 
  ('223e4567-e89b-12d3-a456-426614174111'::uuid, 'feigenbaum_delta', 4.669201609102990, 0.000000000000001, 'Period-doubling analysis'),
  ('223e4567-e89b-12d3-a456-426614174111'::uuid, 'feigenbaum_alpha', 2.502907875095893, 0.000000000000001, 'Scaling analysis')
ON CONFLICT DO NOTHING;

-- Generate and insert bifurcation data
-- This creates a dense dataset for the bifurcation diagram
DO $body$
DECLARE
  study_uuid TEXT := '223e4567-e89b-12d3-a456-426614174111';
  r_min NUMERIC := 2.5;
  r_max NUMERIC := 4.0;
  r_step NUMERIC := 0.001; -- Fine resolution for smooth diagram
  r NUMERIC;
  x NUMERIC;
  i INTEGER;
  transient INTEGER := 200; -- Skip transient iterations
  iterations INTEGER := 300; -- Total iterations per r value
BEGIN
  -- Loop through r values
  r := r_min;
  WHILE r <= r_max LOOP
    x := 0.5; -- Start from midpoint
    
    -- Skip transient iterations
    FOR i IN 1..transient LOOP
      x := r * x * (1.0 - x);
    END LOOP;
    
    -- Record remaining iterations (these form the attractor)
    FOR i IN (transient + 1)..iterations LOOP
      x := r * x * (1.0 - x);
      
      INSERT INTO bifurcation_data (study_id, parameter_value, state_value, iteration, is_stable)
      VALUES (study_uuid::uuid, r, x, i, true)
      ON CONFLICT DO NOTHING;
    END LOOP;
    
    r := r + r_step;
  END LOOP;
  
  RAISE NOTICE 'Bifurcation data seeded: % r values processed', (r_max - r_min) / r_step;
END $body$;

-- Add sample Lyapunov exponent metrics for different r values
INSERT INTO chaos_metrics (study_id, metric_name, value, computation_method)
SELECT 
  '223e4567-e89b-12d3-a456-426614174111'::uuid,
  'lyapunov_exponent',
  CASE 
    WHEN r < 3.0 THEN -0.5 + (r - 2.5) * 0.2 -- Negative in periodic regime
    WHEN r < 3.569 THEN -0.1 + (r - 3.0) * 0.05 -- Approaching chaos
    ELSE 0.3 + (r - 3.569) * 0.15 -- Positive in chaotic regime
  END,
  'Numerical approximation'
FROM generate_series(250, 400, 10) AS r
WHERE NOT EXISTS (
  SELECT 1 FROM chaos_metrics 
  WHERE study_id = '223e4567-e89b-12d3-a456-426614174111'::uuid 
  AND metric_name = 'lyapunov_exponent'
);

COMMIT;










