import jsPDF from 'jspdf';

interface ExportOptions {
  element: HTMLElement;
  filename: string;
}

export async function exportToPdf({ element, filename }: ExportOptions): Promise<void> {
  // Wait for all fonts to be loaded
  await document.fonts.ready;

  // Wait for all images in the element to be fully loaded
  const images = Array.from(element.querySelectorAll('img'));
  await Promise.all(
    images.map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
    })
  );

  // We add a tiny delay to ensure DOM layout has fully updated
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Initialize jsPDF for A4 portrait
  // Dimensions in pt: A4 is roughly 595.28 x 841.89 pt
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: 'a4',
    hotfixes: ['px_scaling'],
  });

  // The component is 794px wide. A4 width is 595.28 pt (which jsPDF maps px to when using px).
  // html() will automatically handle it if we use the right width.
  // We use scale: 2 in html2canvas for better resolution.
  await pdf.html(element, {
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: false,
    },
    x: 0,
    y: 0,
    width: 595.28,
    windowWidth: 794,
  });

  pdf.save(filename);
}
