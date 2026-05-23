# Current Two-Slide Composer

This layer is the first real visual composer on top of the architecture pipeline.

Scope:

- `CURRENT / 01 / Cover`
- `CURRENT / 02 / Year In Numbers`

Outputs:

- `output/figma-current-2slides.generated.js`
- `output/current-2slides-qa-report.json`

## Canonical input

The composer reads `output/production-spec.json` as the canonical semantic source, then enriches only these two slides with visual render plans.

## Cover method

Source family:

- frame `25:6981`

Borrowed:

- cover background node
- hero title composition
- eyebrow placement
- speaker line placement
- bottom brand mark

Composer rule:

- keep the native cover composition
- split the long title into two lines
- keep department and speaker secondary
- do not turn the cover into a card slide

## Year In Numbers method

Source families:

- frame `25:7044` for KPI shell proportions
- frame `25:7247` for title system, glow, and restrained analytic accent language
- frame `25:7544` for dense-supporting information control

Composer rule:

- build a real three-zone KPI slide
- no old chart content
- no market-share visuals
- no competitor semantics
- no generic dashboard cards

The slide is rebuilt from source-deck primitives rather than cloned from an old business chart.

## QA rule

The two-slide QA is intentionally stricter than the old self-scoring report.

Per slide it reports:

- `contentFitRisk`
- `visualFidelityRisk`
- `layoutComplexityRisk`
- `sourceAssetRisk`
- `fontRuntimeRisk`
- `screenshotReviewRequired`

`screenshotReviewRequired` is always `true` until MCP can execute with `X5 Sans` and the result can be visually compared inside Figma.
