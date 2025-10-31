-- Complex Systems Studies Database Migration
-- This migration creates tables for storing and analyzing complex systems data
-- including dynamical systems, chaos theory, and emergent behavior studies

-- Enable UUID extension for better primary keys
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Studies table - Main container for each complex systems study
CREATE TABLE studies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    system_type VARCHAR(100) NOT NULL CHECK (system_type IN (
        'lorenz', 'rossler', 'chen', 'lorenz_96', 'kuramoto', 
        'cellular_automata', 'agent_based', 'network', 'other'
    )),
    description TEXT,
    date_conducted DATE NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. System parameters table - Stores parameter values for each study
CREATE TABLE system_parameters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    study_id UUID NOT NULL REFERENCES studies(id) ON DELETE CASCADE,
    parameter_name VARCHAR(100) NOT NULL,
    value NUMERIC NOT NULL,
    units VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(study_id, parameter_name)
);

-- 3. Initial conditions table - Stores starting conditions for simulations
CREATE TABLE initial_conditions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    study_id UUID NOT NULL REFERENCES studies(id) ON DELETE CASCADE,
    variable_name VARCHAR(100) NOT NULL,
    value NUMERIC NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(study_id, variable_name)
);

-- 4. Trajectories table - Stores time series data from simulations
CREATE TABLE trajectories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    study_id UUID NOT NULL REFERENCES studies(id) ON DELETE CASCADE,
    timestep INTEGER NOT NULL,
    time NUMERIC NOT NULL,
    x NUMERIC NOT NULL,
    y NUMERIC NOT NULL,
    z NUMERIC,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Chaos metrics table - Stores computed chaos theory metrics
CREATE TABLE chaos_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    study_id UUID NOT NULL REFERENCES studies(id) ON DELETE CASCADE,
    metric_name VARCHAR(100) NOT NULL CHECK (metric_name IN (
        'lyapunov_exponent', 'correlation_dimension', 'entropy', 
        'fractal_dimension', 'hurst_exponent', 'recurrence_rate',
        'determinism', 'laminarity', 'trapping_time', 'maxline'
    )),
    value NUMERIC NOT NULL,
    computation_method TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Bifurcation data table - Stores bifurcation analysis results
CREATE TABLE bifurcation_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    study_id UUID NOT NULL REFERENCES studies(id) ON DELETE CASCADE,
    parameter_value NUMERIC NOT NULL,
    state_value NUMERIC NOT NULL,
    iteration INTEGER NOT NULL,
    is_stable BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Universal constants table - Stores discovered universal constants
CREATE TABLE universal_constants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    study_id UUID NOT NULL REFERENCES studies(id) ON DELETE CASCADE,
    constant_name VARCHAR(100) NOT NULL,
    value NUMERIC NOT NULL,
    uncertainty NUMERIC,
    computation_method TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Sensitivity data table - Stores sensitivity analysis results
CREATE TABLE sensitivity_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    study_id UUID NOT NULL REFERENCES studies(id) ON DELETE CASCADE,
    timestep INTEGER NOT NULL,
    time NUMERIC NOT NULL,
    separation NUMERIC NOT NULL,
    log_separation NUMERIC,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for optimal query performance
CREATE INDEX idx_trajectories_study_timestep ON trajectories(study_id, timestep);
CREATE INDEX idx_trajectories_study_time ON trajectories(study_id, time);
CREATE INDEX idx_bifurcation_study_param ON bifurcation_data(study_id, parameter_value);
CREATE INDEX idx_sensitivity_study_timestep ON sensitivity_data(study_id, timestep);
CREATE INDEX idx_chaos_metrics_study ON chaos_metrics(study_id);
CREATE INDEX idx_system_parameters_study ON system_parameters(study_id);
CREATE INDEX idx_initial_conditions_study ON initial_conditions(study_id);
CREATE INDEX idx_universal_constants_study ON universal_constants(study_id);

-- Create indexes for common query patterns
CREATE INDEX idx_studies_system_type ON studies(system_type);
CREATE INDEX idx_studies_date ON studies(date_conducted);
CREATE INDEX idx_chaos_metrics_name ON chaos_metrics(metric_name);
CREATE INDEX idx_trajectories_xyz ON trajectories(x, y, z) WHERE z IS NOT NULL;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_studies_updated_at 
    BEFORE UPDATE ON studies 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add constraints for data integrity
ALTER TABLE trajectories ADD CONSTRAINT chk_timestep_positive CHECK (timestep >= 0);
ALTER TABLE bifurcation_data ADD CONSTRAINT chk_iteration_positive CHECK (iteration >= 0);
ALTER TABLE sensitivity_data ADD CONSTRAINT chk_timestep_positive_sens CHECK (timestep >= 0);
ALTER TABLE system_parameters ADD CONSTRAINT chk_value_not_zero CHECK (value != 0);
ALTER TABLE chaos_metrics ADD CONSTRAINT chk_value_finite CHECK (value IS NOT NULL AND value = value);

-- Add comments for documentation
COMMENT ON TABLE studies IS 'Main table storing complex systems study metadata';
COMMENT ON TABLE system_parameters IS 'Parameter values used in complex systems simulations';
COMMENT ON TABLE initial_conditions IS 'Starting conditions for dynamical system simulations';
COMMENT ON TABLE trajectories IS 'Time series data from complex systems simulations';
COMMENT ON TABLE chaos_metrics IS 'Computed chaos theory and complexity metrics';
COMMENT ON TABLE bifurcation_data IS 'Bifurcation analysis results showing system behavior changes';
COMMENT ON TABLE universal_constants IS 'Universal constants discovered in complex systems studies';
COMMENT ON TABLE sensitivity_data IS 'Sensitivity analysis results showing system response to perturbations';

-- Create view for easy access to study summaries
CREATE VIEW study_summaries AS
SELECT 
    s.id,
    s.name,
    s.system_type,
    s.description,
    s.date_conducted,
    COUNT(DISTINCT t.id) as trajectory_points,
    COUNT(DISTINCT cm.id) as metrics_computed,
    COUNT(DISTINCT sp.id) as parameters_count,
    s.created_at
FROM studies s
LEFT JOIN trajectories t ON s.id = t.study_id
LEFT JOIN chaos_metrics cm ON s.id = cm.study_id
LEFT JOIN system_parameters sp ON s.id = sp.study_id
GROUP BY s.id, s.name, s.system_type, s.description, s.date_conducted, s.created_at;

-- Grant appropriate permissions (adjust as needed for your setup)
-- GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO complex_systems_user;
-- GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO complex_systems_user;




