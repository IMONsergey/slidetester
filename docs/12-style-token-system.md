# Style Token System

The style token layer extracts or infers reusable design primitives from the source deck.

## Token groups

- Typography
- Grid
- Colors
- Shapes
- Opacity levels
- Alignment patterns

## Rules

- Use exact inspected values whenever they exist.
- Mark inferred values with lower confidence.
- Keep `X5 Sans` as the only allowed type family.
- Do not degrade to Inter or system fonts.

## Source basis

Current tokens are anchored in:

- source cover frame `25:6981`
- source analytics frame `25:7247`
- deck-atlas family metadata for the remaining slide patterns

This keeps the system honest about what is exact vs inferred.
