import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Home from './Home';
import Sheet from './sheet';
import Nav from './Nav';
import BlankSheet from './createSheet';

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Nav />
          <Route exact path="/" component={Home} />
          <Route path="/sheet" component={Sheet} />
          <Route path="/createSheet" component={BlankSheet} />
        </Router>
      </div>
    )
  }
}

export default App;
