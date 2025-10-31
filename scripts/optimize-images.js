const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Large images to optimize
const imagesToOptimize = [
  'rag9.png',
  'string_field_theory2.png',
  'network.png',
  'complexsystems2.png'
];

const imagesDir = path.join(process.cwd(), 'public', 'images');
const optimizedDir = path.join(imagesDir, 'optimized');

// Create optimized directory if it doesn't exist
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

async function optimizeImage(filename) {
  const inputPath = path.join(imagesDir, filename);
  const baseName = path.parse(filename).name;
  
  // Check if file exists
  if (!fs.existsSync(inputPath)) {
    console.log(`⚠️  Skipping ${filename} - file not found`);
    return;
  }

  const stats = fs.statSync(inputPath);
  const originalSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`\n📸 Optimizing ${filename} (${originalSizeMB} MB)...`);

  try {
    // Generate WebP version
    const webpPath = path.join(optimizedDir, `${baseName}.webp`);
    await sharp(inputPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(webpPath);
    
    const webpStats = fs.statSync(webpPath);
    const webpSizeMB = (webpStats.size / (1024 * 1024)).toFixed(2);
    const webpSavings = ((1 - webpStats.size / stats.size) * 100).toFixed(1);
    console.log(`  ✅ WebP: ${webpSizeMB} MB (${webpSavings}% smaller)`);

    // Generate AVIF version (better compression, smaller file)
    const avifPath = path.join(optimizedDir, `${baseName}.avif`);
    await sharp(inputPath)
      .avif({ quality: 80, effort: 6 })
      .toFile(avifPath);
    
    const avifStats = fs.statSync(avifPath);
    const avifSizeMB = (avifStats.size / (1024 * 1024)).toFixed(2);
    const avifSavings = ((1 - avifStats.size / stats.size) * 100).toFixed(1);
    console.log(`  ✅ AVIF: ${avifSizeMB} MB (${avifSavings}% smaller)`);

    // Also create optimized WebP version to replace original (for fallback)
    const optimizedWebpPath = path.join(imagesDir, `${baseName}.webp`);
    await sharp(inputPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(optimizedWebpPath);
    
    console.log(`  📁 Created optimized versions in /public/images/optimized/`);
    console.log(`  📁 Created fallback WebP in /public/images/`);

  } catch (error) {
    console.error(`  ❌ Error optimizing ${filename}:`, error.message);
  }
}

async function optimizeAll() {
  console.log('🚀 Starting image optimization...\n');
  console.log(`📂 Source directory: ${imagesDir}`);
  console.log(`📂 Output directory: ${optimizedDir}\n`);

  for (const image of imagesToOptimize) {
    await optimizeImage(image);
  }

  console.log('\n✨ Optimization complete!');
  console.log('\n📝 Next steps:');
  console.log('   1. Review optimized images in /public/images/optimized/');
  console.log('   2. Update image references in app/data/projects.ts to use .webp or .avif');
  console.log('   3. Next.js Image component will automatically serve AVIF to supported browsers');
}

optimizeAll().catch(console.error);




