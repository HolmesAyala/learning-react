import React from 'react';
/**
 * Styles
 */
import './App.css';
/**
 * Components
 */
import CounterApp, { ROOT_PATH as COUNTER_ROOT_PATH } from './applications/CounterApp';
/**
 * Routing
 */
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';

export const ROOT_PATH = '/applications';

const COUNTER_PATH = `${ROOT_PATH}${COUNTER_ROOT_PATH}`;


function App() {
  return (
    <BrowserRouter>
      <div>
        <h1>Applications:</h1>

        <nav>
          <Link to={COUNTER_PATH} style={{ marginRight: '1rem' }}>
            Counter
          </Link>

          <Link to='/applications/redux-post'>ReduxPost</Link>
        </nav>

        <Switch>
          <Redirect from='/' to={COUNTER_PATH} />

          <Route path={COUNTER_PATH}>
            <CounterApp />
          </Route>

          <Route>
            <strong>Coming soon...</strong>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
