# Slide Design Engine

## Goal

The integrated Slide Design Engine turns the real current PPTX draft into a design-faithful, runner-aware production package for Figma Design.

Chain:

```txt
current-draft.pptx
→ semantic parsing
→ deck atlas normalization
→ style token extraction
→ asset bank extraction
→ current slide plan
→ production-spec
→ runtime readiness
→ generated Figma script
→ QA report
```

## Principles

- `production-spec.json` is the canonical intermediate layer.
- Design fidelity beats speed.
- The source deck is a design language, not a screenshot to mimic loosely.
- The PPTX is semantic input, not a visual template.
- Manual polish and local plugin usage are fallback paths, not the intended default.

## Current implementation

- `src/pptx/parse-current-pptx.mjs` parses the real uploaded draft.
- `src/planner/*` classifies slide roles and builds the current slide plan.
- `src/audit/*` converts the checked-in Figma audit cache into atlas, tokens, and assets.
- `src/composer/*` builds the self-contained `production-spec`.
- `src/runners/*` models MCP vs fallback runners and generates the Figma MCP script.
- `src/qa/*` scores semantic completeness, content purity, token usage, and layout confidence.
