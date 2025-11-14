# Molecular Visualization Guide

This project uses a custom Three.js implementation to visualize chemical molecules in 3D.

## Three.js Molecular Implementation

Located in: `src/components/ThreeScene.astro`

### Features:
- Custom ball-and-stick molecular models
- CPK coloring convention (industry standard)
- Interactive rotation, zoom, and drag controls
- Lightweight and fast rendering
- Fully customizable appearance

### Supported Molecules:
- Water (H₂O)
- Methane (CH₄)
- Ammonia (NH₃)
- Carbon Dioxide (CO₂)
- Benzene (C₆H₆)
- Ethanol (C₂H₅OH)

### Usage:
```astro
<ThreeScene sceneType="water" height="400px" />
```

### Atom Colors (CPK Convention):
- **Hydrogen (H)**: White (#ffffff)
- **Carbon (C)**: Gray (#909090)
- **Oxygen (O)**: Red (#ff0000)
- **Nitrogen (N)**: Blue (#3050f8)

---

## Gallery Page

URL: `/3d-models`
- Shows all geometric shapes and chemical molecules
- Interactive 3D visualization with full controls
- Educational descriptions for each shape/molecule

---

## Why Three.js?

### Advantages:
- ✅ Lightweight and fast (no external dependencies)
- ✅ Full control over styling, colors, and animations
- ✅ Works offline - no CDN required
- ✅ Smooth 60+ FPS rendering
- ✅ Perfect for educational purposes
- ✅ Easy to customize and extend
- ✅ Beautiful custom materials and lighting

### Use Cases:
- Educational molecular visualization
- Chemistry demonstrations and teaching
- Custom molecular animations
- Embedding in static sites
- Offline applications

---

## Adding New Molecules

To add a new molecule:

1. Edit `src/components/ThreeScene.astro`
2. Add the new molecule name to the `Props` interface type
3. Add a new case in the molecule switch statement
4. Define atomic positions using `createAtom(color, size)`
5. Connect atoms with bonds using `createBond(start, end)`
6. Add to the gallery page in `src/pages/3d-models.astro`

### Example:
```javascript
case 'myMolecule':
  const atom1 = createAtom(colors.C, 0.35);
  const atom2 = createAtom(colors.H, 0.25);
  
  atom1.position.set(0, 0, 0);
  atom2.position.set(0.5, 0, 0);
  
  molecule.add(atom1, atom2);
  molecule.add(createBond(atom1.position, atom2.position));
  break;
```

---

## Performance Considerations

- Very fast rendering (60+ FPS on all devices)
- Minimal memory usage
- No external dependencies or CDN requirements
- Works completely offline
- Multiple molecules render simultaneously without lag
- Optimized lighting and geometry for smooth performance

---

## Browser Support

Works on all modern browsers with WebGL support:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [CPK Coloring Convention](https://en.wikipedia.org/wiki/CPK_coloring)
- [Molecular Geometry](https://en.wikipedia.org/wiki/Molecular_geometry)
- [Chemical Structure Visualization](https://en.wikipedia.org/wiki/Chemical_structure)

## Technical Details

### Lighting Setup:
- Ambient light for overall illumination
- 3 directional lights (main, fill, back) for depth and definition
- Enhanced specular highlights on atoms
- Subtle emissive properties for better visibility

### Materials:
- Phong shading for realistic light reflection
- CPK color convention for scientific accuracy
- Smooth surfaces with optimized polygon counts
- Semi-transparent bond cylinders

### Interactivity:
- Mouse drag to rotate
- Scroll to zoom
- Double-click to toggle auto-rotation
- Background color toggle button
- Real-time FPS counter

