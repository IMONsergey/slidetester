# No Manual Workflow

The intended workflow is automated:

```txt
PPTX
→ production-spec
→ runner readiness
→ automated Figma generation
→ screenshot QA
```

## Not the default

- local plugin installation
- manual cleanup as a required production step
- “generate rough layout first, polish later” as the main method

## Allowed only as fallback

- local Figma Desktop runner when MCP is blocked by font access
- selective manual review when QA flags a real risk

Manual work may happen, but it is not the system’s success criterion.
