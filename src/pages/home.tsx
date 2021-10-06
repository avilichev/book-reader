import React from 'react';
import { BookReader } from 'widgets/book-reader';

export default function HomePage() {
  return <BookReader mime="fb2" url="/books/244206.fb2" />;
}
