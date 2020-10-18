import reducer from './reducers';
import actions from './actions';

describe('duck reducer', () => {
	describe('quack', () => {
		const quackAction = actions.quack;
		const initialState = false;

		const result = reducer(initialState, quackAction);

		it('should quack', () => {
			expect(result).toBe(true);
		});
	});
});
