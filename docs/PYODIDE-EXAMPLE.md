# Pyodide Python Execution Example

## Overview
This guide shows how to use the `PyodideRunner` component to execute Python code in your MDX files.

## Component
- **File**: `src/components/PyodideRunner.astro`
- **Purpose**: Execute Python code in the browser using Pyodide (WebAssembly)
- **Interactive**: Users can edit code directly and run it

## How to Use in MDX

```mdx
---
title: "Python Examples"
---

import PyodideRunner from '../../components/PyodideRunner.astro';

<PyodideRunner 
  title="Hello World"
  code={`print("Hello from Python!")
print("This runs in your browser!")
result = 2 + 2
print(f"2 + 2 = {result}")`}
/>
```

## Features

### Component Props
- **code** (required): Python code to execute as a string
- **title** (optional): Title displayed in header (default: "Python Code")

### User Interface
1. **Header**: Shows title and "Run Code" button
2. **Code Editor**: Fully editable textarea with Python code
3. **Output Section**: Displays execution results or errors

### Interactive Features
- **Fully Editable**: Users can modify code examples directly
- **Tab Support**: Proper Python indentation with Tab key
- **Live Execution**: Run edited code instantly

### Supported Features
- **Standard Library**: All Python standard library modules
- **Print Statements**: Captured and displayed
- **Calculations**: Full Python math capabilities
- **Data Structures**: Lists, dicts, sets, tuples
- **Functions**: Define and call functions

### Limitations
1. **First Load**: ~5MB download (Pyodide runtime)
2. **No File System**: Can't read/write real files
3. **No External Packages**: Only built-in packages
4. **Browser Only**: Runs client-side, not on server

## Execution Flow
1. User optionally edits the Python code
2. User clicks "Run Code" button
3. Pyodide loads (first time only, ~5MB)
4. Python code executes in browser
5. Output appears in output section
6. Errors displayed in red

## Performance
- **First Execution**: ~2-5 seconds (loading Pyodide)
- **Subsequent Executions**: < 100ms (instant, cached)
- Pyodide only loads when user clicks "Run Code"
- All runners on the page share one Pyodide instance

## Troubleshooting

**"Run Code" button does nothing:**
- Check browser console for errors
- Ensure Pyodide script loaded (check Network tab)
- Verify JavaScript is enabled

**Code doesn't execute:**
- Check for syntax errors in Python code
- Verify Pyodide loaded successfully
- Check browser compatibility (needs WebAssembly support)

**Slow first execution:**
- Expected: First run loads ~5MB Pyodide runtime
- Subsequent runs are instant
