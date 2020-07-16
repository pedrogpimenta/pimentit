import React from "react";

function PointsIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      style={{position: 'relative', top: '-1px', verticalAlign: 'middle'}}
    >
      <path
        fill={props.fill}
        d="M21.148 9.943l-7.09-7.09a2.91 2.91 0 00-4.116 0l-7.089 7.09a2.908 2.908 0 000 4.115 2.907 2.907 0 004.114 0l2.85-2.848v8.449a2.182 2.182 0 104.367 0v-8.448l2.848 2.847a2.901 2.901 0 004.115 0 2.91 2.91 0 00.001-4.115z"
      ></path>
    </svg>
  );
}

export default PointsIcon;
