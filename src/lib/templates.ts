export interface TemplateField {
  name: string;
  label: string;
  type: "text" | "date" | "select";
  placeholder?: string;
  required: boolean;
  /** If true, this field is persisted in localStorage across sessions */
  persistent?: boolean;
  /** Group for visual sectioning in the form */
  group: "course" | "student" | "submission";
  /** Options for select type fields */
  options?: string[];
  /** Default value */
  defaultValue?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  icon: string;
  fields: TemplateField[];
}

// ─── Common fields shared across templates ──────────────────────────────────

const courseFields: TemplateField[] = [
  {
    name: "courseTitle",
    label: "Course Title",
    type: "text",
    placeholder: "e.g. Data Structures & Algorithms",
    required: true,
    group: "course",
  },
  {
    name: "courseCode",
    label: "Course Code",
    type: "text",
    placeholder: "e.g. CSE 2101",
    required: true,
    group: "course",
  },
];

const studentFields: TemplateField[] = [
  {
    name: "studentName",
    label: "Student Name",
    type: "text",
    placeholder: "Your full name",
    required: true,
    persistent: true,
    group: "student",
  },
  {
    name: "studentId",
    label: "Student ID",
    type: "text",
    placeholder: "e.g. 2021-1-60-001",
    required: true,
    persistent: true,
    group: "student",
  },
  {
    name: "section",
    label: "Section",
    type: "text",
    placeholder: "e.g. 1",
    required: true,
    persistent: true,
    group: "student",
  },
  {
    name: "semester",
    label: "Semester",
    type: "text",
    placeholder: "e.g. Fall 2025",
    required: true,
    persistent: true,
    group: "student",
  },
  {
    name: "department",
    label: "Department",
    type: "text",
    placeholder: "e.g. Computer Science & Engineering",
    required: false,
    persistent: true,
    group: "student",
  },
];

const submissionFields: TemplateField[] = [
  {
    name: "submittedTo",
    label: "Submitted To (Faculty Name)",
    type: "text",
    placeholder: "e.g. Dr. Jane Doe",
    required: true,
    group: "submission",
  },
  {
    name: "designation",
    label: "Designation",
    type: "text",
    placeholder: "e.g. Associate Professor",
    required: false,
    group: "submission",
  },
  {
    name: "facultyDepartment",
    label: "Faculty Department",
    type: "text",
    placeholder: "e.g. Department of CSE",
    required: false,
    group: "submission",
  },
  {
    name: "submissionDate",
    label: "Date of Submission",
    type: "date",
    required: true,
    group: "submission",
    defaultValue: new Date().toISOString().split("T")[0],
  },
];

// ─── Templates ──────────────────────────────────────────────────────────────

export const templates: Template[] = [
  {
    id: "assignment",
    name: "Assignment Cover Page",
    description: "Standard cover page for course assignments and homework submissions",
    icon: "📝",
    fields: [
      ...courseFields,
      {
        name: "assignmentTitle",
        label: "Assignment Title",
        type: "text",
        placeholder: "e.g. Implementing Binary Search Tree",
        required: true,
        group: "course",
      },
      {
        name: "assignmentNo",
        label: "Assignment No.",
        type: "text",
        placeholder: "e.g. 3",
        required: false,
        group: "course",
      },
      ...studentFields,
      ...submissionFields,
    ],
  },
  {
    id: "lab-report",
    name: "Lab Report Cover Page",
    description: "Cover page for laboratory experiment reports with group & experiment info",
    icon: "🔬",
    fields: [
      ...courseFields,
      {
        name: "experimentTitle",
        label: "Experiment Title",
        type: "text",
        placeholder: "e.g. Study of Logic Gates",
        required: true,
        group: "course",
      },
      {
        name: "experimentNo",
        label: "Experiment No.",
        type: "text",
        placeholder: "e.g. 5",
        required: false,
        group: "course",
      },
      {
        name: "groupNo",
        label: "Group No.",
        type: "text",
        placeholder: "e.g. A3",
        required: false,
        group: "student",
      },
      ...studentFields,
      ...submissionFields,
    ],
  },
];

/** Get persistent field names from a template */
export function getPersistentFields(template: Template): string[] {
  return template.fields
    .filter((f) => f.persistent)
    .map((f) => f.name);
}

/** Get all unique persistent field names across all templates */
export function getAllPersistentFieldNames(): string[] {
  const names = new Set<string>();
  templates.forEach((t) =>
    t.fields.forEach((f) => {
      if (f.persistent) names.add(f.name);
    })
  );
  return Array.from(names);
}
