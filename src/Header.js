import React from 'react';
import { useHistory } from "react-router-dom";
import PimentitLogo from './imageComponents/PimentitLogo';
import ExpandIcon from './imageComponents/ExpandIcon';
import CollapseIcon from './imageComponents/CollapseIcon';
import MoonIcon from './imageComponents/MoonIcon';
import SunIcon from './imageComponents/SunIcon';
import CreatableSelect from 'react-select/creatable';
import ImagePositionButton from './ImagePositionButton';


function Header(props) {

  const browserOptions = localStorage.getItem('pimentitUserSubreddits') && JSON.parse(localStorage.getItem('pimentitUserSubreddits'))
  const parsedBrowserOptions = browserOptions || []
  
  const options = parsedBrowserOptions.length ? parsedBrowserOptions : []

  localStorage.setItem('pimentitUserSubreddits', JSON.stringify(options))

  const optionsWithDefaults = options
  optionsWithDefaults.unshift({label: 'all', value: 'all'})
  optionsWithDefaults.unshift({label: 'frontpage', value: ''})

  let history = useHistory();
  
  const handleLogoClick = () => {
    history.push(`/`)
  };

  const handleOnChange = (selectedOption) => {
    if (selectedOption.label === 'frontpage') {
      history.push(`/`)
    } else {
      history.push(`/r/${selectedOption.value}`)
    }
  };

  return(
    <div className={`
      fixed
      flex
      items-center
      z-30
      w-full
      bottom-0
      bg-white
      dark:bg-black
      border-t-2
      border-solid
      border-gray-400
      dark:border-gray-700
      h-10
      p-2
      font-semibold
    `}>
      <div
        className={`
          w-6
          h-6
        `}
        onClick={() => handleLogoClick()}
      >
        <PimentitLogo />
      </div>
      <div
        className={`
          mx-2
          flex-1
        `}
      >
        <CreatableSelect
          formatCreateLabel={(inputValue => 'Open r/' + inputValue)}
          options={optionsWithDefaults}
          menuPlacement="top"
          styles={{
            control: base => ({
              ...base,
              height: '30px',
              minHeight: '30px',
              overflow: 'hidden',
              background: props.darkMode && 'black',
              border: props.darkMode && '1px solid white',
            }),
            valueContainer: base => ({
              ...base,
              height: '30px',
              position: 'relative',
              top: '-3px',
              color: 'red',
            }),
            singleValue: base => ({
              ...base,
              color: props.darkMode && 'white',
            }),
            input: base => ({
              ...base,
              height: '30px',
              position: 'relative',
              top: '-3px',
              color: props.darkMode && 'white',
            }),
            indicatorsContainer: base => ({
              ...base,
              height: '28px',
              color: 'blue',
            }),
            dropdownIndicator: base => ({
              ...base,
              padding: '6px 8px',
            }),
          }}
          // defaultValue={{value: props.subreddit, label: props.subreddit}}
          // inputValue={props.subreddit}
          value={props.subredditType === 'frontpage' ? {value: 'frontpage', label: 'frontpage'} : {value: props.subreddit, label: `${props.subreddit}`}}
          onChange={(selectedOption) => {handleOnChange(selectedOption)}}
        />
      </div>
      <div
        className={`
          w-6
          h-6
          mr-2
        `}
        onClick={() => props.handleDarkModeButton()}
      >
        {props.darkMode &&
          <SunIcon
            className={`text-black dark:text-white stroke-current`}
          />
        }
        {!props.darkMode &&
          <MoonIcon
            className={`text-black dark:text-white stroke-current`}
          />
        }
      </div>
      {props.at === 'RedditContent' &&
        <div
          className={`
            w-6
            h-6
            mr-2
          `}
          onClick={() => props.handleShowAllPostsContent()}
        >
          {props.showAllPostsContent &&
            <CollapseIcon
              className={`text-black dark:text-white fill-current`}
            />
          }
          {!props.showAllPostsContent &&
            <ExpandIcon
              className={`text-black dark:text-white fill-current`}
            />
          }
        </div>
      }
      <div className={`
        flex
        items-center
        justify-center
        w-6
        h-6
      `}>
        <ImagePositionButton
          onClick={() => props.handleImagePositionChange()}
          imageOnLeft={props.imageOnLeft}
        />
      </div>
    </div>
  )
}

export default Header;
