# Pilot V1 Postmortem

## Why v1 failed

Pilot v1 proved that technical Figma generation alone is not enough.

The result was rejected because:

- visual fidelity was weak;
- layouts were generated from abstract templates instead of real source-frame geometry;
- typography drifted from the source deck;
- title positions did not match native slide logic;
- compositions looked like a generic dark deck instead of a modified source slide;
- fallback font logic was allowed, which broke the X5 / Пятёрочка deck language.

## What was methodologically wrong

The v1 pipeline treated source frames as style inspiration instead of direct production bases.

That was the core mistake.

The deck is not a generic style system. It is a high-fidelity presentation artifact built from specific:

- source frames;
- X5 Sans typography;
- custom coordinates;
- source visuals and masks;
- source panel logic;
- source glows, gradients and chart structures.

Abstract template reconstruction destroys that fidelity.

## V2 method shift

V2 switches to source-frame clone/adapt production.

Default method:

```txt
existing source slide
→ duplicate source frame
→ preserve all visual structure
→ replace only safe target text/content
→ keep the result editable
```

## Non-negotiable rules in v2

- X5 Sans is mandatory.
- No Inter fallback.
- No generic card reconstruction when duplication is possible.
- No new invented title positions.
- No modification of original source frames.
- No modification of the Icons frame.
- Source images and assets may be reused and are encouraged when they support fidelity.

## Why v2 starts with only 2 slides

V1 failed visually, so v2 must prove the method before scaling.

The first validation set is:

1. `PILOT V2 / 01 / Task Manager / Cover`
2. `PILOT V2 / 05 / Task Manager / Business Effect`

These two slides are enough to validate:

- source-frame duplication;
- exact X5 Sans preservation;
- native title geometry;
- asset preservation;
- screenshot-based fidelity review.
