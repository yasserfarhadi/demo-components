import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  type,
  name,
  value,
  placeholder,
  onChange,
  onBlur,
  error,
  required,
  minLength,
  maxLength,
  pattern,
}) => {
  const inputProps = {
    type,
    name,
    value,
    placeholder,
    onChange,
    onBlur,
    required,
    minLength,
    maxLength,
    pattern,
  };

  return (
    <>
      <input {...inputProps} />
      {error && <span>{error}</span>}
    </>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  pattern: PropTypes.string,
};

export default Input;
