DO NOT DELETE THIS LINE !! first of all, use current project for claude specific files. always save plans into current project folder unless otherwise is instructed. on every iteration, update necessary files for our inspection, decide stale documents to delete or improve. !! DO NOT DELETE THIS LINE

YOU CAN USE REST BELOW FOR CLAUDE.


# CLAUDE.md — Solidus Verify

## Product Context

Solidus Verify is the KYC verification service — the first revenue product in the Solidus ecosystem. It provides identity verification (document checks, liveness detection) for crypto exchanges and fintech platforms, then issues Verifiable Credentials via the Protocol layer. This is the highest priority product.

## Loop Protocol

When I say "go", "continue", or "loop":

1. **READ** ->  `_PROJECT.md` for project config
2. **CHECK** -> `.claude/PROGRESS_REPORT.md` for what's done
3. **PLAN** -> State what you'll do next (1-2 tasks max)
4. **EXECUTE** -> Do the work, commit logical units
5. **LOG** -> Append to `.claude/PROGRESS_REPORT.md`
6. **PAUSE** -> Present what you did, ask if I want to continue or redirect

## Memory

- Before starting, read `.claude/MEMORY.md` for accumulated context
- When you learn something important (gotcha, decision, pattern), append it to MEMORY.md
- When completing a task, update PROGRESS_REPORT.md with date + summary
- **MEMORY.md has no length limit** — write everything worth remembering; never truncate or summarize away detail
- Archive stale entries to dated files (e.g., `.claude/archive/memory-2025-01.md`) rather than deleting

### Sub-Project CLAUDE.md Files

Each sub-app can have its own `CLAUDE.md` for deep per-layer context:

```
apps/
├── backend/CLAUDE.md     # API endpoints, KYC provider integrations, migration gotchas
├── frontend/CLAUDE.md    # Pages, components, verification flows, UI states
```

### What Goes Where

All Claude-related files **must live under `.claude/`** within the project directory (`/Users/fatih/Documents/Works/solidus.network/projects/verify/`).

```
.claude/
├── MEMORY.md
├── PROGRESS_REPORT.md
├── plans/
├── archive/
└── settings.local.json
```

| Content | Location |
|---------|----------|
| Architecture decisions, tech choices, reasons | `.claude/MEMORY.md` |
| Deployment credentials, server IPs, env var notes | `.claude/MEMORY.md` |
| Known bugs, gotchas, workarounds | `.claude/MEMORY.md` |
| Session work log | `.claude/PROGRESS_REPORT.md` |
| Plans, design docs | `.claude/plans/YYYY-MM-DD-topic.md` |

| Project-specific config, credentials | `_PROJECT.md` (in `apps/`) |
| Per-layer deep context | `apps/backend/CLAUDE.md`, `apps/frontend/CLAUDE.md` |

## Rules

- Never skip reading  `_PROJECT.md`
- **All Claude-generated files go under `.claude/`**
- Claude Code NEVER runs git commands — only suggests commit messages per repo
- Work in small verifiable steps, not giant rewrites
- If blocked or uncertain, stop and ask — don't guess
- Use Makefile commands when available
- Commit after each meaningful unit of work
- Never hardcode secrets, API keys, or credentials — always use env vars
- All PII must be encrypted at rest — never store plaintext personal data

## Session Health

At the start of each session:
- Check if `MEMORY.md` has entries older than 3 months — archive them
- Check `.claude/plans/` for completed work — mark `[DONE]` or delete
- Check if `PROGRESS_REPORT.md` needs summarizing

At the end of each session:
- Append session summary to `PROGRESS_REPORT.md`
- Update `MEMORY.md` with new gotchas or decisions
- Note unresolved issues for next session

## Figma Design Rules

### Figma MCP Usage
- Always use Figma MCP tools before implementing any visual component
- `get_file` for file structure, `get_node` with specific node IDs for component inspection
- Cache extracted values in `lib/design-tokens.ts`
- If MCP returns unexpected data, log it to MEMORY.md and ask before guessing

### Pixel-Perfect Standards
- All visual values come from the Figma files listed in `_PROJECT.md`
- Never hardcode colors, spacing, typography — always reference `design-tokens.ts`
- Component names must match Figma layer names

### Prototype Merge Rule
- **Figma** = visual authority (design, styling, layout)
- **Prototype** = functional authority (logic, state, API calls, data flow)
- Never let prototype CSS leak into final output
