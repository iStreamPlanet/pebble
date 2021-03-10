import Block from '../Block/Block';
import Icon from '../Icon/Icon';
import PropTypes from 'prop-types';
import React from 'react';
import Text from '../Text/Text';
import Tooltip from '../Tooltip/Tooltip';
import formatters from '../../Utils/Formatters';
import useResponsiveLayout from '../../Hooks/UseResponsiveLayout';

const propTypes = {
  /**
   * Additional classNames to add
   */
  className: PropTypes.string,
  /**
   * An object where each key is the range, and the value of the key is the state. Or a custom function that returns one of the following: ["neutral", "warn", "danger", "success"]
   */
  colorRules: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /**
   * Custom formatter based on javascript [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat). Defaults to formatter.number.
   */
  formatter: PropTypes.func,
  /**
   * Supplemental information about the metric that can be seen via a [Tooltip](/#/Components/Tooltip)
   */
  helpText: PropTypes.node,
  /**
   * Number of decimal places to display (fixed-point notation)
   */
  precision: PropTypes.number,
  /**
   * Content that appears before the value
   */
  prefix: PropTypes.node,
  /**
   * Additional classNames to add to the prefix
   */
  prefixClassName: PropTypes.string,
  /**
   * Controls the text size of the value
   * @type {PropTypes.Requireable<Size>}
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Content that appears after the value
   */
  suffix: PropTypes.node,
  /**
   * Additional classNames to add to the suffix
   */
  suffixClassName: PropTypes.string,
  /**
   * The label of the metric. Be sure to include unit type if appropriate
   */
  title: PropTypes.node.isRequired,
  /**
   * Value of the metric
   */
  value: PropTypes.node.isRequired,
};

const defaultProps = {
  formatter: formatters.number,
  size: 'large',
};

function isBetween(value, min, max) {
  return value >= min && value < max;
}

const COLOR_MAP = {
  neutral: 'neutral-600',
  warn: 'yellow',
  danger: 'red',
  success: 'green',
};

const calculateColorFromValues = (cp, value) => {
  // eslint-disable-next-line no-unused-vars
  for (const k in cp) {
    const min = parseFloat(k.split('-')[0], 10);
    const max = parseFloat(k.split('-')[1], 10);
    const valueColor = cp[k];
    if (isBetween(value, min, max)) {
      return valueColor;
    }
  }
};

const getValueColor = (colorRules, value) => {
  let result;
  if (colorRules) {
    if (typeof colorRules === 'function') {
      result = COLOR_MAP[colorRules(value)];
    } else {
      result = COLOR_MAP[calculateColorFromValues(colorRules, value)];
    }
    if (result === undefined) {
      // eslint-disable-next-line no-console
      console.warn(
        'The colorRules result of',
        COLOR_MAP[colorRules(value)],
        'must be one of the following:',
        Object.keys(COLOR_MAP),
      );
    }
  }
  return result;
};

/**
 * Returns the font size of the Metric when give size small, medium or large
 * @param {string} size small, medium, large
 */

export const getMetricValueSize = (size) => {
  switch (size) {
    case 'large':
      return 1;
    case 'medium':
      return 2;
    case 'small':
      return 5;
    default:
      return 1;
  }
};

/**
 * Used to display statistic or metric (e.g. key performance indicator)
 *
 * ---
 */

function Metric(props) {
  const {
    className,
    colorRules,
    formatter,
    helpText,
    prefix,
    suffixClassName,
    prefixClassName,
    size,
    suffix,
    title,
    value,
  } = props;

  const [isPhone] = useResponsiveLayout();

  const renderValue = () => {
    if (typeof value === 'number' || typeof value === 'string') {
      return (
        <Text responsive bold size={getMetricValueSize(size)}>
          {formatter(value, props)}
        </Text>
      );
    }
    return value;
  };

  return (
    <Block flex direction="column" className={className}>
      <Block itemSpacing="2">
        <Text bold size={isPhone ? 7 : 6} color="neutral-500">
          {title}
        </Text>
        {helpText && (
          <Tooltip content={helpText}>
            <span>
              <Icon name="info-circle" className="neutral-500" />
            </span>
          </Tooltip>
        )}
      </Block>

      <Block
        color={getValueColor(colorRules, value)}
        alignItems="baseline"
        itemSpacing={[1, 1, 2]}
      >
        {prefix && <span className={prefixClassName}>{prefix}</span>}
        {renderValue()}
        {suffix && <span className={suffixClassName}>{suffix}</span>}
      </Block>
    </Block>
  );
}

Metric.propTypes = propTypes;
Metric.defaultProps = defaultProps;
Metric.displayName = 'Metric';
export default Metric;
