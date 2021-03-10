import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Block from '../Block/Block';
import Button from '../Button/Button';
import Text from '../Text/Text';

import './Input.scss';

const propTypes = {
  /**
   * Sets aria-label attribute.
   */
  ariaLabel: PropTypes.string,
  /**
   * Sets aria-labelledby attribute.
   */
  ariaLabelledby: PropTypes.string,
  /**
   * Sets aria-describedby attribute.
   */
  ariaDescribedBy: PropTypes.string,
  /**
   * Specifies whether or not an input field should have autocomplete enabled
   */
  autoComplete: PropTypes.oneOf(['on', 'off']),
  /**
   * The autofocus attribute of the input
   */
  autoFocus: PropTypes.bool,
  /**
   * If the input should be disabled and not focusable
   */
  disabled: PropTypes.bool,
  /**
   * If the input should appear invalid
   */
  isInvalid: PropTypes.bool,
  /**
   * If the value of the input can be read, but not changed
   */
  isReadOnly: PropTypes.bool,
  /**
   * The id attribute of the input
   */
  id: PropTypes.string,
  /**
   * Maximum length the input value can be
   */
  maxLength: PropTypes.number,
  /**
   * The name attribute of the input
   */
  name: PropTypes.string,
  /**
   * Callback function when input is blurred
   */
  onBlur: PropTypes.func,
  /**
   * Callback function when input is changed
   */
  onChange: PropTypes.func,
  /**
   * Callback function when input is focused
   */
  onFocus: PropTypes.func,
  /**
   * A short hint that is displayed when there is no value
   */
  placeholder: PropTypes.string,
  /**
   * Text or node to display before the value
   */
  prefix: PropTypes.node,
  /**
   * Is the input required
   */
  required: PropTypes.bool,
  /**
   * The [spellcheck](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/spellcheck) attribute of the input
   */
  spellCheck: PropTypes.bool,
  /**
   * Text or node to display after the value
   */
  suffix: PropTypes.node,
  /**
   * Changes the size of the input, giving it more or less padding and font size
   * @type {PropTypes.Requireable<Size>}
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Input type attribute
   */
  type: PropTypes.string,
  /**
   * The value of the input on mount
   */
  defaultValue: PropTypes.string,
  /**
   * Additional classNames to add
   */
  className: PropTypes.string,
  /**
   * Elements to be rendered as children of this component
   */
  children: PropTypes.node,
  /**
   * The value of the input
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * If defined, a clear button will be rendered and will call this function when pressed
   */
  clearBtnFunc: PropTypes.func,
  /**
   * Display character count of the input value
   */
  showCharacterCount: PropTypes.bool,
};

const defaultProps = {
  autoComplete: 'off',
  autoFocus: false,
  disabled: false,
  isInvalid: false,
  // prevents React propType warning about read-only input
  onChange: () => {},
  required: false,
  size: 'medium',
  spellCheck: true,
  type: 'text',
};

/**
 * Input field that people can type values into.
 *
 * ---
 */

class Input extends React.PureComponent {
  getInputProps = () => {
    const {
      ariaLabel,
      ariaLabelledby,
      ariaDescribedBy,
      autoComplete,
      autoFocus,
      className,
      disabled,
      isInvalid,
      isReadOnly,
      id,
      maxLength,
      name,
      onBlur,
      onFocus,
      onChange,
      placeholder,
      required,
      size,
      spellCheck,
      type,
      value,
    } = this.props;

    const classes = classNames(
      'input',
      {
        'input-error': isInvalid,
        'input-s': size === 'small',
        'input-m': size === 'medium',
        'input-l': size === 'large',
        'bg-neutral-200': isReadOnly,
      },
      className,
    );

    return {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': !!isInvalid,
      autoComplete,
      autoFocus,
      className: classes,
      disabled,
      id,
      maxLength,
      name,
      onBlur,
      onFocus,
      onChange,
      placeholder,
      readOnly: isReadOnly,
      required,
      spellCheck,
      type,
      value,
    };
  };

  getPrefixMarkup() {
    const { prefix, size, isInvalid } = this.props;

    const classes = classNames(
      'input-prefix',
      {
        'input-s': size === 'small',
        'input-m': size === 'medium',
        'input-l': size === 'large',
      },
      {
        'input-error': isInvalid,
      },
    );

    if (prefix) {
      return <div className={classes}>{prefix}</div>;
    }
  }

  getSuffixMarkup() {
    const { suffix, size, isInvalid } = this.props;

    const classes = classNames(
      'input-suffix',
      {
        'input-s': size === 'small',
        'input-m': size === 'medium',
        'input-l': size === 'large',
      },
      {
        'input-error': isInvalid,
      },
    );

    if (suffix) {
      return <div className={classes}>{suffix}</div>;
    }
  }

  getClearBtnMarkup() {
    const { clearBtnFunc, value } = this.props;

    if (clearBtnFunc !== undefined && value !== '') {
      return (
        <Button
          plain
          icon="remove-circle"
          onClick={clearBtnFunc}
          accessibilityLabel="clear input value"
          className="input-clear-btn"
        />
      );
    }
  }

  getCharacterCountMarkup() {
    const { maxLength, showCharacterCount, value } = this.props;

    if (!showCharacterCount) return;

    const charValue = value !== '' ? value : '';
    const characterCount = charValue.length;

    const characterCountText = !maxLength
      ? characterCount
      : `${characterCount}/${maxLength}`;

    return (
      <Text size="6" className="pt-2">
        {characterCountText}
      </Text>
    );
  }

  render() {
    return (
      <>
        <Block alignItems="stretch" className="w-100 relative">
          {this.getPrefixMarkup()}
          <input {...this.getInputProps()} />
          {this.getSuffixMarkup()}
          {this.getClearBtnMarkup()}
        </Block>
        {this.getCharacterCountMarkup()}
      </>
    );
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;
Input.displayName = 'Input';

export default Input;
