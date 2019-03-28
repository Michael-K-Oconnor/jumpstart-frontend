import React from 'react';
import PropTypes from 'prop-types';

const TextArea = props => {
  const { content, handleInputChange, title, name, rows, htmlFor, resize, placeholder } = props;
  return (
    <>
      {title && htmlFor && (
        <label className="form-label" htmlFor={htmlFor}>
          {title}
        </label>
      )}
      <textarea
        className="form-input"
        style={resize ? null : { resize: 'none' }}
        id={htmlFor}
        name={name}
        rows={rows || 3}
        value={content}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
    </>
  );
};

export default TextArea;

TextArea.propTypes = {
  content: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  rows: PropTypes.number,
  htmlFor: PropTypes.string,
  resize: PropTypes.bool,
  placeholder: PropTypes.string
};
