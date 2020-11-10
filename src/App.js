import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { HomeScreen } from './screens';
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/' component={HomeScreen} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
