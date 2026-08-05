# 🎨 Design Principles for AI Carousel Generation

## 1. Visual Hierarchy (Most Important)

### Typography Scale
- H1 (Slide Title): 48-64px, Bold, Sans-serif
- H2 (Subheading): 32-40px, Semi-bold
- Body: 18-24px, Regular
- Caption: 14-16px, Light
- 

### Spacing System
- Base unit: 8px
- Slide padding: 48-64px
- Element spacing: 16px, 24px, 32px, 48px
- Safe zone: Keep text 60px from edges

## 2. Color Application Rules

### Primary/Secondary/Accent Ratio
- 60% Primary (backgrounds)
- 30% Secondary (cards, containers)
- 10% Accent (CTAs, highlights)

### Accessibility
- Minimum contrast ratio: 4.5:1
- Never place light text on light backgrounds
- Test with grayscale filter

## 3. Layout Patterns

### Slide Types
1. **Hook Slide** - Bold statement, minimal text, strong visual
2. **Problem Slide** - Relatable pain point, empathetic imagery
3. **Solution Slide** - Clear benefit, iconography
4. **Proof Slide** - Testimonials, data, results
5. **CTA Slide** - Clear action, contact info

### Grid System
- 12-column grid
- Max 3 distinct elements per slide
- F-pattern or Z-pattern eye flow

## 4. Trending Aesthetics (2024)

### Glassmorphism
```css
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.2);
```

### Neo-Brutalism
- Bold black borders (3-4px)
- High contrast colors
- System fonts
- Asymmetric layouts

### Soft Gradients
- 135-degree angle
- 2-3 color stops max
- Pastel or muted tones
- Subtle, not overpowering

## 5. Character Consistency Rules

When using people in carousels:
- Same character across all slides OR
- Consistent art style if multiple characters
- Maintain same lighting direction
- Consistent skin tones and features
- Document reference angles: front, 3/4, profile

## 6. Text Rendering Guidelines

### For Image Generation
- NO text in generated images (use HTML overlay)
- If text required: use placeholder blocks
- Generate at 2x resolution for crispness

### For HTML Generation
- Use web-safe fonts or Google Fonts
- Implement proper fallbacks
- Test text wrapping at all breakpoints
