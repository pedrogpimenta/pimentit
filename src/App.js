import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import RedditContent from './RedditContent.js'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/r/:subreddit'>
          <RedditContent />
        </Route>
        <Route path='/'>
          <RedditContent />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
