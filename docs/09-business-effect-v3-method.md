# Business Effect V3 Method

`DESIGN_FIDELITY_ADDENDUM.md` has priority over generic generation logic. `Business Effect V3` is the first slide rebuilt under the corrected method.

## Goal

Create:

`PILOT V3 / 05 / Task Manager / Business Effect`

The slide must be self-contained and contain only the draft effect data:

- `+10–15%` productivity;
- `-10%` store payroll cost from expenses;
- `-0.4%` store payroll from revenue.

## What V2 got wrong

V2 used `25:7247` as a direct clone because it had percentages and a premium dark chart layout. That was the wrong decision.

Why rejected:

- the source architecture is market-comparison analytics;
- the slide carries competitive legend and time-series logic;
- old chart lines remain visually dominant even after text replacement;
- the result is not a native business-effect summary.

## Matching decision

Primary candidate:

- `25:7044`

Why selected:

- it already uses three independent KPI cards;
- it has open negative space and a clean title stage;
- it can become a new slide by removing legacy metric content and rebuilding inside the same shells;
- it preserves the native deck language without inheriting a chart narrative.

Secondary candidates:

- `25:7544`
- `25:8018`

Rejected as primary:

- `25:7247`
- `25:9538`
- `25:9043`
- `25:9782`

## Production mode

Selected mode:

`clean-clone-remove-content-rebuild`

That means:

1. Duplicate `25:7044`.
2. Preserve background, glows, title position, and card shells.
3. Remove legacy title, source note, arrow, old KPI labels, old KPI values, and old card icons.
4. Rebuild the title and three metric blocks using X5 Sans only.

## Content purity rule

Allowed to keep:

- dark background;
- card shells;
- glows;
- neutral visual staging;
- X5 Sans styling language.

Must be removed:

- old metric values;
- old ambition framing;
- old source note;
- old arrow cue if it implies unrelated story flow;
- old icons if they encode previous source meaning.

## Quality gate

The slide is not considered visually approved until screenshot review confirms:

- no legacy market-chart content remains;
- the slide reads as a native self-contained KPI summary;
- the text density still fits the card rhythm of the source deck;
- the rebuilt slide does not feel like a broken clone.
