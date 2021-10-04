import React from 'react';
import { BookWrapper } from 'entities/books';
import { FB2Reader } from 'features/fb2-reader';
import { EpubReader } from 'features/epub-reader';
import { PdfReader } from 'features/pdf-reader';

export type MimeType = 'epub' | 'fb2' | 'pdf';

const urlMap = {
  fb2: '/books/244206.fb2',
  epub: '/books/33540550.epub',
  pdf: '/books/33540550.pdf',
};

const readerMap = {
  fb2: FB2Reader,
  epub: EpubReader,
  pdf: PdfReader,
};

function BookReader() {
  const [mimeType, setMimeType] = React.useState<MimeType>('fb2');

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
        <option value="fb2">fb2</option>
        <option value="pdf">pdf</option>
      </select>
      <Reader url={url} />
    </BookWrapper>
  );
}

export default BookReader;
