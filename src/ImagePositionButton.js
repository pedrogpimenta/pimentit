import React from 'react';

function ImagePositionButton(props) {
  return(
    <div
      style={{
        rounded: 'yes'
      }}
      className={`
        bg-red
        border-2
        border-solid
        border-black
        dark:border-white
        rounded-full
        w-6
        h-4
      `}
      onClick={() => props.onClick()}
    >
      <div
        style={{
          top: '2px',
          left: props.imageOnLeft ? '2px' : '10px',
          height: '8px',
          width: '8px',
          transition: 'left 100ms ease-out',
        }}
        className={`
          relative
          w-4
          h-4
          rounded-full
          bg-black
          dark:bg-white
        `}
      ></div>
    </div>
  )
}

export default ImagePositionButton;
