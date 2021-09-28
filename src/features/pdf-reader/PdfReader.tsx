import React from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist/types/display/api';
import { PageViewport } from 'pdfjs-dist/types/display/display_utils';
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
    const templeViewRef = React.useRef<PageViewport>();
    const viewportRef = React.useRef<PageViewport>();
    const renderingRef = React.useRef(false);
    const pageRef = React.useRef<PDFPageProxy>();

    const resizePage = () => {
      if (!renderingRef.current && pageRef.current && templeViewRef.current) {
        const scale = Math.min(
          (paperRef?.current?.clientHeight || window.innerHeight) /
            templeViewRef.current.height,
          (paperRef?.current?.clientWidth || window.innerWidth) /
            templeViewRef.current.width,
        );

        viewportRef.current = pageRef.current.getViewport({ scale });

        if (canvasRef.current) {
          const canvasContext = canvasRef.current.getContext('2d');
          canvasRef.current.height = viewportRef.current.height;
          canvasRef.current.width = viewportRef.current.width;

          renderingRef.current = true;
          pageRef.current
            .render({
              canvasContext: canvasContext as CanvasRenderingContext2D,
              viewport: viewportRef.current,
            })
            .promise.finally(() => {
              renderingRef.current = false;
            });
        }
      }
    };

    const handleWindowResize = () => {
      resizePage();
    };

    const renderPage = React.useCallback(async () => {
      if (pdfRef.current) {
        pageRef.current = await pdfRef.current.getPage(currentPage);
        templeViewRef.current = pageRef.current.getViewport({
          scale: DEFAULT_SCALE,
        });
        resizePage();
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
      window.addEventListener('resize', handleWindowResize);
      return () => {
        window.removeEventListener('resize', handleWindowResize);
      };
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
