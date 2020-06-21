import React from 'react';
import VideoPlayer from './VideoPlayer';
import 'video.js/dist/video-js.css';
import { htmlEntities } from './helpers/htmlEntities';

function Embed(props) {
  const guidGenerator = () => {
    const S4 = function() {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1)
    }
    return ("video"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4())
  }

  
  if (!!props.post.secure_media) {
    if (!!props.post.secure_media.reddit_video) {
      const thisID = guidGenerator();

      const sourceWidth = props.post.secure_media.reddit_video.width;
      const sourceHeight = props.post.secure_media.reddit_video.height;

      const videoHeight = parseInt((window.innerWidth * sourceHeight) / sourceWidth) < window.innerHeight ? parseInt((window.innerWidth * sourceHeight) / sourceWidth) : window.innerHeight - 200;

      const sourceUrl = props.post.secure_media.reddit_video.fallback_url;

      let sourceUrlSplit = [];
      if (sourceUrl.indexOf('?') >= 0) {
        sourceUrlSplit = sourceUrl.split('?')[0].split('/');
      } else {
        sourceUrlSplit = sourceUrl.split('/');
      }
      const dashPartIndex = sourceUrlSplit.findIndex(part => part.indexOf('DASH') >= 0);
      sourceUrlSplit[dashPartIndex] = 'audio'; 

      const audioSrc = sourceUrlSplit.join('/');

      const audioJsOptions = {
        autoplay: true,
        controls: true,
        muted: true,
        sources: [{
          src: audioSrc,
          type: 'audio/mp3',
        }]
      }

      const videoJsOptions = {
        autoplay: true,
        controls: true,
        muted: true,
        width: window.innerWidth,
        height: videoHeight,
        sources: [{
          src: sourceUrl,
          type: 'video/mp4',
        }]
      }

      return (
        <div
          style={{
            maxWidth: window.innerWidth,
            maxHeight: window.innerHeight - 200,
          }}
          className={`
            flex
            items-center
            justify-center
            mt-2
            bg-black
            overflow-hidden
          `}
        >
          <div
            style={{
              width: 0,
              height: 0,
              overflow: `hidden`,
            }}
          >
            <VideoPlayer 
              identifier={`audio-js-${thisID}`}
              { ...audioJsOptions }
            />
          </div>
          <VideoPlayer 
            identifier={thisID}
            { ...videoJsOptions }
          />
        </div>
      )
    } else if (!!props.post.secure_media.oembed) {
      const sourceWidth = props.post.secure_media.oembed.width;
      const sourceHeight = props.post.secure_media.oembed.height;
      const viewportWidth = window.innerWidth;

      let finalWidth = 0;
      let finalHeight = 0

      // TODO: make videos not higher than screen
      finalWidth = viewportWidth;
      finalHeight = parseInt((finalWidth * sourceHeight) / sourceWidth) > 0 ? parseInt((finalWidth * sourceHeight) / sourceWidth) : 'auto';

      if (props.post.secure_media.type === `twitter.com`) {
        const script = document.createElement("script");
        script.async = true;
        script.src = "https://platform.twitter.com/widgets.js";
        document.head.appendChild(script);
      }

      return (
        <div
          style={{
            width: finalWidth,
            height: props.post.secure_media.type === `twitter.com` ? finalHeight + 40 : finalHeight,
            paddingTop: props.post.secure_media.type === `twitter.com` ? `1rem` : ``,
            paddingLeft: props.post.secure_media.type === `twitter.com` ? `.5rem` : ``,
            paddingRight: props.post.secure_media.type === `twitter.com` ? `.5rem` : ``,
            background: props.post.secure_media.type === `twitter.com` ? `white` : ``,
          }}
          className={`
            flex
            items-center
            justify-center
            mt-2
            bg-black
          `}
          dangerouslySetInnerHTML={{__html: htmlEntities(props.post.secure_media.oembed.html)}}
        >
        </div>
      )
    }
  } else if (props.post.url.indexOf(`gifv`) >= 0) {
    const newUrl = props.post.url.slice(0, -4) + 'mp4';
    return (
      <div
        style={{
          maxWidth: window.innerWidth,
        }}
        className={`
          relative
          flex
          items-start
          justify-center
          mt-2
          bg-black
        `}
      >
        <video
          // className={`
          //   object-contain
          //   w-full
          //   h-full
          // `}
          // style={{filter: 'blur(50px)'}}
          controls
          src={newUrl}
          // alt={props.post.title}
        />
      </div>
    )
  } else if (props.post.url.indexOf(`jpg`) >= 0 || props.post.url.indexOf(`webm`) >= 0 || props.post.url.indexOf(`png`) >= 0 || (props.post.url.indexOf(`gif`) >= 0 && props.post.url.indexOf(`gifv`) < 0)) {
    return (
      <div
        style={{
          maxWidth: window.innerWidth,
        }}
        className={`
          relative
          flex
          items-start
          justify-center
          mt-2
          bg-black
        `}
      >
        <img
          className={`
            object-contain
            w-full
            h-full
          `}
          // style={{filter: 'blur(50px)'}}
          src={props.post.url}
          alt={props.post.title}
        />
      </div>
    )
  } else if (props.post.url.indexOf(`imgur.com`) >= 0 && props.post.url.indexOf('i.imgur.com') < 0) {
    const sourceUrl = props.post.url;

    let sourceUrlSplit = [];
    if (sourceUrl.indexOf('?') >= 0) {
      sourceUrlSplit = sourceUrl.split('?')[0].split('/');
    } else {
      sourceUrlSplit = sourceUrl.split('/');
    }
    const imgId = sourceUrlSplit[3];

    const imgSrc = `https://i.imgur.com/${imgId}.jpg`;

    return (
      <div
        style={{
          maxWidth: window.innerWidth,
        }}
        className={`
          relative
          flex
          items-start
          justify-center
          mt-2
          bg-black
        `}
      >
        <img
          className={`
            object-contain
            w-full
            h-full
          `}
          // style={{filter: 'blur(50px)'}}
          src={imgSrc}
          alt={props.post.title}
        />
      </div>
    )

  } else if (props.post.is_self && !!props.post.selftext_html) {
    return (
      <div
        className={`
          post-preview
          p-2
        `}
      >
        <div
          dangerouslySetInnerHTML={{__html: htmlEntities(props.post.selftext_html)}}
        >
        </div>
      </div>
    )
  }

  return null;
}

export default Embed;