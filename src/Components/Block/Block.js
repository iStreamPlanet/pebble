import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  getBorderStyle,
  getFlexPropertyClasses,
  getDimensionCss,
  getItemSpacingClasses,
  getOverflowClasses,
  getBorderRadiusClasses,
  getSpacingCss,
} from '../../Utils';
import {
  borderType,
  colorType,
  dimensionType,
  itemSpacingType,
  maxDimensionType,
  orderType,
  overflowType,
  radiusType,
  spacingType,
  textAlignType,
  textSizeType,
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
    PropTypes.oneOf([
      'start',
      'center',
      'end',
      'between',
      'around',
      'stretch',
    ]),
    PropTypes.array,
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
    PropTypes.oneOf([
      'start',
      'center',
      'end',
      'stretch',
      'baseline',
    ]),
    PropTypes.array,
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
    PropTypes.oneOf([
      'start',
      'center',
      'end',
      'stretch',
      'baseline',
    ]),
    PropTypes.array,
  ]),
  /**
   * [Color identifier](/#/Styles/Color) of the background color
   * @type {PropTypes.Requireable<Color>}
   */
  background: colorType,
  /**
   * The default size of an element before the remaining space is distributed
   * @type {PropTypes.Requireable<Basis>}
   */
  basis: PropTypes.oneOfType([
    PropTypes.oneOf([
      'auto',
      'full',
      '1/2',
      '1/4',
      '3/4',
      '1/3',
      '2/3',
    ]),
    PropTypes.string,
  ]),
  /**
   * By default, Blocks are `display:flex`. This sets the block element to be a block element instead.
   * When this is true, flex properties will be ignored
   */
  displayBlock: PropTypes.bool,
  /**
   *
   * Apply a `solid 1px neutral-300` border to a specific side by passing one of the following strings:
   *
   * 'all', 'vertical', 'horizontal', 'top', 'right', 'bottom', 'left'
   *
   * or the pass the shape:
   * ```
   * {
   *   color: "neutral-300",
   *   side: "all",
   *   size: "1px",
   *   style: "solid",
   * }
   * ```
   *
   * `color` [color identifier](/#/Styles/Color) of the border color
   */
  border: borderType,
  /**
   * Additional classNames to add
   */
  className: PropTypes.string,
  /**
   * Elements to be rendered as children of this component
   */
  children: PropTypes.node,
  /**
   * [Color identifier](/#/Styles/Color) of the text color
   * @type {PropTypes.Requireable<Color>}
   */
  color: colorType,
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
    }),
  ]),
  /**
   * A valid css width (%, px, em, rem) or a value of 1-9 corresponding to [height tokens](/#/Styles/Height).
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
    PropTypes.oneOf([
      'around',
      'between',
      'center',
      'evenly',
      'start',
      'end',
    ]),
    PropTypes.array,
  ]),
  /**
   * font size to apply to apply to all child text elements without explicitly set sizes,
   * based on the [typography scale](/#/Styles/Typography)
   *
   * One of: 1, 2, 3, 4, 5, 6, 7
   *
   * For responsive behavior, pass an array with length up to 4, with one of the above values.
   */
  textSize: textSizeType,
  /**
   * Margin [space](/#/Styles/Spacing) to be added around this block.
   * It models itself after the CSS [padding short property](https://developer.mozilla.org/en-US/docs/Web/CSS/margin),
   * where you can set the margin area on all four sides of an element.
   * It is shorthand for top, right, bottom, left.
   *
   * One of: 1, 2, 3, 4, 5, 6, 7 , 8
   *
   * For responsive behavior, pass an array with length up to 4, with one of the above values.
   * @type {PropTypes.Requireable<Spacing>}
   */
  margin: spacingType,
  /**
   * _**Use the margin prop instead. Support for this prop will end in a future release.**_
   *
   * Margin [space](/#/Styles/Spacing) to be added above this block.
   *
   * One of: 1, 2, 3, 4, 5, 6, 7 , 8
   *
   * For responsive behavior, pass an array with length up to 4, with one of the above values.
   * @type {PropTypes.Requireable<Spacing>}
   */
  marginTop: spacingType,
  /**
   * _**Use the margin prop instead. Support for this prop will end in a future release.**_
   *
   * Margin [space](/#/Styles/Spacing) to be added below this block.
   *
   * One of: 1, 2, 3, 4, 5, 6, 7 , 8
   *
   * For responsive behavior, pass an array with length up to 4, with one of the above values.
   * @type {PropTypes.Requireable<Spacing>}
   */
  marginBottom: spacingType,
  /**
   * A valid css width (%, px, em, rem), or a value of 1-9 corresponding to [width tokens](/#/Styles/Width), that sets the maximum width of the element.
   *
   * Or one of: 'none', 1, 2, 3, 4, 5, 6, 7, 8, 9, '1', '2', '3', '4', '5', '6', '7', '8', '9', 10, 20, 25, 30, 33, 34, 40, 50, 60, 70, 75, 80, 90, 100, '10', '20', '25', '30', '33', '34', '40', '50', '60', '70', '75', '80', '90', '100'
   *
   * For responsive behavior, pass an array with length up to 4, with a valid value for each element.
   */
  maxWidth: maxDimensionType,
  /**
   *  Controls the order in which the item appears in a flex container
   *
   * For responsive behavior, pass an array with length up to 4, with one of the above values.
   * @type {PropTypes.Requireable<Order>}
   */
  order: orderType,
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
  overflow: overflowType,
  /**
   * Padding [space](/#/Styles/Spacing) to be added within this block.
   * It models itself after the CSS [padding short property](https://developer.mozilla.org/en-US/docs/Web/CSS/padding),
   * where you can set the padding area on all four sides of an element.
   * It is shorthand for top, right, bottom, left.
   *
   * One of: 1, 2, 3, 4, 5, 6, 7 , 8
   *
   * For responsive behavior, pass an array with length up to 4, with one of the above values.
   * @type {PropTypes.Requireable<Spacing>}
   */
  padding: spacingType,
  /**
   * _**Use the padding prop instead. Support for this prop will end in a future release.**_
   *
   * Padding [space](/#/Styles/Spacing) to be added to the left and right. Will override a `padding` value.
   *
   * One of: 1, 2, 3, 4, 5, 6, 7 , 8
   *
   * For responsive behavior, pass an array with length up to 4, with one of the above values.
   * @type {PropTypes.Requireable<Spacing>}
   */
  paddingHorizontal: spacingType,
  /**
   * _**Use the padding prop instead. Support for this prop will end in a future release.**_
   *
   * Padding [space](/#/Styles/Spacing) to be added to the top and bottom. Will override a `padding` value.
   *
   * One of: 1, 2, 3, 4, 5, 6, 7 , 8
   *
   * For responsive behavior, pass an array with length up to 4, with one of the above values.
   * @type {PropTypes.Requireable<Spacing>}
   */
  paddingVertical: spacingType,
  /**
   *
   * _**Use the padding prop instead. Support for this prop will end in a future release.**_
   *
   * Amount of [space](/#/Styles/Spacing) between each block item
   *
   * One of: 1, 2, 3, 4, 5, 6, 7 , 8
   *
   * For responsive behavior, pass an array with length up to 4, with one of the above values.
   */
  itemSpacing: itemSpacingType,
  /**
   * Set the [radius](/#/Styles/Border) of all corners
   *
   * One of: 1, 2, 3, 4, 5, circle, pill
   *
   * For responsive behavior, pass an array with length up to 4, with one of the above values.
   * @type {PropTypes.Requireable<Radius>}
   */
  radius: radiusType,
  /**
   * react css style object
   */
  style: PropTypes.object,
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
   * A valid css width (%, px, em, rem) or a value of 1-9 corresponding to [width tokens](/#/Styles/Width).
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

const defaultProps = {
  as: 'div',
  direction: 'row',
  displayBlock: false,
};

/**
 * A `<Block>` is a layout component to build UIs with consistent
 * padding and vertical spacing between components. Use it to also set `font-size`.
 *
 * By using a `<Block>` component instead of a `div` for layouts,
 * you'll be able to maintain consistent component spacing by
 * using the padding and margin props instead
 * of custom CSS.
 */

class Block extends React.PureComponent {
  render() {
    const {
      alignContent,
      alignItems,
      alignSelf,
      as,
      background,
      basis,
      displayBlock,
      border,
      color,
      children,
      className,
      direction,
      flex,
      height,
      itemSpacing,
      justify,
      margin,
      marginTop,
      marginBottom,
      maxWidth,
      order,
      overflow,
      padding,
      paddingHorizontal,
      paddingVertical,
      radius,
      style,
      textAlign,
      textSize,
      truncate,
      width,
      wrap,
      ...props
    } = this.props;

    const mClasses = getSpacingCss('m', margin);
    const mtClasses = getSpacingCss('mt', marginTop);
    const mbClasses = getSpacingCss('mb', marginBottom);
    const pClasses = getSpacingCss('p', padding);
    const phClasses = getSpacingCss('ph', paddingHorizontal);
    const pvClasses = getSpacingCss('pv', paddingVertical);
    const fsClasses = getDimensionCss('fs', textSize);

    const radiusClass =
      radius !== undefined ? getBorderRadiusClasses(radius) : null;
    const overflowClasses =
      overflow !== undefined ? getOverflowClasses(overflow) : null;

    const directionClasses = !displayBlock
      ? getFlexPropertyClasses('flex', direction)
      : null;
    const widthStyles = getDimensionCss('width', width);
    const heightStyles = getDimensionCss('height', height);
    const maxWidthStyles = getDimensionCss('maxWidth', maxWidth);
    const justifyClasses = getFlexPropertyClasses('justify', justify);
    const alignContentClasses = getFlexPropertyClasses(
      'content',
      alignContent,
    );
    const alignItemsClasses = getFlexPropertyClasses(
      'items',
      alignItems,
    );
    const alignSelfClasses = getFlexPropertyClasses(
      'self',
      alignSelf,
    );
    const orderClasses = getFlexPropertyClasses('order', order);

    const basisStyle = basis
      ? { flexBasis: BASIS_MAP[basis] || basis }
      : null;

    const flexGrowShrinkProp = (flex) => {
      if (displayBlock) return;

      if (typeof flex === 'boolean' || typeof flex === 'string') {
        return FLEX_MAP[flex];
      }
      if (typeof flex === 'object') {
        return `${flex.grow ? flex.grow : 0} ${
          flex.shrink ? flex.shrink : 0
        }`;
      }
    };

    const flexStyle = { flex: `${flexGrowShrinkProp(flex)}` };

    const borderWidthStyleObject = border
      ? getBorderStyle(border)
      : null;

    const borderColor = border
      ? typeof border === 'string'
        ? 'neutral-300'
        : border.color || 'neutral-300'
      : null;

    const mergedStyle = {
      ...flexStyle,
      ...basisStyle,
      ...borderWidthStyleObject,
      ...style,
    };

    Object.assign(mergedStyle, { width: widthStyles.styles });
    Object.assign(mergedStyle, { maxWidth: maxWidthStyles.styles });
    Object.assign(mergedStyle, { height: heightStyles.styles });
    Object.assign(mergedStyle, { padding: pClasses.styles });
    Object.assign(mergedStyle, { margin: mClasses.styles });

    const isDisplayBlock =
      displayBlock || (className ? className.includes('db') : false);

    const classes = classNames(
      directionClasses,
      overflowClasses,
      mClasses.classes,
      mbClasses.classes,
      mtClasses.classes,
      pClasses.classes,
      phClasses.classes,
      pvClasses.classes,
      fsClasses.classes,
      radiusClass,
      justifyClasses,
      alignContentClasses,
      alignItemsClasses,
      alignSelfClasses,
      orderClasses,
      widthStyles.classes,
      maxWidthStyles.classes,
      heightStyles.classes,
      color,
      {
        db: displayBlock,
        flex: !isDisplayBlock && !truncate,
        [`bg-${background}`]: background,
        'flex-wrap': wrap,
        [`text-${textAlign}`]: textAlign,
        'truncate db': truncate,
        [`b-${borderColor}`]: border,
      },
      className,
    );
    const calcDirection = displayBlock ? 'column' : direction;
    const spacingClasses =
      itemSpacing !== undefined
        ? getItemSpacingClasses(calcDirection, itemSpacing)
        : null;

    let blockChildren;

    if (typeof children === 'string') {
      blockChildren = children;
    } else {
      blockChildren =
        itemSpacing !== undefined
          ? React.Children.map(
              children,
              (child) =>
                child &&
                React.cloneElement(child, {
                  className: classNames(
                    child.props.className,
                    'block-item',
                    spacingClasses.classes,
                  ),
                }),
            )
          : children;
    }

    const Element = as;

    return (
      <Element className={classes} {...props} style={mergedStyle}>
        {blockChildren}
      </Element>
    );
  }
}

Block.propTypes = propTypes;
Block.defaultProps = defaultProps;
Block.displayName = 'Block';

export default Block;
