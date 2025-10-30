export interface TrajectoryPoint {
  timestep: number;
  time: number;
  x: number;
  y: number;
  z: number;
}

export interface Study {
  id: string;
  name: string;
  system_type: string;
  description?: string;
  date_conducted: string;
  metadata?: any;
  created_at: string;
  updated_at: string;
  parameters?: SystemParameter[];
  initial_conditions?: InitialCondition[];
}

export interface SystemParameter {
  parameter_name: string;
  value: number;
  units?: string;
}

export interface InitialCondition {
  variable_name: string;
  value: number;
}

export interface TrajectoryResponse {
  study_id: string;
  points: TrajectoryPoint[];
  total_points: number;
  sampled: boolean;
  sample_size?: number;
}

export interface ErrorResponse {
  error: string;
  message: string;
  status: number;
  details?: any;
}
