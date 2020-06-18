import React from 'react';

function Embed(props) {
  const htmlEntities = str => {
    return String(str).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&mdash;/g, "—");
  }

  if (!!props.post.secure_media) {
    if (!!props.post.secure_media.reddit_video) {
      return (
        <div
          style={{
            maxWidth: '100vw',
            maxHeight: '100vh'
          }}
          className={`
            flex
            items-center
            justify-center
            mt-2
            bg-black
          `}
        >
          <video
            className={`
              max-h-screen
            `}
            src={props.post.secure_media.reddit_video.fallback_url}
            controls
          ></video>
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
      console.log(htmlEntities(props.post.secure_media.oembed.html))

      if (props.post.secure_media.oembed.type === `twitter.com`) {
        const script = document.createElement("script");
        script.async = true;
        script.src = "https://platform.twitter.com/widgets.js";
        document.head.appendChild(script);
      }

      return (
        <div
          style={{
            width: finalWidth,
            height: finalHeight
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
          maxWidth: '100vw',
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
          maxWidth: '100vw',
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
  }

  return null;
}

export default Embed;