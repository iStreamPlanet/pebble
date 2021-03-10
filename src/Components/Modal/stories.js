import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import '../../Styles/foundation.scss';

import '../../../stories/styles.css';

import Modal from './Modal';
import Button from '../Button/Button';

function ModalExample(props) {
  const [showModal, setShowModal] = useState(true);

  const { children, noTitle, noFooter, type, large } = props;

  return (
    <>
      {showModal && (
        <Modal
          large={large}
          type={type}
          title={!noTitle ? `${type} modal` : undefined}
          icon="ticket"
          onRequestClose={() => setShowModal(!showModal)}
          showing={showModal}
          footer={
            !noFooter
              ? [
                  <Button
                    primary
                    onClick={() => setShowModal(!showModal)}
                  >
                    Save
                  </Button>,
                  <Button onClick={() => setShowModal(!showModal)}>
                    Cancel
                  </Button>,
                ]
              : undefined
          }
        >
          {children || 'Modal content'}
        </Modal>
      )}
    </>
  );
}

ModalExample.propTypes = {
  children: PropTypes.node,
  large: PropTypes.bool,
  noTitle: PropTypes.bool,
  noFooter: PropTypes.bool,
  type: PropTypes.oneOf(['default', 'warn', 'danger']),
};

storiesOf('Modal', module)
  .addDecorator((storyFn) => (
    <div style={{ width: '800px', height: '800px' }}>{storyFn()}</div>
  ))
  .addParameters({
    chromatic: { delay: 2000 },
  })
  .add('default', () => <ModalExample type="default" />)
  .add('danger', () => <ModalExample type="danger" />)
  .add('warn', () => <ModalExample type="warn" />)
  .add('without title', () => <ModalExample noTitle />)
  .add('without title and footer', () => (
    <ModalExample noTitle noFooter />
  ))
  .add('scrolling content', () => (
    <ModalExample type="default">
      <p>
        iStreamPlanet creates leading-edge technology to solve the
        core challenges of OTT media. We deliver the end-to-end video
        workflow from signal acquisition to the streaming app
        experience — all focused on the fan.
      </p>
      <p>
        iStreamPlanet has earned the trust of leading sports and
        entertainment brands through innovation, dedication to high
        quality video, and exceptional customer service.
      </p>
      <p>
        iStreamPlanet creates leading-edge technology to solve the
        core challenges of OTT media. We deliver the end-to-end video
        workflow from signal acquisition to the streaming app
        experience — all focused on the fan.
      </p>
      <p>
        iStreamPlanet has earned the trust of leading sports and
        entertainment brands through innovation, dedication to high
        quality video, and exceptional customer service.
      </p>
      <p>
        iStreamPlanet creates leading-edge technology to solve the
        core challenges of OTT media. We deliver the end-to-end video
        workflow from signal acquisition to the streaming app
        experience — all focused on the fan.
      </p>
      <p>
        iStreamPlanet has earned the trust of leading sports and
        entertainment brands through innovation, dedication to high
        quality video, and exceptional customer service.
      </p>
    </ModalExample>
  ));
