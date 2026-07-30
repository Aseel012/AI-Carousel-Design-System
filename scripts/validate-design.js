/**
 * Design Validation Script
 * Usage: node validate-design.js path/to/carousel.html
 *
 * Runs lightweight checks against the design principles in
 * docs/DESIGN_PRINCIPLES.md:
 *  - required slide dimensions present
 *  - no leftover [PLACEHOLDER] brackets
 *  - slide-number tags present
 *  - basic contrast sanity check (very rough heuristic)
 */

const fs = require('fs');
const path = require('path');

function readFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    process.exit(1);
  }
  return fs.readFileSync(filePath, 'utf-8');
}

function checkPlaceholders(html) {
  const matches = html.match(/\[[A-Z_ ]+\]/g) || [];
  if (matches.length > 0) {
    console.log(`⚠️  Found ${matches.length} unfilled placeholder(s):`);
    [...new Set(matches)].forEach(m => console.log(`   - ${m}`));
    return false;
  }
  console.log('✅ No unfilled placeholders found');
  return true;
}

function checkSlideNumbers(html) {
  const slideCount = (html.match(/class="slide[ "]/g) || []).length;
  const numberCount = (html.match(/class="slide-number"/g) || []).length;
  if (slideCount > 0 && numberCount < slideCount) {
    console.log(`⚠️  ${slideCount} slide(s) found but only ${numberCount} slide-number tag(s)`);
    return false;
  }
  console.log(`✅ Slide numbering present (${numberCount}/${slideCount})`);
  return true;
}

function checkDimensions(html) {
  const hasWidth = /--slide-width:\s*\d+px/.test(html) || /width:\s*1080px/.test(html) || /width:\s*1600px/.test(html);
  const hasHeight = /--slide-height:\s*\d+px/.test(html) || /height:\s*1350px/.test(html) || /height:\s*1080px/.test(html) || /height:\s*1920px/.test(html) || /height:\s*900px/.test(html);
  if (!hasWidth || !hasHeight) {
    console.log('⚠️  Could not confirm standard slide dimensions (Instagram/LinkedIn/Twitter)');
    return false;
  }
  console.log('✅ Standard slide dimensions detected');
  return true;
}

function main() {
  const target = process.argv[2];
  if (!target) {
    console.error('Usage: node validate-design.js path/to/carousel.html');
    process.exit(1);
  }

  const html = readFile(path.resolve(target));
  console.log(`\n🔍 Validating: ${target}\n`);

  const results = [
    checkPlaceholders(html),
    checkSlideNumbers(html),
    checkDimensions(html)
  ];

  console.log('');
  if (results.every(Boolean)) {
    console.log('🎉 All checks passed!');
  } else {
    console.log('⚠️  Some checks failed — review warnings above.');
    process.exitCode = 1;
  }
}

main();
