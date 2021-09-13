import React from 'react';
import { useHistory } from "react-router-dom";

function Header(props) {
  let history = useHistory();

  const handleMorePosts = direction => {
    if (direction === `next` || direction === `prev`) {
      let fetchCount = ``;
      let fetchDirection = ``;
      
      if (direction) {
        if (direction === `next`) {
          fetchDirection = direction ? `&after=${props.lastPostName}` : ``;
          fetchCount = `count=${parseInt(props.count) + 25}`;
        } else if (direction === `prev`) {
          fetchDirection = direction ? `&before=${props.firstPostName}` : ``;
          fetchCount = `count=${parseInt(props.count) - 24}`;
        }

      }

      history.push(`/r/${props.subreddit}/?${fetchCount}${fetchDirection}`);
    }
  };

  return(
    <div className={`
      flex
      py-4
      px-2
    `}
    style={{justifyContent: props.count >= 25 ? 'space-between' : 'flex-end'}}>
      {props.count >= 25 &&
        <button
          className={`
            px-4
            pt-1
            pb-2
            bg-primary
            text-white
            font-semibold
            rounded
          `}
          onClick={() => handleMorePosts(`prev`)}
        >
          &lt; previous
        </button>
      }
      <button
        className={`
          px-4
          pt-1
          pb-2
          bg-primary
          text-white
          font-semibold
          rounded
        `}
        onClick={() => handleMorePosts(`next`)}
      >
        next &gt;
      </button>
    </div>
  )
}

export default Header;
