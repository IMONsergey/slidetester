# Font Fallback Preview Runner

This runner is a temporary runtime workaround for MCP visual testing only.

Output:

- `output/figma-current-2slides-font-fallback.generated.js`

## What it is

- A preview runner for the same two-slide visual composer
- A way to test composition through MCP when `X5 Sans` is unavailable
- A temporary text-runtime workaround

## What it is not

- Not a design fallback
- Not final production
- Not approval to ship non-`X5 Sans` output

## Behavior

- Generates only two frames:
  - `CURRENT / VISUAL / 01 / Cover / FONT-FALLBACK`
  - `CURRENT / VISUAL / 02 / Year In Numbers / FONT-FALLBACK`
- Prefers `Inter` if available at runtime
- Otherwise uses the first font returned by `figma.listAvailableFontsAsync()`
- Names every text layer with `TEXT_TO_X5 /`
- Adds a runtime note telling the user to replace all `TEXT_TO_X5` layers with `X5 Sans`

## Safety rules

- Does not modify original source frames
- Does not modify the Icons frame
- Reuses only safe source assets for the cover
- Rebuilds Year In Numbers from primitives
- Keeps the current two-slide visual composer logic
