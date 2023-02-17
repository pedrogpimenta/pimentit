import React from 'react';
import VideoPlayer from './VideoPlayer';
import PostPreview from './PostPreview.js';
import 'video.js/dist/video-js.css';
import { htmlEntities } from './helpers/htmlEntities';

function Embed(props) {
  const guidGenerator = () => {
    const S4 = function() {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1)
    }
    return ("video"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4())
  }

  
  if (props.post.url.indexOf(`imgur.com`) >= 0 && props.post.url.indexOf('i.imgur.com') < 0) {
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
          width: window.innerWidth,
          maxWidth: `100%`,
        }}
        className={`
          relative
          flex
          items-start
          justify-center
          bg-black
          my-2
          overflow-hidden
        `}
      >
        <img
          className={`
            object-contain
            w-full
            h-full
            bg-red-500
          `}
          // style={{filter: 'blur(50px)'}}
          src={imgSrc}
          alt={props.post.title}
        />
      </div>
    )
  } else if (!!props.post.secure_media) {
    if (!!props.post.secure_media.reddit_video) {
      const thisID = guidGenerator();

      const sourceWidth = props.post.secure_media.reddit_video.width;
      const sourceHeight = props.post.secure_media.reddit_video.height;

      const videoHeight = parseInt((window.innerWidth * sourceHeight) / sourceWidth) < (window.innerHeight - 200) ? parseInt((window.innerWidth * sourceHeight) / sourceWidth) : window.innerHeight - 200;

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
            width: window.innerWidth,
            height: videoHeight,
            maxWidth: `100%`,
            // maxHeight: window.innerHeight - 200,
          }}
          className={`
            video-js--container
            flex
            items-center
            justify-center
            bg-black
            my-2
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
      finalHeight = parseInt((finalWidth * sourceHeight) / sourceWidth) > 0 ? parseInt((window.innerWidth * sourceHeight) / sourceWidth) < (window.innerHeight - 200) ? parseInt((window.innerWidth * sourceHeight) / sourceWidth) : window.innerHeight - 200 : 'auto';

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
            bg-black
            my-2
            overflow-hidden
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
          width: window.innerWidth,
          maxWidth: `100%`,
        }}
        className={`
          relative
          flex
          items-start
          justify-center
          bg-black
          my-2
          overflow-hidden
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
  } else if (props.post.url.indexOf(`.jpg`) >= 0 || props.post.url.indexOf(`.jpeg`) >= 0 || props.post.url.indexOf(`.webm`) >= 0 || props.post.url.indexOf(`.png`) >= 0 || (props.post.url.indexOf(`.gif`) >= 0 && props.post.url.indexOf(`.gifv`) < 0)) {
    let postUrl = props.post.url;

    if (props.post.url.indexOf('preview.redd.it')) {
      postUrl = postUrl.replace(/&amp;/g, `&`);
    }

    return (
      <div
        style={{
          width: window.innerWidth,
          maxWidth: `100%`,
        }}
        className={`
          relative
          flex
          items-start
          justify-center
          bg-black
          my-2
          overflow-hidden
        `}
      >
        <img
          className={`
            object-contain
            w-full
            h-full
            bg-green-500
          `}
          // style={{filter: 'blur(50px)'}}
          src={postUrl}
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
          overflow-hidden
        `}
      >
        <div
          dangerouslySetInnerHTML={{__html: htmlEntities(props.post.selftext_html)}}
        >
        </div>
      </div>
    )
  } else if (!!props.post.crosspost_parent_list) {
    return (
      <PostPreview
        key={props.post.crosspost_parent_list[0].name}
        post={props.post.crosspost_parent_list[0]}
        imageOnLeft={props.imageOnLeft}
        classes={`
          m-2
          border-b
          border
          border-solid
          border-gray-400
          rounded
        `}
      />
    )
  } else if (props.post.is_gallery) {
    const imagesArray = []

    const postImages = props.post.media_metadata

    Object.keys(postImages).forEach((key) => {
      imagesArray.push(htmlEntities(postImages[key].s.u))
    })
    
    return (
      <div
        style={{
          width: window.innerWidth,
          maxWidth: `100%`,
        }}
        className={`
          relative
          flex
          flex-col
          gap-2
          items-start
          justify-center
          bg-black
          my-2
          overflow-hidden
        `}
      >
        {imagesArray.map((img) => (
          <img
            className={`
              object-contain
              w-full
              h-full
              bg-red-500
            `}
            src={img}
            alt={props.post.title}
          />
        ))}
      </div>
    )    
  }

  return null;
}

export default Embed;