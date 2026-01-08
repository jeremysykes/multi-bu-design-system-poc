# Cursor Rules — Multi-BU Token-Driven Design System

These rules are **binding** for Cursor when working in this repo.
If a request conflicts with these rules, **do not implement** the conflicting part.
Prefer small, reviewable, deterministic changes.

## Scope

Applies to: `storybook/**`, `.storybook/**`, stories, docs pages.

## Theme switching

- Storybook must support switching among BU A/B/C/D via a single mechanism (toolbar).
- Do not reintroduce side-by-side hacks unless explicitly required.

## Story quality

- Stories must demonstrate wrapper components as consumers would use them.
- Avoid styling inside stories to “show it off.” Use real usage patterns.

## Visual regression discipline

- Chromatic/visual baselines are updated only when changes are intentional.
- When baselines change: write a short note in `PROJECT_PROGRESS.md` explaining why.

## Performance

- Avoid expensive per-story theme recompilation if caching exists.
