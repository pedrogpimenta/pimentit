import React from 'react';
import { withRouter } from "react-router-dom";

import PostPreview from './PostPreview.js';
import Header from './Header.js';

const DEFAULT_SUBREDDIT = 'popular';

class RedditContent extends React.Component {
  constructor() {
    super();

    this.state = {
      posts: [],
    }
  }

  fetchData() {
    const subreddit = this.props.match.params.subreddit || DEFAULT_SUBREDDIT;
    fetch(`https://www.reddit.com/r/${subreddit}/hot/.json?limit=25`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          posts: data.data.children
        });
      })
  }

  componentDidMount() {
    this.fetchData();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.params.subreddit !== prevState.subreddit) {
      return { subreddit: nextProps.match.params.subreddit };
    } else {
      return null;
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.subreddit !== prevProps.match.params.subreddit) {

      this.fetchData();
    }
  }

  handleSubredditChange(selectedOption ) {
    console.log('sheisse:', selectedOption)
  }

  render() {
    return (
      <>
        <Header
          subreddit={this.props.match.params.subreddit || 'popular'}
          onSubredditChange={(selectedOption) => this.handleSubredditChange(selectedOption)}
        />
        <div className={`pt-10`}>
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
        </div>
      </>
    )
  }
}

export default withRouter(RedditContent);
