import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { caseInsensitiveStringCompare } from '../../Utils';

import Icon from '../Icon/Icon';

import './Button.scss';

const propTypes = {
  /**
   * Optional prop to specify the type of the Button
   * @see see [W3C](https://www.w3.org/TR/2011/WD-html5-20110525/the-button-element.html)
   * @type {PropTypes.Requireable<'button' | 'submit' | 'reset'>}
   */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /**
   * Additional ClassNames to add to button
   */
  className: PropTypes.string,
  /**
   * Contents of the button
   */
  children: PropTypes.node,
  /**
   * A unique identifier for the button
   */
  id: PropTypes.string,
  /**
   * Name of the [icon](/#/Components/Icon) to place before the button label text
   */
  icon: PropTypes.string,
  /**
   * Name of the [icon](/#/Components/Icon) to add after the button label text
   */
  iconAfterText: PropTypes.string,
  /**
   * Disables the button, making it inoperable
   */
  disabled: PropTypes.bool,
  /**
   * Replaces button contents with a spinner icon while a background action is being performed
   */
  loading: PropTypes.bool,
  /**
   * Changes the size of the button, giving it more or less padding and font size
   * @type {PropTypes.Requireable<Size>}
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Make the button have more visual weight to identify the primary call to action
   */
  primary: PropTypes.bool,
  /**
   * Indicate pressing the button will perform a destructive action
   */
  danger: PropTypes.bool,
  /**
   * Render the button as inline text without padding
   */
  plain: PropTypes.bool,
  /**
   * Button takes up the full width of its parent container
   */
  fullWidth: PropTypes.bool,
  /**
   * Specify the tabIndex of the button
   */
  tabIndex: PropTypes.number,
  /**
   * Visually hidden text for screen readers
   */
  accessibilityLabel: PropTypes.string,
  /**
   * Id of the element the button controls
   */
  ariaControls: PropTypes.string,
  /**
   * Tells screen reader the controlled element is expanded
   */
  ariaExpanded: PropTypes.bool,
  /**
   * Tells screen reader the element is pressed
   */
  ariaPressed: PropTypes.bool,
  /**
   * Callback when button is pressed
   */
  onClick: PropTypes.func,
  /**
   * Callback when button receives focus
   */
  onFocus: PropTypes.func,
  /**
   * Callback when focus leaves button
   */
  onBlur: PropTypes.func,
};

const defaultProps = {
  ariaExpanded: false,
  ariaPressed: false,
  children: null,
  danger: false,
  disabled: false,
  fullWidth: false,
  loading: false,
  onClick: undefined,
  onBlur: undefined,
  onFocus: undefined,
  plain: false,
  primary: false,
  tabIndex: 0,
  type: 'button',
};

/**
 * Buttons are used as triggers for actions. They are used in forms,
 * toolbars, modal dialogs and as stand-alone action triggers. Actions
 * almost always occur on the same page.
 *
 * ---
 */

// see https://github.com/yannickcr/eslint-plugin-react/issues/1555
// eslint-disable-next-line react/button-has-type
const Button = React.forwardRef((props, ref) => {
  const {
    id,
    children,
    className,
    danger,
    disabled,
    fullWidth,
    icon,
    iconAfterText,
    onClick,
    onFocus,
    onBlur,
    loading,
    plain,
    primary,
    size,
    tabIndex,
    type,
    accessibilityLabel,
    ariaControls,
    ariaExpanded,
    ariaPressed,
    ...otherProps
  } = props;

  const isDisabled = loading || disabled;

  const classes = classNames('btn', className, {
    'btn-loading': loading,
    'btn-lg': caseInsensitiveStringCompare(size, 'large'),
    'btn-sm': caseInsensitiveStringCompare(size, 'small'),
    'btn-primary': primary,
    'btn-danger': danger,
    'btn-plain': plain,
    'w-100': fullWidth,
  });

  const spinnerSVGMarkup = loading ? (
    <Icon name="spinner" className="btn-loading-spinner" />
  ) : null;

  const iconElement = function (name) {
    const iconSize = caseInsensitiveStringCompare(size, 'large')
      ? 20
      : 16;

    return <Icon name={name} size={iconSize} className="btn-icon" />;
  };

  const leftIcon = icon && iconElement(icon);
  const rightIcon = iconAfterText && iconElement(iconAfterText);

  const contentClasses = classNames(
    'btn-content',
    'flex',
    'items-center',
    {
      'justify-center': fullWidth,
    },
  );

  const content = (
    <div className={contentClasses}>
      {spinnerSVGMarkup}
      {leftIcon}
      {children && <span className="btn-label">{children}</span>}
      {rightIcon}
    </div>
  );

  return (
    /* eslint-disable react/button-has-type */
    <button
      disabled={isDisabled}
      id={id}
      type={type}
      className={classes}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={tabIndex}
      aria-label={accessibilityLabel}
      aria-controls={ariaControls}
      aria-expanded={ariaExpanded}
      aria-pressed={ariaPressed}
      aria-busy={loading ? true : undefined}
      ref={ref}
      {...otherProps}
    >
      {content}
    </button>
    /* eslint-enable react/button-has-type */
  );
});

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
Button.displayName = 'Button';

export default Button;
