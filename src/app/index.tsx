import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from 'shared/ui';
import { Pages } from 'pages';

export function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Layout.Content>
          <Pages />
        </Layout.Content>
      </Layout>
    </BrowserRouter>
  );
}
