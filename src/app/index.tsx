import React from 'react';
import { Layout } from 'shared/ui';
import { BookReader } from 'widgets/book-reader';

export default function App() {
  return (
    <Layout>
      <Layout.Content>
        <BookReader />
      </Layout.Content>
    </Layout>
  );
}
