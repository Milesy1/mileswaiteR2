export interface Sketch {
  id: string;
  title: string;
  description: string;
  file: string;
  thumbnail?: string;
  width: number;
  height: number;
  tags?: string[];
}


// GENERATIVE ART SKETCHES - GIF VERSIONS
export const SKETCHES: Sketch[] = [
  {
    id: 'cylinder-animation',
    title: 'Cylinder',
    description: '3D rotating cylinder with animated lines',
    file: '/sketches/js/cylinder-animation.js',
    thumbnail: '/sketches/gifs/cylinderroate.gif',
    width: 400,
    height: 400,
    tags: ['3d', 'geometry', 'animation']
  }
];

// Helper function to get sketch by id
export function getSketchById(id: string): Sketch | undefined {
  return SKETCHES.find(sketch => sketch.id === id);
}

// Helper function to get all sketch ids for static generation
export function getAllSketchIds(): string[] {
  return SKETCHES.map(sketch => sketch.id);
}
