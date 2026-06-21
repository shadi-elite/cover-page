/**
 * ============================================================
 *  COVER PAGE HTML TEMPLATE — A4 PRINT-TO-PDF
 * ============================================================
 *
 *  This file generates a standalone HTML string for the cover
 *  page. It opens in a new browser tab and triggers window.print()
 *  so you can "Save as PDF" from the print dialog.
 *
 *  ► TO EDIT THE COVER PAGE LAYOUT:
 *    - Modify the HTML inside generateCoverPageHTML()
 *    - It uses standard HTML + inline CSS — no special libraries
 *    - The @page CSS rule sets A4 size with zero margins
 *    - The .page container is exactly 210mm × 297mm
 *
 *  ► TO CHANGE STYLES:
 *    - Edit the <style> block in the HTML string
 *    - All styles are plain CSS, nothing framework-specific
 *
 * ============================================================
 */

import { type Template } from "@/lib/templates";

/**
 * Generate a complete HTML document string for the cover page.
 * This is plain HTML/CSS — edit it however you like.
 */
export function generateCoverPageHTML(
  template: Template,
  formData: Record<string, string>
): string {
  const isLabReport = template.id === "lab-report";

  // Helper to get a value or empty string
  const val = (key: string) => formData[key] || "";

  // Format the date nicely
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr + "T00:00:00");
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  // Build the title/number line
  const titleLabel = isLabReport ? "Experiment Title" : "Assignment Title";
  const titleValue = isLabReport ? val("experimentTitle") : val("assignmentTitle");
  const numberLabel = isLabReport ? "Experiment No." : "Assignment No.";
  const numberValue = isLabReport ? val("experimentNo") : val("assignmentNo");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Cover Page — ${val("courseTitle") || "Untitled"}</title>
  <style>
    /* ──────────────────────────────────────────────
       A4 PAGE SETUP
       Edit these to change page size or margins
       ────────────────────────────────────────────── */
    @page {
      size: A4;
      margin: 0;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Times New Roman', 'Georgia', serif;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      background: #fff;
    }

    /* ──────────────────────────────────────────────
       PAGE CONTAINER — exactly A4 size
       ────────────────────────────────────────────── */
    .page {
      width: 210mm;
      min-height: 297mm;
      margin: 0 auto;
      padding: 20mm 25mm;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* ──────────────────────────────────────────────
       DECORATIVE BORDER
       ────────────────────────────────────────────── */
    .page-border {
      position: absolute;
      top: 10mm;
      left: 10mm;
      right: 10mm;
      bottom: 10mm;
      border: 2px solid #1a1a2e;
      pointer-events: none;
    }

    .page-border::before {
      content: '';
      position: absolute;
      top: 2mm;
      left: 2mm;
      right: 2mm;
      bottom: 2mm;
      border: 0.5px solid #1a1a2e;
    }

    /* ──────────────────────────────────────────────
       LOGO & UNIVERSITY HEADER
       ────────────────────────────────────────────── */
    .logo {
      height: 28mm;
      max-width: 160mm;
      object-fit: contain;
      margin-top: 8mm;
      margin-bottom: 2mm;
    }

    .university-name {
      font-size: 20pt;
      font-weight: bold;
      color: #1a1a2e;
      text-align: center;
      margin-top: 5mm;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }

    .department-name {
      font-size: 13pt;
      color: #333;
      text-align: center;
      margin-top: 3mm;
    }

    /* ──────────────────────────────────────────────
       HORIZONTAL RULE
       ────────────────────────────────────────────── */
    .divider {
      width: 60%;
      height: 1px;
      background: #1a1a2e;
      margin: 8mm auto;
    }

    .divider-thin {
      width: 40%;
      height: 0.5px;
      background: #666;
      margin: 4mm auto;
    }

    /* ──────────────────────────────────────────────
       COVER PAGE TYPE (Assignment / Lab Report)
       ────────────────────────────────────────────── */
    .cover-type {
      font-size: 18pt;
      font-weight: bold;
      color: #1a1a2e;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-top: 2mm;
    }

    /* ──────────────────────────────────────────────
       COURSE & ASSIGNMENT/EXPERIMENT INFO
       ────────────────────────────────────────────── */
    .course-info {
      text-align: center;
      margin-top: 8mm;
    }

    .course-title {
      font-size: 16pt;
      font-weight: bold;
      color: #1a1a2e;
      margin-bottom: 2mm;
    }

    .course-code {
      font-size: 13pt;
      color: #444;
    }

    .assignment-info {
      text-align: center;
      margin-top: 6mm;
    }

    .assignment-title {
      font-size: 14pt;
      font-weight: bold;
      color: #222;
    }

    .assignment-number {
      font-size: 12pt;
      color: #555;
      margin-top: 1mm;
    }

    /* ──────────────────────────────────────────────
       STUDENT INFO TABLE
       ────────────────────────────────────────────── */
    .info-section {
      margin-top: 12mm;
      width: 100%;
      max-width: 140mm;
    }

    .info-section-header {
      font-size: 12pt;
      font-weight: bold;
      color: #1a1a2e;
      text-align: left;
      margin-bottom: 3mm;
      padding-bottom: 1mm;
      border-bottom: 1px solid #1a1a2e;
    }

    .info-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12pt;
    }

    .info-table td {
      padding: 2.5mm 3mm;
      vertical-align: top;
    }

    .info-table .label-cell {
      font-weight: bold;
      color: #333;
      width: 45%;
      white-space: nowrap;
    }

    .info-table .value-cell {
      color: #111;
    }

    .info-table .colon-cell {
      width: 5%;
      text-align: center;
      font-weight: bold;
    }

    /* ──────────────────────────────────────────────
       SUBMITTED TO SECTION
       ────────────────────────────────────────────── */
    .submitted-to {
      margin-top: 10mm;
      width: 100%;
      max-width: 140mm;
    }

    /* ──────────────────────────────────────────────
       DATE FOOTER
       ────────────────────────────────────────────── */
    .date-footer {
      margin-top: auto;
      padding-top: 10mm;
      padding-bottom: 5mm;
      text-align: center;
      font-size: 12pt;
      color: #333;
    }

    .date-value {
      font-weight: bold;
      color: #1a1a2e;
    }

    /* ──────────────────────────────────────────────
       PRINT CONTROLS (hidden when printing)
       ────────────────────────────────────────────── */
    .print-controls {
      position: fixed;
      top: 16px;
      right: 16px;
      z-index: 100;
      display: flex;
      gap: 8px;
    }

    .print-btn {
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .print-btn-primary {
      background: #6C63FF;
      color: white;
    }

    .print-btn-primary:hover {
      background: #5A52E0;
      box-shadow: 0 4px 12px rgba(108, 99, 255, 0.4);
    }

    .print-btn-secondary {
      background: #f0f0f0;
      color: #333;
    }

    .print-btn-secondary:hover {
      background: #e0e0e0;
    }

    @media print {
      .print-controls {
        display: none !important;
      }

      body {
        background: white;
      }

      .page {
        margin: 0;
        padding: 20mm 25mm;
      }
    }

    /* Screen-only background for visual preview */
    @media screen {
      body {
        background: #e5e5e5;
        padding: 20px;
      }

      .page {
        background: white;
        box-shadow: 0 4px 24px rgba(0,0,0,0.15);
      }
    }
  </style>
</head>
<body>
  <!-- Print controls — visible only on screen, hidden when printing -->
  <div class="print-controls">
    <button class="print-btn print-btn-primary" onclick="window.print()">
      🖨️ Print / Save PDF
    </button>
    <button class="print-btn print-btn-secondary" onclick="window.close()">
      ✕ Close
    </button>
  </div>

  <!-- ============================================
       A4 COVER PAGE — EDIT THIS SECTION
       ============================================ -->
  <div class="page">
    <div class="page-border"></div>

    <!-- LOGO -->
    <img
      class="logo"
      src="https://nubtkhulna.ac.bd/assets/images/logo.png"
      alt="University Logo"
      onerror="this.style.display='none'"
    />

    <!-- UNIVERSITY NAME — Handled by the logo -->
    <div class="department-name">
      Department of ${val("department") || "Computer Science and Engineering"}
    </div>

    <div class="divider"></div>

    <!-- COVER TYPE -->
    <div class="cover-type">
      ${isLabReport ? "Lab Report" : "Assignment"}
    </div>

    <div class="divider-thin"></div>

    <!-- COURSE INFO -->
    <div class="course-info">
      <div class="course-title">${val("courseTitle")}</div>
      <div class="course-code">${val("courseCode")}</div>
    </div>

    <!-- ASSIGNMENT / EXPERIMENT INFO -->
    <div class="assignment-info">
      ${titleValue ? `<div class="assignment-title">${titleLabel}: ${titleValue}</div>` : ""}
      ${numberValue ? `<div class="assignment-number">${numberLabel}: ${numberValue}</div>` : ""}
    </div>

    ${isLabReport && val("groupNo") ? `
    <div class="assignment-info" style="margin-top: 3mm;">
      <div class="assignment-number">Group No.: ${val("groupNo")}</div>
    </div>
    ` : ""}

    <!-- STUDENT INFO TABLE -->
    <div class="info-section">
      <div class="info-section-header">Submitted By</div>
      <table class="info-table">
        <tr>
          <td class="label-cell">Name</td>
          <td class="colon-cell">:</td>
          <td class="value-cell">${val("studentName")}</td>
        </tr>
        <tr>
          <td class="label-cell">Student ID</td>
          <td class="colon-cell">:</td>
          <td class="value-cell">${val("studentId")}</td>
        </tr>
        <tr>
          <td class="label-cell">Section</td>
          <td class="colon-cell">:</td>
          <td class="value-cell">${val("section")}</td>
        </tr>
        <tr>
          <td class="label-cell">Semester</td>
          <td class="colon-cell">:</td>
          <td class="value-cell">${val("semester")}</td>
        </tr>
        ${val("department") ? `
        <tr>
          <td class="label-cell">Department</td>
          <td class="colon-cell">:</td>
          <td class="value-cell">${val("department")}</td>
        </tr>
        ` : ""}
      </table>
    </div>

    <!-- SUBMITTED TO -->
    <div class="submitted-to">
      <div class="info-section-header">Submitted To</div>
      <table class="info-table">
        <tr>
          <td class="label-cell">Name</td>
          <td class="colon-cell">:</td>
          <td class="value-cell">${val("submittedTo")}</td>
        </tr>
        ${val("designation") ? `
        <tr>
          <td class="label-cell">Designation</td>
          <td class="colon-cell">:</td>
          <td class="value-cell">${val("designation")}</td>
        </tr>
        ` : ""}
        ${val("facultyDepartment") ? `
        <tr>
          <td class="label-cell">Department</td>
          <td class="colon-cell">:</td>
          <td class="value-cell">${val("facultyDepartment")}</td>
        </tr>
        ` : ""}
      </table>
    </div>

    <!-- DATE FOOTER -->
    <div class="date-footer">
      Date of Submission: <span class="date-value">${formatDate(val("submissionDate"))}</span>
    </div>
  </div>
</body>
</html>`;
}
