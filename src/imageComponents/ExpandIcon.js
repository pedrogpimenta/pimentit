import React from "react";

function ExpandIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill={props.fill}
        d="M21 20.482V3.518A.516.516 0 0020.482 3h-8.133a.516.516 0 00-.518.518c0 .288.23.518.518.518h7.615v15.928H4.036v-7.66a.516.516 0 00-.518-.519.516.516 0 00-.518.518v8.179c0 .288.23.518.518.518h16.964c.288 0 .518-.23.518-.518z"
      ></path>
      <path
        fill={props.fill}
        d="M10.258 9.74V3.517A.516.516 0 009.739 3H3.52A.516.516 0 003 3.518V9.74c0 .288.23.519.518.519H9.74a.52.52 0 00.519-.519zM16.099 16.832h-2.744a.516.516 0 00-.518.518c0 .288.23.518.518.518h3.995c.288 0 .518-.23.518-.518v-3.995a.516.516 0 00-.518-.518.516.516 0 00-.518.518v2.744l-4.943-4.943a.521.521 0 00-.886.365c0 .13.05.264.153.364l4.943 4.947z"
      ></path>
    </svg>
  );
}

export default ExpandIcon;
