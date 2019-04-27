import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Block from '../Block/Block';
import Icon from '../Icon/Icon';

import './Breadcrumbs.scss';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

/**
* Secondary form of navigation that helps orient users in an application within hierarchical content.
*
* ---
*/

function Breadcrumbs({
  className,
  children,
  ...rest
}) {
  const classes = classNames('breadcrumbs', className);
  const childrenWithDividers = [];
  const numChildren = React.Children.count(children);

  React.Children.forEach(children, (child, index) => {
    child && childrenWithDividers.push(child);

    if (index !== numChildren - 1) {
      childrenWithDividers.push(<Icon key={`separator-${index}`} name="arrow-small-triangle-right" className="ml-2 mr-2 ml-3-ns mr-3-ns neutral-500" />);
    }
  });

  return (
    <Block
      as="nav"
      direction="row"
      aria-label="breadcrumbs navigation"
      alignItems="center"
      className={classes}
      wrap
      {...rest}
    >
      {childrenWithDividers}
    </Block>
  );
}

Breadcrumbs.propTypes = propTypes;

export default Breadcrumbs;
