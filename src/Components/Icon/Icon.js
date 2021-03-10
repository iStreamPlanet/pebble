import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import icons from './Icons';

import './Icon.scss';

const notFoundIcon = (
  <path
    fill="currentColor"
    d="M16 10V8h-2c-.1-.8-.3-1.5-.6-2.2l2-1.7-1.3-1.5-1.8 1.5-.9-.9C11.5 1.7 9.8 0 8 0S4.5 1.7 4.5 3.2c-.3.3-.6.5-.9.9L1.9 2.6.6 4.1l2 1.7c-.3.7-.5 1.4-.6 2.2H0v2h2c.1 1 .5 2 .9 2.9l-1.6 1.4 1.3 1.5 1.5-1.3c1 1 2.4 1.6 3.8 1.6s2.8-.6 3.8-1.6l1.5 1.3 1.3-1.5-1.6-1.4c.7-.9 1-1.9 1.1-2.9h2z"
  />
);

export const parseSize = (size) => {
  if (typeof size !== 'number') {
    size = parseInt(size, 10);
  }
  if (isNaN(size)) {
    const { size: defaultSize } = Icon.defaultProps;
    size = defaultSize;
  }
  return size;
};

const viewBoxSize = 16;

const propTypes = {
  /**
   * keeps the svg markup from being read aloud by assistive technologies
   */
  ariaHidden: PropTypes.bool,
  /**
   * descriptive text that will not be displayed but will provide context to assistive technologies
   */
  accessibilityLabel: PropTypes.string,
  /**
   * Additional classNames to add to the icon
   */
  className: PropTypes.string,
  /**
   * The name of the icon to display
   * @type {PropTypes.Requireable<keyof icons>}
   */
  name: PropTypes.string.isRequired,
  /**
   * Changes the size of the icon, passed as a string or int
   * @type {PropTypes.Requireable<16|20|24|32|48|56|64|'16'|'20'|'24'|'32'|'48'|'56'|'64'>}
   */
  size: PropTypes.oneOf([
    10,
    12,
    16,
    20,
    24,
    32,
    48,
    56,
    64,
    '10',
    '12',
    '16',
    '20',
    '24',
    '32',
    '48',
    '56',
    '64',
  ]),
};

const defaultProps = {
  ariaHidden: true,
  size: 16,
};

/**
 * Icons provide visual context and enhance usability.
 * Be mindful that not everyone is able to see icons.
 * When necessary, use alt text (`accessibilityLabel` prop or `aria-label` attribute)
 * to communicate icon meaning for assistive technologies
 *
 * ---
 *
 * @example ./IconExamples.md
 */
const Icon = forwardRef((props, ref) => {
  const {
    size,
    ariaHidden,
    accessibilityLabel,
    className,
    name,
    ...rest
  } = props;

  let iconName = name;
  /* istanbul ignore next */
  iconName = (typeof iconName === 'string'
    ? iconName
    : ''
  ).toLowerCase();

  const parsedSize = parseSize(size);

  let iconElements = icons[iconName];
  let iconFound = true;

  if (!iconElements) {
    iconElements = notFoundIcon;
    iconFound = false;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
      className={classNames(
        'icon',
        {
          'not-found': !iconFound,
          'animate spin infinite': iconName === 'spinner',
        },
        className,
      )}
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      height={`${parsedSize}px`}
      width={`${parsedSize}px`}
      fill="currentColor"
      ref={ref}
      {...rest}
    >
      {!!accessibilityLabel && <title>{accessibilityLabel}</title>}
      {iconElements}
    </svg>
  );
});

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;
Icon.displayName = 'Icon';

export default Icon;
