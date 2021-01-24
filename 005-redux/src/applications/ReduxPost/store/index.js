import { configureStore } from '@reduxjs/toolkit';
/**
 * Reducer
 */
import postsReducer from './posts/postsReducer';
import usersReducer from './users/usersReducer';

export default configureStore({
	reducer: {
		posts: postsReducer,
		users: usersReducer,
	},
});
