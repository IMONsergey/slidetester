# Current PPTX Pipeline

Current input:

```txt
input/current-draft.pptx
```

Current output chain:

- `output/current-draft-raw.json`
- `output/current-slide-plan.json`
- `output/deck-atlas.json`
- `output/style-tokens.json`
- `output/asset-bank.json`
- `output/production-spec.json`
- `output/runtime-readiness-report.json`
- `output/figma-mcp-script.generated.js`
- `output/qa-report.json`

## Important current-draft note

The real PPTX contains fewer slides than the prompt outline. The engine must use the real parsed count and report the mismatch instead of pretending the prompt outline is the file.
