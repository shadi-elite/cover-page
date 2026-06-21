"use client";

import React, { useState } from "react";
import { templates, type Template } from "@/lib/templates";
import TemplateSelector from "@/components/TemplateSelector";
import CoverPageForm from "@/components/CoverPageForm";

export default function HomePage() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(
    templates[0]
  );

  return (
    <main className="min-h-screen px-4 py-8 sm:py-12 md:py-16 mobile-bottom-pad">
      <div className="max-w-2xl mx-auto">
        {/* ─── Title ─── */}
        <header className="mb-8 sm:mb-10 animate-fade-in text-center sm:text-left">
          <h1 className="md-typescale-headline-large text-primary mb-2">
            Cover Page Generator
          </h1>
          <p className="md-typescale-body-large text-on-surface-variant max-w-xl">
            Fill in your details, pick a template, and download a professional PDF instantly.
          </p>
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
          <p className="md-typescale-body-medium text-outline">
            Your data stays in your browser. Nothing is sent to any server.
          </p>
        </footer>
      </div>
    </main>
  );
}
