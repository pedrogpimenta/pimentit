import React from 'react';

function SubredditError(props) {
  return(
    <div className={`
      flex
      flex-col
      items-center
      justify-center
      z-10
      w-full
      bg-white dark:bg-black
      text-black dark:text-white
      py-16
      px-2
    `}>
      <h2 className={`
        text-xl
        font-semibold
      `}>Oops!</h2>
      {props.error.length >= 0 &&
        <div>props.error</div>
      }
      <div>
        {props.message}
      </div>
    </div>
  )
}

export default SubredditError;
