import React from 'react';
import Moment from 'react-moment';
import Comment from './Comment.js';
import { htmlEntities } from './helpers/htmlEntities';

class PostPreview extends React.Component {
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
        key={comment.id}
        className={`
          relative
          flex
          flex-col
          pt-1
          px-4
          my-2
          mx-2
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
                whitespace-no-wrap
                pb-1
                overflow-y-hidden
                overflow-x-auto
              `}
            >
              <a href={`//reddit.com/u/${comment.author}`} target={`_blank`}>{comment.author}</a> - <Moment fromNow ago date={comment.created * 1000} />
            </div>
            <div
              className={`
                ${hideElements}
                flex
              `}
              dangerouslySetInnerHTML={{__html: htmlEntities(comment.body_html)}}
            >
            </div>
            <div className={`${hideElements}`}>
              {!!comment.replies && comment.replies.data.children.map(comment => {
                return (
                  <Comment comment={comment}/>
                )
              })}
            </div>
          </>
        }
        {this.props.comment.kind === 'more' &&
          <div>load more (you wish)</div>
        }
      </li>
    )
  }
}

export default PostPreview;
