import React from 'react';
import { useHistory } from "react-router-dom";
import RedditLogo from './imageComponents/RedditLogo';
import MenuIcon from './imageComponents/MenuIcon';
import CreatableSelect from 'react-select/creatable';

const options = [
  { value: 'all', label: 'r/all' },
  { value: 'popular', label: 'r/popular' },
  { value: 'portugal', label: 'r/portugal' }
]

function Header(props) {
  let history = useHistory();
  

  return(
    <div className={`
      fixed
      flex
      items-center
      z-30
      w-full
      bg-white
      shadow
      h-10
      p-2
      font-semibold
    `}>
      <div className={`
        w-6
        h-6
      `}>
        <RedditLogo />
      </div>
      <div
        className={`
          mx-2
          flex-1
        `}
      >
        <CreatableSelect
          options={options}
          // defaultValue={{value: props.subreddit, label: props.subreddit}}
          value={{value: props.subreddit, label: `r/${props.subreddit}`}}
          onChange={(selectedOption) => {history.push(`/r/${selectedOption.value}`)}}
        />
      </div>
      <div className={`
        w-6
        h-6
      `}>
        <MenuIcon />
      </div>
    </div>
  )
}

export default Header;
