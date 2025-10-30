import { NextRequest, NextResponse } from 'next/server';
import { ComplexSystemsData } from '@/lib/complex-systems-data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await ComplexSystemsData.getStudy(id);
    
    if (!result.study) {
      return NextResponse.json(
        { error: 'Study not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ study: result.study }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
