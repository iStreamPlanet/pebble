import './DropdownMenu.scss';

import { Manager, Popper, Reference } from 'react-popper';

import Button from '../Button/Button';
import FocusTrap from 'focus-trap-react';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import onClickOutside from 'react-onclickoutside';
import { placementType } from '../../Types';

const propTypes = {
  /**
   * Additional classNames to add to the container
   */
  className: PropTypes.string,
  /**
   * Additional classNames to add to the default toggle button
   */
  toggleClassName: PropTypes.string,
  /**
   * Additional classNames to add to the dropdown overlay
   */
  overlayClassName: PropTypes.string,
  /**
   * Contents of the component
   */
  children: PropTypes.node,
  /**
   * Whether dropdown is disabled
   */
  disabled: PropTypes.bool,
  /**
   * Takes up the full width of its parent container
   */
  fullWidth: PropTypes.bool,
  /**
   * The name of the [icon](/#/Components/Icon) to add before the toggle label
   */
  icon: PropTypes.string,
  /**
   * Changes the size of all buttons in the group
   * @type {PropTypes.Requireable<Size>}
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Callback when overlay is closed
   */
  onClose: PropTypes.func,
  /**
   * Callback when overlay is open
   */
  onOpen: PropTypes.func,
  /**
   * Whether the drop should be open or not. Will not apply after component is been rendered.
   */
  open: PropTypes.bool,
  /**
   * Where the overlay menu will appear relative to the toggle
   *
   * One of: `auto`, `auto-start`, `auto-end`, `top`, `top-start`, `top-end`, `right`, `right-start`, `right-end`, `bottom`, `bottom-start`, `bottom-end`, `left`, `left-start`, `left-end`,
   * @type {PropTypes.Requireable<PlacementType>}
   */
  placement: placementType,
  /**
   * trap focus when the dropdown is open
   */
  trapFocus: PropTypes.bool,
  /**
   * Content that will open and close the dropdown menu. Passing a string will render a Button with a down arrow.
   */
  toggle: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
    .isRequired,
};

const defaultProps = {
  children: null,
  disabled: false,
  fullWidth: false,
  onOpen: undefined,
  onClose: undefined,
  open: false,
  placement: 'bottom-start',
  size: 'medium',
  trapFocus: true,
};

/**
 * Creates a dropdown menu with optional groups with headings.
 *
 * ---
 */

class DropdownMenu extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOverlayOpen: props.open || false,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown, false);
  }

  componentWillUnmount() {
    document.removeEventListener(
      'keydown',
      this.handleKeydown,
      false,
    );
  }

  onToggle = (event) => {
    const { isOverlayOpen } = this.state;
    this.setState({ isOverlayOpen: !isOverlayOpen }, () =>
      isOverlayOpen
        ? this.handleClose(event)
        : this.handleOpen(event),
    );
  };

  handleOverlayClick = (event) => {
    const hasMenuItemInTree =
      event &&
      event.target &&
      event.target.closest &&
      event.target.closest('[role=menuitem]');
    if (hasMenuItemInTree) {
      this.setState({ isOverlayOpen: false }, () =>
        this.handleClose(event),
      );
    }
  };

  // used by onClickOutside HOC
  handleClickOutside = (event) => {
    const { isOverlayOpen } = this.state;

    if (isOverlayOpen) {
      this.setState({ isOverlayOpen: false }, () =>
        this.handleClose(event),
      );
    }
  };

  handleClose = (event) => {
    const { onClose } = this.props;
    onClose && onClose(event);
  };

  handleOpen = (event) => {
    const { onOpen } = this.props;
    onOpen && onOpen(event);
  };

  handleKeydown = (event) => {
    const { isOverlayOpen } = this.state;
    const { key } = event;
    if (key === 'Escape' && isOverlayOpen) {
      this.setState({ isOverlayOpen: false }, () =>
        this.handleClose(event),
      );
    }
  };

  renderToggle = ({ ref }) => {
    const {
      fullWidth,
      icon,
      size,
      toggle,
      toggleClassName,
      disabled,
    } = this.props;

    if (typeof toggle === 'string') {
      return (
        <Button
          type="button"
          onClick={this.onToggle}
          icon={icon}
          iconAfterText="arrow-small-down"
          className={toggleClassName}
          disabled={disabled}
          aria-haspopup
          fullWidth={fullWidth}
          size={size}
          ref={ref}
        >
          {toggle}
        </Button>
      );
    }

    return React.cloneElement(toggle, {
      onClick: this.onToggle,
      disabled,
      'aria-haspopup': true,
      ref,
    });
  };

  renderOverlay = ({ ref, placement, style }) => {
    const { isOverlayOpen } = this.state;
    const { children, overlayClassName } = this.props;

    const overlayClasses = classNames(
      'dropdown-overlay',
      'pv-2',
      overlayClassName,
    );

    return (
      <div
        className={overlayClasses}
        role="menu"
        aria-hidden={!isOverlayOpen}
        aria-expanded={isOverlayOpen}
        ref={ref}
        data-placement={placement}
        style={style}
        onClick={this.handleOverlayClick}
        tabIndex="-1"
      >
        {children}
      </div>
    );
  };

  render() {
    const { isOverlayOpen } = this.state;
    const { className, fullWidth, placement, trapFocus } = this.props;

    const classes = classNames(
      'dropdown-container',
      {
        'w-100': fullWidth,
      },
      className,
    );
    const enableFocusTrap = trapFocus ? isOverlayOpen : false;

    return (
      <FocusTrap
        active={enableFocusTrap}
        focusTrapOptions={{
          clickOutsideDeactivates: true,
        }}
      >
        <div className={classes} onKeyDown={this.handleKeydown}>
          <Manager>
            <Reference>{this.renderToggle}</Reference>
            {isOverlayOpen && (
              <Popper
                placement={placement}
                modifiers={{
                  preventOverflow: {
                    enabled: true,
                  },
                }}
              >
                {this.renderOverlay}
              </Popper>
            )}
          </Manager>
        </div>
      </FocusTrap>
    );
  }
}

DropdownMenu.defaultProps = defaultProps;
DropdownMenu.propTypes = propTypes;
DropdownMenu.displayName = 'DropdownMenu';

export { DropdownMenu as DropdownMenuWithoutOnClickOutside };

export default onClickOutside(DropdownMenu);
