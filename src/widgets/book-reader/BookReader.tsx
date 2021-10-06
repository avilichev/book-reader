import React from 'react';
import { BookWrapper } from 'entities/books';
import { FB2Reader } from 'features/fb2-reader';
import { EpubReader } from 'features/epub-reader';
import { PdfReader } from 'features/pdf-reader';

export type MimeType = 'epub' | 'fb2' | 'pdf';

export interface BookReaderProps {
  mime: MimeType;
  url: string;
}

const readerMap = {
  fb2: FB2Reader,
  epub: EpubReader,
  pdf: PdfReader,
};

function BookReader(props: BookReaderProps) {
  const { mime, url } = props;

  const Reader = readerMap[mime];

  return (
    <BookWrapper>
      <Reader url={url} />
    </BookWrapper>
  );
}

export default BookReader;
