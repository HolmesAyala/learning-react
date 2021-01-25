const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const faker = require('faker');
const { sub } = require('date-fns');
const express = require('express');
const DEFAULT_EMOJI_REACTIONS = require('./DEFAULT_EMOJI_REACTIONS');
const _ = require('lodash');

const expressServer = express();

expressServer.use(cors());
expressServer.use(express.json());
expressServer.use((req, res, next) => {
	setTimeout(() => {
		next();
		// res.status(500).send();
	}, 2000);
});

const USERS = [
	{ id: faker.random.uuid(), name: faker.name.findName() },
	{ id: faker.random.uuid(), name: faker.name.findName() },
	{ id: faker.random.uuid(), name: faker.name.findName() },
];

expressServer.get('/users', (req, res) => {
	res.json(USERS);
});

const POSTS = [
	{
		id: faker.random.uuid(),
		createdAt: sub(new Date(), { minutes: 5 }).toISOString(),
		title: faker.name.title(),
		content: faker.lorem.words(_.random(3, 10)),
		authorId: _.sample(USERS).id,
		emojiReactions: _.cloneDeep(DEFAULT_EMOJI_REACTIONS),
	},
	{
		id: faker.random.uuid(),
		createdAt: sub(new Date(), { minutes: 25 }).toISOString(),
		title: faker.name.title(),
		content: faker.lorem.words(_.random(3, 10)),
		authorId: _.sample(USERS).id,
		emojiReactions: _.cloneDeep(DEFAULT_EMOJI_REACTIONS),
	},
	{
		id: faker.random.uuid(),
		createdAt: sub(new Date(), { hours: 5 }).toISOString(),
		title: faker.name.title(),
		content: faker.lorem.words(_.random(3, 10)),
		authorId: _.sample(USERS).id,
		emojiReactions: _.cloneDeep(DEFAULT_EMOJI_REACTIONS),
	},
];

expressServer.get('/posts', (req, res) => {
	res.json(POSTS);
});

expressServer.post('/posts', (req, res) => {
	const newPost = {
		id: faker.random.uuid(),
		createdAt: new Date().toISOString(),
		emojiReactions: _.clone(DEFAULT_EMOJI_REACTIONS),
		title: req.body.title,
		content: req.body.content,
		authorId: req.body.authorId,
	};

	POSTS.push(newPost);

	res.json(newPost);
});

expressServer.listen(process.env.PORT, () => {
	console.log(`Api listen on localhost:${process.env.PORT}`);
});
