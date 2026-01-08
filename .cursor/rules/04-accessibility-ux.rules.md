# Cursor Rules — Multi-BU Token-Driven Design System

These rules are **binding** for Cursor when working in this repo.
If a request conflicts with these rules, **do not implement** the conflicting part.
Prefer small, reviewable, deterministic changes.


## Target
- Aim for WCAG 2.2 AA-level behavior across Storybook and demo site.
- Follow established usability heuristics: consistency, feedback, error prevention, recognition over recall.

## Must-haves
- Keyboard navigation works end-to-end.
- Focus indicators are visible and consistent.
- Headings are ordered and semantic.
- No color-only communication for status (use icons/text).
- Avoid tiny touch targets; respect reasonable spacing for interactive controls.

## Where fixes go
- Prefer fixing in wrappers or theme roles/mappings.
- Avoid one-off page patches.

## Regression policy
If any change reduces accessibility or clarity, revert and fix properly.
