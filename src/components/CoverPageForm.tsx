"use client";

import React, { useState, useEffect, useCallback } from "react";
import { type Template, getPersistentFields } from "@/lib/templates";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { generateCoverPageHTML } from "@/components/pdf/CoverPageDocument";
import { MdTextField } from "@/components/ui/MaterialWrappers";
import { IconDownload, IconRefresh, IconBookmark } from "@/components/ui/icons";

// Web component imports
import '@material/web/icon/icon.js';
import '@material/web/labs/card/outlined-card.js';
import '@material/web/button/filled-button.js';
import '@material/web/button/text-button.js';

interface CoverPageFormProps {
  template: Template;
}

const groupLabels: Record<string, { title: string; description: string }> = {
  course: {
    title: "Course Information",
    description: "Details about the course and assignment",
  },
  student: {
    title: "Student Information",
    description: "Your personal and academic details",
  },
  submission: {
    title: "Submission Details",
    description: "Faculty and submission date info",
  },
};

const groupOrder = ["course", "student", "submission"];

export default function CoverPageForm({ template }: CoverPageFormProps) {
  const { storedData, isLoaded, saveFields } = useLocalStorage();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [hasInitialized, setHasInitialized] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize form data when template changes or localStorage loads
  useEffect(() => {
    if (!isLoaded) return;

    const initial: Record<string, string> = {};
    template.fields.forEach((field) => {
      // Priority: stored persistent value > default value > empty
      if (field.persistent && storedData[field.name]) {
        initial[field.name] = storedData[field.name];
      } else if (field.defaultValue) {
        initial[field.name] = field.defaultValue;
      } else {
        initial[field.name] = "";
      }
    });
    setFormData(initial);
    setTouched({});
    setHasInitialized(true);
  }, [template, isLoaded, storedData]);

  const handleChange = useCallback(
    (fieldName: string, value: string) => {
      setFormData((prev) => ({ ...prev, [fieldName]: value }));
    },
    []
  );

  const handleBlur = useCallback((fieldName: string) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
  }, []);

  const handleGeneratePDF = useCallback(() => {
    // Save persistent fields before generating
    const persistentNames = getPersistentFields(template);
    saveFields(persistentNames, formData);

    // Generate HTML and open in new window for printing
    const html = generateCoverPageHTML(template, formData);
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(html);
      printWindow.document.close();
      // Wait for content to render, then trigger print
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
        }, 500);
      };
    }
  }, [template, formData, saveFields]);

  const handleReset = useCallback(() => {
    const reset: Record<string, string> = {};
    template.fields.forEach((field) => {
      if (field.persistent && storedData[field.name]) {
        reset[field.name] = storedData[field.name];
      } else if (field.defaultValue) {
        reset[field.name] = field.defaultValue;
      } else {
        reset[field.name] = "";
      }
    });
    setFormData(reset);
    setTouched({});
  }, [template, storedData]);

  if (!hasInitialized || !mounted) {
    return (
      <div className="p-6 animate-pulse bg-surface-container rounded-xl border border-[var(--md-sys-color-outline-variant)]">
        <div className="h-5 w-40 bg-[var(--md-sys-color-outline-variant)] rounded mb-5 opacity-50" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-14 bg-[var(--md-sys-color-outline-variant)] rounded opacity-50" />
          ))}
        </div>
      </div>
    );
  }

  // Group fields by their group property
  const fieldsByGroup: Record<string, typeof template.fields> = {};
  template.fields.forEach((field) => {
    if (!fieldsByGroup[field.group]) {
      fieldsByGroup[field.group] = [];
    }
    fieldsByGroup[field.group].push(field);
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {groupOrder.map((groupKey) => {
        const fields = fieldsByGroup[groupKey];
        if (!fields || fields.length === 0) return null;
        const groupInfo = groupLabels[groupKey];

        return (
          <md-outlined-card key={groupKey} className="w-full">
            <div className="p-5 sm:p-6">
              <div className="mb-5">
                <h3 className="md-title-large text-primary mb-1">
                  {groupInfo.title}
                </h3>
                <p className="md-body-medium text-on-surface-variant">
                  {groupInfo.description}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fields.map((field) => {
                  const value = formData[field.name] || "";
                  const isTouched = touched[field.name];
                  const showError = field.required && isTouched && !value.trim();

                  return (
                  <div key={field.name} className="flex flex-col relative pt-1">
                    <MdTextField
                      id={`field-${field.name}`}
                      label={field.label + (field.required ? ' *' : '')}
                      type={field.type === "date" ? "date" : "text"}
                      placeholder={field.placeholder}
                      value={value}
                      onChange={(value) => handleChange(field.name, value)}
                      onBlur={() => handleBlur(field.name)}
                      error={showError}
                      errorText={showError ? "This field is required" : undefined}
                      className="w-full"
                    />
                    {field.persistent && (
                      <div className="absolute -top-1 right-2 z-10">
                         <span className="saved-badge" title="Remembered across sessions">
                          <md-icon style={{fontSize: '14px', width: '14px', height: '14px'}}>
                            <IconBookmark />
                          </md-icon>
                          saved
                        </span>
                      </div>
                    )}
                  </div>
                )})}
              </div>
            </div>
          </md-outlined-card>
        );
      })}

      {/* ─── Action Buttons ─── */}
      <div className="hidden sm:flex items-center gap-3 pt-4">
        <md-filled-button
          id="btn-generate-pdf"
          onClick={handleGeneratePDF}
        >
          <md-icon slot="icon"><IconDownload /></md-icon>
          Generate PDF
        </md-filled-button>
        <md-text-button
          id="btn-reset-form"
          onClick={handleReset}
        >
          <md-icon slot="icon"><IconRefresh /></md-icon>
          Reset
        </md-text-button>
      </div>

      {/* Mobile sticky CTA */}
      <div className="sm:hidden sticky-cta flex items-center gap-2">
        <md-filled-button
          id="btn-generate-pdf-mobile"
          onClick={handleGeneratePDF}
          style={{ flex: 1 }}
        >
          <md-icon slot="icon"><IconDownload /></md-icon>
          Generate PDF
        </md-filled-button>
        <md-text-button
          id="btn-reset-form-mobile"
          onClick={handleReset}
          aria-label="Reset form"
        >
          <md-icon slot="icon"><IconRefresh /></md-icon>
        </md-text-button>
      </div>
    </div>
  );
}
