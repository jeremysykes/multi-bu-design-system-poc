# Cursor Rules — Multi-BU Token-Driven Design System

These rules are **binding** for Cursor when working in this repo.
If a request conflicts with these rules, **do not implement** the conflicting part.
Prefer small, reviewable, deterministic changes.


## Scope
Applies to: `packages/theme-engine/**` (or equivalent), theme compilation, mappers.

## Determinism (non-negotiable)
- Theme compilation must be deterministic for the same token input.
- No runtime randomness, no date/time-based behavior, no environment-dependent styling differences.

## Mapping rules
- Raw token values may only be consumed inside theme-engine mappers.
- Components must consume **theme roles**, not token files directly.
- If a role mismatch exists (e.g., divider too strong), fix it by adjusting mapping or semantic token values — not by per-component overrides.

## MUI adapter discipline
- Keep MUI as the adapter: map to MUI palette/typography/shape/spacing and component overrides.
- Avoid “clever” overrides that create hidden coupling or BU-specific behavior.

## Testing & outputs
- Maintain type safety (no `any`).
- Add/adjust tests for mappers if present.
- If output shape changes, document in `docs/architecture.md` or `docs/pipeline.md`.
