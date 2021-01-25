import React from 'react';
// Routing
import { Link } from 'react-router-dom';
import routes from '../../routes';
// Store
import { useSelector } from 'react-redux'
import { selectUsers } from '../../store/users/usersReducer';

const UserList = () => {
  /**
   * Hooks
   */
  const users = useSelector(selectUsers);

  /**
   * Components to render
   */
  const usersToRender = users.map(user => {
    return (
      <li key={user.id}>
        <Link to={`${routes.users}/${user.id}`}>{user.name}</Link>
      </li>
    );
  })

  return (
    <div>
      <h2>Users</h2>

      <ul>
        {usersToRender}
      </ul>
    </div>
  );
}

export default UserList;
