# PDF Viewer Guide

Your website now supports PDF viewing using **PDF.js** - Mozilla's powerful PDF rendering library!

## PDFViewer Component

Professional PDF viewer with custom controls - guaranteed to display PDFs inline regardless of browser settings.

**Features:**
- ✅ **Guaranteed inline display** - Never downloads, always displays
- ✅ **Custom navigation controls** - Previous/Next page buttons
- ✅ **Zoom controls** - Zoom in/out with visual feedback
- ✅ **Page counter** - Shows current page and total pages
- ✅ **Download button** - Easy PDF download option
- ✅ **Dark mode support** - Adapts to your site's theme
- ✅ **Loading indicator** - Shows progress while loading
- ✅ **Error handling** - Graceful error messages
- ✅ **No external dependencies** - Uses PDF.js from CDN
- ✅ **Works offline** - After first load
- ✅ **All modern browsers** - Chrome, Firefox, Safari, Edge
- ✅ **Mobile friendly** - Works on phones and tablets

---

## Usage

```mdx
---
layout: ../../layouts/BaseLayout.astro
title: My PDF Document
---

import PDFViewer from '../../components/PDFViewer.astro';

# My Document

<PDFViewer 
  src="/pdfs/my-document.pdf" 
  title="My Important Document"
  height="600px"
/>
```

### Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | string | **required** | Path to PDF file |
| `title` | string | `"PDF Document"` | Accessibility title |
| `height` | string | `"600px"` | Viewer height |
| `width` | string | `"100%"` | Viewer width |

### Built-in Controls

The PDF.js viewer provides custom controls:
- **◀️ Previous Page** - Navigate to previous page
- **▶️ Next Page** - Navigate to next page
- **Page Counter** - Shows "1 / 5" format
- **➖ Zoom Out** - Decrease zoom level
- **➕ Zoom In** - Increase zoom level
- **Zoom Display** - Shows current zoom (e.g., "150%")
- **📥 Download** - Download the PDF file

---

## Setting Up PDF Files

### 1. Create Public Directory
```bash
mkdir -p public/pdfs
```

### 2. Add Your PDFs
Place PDF files in `public/pdfs/`:
```
public/
└── pdfs/
    ├── research-paper.pdf
    ├── resume.pdf
    └── presentation.pdf
```

### 3. Reference in Your Notes
```mdx
<PDFViewer src="/pdfs/research-paper.pdf" title="Research Paper" />
```

**Note:** The path starts with `/pdfs/` because files in `public/` are served from the root.

---

## Examples

### Embed in Assembly Notes
```mdx
---
layout: ../../layouts/BaseLayout.astro
title: x86 Assembly Reference
---

import PDFViewer from '../../components/PDFViewer.astro';

# x86 Assembly Reference

Here's the Intel manual for reference:

<PDFViewer 
  src="/pdfs/intel-manual.pdf" 
  title="Intel x86 Manual"
  height="800px"
/>
```

### Multiple PDFs in One Page
```mdx
<PDFViewer 
  src="/pdfs/chapter1.pdf" 
  title="Chapter 1: Introduction"
  height="500px"
/>

<PDFViewer 
  src="/pdfs/chapter2.pdf" 
  title="Chapter 2: Architecture"
  height="500px"
/>
```

### Compact Display
```mdx
<PDFViewer 
  src="/pdfs/quick-reference.pdf" 
  title="Quick Reference Card"
  height="400px"
/>
```

---

## Browser Compatibility

- ✅ Chrome/Edge (all versions)
- ✅ Firefox (all versions)
- ✅ Safari (all versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ Works offline (no external dependencies)

---

## Tips

### 1. File Size
- Keep PDFs under 10MB for best performance
- Optimize PDFs before uploading (use compression tools)

### 2. Performance
- Fast loading with no external dependencies
- Browser handles all PDF rendering
- Consider lazy loading for multiple PDFs on one page

### 3. Accessibility
- Always provide a `title` prop
- Include download option for users who prefer external viewers
- Ensure PDFs have proper text content (not just scanned images)

### 4. Mobile
- Use `height="500px"` or less for mobile-friendly viewing
- Test scrolling behavior on mobile devices
- Download button is especially useful on mobile

---

## Troubleshooting

### PDF Not Displaying
1. **Check file path**: Ensure PDF is in `public/pdfs/`
2. **Check file name**: Case-sensitive on some servers
3. **Verify PDF format**: Some PDFs may be corrupted
4. **Browser console**: Check for error messages
5. **Try opening in new tab**: Click "Open in New Tab" button to test

### Rendering Issues
1. Open PDF in new tab to test if file is valid
2. Check browser console for errors
3. Ensure PDF is not password-protected
4. Try a different PDF to isolate the issue

---

## Advanced Customization

### Custom Styling
The component can be styled by modifying `src/components/PDFViewer.astro`:
- Adjust colors and themes
- Change button styles
- Modify layout and spacing
- Add custom controls

### Browser PDF Viewer Features
Most modern browsers provide built-in features:
- Search within PDF
- Page navigation controls
- Zoom in/out
- Print functionality
- Rotate pages
- Text selection and copy

---

## Resources

- [MDN: Object Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object)
- [PDF Optimization Tools](https://www.adobe.com/acrobat/online/compress-pdf.html)
- [Browser PDF Support](https://caniuse.com/pdf-viewer)

