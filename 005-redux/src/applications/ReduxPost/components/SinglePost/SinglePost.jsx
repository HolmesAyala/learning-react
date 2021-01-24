import React from 'react';
import PropTypes from 'prop-types';
/**
 * Store
 */
import { useSelector } from 'react-redux';
import { selectPostById } from '../../store/posts/postsReducer';

const SinglePost = (props) => {
  const post = useSelector(selectPostById(props.id));

  if (!post) {
    return (
      <h5>Post not found</h5>
    );
  }

  return (
    <section>
      <h3>Post: {post.title}</h3>

      <p>{post.content}</p>
    </section>
  );
};


SinglePost.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};


export default SinglePost;
