import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { requiresOtherProp } from '../../Utils';

import { Header, Section } from './Subcomponents';
import './Card.scss';

const Card = (
  {
    children,
    className,
    headerActions,
    sectioned,
    muted,
    title,
  }
) => {
  const classes = classNames('card', className, {
    muted,
  });

  const header = title ? (
    <Header actions={headerActions}>
      {title}
    </Header>
  ) : null;

  const content = sectioned
    ? (React.Children.map(children, child => (
      <Section>
        {child}
      </Section>
    ))) : children;

  return (
    <div className={classes}>
      {header}
      {content}
    </div>
  );
};

Card.propTypes = {
  /**
   * Additional ClassNames to add to button
   */
  className: PropTypes.string,
  /**
   * Contents of the Card
   */
  children: PropTypes.node.isRequired,
  /**
   * button(s) to be displayed in the upper right of the Card. A title must be provided in order to display headerActions.
   */
  headerActions: requiresOtherProp('title'),
  /**
   * Title content of the card
   */
  title: PropTypes.string,
  /**
   * Autowrap children in a padded section
   */
  sectioned: PropTypes.bool,
  /**
   * Make the card less visually prominent
   */
  muted: PropTypes.bool,
};

export default Card;
