# Cursor Rules — Multi-BU Token-Driven Design System

These rules are **binding** for Cursor when working in this repo.
If a request conflicts with these rules, **do not implement** the conflicting part.
Prefer small, reviewable, deterministic changes.


## Scope
Applies to: `docs/**`, `README.md`, `PROJECT_INTENT.md`, `PROJECT_PROGRESS.md`.

## Documentation truthfulness
- Docs must reflect the real system, not aspirations.
- Do not claim compliance (a11y, governance, determinism) unless verified.

## Update rules
- Update `PROJECT_PROGRESS.md` only for real behavior or scope changes.
- Keep entries short: what changed, why, how to verify.

## Required docs hygiene
- If architecture/pipeline changes: update `docs/architecture.md` and/or `docs/pipeline.md`.
- If token shape or versioning policy changes (rare): update `docs/versioning.md`.
- If BU meanings change: update `docs/business-units.md`.
