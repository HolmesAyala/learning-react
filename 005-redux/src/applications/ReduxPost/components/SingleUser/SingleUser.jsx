import React from 'react';
// Utils
import PropTypes from 'prop-types';
// Store
import { useSelector } from 'react-redux';
import { selectPostsByAuthorId } from '../../store/posts/postsReducer';
import { selectUserById } from '../../store/users/usersReducer';
// Routing
import { Link } from 'react-router-dom';
import ReduxPostRoutes from '../../routes';

const SingleUser = (props) => {
  /**
   * Selectors
   */

  const user = useSelector(selectUserById(props.userId));

  const userPosts = useSelector(selectPostsByAuthorId(props.userId));

  /**
   * Render components
   */

  if (!user) {
    return <div>User not found</div>
  }

  const userPostsToRender = userPosts.map(post => {
    return (
      <li key={post.id}>
        <Link to={`${ReduxPostRoutes.posts}/${post.id}`}>{post.title}</Link>
      </li>
    )
  });

  return (
    <div>
      <h2>{user.name}</h2>

      <ul>
        {userPostsToRender}
      </ul>
    </div>
  );
}

SingleUser.propTypes = {
  userId: PropTypes.string.isRequired,
}

export default SingleUser;
