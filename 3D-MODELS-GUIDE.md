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
- **🎨 Button (top-right)** - Toggle between light and dark backgrounds (default: light)

## Examples

### Example 1: Character Model

```mdx
<Model3D 
  src="/models/character.glb"
  height="600px"
  scale={2}
  autoRotate={true}
/>
```

### Example 2: Architectural Model

```mdx
<Model3D 
  src="/models/building.glb"
  height="500px"
  position={[0, -2, 0]}
  rotation={[0, Math.PI / 4, 0]}
  background="transparent"
/>
```

### Example 3: Product Showcase

```mdx
<Model3D 
  src="/models/product.glb"
  height="400px"
  scale={1.5}
  autoRotate={true}
  background="#f0f0f0"
  client:visible
/>
```

## Where to Find Free 3D Models

### High-Quality Models
- **[Sketchfab](https://sketchfab.com/)** - Largest collection, filter by "Downloadable"
- **[Poly Pizza](https://poly.pizza/)** - Low-poly models, great for web
- **[Quaternius](http://quaternius.com/)** - Free game-ready assets

### Game Assets
- **[Kenney](https://kenney.nl/assets)** - Free game assets
- **[OpenGameArt](https://opengameart.org/)** - Community-driven

### Tools
- **[Blender](https://www.blender.org/)** - Free 3D modeling software
- **[glTF Sample Models](https://github.com/KhronosGroup/glTF-Sample-Models)** - Test models

## Performance Tips

1. ✅ **Keep files small** - Under 5MB per model
2. ✅ **Use GLB format** - Better compression than GLTF
3. ✅ **Optimize textures** - Max 2048×2048 pixels
4. ✅ **Reduce polygons** - Lower poly count = better performance
5. ✅ **Use `client:visible`** - Lazy load models
6. ✅ **Compress textures** - Use tools like [glTF-Transform](https://gltf-transform.donmccurdy.com/)

## Workflow: From Blender to Website

### Step 1: Export from Blender

1. Select your model
2. File → Export → glTF 2.0
3. Settings:
   - Format: **glTF Binary (.glb)**
   - Include: Selected Objects
   - Transform: +Y Up
   - Geometry: Apply Modifiers
   - Compression: Enable

### Step 2: Optimize (Optional)

Use [glTF Transform](https://gltf-transform.donmccurdy.com/):

```bash
npm install -g @gltf-transform/cli

gltf-transform optimize input.glb output.glb
```

### Step 3: Add to Website

1. Copy `output.glb` to `/public/models/`
2. Reference in your markdown:

```mdx
<Model3D src="/models/output.glb" />
```

## Troubleshooting

### Error: "Expected component `Model3D` to be defined"

**You forgot to import the component!** Add this after your frontmatter:

```mdx
import Model3D from '../../components/Model3D.astro';
```

### Model not loading?

- ✅ **Did you import Model3D?** (See above)
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
<Model3D 
  src="/models/model.glb" 
  position={[0, -1, 0]}
/>
```

### Model wrong orientation?

Adjust the `rotation` prop (in radians):

```mdx
{/* Rotate 90° on Y axis */}
<Model3D 
  src="/models/model.glb" 
  rotation={[0, Math.PI / 2, 0]}
/>
```

### Performance Optimizations

The components include built-in optimizations:
- ✅ **Frustum Culling** - Only renders visible objects
- ✅ **Memory Management** - Automatic cleanup to prevent memory leaks
- ✅ **Frame-Rate Independence** - Smooth animation at any FPS
- ✅ **Intersection Observer** - Pauses off-screen animations
- ✅ **Optimized Renderer** - Disabled unnecessary buffers (stencil)
- ✅ **Shadow Quality Balance** - PCFShadowMap for best performance

### Additional Performance Tips

1. Reduce model file size (keep under 5MB)
2. Lower texture resolution (max 2048×2048)
3. Reduce polygon count (aim for <100k polygons)
4. Use compressed formats (GLB preferred over OBJ)

## Advanced: Multiple Models on One Page

```mdx
---
layout: ../../layouts/BaseLayout.astro
title: My 3D Portfolio
---

import Model3D from '../../components/Model3D.astro';

# My 3D Portfolio

## Character Design

<Model3D src="/models/character1.glb" height="400px" client:visible />
<Model3D src="/models/character2.glb" height="400px" client:visible />

## Environment Art

<Model3D src="/models/environment.glb" height="500px" client:visible />
```

**Note:** The `client:visible` directive ensures models only load when scrolled into view for better performance!

## Need Help?

Check the example page: `/notes/3d-model-example`

---

Happy 3D modeling! 🎨

