import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './ButtonGroup.scss';

const propTypes = {
  /**
   * Additional ClassNames to add to button group
   */
  className: PropTypes.string,
  /**
   * Contents of the group
   */
  children: PropTypes.node.isRequired,
  /**
   * Takes up the full width of its parent container
   */
  fullWidth: PropTypes.bool,
  /**
   * Changes the size of all buttons in the group
   * @type {PropTypes.Requireable<Size>}
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Removes space between buttons and combines them into a button bar
   */
  toolbar: PropTypes.bool,
};

const defaultProps = {
  children: null,
  fullWidth: false,
  toolbar: false,
};

/**
 * Display related [Buttons](/#/Components/Button) or
 * [LinkButtons](/#/Components/LinkButton) in a horizontal
 * row to help with spacing between buttons.
 *
 * ---
 */

function ButtonGroup(props) {
  const { children, className, toolbar, ...otherProps } = props;

  const classes = classNames('br2', className, {
    'btn-group': !toolbar,
    'btn-toolbar': toolbar,
    'btn-group-fullwidth': otherProps.fullWidth,
  });

  return (
    <div className={classes}>
      {React.Children.map(children, (child) => (
        <div
          key={child.key}
          className={toolbar ? 'btn-toolbar-item' : 'btn-group-item'}
        >
          {React.cloneElement(child, otherProps)}
        </div>
      ))}
    </div>
  );
}

ButtonGroup.propTypes = propTypes;
ButtonGroup.defaultProps = defaultProps;
ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
