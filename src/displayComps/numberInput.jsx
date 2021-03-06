import React from 'react';
import PropTypes from 'prop-types';

const NumberInput = props => {
  const { value, handleInputChange, title, name, htmlFor, min, max, placeholder } = props;
  return (
    <>
      {title && htmlFor && (
        <label className="form-label" htmlFor={htmlFor}>
          {title}
        </label>
      )}
      <input
        className="number-input"
        id={htmlFor}
        name={name}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        min={min}
        max={max}
      />
    </>
  );
};

export default NumberInput;

NumberInput.propTypes = {
  value: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  htmlFor: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  placeholder: PropTypes.string
};
