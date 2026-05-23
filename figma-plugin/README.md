# Local Figma Plugin Runner

This plugin runs the Pilot V2 clone/adapt flow directly inside Figma Desktop, using the local Figma environment where X5 Sans is available.

## What it does

- duplicates source frame `25:6981` into `PILOT V2 / 01 / Task Manager / Cover`
- duplicates source frame `25:7247` into `PILOT V2 / 05 / Task Manager / Business Effect`
- preserves source geometry, vectors, masks, effects, glows, images, and typography
- replaces only selected text nodes
- enforces X5 Sans without Inter fallback
- places duplicates in a new column to the right of existing frames

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
