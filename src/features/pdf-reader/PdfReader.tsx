import React from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { PDFDocumentProxy } from 'pdfjs-dist/types/display/api';
import { ReaderProps } from 'shared/types';
import { ArrowBack, ArrowForward } from 'shared/ui';
import { BookActionButton, BookContainer, BookPaper } from 'entities/books';

GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.js';

// the default params
const DEFAULT_SCALE = 1;

export interface PdfReaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ReaderProps {}

const PdfReader = React.forwardRef<HTMLDivElement, PdfReaderProps>(
  function PdfReader(props, ref) {
    const { url, ...other } = props;

    const [currentPage, setCurrentPage] = React.useState(1);
    const paperRef = React.useRef<HTMLDivElement>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const pdfRef = React.useRef<PDFDocumentProxy>();

    const renderPage = React.useCallback(() => {
      if (pdfRef.current) {
        pdfRef.current.getPage(currentPage).then((page) => {
          const templeView = page.getViewport({ scale: DEFAULT_SCALE });

          const width = paperRef?.current?.clientWidth || window.innerWidth;
          const height = paperRef?.current?.clientHeight || window.innerHeight;

          const scale = Math.min(
            height / templeView.height,
            width / templeView.width,
          );
          const viewport = page.getViewport({ scale });

          if (canvasRef.current) {
            const canvasContext = canvasRef.current.getContext('2d');
            canvasRef.current.height = viewport.height;
            canvasRef.current.width = viewport.width;

            const renderContext = {
              canvasContext,
              viewport,
            };
            page.render(renderContext as any);
          }
        });
      }
    }, [currentPage]);

    const initReader = React.useCallback(async () => {
      try {
        const loadingTask = getDocument(url);
        pdfRef.current = await loadingTask.promise;
        renderPage();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    }, [url, renderPage]);

    React.useEffect(() => {
      initReader();
    }, []);

    React.useEffect(() => {
      renderPage();
    }, [renderPage]);

    const handlePrev = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    const handleNext = () => {
      if (pdfRef.current && currentPage < pdfRef.current.numPages) {
        setCurrentPage(currentPage + 1);
      }
    };

    return (
      <BookContainer {...other} ref={ref}>
        <BookActionButton onClick={handlePrev}>
          <ArrowBack />
        </BookActionButton>
        <BookPaper ref={paperRef}>
          <canvas ref={canvasRef} />
        </BookPaper>
        <BookActionButton onClick={handleNext}>
          <ArrowForward />
        </BookActionButton>
      </BookContainer>
    );
  },
);

export default PdfReader;
