import React, { useState, Suspense } from 'react';
import './App.css';
/**
 * Pages
 */
const LazyLoading = React.lazy(() => import('./pages/LazyLoading'));

const Loading = () => <div>Loading...</div>;

function App() {
	const [viewPetList, setViewPetList] = useState(false);

	return (
		<div>
			<button onClick={() => setViewPetList(!viewPetList)}>
				Toggle page
			</button>

			{
				viewPetList &&
				<Suspense fallback={<Loading />}>
					<LazyLoading />
				</Suspense>
			}
		</div>
	);
}

export default App;
