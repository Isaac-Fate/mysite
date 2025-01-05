import { useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";

interface PDFViewerProps {
  url: string;
  className?: string;
}

export function PDFViewer({ url, className }: PDFViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1.5);

  // Load PDF document
  useEffect(() => {
    const loadPdf = async () => {
      try {
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist/build/pdf.worker.min.js`;

        const loadingTask = pdfjsLib.getDocument(url);
        const pdf = await loadingTask.promise;
        setPdfDoc(pdf);
        setNumPages(pdf.numPages);
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    loadPdf();
  }, [url]);

  // Render current page
  useEffect(() => {
    const renderPage = async () => {
      if (!pdfDoc || !canvasRef.current) return;

      try {
        const page = await pdfDoc.getPage(currentPage);
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        if (!context) return;

        const viewport = page.getViewport({ scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;
      } catch (error) {
        console.error("Error rendering page:", error);
      }
    };

    renderPage();
  }, [pdfDoc, currentPage, scale]);

  const nextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const zoomIn = () => {
    setScale(scale + 0.2);
  };

  const zoomOut = () => {
    if (scale > 0.4) {
      setScale(scale - 0.2);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Controls */}
      <div className="flex flex-row items-center gap-4">
        <button onClick={prevPage} disabled={currentPage <= 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {numPages}
        </span>
        <button onClick={nextPage} disabled={currentPage >= numPages}>
          Next
        </button>
        <button onClick={zoomIn}>+</button>
        <button onClick={zoomOut}>-</button>
      </div>

      {/* PDF Canvas */}
      <div className="overflow-auto border-2">
        <canvas ref={canvasRef} className={className} />
      </div>
    </div>
  );
}
