import React from 'react';
import PropTypes from 'prop-types';

const CommentCard = props => {
  const { username, comment, createdAt } = props;
  return (
    <div>
      <div className="comment">{comment}</div>
      <div className="comment">{username}</div>
      <div className="comment">{createdAt}</div>
    </div>
  );
};

CommentCard.propTypes = {
  comment: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired
};

export default CommentCard;
