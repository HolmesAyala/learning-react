import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';
import initialState from './initialState';
import axios from 'axios';
// Constants
import { Status } from './initialState';

const SLICE_NAME = 'posts';

export const loadPostsFromApi = createAsyncThunk(`${SLICE_NAME}/getPosts`, async () => {
	const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts`);

	return response.data;
});

export const addPostToApi = createAsyncThunk(
	`${SLICE_NAME}/addPostFromApi`,
	/**
	 * @param {{title: string, content: string, authorId: string}} data
	 */
	async (data) => {
		const response = await axios.post(`${process.env.REACT_APP_API_URL}/posts`, data);

		return response.data;
	}
);

const postsSlice = createSlice({
	initialState,
	name: SLICE_NAME,
	reducers: {
		updatePost(state, action) {
			const postToUpdate = state.posts.find((post) => post.id === action.payload.id);

			if (postToUpdate) {
				postToUpdate.title = action.payload.title;
				postToUpdate.content = action.payload.content;
				postToUpdate.authorId = action.payload.authorId;
			}
		},
		/**
		 * @param {import('./initialState').State} state
		 * @param {{payload: {postId: string, emoji: string, value: string}}} action
		 */
		addValueToEmojiReactionCount(state, action) {
			const postToUpdate = _.find(state.posts, { id: action.payload.postId });

			if (postToUpdate) {
				const emojiReaction = _.find(postToUpdate.emojiReactions, { emoji: action.payload.emoji });

				if (emojiReaction) {
					emojiReaction.count += action.payload.value;
				}
			}
		},
	},
	extraReducers: {
		[loadPostsFromApi.pending]: (state, action) => {
			state.status = Status.LOADING;
		},
		[loadPostsFromApi.fulfilled]: (state, action) => {
			state.status = Status.SUCCESSFUL;

			state.posts = action.payload;
		},
		[loadPostsFromApi.rejected]: (state, action) => {
			state.status = Status.ERROR;

			state.error = action.error.message;
		},
		[addPostToApi.fulfilled]: (state, action) => {
			state.posts.push(action.payload);
		},
	},
});

/**
 * @param {Object} store
 * @return {import('./initialState').Status}
 */
export const selectRequestStatus = (store) => store.posts.status;

/**
 * @param {Object} store
 * @return {string}
 */
export const selectRequestError = (store) => store.posts.error;

/**
 * @param {Object} store
 * @return {Post[]}
 */
export const selectPosts = (store) => store.posts.posts;

/**
 * @param {string} id
 * @return {(store: Object) => Post | undefined}
 */
export const selectPostById = (id) => (store) => store.posts.posts.find((post) => post.id === id);

/**
 * @param {string} authorId
 * @return {(store: Object) => Post[]}
 */
export const selectPostsByAuthorId = (authorId) => (store) => {
	return store.posts.posts.filter((post) => post.authorId === authorId);
};

export const { updatePost, addValueToEmojiReactionCount } = postsSlice.actions;

export default postsSlice.reducer;
