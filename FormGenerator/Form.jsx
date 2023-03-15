import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormField from './FormField';

const Form = ({ inputs }) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // handle form submission logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      {inputs.map((input) => (
        <FormField
          key={input.name}
          name={input.name}
          label={input.label}
          type={input.type}
          options={input.options}
          value={formData[input.name] || ''}
          onChange={handleInputChange}
          required={input.required}
          minLength={input.minLength}
          maxLength={input.maxLength}
          pattern={input.pattern}
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

Form.propTypes = {
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['text', 'number', 'email', 'select']).isRequired,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
        })
      ),
      required: PropTypes.bool,
      minLength: PropTypes.number,
      maxLength: PropTypes.number,
      pattern: PropTypes.string,
    })
  ).isRequired,
};

export default Form;
