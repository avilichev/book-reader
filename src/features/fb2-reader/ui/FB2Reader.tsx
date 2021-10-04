import React from 'react';
import { ReaderProps } from 'shared/types';
import { ArrowBack, ArrowForward } from 'shared/ui';
import { BookActionButton, BookContainer, BookPaper } from 'entities/books';
import { FB2 } from '../lib';

export interface FB2ReaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ReaderProps {}

const FB2Reader = React.forwardRef<HTMLDivElement, FB2ReaderProps>(
  function FB2Reader(props, ref) {
    const { url, ...other } = props;

    const containerRef = React.useRef<HTMLDivElement>(null);
    const fb2Ref = React.useRef<FB2>();

    React.useEffect(() => {
      if (containerRef.current) {
        fb2Ref.current = new FB2({
          container: containerRef.current,
          url,
        });
      }
    }, [url]);

    return (
      <BookContainer {...other} ref={ref}>
        <BookActionButton>
          <ArrowBack />
        </BookActionButton>
        <BookPaper ref={containerRef} />
        <BookActionButton>
          <ArrowForward />
        </BookActionButton>
      </BookContainer>
    );
  },
);

export default FB2Reader;
