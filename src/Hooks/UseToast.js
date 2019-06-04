import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import Alert from '../Components/Alert/Alert';
// import Button from '../Button/Button';

const defaultProps = {
  type: 'default',
  position: 'bottom'
};

const propTypes = {
  /**
   * The title of the notification
   */
  title: PropTypes.string.isRequired,
  /**
   * The body copy of the notification
   */
  textMsg: PropTypes.string,
  /**
   * Type of message to be displayed
   * @type {PropTypes.Requireable<'default' | 'info' | 'warn' | 'danger' | 'success'>}
   */
  type: PropTypes.oneOf(['default', 'info', 'warn', 'danger', 'success']),
};

const ToastAlert = ({
  title, textMsg, type
}) => (
  <Alert
    type={type}
    className="mb-0"
    title={title}
  >
    {textMsg && <div>{textMsg}</div>}
  </Alert>
);

ToastAlert.propTypes = propTypes;
ToastAlert.defaultProps = defaultProps;

/**
 * A toast is used to give feedback to users about an event.
 * It can be dismissed and sits on top of a view.
 * Each toast can be colored to fit its status type (neutral, warn, danger, success)
 *
 * ---
 */

export default () => {
  function notify({
    title,
    textMsg,
    type,
    autoClose,
    onClose,
  }) {
    toast(
      <ToastAlert
        textMsg={textMsg}
        title={title}
        type={type}
      />,
      {
        className: 'p-0 bg-transparent',
        autoClose,
        onClose: onClose ? () => onClose() : null
      }
    );
  }

  return notify;
};