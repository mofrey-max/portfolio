# pdf-word-reader-zh

```bash
$ npx skills add https://github.com/20041002liu-cloud/pdf-word-reader-zh
```

SKILL.md

This skill provides end-to-end document understanding for PDF, DOCX, and PPTX files. It turns a file path into structured extraction, chunked evidence, and an analysis-ready report.

The user provides a document path and asks to read, summarize, extract, analyze, or fully understand the content.

## What This Skill Does

- Read `.pdf` files with text extraction and OCR fallback
- Read `.docx` files with paragraph/table extraction
- Convert `.pptx` to PDF automatically, then process as PDF
- Split long text into chunked evidence (`C001`, `C002`, ...)
- Generate a report scaffold for evidence-based conclusions

## Workflow

1. Detect input type: PDF, DOCX, or PPTX.
2. If PPTX, convert to PDF (LibreOffice or PowerPoint COM on Windows).
3. Extract structured content (text, pages, tables when available).
4. Apply OCR fallback on low-text PDF pages.
5. Build evidence chunks with stable chunk IDs.
6. Output analysis scaffold with chunk evidence index.

## Command

```bash
python scripts/prepare_document_context.py "<input-file>" --output-dir "output/document-understanding"
```

## Output

- `01_extracted.json`: structured extraction result
- `02_chunks.json`: chunked evidence units
- `03_understanding_report.md`: analysis scaffold and evidence index

## Common Options

- `--disable-ocr`: disable OCR fallback
- `--max-pages N`: quick run on first N pages
- `--fail-on-empty`: fail if no text is extracted

## Dependencies

```bash
python -m pip install -r requirements.txt
```

Recommended system tools:

- `tesseract` with Chinese language pack (`chi_sim`)
- `pdftoppm` (Poppler)
- For PPTX conversion: `soffice` (LibreOffice) or Microsoft PowerPoint (Windows)

## Quality Rule

For final analysis output:

- Read all chunks before concluding.
- Cite chunk IDs for key claims, e.g. `[C003][C011]`.
- Separate facts from assumptions.
- List missing evidence explicitly.