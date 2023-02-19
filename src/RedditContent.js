import React from 'react';
import { withRouter } from "react-router-dom";
import qs from 'query-string';

import PostPreview from './PostPreview.js';
import Pagination from './Pagination.js';
import Header from './Header.js';
import SubredditError from './SubredditError.js';
import Select from 'react-select';
import RedditIcon from './imageComponents/RedditIcon';

const DEFAULT_SUBREDDIT = 'frontpage';
const IMAGE_ON_LEFT = localStorage.getItem('imageOnLeft') === 'false' ? false : true;
const DARK_MODE = localStorage.getItem('pimentitDarkMode') === 'false' ? false : true;

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
      darkMode: DARK_MODE,
      currentSubreddit: DEFAULT_SUBREDDIT,
      subredditType: '',
      sortBy: '',
      isSubInUserSubreddits: false,
    }
  }

  fetchData(sortOrder) {
    const type = this.props.type;
    let subreddit = this.props.match.params.subreddit || this.state.currentSubreddit;
    const parsedQuery = qs.parse(this.props.location.search)
    const count = parsedQuery.count || 0;
    const after = parsedQuery.after;
    const before = parsedQuery.before;
    const sortBy = sortOrder || 'hot';

    if (type === 'frontpage') {
      const userSubreddits = localStorage.getItem('pimentitUserSubreddits') && JSON.parse(localStorage.getItem('pimentitUserSubreddits'))
      subreddit = ''
    
      if (userSubreddits) {
        userSubreddits.forEach((s, index) => {
          if (index === 0) {
            subreddit = s.value
          } else {
            subreddit = subreddit+'+'+s.value
          }
        })
      }
    }


    this.setState({
      count: count,
      isLoading: true,
      subredditType: type,
      sortBy: sortBy,
      currentSubreddit: subreddit,
    });


    let fetchUrl = (type === 'subreddit' || type === 'frontpage') ? `https://www.reddit.com/r/${subreddit}/${sortBy}/.json?limit=25` :
                   `https://www.reddit.com/user/${subreddit}/submitted/.json?sort=${sortBy}&limit=25`;
    
    if (!sortOrder && !!after) {
      fetchUrl += `&count=${count}&after=${after}`;
    } else if (!sortOrder && !!before) {
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
    if (localStorage.getItem('pimentitUserSubreddits') && JSON.parse(localStorage.getItem('pimentitUserSubreddits')).findIndex((s) => s.value === this.props.match.params.subreddit) > 0) {
      this.setState({isSubInUserSubreddits: true})
    }
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
      if (localStorage.getItem('pimentitUserSubreddits') && JSON.parse(localStorage.getItem('pimentitUserSubreddits')).findIndex((s) => s.value === this.props.match.params.subreddit) <= 0) {
        this.setState({isSubInUserSubreddits: false})
      }
      if (localStorage.getItem('pimentitUserSubreddits') && JSON.parse(localStorage.getItem('pimentitUserSubreddits')).findIndex((s) => s.value === this.props.match.params.subreddit) > 0) {
        this.setState({isSubInUserSubreddits: true})
      }
    }
  }

  handleImagePositionChange() {
    localStorage.setItem('imageOnLeft', !this.state.imageOnLeft);
    this.setState({imageOnLeft: !this.state.imageOnLeft})
  }

  handleShowAllPostsContent() {
    this.setState({showAllPostsContent: !this.state.showAllPostsContent})
  }

  handleDarkModeButton() {
    localStorage.setItem('pimentitDarkMode', !this.state.darkMode);
    this.setState({darkMode: !this.state.darkMode})
  }
  
  handleSelectOnChange(selected) {
    this.fetchData(selected.value);
  }

  handleAddUserSubreddit(subreddit) {
    const userSubreddits = localStorage.getItem('pimentitUserSubreddits') && JSON.parse(localStorage.getItem('pimentitUserSubreddits'))

    if (this.state.isSubInUserSubreddits) {
      const subredditIndex = userSubreddits.findIndex((s) => s.value === subreddit)
      userSubreddits.splice(subredditIndex, 1)
      this.setState({isSubInUserSubreddits: false})
    } else {
      userSubreddits.push({value: subreddit, label: subreddit})
      this.setState({isSubInUserSubreddits: true})
    }
  
    localStorage.setItem('pimentitUserSubreddits', JSON.stringify(userSubreddits))
  }

  render() {
    return (
      <div className={this.state.darkMode && 'dark'}>
        {this.state.isLoading &&
          <div className={`
            flex
            items-center
            justify-center
            pb-20
            px-2
            h-screen
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
        {(localStorage.getItem('pimentitUserSubreddits') && JSON.parse(localStorage.getItem('pimentitUserSubreddits')).length === 0 && this.state.subredditType === 'frontpage') &&
          <SubredditError error={this.state.error} message="you have no saved subreddits" />
        }
        {this.state.subredditError && this.state.subredditType !== 'frontpage' && 
          <SubredditError error={this.state.error} message={this.state.errorMessage} />
        }
        {!this.state.subredditError && !this.state.isLoading &&
          <>
            <div>
              {this.state.count < 25 &&
                <div
                  className="
                    py-1
                    px-2
                    bg-white dark:bg-black
                    border-b-2 last:border-0
                    border-solid
                    border-gray-400 dark:border-gray-700
                ">
                  <div className="flex justify-between">
                   <span className="" style={{maxWidth: '92%'}}>
                      <span className="flex gap-2">
                        <span className="dark:text-white font-bold overflow-ellipsis overflow-hidden block mb-1 max-w-full">
                          {this.state.subredditType === 'subreddit' ? 'r/' : this.state.subredditType === 'user' ? 'u/' : ''}{this.props.match.params.subreddit || DEFAULT_SUBREDDIT}
                        </span>
                        {this.state.subredditType === 'subreddit' && this.props.match.params.subreddit !== 'all' &&
                          <span
                            className="text-gray-500"
                            onClick={() => this.handleAddUserSubreddit(this.props.match.params.subreddit)}
                          >
                            ({this.state.isSubInUserSubreddits ? 'remove' : 'add'})
                          </span>
                        }
                      </span>
                      <span className="dark:text-white">sort by: </span>
                      <span className="inline-block align-middle">
                        <Select
                          styles={{
                            container: (baseStyles) => ({
                              ...baseStyles,
                              display: 'inline-flex',
                              // width: '100px',
                            }),
                            control: (baseStyles) => ({
                              ...baseStyles,
                              display: 'inline-flex',
                              width: '100px',
                              height: '26px',
                              minHeight: '26px',
                              paddingBottom: '10px',
                              background: 'black',
                            }),
                            valueContainer: (baseStyles) => ({
                              ...baseStyles,
                              width: '100px',
                              height: '26px',
                              top: '-2px',
                              color: 'white',
                            }),
                            singleValue: (baseStyles) => ({
                              ...baseStyles,
                              color: 'white',
                            }),
                            indicatorsContainer: (baseStyles) => ({
                              ...baseStyles,
                              height: '26px',
                              position: 'relative',
                              top: '-2px',
                            }),
                          }}
                          isSearchable={false}
                          defaultValue={{value: this.state.sortBy, label: this.state.sortBy}}
                          options={[
                            {value: 'new', label: 'new'},
                            {value: 'hot', label: 'hot'},
                            {value: 'top', label: 'top'},
                            {value: 'controversial', label: 'controversial'},
                            {value: 'rising', label: 'rising'},
                          ]}
                          onChange={(selected) => this.handleSelectOnChange(selected)}
                        />
                      </span>
                    </span>
                    <a
                      className={`ml-2`}
                      target='_blank'
                      rel="noopener noreferrer"
                      href={`//old.reddit.com/r/${this.props.match.params.subreddit || DEFAULT_SUBREDDIT}`}
                    >
                      <RedditIcon fill={`#a0aec0`}/>
                    </a>
                  </div>
                </div>
              }
              <ul
                className={`
                  list-none
                `}
              >
                {this.state.posts.map(post => {
                  if (this.state.subredditType === 'subreddit' && post.data.stickied) return false
                  if (this.state.subredditType === 'subreddit' && post.data.pinned) return false
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
              subredditType={this.state.subredditType}
              currentSubreddit={this.state.currentSubreddit}
              count={this.state.count}
              lastPostName={this.state.posts[this.state.posts?.length - 1]?.data?.name}
              firstPostName={this.state.posts[0]?.data?.name}
            />
          </>
        }
        <Header
          at="RedditContent"
          subreddit={this.state.currentSubreddit}
          subredditType={this.state.subredditType}
          handleImagePositionChange={() => this.handleImagePositionChange()}
          handleShowAllPostsContent={() => this.handleShowAllPostsContent()}
          handleDarkModeButton={() => this.handleDarkModeButton()}
          showAllPostsContent={this.state.showAllPostsContent}
          imageOnLeft={this.state.imageOnLeft}
          darkMode={this.state.darkMode}
        />
      </div>
    )
  }
}

export default withRouter(RedditContent);
