import { createSlice, nanoid } from '@reduxjs/toolkit';
import _ from 'lodash';
import { sub } from 'date-fns';
import faker from 'faker';
import { initialState as usersInitialState } from '../users/usersReducer';

/**
 * @typedef {Object} EmojiReaction
 * @property {string} emoji
 * @property {number} count
 */

/**
 * @typedef {Object} Post
 * @property {string} id
 * @property {string} createdAt
 * @property {string} title
 * @property {string} content
 * @property {string} authorId
 * @property {EmojiReaction[]} emojiReactions
 */

/** @type {EmojiReaction[]} */
export const DEFAULT_EMOJI_REACTIONS = [
	{
		emoji: '👍',
		count: 0,
	},
	{
		emoji: '🎉',
		count: 0,
	},
	{
		emoji: '❤️',
		count: 0,
	},
	{
		emoji: '🚀',
		count: 0,
	},
	{
		emoji: '👀',
		count: 0,
	},
];

/** @type {Post[]} */
const initialState = [
	{
		id: faker.random.uuid(),
		createdAt: sub(new Date(), { minutes: 5 }).toISOString(),
		title: faker.name.title(),
		content: faker.lorem.words(_.random(3, 10)),
		authorId: _.sample(usersInitialState).id,
		emojiReactions: _.cloneDeep(DEFAULT_EMOJI_REACTIONS),
	},
	{
		id: faker.random.uuid(),
		createdAt: sub(new Date(), { minutes: 25 }).toISOString(),
		title: faker.name.title(),
		content: faker.lorem.words(_.random(3, 10)),
		authorId: _.sample(usersInitialState).id,
		emojiReactions: _.cloneDeep(DEFAULT_EMOJI_REACTIONS),
	},
	{
		id: faker.random.uuid(),
		createdAt: sub(new Date(), { hours: 5 }).toISOString(),
		title: faker.name.title(),
		content: faker.lorem.words(_.random(3, 10)),
		authorId: _.sample(usersInitialState).id,
		emojiReactions: _.cloneDeep(DEFAULT_EMOJI_REACTIONS),
	},
];

const postsSlice = createSlice({
	initialState,
	name: 'posts',
	reducers: {
		addPost: {
			reducer: (state, action) => {
				state.push(action.payload);
			},
			prepare: ({ title, content, authorId }) => {
				return {
					payload: {
						id: nanoid(),
						createdAt: new Date().toISOString(),
						emojiReactions: _.clone(DEFAULT_EMOJI_REACTIONS),
						title,
						content,
						authorId,
					},
				};
			},
		},
		updatePost(state, action) {
			const postToUpdate = state.find((post) => post.id === action.payload.id);

			if (postToUpdate) {
				postToUpdate.title = action.payload.title;
				postToUpdate.content = action.payload.content;
				postToUpdate.authorId = action.payload.authorId;
			}
		},
		/**
		 * @param {Post[]} state
		 * @param {{payload: {postId: string, emoji: string, value: string}}} action
		 */
		addValueToEmojiReactionCount(state, action) {
			const postToUpdate = _.find(state, { id: action.payload.postId });

			if (postToUpdate) {
				const emojiReaction = _.find(postToUpdate.emojiReactions, { emoji: action.payload.emoji });

				if (emojiReaction) {
					emojiReaction.count += action.payload.value;
				}
			}
		},
	},
});

/**
 * @param {Object} store
 * @returns {Post[]}
 */
export const selectPosts = (store) => store.posts;

/**
 * @param {string} id
 * @returns {(store:Object) => Post | undefined}
 */
export const selectPostById = (id) => (store) => store.posts.find((post) => post.id === id);

export const { addPost, updatePost, addValueToEmojiReactionCount } = postsSlice.actions;

export default postsSlice.reducer;
