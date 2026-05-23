# Runner Readiness And Fonts

## Font rule

`X5 Sans` is mandatory.

Forbidden:

- Inter fallback
- system font fallback
- silent substitution

## Readiness outcome

If MCP cannot see `X5 Sans`:

- mark MCP editable generation as blocked
- keep the architecture intact
- keep the production-spec intact
- keep generated scripts intact
- do not lie about successful final output

## Current state

The current architecture assumes:

- MCP is the primary intended runner
- MCP is currently blocked by `X5 Sans`
- local plugin may exist as fallback
- fallback does not redefine the system
