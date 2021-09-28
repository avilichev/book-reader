import React from 'react';

export type ArrowForwardProps = React.SVGAttributes<SVGSVGElement>;

const ArrowForward = React.forwardRef<SVGSVGElement, ArrowForwardProps>(
  function ArrowForward(props, ref) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 24 24"
        viewBox="0 0 24 24"
        width="24px"
        height="24px"
        fill="currentColor"
        ref={ref}
      >
        <g>
          <path d="M0,0h24v24H0V0z" fill="none" />
        </g>
        <g>
          <polygon points="6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12" />
        </g>
      </svg>
    );
  },
);

export default ArrowForward;
