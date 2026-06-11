# 3D Models Integration Guide

Complete guide for adding and embedding 3D models in your markdown files.

## Quick Start

### 1. Add Your 3D Models

Place your 3D model files in the `/public/models/` directory:

```
public/models/
├── my-model.glb
├── another-model.gltf
└── simple-shape.obj
```

### 2. Use in Markdown Files

In any `.mdx` file, **you MUST import the Model3D component first**:

```mdx
---
layout: ../../layouts/BaseLayout.astro
title: My 3D Showcase
---

import Model3D from '../../components/Model3D.astro';

# My Custom 3D Model

<Model3D src="/models/my-model.glb" />
```

**⚠️ Important:** Always add the import line after the frontmatter, or you'll get an error!

## Component API

### Basic Usage

```mdx
<Model3D src="/models/your-model.glb" />
```

### All Options

```mdx
<Model3D 
  src="/models/your-model.glb"
  height="600px"
  scale={1.5}
  position={[0, -1, 0]}
  rotation={[0, Math.PI / 4, 0]}
  autoRotate={true}
  background="transparent"
  client:visible
/>
```

### Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | string | **required** | Path to 3D model file |
| `height` | string | `"500px"` | Container height (CSS value) |
| `scale` | number | `1` | Scale multiplier (1 = normal size) |
| `position` | [x, y, z] | `[0, 0, 0]` | Position offset in 3D space |
| `rotation` | [x, y, z] | `[0, 0, 0]` | Initial rotation in radians |
| `autoRotate` | boolean | `true` | Automatically rotate model |
| `background` | string | `"default"` | Background: "default", "transparent", or hex color |
| `client:visible` | directive | - | Lazy load when scrolled into view |

## Supported File Formats

### GLTF/GLB (Recommended) ✅

- **Best choice** for web
- Includes textures, materials, animations
- Smallest file size
- Industry standard

```mdx
<Model3D src="/models/character.glb" />
```

### OBJ ⚠️

- Simple geometry only
- No textures or materials
- Larger file size

```mdx
<Model3D src="/models/shape.obj" />
```

## Interactive Controls

All models support these controls:

- **🖱️ Click & Drag** - Rotate model
- **🔄 Scroll** - Zoom in/out  
- **👆 Double-click** - Toggle auto-rotation
- **🎨 Button (top-right)** - Toggle between light and dark backgrounds

## Performance Tips

1. ✅ **Keep files small** - Under 5MB per model
2. ✅ **Use GLB format** - Better compression than GLTF
3. ✅ **Optimize textures** - Max 2048×2048 pixels
4. ✅ **Reduce polygons** - Lower poly count = better performance
5. ✅ **Use `client:visible`** - Lazy load models
6. ✅ **Compress textures** - Use tools like glTF-Transform

## Where to Find Free 3D Models

- **[Sketchfab](https://sketchfab.com/)** - Largest collection, filter by "Downloadable"
- **[Poly Pizza](https://poly.pizza/)** - Low-poly models, great for web
- **[Quaternius](http://quaternius.com/)** - Free game-ready assets
- **[Kenney](https://kenney.nl/assets)** - Free game assets
- **[Blender](https://www.blender.org/)** - Free 3D modeling software

## Troubleshooting

### Error: "Expected component `Model3D` to be defined"

**You forgot to import the component!** Add this after your frontmatter:

```mdx
import Model3D from '../../components/Model3D.astro';
```

### Model not loading?

- ✅ **Did you import Model3D?**
- ✅ Check file path is correct
- ✅ File is in `/public/models/` directory
- ✅ File extension is `.glb`, `.gltf`, or `.obj`
- ✅ Check browser console for errors

### Model too big/small?

Adjust the `scale` prop:

```mdx
{/* 2x bigger */}
<Model3D src="/models/model.glb" scale={2} />

{/* 2x smaller */}
<Model3D src="/models/model.glb" scale={0.5} />
```

### Model off-center?

Adjust the `position` prop:

```mdx
{/* Move down 1 unit */}
<Model3D src="/models/model.glb" position={[0, -1, 0]} />
```
