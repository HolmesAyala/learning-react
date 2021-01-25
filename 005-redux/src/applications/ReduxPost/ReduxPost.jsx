import React from 'react';
/**
 * Store
 */
import { Provider } from 'react-redux';
import store from './store';
import { getUsersFromApi } from './store/users/usersReducer';
/**
 * Routing
 */
import { Switch, Route } from 'react-router-dom';
import routes from './routes';
/**
 * Components
 */
import PostList from './components/PostList/PostList';
import AddPost from './components/AddPost'
import SinglePost from './components/SinglePost';
import UpdatePost from './components/UpdatePost';
import UserList from './components/UserList/UserList';
import SingleUser from './components/SingleUser/SingleUser';
/**
 * Styles
 */
import styleSheet from './ReduxPost.module.scss';

export const ROOT_PATH = '/redux-post';

store.dispatch(getUsersFromApi());

const ReduxPost = () => {
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
              <Route exact path={`${routes.posts}/:id`} render={(props) => {
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

          <UserList />

          <Route exact path={`${routes.users}/:id`} render={(props) => {
            return <SingleUser userId={props.match.params.id} />
          }} />
        </main>
      </Provider>
    </React.Fragment>
  );
}

export default ReduxPost;
