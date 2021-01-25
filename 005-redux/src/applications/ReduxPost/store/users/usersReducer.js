import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/**
 * @typedef {'idle' | 'loading' | 'successful' | 'error'} Status
 */

export const Status = {
	IDLE: 'idle',
	LOADING: 'loading',
	SUCCESSFUL: 'successful',
	ERROR: 'error',
};

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 */

/**
 * @typedef {Object} State
 * @property {Status} status
 * @property {string} error
 * @property {User[]} users
 */

/** @type {State} */
export const initialState = {
	status: Status.IDLE,
	error: '',
	users: [],
};

export const SLICE_NAME = 'users';

export const getUsersFromApi = createAsyncThunk(`${SLICE_NAME}/getUsersFromApi`, async () => {
	const response = await axios.get(`${process.env.REACT_APP_API_URL}/users`);

	return response.data;
});

const userSlice = createSlice({
	name: SLICE_NAME,
	initialState,
	reducers: {},
	extraReducers: {
		[getUsersFromApi.fulfilled]: (state, action) => {
			state.status = Status.SUCCESSFUL;

			state.users = action.payload;
		},
	},
});

/**
 * @param {Object} store
 * @return {User[]}
 */
export const selectUsers = (store) => store.users.users;

/**
 * @param {string} id
 * @return {(store: Object) => User | undefined}
 */
export const selectUserById = (id) => (store) => store.users.users.find((user) => user.id === id);

export default userSlice.reducer;
