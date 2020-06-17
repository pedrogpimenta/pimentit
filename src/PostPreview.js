import React from 'react';
import Moment from 'react-moment';
import {
  Link
} from "react-router-dom";
import LinkIcon from './imageComponents/LinkIcon';
import TextIcon from './imageComponents/TextIcon';

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
    } else if (post.url.indexOf(`gifv`) >= 0) {
      const newUrl = post.url.slice(0, -4) + 'mp4';
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
            // alt={post.title}
          />
        </div>
      )
    } else if (post.url.indexOf(`jpg`) >= 0 || post.url.indexOf(`webm`) >= 0 || post.url.indexOf(`png`) >= 0 || (post.url.indexOf(`gif`) >= 0 && post.url.indexOf(`gifv`) < 0)) {
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
          <Link to={`/r/${post.subreddit}`}>{post.subreddit_name_prefixed}</Link> - <Moment fromNow ago date={post.created * 1000} /> - <a href={`//reddit.com/u/${post.author}`} target={`_blank`}>{post.author}</a>
        </div>
        <div
          className={`
            flex
          `}
        >
          {/* TODO: un-duplicate */}
          {(post.thumbnail === 'default') &&
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
              <div
                className={`
                  flex
                  w-full
                  h-full
                  items-center
                  justify-center
                  text-xs
                  text-gray-500
                `}
                style={{position: 'relative', top: '-1px'}}
              >
                <div className={`
                  w-4
                  h-4
                `}>
                  <LinkIcon fill={`white`} />
                </div>
              </div>
            </div>
          }
          {post.is_self &&
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
              <div
                className={`
                  flex
                  w-full
                  h-full
                  items-center
                  justify-center
                  text-xs
                  text-gray-500
                `}
                style={{position: 'relative', top: '-1px'}}
              >
                <div className={`
                  w-4
                  h-4
                `}>
                  <TextIcon fill={`white`} />
                </div>
              </div>
            </div>
          }
          {post.thumbnail !== 'default' && post.thumbnail !== 'self' && post.thumbnail !== 'nsfw' &&
            <div
              className={`
                relative
                flex-shrink-0
                w-12
                h-12
                mt-1
                mr-2
              `}
            >
              <div className={`
                w-full
                h-full
                bg-black
                rounded
                overflow-hidden
              `}>
                <img
                  className={`
                    object-cover
                    w-full
                    h-full
                  `}
                  onClick={() => this.handleThumbClick()}
                  src={post.thumbnail}
                  alt={post.title}
                />
              </div>
              {post.post_hint === 'link' &&
                <div
                  className={`
                    absolute
                    bottom-0
                    right-0
                    bg-white
                    border-2
                    border-black
                    rounded-full
                  `}
                  style={{
                    width: '1.2rem',
                    height: '1.2rem',
                    bottom: '-.2rem',
                    right: '-.2rem',
                    padding: '.2rem',
                  }}
                >
                  <LinkIcon />
                </div>
              }
            </div>
          }
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
              overflow-hidden
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
