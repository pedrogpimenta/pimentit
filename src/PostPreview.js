import React from 'react';
import Moment from 'react-moment';
import {
  Link
} from "react-router-dom";
import LinkIcon from './imageComponents/LinkIcon';
import TextIcon from './imageComponents/TextIcon';
import Embed from './Embed';

class PostPreview extends React.Component {
  constructor() {
    super();

    this.state = {
      showPostContent: false,
    }
  }

  handleThumbClick() {
    this.setState({showPostContent: !this.state.showPostContent});
  }

  render() {
    const post = this.props.post;
    const imagePositionClasses = this.props.imageOnLeft ? `mr-2 order-1` : `ml-2 order-3`;

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
          ${this.props.classes}
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
                ${imagePositionClasses}
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
          {post.is_self && post.thumbnail === `self` &&
            <div
              className={`
                flex-shrink-0
                w-12
                h-12
                mt-1
                bg-black
                rounded
                overflow-hidden
                ${imagePositionClasses}
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
                onClick={() => this.handleThumbClick()}
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
                ${imagePositionClasses}
              `}
              onClick={() => this.handleThumbClick()}
            >
              <div className={`
                w-full
                h-full
                bg-black
                rounded
                overflow-hidden
              `}
              >
                <img
                  className={`
                    object-cover
                    w-full
                    h-full
                  `}
                  src={post.thumbnail}
                  alt={post.title}
                />
              </div>
              {post.post_hint === 'link' && post.url.indexOf('imgur') < 0 &&
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
              {post.is_self &&
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
                  <TextIcon />
                </div>
              }
            </div>
          }
          <div
            className={`
              flex-grow
              font-semibold
              leading-snug
              order-2
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
        <div
          className={`
            text-gray-500
            text-sm
            whitespace-no-wrap
            pt-1
            overflow-y-hidden
            overflow-x-auto
          `}
        >
          {post.score}pts - <Link to={`/r/${post.subreddit}/comments/${post.id}`}>{post.num_comments} comments</Link>{post.link_flair_text && ` - [${post.link_flair_text}]`}
        </div>
        {this.state.showPostContent &&
          <div
            className={`
              -ml-2
              -mr-2
              overflow-hidden
            `}
          >
            <Embed post={post} />
          </div>
        }
      </li>
    )
  }
}

export default PostPreview;
