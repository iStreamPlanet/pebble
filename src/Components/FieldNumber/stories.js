import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import '../../Styles/foundation.scss';

import FieldNumber from './FieldNumber';

function FieldNumberExample() {
  const [eventResult, setEventResult] = useState('');
  const [basic, setBasic] = useState(42);
  const [disabledInput, setDisabledInput] = useState('');
  const [errorInput, setErrorInput] = useState('');

  const handleChange = (e) => {
    setEventResult(`handleChange called with '${e.target.value}'`);
    setBasic(e.target.value);
  };

  const handleFocus = () => {
    setEventResult('handleFocus called');
  };

  const handleBlur = () => {
    setEventResult('handleBlur called');
  };

  const handleClear = () => {
    setBasic('');
  };

  return (
    <>
      <FieldNumber
        label="onChange, onBlur, onFocus handlers"
        id="events"
        value={basic}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        clearBtnFunc={handleClear}
        helpText="I'm some helpful text"
        className="mb-5"
      />

      <div className="fs-6 mt-3 mb-5">
        event handler result:{' '}
        <span className="fw-700">{eventResult}</span>
      </div>

      <FieldNumber
        disabled
        label="Disabled"
        id="disabled-input"
        value={disabledInput}
        onChange={(e) => setDisabledInput(e.target.value)}
        className="mb-5"
      />

      <FieldNumber
        isInvalid
        validationText="i am invalid"
        label="Is Invalid"
        id="error-input"
        value={errorInput}
        onChange={(e) => setErrorInput(e.target.value)}
        className="mb-5"
      />
    </>
  );
}

storiesOf('FieldNumber', module).add('all', () => (
  <>
    <FieldNumberExample />
    <FieldNumber
      id="smallSize"
      size="small"
      label="small"
      placeholder="small-sized"
      className="mb-5"
    />
    <FieldNumber
      id="defaultSize"
      label="medium (default)"
      placeholder="medium sized"
      className="mb-5"
    />
    <FieldNumber
      id="largeSize"
      size="large"
      label="large"
      placeholder="large-sized"
    />
  </>
));
