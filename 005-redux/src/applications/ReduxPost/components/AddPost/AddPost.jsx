import React, { useState, useCallback } from 'react';
/**
 * Styles
 */
import styleSheet from './AddPost.module.scss';
/**
 * Store
 */
import { useDispatch, useSelector } from 'react-redux';
import { addPostToApi } from '../../store/posts/postsReducer';
import { selectUsers } from '../../store/users/usersReducer';
// Utils
import { unwrapResult } from '@reduxjs/toolkit';

const AddPost = () => {
  const dispatch = useDispatch();

  /**
   * Store data
   */

  const users = useSelector(selectUsers);

  /**
   * State variables
   */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [titleFieldValue, setTitleFieldValue] = useState('');
  const [contentFieldValue, setContentFieldValue] = useState('');
  const [authorId, setAuthorId] = useState('');

  /**
   * Component events
   */

  const onChangeValueInTitleField = (event) => setTitleFieldValue(event.target.value);
  const onChangeValueInContentField = (event) => setContentFieldValue(event.target.value);

  const onChangeValueInAuthorDropdown = useCallback((event, value) => {
    setAuthorId(event.target.value);
  }, []);

  const onClickInCreatePostButton = async () => {
    try {
      setLoading(true);

      const actionResult = await dispatch(addPostToApi({
        title: titleFieldValue,
        content: contentFieldValue,
        authorId
      }));

      unwrapResult(actionResult);

      setTitleFieldValue('');
      setContentFieldValue('');
      setAuthorId('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Components
   */

  const errorAlert = error && (
    <div className={styleSheet.errorAlert}>
      {error}
    </div>
  );

  const authorOptions = users.map(user => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    );
  });

  const createButtonDisabled = (
    loading ||
    !titleFieldValue.trim() ||
    !contentFieldValue.trim() ||
    !authorId
  );

  return (
    <section className={styleSheet.root}>
      <h3>Add post</h3>

      {errorAlert}

      <div className={styleSheet.inputContainer}>
        <label htmlFor="TF_Title">Title</label>
        <input id='TF_Title' type="text" value={titleFieldValue} onChange={onChangeValueInTitleField} />
      </div>

      <div className={styleSheet.inputContainer}>
        <label htmlFor="TA_Content">Content</label>
        <textarea id='TA_Content' rows={5} value={contentFieldValue} onChange={onChangeValueInContentField} />
      </div>

      <div className={styleSheet.inputContainer}>
        <label htmlFor="DD_Author">Author</label>
        <select
          id="DD_Author"
          value={authorId}
          onChange={onChangeValueInAuthorDropdown}
        >
          <option value="">-- Select author --</option>
          {authorOptions}
        </select>
      </div>

      <button type='button' disabled={createButtonDisabled} onClick={onClickInCreatePostButton}>
        Create
      </button>
    </section>
  );
}

export default AddPost;
