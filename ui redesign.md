# Build prompt: Material Design 3 UI, directed by ui-ux-pro-max

Redesign the UI in two stages: first use the `ui-ux-pro-max` skill to choose a design direction for this brief, then implement that direction using Google's official Material Web Components library (`@material/web`, Material Design 3). Replace shadcn/ui entirely; Tailwind can stay for layout/spacing utilities alongside Material components.

## Brief

- **Subject**: a tool that removes the tedious, repetitive part of academic paperwork (cover pages).
- **Audience**: university students in Bangladesh, often on phones, often rushed before a deadline.
- **Job**: template → form → PDF download, in under a minute, with zero confusion.

## Stage 1 — Direction (use ui-ux-pro-max)

Query the skill's data for:

- A UI style and color palette that fit a calm, trustworthy, fast utility tool for stressed students — not a generic SaaS brand.
- A font pairing (display + body) from its typography data.
- Relevant UX guidelines for form-heavy, mobile-first flows (field grouping, error states, loading states).

Show me the chosen style, palette (as hex values), and type pairing, each with a one-line justification, before moving to Stage 2.

## Stage 2 — Implementation (Material Web Components)

Translate the Stage 1 palette into Material Design 3's color-role system (primary, secondary, tertiary, surface, etc.) using `@material/material-color-utilities`, and export it as `--md-sys-color-*` CSS custom properties. Apply the chosen type pairing through `--md-sys-typescale-*` tokens rather than ad hoc font sizes.

### Integration notes — read first

- Material Web Components are Web Components (Lit-based), not React components. Import them only client-side: add `'use client'` to any file that imports `@material/web/*`, and load them via `useEffect` or `next/dynamic({ ssr: false })`. `customElements` doesn't exist server-side.
- Simple components (buttons, icon-buttons, chips) work fine with normal React `onClick`.
- Form inputs (`md-outlined-text-field`, `md-outlined-select`) need small typed wrapper components that bind `value` and listen for native `input`/`change` events via `useRef` + `addEventListener`, since React 18's `onChange` doesn't reliably catch events on custom elements.

### Components to use

`md-outlined-text-field`, `md-outlined-select` / `md-select-option`, `md-filled-button` / `md-outlined-button` / `md-text-button`, `md-elevated-card` / `md-outlined-card`, `md-circular-progress`, `md-icon-button` + Material Symbols.

## Constraints

- Don't touch the PDF generation logic, template config schema, or localStorage persistence — UI layer only.
- Fully responsive. Keep Material's default visible focus states — don't override them away.
- Follow M3 spacing/elevation/shape tokens rather than introducing custom one-off values.

## Process

Give me the Stage 1 output (style + palette + type pairing + justification) first and wait for my go-ahead before starting Stage 2.
