import React from 'react';
import { BookWrapper } from 'entities/books';
import { EpubReader } from 'features/epub-reader';
import { PdfReader } from 'features/pdf-reader';

export type MimeType = 'epub' | 'pdf';

const urlMap = {
  epub: '/books/33540550.epub',
  pdf: '/books/33540550.pdf',
};

const readerMap = {
  epub: EpubReader,
  pdf: PdfReader,
};

function BookReader() {
  const [mimeType, setMimeType] = React.useState<MimeType>('pdf');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMimeType(event.target.value as MimeType);
  };

  const url = urlMap[mimeType];
  const Reader = readerMap[mimeType];

  return (
    <BookWrapper>
      <select
        style={{
          position: 'absolute',
          zIndex: 10,
        }}
        onChange={handleChange}
        value={mimeType}
      >
        <option value="epub">epub</option>
        <option value="pdf">pdf</option>
      </select>
      <Reader url={url} />
    </BookWrapper>
  );
}

export default BookReader;
