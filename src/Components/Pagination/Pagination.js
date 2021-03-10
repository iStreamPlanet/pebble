import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { borderType } from '../../Types';

import Block from '../Block/Block';
import Button from '../Button/Button';
import FieldSelect from '../FieldSelect/FieldSelect';

const propTypes = {
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
   * Additional css classes to apply
   */
  className: PropTypes.string,
  /**
   * Current page
   */
  currentPage: PropTypes.number.isRequired,
  /**
   * Max number of pages
   */
  numPages: PropTypes.number,
  /**
   * Callback when for when the page changes
   */
  onPageChange: PropTypes.func,
};

const defaultProps = {
  border: 'all',
};

/**
 * Provides a way to navigate ordered content that has been divided into pages.
 *
 * ---
 */

class Pagination extends React.PureComponent {
  getMenuOptions = (numPages) => {
    const menuOptions = [];
    for (let i = 1; i <= numPages; i++) {
      menuOptions.push({ value: i, label: `${i}` });
    }
    return menuOptions;
  };

  onPageSelect = (selected) => {
    const { currentPage, onPageChange } = this.props;
    // call coming from the next/prev button, or from the FieldSelect
    const page =
      typeof selected === 'number' ? selected : selected.value;
    if (page !== currentPage) {
      onPageChange && onPageChange(page);
    }
  };

  getPageSelectDropdown = (current, total) => {
    const options = this.getMenuOptions(total);

    if (total !== undefined) {
      return (
        <Block alignItems="center" className="mr-4">
          <FieldSelect
            id="currentPageSelect"
            label="current page"
            hideLabel
            menuPlacement="auto"
            menuPortalTarget={document.body}
            options={options}
            onChange={this.onPageSelect}
            value={{ value: current, label: `${current}` }}
            width="96px"
            className="mr-2"
          />
          <Block textSize="6">{`of ${total}`}</Block>
        </Block>
      );
    }
  };

  render() {
    const { border, className, currentPage, numPages } = this.props;

    const classes = classNames('pagination', className);
    const numPagesInt = numPages ? Math.ceil(numPages) : undefined;

    return (
      <Block
        background="neutral-200"
        border={border}
        padding="3"
        alignItems="center"
        className={classes}
      >
        <Button
          disabled={currentPage === 1}
          onClick={() => this.onPageSelect(currentPage - 1)}
          icon="arrow-small-left"
          className="mr-4"
        >
          Prev
        </Button>
        {this.getPageSelectDropdown(currentPage, numPagesInt)}
        <Button
          disabled={currentPage === numPagesInt}
          onClick={() => this.onPageSelect(currentPage + 1)}
          iconAfterText="arrow-small-right"
        >
          Next
        </Button>
      </Block>
    );
  }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
Pagination.displayName = 'Pagination';

export default Pagination;
