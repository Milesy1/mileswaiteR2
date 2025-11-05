import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/database';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const search = new URL(request.url).searchParams;
    const name = search.get('name') || 'lyapunov_exponent';

    const res = await query(
      `SELECT metric_name, value, computation_method, metadata, created_at
       FROM chaos_metrics
       WHERE study_id = $1 AND metric_name = $2
       ORDER BY created_at`,
      [id, name]
    );

    return NextResponse.json({ metrics: res.rows }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Unknown error' },
      { status: 500 }
    );
  }
}










