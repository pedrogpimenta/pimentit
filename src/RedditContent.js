import React from 'react';
import { withRouter } from "react-router-dom";
import qs from 'query-string';

import PostPreview from './PostPreview.js';
import Pagination from './Pagination.js';
import Header from './Header.js';
import SubredditError from './SubredditError.js';

const DEFAULT_SUBREDDIT = 'all';
const IMAGE_ON_LEFT = localStorage.getItem('imageOnLeft') === 'false' ? false : true;

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
      imageOnLeft: IMAGE_ON_LEFT,
      showAllPostsContent: false,
    }
  }

  fetchData(direction) {
    const subreddit = this.props.match.params.subreddit || DEFAULT_SUBREDDIT;
    const parsedQuery = qs.parse(this.props.location.search)
    const count = parsedQuery.count || this.state.count;
    const after = parsedQuery.after;
    const before = parsedQuery.before;

    let fetchUrl = `https://www.reddit.com/r/${subreddit}/hot/.json?limit=25`;
    
    this.setState({
      count: count,
      isLoading: true,
    });

    if (!!after) {
      fetchUrl += `&count=${count}&after=${after}`;
    } else if (!!before) {
      fetchUrl += `&count=${count}&before=${before}`;
    }

    fetch(fetchUrl)
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
    if ((this.props.match.params.subreddit !== prevProps.match.params.subreddit) || (this.props.location.search !== prevProps.location.search)) {
      this.setState({showAllPostsContent: false})
      this.fetchData();
    }
  }

  handleImagePositionChange() {
    localStorage.setItem('imageOnLeft', !this.state.imageOnLeft);
    this.setState({imageOnLeft: !this.state.imageOnLeft})
  }

  handleShowAllPostsContent() {
    this.setState({showAllPostsContent: !this.state.showAllPostsContent})
  }

  render() {
    return (
      <>
        <Header
          subreddit={this.props.match.params.subreddit || DEFAULT_SUBREDDIT}
          handleImagePositionChange={() => this.handleImagePositionChange()}
          handleShowAllPostsContent={() => this.handleShowAllPostsContent()}
          showAllPostsContent={this.state.showAllPostsContent}
          imageOnLeft={this.state.imageOnLeft}
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
                  return (
                    <PostPreview
                      key={post.data.name}
                      post={post.data}
                      imageOnLeft={this.state.imageOnLeft}
                      showPostContent={this.state.showAllPostsContent}
                    />
                  )
                })}
              </ul>
            </div>
            <Pagination
              subreddit={this.props.match.params.subreddit || DEFAULT_SUBREDDIT}
              count={this.state.count}
              lastPostName={this.state.posts[this.state.posts?.length - 1]?.data?.name}
              firstPostName={this.state.posts[0]?.data?.name}
            />
          </>
        }
      </>
    )
  }
}

export default withRouter(RedditContent);
