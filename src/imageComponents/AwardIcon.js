import React from "react";

function AwardIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
      style={{position: 'relative', top: '-1px', verticalAlign: 'middle'}}
    >
      <path d="M14.0671 3.5H12.6676V3C12.6676 2.73478 12.5693 2.48043 12.3944 2.29289C12.2194 2.10536 11.9821 2 11.7347 2H4.27114C4.0237 2 3.78641 2.10536 3.61145 2.29289C3.43648 2.48043 3.33819 2.73478 3.33819 3V3.5H1.93294C1.68551 3.5 1.44821 3.60536 1.27325 3.79289C1.09829 3.98043 1 4.23478 1 4.5V5.5C1 6.16304 1.24573 6.79893 1.68313 7.26777C2.12054 7.73661 2.71378 8 3.33236 8H3.5656C4.1312 9.86875 5.67638 11.2688 7.53644 11.475V13H6.13703C6.01331 13 5.89466 13.0527 5.80718 13.1464C5.7197 13.2402 5.67055 13.3674 5.67055 13.5C5.67055 13.6326 5.7197 13.7598 5.80718 13.8536C5.89466 13.9473 6.01331 14 6.13703 14H9.8688C9.99252 14 10.1112 13.9473 10.1987 13.8536C10.2861 13.7598 10.3353 13.6326 10.3353 13.5C10.3353 13.3674 10.2861 13.2402 10.1987 13.1464C10.1112 13.0527 9.99252 13 9.8688 13H8.46939V11.475C9.37833 11.3793 10.2408 10.9987 10.9491 10.3807C11.6574 9.76264 12.1801 8.9346 12.4519 8H12.6676C13.2862 8 13.8795 7.73661 14.3169 7.26777C14.7543 6.79893 15 6.16304 15 5.5V4.5C15 4.23478 14.9017 3.98043 14.7267 3.79289C14.5518 3.60536 14.3145 3.5 14.0671 3.5ZM3.33236 7C2.96121 7 2.60527 6.84196 2.34282 6.56066C2.08038 6.27936 1.93294 5.89782 1.93294 5.5V4.5H3.33819V6.44375C3.33903 6.62958 3.34876 6.81524 3.36735 7H3.33236ZM14.0671 5.5C14.0655 5.89732 13.9176 6.27789 13.6555 6.55884C13.3934 6.83979 13.0383 6.99835 12.6676 7H12.6443C12.6609 6.83394 12.6687 6.66701 12.6676 6.5V4.5H14.0671V5.5Z" fill={props.fill}/>
    </svg>
  );
}

export default AwardIcon;