# Cursor Rules — Multi-BU Token-Driven Design System

These rules are **binding** for Cursor when working in this repo.
If a request conflicts with these rules, **do not implement** the conflicting part.
Prefer small, reviewable, deterministic changes.


## Scope
Applies to: `packages/ui/**` wrappers, atoms/molecules/organisms/templates/pages within the UI package.

## Styling rules
- No hardcoded visual values. Use:
  - `theme.palette.*`
  - `theme.typography.*`
  - `theme.spacing(...)`
  - `theme.shape.*`
- Prefer MUI component APIs over `sx` overrides.
- If `sx` is used, it must reference theme roles only.

## Component contract
- Wrapper components define stable APIs and behavior.
- Pages/templates compose wrappers; they must not restyle base components to compensate for token problems.
- Do not fork behavior per BU.

## Accessibility rules
- Preserve visible focus.
- Provide accessible names for icon-only controls.
- Maintain correct semantics (`Typography component=...`, buttons for actions, links for navigation).
- Never trade accessibility for aesthetics.

## Atomic design discipline
- Keep placements aligned: Atoms < Molecules < Organisms < Templates < Pages.
- Keep exports backward compatible unless explicitly instructed otherwise.
