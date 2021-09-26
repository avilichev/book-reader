import React from 'react';
import styled from 'styled-components';
import { EpubReader } from 'features/epub-reader';
import { PdfReader } from 'features/pdf-reader';

function BookReader() {
  return (
    <BookReaderRoot>
      <EpubReader url="https://gerhardsletten.github.io/react-reader/files/alice.epub" />
      <PdfReader />
    </BookReaderRoot>
  );
}

const BookReaderRoot = styled.div``;

export default BookReader;
