# PDFs Directory

Place your PDF files here to embed them in your notes.

## Usage

1. **Add PDF files** to this directory
2. **Reference them** in your `.mdx` notes using the PDFViewer component

## Example

If you have a file: `public/pdfs/research-paper.pdf`

Use it in your note:
```mdx
import PDFViewer from '../../components/PDFViewer.astro';

<PDFViewer src="/pdfs/research-paper.pdf" title="My Research Paper" />
```

## File Organization

Recommended structure:
```
public/pdfs/
├── assembly/
│   ├── intel-manual.pdf
│   └── x86-reference.pdf
├── research/
│   ├── paper-2024.pdf
│   └── thesis.pdf
└── presentations/
    └── slides.pdf
```

## Best Practices

- Keep files under 10MB for best performance
- Use descriptive file names (kebab-case recommended)
- Optimize PDFs before uploading
- Check files are not password-protected
- Ensure PDFs have searchable text (not just scanned images)

## Notes

- Files in `public/` are served from the root URL
- Path starts with `/pdfs/` when referencing
- Case-sensitive on most servers

