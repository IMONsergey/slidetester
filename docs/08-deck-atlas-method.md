# Deck Atlas Method

`DESIGN_FIDELITY_ADDENDUM.md` remains higher priority than generic generation rules. The atlas exists to enforce that priority at the source-frame selection layer.

## Why the atlas exists

V1 and early V2 were too eager to match on surface cues such as:

- percentages;
- dark background;
- metric-like typography;
- card shapes;
- chart presence.

That method fails when the source frame has the wrong semantic architecture. A slide with percentages can still be a market-share comparison, a waterfall, a goals table, or a dashboard. Those are different production bases.

## Atlas workflow

1. Audit every original frame on `Page 1 / 0:1`.
2. Ignore `PILOT` frames and never classify them as source references.
3. Classify each source frame by:
   - semantic role;
   - content architecture;
   - visual structure;
   - density level;
   - reusable neutral assets;
   - dangerous legacy content that must be removed if cloned.
4. Mark which draft roles the frame can safely support.
5. Use the atlas as the input to draft-to-source matching.

## Matching rules

- Semantic fit is more important than visual fit.
- Content architecture fit is more important than raw style similarity.
- A visually beautiful frame must still be rejected if it carries the wrong meaning structure.
- ReusableAsBase only means the frame is technically useful; it does not mean it is the best semantic match.

## Business Effect correction

The atlas explicitly marks `25:7247` as `market-share-analytics` and not as `business-effect`.

Why that matters:

- it contains time-series market charts;
- it contains a legend and competitive context;
- it contains old years and chart labels;
- it teaches the wrong visual logic for a self-contained KPI summary.

The atlas instead elevates:

- `25:7044` as the best current native family for a three-card KPI summary;
- `25:7544` as a secondary backup;
- `25:8018` as a tertiary backup with strong visual but weaker semantic purity.

## Production modes enabled by the atlas

- `direct-clone-replace-text`
- `clean-clone-remove-content-rebuild`
- `pattern-based-reconstruction`
- `hybrid-source-composition`

For `Business Effect V3`, the selected mode is `clean-clone-remove-content-rebuild`.

## Output contract

The atlas must be explicit enough to answer:

- what frame was considered;
- why it was considered;
- what can be preserved;
- what must be removed;
- which draft roles it can support;
- what risks remain before screenshot review.
