import React, { useState, useCallback } from 'react';
/**
 * Styles
 */
import styleSheet from './AddPost.module.scss';
/**
 * Store
 */
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../store/posts/postsReducer';
import { selectUsers } from '../../store/users/usersReducer';

const AddPost = () => {
  const dispatch = useDispatch();

  /**
   * Store data
   */

  const users = useSelector(selectUsers);

  /**
   * State variables
   */

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

  const onClickInCreatePostButton = () => {
    dispatch(addPost({
      title: titleFieldValue,
      content: contentFieldValue,
      authorId
    }));
  }

  /**
   * Components
   */

  const authorOptions = users.map(user => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    );
  });

  const createButtonDisabled = (
    !titleFieldValue.trim() ||
    !contentFieldValue.trim() ||
    !authorId
  );

  return (
    <section className={styleSheet.root}>
      <h3>Add post</h3>

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
