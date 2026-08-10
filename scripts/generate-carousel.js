/**
 * AI Carousel Generator Script
 * Usage: node generate-carousel.js --niche=tech --slides=5 --theme=dark
 */
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  dimensions: {
    instagram: { width: 1080, height: 1350 },
    linkedin: { width: 1080, height: 1920 },
    twitter: { width: 1600, height: 900 }
  },

  niches: {
    tech: {
      colors: ['#6366f1', '#8b5cf6', '#06b6d4'],
      style: 'modern-minimal',
      tone: 'professional-innovative'
    },
    wellness: {
      colors: ['#55efc4', '#ffeaa7', '#ff7675'],
      style: 'organic-natural',
      tone: 'calming-approachable'
    },
    finance: {
      colors: ['#1e3a8a', '#fbbf24', '#10b981'],
      style: 'corporate-trust',
      tone: 'professional-authoritative'
    },
    creative: {
      colors: ['#ec4899', '#fbbf24', '#06b6d4'],
      style: 'bold-experimental',
      tone: 'energetic-playful'
    }
  }
};

// Generate image prompts
function generateImagePrompts(niche, slides, style) {
  const config = CONFIG.niches[niche];
  const prompts = [];

  const slideTypes = [
    'hook/attention-grabbing title slide',
    'problem/pain point visualization',
    'solution/method explanation',
    'proof/results showcase',
    'call-to-action finale'
  ];

  for (let i = 0; i < slides; i++) {
    const type = slideTypes[i] || 'content slide';
    const prompt = `
${niche.toUpperCase()} carousel slide ${i + 1}: ${type},
${config.style} aesthetic,
color palette: ${config.colors.join(', ')},
${config.tone} tone,
clean composition, generous white space,
trending 2024 design,
1080x1350px,
professional quality, 8k resolution,
no text, no watermarks
    `.trim();

    prompts.push({
      slide: i + 1,
      type: type,
      prompt: prompt
    });
  }

  return prompts;
}

// Generate HTML template
function generateHTML(niche, slides, theme) {
  const config = CONFIG.niches[niche];

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${niche.toUpperCase()} Carousel</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap');

        :root {
            --primary: ${config.colors[0]};
            --secondary: ${config.colors[1]};
            --accent: ${config.colors[2]};
            --background: ${theme === 'dark' ? '#1a1a2e' : '#ffffff'};
            --text: ${theme === 'dark' ? '#eaeaea' : '#1e293b'};
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Inter', sans-serif;
            background: #000;
            padding: 20px;
        }

        .slide {
            width: 1080px;
            height: 1350px;
            background: var(--background);
            margin-bottom: 20px;
            position: relative;
            overflow: hidden;
        }

        /* Add your slide styles here */
    </style>
</head>
<body>
    ${Array(slides).fill(0).map((_, i) => `
    <div class="slide slide-${i + 1}">
        <!-- Slide ${i + 1} Content -->
    </div>
    `).join('')}
</body>
</html>
  `.trim();
}

// Main execution
function main() {
  const args = process.argv.slice(2);
  const niche = args.find(a => a.startsWith('--niche='))?.split('=')[1] || 'tech';
  const slides = parseInt(args.find(a => a.startsWith('--slides='))?.split('=')[1] || '5');
  const theme = args.find(a => a.startsWith('--theme='))?.split('=')[1] || 'light';

  console.log('🎨 AI Carousel Generator\n');
  console.log(`Niche: ${niche}`);
  console.log(`Slides: ${slides}`);
  console.log(`Theme: ${theme}\n`);

  // Generate image prompts
  console.log('📸 Image Generation Prompts:\n');
  const imagePrompts = generateImagePrompts(niche, slides, theme);
  imagePrompts.forEach(p => {
    console.log(`Slide ${p.slide} (${p.type}):`);
    console.log(p.prompt);
    console.log('');
  });

  // Generate HTML
  console.log('\n💻 HTML Template:\n');
  const html = generateHTML(niche, slides, theme);
  console.log(html);

  // Save to file
  const outputDir = path.join(__dirname, '..', 'output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(outputDir, `${niche}-carousel-prompts.txt`),
    imagePrompts.map(p => `SLIDE ${p.slide} (${p.type}):\n${p.prompt}\n\n`).join('')
  );

  fs.writeFileSync(
    path.join(outputDir, `${niche}-carousel.html`),
    html
  );

  console.log(`\n✅ Files saved to /output/`);
}

main();
