import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { caseInsensitiveStringCompare } from '../../Utils';

import Icon from '../Icon/Icon';
import Link from '../Link/Link';

import '../Button/Button.scss';

const propTypes = {
  /**
   * Visually hidden text for screen readers
   */
  accessibilityLabel: PropTypes.string,
  /**
   * A unique identifier for the Link
   */
  id: PropTypes.string,
  /**
   * Contents of the button
   */
  children: PropTypes.node,
  /**
   * Additional ClassNames to add to button
   */
  className: PropTypes.string,
  /**
   * Indicate pressing the button will perform a destructive action
   */
  danger: PropTypes.bool,
  /**
   * Disables the button, making it inoperable
   */
  disabled: PropTypes.bool,
  /**
   * Button takes up the full width of its parent container
   */
  fullWidth: PropTypes.bool,
  /**
   * Partial or full url the Link goes to
   */
  href: PropTypes.string,
  /**
   * Name of the [icon](/#/Components/Icon) to place before the button label text
   */
  icon: PropTypes.string,
  /**
   * Name of the [icon](/#/Components/Icon) to add after the button label text
   */
  iconAfterText: PropTypes.string,
  /**
   * Make the button have more visual weight to identify the primary call to action
   */
  primary: PropTypes.bool,
  /**
   * Changes the size of the button, giving it more or less padding and font size
   * @type {PropTypes.Requireable<Size>}
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Specify the tabIndex of the button
   */
  tabIndex: PropTypes.number,
};

const defaultProps = {
  children: null,
  danger: false,
  disabled: false,
  fullWidth: false,
  primary: false,
  size: 'medium',
  tabIndex: 0,
};

/**
 * A LinkButton is a hyperlink that looks like a button.
 * It applies the same styles from [Button](/#/Components/Button) to a [Link](/#/Components/Link) component.
 *
 * ---
 */

const LinkButton = forwardRef((props, ref) => {
  const {
    id,
    children,
    className,
    disabled,
    href,
    size,
    primary,
    danger,
    fullWidth,
    icon,
    iconAfterText,
    tabIndex,
    accessibilityLabel,
    ...rest
  } = props;

  const classes = classNames('btn', className, {
    'btn-lg': caseInsensitiveStringCompare(size, 'large'),
    'btn-sm': caseInsensitiveStringCompare(size, 'small'),
    'btn-primary': primary,
    'btn-danger': danger,
    'w-100': fullWidth,
    disabled,
  });

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
      'justify-between': icon && fullWidth,
      'justify-center': !icon && fullWidth,
    },
  );

  const content = (
    <span className={contentClasses}>
      {leftIcon}
      {children && <span className="btn-label">{children}</span>}
      {rightIcon}
    </span>
  );

  return disabled ? (
    // Render an `<a>` so toggling disabled/enabled state changes only the
    // `href` attribute instead of replacing the whole element.
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      id={id}
      className={classes}
      aria-label={accessibilityLabel}
      aria-disabled={disabled}
      ref={ref}
    >
      {content}
    </a>
  ) : (
    <Link
      id={id}
      className={classes}
      unstyled
      href={href}
      tabIndex={tabIndex}
      aria-label={accessibilityLabel}
      ref={ref}
      {...rest}
    >
      {content}
    </Link>
  );
});

LinkButton.propTypes = propTypes;
LinkButton.defaultProps = defaultProps;
LinkButton.displayName = 'LinkButton';

export default LinkButton;
