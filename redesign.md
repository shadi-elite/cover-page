# Build prompt: Material Design 3 UI (Material Web Components)

Replaces the shadcn/ui-based UI with Google's official Material Web Components library, implementing Material Design 3.

---

Redesign the UI using Google's official Material Web Components library (`@material/web`), implementing Material Design 3. Replace shadcn/ui usage entirely; Tailwind can stay for layout/spacing utilities alongside Material components.

## Integration notes — read first

- Material Web Components are real Web Components (built on Lit), not React components. Only import/register them in the browser: wrap any file that imports from `@material/web/*` with `'use client'`, and load the components via `useEffect` or `next/dynamic` with `ssr: false`. `customElements` doesn't exist server-side, so importing at module scope in a server component will break the build.
- Simple components (buttons, icon-buttons, chips) work fine with normal React event props like `onClick` — those bubble as standard DOM events.
- Form inputs (`md-outlined-text-field`, `md-filled-select`, `md-outlined-select`) are trickier: React's `onChange` doesn't reliably catch their native `input`/`change` events in React 18. Build a small set of typed wrapper components (e.g. `<MdTextField />`) that attach `value` and listeners imperatively via `useRef` + `addEventListener`, so the rest of the app can still use them like normal controlled inputs.

## Components to use

- `md-outlined-text-field` — text inputs (name, ID, course code, etc.)
- `md-outlined-select` / `md-select-option` — template picker, dropdowns
- `md-filled-button` / `md-outlined-button` / `md-text-button` — primary actions
- `md-elevated-card` / `md-outlined-card` — form sections, template cards
- `md-circular-progress` — loading state while the PDF generates
- `md-icon-button` + Material Symbols — icon actions

## Theming

- Generate a Material You color scheme from one seed color using `@material/material-color-utilities` (or the Material Theme Builder), and export it as CSS custom properties (`--md-sys-color-primary`, etc.) in a global stylesheet.
- Apply Material's type scale via `--md-sys-typescale-*` tokens rather than ad hoc font sizes.
- Pick a seed color that fits the brief — this is a student utility tool, not a generic brand — something calm and trustworthy, not a default Google blue unless you can justify it for this subject.

## Brief

- **Subject**: a tool that removes the tedious, repetitive part of academic paperwork (cover pages).
- **Audience**: university students in Bangladesh, often on phones, often rushed before a deadline.
- **Job**: template → form → PDF download, in under a minute, with zero confusion.

## Constraints

- Don't touch the PDF generation logic, template config schema, or localStorage persistence — this is a UI layer redesign only.
- Fully responsive. Material components handle visible focus states by default — don't override that away.
- Follow M3 spacing/elevation/shape tokens rather than introducing custom one-off values.

## Process

Show me the chosen seed color, derived palette, and the component list mapped to each screen/section before wiring anything up.
