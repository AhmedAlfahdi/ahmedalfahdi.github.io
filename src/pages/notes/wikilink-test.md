---
layout: ../../layouts/BaseLayout.astro
title: Wikilink Support Test
description: Testing automatic wikilink conversion
---

# Wikilink Support Test

This page demonstrates automatic wikilink conversion!

## How Wikilinks Work

You can now use Obsidian-style wikilinks directly in your markdown files:

### Basic Wikilink
- `[[Obsidian Demo]]` converts to: [[Obsidian Demo]]
- Links automatically go to `/notes/obsidian-demo`

### Wikilink with Display Text
- `[[Obsidian Demo|Check out the demo]]` converts to: [[Obsidian Demo|Check out the demo]]

### Multiple Links
Here's a note that references both [[Obsidian Demo]] and [[Reverse Engineering 0x09]].

### In a Sentence
You can read more about assembly in the [[Reverse Engineering 0x09|assembly multiplication guide]].

### Technical Notes
Check out the [[CPU Registers|interactive CPU registers architecture]] to learn about x86-64 registers.

## Conversion Rules

The plugin automatically:
1. Converts `[[Page Name]]` to `[Page Name](/notes/page-name)`
2. Converts spaces to hyphens
3. Removes special characters
4. Makes everything lowercase for the URL
5. Preserves display text: `[[Page|Display]]` → `[Display](/notes/page)`

## Try It!

Create a new note and reference this one with `[[Wikilink Test]]` - it will automatically link here!

---

**Back to:** [[Obsidian Demo]]

