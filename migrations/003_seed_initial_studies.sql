-- Seed initial studies for Lorenz and Logistic Map
-- These are the base studies that the platform needs

BEGIN;

-- Insert Lorenz Attractor Demo Study
INSERT INTO studies (id, name, system_type, description, date_conducted)
VALUES 
  ('123e4567-e89b-12d3-a456-426614174000', 'Lorenz Attractor Demo', 'lorenz', 'Classic Lorenz system demo study', '2023-02-01')
ON CONFLICT (id) DO NOTHING;

-- Insert Logistic Map Demo Study
INSERT INTO studies (id, name, system_type, description, date_conducted)
VALUES 
  ('223e4567-e89b-12d3-a456-426614174111', 'Logistic Map Demo', 'logistic', 'Logistic map demo study (r range 2.5-4.0)', '2023-06-15')
ON CONFLICT (id) DO NOTHING;

-- Add Lorenz parameters
INSERT INTO system_parameters (study_id, parameter_name, value, units)
VALUES 
  ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'sigma', 10.0, 'dimensionless'),
  ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'rho', 28.0, 'dimensionless'),
  ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'beta', 8.0/3.0, 'dimensionless')
ON CONFLICT (study_id, parameter_name) DO NOTHING;

-- Add Lorenz initial conditions
INSERT INTO initial_conditions (study_id, variable_name, value)
VALUES 
  ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'x0', 1.0),
  ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'y0', 1.0),
  ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'z0', 1.0)
ON CONFLICT (study_id, variable_name) DO NOTHING;

-- Add Lorenz chaos metrics
INSERT INTO chaos_metrics (study_id, metric_name, value, computation_method)
VALUES 
  ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'lyapunov_exponent', 0.9056, 'Wolf algorithm'),
  ('123e4567-e89b-12d3-a456-426614174000'::uuid, 'correlation_dimension', 2.05, 'Grassberger-Procaccia')
ON CONFLICT DO NOTHING;

-- Add Logistic Map parameters
INSERT INTO system_parameters (study_id, parameter_name, value, units)
VALUES 
  ('223e4567-e89b-12d3-a456-426614174111'::uuid, 'r_min', 2.5, 'dimensionless'),
  ('223e4567-e89b-12d3-a456-426614174111'::uuid, 'r_max', 4.0, 'dimensionless')
ON CONFLICT (study_id, parameter_name) DO NOTHING;

COMMIT;

