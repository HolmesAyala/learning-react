import React, { useState, useCallback } from 'react';
/**
 * Store
 */
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCounter,
  increment,
  decrement,
  changeBy,
  changeByAsync
} from '../redux/counterReducer';


const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector(selectCounter);

  const [inputValue, setInputValue] = useState('');

  /**
   * Component events
   */

  const onChangeValueOnInput = useCallback(event => {
    setInputValue(event.target.value);
  }, []);

  const onClickInChangeByAmountButton = useCallback(() => {
    dispatch(changeBy(Number(inputValue)));
  }, [dispatch, inputValue]);

  const onClickInChangeByAmountAsyncButton = useCallback(() => {
    dispatch(changeByAsync(Number(inputValue)));
  }, [dispatch, inputValue]);

  const onClickInAddButton = useCallback(() => {
    dispatch(increment());
  }, [dispatch]);

  const onClickInLessButton = useCallback(() => {
    dispatch(decrement());
  }, [dispatch]);

  return (
    <div>
      <div>
        <input type='number' value={inputValue} onChange={onChangeValueOnInput} />

        <button onClick={onClickInChangeByAmountButton}>Add</button>

        <button onClick={onClickInChangeByAmountAsyncButton}>Add async</button>
      </div>

      <button onClick={onClickInLessButton}>-</button>

      <span>{counter}</span>

      <button onClick={onClickInAddButton}>+</button>
    </div>
  );
}

export default Counter;
