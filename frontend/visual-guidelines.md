# Frontend Visual Guidelines (Magentic-UI)

Use this as the first stop before any frontend change. Keep it open while you work.

## Core Principles
- **Clarity over density**: Favor whitespace and readable hierarchies over packing controls.
- **Single scroll**: Avoid nested scroll regions inside modals/panels.
- **Progressive disclosure**: Hide long explanations behind tooltips/popovers; keep primary actions visible.
- **Consistency first**: Reuse existing spacing, typography, and interaction patterns from current components.
- **Responsive by default**: Design for 320px–1280px; ensure grids collapse gracefully.

## Layout & Spacing
- Use `Space` and grid breakpoints: xs=1, sm=1, md=2, lg=2, xl=3, xxl=3/4 depending on context.
- Minimum touch target: 32px height; keep button groups with small size (`size="small"`) when space-constrained.
- Keep modal bodies with a single scroll area; avoid inner `overflow` scrolls.
- Horizontal padding: 16–24px in modals/panels; vertical rhythm: 12–16px between sections.

## Typography
- Titles: `Typography.Title level={5}` for panel headings; avoid oversized titles in narrow layouts.
- Body: `Typography.Text` / `Paragraph` at 12–14px; limit descriptions to 2–3 lines with `ellipsis`.
- Hierarchy: one primary title, secondary caption text for counts/hints, body text for descriptions.

## Colors & States
- Prefer theme tokens: `token.colorText`, `colorTextSecondary`, `colorPrimary`, `colorBgContainer`.
- Actions: primary action uses primary button; destructive uses `danger` and is de-emphasized.
- Tags: keep to 2 visible, then `+N`; use semantic colors sparingly (`red` only for critical).

## Controls & Tooltips
- Use icon-only buttons **only** when paired with a tooltip and when the meaning is obvious.
- Prefer labeled buttons for primary actions (e.g., “Run”, “Save”, “Edit”).
- Tooltips should be concise (1 line). Longer help goes into a popover or inline note.
- Avoid multiple adjacent icon-only buttons without labels; group them or use a dropdown.

## Responsiveness
- Grids: reduce columns on smaller widths; never let cards squish. Minimum card width ~220–260px.
- Inputs: shrink width in headers (e.g., search at 150–200px) and wrap under the title on small screens.
- Buttons: use `size="small"` in dense headers; stack vertically on small screens.

## Modals & Panels
- Modal width: 900–1100px for data-heavy views; body scroll only.
- Avoid large alert blocks in modals; prefer a short inline note with an info icon and link.

## Cards
- Keep actions minimal: primary action labeled; secondary actions can be icon-with-tooltip if obvious.
- Use `size="small"`, tight padding, and 2-line ellipsis descriptions.
- Maintain consistent tag sizing (`fontSize: 11–12px`, minimal padding).

## Copy & UX
- Lead with what the user can do now; keep marketing/long text behind a link.
- Surface counts succinctly (e.g., “7 templates”).
- Avoid jargon unless already defined in the UI; keep phrasing action-oriented.

## Review Checklist (before merging)
- [ ] Single scroll area; no nested scrollbars.
- [ ] Header controls wrap cleanly at 320px.
- [ ] Grids/cards don’t squish; columns reduce gracefully.
- [ ] Primary actions are labeled and discoverable; destructive actions de-emphasized.
- [ ] Text hierarchy is clear; no walls of text in view.
- [ ] Tooltips/popovers are concise; long help hidden behind a link.
- [ ] Uses theme tokens and existing component sizes.
