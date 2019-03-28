import React from 'react';
import PropTypes from 'prop-types';

const SubmitButton = props => {
  const { handleFormSubmit, isDisabled, buttonText, name } = props;
  return (
    <input
      type="submit"
      name={name}
      className="submit-button"
      value={buttonText || 'Submit'}
      onClick={handleFormSubmit}
      disabled={isDisabled || false}
    />
  );
};

SubmitButton.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  buttonText: PropTypes.string
};

export default SubmitButton;
