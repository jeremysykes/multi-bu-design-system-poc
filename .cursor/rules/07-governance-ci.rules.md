# Cursor Rules — Multi-BU Token-Driven Design System

These rules are **binding** for Cursor when working in this repo.
If a request conflicts with these rules, **do not implement** the conflicting part.
Prefer small, reviewable, deterministic changes.


## Scope
Applies to: scripts, lint rules, CI workflows, governance docs.

## Enforcement posture
Prefer automated enforcement over documentation-only policy.

## Required checks
- Token validation
- Token version bump enforcement (when tokens change)
- Token diff capability (generates readable output)
- Pattern linting to detect hardcoded styling regressions in UI code
- Visual regression check (when configured)

## Change discipline
- Any governance change must include:
  - What it enforces
  - How to run locally
  - Where it runs in CI
Document updates in `docs/governance.md`.
