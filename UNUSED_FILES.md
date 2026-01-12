# Unused Files Report

This document lists all files that appear to be unused in the project.

## Unused Components

### `src/components/CPURegisters.astro`
- **Status**: Not imported or referenced anywhere
- **Action**: Can be removed if not needed

### `src/components/MathZoom.astro`
- **Status**: Only self-references (internal functions), not imported by any pages
- **Action**: Can be removed if math zoom functionality is not used

### `src/components/SiteInfo.astro`
- **Status**: Not imported or referenced anywhere
- **Action**: Can be removed if not needed

### `src/components/ThreeScene.astro`
- **Status**: Not imported or referenced anywhere
- **Action**: Can be removed if not needed (Model3D.astro is used instead)

## Unused Content Files

### `src/content/coding/sample-project.mdx`
- **Status**: Demo/template file with placeholder content
- **Action**: Can be removed or kept as template

### `src/content/engineering/sample-engineering.mdx`
- **Status**: Demo/template file with placeholder content
- **Action**: Can be removed or kept as template

### `src/pages/projects/homelab.mdx`
- **Status**: Only contains placeholder content, commented out in projects index
- **Action**: Can be removed or completed with actual content

## Unused Pages

### `src/pages/blog.astro`
- **Status**: References blog posts that don't exist (`getting-started-threejs`, `building-with-astro`)
- **Action**: Either create the blog posts or remove this page

### `src/pages/about.md`
- **Status**: Not linked from navigation or any pages
- **Action**: Can be removed or add link to navigation

## Unused Assets

### `src/assets/images/projects/voidpad/fastfetch.png`
- **Status**: Not used in Voidpad.mdx (terminal.png is used instead)
- **Action**: Can be removed if not needed

### `public/career/2025-Ahmed_Alfahdi.pdf`
- **Status**: Not referenced in any MDX files
- **Action**: Can be removed if not needed

### `src/content/career/2025-Ahmed_Alfahdi.pdf`
- **Status**: Not referenced in any MDX files
- **Action**: Can be removed if not needed

## Example/Demo Directories

### `api-example/`
- **Status**: Example directory, referenced in documentation
- **Action**: Keep if used as reference, or remove if not needed

### `analytics-api/`
- **Status**: Referenced in documentation (VERCEL-SETUP-GUIDE.md, ANALYTICS-SETUP.md)
- **Action**: Keep if using Vercel deployment, or remove if not

## Documentation Files (Reference Only)

These files are documentation and may not be "used" in code but serve as guides:
- `3D-MODELS-GUIDE.md`
- `ANALYTICS-ENHANCEMENTS.md`
- `ANALYTICS-SETUP.md`
- `MDX_USAGE.md`
- `MOLECULAR-VISUALIZATION.md`
- `OBSIDIAN-GUIDE.md`
- `PDF-VIEWER-GUIDE.md`
- `QUICK-START.md`
- `SETUP.md`
- `UPSTASH-SETUP.md`
- `VERCEL-SETUP-GUIDE.md`
- `README.md` files in various directories

**Action**: Keep these as they serve as documentation/reference

## Summary

**Definitely Unused (Safe to Remove):**
1. `src/components/CPURegisters.astro`
2. `src/components/MathZoom.astro` (unless math zoom is needed)
3. `src/components/SiteInfo.astro`
4. `src/components/ThreeScene.astro`
5. `src/assets/images/projects/voidpad/fastfetch.png`
6. `src/pages/about.md` (unless linked in navigation)
7. `src/pages/blog.astro` (unless blog posts are created)

**Template/Demo Files (Consider Removing):**
1. `src/content/coding/sample-project.mdx`
2. `src/content/engineering/sample-engineering.mdx`
3. `src/pages/projects/homelab.mdx` (unless completed)

**Potentially Unused (Verify First):**
1. `public/career/2025-Ahmed_Alfahdi.pdf`
2. `src/content/career/2025-Ahmed_Alfahdi.pdf`

**Keep (Reference/Documentation):**
- All `.md` guide files
- `api-example/` and `analytics-api/` if used for deployment
