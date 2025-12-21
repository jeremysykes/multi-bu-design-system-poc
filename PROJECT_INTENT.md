# Multi-BU Design System on MUI (POC) | Cursor Project Prompt

## Purpose

Build a proof of concept that demonstrates enterprise-grade capability to manage multiple business-unit (BU) design systems on top of MUI, including the layers MUI does not provide out of the box: governance, token orchestration, deterministic theme compilation, validation, versioning discipline, and a clear scaling path.

This is not a “theme switcher” demo. It is a multi-BU design system platform slice, implemented as a high-quality, reviewable engineering artifact.

## What this POC must prove

A reviewer should conclude:

- The design system is token-driven, not hardcoded styling
- Multiple BUs can share the same component APIs while expressing different brands
- Governance exists as enforcement (CI and validation), not tribal knowledge
- The system scales beyond two BUs with clear extension points
- MUI is an adapter layer, not the design system itself

## Core Requirements

### 1) Token architecture

Implement a layered token model:

- Base tokens: raw values (palette ramps, typography ramps, radii, spacing scale, elevation scale)
- Semantic tokens: intent-based mappings (surface, text, border, action, feedback)
- Optional component tokens: only if needed to demonstrate component-specific governance

Rules:

- Tokens are the single source of truth for all visual decisions
- No visual values are defined inside components (no literal hex, px, rem in component code except in the theme engine)
- Each BU has a token set that extends or overrides core in a controlled way
- Tokens must follow a shared schema

Deliverables:

- `tokens/core/*.json`
- `tokens/bu-a/*.json`
- `tokens/bu-b/*.json`
- `theme-engine/tokenSchema.ts` and validation scripts

### 2) Deterministic theme compilation

Build a theme engine that compiles tokens into MUI themes deterministically.

Theme output must include:

- palette
- typography
- shape and spacing
- component overrides and variants (MUI `theme.components`)
- optional CSS variable strategy if it helps demonstrate runtime theming

Rules:

- The compiled result must be stable and repeatable
- Theme generation must fail fast on invalid or incomplete token mappings

Deliverables:

- `theme-engine/buildTheme.ts`
- `packages/themes/*` (generated themes or theme modules)

### 3) Multi-BU support

Implement at least two distinct BUs:

- BU A and BU B share the same component wrappers and APIs
- BU A and BU B differ visibly in brand expression (color, typography, radius, density, etc.)
- The divergence is driven by tokens, not ad hoc overrides in components

### 4) Component wrapper layer

Create a thin wrapper library that standardizes component usage across apps.
Example wrappers:

- Button
- TextField
- Card
- Alert
- Typography
- AppShell or Header (optional)

Rules:

- Wrappers expose stable, BU-agnostic APIs
- Styling and variants resolve through the theme
- The wrapper layer prevents app teams from bypassing governance

Deliverables:

- `packages/ui/src/*`
- Lint or rule that discourages direct `@mui/*` imports in consuming apps (POC level is fine)

### 5) Governance and validation (enforcement, not suggestions)

Add automated checks that fail the build if:

- tokens do not match schema
- semantic token coverage is incomplete
- forbidden patterns exist (example: direct hex usage in wrapper code)
- required component variants are missing in a BU

Deliverables:

- `scripts/validate-tokens.ts`
- `scripts/lint-design-system.ts` or equivalent
- CI config (GitHub Actions is enough for POC)

### 6) Documentation as contracts

Write docs that function like contracts:

- Token naming rules
- Semantic token dictionary and meaning
- How to add a new BU
- Versioning and breaking change policy
- Extension rules for variants and overrides

Deliverables:

- `docs/tokens.md`
- `docs/governance.md`
- `docs/adding-a-bu.md`
- `docs/versioning.md`

### 7) Demonstration surface

Provide Storybook that renders the same components under both BU themes:

- Side by side viewing strongly preferred
- Visual divergence clearly visible
- Visual regression as a gate (Chromatic or a lightweight alternative)

Deliverables:

- `storybook/` or `apps/storybook/`
- Visual regression integration in CI

## Non-goals (intentional)

Do not build:

- A governance web app
- Full Figma automation or bidirectional sync
- Cross-platform outputs (React only)
- Production-grade micro-frontend isolation, unless the POC explicitly needs it

## Success Criteria

A reviewer should be able to:

- Add a third BU using documented steps
- Understand where governance is enforced and why
- See how the system scales across many BUs without copy-paste themes
- See clear upgrade paths and versioning discipline

## Repo Layout Target

Use a monorepo layout (pnpm recommended):

/

- tokens/
  - core/
  - bu-a/
  - bu-b/
- theme-engine/
  - buildTheme.ts
  - tokenSchema.ts
  - validators/
- packages/
  - ui/
  - themes/
- storybook/
- scripts/
- docs/

## Incremental delivery rules (Cursor must follow these)

Cursor must develop incrementally and check in at each crucial step.

A “crucial step” means:

1. After scaffolding and tooling decisions are proposed
2. After token schema and initial token sets are drafted
3. After the theme engine compiles BU A successfully
4. After BU B compiles and differences are confirmed
5. After the first wrapper components work under both themes
6. After governance checks are implemented and at least one intentional failure case is proven
7. After Storybook shows side by side BU rendering
8. After visual regression gate is wired
9. After docs are written and “add a BU” instructions are validated

At each check-in, Cursor must:

1. **Update PROJECT_PROGRESS.md** - Log the completed work, fixes, or changes in the appropriate phase section
2. **Provide summary:**
   - What was built
   - What files changed
   - How to run it
   - What risk or ambiguity exists
   - A short list of next actions
   - One direct question for Jeremy to approve direction before proceeding

If there are forks in approach (example: CSS variables vs classic theme), Cursor should propose a recommendation with a reason, then ask for approval before implementing.

## Project Progress Tracking

**IMPORTANT:** The `PROJECT_PROGRESS.md` file must be maintained and updated as work progresses.

### When to Update PROJECT_PROGRESS.md

Cursor must update `PROJECT_PROGRESS.md` in the following situations:

1. **After completing a feature or phase** - Log the completion with status indicators
2. **After fixing critical issues** - Document the fix in the relevant phase section
3. **After making significant architectural changes** - Update the relevant phase with notes
4. **When reaching milestones** - Update the "Current Status" section
5. **When blocking issues are resolved** - Document the resolution

### Update Format

- Use log-style entries with clear timestamps or phase markers
- Mark completed features/phases with ✅
- Document any fixes, improvements, or changes in the relevant phase section
- Keep the "Current Status" section up-to-date with the latest working state
- Update "Next Steps" as work progresses

### Example Update Pattern

```markdown
### Phase X: [Phase Name] ✅

**Status:** Completed

- **Feature N:** [Description]
- **Feature N+1:** [Description]

**Recent Fixes/Updates:**

- Fixed [issue description]
- Updated [component/configuration]
```

**Remember:** `PROJECT_PROGRESS.md` serves as a living record of project progress. Keep it accurate and current.

## Implementation guidance (preferred defaults)

- TypeScript everywhere
- React + MUI
- pnpm workspace
- Storybook with BU theme switch or side by side decorators
- Minimal example app optional, Storybook can be the main surface
- Prefer deterministic generation and validation over runtime cleverness

## Open Questions (Cursor should ask these first, one at a time)

1. Are BU differences purely visual, or do any require behavioral differences in components?
2. Should the POC demonstrate runtime theme switching, or is build-time separation enough?
3. Do you want this POC to emphasize platform engineering (governance, CI, schema) or design ops (token semantics, mapping discipline), or balanced?

Stop and wait for Jeremy’s answers before coding.

## Start Sequence (Cursor should follow)

1. Propose stack and repo scaffolding plan, then check in
2. Implement token schema and sample tokens for core + BU A + BU B, then check in
3. Implement theme engine and compile BU A theme, then check in
4. Compile BU B theme and confirm divergence, then check in
5. Implement wrapper components and Storybook rendering under both themes, then check in
6. Add governance checks and prove a failing case, then check in
7. Add visual regression gate, then check in
8. Write docs and validate “add BU” path, then final check in

End of prompt.
