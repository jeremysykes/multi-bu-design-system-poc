# Cursor Rules — Multi-BU Token-Driven Design System

These rules are **binding** for Cursor when working in this repo.
If a request conflicts with these rules, **do not implement** the conflicting part.
Prefer small, reviewable, deterministic changes.


## Scope
Applies to: `apps/demo-site/**` (or equivalent), runtime BU switching.

## Purpose
The demo site proves:
- Runtime BU switching at app scale
- Shared component APIs across BUs
- Tokens drive identity, not page-level styling

## Rules
- BU switching must be deterministic and shareable (URL param or similar).
- Pages must use `@multi-bu/ui` components and theme roles only.
- No one-off styling patches to make a page look better in a single BU.
- If a page looks wrong in one BU, fix tokens/mapping/wrappers.

## Error handling
- Theme load failures must be handled gracefully with clear UI feedback.
