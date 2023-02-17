import React from "react";

function OldIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="16"
      fill="none"
      viewBox="0 0 26 16"
      style={{position: 'relative', top: '-1px', verticalAlign: 'middle'}}
    >
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58173 0 0 3.58173 0 8C0 12.0258 2.97363 15.3571 6.84427 15.9171C6.69675 14.6634 7.46999 13.6615 8.27256 12.733C8.34199 12.6497 8.43172 12.6197 8.52052 12.6267C8.67193 12.4504 8.86045 12.2991 9.06356 12.182C8.36301 11.4985 7.86462 10.6161 7.72686 9.67247C7.60496 9.69772 7.47504 9.66364 7.38643 9.57532C6.86621 9.48679 6.43832 8.9274 6.51937 8.40047C6.62049 7.77663 7.37907 7.42267 7.8511 7.89468C7.86895 7.91389 7.88377 7.93466 7.89578 7.95654C7.90316 7.93593 7.91074 7.91531 7.91853 7.89471C8.56676 6.17549 10.1692 5.32797 11.8592 4.98781C10.6975 4.16017 11.3985 2.08856 12.6726 1.57286C13.2387 1.34639 13.7944 1.55605 14.2129 1.96571C14.4228 1.67517 14.6349 1.38881 14.8638 1.11378C14.8518 1.05583 14.8511 0.989975 14.864 0.91539C14.9146 0.595078 15.2519 0.409622 15.5553 0.54451C15.9531 0.728897 15.96 1.12553 15.7655 1.39684C15.7525 1.41754 15.7374 1.43643 15.7201 1.45381C15.6334 1.55157 15.5184 1.62666 15.3862 1.65919C15.1448 1.96101 14.8971 2.25658 14.6478 2.55054C14.9379 3.09245 15.0332 3.74141 14.8011 4.24997C14.9954 4.27361 15.1965 4.31705 15.3866 4.37132C15.9094 4.50623 16.3982 4.77599 16.8196 5.11311C17.5912 5.7245 18.0987 6.57477 18.3314 7.52274C18.8645 7.40092 19.3843 7.87958 19.3988 8.43408C19.4157 8.78813 19.247 9.15903 18.9942 9.41185C18.8361 9.58052 18.6187 9.69641 18.4079 9.68542C18.2058 11.0201 17.5642 12.3384 16.4963 13.0992C16.9173 13.2928 17.3068 13.7249 17.5614 14.0142C18.03 14.5497 18.482 15.2513 18.4555 15.9872C22.6619 15.7511 26 12.2654 26 8C26 3.58173 22.4183 0 18 0H8ZM8 16C7.91398 16 7.82828 15.9986 7.74291 15.9959C7.76582 15.8566 7.81309 15.7277 7.88474 15.5988C7.99371 15.3717 7.88738 15.1789 7.72129 15.1074C7.80779 14.6893 8.00644 14.2995 8.24584 13.9319C8.6296 14.9417 10.2334 14.9573 11.0879 14.8066C11.4251 14.756 11.7454 14.6717 12.0657 14.5537C12.0962 14.5432 12.1253 14.533 12.153 14.5232L12.2195 14.4995C12.5826 14.3696 12.7098 14.3241 13.1278 14.5032C13.1898 14.5295 13.2505 14.5564 13.3103 14.5834C13.3636 14.6076 13.4162 14.6318 13.4683 14.6559C13.8833 14.8472 14.2707 15.0257 14.763 15.0257C15.4676 15.0127 16.1721 14.6058 16.4156 13.9692C16.6372 14.1949 16.8701 14.5108 16.9906 14.674L16.9908 14.6742L16.9909 14.6745L16.9921 14.6762C17.0019 14.6894 17.011 14.7017 17.0191 14.7127C17.0264 14.7224 17.0329 14.7313 17.0388 14.7391C17.259 15.0573 17.3905 15.3843 17.5105 15.7267C17.4859 15.8147 17.4921 15.9128 17.5382 16H8ZM13.7516 13.887C14.4169 13.877 15.0714 13.7664 15.6709 13.5362C15.3876 14.294 14.4855 14.2472 13.8022 13.9131C13.7851 13.9045 13.7682 13.8958 13.7516 13.887ZM10.1439 12.9859C10.6604 13.2723 11.242 13.5012 11.8517 13.6568C11.8106 13.6714 11.7695 13.6863 11.7285 13.7012L11.7231 13.7031L11.7179 13.705C11.4097 13.8165 11.1001 13.9286 10.7677 13.9637C10.3631 13.9974 9.94167 13.9974 9.53713 13.8793C8.75286 13.6426 9.15061 12.9642 9.67001 12.6879C9.8225 12.7962 9.98083 12.8958 10.1439 12.9859ZM18.4753 8.61443C18.5089 8.5634 18.5555 8.48193 18.5393 8.40048C18.5226 8.35063 18.4898 8.31728 18.4566 8.28409C18.4661 8.39304 18.4723 8.50327 18.4753 8.61443ZM7.75837 8.44888C7.73977 8.54063 7.72499 8.63239 7.71391 8.72397L7.67986 8.71915C7.54239 8.70009 7.35847 8.67461 7.34547 8.51831C7.32866 8.40025 7.42979 8.41718 7.51411 8.45093C7.60519 8.49414 7.68945 8.48686 7.75837 8.44888ZM12.858 4.84338C12.8222 4.84666 12.7865 4.85014 12.7507 4.85381C12.751 4.74388 12.7026 4.63649 12.5883 4.57365C11.7959 4.11845 12.3017 3.12386 12.8074 2.66866C13.2289 2.28094 13.5998 2.70239 13.819 3.0901C14.0379 3.49414 14.0045 3.81401 13.7862 4.20108C13.5832 4.05853 13.237 4.12125 13.1445 4.42191C13.1129 4.52148 13.1016 4.60916 13.1069 4.68636C13.0696 4.8495 13.1979 5.01004 13.3567 5.06729C13.5816 5.20198 13.9148 5.23906 14.1729 5.24799C15.1159 5.2915 15.9717 5.69725 16.568 6.41136L16.5602 6.418C16.5561 6.42157 16.5521 6.42523 16.5481 6.42897C15.4249 7.12646 14.0858 6.37422 13.4801 5.37045C13.4663 5.20364 13.3281 5.05609 13.163 5.04124C13.1141 4.9222 13.0091 4.83028 12.858 4.84338ZM14.7798 12.5982C16.995 12.076 17.9331 9.13284 17.036 7.15639C16.5651 7.65305 15.3983 7.66716 14.8642 7.54068C14.0295 7.34595 13.3556 6.80685 13.0033 6.06552C12.5625 6.51494 12.0533 6.8792 11.4757 7.13589C10.9193 7.38872 10.0259 7.75961 9.41897 7.55734C9.33748 7.52774 9.269 7.48183 9.21641 7.4225L9.21467 7.42152C8.62897 8.30617 8.52783 9.37462 9.04797 10.3728C10.0595 12.2948 12.7568 13.0702 14.7798 12.5982ZM12.3746 5.59564C11.4837 5.77029 10.6015 6.07741 9.89939 6.6609C9.9325 6.66127 9.969 6.66228 10.0089 6.664C10.1102 6.65277 10.2115 6.62651 10.3128 6.60025C10.3632 6.58717 10.4136 6.5741 10.4641 6.56288C10.7676 6.47856 11.0542 6.36063 11.3407 6.22574C11.7167 6.05385 12.0584 5.84091 12.3746 5.59564ZM11.8128 8.97363C11.6611 9.07477 11.4924 9.04102 11.3407 8.97363C11.189 8.90623 11.1384 8.70396 11.172 8.56909C11.1987 8.44911 11.3097 8.33966 11.4301 8.30745C11.5309 8.18712 11.7143 8.15631 11.8464 8.21501C12.015 8.28242 12.1162 8.46785 12.0656 8.65329C12.032 8.78819 11.9308 8.90625 11.8128 8.97363ZM14.4932 9.24336C15.0327 9.24336 15.0327 8.40045 14.4932 8.40045C13.9369 8.38364 13.9369 9.24336 14.4932 9.24336ZM14.8809 10.7943C14.9821 11.9912 13.1615 12.0081 12.4702 11.5529C12.1499 11.3338 12.3521 10.7437 12.7567 10.9124C13.077 11.0303 13.9874 11.1147 14.1391 10.6932C14.274 10.2718 14.8472 10.3729 14.8809 10.7943Z" fill={props.fill}/>
    </svg>
  );
}

export default OldIcon;
