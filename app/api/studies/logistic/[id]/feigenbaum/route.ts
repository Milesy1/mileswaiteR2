import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/database';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const res = await query(
      `SELECT constant_name, value, uncertainty, computation_method 
       FROM universal_constants 
       WHERE study_id = $1 
       ORDER BY constant_name`,
      [id]
    );
    return NextResponse.json({ constants: res.rows }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
