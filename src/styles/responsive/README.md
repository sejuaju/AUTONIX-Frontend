# AUTONIX Responsive Styles Structure

## Overview

Organized responsive CSS structure for the AUTONIX website, with media queries separated by screen size into individual files.

## File Structure

```
responsive/
├── index.css              # Main file that imports all breakpoints
├── extra-small.css        # < 360px (Ultra small devices)
├── mobile.css             # 360px - 575px (Mobile devices)
├── tablet.css             # 576px - 991px (Tablet devices)
├── desktop.css            # 992px - 1199px (Desktop devices)
├── large-desktop.css      # 1200px+ (Large desktop devices)
└── README.md              # This documentation
```

## Breakpoint Details

### Extra Small Devices (< 360px)

- **File**: `extra-small.css`
- **Target**: Phones with very small screens
- **Features**: Minimal layout, small fonts, mobile navigation

### Mobile Devices (360px - 575px)

- **File**: `mobile.css`
- **Target**: Standard smartphones
- **Features**: Single column layout, hamburger navigation, touch optimization

### Tablet Devices (576px - 991px)

- **File**: `tablet.css`
- **Target**: Tablets and landscape smartphones
- **Features**: 2-column layout, horizontal navigation, medium fonts

### Desktop Devices (992px - 1199px)

- **File**: `desktop.css`
- **Target**: Standard desktop and laptops
- **Features**: Multi-column layout, hover effects, full navigation

### Large Desktop Devices (1200px+)

- **File**: `large-desktop.css`
- **Target**: Large monitors and ultra-wide displays
- **Features**: Maximum layout, advanced animations, optimal spacing

## Usage

### 1. Import in Layout.astro

```astro
---
import '../styles/responsive/index.css';
---
```

### 2. Import Individual Files (Optional)

```css
@import './responsive/mobile.css';
@import './responsive/tablet.css';
/* etc... */
```

### 3. Using Utility Classes

```html
<!-- Hide/Show based on breakpoint -->
<div class="hide-mobile show-tablet">Only visible on tablet+</div>
<div class="show-mobile hide-tablet">Only visible on mobile</div>

<!-- Responsive text -->
<h1 class="title-responsive">Responsive Title</h1>
<p class="text-responsive">Responsive Text</p>

<!-- Responsive grid -->
<div class="grid-responsive">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

## Recommended CSS Variables

For consistency, use the following CSS variables in the `global.css` file:

```css
:root {
  /* Breakpoints */
  --breakpoint-xs: 360px;
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
  --breakpoint-xxl: 1400px;

  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;

  /* Font sizes */
  --font-xs: 0.75rem;
  --font-sm: 0.875rem;
  --font-base: 1rem;
  --font-lg: 1.125rem;
  --font-xl: 1.25rem;
  --font-2xl: 1.5rem;
  --font-3xl: 2rem;
}
```

## Best Practices

1. **Mobile First**: Start with mobile styling, then add for larger screens
2. **Progressive Enhancement**: Add advanced features for larger screens
3. **Performance**: Import only necessary files
4. **Consistency**: Use consistent spacing and font sizes
5. **Testing**: Test on various devices and screen sizes

## Maintenance

- **Update Breakpoints**: Edit individual files as needed
- **Add New Breakpoints**: Create new files and add imports in `index.css`
- **Remove Unused Styles**: Delete unused CSS for optimization

## Notes

- All files use `max-width` and `min-width` for precision
- Hover effects are only applied on desktop+ for performance
- Utility classes are available for all breakpoints
- Grid system automatically adjusts columns based on screen size
