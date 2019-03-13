import React from 'react';
import PropTypes from 'prop-types';
import TextArea from 'displayComps/textArea';

const CommentForm = props => {
  const { content, handleInputChange, handleSubmit } = props;
  return (
    <form>
      <TextArea
        rows={3}
        name="commentInput"
        content={content}
        resize={false}
        placeholder="Add a comment!"
        controlFunc={handleInputChange}
      />
      <input type="submit" value="Submit comment" onClick={handleSubmit} />
    </form>
  );
};

CommentForm.propTypes = {
  content: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default CommentForm;
