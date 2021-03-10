import './Popover.scss';

import { Manager, Popper, Reference } from 'react-popper';
import React, { useState } from 'react';
import { colorType, placementType } from '../../Types';

import ConditionalWrapper from '../ConditionalWrapper/ConditionalWrapper';
import FocusTrap from 'focus-trap-react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import mergeRefs from 'react-merge-refs';
import useKeyboardEvent from '../../Hooks/UseKeyboardEvent';

const propTypes = {
  /**
   * The color of the popover arrow. If not specified, the arrow will be colored the same as the background of the `content`
   */
  arrowColor: colorType,
  /**
   * Additional classes to add
   */
  className: PropTypes.string,
  /**
   * Automatically close after the given amount of milliseconds
   */
  closeAfter: PropTypes.number,
  /**
   * Whether the popover is initially open
   */
  isOpen: PropTypes.bool,
  /**
   * The node that triggers the popover. Should be a button for full accessability
   */
  children: PropTypes.node.isRequired,
  /**
   * Close the popover when `content` is clicked
   */
  closeOnContentClick: PropTypes.bool,
  /**
   * The content of the popover
   */
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
    .isRequired,
  /**
   * Hide the popover arrow
   */
  hideArrow: PropTypes.bool,
  /**
   * Callback when the popover is toggled
   */
  onToggle: PropTypes.func,
  /**
   * Where the popover will appear relative to the trigger.
   * This will automatically adjust if there is not enough room
   * to properly display the popover in the specified placement
   *
   * One of: `auto`, `auto-start`, `auto-end`, `top`, `top-start`, `top-end`, `right`, `right-start`, `right-end`, `bottom`, `bottom-start`, `bottom-end`, `left`, `left-start`, `left-end`,
   * @type {PropTypes.Requireable<PlacementType>}
   */
  placement: placementType,
  /**
   * If the Popover contains form inputs or other focusable elements,
   * trap focus within the popover while it is visible
   */
  trapFocus: PropTypes.bool,
};

const defaultProps = {
  closeOnContentClick: false,
  hideArrow: false,
  isOpen: false,
  placement: 'bottom',
};

/**
 * A popover is a non-modal dialog that floats around a trigger.
 * It is used to display contextual information and should be triggered with a button for full accessibility.
 *
 * ---
 */

const Popover = (props) => {
  const {
    arrowColor,
    children,
    className,
    closeAfter,
    closeOnContentClick,
    content,
    hideArrow,
    isOpen,
    onToggle,
    placement,
    trapFocus,
  } = props;
  const [showing, setShowing] = useState(isOpen);

  const popoverRef = React.useRef();
  const triggerRef = React.useRef();

  const open = () => {
    if (onToggle) {
      onToggle(true);
    }
    setShowing(true);
    document.body.addEventListener('click', onBodyClick, false);
  };

  const close = () => {
    if (onToggle) {
      onToggle(false);
    }
    setShowing(false);
    document.body.removeEventListener('click', onBodyClick, false);
  };

  useKeyboardEvent('Escape', close);

  const onBodyClick = (e) => {
    const popover = popoverRef.current;
    const trigger = triggerRef.current;

    if (!popover || !trigger) {
      return;
    }

    if (e.target === trigger || trigger.contains(e.target)) {
      return;
    }

    if (e.target === popover || popover.contains(e.target)) {
      if (closeOnContentClick) {
        close();
      }
      return;
    }

    close();
  };

  React.useEffect(() => {
    if (showing && closeAfter) {
      const timer = setTimeout(close, closeAfter);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [showing]);

  React.useEffect(() => {
    setShowing(isOpen);
  }, [isOpen]);

  const renderTrigger = (ref, className) => {
    return React.cloneElement(children, {
      onClick: (e) => {
        onTriggerClicked();
        if (children.props.onClick) {
          children.props.onClick(e);
        }
      },
      className: classNames(className, children.props.className),
      ref: mergeRefs([ref, triggerRef]),
      role: 'button',
      'aria-expanded': showing,
      'aria-haspopup': true,
    });
  };

  const onTriggerClicked = () => {
    return showing ? close() : open();
  };

  let backgroundColor = 'white';

  if (content.props && content.props.background) {
    backgroundColor = content.props.background;
  }

  if (arrowColor !== undefined) {
    backgroundColor = arrowColor;
  }

  const arrowClasses = classNames('popover-arrow', {
    [`bg-${backgroundColor}`]: backgroundColor,
  });

  const popperStyle = {
    zIndex: 2,
  };

  return (
    <ConditionalWrapper
      condition={trapFocus}
      wrapper={(children) => (
        <FocusTrap
          active={showing}
          focusTrapOptions={{
            clickOutsideDeactivates: true,
          }}
        >
          {children}
        </FocusTrap>
      )}
    >
      <div>
        <Manager>
          <Reference>
            {({ ref }) => renderTrigger(ref, className)}
          </Reference>
          {showing && (
            <Popper placement={placement}>
              {({ ref, style, placement, arrowProps }) => (
                <div
                  role="dialog"
                  aria-modal="false"
                  aria-hidden={!showing}
                  style={{ ...style, ...popperStyle }}
                  data-placement={placement}
                  ref={mergeRefs([ref, popoverRef])}
                >
                  {!hideArrow && (
                    <div
                      data-testid="popover-arrow"
                      role="presentation"
                      className={arrowClasses}
                      ref={arrowProps.ref}
                      style={arrowProps.style}
                    />
                  )}
                  {typeof content === 'function'
                    ? content(onTriggerClicked)
                    : content}
                </div>
              )}
            </Popper>
          )}
        </Manager>
      </div>
    </ConditionalWrapper>
  );
};

Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps;

export default Popover;
