import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const WIDTH = 800;
const HEIGHT = 400;

async function generateImage(title, description, outputPath) {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Title
  ctx.font = 'bold 48px Arial';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.fillText(title, WIDTH / 2, HEIGHT / 2 - 50);

  // Description
  ctx.font = '24px Arial';
  ctx.fillStyle = '#cccccc';
  ctx.fillText(description, WIDTH / 2, HEIGHT / 2 + 50);

  // Save the image
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
}

async function main() {
  // Generate Technical Documentation image
  await generateImage(
    'Technical Documentation',
    'Detailed technical specifications and implementation details',
    path.join(__dirname, 'technical-docs.png')
  );

  // Generate Project Overview image
  await generateImage(
    'Project Overview',
    'Comprehensive project structure and feature documentation',
    path.join(__dirname, 'project-overview.png')
  );
}

main().catch(console.error); 