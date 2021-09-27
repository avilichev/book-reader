import React from 'react';
import { ReaderProps } from 'shared/types';

export interface PdfReaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ReaderProps {}

const PdfReader = React.forwardRef<HTMLDivElement, PdfReaderProps>(
  function PdfReader(props, ref) {
    const { url, ...other } = props;
    return <div {...other} ref={ref} />;
  },
);

export default PdfReader;
