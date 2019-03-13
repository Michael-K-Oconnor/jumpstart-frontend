import React from 'react';
import PropTypes from 'prop-types';

const TextArea = props => {
  const { title, rows, name, content, resize, placeholder, controlFunc, htmlFor } = props;
  return (
    <div className="form-group">
      {title && (
        <label className="form-label" htmlFor={htmlFor}>
          {title}
        </label>
      )}
      <textarea
        className="form-input"
        style={resize ? null : { resize: 'none' }}
        id={htmlFor}
        name={name}
        rows={rows}
        value={content}
        onChange={controlFunc}
        placeholder={placeholder}
      />
    </div>
  );
};

TextArea.propTypes = {
  title: PropTypes.string,
  htmlFor: PropTypes.string,
  rows: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  resize: PropTypes.bool,
  placeholder: PropTypes.string,
  controlFunc: PropTypes.func.isRequired
};

export default TextArea;
