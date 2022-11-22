import React from 'react';
import Moment from 'react-moment';
import Reply from './Comment.js';
import { htmlEntities } from './helpers/htmlEntities';

class Comment extends React.Component {
  constructor() {
    super();

    this.state = {
      showComment: true,
    }
  }

  handleToggleClick() {
    this.setState({showComment: !this.state.showComment});
  }

  render() {
    const comment = this.props.comment.data;
    const hideElements = this.state.showComment ? '' : 'hidden';

    return (
      <li
        className={`
          relative
          flex
          flex-col
          max-w-full
          pt-1
          pl-4
          my-2
          border-l-2
          border-solid
          border-gray-400
        `}
      >
        <div
          className={`
            absolute
            top-0
            left-0
            flex
            justify-center
            items-center
            leading-none
            text-gray-700
            font-semibold
            -ml-2
            mt-2
            w-4
            h-4
            rounded-full
            border-2
            border-solid
            border-gray-400
            bg-white
            dark:bg-black
          `}
          onClick={() => this.handleToggleClick()}
        >
          <span className={`inline-block -mt-1`}>
            {this.state.showComment ? '-' : '+'}
          </span>
        </div>
        {this.props.comment.kind !== 'more' &&
          <>
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
              <a href={`//old.reddit.com/u/${comment.author}`} target={`_blank`}>{comment.author}</a> - <Moment fromNow ago date={comment.created * 1000} />
            </div>
            <div
              className={`
                ${hideElements}
                comment-content
                flex
                pr-4
                break-words
                overflow-x-auto
                dark:text-white
              `}
              dangerouslySetInnerHTML={{__html: htmlEntities(comment.body_html)}}
            >
            </div>
            <div className={`${hideElements}`}>
              <ul>
                {!!comment.replies && comment.replies.data.children.map(comment => {
                  return (
                    <Reply key={comment.data.id} comment={comment} parent={this.props.comment.data.permalink} />
                  )
                })}
              </ul>
            </div>
          </>
        }
        {this.props.comment.kind === 'more' && this.props.parent &&
          <a href={`https://old.reddit.com${this.props.parent}`} className={`
            text-gray-500
            text-sm
          `}>
            load more in old.reddit
          </a>
        }
      </li>
    )
  }
}

export default Comment;
