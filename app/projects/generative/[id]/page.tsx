import { notFound } from 'next/navigation';
import { getSketchById, getAllSketchIds } from '@/data/sketches';
import CylinderAnimation from './CylinderAnimation';

export function generateStaticParams() {
  return getAllSketchIds().map((id) => ({ id }));
}

export default async function SketchPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const sketch = getSketchById(id);

  if (!sketch) {
    notFound();
  }

  return <CylinderAnimation />;
}
