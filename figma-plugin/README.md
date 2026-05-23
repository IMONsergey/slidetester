# Local Figma Plugin Runner

This plugin runs the Business Effect V3 rebuild directly inside Figma Desktop, using the local Figma environment where X5 Sans is available.

## What it does

- duplicates source frame `25:7044` into `PILOT V3 / 05 / Task Manager / Business Effect`
- preserves source background, card shells, glows, layout geometry, and X5 Sans typography language
- removes unrelated legacy KPI content from the cloned frame
- rebuilds only the required title and three metric blocks
- enforces X5 Sans without Inter fallback
- places the duplicate in a new column to the right of existing frames

## Figma Desktop

Plugins → Development → Import plugin from manifest
Select `figma-plugin/manifest.json`
Open the target Figma file
Run the plugin

## Notes

- The plugin does not modify original source frames.
- The plugin does not modify the Icons frame.
- If X5 Sans is missing in the local Figma runtime, the plugin stops with:
  `X5 Sans is required but not available in this Figma environment.`
- The replacement report is written to the plugin console.
