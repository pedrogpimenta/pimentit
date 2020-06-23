import React from "react";

function RedditIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
      style={{position: 'relative', top: '-1px', verticalAlign: 'middle'}}
    >
      <path
        fill={props.fill}
        fillRule="evenodd"
        d="M8 16A8 8 0 108 0a8 8 0 000 16zm5.31-7.915c0-.649-.522-1.175-1.166-1.175-.317 0-.597.122-.803.329-.793-.573-1.894-.949-3.108-.996l.532-2.509 1.727.367a.834.834 0 00.83.798.835.835 0 000-1.672.807.807 0 00-.736.47l-1.933-.414a.231.231 0 00-.158.028.229.229 0 00-.094.132l-.588 2.8c-1.241.038-2.352.404-3.154.996a1.174 1.174 0 00-.803-.329c-.644 0-1.167.526-1.167 1.175 0 .479.28.883.69 1.07a2.213 2.213 0 00-.027.358c0 1.804 2.081 3.26 4.657 3.26s4.658-1.456 4.658-3.26c0-.122-.01-.235-.028-.348.383-.188.672-.601.672-1.08zm-7.98.836c0-.46.374-.836.831-.836a.835.835 0 010 1.672.835.835 0 01-.83-.836zm4.64 2.208c-.57.573-1.653.61-1.97.61-.317 0-1.41-.046-1.97-.61a.222.222 0 010-.31.219.219 0 01.309 0c.354.357 1.12.488 1.67.488.551 0 1.307-.131 1.671-.488a.219.219 0 01.308 0 .243.243 0 01-.019.31zm-.15-1.372a.835.835 0 01-.83-.836c0-.46.373-.836.83-.836a.835.835 0 010 1.672z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default RedditIcon;
