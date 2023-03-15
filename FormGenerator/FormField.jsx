import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';

const FormField = ({ input, value, onChange, onBlur, errors, showErrors }) => {
  const { type, name, placeholder, required, minLength, maxLength, pattern } =
    input;

  const error = showErrors && errors ? errors.join(', ') : null;

  return (
    <div>
      <label htmlFor={name}>{name}</label>
      <Input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
      />
    </div>
  );
};

FormField.propTypes = {
  input: PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    required: PropTypes.bool,
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
    pattern: PropTypes.string,
  }).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  showErrors: PropTypes.bool,
};

export default FormField;
