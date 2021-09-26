import React from 'react';
import styled from 'styled-components';
import Epub, { Book, Rendition } from 'epubjs';

export interface EpubReaderProps {
  url: string;
}

function EpubReader(props: EpubReaderProps) {
  const { url } = props;

  const bookRef = React.useRef<Book>();
  const renditionRef = React.useRef<Rendition>();
  const rootRef = React.useRef<HTMLDivElement>(null);

  const initBook = React.useCallback(() => {
    bookRef.current = Epub(url);
  }, [url]);

  const initRender = React.useCallback(() => {
    if (bookRef.current) {
      renditionRef.current = bookRef.current.renderTo(rootRef.current as any, {
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

  return <EpubReaderRoot ref={rootRef} />;
}

const EpubReaderRoot = styled.div`
  width: 720px;
  height: 1024px;
  border: 1px solid #999999;
  margin: 50px auto;
`;

export default EpubReader;
