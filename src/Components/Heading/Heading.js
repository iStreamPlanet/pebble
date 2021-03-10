import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { colorType, textAlignType } from '../../Types';

import './Heading.scss';

export const parseSize = (size, element) => {
  if (typeof size !== 'number') {
    size = parseInt(size, 10);
  }
  if (isNaN(size) || size < 1 || size > 6) {
    const defaultSize = element;
    size = defaultSize;
  }
  return size;
};

export const parseElement = (element) => {
  if (typeof element !== 'number') {
    element = parseInt(element, 10);
  }
  if (isNaN(element) || element < 1 || element > 6) {
    const { element: defaultElement } = Heading.defaultProps;
    element = defaultElement;
  }
  return element;
};

const propTypes = {
  /**
   * Contents of the heading
   */
  children: PropTypes.node.isRequired,
  /**
   * Additional classNames to add
   */
  className: PropTypes.string,
  /**
   * [Color identifier](/#/Styles/Color) of the text color
   * @type {PropTypes.Requireable<Color>}
   */
  color: colorType,
  /**
   * Semantic heading level, can passed as int or string
   * @type {PropTypes.Requireable<ElementSizeLike>}
   */
  element: PropTypes.oneOf([
    1,
    2,
    3,
    4,
    5,
    6,
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
  ]).isRequired,
  /**
   * should the font size be reduced for smaller viewports
   */
  responsive: PropTypes.bool,
  /**
   * appearance level, can passed as int or string
   * @type {PropTypes.Requireable<ElementSizeLike>}
   */
  size: PropTypes.oneOf([
    1,
    2,
    3,
    4,
    5,
    6,
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
  ]),
  /**
   * text alignment
   * @type {PropTypes.Requireable<TextAlign>}
   */
  textAlign: textAlignType,
  /**
   * Restrict the heading text to a single line and truncate with ellipsis if it is too long to all fit.
   */
  truncate: PropTypes.bool,
};

const defaultProps = {
  color: 'neutral-700',
  element: 2,
  responsive: true,
  textAlign: 'left',
};

/**
 * Headings are labels for sections or areas that make up an interface.
 * They can label an entire page, or sections of related content.
 * Our `Heading` component allows you to select an appropriate semantic
 * element (h1-h6) and independently set its size so that it is
 * appropriate for the surrounding content.

 * If you do not pass an explicit size, the Heading will pick the
 * size based on the element. By default headings will scale for mobile,
 * tablet and desktop [viewports](.//#/Styles/Media%20Query).
 *
 * ---
 */

function Heading({
  children,
  className,
  color,
  element,
  responsive,
  textAlign,
  truncate,
  size,
}) {
  const parsedElement = parseElement(element);
  const Element = `h${parsedElement}`;

  const parsedSize = size
    ? parseSize(size, parsedElement)
    : parsedElement;
  const headingSizeClass = responsive
    ? `heading-${parsedSize}-responsive`
    : `heading-${parsedSize}`;

  const classes = classNames(
    'heading',
    color,
    headingSizeClass,
    {
      truncate,
      [`text-${textAlign}`]: textAlign,
    },
    className,
  );

  return <Element className={classes}>{children}</Element>;
}

Heading.propTypes = propTypes;
Heading.defaultProps = defaultProps;
Heading.displayName = 'Heading';

export default Heading;
