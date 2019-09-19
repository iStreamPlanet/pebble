import React from 'react';
import PropTypes from 'prop-types';

import Block from '../../Block/Block';

const propTypes = {
  /**
   * Contents of the component
   */
  children: PropTypes.node,
};

/**
 * A row container in a table/grid
 *
 * ---
 */

function TableBody({ children }) {
  return (
    <Block
      role="rowgroup"
      direction="column"
      className="relative overflow-auto overflow-overlay"
    >
      {children}
    </Block>
  );
}

TableBody.propTypes = propTypes;
TableBody.displayName = 'TableBody';

export default TableBody;
