'use client';

import dynamic from 'next/dynamic';
import { Skeleton3D } from '@/components/Skeleton3D';

// Dynamically import the cylinder component
const RotatingCylinderLinesR3F = dynamic(
  () => import('@/components/RotatingCylinderLinesR3F'),
  { 
    ssr: false,
    loading: () => <Skeleton3D size="large" />
  }
);

export default function ClientCylinder() {
  return (
    <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto text-center">
        <div className="w-80 h-80 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] xl:w-[36rem] xl:h-[36rem] mx-auto">
          <RotatingCylinderLinesR3F />
        </div>
      </div>
    </section>
  );
}

