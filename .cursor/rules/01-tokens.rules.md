# Cursor Rules — Multi-BU Token-Driven Design System

These rules are **binding** for Cursor when working in this repo.
If a request conflicts with these rules, **do not implement** the conflicting part.
Prefer small, reviewable, deterministic changes.

## Scope

Applies to: `tokens/**`, token loaders, token scripts.

## Token format & constraints

- Keep existing schema and DTCG structure unchanged.
- Do not add new categories or new token names.
- Only adjust **values** within existing tokens.

## Change discipline

If any token file changes:

- Run token validation (`tokens:validate`).
- Generate a token diff report and save under `docs/token-diffs/YYYY-MM-DD-<summary>.md`.
- Bump the appropriate `version.json` per policy; version bump enforcement must pass.

## Quality rules

- Palette ramps must remain monotonic and coherent across 50–900.
- Typography scales must preserve readable hierarchy (no extreme jumps).
- Semantic tokens must map to stable roles (text, border, background, status) and must not encode component-specific hacks.

## BU intent guardrails

- BU A: conservative, dense, high clarity and boundaries
- BU B: approachable, energetic, readable, more breathing room
- BU C: premium, calm, refined, “quiet luxury”
- BU D: clarity, speed, trust, composability, low cognitive overhead
  Token value changes must move _toward_ these intents, not away.
