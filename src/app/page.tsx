"use client";

import React, { useState } from "react";
import { templates, type Template } from "@/lib/templates";
import TemplateSelector from "@/components/TemplateSelector";
import CoverPageForm from "@/components/CoverPageForm";
import ThemeToggle from "@/components/ThemeToggle";

// Web component imports for the main page
import '@material/web/icon/icon.js';

export default function HomePage() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(
    templates[0]
  );

  return (
    <main className="min-h-screen px-4 py-8 sm:py-12 md:py-16 mobile-bottom-pad bg-[var(--md-sys-color-background)]">
      <div className="max-w-2xl mx-auto">
        {/* ─── Top Controls ─── */}
        <div className="flex justify-end mb-4 animate-fade-in">
          <ThemeToggle />
        </div>

        {/* ─── University Header ─── */}
        <header className="mb-10 animate-fade-in flex flex-col items-center text-center">
          <img 
            src="https://nubtkhulna.ac.bd/assets/images/logo.png" 
            alt="NUBT Logo" 
            className="h-20 sm:h-28 object-contain mb-6 drop-shadow-sm w-full max-w-md" 
          />
          <p className="md-title-medium text-primary mb-6 font-medium">
            Department of Computer Science and Engineering
          </p>

          <div className="max-w-xl bg-[var(--md-sys-color-surface-container)] border border-[var(--md-sys-color-outline-variant)] rounded-2xl p-4 sm:p-5 w-full shadow-sm">
            <h2 className="md-title-medium text-on-surface mb-1">Cover Page Generator</h2>
            <p className="md-body-medium text-on-surface-variant">
              Fill in your details, pick a template, and download a professional PDF instantly.
            </p>
          </div>
        </header>

        {/* ─── Template Selector ─── */}
        <section className="mb-6 sm:mb-8 animate-fade-in animate-delay-100">
          <TemplateSelector
            selectedId={selectedTemplate.id}
            onSelect={setSelectedTemplate}
          />
        </section>

        {/* ─── Dynamic Form ─── */}
        <section className="animate-fade-in animate-delay-200">
          <CoverPageForm
            key={selectedTemplate.id}
            template={selectedTemplate}
          />
        </section>

        {/* ─── Footer ─── */}
        <footer className="text-center mt-12 pb-6 animate-fade-in animate-delay-300">
          <p className="md-body-medium text-outline">
            Your data stays in your browser. Nothing is sent to any server.
          </p>
        </footer>
      </div>
    </main>
  );
}
