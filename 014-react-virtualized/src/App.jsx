import { useState, useEffect } from 'react';
import './App.css';
import PropTypes from 'prop-types';

function PhotoItem(props) {
	return (
		<div className='photo-item'>
			<img className='image' src={props.item.urll} alt='example' />

			<h3 className='title'>{props.item.title}</h3>
		</div>
	);
}

PhotoItem.propTypes = {
	item: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		url: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
	}).isRequired,
};

function PhotoList(props) {
	const photoItemList = props.items.map((item) => {
		return <PhotoItem key={item.id} item={item} />;
	});

	return <div className='photo-list'>{photoItemList}</div>;
}

PhotoList.propTypes = {
	items: PropTypes.array.isRequired,
};

function App() {
	const [photos, setPhotos] = useState([]);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/photos')
			.then(response => response.json())
			.then((data) => { setPhotos(data) })
			.catch(error => console.log(error));
	}, []);

	return (
		<div>
			Application

			<PhotoList items={photos} />
		</div>
	);
}

export default App;
