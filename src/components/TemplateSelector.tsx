"use client";

import React, { useEffect } from "react";
import { templates, type Template } from "@/lib/templates";
import { cn } from "@/lib/utils";
import { IconDescription, IconScience } from "@/components/ui/icons";

// Web component imports
import '@material/web/icon/icon.js';
import '@material/web/labs/card/outlined-card.js';
import '@material/web/labs/card/elevated-card.js';

interface TemplateSelectorProps {
  selectedId: string;
  onSelect: (template: Template) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  assignment: <IconDescription />,
  "lab-report": <IconScience />,
};

export default function TemplateSelector({
  selectedId,
  onSelect,
}: TemplateSelectorProps) {
  // Suppress hydration warnings for Web Components
  const [mounted, setMounted] = React.useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-24"></div>;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {templates.map((template) => {
          const isActive = selectedId === template.id;
          
          return (
            <md-outlined-card
              key={template.id}
              id={`template-${template.id}`}
              onClick={() => onSelect(template)}
              className={cn(
                "template-card",
                isActive && "active"
              )}
            >
              <div className="p-4 sm:p-5 flex items-start gap-4 h-full w-full">
                <div
                  className={cn(
                    "flex-shrink-0 flex items-center justify-center rounded-full p-2",
                    isActive
                      ? "text-primary bg-[var(--md-sys-color-primary-container)]"
                      : "text-on-surface-variant bg-[var(--md-sys-color-surface-container-high)]"
                  )}
                >
                  <md-icon>{iconMap[template.id] || <IconDescription />}</md-icon>
                </div>
                <div className="min-w-0 flex-1">
                  <h2
                    className={cn(
                      "md-title-large mb-1",
                      isActive
                        ? "text-primary"
                        : "text-on-surface"
                    )}
                  >
                    {template.name}
                  </h2>
                  <p className="md-body-medium text-on-surface-variant">
                    {template.description}
                  </p>
                </div>
              </div>
            </md-outlined-card>
          );
        })}
      </div>
    </div>
  );
}
