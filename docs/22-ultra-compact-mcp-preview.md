# Ultra-Compact MCP Preview

This runner exists only to keep the MCP preview script short enough to paste directly into `use_figma`.

Output:

- `output/figma-current-2slides-ultra-compact.generated.js`

## Intent

- preview only
- not final production
- no source-frame mutation
- no image reuse
- no effects, blur, or shadows

## Constraints

- only `createFrame`, `createText`, `createRectangle`, `createEllipse`
- no embedded JSON model
- no imports
- no external fetch
- two slides only
- every text layer starts with `TEXT_TO_X5 /`

## Runtime font

- prefer `Inter`
- otherwise use the first font returned by `figma.listAvailableFontsAsync()`

After preview generation, all `TEXT_TO_X5` layers must be replaced with `X5 Sans` manually in Figma.
