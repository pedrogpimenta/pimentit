import React from 'react';
import { withRouter } from "react-router-dom";

import PostPreview from './PostPreview.js';
import Comment from './Comment.js';
import Header from './Header.js';
import SubredditError from './SubredditError.js';

const DEFAULT_SUBREDDIT = 'all';
const IMAGE_ON_LEFT = localStorage.getItem('imageOnLeft') === 'false' ? false : true;

class RedditComments extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      subredditError: false,
      error: '',
      errorMessage: '',
      post: {},
      comments: [],
      // count: 0,
      imageOnLeft: IMAGE_ON_LEFT,
    }
  }

  fetchData(direction) {
    const subreddit = this.props.match.params.subreddit || DEFAULT_SUBREDDIT;
    const id = this.props.match.params.id;

    this.setState({
      isLoading: true,
    });
    
    console.log('fetch:', `https://www.reddit.com/r/${subreddit}/comments/${id}/hot/.json?limit=25`);
    fetch(`https://www.reddit.com/r/${subreddit}/comments/${id}/hot/.json?limit=25`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          this.setState({
            isLoading: false,
            subredditError: true,
            error: data.error,
            errorMessage: data.message,
            post: {},
            comments: [],
          })
        } else if (!data[0].data.children) {
          this.setState({
            isLoading: false,
            subredditError: true,
            errorMessage: `r/${subreddit}: there doesn't seem to be anything here.`,
            post: {},
            comments: [],
          })
        } else {
          this.setState({
            isLoading: false,
            subredditError: false,
            post: data[0].data.children[0],
            comments: data[1].data.children,
          });
        }
      })
      .catch(error => {
        if (error === `TypeError: "NetworkError when attempting to fetch resource."`) {
          this.setState({
            isLoading: false,
            subredditError: true,
            errorMessage: `NetworkError when attempting to fetch resource. This probably means you're blocking this website from accessing reddit.com or the subreddit doesn't exist.`,
            post: {},
            comments: [],
          });
        } else {
          this.setState({
            isLoading: false,
            subredditError: true,
            errorMessage: `r/${subreddit}: there doesn't seem to be anything here`,
            posts: [],
            comments: [],
          });
        }
      })
  }

  componentDidMount() {
    this.fetchData();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.params.id !== prevState.id) {
      return { id: nextProps.match.params.id };
    } else {
      return null;
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {

      this.fetchData();
    }
  }

  handleMorePosts(direction) {
    this.fetchData(direction);
  }

  handleImagePositionChange() {
    localStorage.setItem('imageOnLeft', !this.state.imageOnLeft);
    this.setState({imageOnLeft: !this.state.imageOnLeft})
  }

  render() {
    return (
      <>
        <Header
          subreddit={this.props.match.params.subreddit || DEFAULT_SUBREDDIT}
          handleImagePositionChange={() => this.handleImagePositionChange()}
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
                <PostPreview
                  key={this.state.post.data.name}
                  post={this.state.post.data}
                  imageOnLeft={this.state.post.imageOnLeft}
                  classes={`
                    m-2
                    border
                    border-solid
                    border-gray-400
                    rounded
                  `}
                />
              </ul>
            </div>
            <div
              className={`
                flex
                py-2
              `}
            >
              <ul className={`
                pl-2
              `}>
                {this.state.comments.map(comment => {
                  return (
                    <Comment key={comment.data.id} comment={comment}/>
                  )
                })}
              </ul>
            </div>
          </>
        }
      </>
    )
  }
}

export default withRouter(RedditComments);
