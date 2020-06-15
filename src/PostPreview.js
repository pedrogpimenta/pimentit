import React from 'react';
import Moment from 'react-moment';

class PostPreview extends React.Component {
  constructor() {
    super();

    this.state = {
      showPostContent: false,
    }
  }

  htmlEntities(str) {
    return String(str).replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>').replace('&quot;', '"');
  }

  handleThumbClick() {
    this.setState({showPostContent: !this.state.showPostContent});
  }

  renderPostContent(post) {
    if (!!post.secure_media) {
      if (!!post.secure_media.reddit_video) {
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
              src={post.secure_media.reddit_video.fallback_url}
              controls
            ></video>
          </div>
        )
      } else if (!!post.secure_media.oembed) {
        const sourceWidth = post.secure_media.oembed.width;
        const sourceHeight = post.secure_media.oembed.height;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let finalWidth = 0;
        let finalHeight = 0

        // TODO: make videos not higher than screen
        finalWidth = viewportWidth;
        finalHeight = parseInt((finalWidth * sourceHeight) / sourceWidth);

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
            dangerouslySetInnerHTML={{__html: this.htmlEntities(post.secure_media.oembed.html)}}
          >
          </div>
        )
      }
    } else if (post.url.indexOf(`i.imgur`) >= 0) {
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
          <img
            // style={{filter: 'blur(50px)'}}
            src={post.url}
            alt={post.title}
          />
        </div>
      )
    } else if (post.url.indexOf(`jpg`) >= 0 || post.url.indexOf(`webm`) >= 0 || post.url.indexOf(`png`) >= 0 || post.url.indexOf(`gif`) >= 0) {
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
          <img
            // style={{filter: 'blur(50px)'}}
            src={post.url}
            alt={post.title}
          />
        </div>
      )
    }
    return false;
  }

  render() {
    const post = this.props.post;

    return (
      <li
        className={`
          flex
          flex-col
          pt-1
          pb-2
          px-2
          border-b last:border-0
          border-solid
          border-gray-400
        `}
      >
        <div
          className={`
            text-gray-500
            text-sm
            whitespace-no-wrap
            pb-1
            overflow-y-hidden
            overflow-x-auto
          `}
        >
          <a href={`/r/${post.subreddit}`}>{post.subreddit_name_prefixed}</a> - <Moment fromNow ago date={post.created * 1000} /> - <a href={`//reddit.com/u/${post.author}`} target={`_blank`}>{post.author}</a>
        </div>
        <div
          className={`
            flex
          `}
        >
          <div
            className={`
              flex-shrink-0
              w-12
              h-12
              mt-1
              bg-black
              rounded
              overflow-hidden
              mr-2
            `}
          >
            <img
              className={`
                object-cover
                w-full
                h-full
              `}
              onClick={() => this.handleThumbClick()}
              src={post.thumbnail}
              alt={post.title} />
          </div>
          <div
            className={`
              font-semibold
              leading-snug
            `}
          >
            <a 
              className={`inline-block`}
              href={post.url}
            >
              {post.title}
            </a>
          </div>
        </div>
        {this.state.showPostContent &&
          <div
            className={`
              -ml-2
              -mr-2
            `}
          >
            {this.renderPostContent(post)}
          </div>
        }
      </li>
    )
  }
}

export default PostPreview;
