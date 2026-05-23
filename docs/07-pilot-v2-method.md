# Pilot V2 Method

## Goal

V2 is not a redesign of pilot v1.

V2 is a production-method rebuild based on duplicate/adapt from real source frames in the existing Figma Design deck.

## Production modes

Supported modes:

1. `duplicate-source-frame`
2. `duplicate-source-frame-and-replace-text`
3. `duplicate-source-frame-and-replace-text-and-images`
4. `duplicate-source-frame-and-adapt-panel-content`
5. `hybrid-duplicate-with-borrowed-assets`
6. `geometry-reconstruction-fallback`

Default mode:

```txt
duplicate-source-frame-and-replace-text
```

Fallback:

```txt
geometry-reconstruction-fallback
```

Fallback must be used only when duplication is impossible.

## Source slide selection

Source frames are production bases, not loose references.

For v2 first pass:

- cover uses source frame `25:6981`;
- business effect uses source frame `25:7247` unless geometry audit identifies a safer closer metric frame.

## Typography preservation

X5 Sans is mandatory.

The generation script must:

- verify X5 Sans availability before any mutation;
- stop with `X5 Sans is required but not available.` when missing;
- preserve source text node font family, style, size, line height, letter spacing, fills, alignment, opacity, and box geometry whenever the node is reused.

Inter fallback is forbidden in v2.

## Asset reuse policy

Preserve and reuse source assets whenever possible:

- backgrounds;
- images;
- masks;
- vectors;
- icons;
- panel geometry;
- glows;
- gradients;
- shadows;
- decorative marks;
- footer structures.

Only the duplicated frame may be edited.

Original source frames and the Icons frame remain untouched.

## Text-node role matching

Text replacement is role-based, not blanket replacement.

The pipeline:

1. extract source geometry;
2. infer text roles from size, position, casing, opacity, and parent context;
3. target only safe matched roles;
4. leave uncertain text nodes untouched;
5. report unmatched nodes and warnings.

## Panel-content adaptation

For metrics/business-effect slides:

- preserve the source frame;
- preserve panel boundaries and styling;
- adapt only safe textual content inside existing zones;
- do not replace chart panels with generic KPI cards.

If safe full adaptation is not possible, perform partial safe replacement and report manual designer follow-up.

## Placement rules

New v2 frames must:

- live on `Page 1 / 0:1`;
- be placed in a new column to the right of existing work;
- avoid overlap with existing frames;
- retain `1920×1080`.

Placement should be computed from the rightmost top-level node instead of hardcoded when possible.

## Screenshot-based QA

No claim of success is valid without visual review.

Required QA principle:

```txt
If the v2 slide does not look like an edited copy of a real source slide, it fails.
```

## Why geometry reconstruction is fallback only

The deck is manually composed and visually specific.

Reconstructing it from abstract coordinates is more error-prone than duplicating a real source frame.

That is why v2 uses geometry extraction mainly for:

- node targeting;
- safe text replacement;
- compact audit;
- exact clone/adapt planning.
