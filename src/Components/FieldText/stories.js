import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import '../../Styles/foundation.scss';

import FieldText from './FieldText';
import Icon from '../Icon/Icon';

function FieldTextExample() {
  const [eventResult, setEventResult] = useState('');
  const [basic, setBasic] = useState('');
  const [autoFocus, setAutoFocus] = useState('');
  const [disabledInput, setDisabledInput] = useState(
    'can not edit this',
  );
  const [placeholderInput, setPlaceholderInput] = useState('');
  const [helpTextInput, setHelpTextInput] = useState('');
  const [errorInput, setErrorInput] = useState('');
  const [spellcheckInput, setSpellcheckInput] = useState('');
  const [maxLengthInput, setMaxLengthInput] = useState('');
  const [clearBtnInput, setClearBtnInput] = useState('clear me!');
  const [readOnlyInput, setReadOnlyInput] = useState(
    'I am read only',
  );
  const [prefixInput, setPrefixInput] = useState('');
  const [suffixInput, setSuffixInput] = useState('');
  const [prefixSuffixInput, setPrefixSuffixInput] = useState('');
  const [characterCountInput, setCharacterCountInput] = useState(
    '13 characters',
  );

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
    setClearBtnInput('');
  };

  return (
    <>
      <FieldText
        label="onChange, onBlur, onFocus handlers"
        id="events"
        value={basic}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />

      <div className="fs-6 mt-3 mb-5">
        event handler result:{' '}
        <span className="fw-700">{eventResult}</span>
      </div>

      <FieldText
        autoFocus
        label="Autofocus"
        id="autofocus"
        value={autoFocus}
        onChange={(e) => setAutoFocus(e.target.value)}
        className="mb-5"
      />

      <FieldText
        disabled
        label="Disabled"
        id="disabled-input"
        value={disabledInput}
        onChange={(e) => setDisabledInput(e.target.value)}
        className="mb-5"
      />

      <FieldText
        isReadOnly
        label="Read Only"
        id="readOnly-input"
        value={readOnlyInput}
        onChange={(e) => setReadOnlyInput(e.target.value)}
        className="mb-5"
      />

      <FieldText
        placeholder="e.g. 'name@example.com'"
        label="With Placeholder"
        id="placeholder-input"
        value={placeholderInput}
        onChange={(e) => setPlaceholderInput(e.target.value)}
        className="mb-5"
      />

      <FieldText
        label="With Help Text"
        id="helptext-input"
        value={helpTextInput}
        onChange={(e) => setHelpTextInput(e.target.value)}
        className="mb-5"
        helpText="I'm some helpful text"
      />

      <FieldText
        isInvalid
        validationText="i am invalid"
        label="Is Invalid"
        id="error-input"
        value={errorInput}
        onChange={(e) => setErrorInput(e.target.value)}
        className="mb-5"
      />

      <FieldText
        spellCheck={false}
        label="Spellcheck Disabled"
        id="spellcheck-input"
        value={spellcheckInput}
        onChange={(e) => setSpellcheckInput(e.target.value)}
        className="mb-5"
      />

      <FieldText
        maxLength={3}
        label="Max Length of 3"
        id="maxLength-input"
        value={maxLengthInput}
        onChange={(e) => setMaxLengthInput(e.target.value)}
        className="mb-5"
      />

      <FieldText
        prefix="$"
        label="With a prefix"
        id="prefix-input"
        value={prefixInput}
        onChange={(e) => setPrefixInput(e.target.value)}
        className="mb-5"
      />

      <FieldText
        suffix=".99"
        label="With a suffix"
        id="suffix-input"
        value={suffixInput}
        onChange={(e) => setSuffixInput(e.target.value)}
        className="mb-5"
      />

      <FieldText
        prefix="https://"
        suffix=".com"
        label="With Prefix and Suffix"
        id="suffix-input2"
        value={prefixSuffixInput}
        onChange={(e) => setPrefixSuffixInput(e.target.value)}
        className="mb-5"
      />

      <FieldText
        showCharacterCount
        maxLength={20}
        label="Character Count with Max Length of 20"
        id="characterCount-input"
        value={characterCountInput}
        onChange={(e) => setCharacterCountInput(e.target.value)}
        className="mb-5"
      />

      <FieldText
        clearBtnFunc={handleClear}
        label="With Clear Button"
        id="clearBtn-input"
        value={clearBtnInput}
        onChange={(e) => setClearBtnInput(e.target.value)}
        className="mb-5"
      />

      <FieldText
        hideLabel
        id="hideLabel"
        label="my label is visually hidden"
        placeholder="visually hidden label"
        className="mb-5"
      />
    </>
  );
}

function PrefixSuffixExample() {
  const [prefixInput, setPrefixInput] = useState('');
  const [suffixInput, setSuffixInput] = useState('');
  const [prefixSuffixInput, setPrefixSuffixInput] = useState(
    'istreamplanet',
  );
  const [iconInput, setIconInput] = useState('icon');

  return (
    <>
      <FieldText
        prefix="$"
        label="With a prefix"
        id="prefix-input"
        value={prefixInput}
        onChange={(e) => setPrefixInput(e.target.value)}
        className="mb-5"
      />

      <FieldText
        suffix=".99"
        label="With a suffix"
        id="suffix-input"
        value={suffixInput}
        onChange={(e) => setSuffixInput(e.target.value)}
        className="mb-5"
      />

      <FieldText
        size="small"
        prefix="https://"
        suffix=".com"
        type="url"
        label="With Prefix and Suffix"
        id="suffix-input2"
        value={prefixSuffixInput}
        onChange={(e) => setPrefixSuffixInput(e.target.value)}
        className="mb-5"
      />

      <FieldText
        prefix="https://"
        suffix=".com"
        type="url"
        label="With Prefix and Suffix"
        id="suffix-input2"
        value={prefixSuffixInput}
        onChange={(e) => setPrefixSuffixInput(e.target.value)}
        className="mb-5"
      />

      <FieldText
        size="large"
        prefix="https://"
        suffix=".com"
        type="url"
        label="With Prefix and Suffix"
        id="suffix-input2"
        value={prefixSuffixInput}
        onChange={(e) => setPrefixSuffixInput(e.target.value)}
        className="mb-5"
      />

      <FieldText
        size="small"
        prefix={
          <Icon name="calendar" accessibilityLabel="calendar" />
        }
        suffix={
          <Icon name="calendar" accessibilityLabel="calendar" />
        }
        label="Small prefix icon"
        id="small-prefix-icon-input"
        value={iconInput}
        onChange={(e) => setIconInput(e.target.value)}
        className="mb-5"
      />

      <FieldText
        prefix={
          <Icon name="calendar" accessibilityLabel="calendar" />
        }
        suffix={
          <Icon name="calendar" accessibilityLabel="calendar" />
        }
        label="Prefix icon"
        id="prefix-icon-input"
        value={iconInput}
        onChange={(e) => setIconInput(e.target.value)}
        className="mb-5"
      />

      <FieldText
        size="large"
        prefix={
          <Icon
            name="calendar"
            size="20"
            accessibilityLabel="calendar"
          />
        }
        suffix={
          <Icon
            name="calendar"
            size="20"
            accessibilityLabel="calendar"
          />
        }
        label="Large prefix icon"
        id="large-prefix-icon-input"
        value={iconInput}
        onChange={(e) => setIconInput(e.target.value)}
        className="mb-5"
      />
    </>
  );
}

storiesOf('FieldText', module)
  .add('all', () => (
    <>
      <FieldTextExample />
      <FieldText
        id="smallSize"
        size="small"
        label="small"
        placeholder="small-sized FieldText"
        className="mb-5"
      />
      <FieldText
        id="defaultSize"
        label="medium (default)"
        placeholder="medium-sized FieldText"
        className="mb-5"
      />
      <FieldText
        id="largeSize"
        size="large"
        label="large"
        placeholder="large-sized FieldText"
      />
      <FieldText
        id="emailType"
        type="email"
        label="email"
        className="mb-5"
      />
      <FieldText
        id="passwordType"
        type="password"
        label="password"
        className="mb-5"
      />
      <FieldText
        id="searchType"
        type="search"
        label="search"
        className="mb-5"
      />
      <FieldText
        id="telType"
        type="tel"
        label="tel"
        className="mb-5"
      />
      <FieldText
        id="textType"
        type="text"
        label="text"
        className="mb-5"
      />
      <FieldText
        id="urlType"
        type="url"
        label="url"
        className="mb-5"
      />
    </>
  ))
  .add('prefix and suffix', () => <PrefixSuffixExample />);
