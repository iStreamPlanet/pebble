import '../../Styles/foundation.scss';

import React, { useState } from 'react';
import FieldDateTime from './FieldDateTime';
import { storiesOf } from '@storybook/react';

const FieldDateTimeExample = (props) => {
  const [selectedDate, setSelectedDate] = useState(
    '2019-06-26T12:00:00.000Z',
  );
  const handleChange = (value) => {
    setSelectedDate(value);
  };
  return (
    <FieldDateTime
      id="myDatePicker"
      label="start time"
      value={selectedDate}
      onChange={handleChange}
      {...props}
    />
  );
};

const FieldDateTimeEmptyExample = (props) => {
  const [selectedDate, setSelectedDate] = useState('');
  const handleChange = (value) => {
    setSelectedDate(value);
  };
  return (
    <FieldDateTime
      id="myDatePicker"
      label="start time"
      value={selectedDate}
      onChange={handleChange}
      {...props}
    />
  );
};

const filterDate = (value) => {
  const date = new Date(value);
  return date.getDay() < 5;
};

storiesOf('FieldDateTime', module)
  .add('date and time', () => <FieldDateTimeExample />)
  .add('date and time select local', () => (
    <FieldDateTimeExample selectLocalDateTime />
  ))
  .add('date only', () => (
    <FieldDateTimeExample excludeTime label="start date" />
  ))
  .add('clearable', () => (
    <>
      <FieldDateTimeExample
        label="Can be cleared"
        isClearable
        size="small"
      />
      <FieldDateTimeExample label="Can be cleared" isClearable />
      <FieldDateTimeExample
        label="Can be cleared"
        isClearable
        size="large"
      />
    </>
  ))
  .add('Empty DateTime', () => (
    <>
      <FieldDateTimeEmptyExample
        id="myDatePickerEnabled"
        label="enabled"
      />
      <FieldDateTimeEmptyExample
        id="myDatePickerDisabled"
        label="disabled"
        disabled
      />
      <FieldDateTimeEmptyExample
        id="myDatePickerLocalEnabled"
        label="local enabled"
        selectLocalDateTime
      />
      <FieldDateTimeEmptyExample
        id="myDatePickerLocalDisabled"
        label="local disabled"
        disabled
        selectLocalDateTime
      />
    </>
  ))
  .add('validation', () => (
    <FieldDateTimeExample
      isInvalid
      validationText="validation message text"
    />
  ))
  .add('am/pm time', () => (
    <FieldDateTimeExample timeFormat="h:mm a" />
  ))
  .add('disabled', () => <FieldDateTimeExample disabled />)
  .add('portal', () => <FieldDateTimeExample withPortal />)
  .add('Date Range', () => (
    <FieldDateTimeExample
      minDate="2019-06-25T12:00:00.000Z"
      maxDate="2019-06-27T12:00:00.000Z"
    />
  ))
  .add('Filter Dates (weekdays only)', () => (
    <FieldDateTimeExample filterDate={filterDate} />
  ))
  .add('with help text', () => (
    <FieldDateTimeExample helpText="Some more information about this field" />
  ))
  .add('autoFocus', () => <FieldDateTimeExample autoFocus />)
  .add('sizes', () => (
    <>
      <FieldDateTimeExample
        id="smallpicker"
        size="small"
        className="mb-5"
      />
      <FieldDateTimeExample id="defaultPicker" className="mb-5" />
      <FieldDateTimeExample
        id="largePicker"
        size="large"
        className="mb-7"
      />
    </>
  ));
