# Build prompt: Assignment cover page (TSX + jsPDF html-to-pdf)

---

Build the "Assignment Cover Page" template as a standalone, print-ready TSX component, plus the export pipeline that turns it into a downloadable PDF using jsPDF's `html()` method (html2canvas under the hood). This is a print document, not part of the app's Material Design shell — it gets its own plain CSS, not Material Web Components.

## Data shape

```ts
interface AssignmentCoverPageData {
  // course information
  courseTitle: string;
  courseCode: string;
  assignmentNo?: string;
  assignmentTitle: string; // rendered in the header, not repeated in course info

  // student information (these five are the ones persisted in localStorage)
  studentName: string;
  studentId: string;
  section: string;
  semester: string;
  department?: string;

  // submission details
  facultyName: string;
  designation?: string;
  facultyDepartment?: string;
  submissionDate: string; // already formatted, e.g. "22 June 2026"
}
```

Optional fields (`assignmentNo`, `department`, `designation`, `facultyDepartment`): if empty, omit that row entirely rather than rendering a blank value — don't leave a label with nothing next to it.

## Layout (build exactly this, top to bottom)

1. **Logo** — horizontal lockup image (already includes the university name, so just an `<img>`, no separate text under it). Static asset at `/public/logo.png`, centered, capped at roughly 220px wide / 48px tall, `object-fit: contain`.
2. **Header** — a thin horizontal rule, then a small uppercase tracked kicker reading "Assignment on", then the assignment title in a serif display font below it (this is the one place a serif face is appropriate — everything else in the document uses the body sans), then another thin rule. All centered.
3. **Course information** — section label, then a two-column label/value list: Course title, Course code, Assignment no.
4. **Student information** — section label, then: Student name, Student ID, Section, Semester, Department. Visually separated from the section above with a hairline top border, not just spacing.
5. **Submission details** — section label, then: Submitted to (faculty name), Designation, Faculty department, Date of submission. Same hairline separator treatment.

Keep the whole thing as clean ink-on-paper: dark gray/black text on white, no color accents, generous label/value contrast (muted gray labels, dark values).

## PDF export pipeline

- Render `<AssignmentCoverPage>` at a fixed pixel size matching A4 (794 × 1123px at 96 DPI), not a fluid/responsive layout — this is what gets rasterized, so it needs a stable size regardless of viewport.
- Render it off-screen (e.g. `position: absolute; left: -9999px`) rather than `display: none`, so html2canvas can actually measure and capture it.
- Before capturing: `await document.fonts.ready` so custom fonts aren't mid-load, and confirm the logo `<img>` has fired its `load` event (or already has `complete === true`) — otherwise the export can fire before assets are ready and produce a blank logo or fallback-font text.
- Use jsPDF's `html()` method against that off-screen node, with `html2canvas: { scale: 2 }` for crisp text, output format `a4`, and trigger a file download named something like `cover-page-<studentId>.pdf`.
- Wrap the whole export in a loading state (disable the "Generate PDF" button, show a spinner) since `html()` is async and rasterizing a full page takes a moment.

## Constraints

- No Material Web Components, no Tailwind utility classes that depend on the viewport — plain CSS/inline styles at fixed pixel values so the capture is deterministic.
- Don't touch the template config schema or localStorage persistence logic — this task is the cover page component and its PDF export function only.
- Component should accept `AssignmentCoverPageData` as props and render the same content whether it's shown on-screen for preview or rendered off-screen for export — one component, two contexts.

## Process

Build the component first and show me an on-screen preview (no export yet) so I can sanity-check the layout against real data, then wire up the jsPDF export.

# Build prompt: Course/semester cover page (TSX + jsPDF html-to-pdf)

Build a separate cover page template for a full course or semester (not per-assignment). This will be used for, say, a lab manual or course package that bundles multiple assignments. The structure is different: a bold central university header, course title / number, and a footer with department/faculty info.

## Data shape

```ts
interface CourseCoverPageData {
  // university — this is static for your context, just include it as hardcoded text
  universityName: string; // "Northern University of Business and Technology | Khulna"
  department: string; // e.g. "Department of Computer Science and Engineering"

  // course / semester info
  courseTitle: string; // e.g. "Object-Oriented Programming Laboratory"
  courseCode: string; // e.g. "CSE-212"
  semester?: string; // e.g. "2nd Year, 1st Semester"
  academicYear?: string; // e.g. "2025-2026"

  // what this package contains
  packageType: "Course" | "Semester" | "Lab Manual" | "Module";
  packageDescription?: string; // e.g. "All experiments and reports"

  // optional identifier for the document version
  documentId?: string; // e.g. "Version 1.0"
  documentSubtitle?: string; // e.g. "Student Copy"

  // footer text (optional, you can omit this if you don't need it)
  footerText?: string; // e.g. "Confidential — For Internal Academic Use Only"
}
```

- `universityName`, `department`: include these as static branded text, not editable fields.
- Omit any optional field (semester, year, document ID, subtitle, footer text) entirely rather than rendering an empty label/value pair.
- Use a serif title face only for the university/department banner; the main course title should be sans, like the rest of the document.

## Layout (build exactly this, top to bottom)

1. **Logo** — same horizontal lockup image asset as the assignment cover page: `/public/logo.png`, centered, capped at roughly 220px wide / 48px tall, `object-fit: contain`.
2. **Header banner**
   - A thin horizontal rule.
   - Uppercase university name in a smaller serif face.
   - Department name in a slightly smaller sans face, slightly tracked out.
   - Another thin rule.
     All centered.
3. **Course-level heading** — large bold sans, centered:

   ```
   [Package type] on
   [Course title]
   ```

   So if package type is “Course” and course title is “Object-Oriented Programming Laboratory”, it renders as:

   ```
   Course on
   Object-Oriented Programming Laboratory
   ```

   If `courseCode` is present, include it on a new line below, also centered, smaller bold sans (e.g. “CSE-212”).

4. **Optional identifiers** — if `semester`, `academicYear`, `documentId`, `documentSubtitle`, or `packageDescription` are present, render them below the course header as centered lines in a smaller sans face, grouped together.
5. **Optional footer** — if `footerText` is present, include it at the bottom in a small, muted sans-serif face, centered.

Keep the whole layout clean and ink-on-paper: dark gray/black text on white, generous spacing, no color accents — treat it like a title page for a bound document.

## PDF export pipeline (jsPDF html2canvas)

- Render `<CourseCoverPage>` at a fixed pixel size matching A4 (794 × 1123px at 96 DPI), not a fluid/responsive layout — this is what gets rasterized for PDF export.
- Render it off-screen (e.g. `position: absolute; left: -9999px`) rather than `display: none`, so html2canvas can measure and capture it.
- Before rasterizing:
  - `await document.fonts.ready`.
  - Confirm the logo `<img>` has fired its `load` event (or already has `complete === true`), otherwise the logo may be missing or rendered in fallback.
- Pass the off-screen node to jsPDF's `html()`, with `html2canvas: { scale: 2 }` for sharp text, output format `a4`, and trigger a file download named something like `cover-page-course.pdf`. Wrap the export in a loading state (disable the "Generate PDF" button, show a spinner) since `html()` is async.

## Constraints

- No Material Web Components, no Tailwind utility classes that depend on viewport size — use inline styles and standard CSS so the rendered output is deterministic and portable to the rasterized canvas.
- This task is for the component and its PDF export only — do not touch the template config schema or localStorage persistence (those belong to the per-assignment templates).
- Component should accept `CourseCoverPageData` as props and render the same content whether it's shown on-screen for preview or rendered off-screen for export.

## Process

Build the component first and show me an on-screen preview (no export yet) so I can sanity-check the layout against real data, then wire up the jsPDF export.
