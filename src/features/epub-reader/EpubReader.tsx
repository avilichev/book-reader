import React from 'react';
import styled from 'styled-components';
import Epub, { Book, Rendition } from 'epubjs';
import { ReaderProps } from 'shared/types';

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
      <EpubReaderRoot {...other} ref={ref}>
        <EpubReaderActionBar>
          <button onClick={handlePrev}>Prev</button>
          <button onClick={handleNext} style={{ marginLeft: 10 }}>
            Next
          </button>
        </EpubReaderActionBar>
        <EpubReaderContainer ref={containerRef} />
      </EpubReaderRoot>
    );
  },
);

const EpubReaderRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 720px;
  margin: 50px auto;
`;

const EpubReaderActionBar = styled.div`
  display: flex;
`;

const EpubReaderContainer = styled.div`
  flex: 0 0 auto;
  width: 100%;
  height: 1024px;
  border: 1px solid #999999;
`;

export default EpubReader;
