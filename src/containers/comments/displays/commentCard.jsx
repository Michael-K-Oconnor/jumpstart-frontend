import React from 'react';
import PropTypes from 'prop-types';

const CommentCard = props => {
  const { username, comment, createdAt } = props;
  return (
    <div className="comment-card">
      <p className="user">{username}</p>
      <p className="date">{createdAt}</p>
      <p className="comment">{comment}</p>
    </div>
  );
};

CommentCard.propTypes = {
  comment: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired
};

export default CommentCard;
