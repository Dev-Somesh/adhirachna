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

  // Gradient background
  const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  gradient.addColorStop(0, '#1a1a1a');
  gradient.addColorStop(1, '#2d2d2d');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Load and draw logo
  try {
    const logo = await loadImage('https://raw.githubusercontent.com/Dev-Somesh/adhirachna/main/public/adhirachna-uploads/1bb22713-e329-4324-8be6-ed1a3a73cc9d.png');
    const logoSize = 100;
    const logoX = (WIDTH - logoSize) / 2;
    const logoY = HEIGHT / 2 - 150;
    ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
  } catch (error) {
    console.error('Error loading logo:', error);
  }

  // Add some decorative elements
  ctx.strokeStyle = '#ffffff20';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, HEIGHT / 2);
  ctx.lineTo(WIDTH, HEIGHT / 2);
  ctx.stroke();

  // Title with shadow
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.font = 'bold 48px Arial';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.fillText(title, WIDTH / 2, HEIGHT / 2 - 50);

  // Description
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.font = '24px Arial';
  ctx.fillStyle = '#cccccc';
  ctx.fillText(description, WIDTH / 2, HEIGHT / 2 + 50);

  // Add border
  ctx.strokeStyle = '#ffffff20';
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, WIDTH, HEIGHT);

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