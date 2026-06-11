# Code Block Wrap/Unwrap Toggle Feature

## Overview
This feature adds a toggle button to all code blocks that allows users to switch between wrapped and unwrapped text display modes.

## User Experience

### Default Behavior
- **Initial State**: All code blocks start in **unwrapped mode**
  - Code preserves original formatting
  - Long lines extend beyond the container
  - Horizontal scrollbar appears when needed
  - Button displays: "Unwrapped"

### Toggle Functionality
- **Click the button** to switch modes:
  - **Unwrapped → Wrapped**: Code wraps to fit container width, no horizontal scroll
  - **Wrapped → Unwrapped**: Code returns to original formatting with horizontal scroll

### Visual Indicators
- Button text shows current state: "Unwrapped" or "Wrapped"
- Horizontal scroll indicator appears in unwrapped mode

## Technical Implementation

### Components Modified
**src/layouts/BaseLayout.astro** — CSS styling for toggle button, wrapped state CSS, JavaScript to add buttons and handle toggling.

### Key Files
- **src/layouts/BaseLayout.astro**: Contains all CSS and JavaScript
- Line ~564: Button CSS
- Line ~580: Wrapped state CSS  
- Line ~1973: JavaScript implementation

## Accessibility

- **Keyboard Accessible**: Button is focusable and keyboard-operable
- **Screen Readers**: `aria-label="Toggle line wrapping"`, `role="button"`
- **Visual Feedback**: Hover effects, active state with scale transform

## Troubleshooting

### Toggle button not appearing
- Check browser console for JavaScript errors
- Ensure code blocks have proper HTML structure (`<pre><code>...</code></pre>`)
- Verify JavaScript is enabled

### Toggle not working
- Check console for "Toggle clicked" messages
- Verify no other scripts are interfering with click events
- Clear browser cache and hard refresh (Ctrl+F5)

### Code still wraps/doesn't wrap
- Inline styles with `!important` should override everything
- Check for browser extensions interfering with styles
- Inspect element to verify styles are being applied
