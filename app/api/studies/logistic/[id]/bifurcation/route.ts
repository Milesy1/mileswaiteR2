import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/database';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const rMin = searchParams.get('r_min');
    const rMax = searchParams.get('r_max');

    const queryParams: any[] = [id];
    let where = 'WHERE study_id = $1';
    if (rMin) { queryParams.push(parseFloat(rMin)); where += ` AND parameter_value >= $${queryParams.length}`; }
    if (rMax) { queryParams.push(parseFloat(rMax)); where += ` AND parameter_value <= $${queryParams.length}`; }

    const res = await query(
      `SELECT parameter_value, state_value, iteration, is_stable
       FROM bifurcation_data ${where}
       ORDER BY parameter_value, iteration`,
      queryParams
    );

    return NextResponse.json({ bifurcation: res.rows }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
