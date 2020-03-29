import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import '../../Styles/foundation.scss';

import FieldCheckbox from './FieldCheckbox';

function FieldCheckboxExample() {
  const [checkbox1, setCheckBox1] = useState(true);
  const [checkbox2, setCheckBox2] = useState(false);
  const [hiddenLabel, setHiddenLabel] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [toggleHelp, setToggleHelp] = useState(false);
  const [invalidToggle, setInvalidToggle] = useState(false);
  const [hiddenLabelToggle, setHiddenLabelToggle] = useState(false);
  const [
    invalidHiddenLabelToggle,
    setInvalidHiddenLabelToggle,
  ] = useState(false);
  const [hiddenLabelToggleHelp, setHiddenLabelToggleHelp] = useState(
    false,
  );

  return (
    <>
      <FieldCheckbox
        id="1"
        label="Checkbox"
        isSelected={checkbox1}
        value="first"
        onChange={setCheckBox1}
        className="mb-5"
      />

      <FieldCheckbox
        id="2"
        label="Checkbox with helpText"
        helpText="Help text for the checkbox"
        isSelected={checkbox2}
        value="second"
        onChange={setCheckBox2}
        className="mb-5"
      />

      <FieldCheckbox
        disabled
        id="checkbox-disabled"
        label="Disabled"
        helpText="Can not be changed by user input and can not be focused"
        isSelected={checkbox2}
        value="second"
        onChange={setCheckBox2}
        className="mb-5"
      />

      <FieldCheckbox
        id="hiddenLabel"
        label="hidden label"
        isSelected={hiddenLabel}
        value="first"
        onChange={setHiddenLabel}
        className="mb-5"
        hideLabel
      />

      <FieldCheckbox
        isInvalid
        validationText="This checkbox is required"
        id="invalid-checkbox"
        label="Invalid"
        helpText="For required acknowledgements (e.g. usage policy)"
        isSelected={invalid}
        value="second"
        onChange={setInvalid}
        className="mb-5"
      />

      <FieldCheckbox
        toggle
        id="toggle"
        label="checkbox as toggle"
        isSelected={toggle}
        value="first"
        onChange={setToggle}
        className="mb-5"
      />

      <FieldCheckbox
        toggle
        id="toggleHelp"
        label="toggle with helpText"
        isSelected={toggleHelp}
        value="first"
        onChange={setToggleHelp}
        className="mb-5"
      />

      <FieldCheckbox
        disabled
        toggle
        id="disabledToggle"
        label="disabled toggle"
        helpText="Can not be changed by user input and can not be focused"
        isSelected={toggleHelp}
        value="first"
        onChange={setToggleHelp}
        className="mb-5"
      />

      <FieldCheckbox
        isInvalid
        validationText="This toggle is required"
        toggle
        id="toggle-invalid"
        label="invalid toggle"
        helpText="this is an invalid toggle"
        isSelected={invalidToggle}
        value="first"
        onChange={setInvalidToggle}
        className="mb-5"
      />

      <FieldCheckbox
        toggle
        id="hiddenLabelToggle"
        label="hidden label toggle"
        isSelected={hiddenLabelToggle}
        value="first"
        onChange={setHiddenLabelToggle}
        className="mb-5"
        hideLabel
      />
      <FieldCheckbox
        isInvalid
        validationText="This toggle with hidden label is required"
        toggle
        id="invalidHiddenLabelToggle"
        label="invalid hidden label toggle"
        isSelected={invalidHiddenLabelToggle}
        value="first"
        onChange={setInvalidHiddenLabelToggle}
        className="mb-5"
        hideLabel
      />

      <FieldCheckbox
        helpText="hidden label toggle help text"
        toggle
        id="hiddenLabelToggleHelp"
        label="invalid hidden label toggle"
        isSelected={hiddenLabelToggleHelp}
        value="first"
        onChange={setHiddenLabelToggleHelp}
        className="mb-5"
        hideLabel
      />
    </>
  );
}

storiesOf('FieldCheckbox', module).add('all', () => (
  <>
    <FieldCheckboxExample />
  </>
));
