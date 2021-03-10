import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Tab from './Components/Tab';
import Block from '../Block/Block';

import './Tabs.scss';

const propTypes = {
  children: PropTypes.node,
  /**
   * Additional classNames to add
   */
  className: PropTypes.string,
  /**
   * Takes up the full width of its parent container
   */
  fullWidth: PropTypes.bool,
  /**
   * Id of selected tab
   */
  selectedId: PropTypes.string,
  /**
   * List of tabs
   */
  tabs: PropTypes.arrayOf(PropTypes.object),
  /**
   * Callback function when a tab is selected
   */
  onSelect: PropTypes.func,
  /**
   * Changes the size of the tabs, giving it more or less padding and font size
   * @type {PropTypes.Requireable<Size>}
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

/**
 * A tab keeps related content in a single container that is shown and hidden through navigation
 *
 * ---
 */

export class Tabs extends React.PureComponent {
  render() {
    const {
      className,
      fullWidth,
      tabs,
      onSelect,
      selectedId,
      size,
      children,
      ...rest
    } = this.props;

    const classes = classNames(className, 'relative');

    const getTabsMarkup = () => {
      if (tabs) {
        const selected =
          selectedId === '' || selectedId === undefined
            ? tabs[0].id
            : tabs[tabs.findIndex((tab) => tab.id === selectedId)].id;

        return tabs.map((tab) => (
          <Tab
            label={tab.label}
            id={tab.id}
            key={tab.id}
            isSelected={selected === tab.id}
            fullWidth={fullWidth}
            onClick={onSelect}
            size={size}
            disabled={tab.disabled}
            ariaControls={tab.panelId}
          />
        ));
      }
      const selected =
        selectedId === '' || selectedId === undefined
          ? children[0].props.tabId
          : selectedId;

      return React.Children.map(children, (child) => (
        <Tab
          label={child.props.label}
          id={child.props.tabId}
          key={child.props.tabId}
          isSelected={selected === child.props.tabId}
          fullWidth={fullWidth}
          onClick={onSelect}
          size={size}
          disabled={child.props.disabled}
          ariaControls={child.props.id}
        />
      ));
    };

    const getSelectedTabContent = () => {
      if (tabs) {
        const selectedIndex =
          selectedId === '' || selectedId === undefined
            ? 0
            : tabs.findIndex((tab) => selectedId === tab.id);

        return (
          <Block
            id={tabs[selectedIndex].panelId}
            as="section"
            role="tabpanel"
            aria-labelledby={tabs[selectedIndex].id}
          >
            {tabs[selectedIndex].content}
          </Block>
        );
      }
      const childArray = React.Children.toArray(children);

      const selectedIndex =
        selectedId === '' || selectedId === undefined
          ? 0
          : childArray.findIndex(
              (child) => selectedId === child.props.tabId,
            );

      return childArray[selectedIndex];
    };

    return (
      <Block displayBlock className={classes}>
        <Block
          as="ul"
          role="tablist"
          className="tabs"
          onScroll={this.trackScrolling}
          {...rest}
        >
          {getTabsMarkup()}
        </Block>
        {getSelectedTabContent()}
      </Block>
    );
  }
}

Tabs.propTypes = propTypes;
Tabs.displayName = 'Tabs';

export default Tabs;
