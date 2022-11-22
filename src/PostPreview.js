import React from 'react';
import moment from 'moment';
import {
  Link
} from "react-router-dom";
import LinkIcon from './imageComponents/LinkIcon';
import TextIcon from './imageComponents/TextIcon';
import PointsIcon from './imageComponents/PointsIcon';
import CommentsIcon from './imageComponents/CommentsIcon';
import RedditIcon from './imageComponents/RedditIcon';
import Embed from './Embed';

class PostPreview extends React.Component {
  constructor() {
    super();

    this.state = {
      showPostContent: false,
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.showPostContent !== prevProps.showPostContent) {
      if (!(!!this.props?.post?.secure_media?.oembed || !!this.props?.post?.secure_media?.reddit_video || this.props?.post?.url.indexOf(`gif`) >= 0 || this.props?.post?.url.indexOf(`gifv`) >= 0)) {
        this.setState({showPostContent: this.props.showPostContent})
      }
    }
  }

  handleThumbClick() {
    this.setState({showPostContent: !this.state.showPostContent});
  }

  renderThumbs(post, imagePositionClasses) {
    if (!!post.preview) {
      return (
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
              sizes={`48px`}
              srcSet={
                post.preview.images[0].resolutions.map(resolution => {
                  return (
                    `${resolution.url.replace(/&amp;/g, `&`)} ${resolution.width}w`
                  )
                })
              }
              src={post.thumbnail}
              alt={post.title}
            />
          </div>
          {post.post_hint === 'link' && post.url.indexOf('imgur') < 0 &&
            <div
              className={`
                flex
                absolute
                bottom-0
                right-0
                bg-white
                dark:bg-black
                dark:text-white
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
                flex
                absolute
                bottom-0
                right-0
                bg-white
                dark:bg-black
                dark:text-white
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
      )

    } else if (post.thumbnail === 'default') {
      return (
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
      )
    } else if (post.is_self && post.thumbnail === `self` && !post.selftext) {
      return (
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
      )
    } else if (post.is_self && (post.thumbnail === `self` || post.selftext.length > 0)) {
      return (
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
              flex
              px-1
            `}>
              <TextIcon fill={`white`} />
              <TextIcon fill={`white`} />
              <TextIcon fill={`white`} />
            </div>
          </div>
        </div>
      )
    }
  }

  render() {
    const post = this.props.post;
    const postUrl = post.url.indexOf(`${post.subreddit}/comments/`) >= 0 ? post.url.replace('//www.reddit.com/', `//reddit.pimenta.co/`) : post.url;
    const imagePositionClasses = this.props.imageOnLeft ? `mr-2 order-1` : `ml-2 order-3`;

    moment.locale('en', {
      relativeTime: {
        future: 'in %s',
        past: '%s ago',
        s:  'seconds',
        ss: '%ss',
        m:  'a minute',
        mm: '%dm',
        h:  'an hour',
        hh: '%dh',
        d:  'a day',
        dd: '%dd',
        M:  'a month',
        MM: '%dM',
        y:  'a year',
        yy: '%dY'
      }
    })

    return (
      <li
        className={`
          flex
          flex-col
          pt-1
          pb-2
          px-2
          border-b-2 last:border-0
          border-solid
          border-gray-400
          dark:border-gray-700
          bg-white
          dark:bg-black
          dark:text-white
          ${this.props.classes}
        `}
      >
        <div
          className={`
            text-gray-500
            text-sm
            whitespace-nowrap
            pb-1
            overflow-y-hidden
            overflow-x-auto
          `}
        >
          <Link to={`/r/${post.subreddit}`}>{post.subreddit_name_prefixed}</Link> - {moment(post.created * 1000).fromNow(true)} - <Link to={`/user/${post.author}`}>{`u/${post.author}`}</Link>{post.link_flair_text && ` - [${post.link_flair_text}]`}
        </div>
        <div
          className={`
            flex
          `}
        >
          {this.renderThumbs(post, imagePositionClasses)}
          <div
            className={`
              flex-grow
              font-semibold
              leading-snug
              order-2
            dark:text-white
            `}
          >
            <a 
              className={`inline-block`}
              href={postUrl}
            >
              {post.title}
            </a>
          </div>
        </div>
        <div
          className={`
            flex
            items-center
            text-gray-500
            text-sm
            whitespace-nowrap
            pt-1
            overflow-y-hidden
            overflow-x-auto
          `}
        >
          <div>
            {post.score} <PointsIcon fill={`#a0aec0`}/>
          </div>
          <Link className={`ml-2`} to={`/r/${post.subreddit}/comments/${post.id}`}>{post.num_comments} <CommentsIcon fill={`#a0aec0`}/></Link>
          <div className={`
            flex-grow
            text-right
          `}>
            <a
              className={`ml-2`}
              href={`//reddit.com/r/${post.subreddit}/comments/${post.id}`}
            >
              <RedditIcon fill={`#a0aec0`}/>
            </a>
          </div>
        </div>
        {this.state.showPostContent &&
          <div
            className={`
              relative
              -ml-2
              -mr-2
              overflow-hidden
            `}
          >
            <Embed
              post={post}
              imageOnLeft={this.props.imageOnLeft}
            />
          </div>
        }
      </li>
    )
  }
}

export default PostPreview;
