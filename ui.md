# Build prompt: Modern UI/UX redesign

Use this with Claude Code on your existing project. It directs the agent to use its UI UX pro max rather than just slapping on rounded corners and gradients.

---

Redesign the UI of this cover page generator using your frontend-design skill. Treat this as a real design brief, not a reskin.

## Brief

- **Subject**: A tool that takes the tedious, repetitive part of academic paperwork (cover pages) off students' hands. It's a utility, but the people using it are stressed, rushed, and filling this out for the Nth time before a deadline.
- **Audience**: University students in Bangladesh, mostly on phones or shared lab computers, often doing this minutes before a submission.
- **The page's single job**: Get someone from "I need a cover page" to "PDF downloaded" in under a minute, with zero confusion about which template or field to use.

## Constraints

- Don't touch the PDF generation logic, the template config schema, or the localStorage persistence — this is a UI/visual layer redesign only.
- Keep it fully responsive (this gets used on phones in hallways before class).
- Visible keyboard focus states, no broken contrast, reduced-motion respected.
- Avoid the generic AI-design defaults: no cream-background-serif-terracotta look, no near-black-with-neon-accent look, no broadsheet-hairline-newspaper layout — unless you can justify it specifically for this subject.

## Process

Follow your normal two-pass approach: brainstorm a compact design token system (palette as 4–6 named hex values, type pairing, layout concept, one signature element), check it against the brief for genericness, revise, then build. Show me the design plan before you start writing code.

## What "modern" means here

Not just rounded corners and a gradient — actual clarity: a calm, confident interface that makes template selection and form-filling feel fast and low-stakes, even though the user filling it out is stressed. The signature moment should come from the subject itself (the cover page / document metaphor), not a generic SaaS landing page trick.
