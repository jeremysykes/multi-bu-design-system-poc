# Cursor Rules — Multi-BU Token-Driven Design System

These rules are **binding** for Cursor when working in this repo.
If a request conflicts with these rules, **do not implement** the conflicting part.
Prefer small, reviewable, deterministic changes.


## Scope
Applies to any multi-file change or “feature” work.

## Change strategy
- Make the smallest change that preserves system integrity.
- Prefer refactors that reduce long-term drift risk.

## Before you consider work complete
- Run core checks:
  - tokens:validate
  - tokens:check-version (if tokens changed)
  - storybook build/test (if storybook changed)
  - demo site build (if demo changed)
- Ensure no new hardcoded visual values were introduced.
- Ensure all three BUs still render correctly.

## Commit/PR notes (in-progress workflow)
When summarizing changes:
- Describe the layer touched (tokens, mapping, wrappers, governance).
- Describe why the change is correct for BU A/B/C.
- Call out any baseline updates explicitly.
