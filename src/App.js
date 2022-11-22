import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import RedditContent from './RedditContent.js'
import RedditComments from './RedditComments.js'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/r/:subreddit/comments/:id'>
          <RedditComments />
        </Route>
        <Route path='/r/:subreddit'>
          <RedditContent type="subreddit"/>
        </Route>
        <Route path='/user/:subreddit'>
          <RedditContent type="user"/>
        </Route>
        <Route path='/'>
          <RedditContent type="subreddit"/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
