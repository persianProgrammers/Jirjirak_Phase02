import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const TARGET_DIRS = [
  path.resolve('public/assets/images'),
  path.resolve('src/assets/images'),
];

async function getFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const dirent of list) {
    const fullPath = path.join(dir, dirent.name);
    if (dirent.isDirectory()) {
      results = results.concat(await getFiles(fullPath));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

async function run() {
  console.log('🚀 Starting Universal Image Optimization Pipeline...');
  let totalOriginal = 0;
  let totalOptimized = 0;
  let convertedCount = 0;

  // First: copy any webp/jpg from src/assets/images to public/assets/images/projects if present
  const srcImagesDir = path.resolve('src/assets/images');
  const publicProjectsDir = path.resolve('public/assets/images/projects');
  if (fs.existsSync(srcImagesDir) && fs.existsSync(publicProjectsDir)) {
    const files = fs.readdirSync(srcImagesDir);
    for (const f of files) {
      const srcFile = path.join(srcImagesDir, f);
      const destFile = path.join(publicProjectsDir, f);
      if (!fs.existsSync(destFile)) {
        fs.copyFileSync(srcFile, destFile);
        console.log(`Copied ${f} -> public/assets/images/projects/`);
      }
    }
  }

  for (const baseDir of TARGET_DIRS) {
    const files = await getFiles(baseDir);
    for (const filePath of files) {
      const ext = path.extname(filePath).toLowerCase();
      if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;

      const webpPath = filePath.replace(new RegExp(`\\${ext}$`, 'i'), '.webp');
      const originalStat = fs.statSync(filePath);
      totalOriginal += originalStat.size;

      // Always generate or update WebP if missing or older
      const shouldGenerate = !fs.existsSync(webpPath) || fs.statSync(webpPath).mtimeMs < originalStat.mtimeMs;

      if (shouldGenerate) {
        try {
          const image = sharp(filePath);
          const metadata = await image.metadata();

          // Cap extremely oversized renders to max 2400px width/height while maintaining aspect ratio
          let pipeline = image;
          if (metadata.width && metadata.width > 2400) {
            pipeline = pipeline.resize({ width: 2400, withoutEnlargement: true });
          }

          if (ext === '.png') {
            await pipeline
              .webp({
                quality: 85,
                alphaQuality: 90,
                effort: 4,
                lossless: false,
              })
              .toFile(webpPath);
          } else {
            await pipeline
              .webp({
                quality: 82,
                effort: 4,
              })
              .toFile(webpPath);
          }

          convertedCount++;
          console.log(`Generated: ${path.relative(process.cwd(), webpPath)}`);
        } catch (err) {
          console.error(`Failed to convert ${filePath}:`, err.message);
        }
      }

      if (fs.existsSync(webpPath)) {
        totalOptimized += fs.statSync(webpPath).size;
      } else {
        totalOptimized += originalStat.size;
      }
    }
  }

  const origMB = (totalOriginal / (1024 * 1024)).toFixed(2);
  const optMB = (totalOptimized / (1024 * 1024)).toFixed(2);
  const savedPercent = totalOriginal > 0 ? (((totalOriginal - totalOptimized) / totalOriginal) * 100).toFixed(1) : '0';

  console.log(`\n🎉 Image Optimization Completed!`);
  console.log(`📁 Converted / Updated: ${convertedCount} assets`);
  console.log(`📉 Total original size: ${origMB} MB`);
  console.log(`🚀 Total WebP size:     ${optMB} MB`);
  console.log(`⚡ Savings:             ${savedPercent}% bandwidth reduction!\n`);
}

run().catch((err) => {
  console.warn('⚠️ Warning in optimizer (continuing to start dev server):', err.message);
  process.exit(0);
});
