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
 * @typedef {Object} Post
 * @property {string} id
 * @property {string} createdAt
 * @property {string} title
 * @property {string} content
 * @property {string} authorId
 * @property {EmojiReaction[]} emojiReactions
 */

/**
 * @typedef {Object} State
 * @property {Status} status
 * @property {string} error
 * @property {Post[]} posts
 */

/** @type {State} */
export default {
	status: Status.IDLE,
	error: '',
	posts: [],
};
