import React, { useEffect, useState } from 'react';

import Block from '../Block/Block';
import FieldText from '../FieldText/FieldText';
import PropTypes from 'prop-types';
import { dimensionType } from '../../Types';

const propTypes = {
  /**
   * Specifies whether or not an input field should have autocomplete enabled
   */
  autoComplete: PropTypes.oneOf(['on', 'off']),
  /**
   * Automatically focus the input
   */
  autoFocus: PropTypes.bool,
  /**
   * Additional classNames to add
   */
  className: PropTypes.string,
  /**
   * Callback for a button to clear the input value
   */
  clearBtnFunc: PropTypes.func,
  /**
   * Delay in ms after input
   */
  delay: PropTypes.number,
  /**
   * label for the input
   */
  label: PropTypes.string.isRequired,
  /**
   * minimum number of characters before triggering a change
   */
  minimumCharacters: PropTypes.number,
  /**
   * Name attribute of the input
   */
  name: PropTypes.string,
  /**
   * Callback function when input is blurred
   */
  onBlur: PropTypes.func,
  /**
   * do NOT use this. Use onDebounce instead
   *
   * @ignore
   */
  onChange: (props, propName, componentName) => {
    if (props[propName]) {
      return new Error(
        `Invalid prop \`onChange\` supplied to \`${componentName}\`. Instead use onDebounce.`,
      );
    }
  },
  /**
   * Callback function when input is changed after the delay
   */
  onDebounce: PropTypes.func.isRequired,
  /**
   * Callback function when input is focused
   */
  onFocus: PropTypes.func,
  /**
   * A short hint that is displayed when there is no value
   */
  placeholder: PropTypes.string,
  /**
   * If the input should be disabled and not focusable
   */
  disabled: PropTypes.bool,
  /**
   * The id attribute of the input
   */
  id: PropTypes.string.isRequired,
  /**
   * Applies styling to indicate the input is invalid
   */
  isInvalid: PropTypes.bool,
  /**
   * If the value of the input can be read, but not changed
   */
  isReadOnly: PropTypes.bool,
  /**
   * Additional hint displayed beneath the input
   */
  helpText: PropTypes.node,
  /**
   * Visually hide the label
   */
  hideLabel: PropTypes.bool,
  /**
   * The [spellcheck](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/spellcheck) attribute of the input
   */
  ignoreSpellCheck: PropTypes.bool,
  /**
   * Changes the size of the input, giving it more or less padding and font size
   * @type {PropTypes.Requireable<Size>}
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Type attribute of the input
   */
  type: PropTypes.oneOf([
    'email',
    'password',
    'search',
    'tel',
    'text',
    'url',
  ]),
  /**
   * Text or node to display before the value
   */
  prefix: PropTypes.node,
  /**
   * Text or node to display after the value
   */
  suffix: PropTypes.node,
  /**
   * Text to display if the input is invalid.
   * The text should explain why the input is invalid.
   */
  validationText: PropTypes.string,
  /**
   * The value of the input
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
  autoComplete: 'off',
  autoFocus: false,
  clearBtnFunc: undefined,
  delay: 500,
  disabled: false,
  isInvalid: false,
  hideLabel: false,
  ignoreSpellCheck: false,
  isReadOnly: false,
  minimumCharacters: 2,
  onBlur: undefined,
  onChange: undefined,
  onFocus: undefined,
  size: 'medium',
  type: 'text',
  width: '100',
};

/**
 * Wrapped [FieldText](/#Components/FieldText) component that waits a specified delay before triggering a change.
 *
 * ---
 */

const FieldTextDebounce = ({
  clearBtnFunc,
  delay,
  hideLabel,
  onDebounce,
  onChange,
  onBlur,
  onFocus,
  size,
  value,
  minimumCharacters,
  ...rest
}) => {
  const [externalValue, setExternalValue] = useState(value);
  const [internalValue, setInternalValue] = useState(value);
  const [showMinimumMsg, setShowMinimumMsg] = useState(false);

  let internalClearBtnFunc;
  if (clearBtnFunc) {
    internalClearBtnFunc = () => {
      setInternalValue('');
      clearBtnFunc();
    };
  }

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    if (internalValue === value) {
      return;
    }

    const handler = setTimeout(() => {
      if (
        internalValue.length >= minimumCharacters ||
        internalValue.length === 0
      ) {
        setShowMinimumMsg(false);
        onDebounce(externalValue);
      } else {
        setShowMinimumMsg(true);
      }
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [
    internalValue,
    delay,
    minimumCharacters,
    onDebounce,
    value,
    externalValue,
  ]);

  const handleFocus = () => {
    if (onFocus) onFocus();
  };

  const handleBlur = (event) => {
    setShowMinimumMsg(false);
    if (onBlur) onBlur(event);
  };

  const handleChange = (event) => {
    const newValue = (event.target || {}).value;
    setInternalValue(newValue);
    setExternalValue(newValue);
  };

  let minMsgPosition = 'translateY(-3px)';

  if (hideLabel) {
    minMsgPosition = 'translateY(-113%)';
  }
  if (hideLabel && size === 'small') {
    minMsgPosition = '2px';
  }

  return (
    <div className="w-100 relative">
      {showMinimumMsg && (
        <Block
          padding="1 2"
          background="neutral-700"
          color="neutral-200"
          textSize={size === 'small' ? '7' : '6'}
          radius="2"
          margin="0 0 1"
          className="animate fadeIn absolute shadow-1"
          style={{
            zIndex: 2,
            right: 0,
            transform: minMsgPosition,
          }}
        >
          {minimumCharacters} character minimum
        </Block>
      )}
      <FieldText
        {...rest}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        value={internalValue}
        size={size}
        clearBtnFunc={internalClearBtnFunc}
        hideLabel={hideLabel}
      />
    </div>
  );
};

FieldTextDebounce.propTypes = propTypes;
FieldTextDebounce.defaultProps = defaultProps;
export default FieldTextDebounce;
