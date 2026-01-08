# Cursor Rules — Multi-BU Token-Driven Design System

These rules are **binding** for Cursor when working in this repo.
If a request conflicts with these rules, **do not implement** the conflicting part.
Prefer small, reviewable, deterministic changes.


## Intent (Authoritative)
- Tokens are the **single source of truth**
- MUI is an **adapter layer**, not the design system
- Multiple BUs share the same component APIs; identity comes from **tokens only**
- Governance must be enforced by code (validation, linting, CI), not conventions

## Absolute prohibitions
- No hardcoded visual values (hex/rgb/hsl, raw px/rem numbers, ad-hoc shadows/radii/breakpoints)
- No new token categories/names, no schema changes
- No CSS files and no `!important`
- No DOM wrappers added purely to “fix spacing”
- No BU-specific component behavior forks

## Problem-solving order (never skip)
1) Token values (BU or core)  
2) Semantic mapping (theme-engine)  
3) Wrapper correctness (packages/ui)  
4) Only then `sx`, using **theme roles only** (no raw values)

## Definition of Done
- Tokens authoritative, deterministic theme output, governance passes, WCAG 2.2 AA target not regressed.
