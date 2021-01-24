import React from 'react';
/**
 * Styles
 */
import './App.css';
/**
 * Pages
 */
import ThemeButton from './pages/ThemeButton';
import UpdateFromNestedComponent from './pages/UpdateFromNestedComponent';

function App() {
	return (
		<div>
			<ThemeButton />

			<UpdateFromNestedComponent />
		</div>
	);
}

export default App;
