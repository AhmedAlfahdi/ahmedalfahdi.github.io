# Light Theme Implementation

## Overview
Light theme for the website that maintains consistency with the existing dark theme's industrial/engineering aesthetic.

## Features

### Theme Toggle Component
- **Location**: Fixed position in top-left corner
- **Icon**: Sun icon for dark mode, moon icon for light mode
- **Animation**: Smooth rotation and scale transitions
- **Position**: Desktop: `top: 1rem; left: 1.4rem`, Mobile: scaled to 36px

### Color Palette

#### Dark Theme (Default)
- Backgrounds: `#0b1015` (primary), `#101820` (secondary), `#161f29` (tertiary)
- Text: `#e4e7ed` (primary), `#9ea7b3` (secondary), `#5f6b78` (muted)
- Accents: `#f5a524` (amber), `#62c7ff` (cyan), `#4ade80` (emerald)

#### Light Theme
- Backgrounds: `#f5f7fa` (primary), `#e8ecf1` (secondary), `#d6dde6` (tertiary)
- Text: `#1a2029` (primary), `#495463` (secondary), `#6b7785` (muted)
- Accents: `#d68910` (amber), `#0077cc` (cyan), `#059669` (emerald)

### Theme Switching Mechanism
1. **Initialization**: Theme loaded from localStorage or system preference
2. **Toggle**: Click the theme toggle button to switch
3. **Persistence**: Theme choice saved to localStorage
4. **System Preference**: Auto-detects `prefers-color-scheme`
5. **Smooth Transitions**: 0.3s ease transitions for all elements

### Components Updated
- `src/layouts/BaseLayout.astro` — Light theme CSS variables and styles
- `src/components/ThemeToggle.astro` — New theme toggle component
- `src/pages/index.astro` — Updated home page styles

## For Developers

The theme is controlled via the `data-theme` attribute on the root element:
- Dark mode: No attribute (default)
- Light mode: `data-theme="light"`

To add light theme support to new components:
```css
/* Dark theme (default) */
.my-component {
  background: var(--bg-primary);
  color: var(--text-primary);
}

/* Light theme */
:root[data-theme="light"] .my-component {
  /* Overrides for light mode if needed */
}
```
