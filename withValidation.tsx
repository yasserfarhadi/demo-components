import React, { ComponentType } from 'react';

type ValidationHOCProps<T> = {
  initialValues: T;
  onSubmit: (values: T) => void;
  validationSchema: {
    [K in keyof T]: (value: T[K]) => string | undefined;
  };
};

type ValidationHOCState<T> = {
  values: T;
  errors: {
    [K in keyof T]: string | undefined;
  };
};

function withValidation<T>(WrappedComponent: ComponentType<any>) {
  return class ValidationHOC extends React.Component<
    ValidationHOCProps<T>,
    ValidationHOCState<T>
  > {
    state: ValidationHOCState<T> = {
      values: this.props.initialValues,
      errors: {} as ValidationHOCState<T>['errors'],
    };

    handleChange = <K extends keyof T>(name: K, value: T[K]) => {
      const errors = { ...this.state.errors };
      const errorMessage = this.props.validationSchema[name](value);
      errors[name] = errorMessage;
      this.setState((prevState) => ({
        values: { ...prevState.values, [name]: value },
        errors,
      }));
    };

    handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      const hasErrors = Object.values(this.state.errors).some(
        (error) => error !== undefined
      );
      if (!hasErrors) {
        this.props.onSubmit(this.state.values);
      }
    };

    render() {
      const { initialValues, validationSchema, ...props } = this.props;
      return (
        <WrappedComponent
          {...props}
          values={this.state.values}
          errors={this.state.errors}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      );
    }
  };
}

export default withValidation;
