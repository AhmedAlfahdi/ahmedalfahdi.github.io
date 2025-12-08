# MDX Usage Guide

This guide explains how to add content to your website using MDX (Markdown + JSX).

## Content Structure

Your content lives in `src/content/`:
-   `coding/`: Programming projects
-   `notes/`: Obsidian notes
-   `engineering/`: Engineering projects
-   `career/`: Professional experience

## Creating a New Page

1.  Create a `.mdx` file in the appropriate directory.
2.  Add the required frontmatter at the top.

### Example Frontmatter

```yaml
---
title: "My Project Title"
description: "A brief description."
date: 2025-11-24
tags: ["tag1", "tag2"]
---
```

## Using Components

You can import and use custom components in your MDX files.

### 3D Models (`Model3D`)

Embed interactive 3D models (`.glb`, `.gltf`, `.obj`). Place your model files in `public/models/`.

```astro
import Model3D from '../../components/Model3D.astro';

<Model3D 
  src="/models/my-model.glb" 
  height="500px" 
  scale={1.5} 
  autoRotate={true}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | string | required | Path to model file (start with `/`) |
| `height` | string | `'500px'` | Height of the viewer |
| `scale` | number | `1` | Scale factor for the model |
| `autoRotate` | boolean | `true` | Whether to rotate automatically |
| `background` | string | `'default'` | Background color or `'transparent'` |

### PDF Viewer (`PDFViewer`)

Embed PDF documents. Place your PDF files in `public/pdfs/`.

```astro
import PDFViewer from '../../components/PDFViewer.astro';

<PDFViewer 
  src="/pdfs/my-document.pdf" 
  title="Document Title" 
  height="600px" 
/>
```

### Mermaid Diagrams (`Mermaid`)

Create diagrams using Mermaid syntax.

```astro
import Mermaid from '../../components/Mermaid.astro';

<Mermaid chart={`
graph TD
    A[Start] --> B[End]
`} />
```

## Obsidian Features

-   **Math**: Use `$` for inline math ($E=mc^2$) and `$$` for block math.
-   **Callouts**: Use blockquotes with types (e.g., `> [!NOTE]`).
-   **Tables**: Standard Markdown tables are supported.
-   **Task Lists**: Use `- [ ]` and `- [x]`.
