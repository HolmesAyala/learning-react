// @flow
import * as React from 'react';
import './App.css';

import TodoListFunction from './pages/TodoListFunction/TodoListFunction';
import type { Item } from './pages/TodoListFunction/TodoListFunction';

import TodoListClass from './pages/TodoListClass/TodoListClass';

const todoListData: Item[] = [
	{
		id: 1,
		text: 'Learn css'
	},
	{
		id: 2,
		text: 'Learn stylus'
	},
	{
		id: 3,
		text: 'Make tutorials'
	}
];

function App(): React.Node {
	const onSelectItem = (item: Item) => {
		console.log(item);
	}

	return (
		<div>
			<h1>Proving Flow for static typing</h1>

			<TodoListFunction title='To do (function)' items={todoListData} onSelectItem={onSelectItem} />

			<TodoListClass title='To do (class)' items={todoListData} onSelectItem={onSelectItem} />
		</div>
	);
}

export default App;
