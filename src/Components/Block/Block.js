import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  getFlexPropertyClasses,
  getDimensionClasses,
  getItemSpacingClasses,
  getOverflowClasses,
  getBorderRadiusClasses,
  parseTextSize,
} from '../../Utils';
import {
  colorType, fontSizeType, textAlignType, radiusType, spacingType, dimensionType
} from '../../Types';

import './Block.scss';

const FLEX_MAP = {
  [true]: '1 1',
  [false]: '0 0',
  grow: '1 0',
  shrink: '0 1',
};

const BASIS_MAP = {
  auto: 'auto',
  full: '100%',
  '1/2': '50%',
  '1/4': '25%',
  '3/4': '75%',
  '1/3': '33.33%',
  '2/3': '66.66%',
};

const propTypes = {
  /**
   * The DOM tag to render the block as
   */
  as: PropTypes.string,
  /**
   * Alignment of the contents along the cross axis when there is extra space. This property has no effect when there is only one line of flex items.
   *
   * For responsive behavior, pass an array with length up to 4, where each element is one of the following.
   *
   * One of: `start`, `center`, `end`, `between`, `around`, `stretch`
   *
   * @type {PropTypes.Requireable<AlignContent>}
   */
  alignContent: PropTypes.oneOfType([
    PropTypes.oneOf(['start', 'center', 'end', 'between', 'around', 'stretch']),
    PropTypes.array
  ]),
  /**
   * Alignment of flex items laid out along the cross axis on the current line
   *
   * For responsive behavior, pass an array with length up to 4, where each element is one of the following.
   *
   * One of: `start`, `center`, `end`, `stretch`, `baseline`
   * @type {PropTypes.Requireable<AlignItems>}
   */
  alignItems: PropTypes.oneOfType([
    PropTypes.oneOf(['start', 'center', 'end', 'stretch', 'baseline']),
    PropTypes.array
  ]),
  /**
   * Alignment along the cross axis when contained in another Block
   *
   * For responsive behavior, pass an array with length up to 4, where each element is one of the following.
   *
   * One of: `start`, `center`, `end`, `stretch`, `baseline`
   * @type {PropTypes.Requireable<AlignSelf>}
   */
  alignSelf: PropTypes.oneOfType([
    PropTypes.oneOf(['start', 'center', 'end', 'stretch', 'baseline']),
    PropTypes.array
  ]),
  /**
   * [Color](/#/Styles/Color) identifier
   * @type {PropTypes.Requireable<Color>}
   */
  background: colorType,
  /**
   * The default size of an element before the remaining space is distributed
   * @type {PropTypes.Requireable<Basis>}
   */
  basis: PropTypes.oneOfType([
    PropTypes.oneOf(['auto', 'full', '1/2', '1/4', '3/4', '1/3', '2/3']),
    PropTypes.string
  ]),
  /**
   * Additional classNames to add
   */
  className: PropTypes.string,
  /**
   * Elements to be rendered as children of this component
   */
  children: PropTypes.node,
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
   * Whether flex-grow and/or flex-shrink is true and at a desired factor
   */
  flex: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['grow', 'shrink']),
    PropTypes.shape({
      grow: PropTypes.number,
      shrink: PropTypes.number,
    })
  ]),
  /**
   * A valid css width (%, px, em, rem).
   *
   * Or one of: 1, 2, 3, 4, 5, 6, 7, 8, 9, '1', '2', '3', '4', '5', '6', '7', '8', '9', 10, 20, 25, 30, 33, 34, 40, 50, 60, 70, 75, 80, 90, 100, '10', '20', '25', '30', '33', '34', '40', '50', '60', '70', '75', '80', '90', '100'
   *
   * For responsive behavior, pass an array with length up to 4, with one of the above values.
   */
  height: dimensionType,
  /**
   * Alignment of contents along the main axis
   *
   * For responsive behavior, pass an array with length up to 4, where each element is one of the following.
   *
   * One of: `around`, `between`, `center`, `evenly`, `start`, `end`
   * @type {PropTypes.Requireable<Justify>}
   */
  justify: PropTypes.oneOfType([
    PropTypes.oneOf(['around', 'between', 'center', 'evenly', 'start', 'end']),
    PropTypes.array,
  ]),
  /**
   * font size to apply to apply to all child text elements without explicitly set sizes, based on the [typography scale](/#/Styles/Typography)
   * @type {PropTypes.Requireable<FontSizeLike>}
   */
  textSize: fontSizeType,
  /**
   * Margin [space](/#/Styles/Spacing) to be added above this block.
   *
   * One of: 1, 2, 3, 4, 5, 6, 7 , 8
   *
   * For responsive behavior, pass an array with length up to 4, with one of the above values.
   * @type {PropTypes.Requireable<Spacing>}
   */
  marginTop: spacingType('marginTop'),
  /**
   * Margin [space](/#/Styles/Spacing) to be added below this block.
   *
   * One of: 1, 2, 3, 4, 5, 6, 7 , 8
   *
   * For responsive behavior, pass an array with length up to 4, with one of the above values.
   * @type {PropTypes.Requireable<Spacing>}
   */
  marginBottom: spacingType('marginBottom'),
  /**
   * Overflow behavior
   *
   * One of: 'auto', 'visible', 'hidden', 'scroll'
   *
   * or {"vertical": "...", "horizontal": "..."}
   *
   * For responsive behavior, pass an array with length up to 4, with a valid value for each element.
   * @type {PropTypes.Requireable<Overflow>}
   */
  overflow: PropTypes.oneOfType([
    PropTypes.oneOf(['auto', 'visible', 'hidden', 'scroll']),
    PropTypes.shape({
      horizontal: PropTypes.oneOf(['auto', 'visible', 'hidden', 'scroll']),
      vertical: PropTypes.oneOf(['auto', 'visible', 'hidden', 'scroll']),
    }),
    PropTypes.shape({
      horizontal: PropTypes.oneOf(['auto', 'visible', 'hidden', 'scroll']),
    }),
    PropTypes.shape({
      vertical: PropTypes.oneOf(['auto', 'visible', 'hidden', 'scroll']),
    }),
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.oneOf(['auto', 'visible', 'hidden', 'scroll']),
        PropTypes.arrayOf(
          PropTypes.shape({
            horizontal: PropTypes.oneOf(['auto', 'visible', 'hidden', 'scroll']),
            vertical: PropTypes.oneOf(['auto', 'visible', 'hidden', 'scroll']),
          })
        ),
        PropTypes.shape({
          horizontal: PropTypes.oneOf(['auto', 'visible', 'hidden', 'scroll']),
        }),
        PropTypes.shape({
          vertical: PropTypes.oneOf(['auto', 'visible', 'hidden', 'scroll']),
        }),
      ])
    )
  ]),
  /**
   * Padding [space](/#/Styles/Spacing) to be added uniformly within this block.
   *
   * One of: 1, 2, 3, 4, 5, 6, 7 , 8
   *
   * For responsive behavior, pass an array with length up to 4, with one of the above values.
   * @type {PropTypes.Requireable<Spacing>}
   */
  padding: spacingType('padding'),
  /**
   * Padding [space](/#/Styles/Spacing) to be added to the left and right. Will override a `padding` value.
   *
   * One of: 1, 2, 3, 4, 5, 6, 7 , 8
   *
   * For responsive behavior, pass an array with length up to 4, with one of the above values.
   * @type {PropTypes.Requireable<Spacing>}
   */
  paddingHorizontal: spacingType('paddingHorizontal'),
  /**
   * Set the [radius](/#/Styles/Border) of all corners
   *
   * One of: 1, 2, 3, 4, 5, circle, pill
   *
   * For responsive behavior, pass an array with length up to 4, with one of the above values.
   * @type {PropTypes.Requireable<Radius>}
   */
  radius: radiusType('radius'),
  /**
   * Padding [space](/#/Styles/Spacing) to be added to the top and bottom. Will override a `padding` value.
   *
   * One of: 1, 2, 3, 4, 5, 6, 7 , 8
   *
   * For responsive behavior, pass an array with length up to 4, with one of the above values.
   * @type {PropTypes.Requireable<Spacing>}
   */
  paddingVertical: spacingType('paddingVertical'),
  /**
   * Amount of [space](/#/Styles/Spacing) between each block item
   *
   * One of: 1, 2, 3, 4, 5, 6, 7 , 8
   *
   * For responsive behavior, pass an array with length up to 4, with one of the above values.
   * @type {PropTypes.Requireable<Spacing>}
   */
  itemSpacing: spacingType('itemSpacing'),
  /**
   * react css styles object
   */
  styles: PropTypes.object,
  /**
   * Text alignment within this block.
   * @type {PropTypes.Requireable<TextAlign>}
   */
  textAlign: textAlignType,
  /**
   * Restrict the heading text to a single line and truncate with ellipsis if it is too long to all fit.
   */
  truncate: PropTypes.bool,
  /**
   * A valid css width (%, px, em, rem).
   *
   * Or one of: 1, 2, 3, 4, 5, 6, 7, 8, 9, '1', '2', '3', '4', '5', '6', '7', '8', '9', 10, 20, 25, 30, 33, 34, 40, 50, 60, 70, 75, 80, 90, 100, '10', '20', '25', '30', '33', '34', '40', '50', '60', '70', '75', '80', '90', '100'
   *
   * For responsive behavior, pass an array with length up to 4, with one of the above values.
   */
  width: dimensionType,
  /**
   * Wrap children if they can not fit along main axis
   */
  wrap: PropTypes.bool,
};

/**
 * A `<Block>` is a layout component to build UIs with consistent
 * padding and vertical spacing between components. Use it to also set `font-size`.
 *
 * By using a `<Block>` component instead of a `div` for layouts,
 * you'll be able to maintain consistent component spacing by
 * using the padding and bottomSpacing props instead
 * of custom CSS.
 */

class Block extends React.Component {
  render() {
    const {
      alignContent,
      alignItems,
      alignSelf,
      as,
      background,
      basis,
      children,
      className,
      direction,
      flex,
      height,
      itemSpacing,
      justify,
      marginTop,
      marginBottom,
      overflow,
      padding,
      paddingHorizontal,
      paddingVertical,
      radius,
      styles,
      textAlign,
      textSize,
      truncate,
      width,
      wrap,
      ...props
    } = this.props;

    const mtClasses = getDimensionClasses('mt', marginTop);
    const mbClasses = getDimensionClasses('mb', marginBottom);
    const pClasses = getDimensionClasses('p', padding);
    const phClasses = getDimensionClasses('ph', paddingHorizontal);
    const pvClasses = getDimensionClasses('pv', paddingVertical);
    const radiusClass = radius !== undefined ? getBorderRadiusClasses(radius) : null;
    const overflowClasses = overflow !== undefined ? getOverflowClasses(overflow) : null;
    const directionClasses = getFlexPropertyClasses('flex', direction);
    const widthStyles = getDimensionClasses('width', width);
    const heightStyles = getDimensionClasses('height', height);
    const justifyClasses = getFlexPropertyClasses('justify', justify);
    const alignContentClasses = getFlexPropertyClasses('content', alignContent);
    const alignItemsClasses = getFlexPropertyClasses('items', alignItems);
    const alignSelfClasses = getFlexPropertyClasses('self', alignSelf);

    const parsedTextSize = textSize ? parseTextSize(textSize) : null;

    const basisStyle = basis ? { flexBasis: BASIS_MAP[basis] || basis } : null;

    const flexGrowShrinkProp = (flex) => {
      if (typeof flex === 'boolean' || typeof flex === 'string') {
        return FLEX_MAP[flex];
      }
      if (typeof flex === 'object') {
        return `${flex.grow ? flex.grow : 0} ${flex.shrink ? flex.shrink : 0}`;
      }
    };

    const flexStyle = { flex: `${flexGrowShrinkProp(flex)}` };

    const mergedStyle = {
      ...flexStyle, ...basisStyle, ...styles,
    };

    Object.assign(mergedStyle, { width: widthStyles.styles });
    Object.assign(mergedStyle, { height: heightStyles.styles });

    const classes = classNames(
      directionClasses,
      overflowClasses,
      mbClasses.classes,
      mtClasses.classes,
      pClasses.classes,
      phClasses.classes,
      pvClasses.classes,
      radiusClass,
      justifyClasses,
      alignContentClasses,
      alignItemsClasses,
      alignSelfClasses,
      widthStyles.classes,
      heightStyles.classes,
      typeof widthStyles === 'string' && widthStyles, { // width is percentage
        flex: !truncate,
        [`bg-${background}`]: background,
        'flex-wrap': wrap,
        [`fs-${parsedTextSize}`]: parsedTextSize,
        [`text-${textAlign}`]: textAlign,
        'truncate db': truncate,
      }, className
    );

    const spacingClasses = itemSpacing !== undefined ? getItemSpacingClasses(direction, itemSpacing) : null;

    const blockChildren = itemSpacing !== undefined
      ? React.Children.map(children, child => React.cloneElement(
        child,
        { className: classNames(child.props.className, 'block-item', spacingClasses) }
      )) : children;

    const Element = as;

    return (
      <Element className={classes} {...props} style={mergedStyle}>
        {blockChildren}
      </Element>
    );
  }
}

Block.defaultProps = {
  as: 'div',
  direction: 'row',
};

Block.propTypes = propTypes;

export default Block;
