import React, { useState } from 'react';
/**
 * Store
 */
import { Provider } from 'react-redux';
import store from './store';
/**
 * Routing
 */
import { Switch, Route, useLocation } from 'react-router-dom';
/**
 * Components
 */
import PostList from './components/PostList/PostList';
import AddPost from './components/AddPost'
import SinglePost from './components/SinglePost';
import UpdatePost from './components/UpdatePost';
/**
 * Styles
 */
import styleSheet from './ReduxPost.module.scss';

export const ROOT_PATH = '/redux-post';

const ReduxPost = () => {
  const location = useLocation();

  const [pathNameInFirstRender] = useState(location.pathname);

  return (
    <React.Fragment>
      <Provider store={store}>
        <header>
          <h2>Redux Post</h2>
        </header>

        <main>
          <div className={styleSheet.addPostAndSinglePostContainer}>
            <AddPost />

            <Switch>
              <Route exact path={`${pathNameInFirstRender}/posts/:id`} render={(props) => {
                const hasEditQueryParam = Boolean(new URLSearchParams(props.location.search).get('edit'));
                
                if (hasEditQueryParam) {
                  return (
                    <UpdatePost id={props.match.params.id} />
                  );
                }

                return (
                  <SinglePost id={props.match.params.id} />
                );
              }} />
            </Switch>
          </div>

          <PostList />
        </main>
      </Provider>
    </React.Fragment>
  );
}

export default ReduxPost;
