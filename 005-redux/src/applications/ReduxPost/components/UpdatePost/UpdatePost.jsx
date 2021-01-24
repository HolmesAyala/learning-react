import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
/**
 * Styles
 */
import styleSheet from './UpdatePost.module.scss';
/**
 * Store
 */
import { useDispatch, useSelector } from 'react-redux';
import { updatePost, selectPostById } from '../../store/posts/postsReducer';
import { selectUsers } from '../../store/users/usersReducer';

const UpdatePost = (props) => {
  const dispatch = useDispatch();

  /**
   * State variables
   */

  const post = useSelector(selectPostById(props.id));
  const users = useSelector(selectUsers);

  // Fields
  const [titleFieldValue, setTitleFieldValue] = useState('');
  const [contentFieldValue, setContentFieldValue] = useState('');
  const [authorId, setAuthorId] = useState('');

  /**
   * Effects
   */

  useEffect(() => {
    if (post) {
      setTitleFieldValue(post.title);
      setContentFieldValue(post.content);
      setAuthorId(post.authorId);
    } else {
      setTitleFieldValue('');
      setContentFieldValue('');
      setAuthorId('');
    }
  }, [post]);

  /**
   * Component events
   */

  const onChangeValueInTitleField = (event) => setTitleFieldValue(event.target.value);
  const onChangeValueInContentField = (event) => setContentFieldValue(event.target.value);

  const onChangeValueInAuthorDropdown = useCallback((event) => {
    setAuthorId(event.target.value);
  }, []);

  const onClickInSaveChangesButton = () => {
    dispatch(updatePost({
      id: props.id,
      title: titleFieldValue.trim(),
      content: contentFieldValue.trim(),
      authorId
    }));
  }

  /**
   * Components
   */

  const authorOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const createButtonDisabled = (
    !titleFieldValue.trim() ||
    !contentFieldValue.trim() ||
    !authorId
  );

  if (!post) {
    return <h5>Post not found</h5>;
  }

  return (
    <section className={styleSheet.root}>
      <h3>Update post</h3>

      <div className={styleSheet.inputContainer}>
        <label htmlFor="TB_Title">Title</label>
        <input id='TB_Title' type="text" value={titleFieldValue} onChange={onChangeValueInTitleField} />
      </div>

      <div className={styleSheet.inputContainer}>
        <label htmlFor="TA_Content">Content</label>
        <textarea id='TA_Content' rows={5} value={contentFieldValue} onChange={onChangeValueInContentField} />
      </div>

      <div className={styleSheet.inputContainer}>
        <label htmlFor="DD_Author">Author</label>
        <select id="DD_Author" value={authorId} onChange={onChangeValueInAuthorDropdown}>
          <option value="">-- Select author --</option>
          {authorOptions}
        </select>
      </div>

      <button type='button' disabled={createButtonDisabled} onClick={onClickInSaveChangesButton}>
        Save changes
      </button>
    </section>
  );
}

UpdatePost.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
}

export default UpdatePost;
