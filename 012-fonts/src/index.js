import React from 'react';
import ReactDOM from 'react-dom';
/**
 * Styles
 */
import './index.css';
import FontFaceObserver from 'fontfaceobserver';
import variables from './styles/variables';
/**
 * Components
 */
const App = React.lazy(() => import('./App'));

const mainFont = new FontFaceObserver(variables.fonts.main.name);

mainFont
	.load()
	.then(() => {
		document.documentElement.classList.add('fonts-loaded');
	})
	.catch((error) => {
		console.log(error);
	});

ReactDOM.render(
	<React.StrictMode>
		<React.Suspense fallback={<div>Loading...</div>}>
			<App />
		</React.Suspense>
	</React.StrictMode>,
	document.getElementById('root')
);
