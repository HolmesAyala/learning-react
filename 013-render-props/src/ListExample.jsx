import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

function UserList() {
  const [loading, setLoading] = useState(false);

  const [userListFromAPI, setUserListFromAPI] = useState([]);

  async function loadUsers() {
    try {
      setLoading(true);

      const response = await fetch('https://jsonplaceholder.typicode.com/users');

      const responseBody = await response.json();

      setUserListFromAPI(responseBody);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading) {
    return 'Loading users...';
  }

  const userListComponent = userListFromAPI.map((user) => {
    return <div key={user.id}>{user.name}</div>;
  });

  return <div>{userListComponent}</div>;
}

function List(props) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadData = useCallback(async (url) => {
    try {
      setLoading(true);

      const response = await fetch(url);

      const responseBody = await response.json();

      setList(responseBody);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(props.url);
  }, [props.url, loadData]);

  return props.render({ error, loading, list });
}

List.propTypes = {
  url: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

export default function ListExample() {
  function renderUsers({ error, loading, list }) {
		if (error) {
			return <h5>Error loading users</h5>;
    }
    
    const loadingComponent = <p>Loading users...</p>;

		return (
			<div>
        <h2>Users</h2>

        {loading && loadingComponent}

				{list.map((user) => (
					<div key={user.id}>{user.name}</div>
				))}
			</div>
		);
	}

  return (
    <div>
      <h1>Render props with lists</h1>

      <UserList />

      <List url='https://jsonplaceholder.typicode.com/users' render={renderUsers} />
    </div>
  );
}
