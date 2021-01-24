import { createSlice } from '@reduxjs/toolkit';
import faker from 'faker';

export const initialState = [
	{ id: faker.random.uuid(), name: faker.name.findName() },
	{ id: faker.random.uuid(), name: faker.name.findName() },
	{ id: faker.random.uuid(), name: faker.name.findName() },
];

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
});

export const selectUsers = (store) => store.users;

export const selectUserById = (id) => (store) => store.users.find((user) => user.id === id);

export default userSlice.reducer;
