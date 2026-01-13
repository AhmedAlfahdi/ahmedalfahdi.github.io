# Pyodide Python Execution Example

## Overview
This guide shows how to use the `PyodideRunner` component to execute Python code in your MDX files.

## Component Created
- **File**: `src/components/PyodideRunner.astro`
- **Purpose**: Execute Python code in the browser using Pyodide (WebAssembly)
- **Interactive**: Users can edit the code directly in the browser and run it
- **Features**:
  - Editable code textarea with syntax support
  - Tab key support for proper Python indentation
  - Vertical resizing for longer code
  - Real-time execution with output display
  - Error handling with clear messages

## How to Use in MDX

### Basic Example

```mdx
---
title: "Python Examples"
---

import PyodideRunner from '../../components/PyodideRunner.astro';

## Hello World Example

<PyodideRunner 
  title="Hello World"
  code={`print("Hello from Python!")
print("This runs in your browser!")

# Calculate something
result = 2 + 2
print(f"2 + 2 = {result}")`}
/>

## Math Calculations

<PyodideRunner 
  title="Mathematical Operations"
  code={`import math

# Calculate factorial
n = 5
factorial = math.factorial(n)
print(f"{n}! = {factorial}")

# Calculate square root
num = 16
sqrt = math.sqrt(num)
print(f"√{num} = {sqrt}")

# Pi constant
print(f"π = {math.pi:.6f}")`}
/>

## List Operations

<PyodideRunner 
  title="List Comprehensions"
  code={`# Create a list of squares
squares = [x**2 for x in range(1, 11)]
print("Squares:", squares)

# Filter even numbers
evens = [x for x in squares if x % 2 == 0]
print("Even squares:", evens)

# Sum of all squares
total = sum(squares)
print(f"Sum: {total}")`}
/>
```

## Features

### Component Props
- **code** (required): Python code to execute as a string
- **title** (optional): Title displayed in header (default: "Python Code")

### User Interface
1. **Header**: Shows title and "Run Code" button
2. **Code Editor**: Fully editable textarea with Python code
   - Click to edit and modify code
   - Press Tab for proper indentation (4 spaces)
   - Resize vertically by dragging bottom-right corner
3. **Output Section**: Displays execution results or errors

### Execution Flow
1. User optionally edits the Python code
2. User clicks "Run Code" button
3. Pyodide loads (first time only, ~5MB download)
4. Python code executes in browser (runs the current text in the editor)
5. Output appears in the output section
6. Errors are caught and displayed in red

### Interactive Features ✨
- **Fully Editable**: Users can modify code examples directly
- **Tab Support**: Proper Python indentation with Tab key
- **Live Execution**: Run edited code instantly
- **Experimentation**: Users learn by modifying and testing code
- **No Setup Required**: Everything runs in the browser

### Supported Features
- **Standard Library**: All Python standard library modules
- **Print Statements**: Captured and displayed
- **Calculations**: Full Python math capabilities
- **Data Structures**: Lists, dicts, sets, tuples
- **Functions**: Define and call functions
- **Imports**: Use built-in Python modules

### Limitations
1. **First Load**: ~5MB download (Pyodide runtime)
2. **No File System**: Can't read/write real files
3. **No External Packages**: Only built-in packages (can't pip install on-the-fly)
4. **Browser Only**: Runs client-side, not on server
5. **Performance**: Slower than native Python

## Advanced Example

```mdx
<PyodideRunner 
  title="Data Processing Example"
  code={`# Create sample data
data = [
    {"name": "Alice", "score": 85},
    {"name": "Bob", "score": 92},
    {"name": "Charlie", "score": 78}
]

# Calculate average
avg = sum(d["score"] for d in data) / len(data)
print(f"Average score: {avg:.2f}")

# Find top scorer
top = max(data, key=lambda x: x["score"])
print(f"Top scorer: {top['name']} with {top['score']} points")

# Filter passing students (>= 80)
passing = [d for d in data if d["score"] >= 80]
print(f"\\nPassing students: {len(passing)}/{len(data)}")
for student in passing:
    print(f"  - {student['name']}: {student['score']}")`}
/>
```

## Integration Steps

### 1. Already Done
The Pyodide script is already loaded in `BaseLayout.astro`:
```html
<script src="https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js"></script>
```

### 2. Import in Your MDX
```mdx
import PyodideRunner from '../../components/PyodideRunner.astro';
```

### 3. Use the Component
```mdx
<PyodideRunner 
  title="Your Title"
  code={`your python code here`}
/>
```

## Styling

The component is already styled to match your site's theme:
- Dark theme support (default)
- Light theme support (automatic)
- Matches code block aesthetic
- Responsive design
- Error highlighting

## Performance Tips

1. **Lazy Loading**: Pyodide only loads when user clicks "Run Code"
2. **Shared Instance**: All runners on the page share one Pyodide instance
3. **First Click**: Takes ~2-5 seconds to load Pyodide
4. **Subsequent Clicks**: Instant execution

## Error Handling

The component handles errors gracefully:
- Syntax errors: Displayed in red
- Runtime errors: Full traceback shown
- Loading errors: Clear error messages
- Network issues: Retry suggestions

## Example Use Cases

### 1. Assembly Notes (Your Use Case)
```mdx
<PyodideRunner 
  title="Register Simulation"
  code={`# Simulate 8-bit register multiplication
al = 10  # 8-bit
bl = 25  # 8-bit
result = al * bl  # 16-bit result

print(f"AL = {al} (0x{al:02X})")
print(f"BL = {bl} (0x{bl:02X})")
print(f"Result = {result} (0x{result:04X})")
print(f"AH = {result >> 8} (high byte)")
print(f"AL = {result & 0xFF} (low byte)")`}
/>
```

### 2. Algorithm Demonstrations
```mdx
<PyodideRunner 
  title="Sorting Algorithm"
  code={`def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

numbers = [64, 34, 25, 12, 22, 11, 90]
print("Original:", numbers)
sorted_nums = bubble_sort(numbers.copy())
print("Sorted:", sorted_nums)`}
/>
```

### 3. Data Analysis
```mdx
<PyodideRunner 
  title="Statistical Analysis"
  code={`import statistics

data = [23, 45, 67, 89, 34, 56, 78, 90, 12]

mean = statistics.mean(data)
median = statistics.median(data)
stdev = statistics.stdev(data)

print(f"Data: {data}")
print(f"Mean: {mean:.2f}")
print(f"Median: {median}")
print(f"Standard Deviation: {stdev:.2f}")`}
/>
```

## Testing

Create a test page to verify it works:

```mdx
---
title: "Python Test"
---

import PyodideRunner from '../components/PyodideRunner.astro';

# Python Execution Test

<PyodideRunner 
  title="Test Example"
  code={`for i in range(5):
    print(f"Line {i+1}: Hello!")`}
/>
```

## Troubleshooting

### Issue: "Run Code" button does nothing
**Solution**: 
- Check browser console for errors
- Ensure Pyodide script loaded (check Network tab)
- Verify JavaScript is enabled

### Issue: Code doesn't execute
**Solution**:
- Check for syntax errors in Python code
- Verify Pyodide loaded successfully
- Check browser compatibility (needs WebAssembly support)

### Issue: Slow first execution
**Expected**: First run loads ~5MB Pyodide runtime
**Solution**: This is normal, subsequent runs are instant

### Issue: Module not found
**Limitation**: Only built-in modules available
**Solution**: Use only Python standard library

## Browser Compatibility

**Supported:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Required:**
- WebAssembly support
- JavaScript enabled
- Modern browser

## Performance

**First Execution:**
- Download: ~5MB (Pyodide runtime)
- Time: 2-5 seconds
- Cached after first load

**Subsequent Executions:**
- Download: 0 (cached)
- Time: < 100ms (instant)

## Security

**Safe:**
- Runs in browser sandbox
- No server access
- Can't access file system
- Can't make network requests (by default)

**Isolated:**
- Each execution is isolated
- No persistent state between runs
- Safe to run untrusted code examples

---

**Created**: January 2026  
**Component**: `src/components/PyodideRunner.astro`  
**Documentation**: Full working examples included
