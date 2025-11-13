---
layout: ../../layouts/BaseLayout.astro
title: Getting Started with Three.js
description: A beginner's guide to creating 3D graphics on the web
---

# Getting Started with Three.js

Three.js is a powerful JavaScript library that makes creating 3D graphics in the browser accessible and fun. In this guide, we'll cover the basics.

## What is Three.js?

Three.js is a cross-browser JavaScript library that uses WebGL to create and display animated 3D computer graphics in a web browser. It abstracts away the complexity of WebGL while giving you powerful tools to create stunning 3D scenes.

## Basic Concepts

Every Three.js scene needs three essential components:

1. **Scene** - The container for all your 3D objects
2. **Camera** - Defines the viewpoint
3. **Renderer** - Draws the scene using WebGL

## Creating Your First Scene

Here's a simple example:

```javascript
import * as THREE from 'three';

// Create scene
const scene = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera(
  75,                                  // Field of view
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1,                                 // Near clipping plane
  1000                                 // Far clipping plane
);
camera.position.z = 5;

// Create renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  
  renderer.render(scene, camera);
}

animate();
```

## Key Features

### Geometries

Three.js provides many built-in geometries:

- `BoxGeometry` - Cubes and rectangular boxes
- `SphereGeometry` - Spheres
- `CylinderGeometry` - Cylinders
- `TorusGeometry` - Donuts
- And many more!

### Materials

Materials define how objects look:

- `MeshBasicMaterial` - Simple, unlit material
- `MeshPhongMaterial` - Shiny surfaces
- `MeshStandardMaterial` - Physically-based rendering
- `MeshLambertMaterial` - Non-shiny surfaces

### Lights

Add realism with lighting:

```javascript
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);
```

## Next Steps

Once you're comfortable with the basics:

1. Learn about camera controls
2. Explore model loading (GLTF, OBJ)
3. Add post-processing effects
4. Implement physics
5. Create interactive experiences

## Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [Three.js Examples](https://threejs.org/examples/)
- [Three.js Journey Course](https://threejs-journey.com/)

Happy coding! 🎨

---

*Published: November 10, 2025*

