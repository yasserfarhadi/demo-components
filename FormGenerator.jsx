import React, { useState } from 'react';

function generateInputs(schema, values, errors, onChange) {
  return schema.map(({ type, name, label, options, ...rest }) => {
    switch (type) {
      case 'select':
        return (
          <div key={name} className="form-group">
            <label>{label}</label>
            <select
              name={name}
              value={values[name]}
              onChange={onChange}
              {...rest}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors[name] && <div className="error">{errors[name]}</div>}
          </div>
        );
      case 'textarea':
        return (
          <div key={name} className="form-group">
            <label>{label}</label>
            <textarea
              name={name}
              value={values[name]}
              onChange={onChange}
              {...rest}
            ></textarea>
            {errors[name] && <div className="error">{errors[name]}</div>}
          </div>
        );
      default:
        return (
          <div key={name} className="form-group">
            <label>{label}</label>
            <input
              type={type}
              name={name}
              value={values[name]}
              onChange={onChange}
              {...rest}
            />
            {errors[name] && <div className="error">{errors[name]}</div>}
          </div>
        );
    }
  });
}

function validate(schema, values) {
  let errors = {};
  schema.forEach(({ name, label, required, pattern }) => {
    if (required && !values[name]) {
      errors[name] = `${label} is required`;
    } else if (pattern && !pattern.test(values[name])) {
      errors[name] = `${label} is invalid`;
    }
  });
  return errors;
}

function FormGenerator({ schema }) {
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const errors = validate(schema, formValues);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      // do something with formValues
      setFormValues({});
      setFormErrors({});
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {generateInputs(schema, formValues, formErrors, handleChange)}
      <button type="submit">Submit</button>
    </form>
  );
}
