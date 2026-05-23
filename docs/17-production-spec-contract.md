# Production-Spec Contract

`output/production-spec.json` is the canonical handoff between planning and generation.

Each slide spec must include:

- slide name
- semantic role
- production mode
- content package
- style references
- asset references
- drawable elements
- forbidden inherited content
- QA expectations

## Why this matters

The production-spec lets the system:

- stop cleanly at a truthful blocker
- reuse the same content across runners
- QA the deck before editable generation succeeds

Without the production-spec, the pipeline collapses back into one-off scripts or manual plugin behavior.
