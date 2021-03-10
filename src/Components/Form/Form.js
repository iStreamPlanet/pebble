import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FormLayout from '../FormLayout/FormLayout';

const propTypes = {
  /**
   * Contents of the form
   */
  children: PropTypes.node,
  /**
   * Additional css classes to apply to the Form
   */
  className: PropTypes.string,
  /**
   * Method used to submit the form
   */
  method: PropTypes.oneOf(['post', 'get']),
  /**
   * A unique name for the Form
   */
  name: PropTypes.string,
  /**
   * Callback function when the Form is changed
   */
  onChange: PropTypes.func,
  /**
   * Callback function when the Form is reset
   */
  onReset: PropTypes.func,
  /**
   * Callback function when the Form is submitted
   */
  onSubmit: PropTypes.func,
  /**
   * Decrease the vertical and horizontal spacing between inputs
   */
  tight: PropTypes.bool,
};

/**
 * A wrapper component that handles submission of a form
 * and automatically wraps its children in [FormLayout](/#/Components/FormLayout).
 *
 * ---
 */

class Form extends React.PureComponent {
  handleSubmit = (event) => {
    const { onSubmit } = this.props;

    event.preventDefault();
    onSubmit(event);
  };

  handleReset = (event) => {
    const { onReset } = this.props;
    event.preventDefault();
    onReset(event);
  };

  render() {
    const {
      children,
      className,
      method,
      name,
      onReset,
      onSubmit,
      onChange,
      tight,
      ...rest
    } = this.props;

    return (
      <form
        className={classNames(className, 'w-100')}
        method={method}
        name={name}
        onChange={onChange}
        onReset={this.handleReset}
        onSubmit={this.handleSubmit}
        {...rest}
      >
        <FormLayout tight={tight}>{children}</FormLayout>
      </form>
    );
  }
}

Form.propTypes = propTypes;
Form.displayName = 'Form';

export default Form;
