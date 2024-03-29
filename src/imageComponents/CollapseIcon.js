import React from "react";

function CollapseIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={props.className}
    >
      <path
        fillRule="evenodd"
        d="M9.258 9.258V4H4v5.258h5.258zm1 .481V3.52A.516.516 0 009.739 3H3.52A.516.516 0 003 3.518V9.74c0 .288.23.519.518.519H9.74a.52.52 0 00.519-.519zM21 20.482V3.518A.516.516 0 0020.482 3H12c-.328 0-.59.23-.59.518V11.5H3.59c-.328 0-.59.23-.59.518v8.463c0 .289.23.519.518.519h16.964c.288 0 .518-.23.518-.518zm-7.229-7.443h2.745c.288 0 .518-.23.518-.518a.516.516 0 00-.518-.518H12.52a.516.516 0 00-.518.518v3.995c0 .288.23.519.518.519.288 0 .518-.23.518-.518v-2.745l4.944 4.944a.521.521 0 00.887-.365c0-.13-.05-.265-.154-.365L13.77 13.04z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default CollapseIcon;
