import React from "react";

function CommentsIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      style={{position: 'relative', top: '-1px', verticalAlign: 'middle'}}
    >
      <path
        fill={props.fill}
        d="M10.298 18.138l-3.48 3.48a.373.373 0 01-.64-.265v-3.607A7.563 7.563 0 011 10.57 7.568 7.568 0 018.569 3h6.862a7.568 7.568 0 110 15.138h-5.133z"
      ></path>
    </svg>
  );
}

export default CommentsIcon;
