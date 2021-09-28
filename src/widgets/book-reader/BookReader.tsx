import React from 'react';
import { BookWrapper } from 'entities/books';
import { EpubReader } from 'features/epub-reader';
import { PdfReader } from 'features/pdf-reader';

export type MimeType = 'epub' | 'pdf';

function BookReader() {
  const [mimeType, setMimeType] = React.useState<MimeType>('pdf');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMimeType(event.target.value as MimeType);
  };

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
      {mimeType === 'epub' && <EpubReader url="/books/33540550.epub" />}
      {mimeType === 'pdf' && <PdfReader url="/books/33540550.pdf" />}
    </BookWrapper>
  );
}

export default BookReader;
