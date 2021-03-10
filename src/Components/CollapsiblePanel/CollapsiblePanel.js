import Block from '../Block/Block';
import Icon from '../Icon/Icon';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  /**
   * contents of the panel
   */
  children: PropTypes.node,
  /**
   * This value can be used to open the panel in the Accordion
   */
  id: PropTypes.string.isRequired,
  /**
   * A string or element to use as the button that expands/collapses the panel
   */
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
    .isRequired,
  /**
   * Are the panel contents visible
   */
  open: PropTypes.bool,
  /**
   * Function to call when the label is pressed
   */
  onToggle: PropTypes.func,
};

/**
 * A detail/summary element that provides a way to display information when the component is in an "open" state
 *
 */

function CollapsiblePanel(props) {
  const { children, id, label, open, onToggle, ...rest } = props;

  const arrowIcon = open ? 'arrow-small-up' : 'arrow-small-down';

  const handleClick = (event) => {
    event.preventDefault();
    onToggle();
  };

  return (
    <Block
      as="details"
      displayBlock
      open={open}
      id={id}
      data-testid={id}
      {...rest}
    >
      {typeof label === 'string' ? (
        <Block
          as="summary"
          color="neutral-600"
          padding={[4]}
          flex
          border="bottom"
          onClick={handleClick}
          className="fw-700 w-100 p-0 bn bg-white bg-blue-lighter-hover"
          itemSpacing="2"
          justify="between"
        >
          <div>{label}</div>
          <Icon name={arrowIcon} />
        </Block>
      ) : (
        <summary onClick={handleClick}>{label(props)}</summary>
      )}
      <Block>{children}</Block>
    </Block>
  );
}

CollapsiblePanel.propTypes = propTypes;
CollapsiblePanel.displayName = 'CollapsiblePanel';

export default CollapsiblePanel;
