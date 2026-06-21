# Build prompt: Cover Page Generator

Paste this into Claude Code (or run it as your first message in a fresh project folder) to scaffold the app.

---

Build a "Cover Page Generator" web app — a Next.js project for generating university assignment and lab report cover pages as downloadable PDFs.

## Tech stack
- Next.js 14 (App Router), TypeScript
- Tailwind CSS + shadcn/ui for the form UI
- @react-pdf/renderer for client-side PDF generation (no server-side rendering, no Puppeteer)
- No backend, no database, no auth — fully static, deployable on Vercel free tier

## Core features

1. **Template picker** — a small set of starter cover page templates:
   - "Assignment Cover Page"
   - "Lab Report Cover Page"
   Each template is defined by a config object: `{ id, name, fields: [...] }`, so adding a new template later means adding one config entry, no other code changes.

2. **Dynamic form** — renders input fields based on the selected template's field schema. Common fields across templates:
   - Course title, course code
   - Assignment/lab/experiment title or number
   - Student name, student ID, section, batch/semester
   - Submitted to (faculty name + designation)
   - Submission date (date picker, default to today)
   Lab Report template adds: group no., experiment no.

3. **Static university logo** — place a logo image at `/public/logo.png` and reference it directly inside the PDF component. No upload UI needed.

4. **Remember my info** — persist student name, ID, section, batch, and department in `localStorage`, so returning visitors don't retype them. Course-specific fields (title, code, submission date) should NOT be remembered since they change per assignment.

5. **PDF generation** — a React component built with `@react-pdf/renderer` that lays out the cover page professionally: centered logo, university name, course details, a student details table, and a submission date footer. Clicking "Generate PDF" triggers a client-side download — no API route involved.

6. **Responsive, clean UI** — mobile-friendly form using shadcn/ui components (Input, Select, Button, Card, Label), no unnecessary clutter.

## Project setup

1. Scaffold: `npx create-next-app@latest cover-page-generator --typescript --tailwind --app`
2. Install PDF lib: `npm install @react-pdf/renderer`
3. Add shadcn/ui: `npx shadcn@latest init`, then add Input, Select, Button, Card, Label components
4. Folder structure:
   - `/app/page.tsx` — main form page
   - `/components/TemplateSelector.tsx`
   - `/components/CoverPageForm.tsx`
   - `/components/pdf/CoverPagePDF.tsx` — the `@react-pdf/renderer` document
   - `/lib/templates.ts` — template configs
   - `/lib/useLocalStorage.ts` — persistence hook
   - `/public/logo.png` — static university logo (placeholder for now)

## Out of scope for v1
- No accounts/login
- No saved history of generated PDFs
- No multi-logo/multi-university support (logo is hardcoded for now)

Start by scaffolding the project, then build the template config plus one working template end-to-end (form → PDF preview → download). Stop there so I can review before you add the second template.
