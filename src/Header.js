import React from 'react';
import { useHistory } from "react-router-dom";
import PimentitLogo from './imageComponents/PimentitLogo';
// import MenuIcon from './imageComponents/MenuIcon';
import CreatableSelect from 'react-select/creatable';
import ImagePositionButton from './ImagePositionButton';

const options = [
  { value: 'all', label: 'all' },
  { value: 'popular', label: 'popular' },
  { value: 'portugal', label: 'portugal' },
]

function Header(props) {
  let history = useHistory();
  
  const handleOnChange = (selectedOption) => {
    history.push(`/r/${selectedOption.value}`)
  };

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
          options={options}
          styles={{
            control: base => ({
              ...base,
              height: '30px',
              minHeight: '30px',
              overflow: 'hidden',
            }),
            valueContainer: base => ({
              ...base,
              height: '30px',
              top: '-1px',
            }),
            input: base => ({
              ...base,
              height: '30px',
              position: 'relative',
              top: '-3px',
            }),
            indicatorSeparator: base => ({
              ...base,
              // marginTop: '7px',
            }),
            dropdownIndicator: base => ({
              ...base,
              padding: '6px 8px',
              // position: 'relative',
              // top: '-1px',
            }),
          }}
          // defaultValue={{value: props.subreddit, label: props.subreddit}}
          // inputValue={props.subreddit}
          value={{value: props.subreddit, label: `${props.subreddit}`}}
          onChange={(selectedOption) => {handleOnChange(selectedOption)}}
        />
      </div>
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
      {/* <div className={`
        w-6
        h-6
      `}>
        <MenuIcon />
      </div> */}
    </div>
  )
}

export default Header;
