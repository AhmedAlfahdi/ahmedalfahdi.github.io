# PDF Viewer Guide

Your website supports PDF viewing using **PDF.js** — Mozilla's powerful PDF rendering library.

## PDFViewer Component

Professional PDF viewer with custom controls — guaranteed to display PDFs inline regardless of browser settings.

**Features:**
- ✅ Guaranteed inline display — Never downloads, always displays
- ✅ Custom navigation controls — Previous/Next page buttons
- ✅ Zoom controls — Zoom in/out with visual feedback
- ✅ Page counter — Shows current page and total pages
- ✅ Download button — Easy PDF download option
- ✅ Dark mode support — Adapts to your site's theme
- ✅ Loading indicator — Shows progress while loading
- ✅ Error handling — Graceful error messages
- ✅ All modern browsers — Chrome, Firefox, Safari, Edge
- ✅ Mobile friendly — Works on phones and tablets

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
- **◀️ Previous Page** / **▶️ Next Page** — Navigate pages
- **Page Counter** — Shows "1 / 5" format
- **➖ Zoom Out** / **➕ Zoom In** — Adjust zoom level
- **📥 Download** — Download the PDF file

## Setting Up PDF Files

1. Create directory: `mkdir -p public/pdfs`
2. Place PDF files in `public/pdfs/`
3. Reference in your notes with path starting `/pdfs/`

## Tips

- Keep PDFs under 10MB for best performance
- Optimize PDFs before uploading
- Always provide a `title` prop for accessibility
- Use `height="500px"` or less for mobile-friendly viewing

## Troubleshooting

**PDF Not Displaying:**
1. Check file path — ensure PDF is in `public/pdfs/`
2. Check file name — case-sensitive on some servers
3. Verify PDF format — some PDFs may be corrupted
4. Check browser console for error messages
