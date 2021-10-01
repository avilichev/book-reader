import React from 'react';
import { ReaderProps } from 'shared/types';
import { ArrowBack, ArrowForward } from 'shared/ui';
import { BookActionButton, BookContainer, BookPaper } from 'entities/books';
import { PDFDocument } from '../lib';

export interface PdfReaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ReaderProps {}

const PdfReader = React.forwardRef<HTMLDivElement, PdfReaderProps>(
  function PdfReader(props, ref) {
    const { url, ...other } = props;
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const pdfDocumentRef = React.useRef<PDFDocument>();

    React.useEffect(() => {
      if (canvasRef.current) {
        pdfDocumentRef.current = new PDFDocument({
          canvas: canvasRef.current,
          url,
        });
        return () => {
          pdfDocumentRef.current?.destroy();
        };
      }
    }, []);

    const handlePrev = () => {
      pdfDocumentRef.current?.prev();
    };

    const handleNext = () => {
      pdfDocumentRef.current?.next();
    };

    return (
      <BookContainer {...other} ref={ref}>
        <BookActionButton onClick={handlePrev}>
          <ArrowBack />
        </BookActionButton>
        <BookPaper>
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
