import { query } from './database';
import { TrajectoryPoint, Study, Metric } from './types/complex-systems';

interface CacheResult<T> {
  data: T;
  fromCache: boolean;
}

export class ComplexSystemsData {
  /**
   * Get study by ID
   */
  static async getStudy(studyId: string): Promise<{ study: Study | null }> {
    try {
      console.log('Fetching study:', studyId);
      const result = await query(
        `SELECT id, name, system_type, description, date_conducted, metadata, created_at, updated_at
         FROM studies WHERE id = $1::uuid`,
        [studyId]
      );

      console.log('Study query result:', { rowCount: result.rows.length, rows: result.rows });

      if (result.rows.length === 0) {
        console.log('Study not found in database');
        return { study: null };
      }

      const study = result.rows[0];
      
      // Get parameters
      const paramsResult = await query(
        `SELECT parameter_name, value, units
         FROM system_parameters WHERE study_id = $1::uuid`,
        [studyId]
      );
      
      // Get initial conditions
      const initResult = await query(
        `SELECT variable_name, value
         FROM initial_conditions WHERE study_id = $1::uuid`,
        [studyId]
      );

      return {
        study: {
          ...study,
          parameters: paramsResult.rows,
          initial_conditions: initResult.rows
        } as Study
      };
    } catch (error) {
      console.error('Error fetching study:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message, error.stack);
      }
      return { study: null };
    }
  }

  /**
   * Get trajectory data for a study
   */
  static async getTrajectories(
    studyId: string,
    sampleRate?: number
  ): Promise<CacheResult<{ trajectories: TrajectoryPoint[] }>> {
    try {
      let sql = `
        SELECT timestep, time, x, y, z
        FROM trajectories
        WHERE study_id = $1::uuid
        ORDER BY timestep
      `;

      if (sampleRate && sampleRate > 1) {
        sql = `
          SELECT timestep, time, x, y, z
          FROM trajectories
          WHERE study_id = $1::uuid AND timestep % $2 = 0
          ORDER BY timestep
        `;
      }

      const params = sampleRate ? [studyId, sampleRate] : [studyId];
      const result = await query(sql, params);

      const trajectories: TrajectoryPoint[] = result.rows.map((row: any) => ({
        timestep: row.timestep,
        time: Number(row.time),
        x: Number(row.x),
        y: Number(row.y),
        z: Number(row.z)
      }));

      return {
        data: { trajectories },
        fromCache: false // Could implement Redis caching here later
      };
    } catch (error) {
      console.error('Error fetching trajectories:', error);
      return {
        data: { trajectories: [] },
        fromCache: false
      };
    }
  }

  /**
   * Get chaos metrics for a study
   */
  static async getMetrics(studyId: string): Promise<CacheResult<{ metrics: Metric[] }>> {
    try {
      // TODO: Implement metrics query when metrics table is available
      // For now, return empty array
      return {
        data: { metrics: [] },
        fromCache: false
      };
    } catch (error) {
      console.error('Error fetching metrics:', error);
      return {
        data: { metrics: [] },
        fromCache: false
      };
    }
  }

  /**
   * Get system parameters for a study
   */
  static async getParameters(studyId: string): Promise<CacheResult<{ parameters: any[] }>> {
    try {
      const result = await query(
        `SELECT parameter_name, value, units
         FROM system_parameters WHERE study_id = $1::uuid`,
        [studyId]
      );
      return {
        data: { parameters: result.rows },
        fromCache: false
      };
    } catch (error) {
      console.error('Error fetching parameters:', error);
      return {
        data: { parameters: [] },
        fromCache: false
      };
    }
  }

  /**
   * Get initial conditions for a study
   */
  static async getInitialConditions(studyId: string): Promise<CacheResult<{ conditions: any[] }>> {
    try {
      const result = await query(
        `SELECT variable_name, value
         FROM initial_conditions WHERE study_id = $1::uuid`,
        [studyId]
      );
      return {
        data: { conditions: result.rows },
        fromCache: false
      };
    } catch (error) {
      console.error('Error fetching initial conditions:', error);
      return {
        data: { conditions: [] },
        fromCache: false
      };
    }
  }

  /**
   * Seed sample data for testing
   */
  static async seedSampleData(): Promise<void> {
    // TODO: Implement seeding logic when needed
    return Promise.resolve();
  }
}
