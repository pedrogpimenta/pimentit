import React from 'react';
import Moment from 'react-moment';



class RedditContent extends React.Component {
  constructor() {
    super();

    this.state = {
      posts: [],
    }
  }

  componentDidMount() {
    const getSubredditFromUri = (path) => {
      const pathDescontructed = path.split(`/r/`);
      let thisSubreddit = `popular`;

      if (pathDescontructed.length >= 2) {
        thisSubreddit = pathDescontructed[1]
      }

      return thisSubreddit;
    };

    const subreddit = getSubredditFromUri(window.location.pathname)

    fetch(`https://www.reddit.com/r/${subreddit}/hot/.json?limit=10`)
      .then(response => response.json())
      .then(data => {
        this.setState({posts: data.data.children});
      })
  }

  renderPost(post) {
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
            pb-2
          `}
        >
          {post.subreddit_name_prefixed} - <Moment fromNow ago date={post.created * 1000} /> - {post.author}
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
              src={post.thumbnail}
              alt={post.title} />
          </div>
          <div
            className={`
              font-semibold
              leading-snug
            `}
          >
            {post.title}
          </div>
        </div>
      </li>
    )
  }

  render() {
    return (
      <ul
        className={`
          list-none
        `}
      >
        {this.state.posts.map(post => {
          return this.renderPost(post.data)
        })}
      </ul>
    )
  }
}

export default RedditContent;
