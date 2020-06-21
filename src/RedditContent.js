import React from 'react';
import { withRouter } from "react-router-dom";

import PostPreview from './PostPreview.js';
import Header from './Header.js';
import SubredditError from './SubredditError.js';

const DEFAULT_SUBREDDIT = 'all';

class RedditContent extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      subredditError: false,
      error: '',
      errorMessage: '',
      posts: [],
      count: 0,
    }
  }

  fetchData(direction) {
    const subreddit = this.props.match.params.subreddit || DEFAULT_SUBREDDIT;

    this.setState({
      isLoading: true,
    });

    let fetchCount = ``;
    let fetchDirection = ``;
    
    if (direction) {
      if (direction === `next`) {
        this.setState({
          count: this.state.count + 25,
        });
        const lastPostName = this.state.posts[this.state.posts?.length - 1]?.data?.name;

        fetchDirection = direction ? `&after=${lastPostName}` : ``;
      } else if (direction === `prev`) {
        this.setState({
          count: this.state.count - 24,
        });
        const firstPostName = this.state.posts[0]?.data?.name;
        
        fetchDirection = direction ? `&before=${firstPostName}` : ``;
      }

      fetchCount = `&count=${this.state.count}`;
    }

    fetch(`https://www.reddit.com/r/${subreddit}/hot/.json?limit=25${fetchCount}${fetchDirection}`)
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

  handleMorePosts(direction) {
    this.fetchData(direction);
  }


  render() {
    return (
      <>
        <Header
          subreddit={this.props.match.params.subreddit || 'popular'}
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
            <div className={`
              flex
              py-4
              px-2
            `}
            style={{justifyContent: this.state.count >= 25 ? 'space-between' : 'flex-end'}}>
              {this.state.count >= 25 &&
                <button
                  className={`
                    px-4
                    pt-1
                    pb-2
                    bg-purple-800
                    text-white
                    font-semibold
                    rounded
                  `}
                  onClick={() => this.handleMorePosts(`prev`)}
                >
                  &lt; previous
                </button>
              }
              <button
                className={`
                  px-4
                  pt-1
                  pb-2
                  bg-purple-800
                  text-white
                  font-semibold
                  rounded
                `}
                onClick={() => this.handleMorePosts(`next`)}
              >
                next &gt;
              </button>
            </div>
          </>
        }
      </>
    )
  }
}

export default withRouter(RedditContent);
