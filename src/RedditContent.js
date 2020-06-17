import React from 'react';
import { withRouter } from "react-router-dom";

import PostPreview from './PostPreview.js';
import Header from './Header.js';
import SubredditError from './SubredditError.js';

const DEFAULT_SUBREDDIT = 'popular';

class RedditContent extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      subredditError: false,
      error: '',
      errorMessage: '',
      posts: [],
    }
  }

  fetchData() {
    const subreddit = this.props.match.params.subreddit || DEFAULT_SUBREDDIT;

    this.setState({isLoading: true})
    
    fetch(`https://www.reddit.com/r/${subreddit}/hot/.json?limit=25`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          this.setState({
            isLoading: false,
            subredditError: true,
            error: data.error,
            errorMessage: data.message,
            posts: [],
          })
        } else if (!data.data.children) {
          this.setState({
            isLoading: false,
            subredditError: true,
            errorMessage: `r/${subreddit}: there doesn't seem to be anything here.`,
            posts: [],
          })
        } else {
          this.setState({
            isLoading: false,
            subredditError: false,
            posts: data.data.children,
          });
        }
      })
      .catch(error => {
        if (error === `TypeError: "NetworkError when attempting to fetch resource."`) {
          this.setState({
            isLoading: false,
            subredditError: true,
            errorMessage: `NetworkError when attempting to fetch resource. This probably means you're blocking this website from accessing reddit.com or the subreddit doesn't exist.`,
            posts: [],
          });
        } else {
          this.setState({
            isLoading: false,
            subredditError: true,
            errorMessage: `r/${subreddit}: there doesn't seem to be anything here`,
            posts: [],
          });
        }
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
        {this.state.isLoading &&
          <div className={`
            flex
            items-center
            justify-center
            pt-20
            px-2
            `}>
            <img
              className={`
                w-6
                h-auto
              `}
              src={`/icon-loading.png`}
              alt={`loading icon`}
            />
          </div>
        }
        {this.state.subredditError &&
          <SubredditError error={this.state.error} message={this.state.errorMessage} />
        }
        {!this.state.subredditError && !this.state.isLoading &&
          <>
            <div className={`pt-10`}>
              <ul
                className={`
                  list-none
                `}
              >
                {this.state.posts.map(post => {
                  if (post.data.stickied) return false
                  return <PostPreview key={post.data.name} post={post.data} />;
                })}
              </ul>
            </div>
          </>
        }
      </>
    )
  }
}

export default withRouter(RedditContent);
