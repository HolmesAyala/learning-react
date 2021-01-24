import actions from './actions';

const simpleQuack = actions.quack;

const complexQuack = (distance) => (dispatch) => {
	dispatch(actions.quack()).then(() => {
		dispatch(actions.swim());
		// Other actions with dispatch
	});
};

export default {
	simpleQuack,
	complexQuack,
};
