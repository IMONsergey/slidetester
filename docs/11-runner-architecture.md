# Runner Architecture

## Runners

### MCP runner

- Primary workflow.
- Expected to read the generated `production-spec`.
- Must enforce `X5 Sans`.
- Must stop if `X5 Sans` is unavailable.

### Local plugin runner

- Fallback only.
- May consume the exact same `production-spec`.
- Must never replace MCP as the default story.

### Preview runner

- Used for screenshot QA and comparison.
- Does not change the design contract.

## Readiness contract

`output/runtime-readiness-report.json` answers:

- can the runner access Figma?
- can it write Figma?
- can it load `X5 Sans`?
- what blocks final editable output right now?

If MCP cannot load `X5 Sans`, the system still produces:

- slide plan
- style tokens
- asset bank
- production-spec
- generated script
- QA report

But it must not claim successful editable generation.
