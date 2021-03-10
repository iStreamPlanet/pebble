import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { dimensionType } from '../../Types';

import Block from '../Block/Block';
import FormLayoutRow from './Components/FormLayoutRow';

const propTypes = {
  /**
   * Content to display inside the form
   */
  children: PropTypes.node,
  /**
   * Additional classNames to add
   */
  className: PropTypes.string,
  /**
   * Orientation to layout children
   *
   * For responsive behavior, pass an array with length up to 4, with 'row' or 'column' as the value for each element.
   * @type {PropTypes.Requireable<Direction>}
   */
  direction: PropTypes.oneOfType([
    PropTypes.oneOf(['row', 'column']),
    PropTypes.array,
  ]),
  /**
   * Decrease the spacing between inputs
   */
  tight: PropTypes.bool,
  /**
   * A valid css width (%, px, em, rem).
   *
   * Or one of: 1, 2, 3, 4, 5, 6, 7, 8, 9, '1', '2', '3', '4', '5', '6', '7', '8', '9', 10, 20, 25, 30, 33, 34, 40, 50, 60, 70, 75, 80, 90, 100, '10', '20', '25', '30', '33', '34', '40', '50', '60', '70', '75', '80', '90', '100'
   *
   * For responsive behavior, pass an array with length up to 4, with one of the above values.
   */
  width: dimensionType,
};

const defaultProps = {
  children: null,
  tight: false,
  direction: 'column',
  width: '100',
};

/**
 * Arranges input fields within a [Form](/#/Components/Form) with standard spacing.
 *
 */
function FormLayout({
  children,
  className,
  direction,
  tight,
  ...rest
}) {
  return (
    <Block
      direction={direction}
      itemSpacing={tight ? 3 : 5}
      className={classNames(className)}
      {...rest}
    >
      {React.Children.map(children, (child) => {
        if (child && child.type === FormLayoutRow) {
          return React.cloneElement(child, { tight });
        }
        return child;
      })}
    </Block>
  );
}

FormLayout.propTypes = propTypes;
FormLayout.defaultProps = defaultProps;
FormLayout.displayName = 'FormLayout';

export default FormLayout;
