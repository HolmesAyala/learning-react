import * as React from 'react';
import PropTypes from 'prop-types';
/**
 * Styles
 */
import styleSheet from './PostList.module.scss';
/**
 * Store
 */
import { useSelector, useDispatch } from 'react-redux';
import { selectPosts, addValueToEmojiReactionCount } from '../../store/posts/postsReducer';
import { selectUserById } from '../../store/users/usersReducer';
/**
 * Routing
 */
import { Link } from 'react-router-dom';
/**
 * Icons
 */
import { ReactComponent as EditIcon } from '../../../assets/pencil.svg';
/**
 * Utils
 */
import { parseISO, formatDistanceToNow } from 'date-fns';

const Author = ({ id }) => {
  const author = useSelector(selectUserById(id));

  return (
    <p className={styleSheet.author}>
      Author: <span className={styleSheet.name}>
        {author ? author.name : 'Unknown author'}
      </span>
    </p>
  );
}

Author.propTypes = {
  id: PropTypes.string.isRequired,
}

const TimeAgo = ({ isoDate }) => {
  let timeAgoText = '';

  if (isoDate) {
    const date = parseISO(isoDate);
    timeAgoText = `${formatDistanceToNow(date)} ago`
  }

  return <span className={styleSheet.timeAgoText} title={isoDate}>{timeAgoText}</span>;
};

TimeAgo.propTypes = {
  isoDate: PropTypes.string.isRequired,
}

/**
 * @typedef {(emoji: string) => void} OnReactionCallback
 */

/** 
 * @typedef {Object} ReactionButtonGroupProps
 * @property {{emoji:string, count:number}[]} reactions
 * @property {OnReactionCallback} [onReaction = () => {}]
 */

/**
 * @param {ReactionButtonGroupProps} props 
 */
const ReactionButtonGroup = (props) => {
  const { onReaction } = props;

  const onClickInReactionButton = React.useCallback(
    /**
     * @param {React.MouseEvent} event 
     */
    (event) => {
      onReaction(event.target.dataset.emoji)
    },
    [onReaction]
  );

  const buttonList = props.reactions.map(reaction => {
    return (
      <button
        key={reaction.emoji}
        className={styleSheet.reactionButton}
        data-emoji={reaction.emoji}
        onClick={onClickInReactionButton}
      >
        {reaction.emoji}
        &nbsp;
        {reaction.count}
      </button>
    );
  });

  return (
    <div className={styleSheet.reactionButtonGroup}>
      {buttonList}
    </div>
  );
}

ReactionButtonGroup.propTypes = {
  reactions: PropTypes.arrayOf(PropTypes.shape({
    emoji: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  })),
}

ReactionButtonGroup.defaultProps = {
  onReaction: () => { }
}

/**
 * @typedef {Object} PostCardProps
 * @property {import('../../store/posts/postsReducer').Post} post
 */

/**
 * @param {PostCardProps} props 
 */
const PostCard = (props) => {
  const { post } = props;

  const dispatch = useDispatch();

  const onReaction = React.useCallback(
    /** @type {OnReactionCallback} */
    (emoji) => {
      dispatch(addValueToEmojiReactionCount({
        postId: post.id,
        emoji,
        value: 1
      }));
    },
    [dispatch, post]
  );

  const editButton = (
    <Link to={`/applications/redux-post/posts/${props.post.id}?edit=1`} className={styleSheet.editButton}>
      <EditIcon />
    </Link>
  );

  const header = (
    <header>
      <Link to={`/applications/redux-post/posts/${props.post.id}`}>
        <h4>{props.post.title}</h4>
      </Link>

      {editButton}
    </header>
  );

  return (
    <div className={styleSheet.postItem}>
      {header}

      <Author id={props.post.authorId} />

      <TimeAgo isoDate={props.post.createdAt} />

      <p className={styleSheet.content}>{props.post.content}</p>

      <ReactionButtonGroup reactions={props.post.emojiReactions} onReaction={onReaction} />
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
}

const PostList = () => {
  const posts = useSelector(selectPosts);

  const postList = posts.map(post => {
    return <PostCard key={post.id} post={post} />;
  });

  return (
    <div className={styleSheet.root}>
      <h3>Post list</h3>

      <div className={styleSheet.postContainer}>
        {postList}
      </div>
    </div>
  );
}

export default PostList;
