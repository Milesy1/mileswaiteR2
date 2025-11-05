-- Add 'logistic' system type to the studies table constraint
-- This allows logistic map studies to be stored properly

BEGIN;

-- Drop the existing constraint
ALTER TABLE studies DROP CONSTRAINT IF EXISTS studies_system_type_check;

-- Add the updated constraint including 'logistic'
ALTER TABLE studies
ADD CONSTRAINT studies_system_type_check
CHECK (system_type IN ('lorenz', 'logistic', 'henon', 'rossler', 'other'));

-- Update any existing logistic studies that might have been using 'other'
UPDATE studies 
SET system_type = 'logistic' 
WHERE name ILIKE '%logistic%' AND system_type = 'other';

COMMIT;










