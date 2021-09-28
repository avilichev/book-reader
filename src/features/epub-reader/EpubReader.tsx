import React from 'react';
import Epub, { Book, Rendition } from 'epubjs';
import { ReaderProps } from 'shared/types';
import { ArrowBack, ArrowForward } from 'shared/ui';
import { BookActionButton, BookContainer, BookPaper } from 'entities/books';

export interface EpubReaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ReaderProps {}

const EpubReader = React.forwardRef<HTMLDivElement, EpubReaderProps>(
  function EpubReader(props, ref) {
    const { url, ...other } = props;

    const bookRef = React.useRef<Book>();
    const renditionRef = React.useRef<Rendition>();
    const containerRef = React.useRef<HTMLDivElement>(null);

    const initBook = React.useCallback(() => {
      bookRef.current = Epub(url);
    }, [url]);

    const initRender = React.useCallback(() => {
      if (renditionRef.current) {
        renditionRef.current.destroy();
      }

      if (bookRef.current && containerRef.current) {
        renditionRef.current = bookRef.current.renderTo(containerRef.current, {
          width: '100%',
          height: '100%',
        });
        renditionRef.current.display();
      }
    }, []);

    React.useEffect(() => {
      initBook();
      initRender();
    }, [initBook, initRender]);

    const handlePrev = () => {
      if (renditionRef.current) {
        renditionRef.current.prev();
      }
    };

    const handleNext = () => {
      if (renditionRef.current) {
        renditionRef.current.next();
      }
    };

    return (
      <BookContainer {...other} ref={ref}>
        <BookActionButton onClick={handlePrev}>
          <ArrowBack />
        </BookActionButton>
        <BookPaper ref={containerRef} />
        <BookActionButton onClick={handleNext}>
          <ArrowForward />
        </BookActionButton>
      </BookContainer>
    );
  },
);

export default EpubReader;
