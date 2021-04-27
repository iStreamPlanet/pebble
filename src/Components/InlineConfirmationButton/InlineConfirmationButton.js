import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import Block from '../Block/Block';
import Button from '../Button/Button';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import PropTypes from 'prop-types';
import Text from '../Text/Text';

const propTypes = {
  /**
   * Additional classes to apply to container
   */
  className: PropTypes.string,
  /**
   * Disables the button, making it inoperable
   */
  disabled: PropTypes.bool,
  /**
   * The text for the confirmation button, visible after the initial button is pressed.
   * Clicking the button with this label with confirm the action and execute the `handleConfirmation` function.
   */
  confirmBtnLabel: PropTypes.string.isRequired,
  /**
   * Name of the [icon](/#/Components/Icon) to place before the button label text
   */
  icon: PropTypes.string,
  /**
   * Name of the [icon](/#/Components/Icon) to add after the button label text
   */
  iconAfterText: PropTypes.string,
  /**
   * The text for the rejection button, visible after the initial button is pressed.
   * Clicking the button with this label will result in no action being taken.
   */
  rejectBtnLabel: PropTypes.string.isRequired,
  /**
   * The text displayed after the initial button is pressed.
   */
  confirmationText: PropTypes.string.isRequired,
  /**
   * Time in milliseconds, the confirmation message should
   * stay visible until it hides itself
   */
  confirmDelay: PropTypes.number.isRequired,
  /**
   * The function to execute if the confirmation button is pressed.
   */
  handleConfirmation: PropTypes.func.isRequired,
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
   * Indicate that the button will perform a destructive action
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
   * Contents of the initial button
   */
  children: PropTypes.node.isRequired,
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
  disabled: false,
  confirmBtnLabel: 'Yes',
  confirmDelay: 5000,
  rejectBtnLabel: 'No',
  confirmationText: 'Are you sure?',
};

const variants = {
  popUp: () => {
    return {
      opacity: [0, 1],
      x: [24, 0],
      transition: {
        duration: 0.2,
        delay: 0.1,
      },
    };
  },
};

/**
 * Inline confirmation buttons may be used when an additional
 * response is required by the user to perform an action
 * (deleting or changing the state). This is a less disruptive
 * alternative to using a [Modal](/#/Components/Modal)
 * to confirm an action, because the confirmation is displayed in
 * the button's original on screen location.
 */

const InlineConfirmationButton = React.forwardRef((props, ref) => {
  const {
    children,
    className,
    confirmationText,
    confirmBtnLabel,
    confirmDelay,
    danger,
    disabled,
    fullWidth,
    handleConfirmation,
    icon,
    iconAfterText,
    onClick,
    onFocus,
    onBlur,
    plain,
    primary,
    rejectBtnLabel,
    size,
  } = props;
  const [initiated, setInitiated] = useState(false);

  const handleClick = () => {
    setInitiated(true);

    onClick && onClick();
  };

  useEffect(() => {
    if (!initiated) return;

    const cancelConfirm = setTimeout(() => {
      setInitiated(false);
    }, confirmDelay);
    return () => {
      clearTimeout(cancelConfirm);
    };
  }, [confirmDelay, initiated]);

  if (!initiated) {
    return (
      <Button
        size={size}
        primary={primary || danger}
        danger={danger}
        disabled={disabled}
        fullWidth={fullWidth}
        icon={icon}
        iconAfterText={iconAfterText}
        onClick={handleClick}
        onFocus={onFocus}
        onBlur={onBlur}
        plain={plain}
        className={className}
        ref={ref}
      >
        {children}
      </Button>
    );
  }
  return (
    // TODO: make style options configurable
    <motion.div
      style={{ opacity: 0 }}
      animate="popUp"
      variants={variants}
      className={className}
    >
      <Block alignItems="center" itemSpacing="2">
        <Text size={size === 'small' ? 6 : size === 'large' ? 4 : 5}>
          {confirmationText}
        </Text>
        <ButtonGroup>
          <Button size={size} onClick={() => setInitiated(false)}>
            {rejectBtnLabel}
          </Button>
          <Button
            size={size}
            primary
            danger={danger}
            onClick={() => {
              handleConfirmation();
              setInitiated(false);
            }}
          >
            {confirmBtnLabel}
          </Button>
        </ButtonGroup>
      </Block>
    </motion.div>
  );
});

InlineConfirmationButton.propTypes = propTypes;
InlineConfirmationButton.defaultProps = defaultProps;
InlineConfirmationButton.displayName = 'InlineConfirmationButton';

export default InlineConfirmationButton;
