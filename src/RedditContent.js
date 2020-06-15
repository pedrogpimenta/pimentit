import React from 'react';
import PostPreview from './PostPreview.js';

class RedditContent extends React.Component {
  constructor() {
    super();

    this.state = {
      posts: [],
    }
  }

  componentDidMount() {
    const getSubredditFromUri = (path) => {
      const pathDescontructed = path.split(`/`);
      let thisSubreddit = `popular`;

      if (pathDescontructed.length >= 3) {
        thisSubreddit = pathDescontructed[2];
      }

      return thisSubreddit;
    };

    const subreddit = getSubredditFromUri(window.location.pathname)

    fetch(`https://www.reddit.com/r/${subreddit}/hot/.json?limit=25`)
      .then(response => response.json())
      .then(data => {
        this.setState({posts: data.data.children});
      })
  }

  render() {
    return (
      <ul
        className={`
          list-none
        `}
      >
        {this.state.posts.map(post => {
          if (post.data.stickied) return false
          return <PostPreview post={post.data} />;
        })}
      </ul>
    )
  }
}

export default RedditContent;
