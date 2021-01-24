import React from 'react';
/**
 * Styles
 */
import './App.css';
/**
 * Components
 */
import CounterApp, { ROOT_PATH as COUNTER_ROOT_PATH } from './applications/CounterApp';
import ReduxPost, { ROOT_PATH as REDUX_POST_ROOT_PATH } from './applications/ReduxPost/ReduxPost';
/**
 * Routing
 */
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';

export const ROOT_PATH = '/applications';

const COUNTER_PATH = `${ROOT_PATH}${COUNTER_ROOT_PATH}`;
const REDUX_POST_PATH = `${ROOT_PATH}${REDUX_POST_ROOT_PATH}`;

function App() {
  return (
    <BrowserRouter>
      <h1>Applications:</h1>

      <nav>
        <Link to={COUNTER_PATH} style={{ marginRight: '1rem' }}>
          Counter
          </Link>

        <Link to={REDUX_POST_PATH}>ReduxPost</Link>
      </nav>

      <Switch>
        <Redirect exact from='/' to={COUNTER_PATH} />

        <Route path={COUNTER_PATH}>
          <CounterApp />
        </Route>

        <Route path={REDUX_POST_PATH}>
          <ReduxPost />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
