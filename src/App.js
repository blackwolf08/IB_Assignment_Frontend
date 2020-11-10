import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { HomeScreen } from './screens';
import { Header } from './components';
import { AppContextProvider } from './contexts/AppContext';
function App() {
  return (
    <div className='h-screen'>
      <AppContextProvider>
        <Header />
        <Router>
          <Switch>
            <Route path='/' component={HomeScreen} />
          </Switch>
        </Router>
      </AppContextProvider>
    </div>
  );
}

export default App;
