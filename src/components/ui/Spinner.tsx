import React from "react";

const Spinner: React.FC = () => (
  <svg
    version="1.1"
    id="L9"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 100 100"
    enableBackground="new 0 0 100 100"
    xmlSpace="preserve"
    width="50"
    height="50"
  >
    <circle
      fill="none"
      stroke="#000"
      strokeWidth="4"
      strokeLinecap="round"
      cx="50"
      cy="50"
      r="40"
      strokeDasharray="250"
      strokeDashoffset="0"
    >
      <animate
        attributeName="stroke-dashoffset"
        values="0;502"
        dur="1.5s"
        keyTimes="0;1"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

export default Spinner;
