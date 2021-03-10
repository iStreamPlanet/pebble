import React from 'react';
import { shallow } from 'enzyme';

import FieldDateTime from './FieldDateTime';
import Block from '../Block/Block';
import Label from '../Label/Label';
import Text from '../Text/Text';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import Icon from '../Icon/Icon';

const requiredProps = {
  id: 'myDateTimePicker',
  label: 'select a time',
  onChange: jest.fn(),
};

describe('FieldDateTime', () => {
  it('renders without crashing', () => {
    expect(() => {
      shallow(<FieldDateTime {...requiredProps} />);
    }).not.toThrow();
  });

  describe('renderLabel', () => {
    it('uses pebble label component', () => {
      const instance = new FieldDateTime({
        isInvalid: true,
        disabled: true,
        id: 'myID',
        hideLabel: true,
        label: 'myLabel',
      });

      const result = instance.renderLabel();

      expect(result.type).toEqual(Label);
    });
    it('Sets the correct properties', () => {
      const instance = new FieldDateTime({
        isInvalid: true,
        disabled: true,
        id: 'myID',
        hideLabel: true,
        label: 'myLabel',
      });

      const result = instance.renderLabel();

      expect(result.props.id).toEqual('myID');
      expect(result.props.children).toEqual('myLabel');
      expect(result.props.invalid).toEqual(true);
      expect(result.props.disabled).toEqual(true);
      expect(result.props.hide).toEqual(true);
    });
  });

  describe('getDateFormat', () => {
    it('returns a user specified format', () => {
      const instance = new FieldDateTime({
        ...requiredProps,
        dateFormat: 'YY-M-D',
      });

      const result = instance.getDateFormat();

      expect(result).toEqual('YY-M-D');
    });
    it('returns default with a user specified time format', () => {
      const instance = new FieldDateTime({
        ...requiredProps,
        timeFormat: 'H:m',
      });

      const result = instance.getDateFormat();

      expect(result).toEqual('YYYY-MM-DD H:m Z');
    });
    it('returns default without time format', () => {
      const instance = new FieldDateTime({
        ...requiredProps,
        excludeTime: true,
      });

      const result = instance.getDateFormat();

      expect(result).toEqual('YYYY-MM-DD');
    });
  });

  describe('renderHelpTextMarkup', () => {
    it('does nothing if there is no help text', () => {
      const instance = new FieldDateTime({
        ...requiredProps,
      });

      const result = instance.renderHelpTextMarkup();

      expect(result).toBeUndefined();
    });
    it('uses pebble text component', () => {
      const instance = new FieldDateTime({
        ...requiredProps,
        helpText: 'help text...',
      });

      const result = instance.renderHelpTextMarkup();

      expect(result.type).toEqual(Text);
    });
    it('Sets the correct properties', () => {
      const instance = new FieldDateTime({
        ...requiredProps,
        helpText: 'help text...',
      });

      const result = instance.renderHelpTextMarkup();

      expect(result.props.size).toEqual('6');
      expect(result.props.className).toEqual('db mt-2');
      expect(result.props.children).toEqual('help text...');
    });
  });

  describe('renderValidationTextMarkup', () => {
    it('does nothing if component is valid', () => {
      const instance = new FieldDateTime({
        ...requiredProps,
        isInvalid: false,
        validationText: 'validation text...',
      });

      const result = instance.renderValidationTextMarkup();

      expect(result).toBeUndefined();
    });
    it('does nothing if there is no validation text', () => {
      const instance = new FieldDateTime({
        ...requiredProps,
        isInvalid: true,
      });

      const result = instance.renderValidationTextMarkup();

      expect(result).toBeUndefined();
    });

    it('uses pebble text component', () => {
      const instance = new FieldDateTime({
        ...requiredProps,
        isInvalid: true,
        validationText: 'validation text...',
      });

      const result = instance.renderValidationTextMarkup();

      expect(result.type).toEqual(Text);
    });
    it('Sets the correct properties', () => {
      const instance = new FieldDateTime({
        ...requiredProps,
        isInvalid: true,
        validationText: 'validation text...',
      });

      const result = instance.renderValidationTextMarkup();

      expect(result.props.size).toEqual('6');
      expect(result.props.appearance).toEqual('danger');
      expect(result.props.className).toEqual('db pt-2');
      expect(result.props.children).toEqual('validation text...');
    });
  });

  describe('convertIsoStringToMoment', () => {
    it('returns a value moment object', () => {
      const instance = new FieldDateTime({
        ...requiredProps,
      });
      const result = instance.convertIsoStringToMoment(
        '2019-06-26T12:00:00.000Z',
      );
      expect(moment.isMoment(result)).toBeTruthy();
    });

    it('throws for invalid isoString', () => {
      const instance = new FieldDateTime({
        ...requiredProps,
      });
      expect(() =>
        instance.convertIsoStringToMoment('2019-60-26T12:00:00.000Z'),
      ).toThrow();
    });
  });

  describe('onChange', () => {
    it('trims seconds and converts to ISO string', () => {
      const mockChange = jest.fn();
      const instance = new FieldDateTime({
        ...requiredProps,
        onChange: mockChange,
      });
      const value = moment('1986-09-02T01:01:01.000Z');

      instance.onChange(value);

      expect(mockChange).toHaveBeenCalledWith(
        value.startOf('minute').toISOString(),
      );
    });
    it('trims time and converts to ISO string', () => {
      const mockChange = jest.fn();
      const instance = new FieldDateTime({
        ...requiredProps,
        excludeTime: true,
        onChange: mockChange,
      });
      const value = moment('1986-09-02T01:01:01.000Z');

      instance.onChange(value);

      expect(mockChange).toHaveBeenCalledWith(
        value.startOf('day').toISOString(),
      );
    });
    it('returns empty string if value is cleared', () => {
      const mockChange = jest.fn();
      const instance = new FieldDateTime({
        ...requiredProps,
        onChange: mockChange,
      });

      instance.onChange(null);

      expect(mockChange).toHaveBeenCalledWith('');
    });
  });

  describe('FilterDate', () => {
    it('always returns true if there is no filterDate func provided', () => {
      const instance = new FieldDateTime({
        ...requiredProps,
      });

      const result = instance.filterDate();

      expect(result).toBeTruthy();
    });

    it('calls user provided filter func with ISO string', () => {
      const mockFilter = jest.fn(() => false);
      const instance = new FieldDateTime({
        ...requiredProps,
        filterDate: mockFilter,
      });
      const value = moment('1986-09-02T01:01:01.000Z');

      const result = instance.filterDate(value);

      expect(result).toBeFalsy();
      expect(mockFilter).toHaveBeenCalledWith(value.toISOString());
    });
  });

  describe('renderAlternativeDateTimeDisplay', () => {
    it('renders local when using the default of utc', () => {
      const instance = new FieldDateTime({
        ...requiredProps,
        value: '1986-09-02T01:01:01.000Z',
      });
      const momentDate = moment('1986-09-02T01:01:01.000Z');
      jest
        .spyOn(instance, 'getDateFormat')
        .mockImplementation(() => 'YYYY-MM-DD HH:mm');

      const result = shallow(
        instance.renderAlternativeDateTimeDisplay(),
      );

      expect(result.contains('Local')).toBeTruthy();
      expect(instance.getDateFormat).toHaveBeenCalled();
      expect(
        result.contains(
          momentDate.local().format('YYYY-MM-DD HH:mm'),
        ),
      ).toBeTruthy();
    });

    it('renders utc when using the local', () => {
      const instance = new FieldDateTime({
        ...requiredProps,
        value: '1986-09-02T01:01:01.000Z',
        selectLocalDateTime: true,
      });
      const momentDate = moment('1986-09-02T01:01:01.000Z');
      jest
        .spyOn(instance, 'getDateFormat')
        .mockImplementation(() => 'YYYY-MM-DD HH:mm');

      const result = shallow(
        instance.renderAlternativeDateTimeDisplay(),
      );

      expect(result.contains('UTC')).toBeTruthy();
      expect(instance.getDateFormat).toHaveBeenCalled();
      expect(
        result.contains(momentDate.utc().format('YYYY-MM-DD HH:mm')),
      ).toBeTruthy();
    });

    it('renders nothing if value is empty', () => {
      const instance = new FieldDateTime({
        ...requiredProps,
        value: '',
      });
      jest
        .spyOn(instance, 'getDateFormat')
        .mockImplementation(() => 'YYYY-MM-DD HH:mm');

      const result = shallow(
        instance.renderAlternativeDateTimeDisplay(),
      );

      expect(result.contains('Local')).toBeTruthy();
      expect(instance.getDateFormat).not.toHaveBeenCalled();
      expect(result.text()).toEqual('<Block /><Block />');
    });

    it('renders grayed background when disabled', () => {
      const instance = new FieldDateTime({
        ...requiredProps,
        value: '1986-09-02T01:01:01.000Z',
        disabled: true,
      });

      const result = shallow(
        instance.renderAlternativeDateTimeDisplay(),
      );
      expect(result.find(Block).at(1).prop('style')).toMatchObject({
        borderLeft: 0,
      });
    });
  });

  describe('render', () => {
    it('calls all the correct helper methods', () => {
      const instance = new FieldDateTime({
        ...requiredProps,
        value: '1986-09-02T01:01:01.000Z',
      });
      jest
        .spyOn(instance, 'renderLabel')
        .mockImplementation(jest.fn());
      jest
        .spyOn(instance, 'getDateFormat')
        .mockImplementation(jest.fn());
      jest
        .spyOn(instance, 'renderAlternativeDateTimeDisplay')
        .mockImplementation(jest.fn());
      jest
        .spyOn(instance, 'renderHelpTextMarkup')
        .mockImplementation(jest.fn());
      jest
        .spyOn(instance, 'renderValidationTextMarkup')
        .mockImplementation(jest.fn());
      jest
        .spyOn(instance, 'convertIsoStringToMoment')
        .mockImplementation(jest.fn());

      instance.render();

      expect(instance.renderLabel).toHaveBeenCalled();
      expect(instance.getDateFormat).toHaveBeenCalled();
      expect(
        instance.renderAlternativeDateTimeDisplay,
      ).toHaveBeenCalled();
      expect(instance.renderHelpTextMarkup).toHaveBeenCalled();
      expect(instance.renderValidationTextMarkup).toHaveBeenCalled();
      expect(instance.convertIsoStringToMoment).toHaveBeenCalled();
    });

    it('uses the react date picker and passes correct non configurable options', () => {
      const wrapper = shallow(<FieldDateTime {...requiredProps} />);

      const picker = wrapper.find(DatePicker);
      expect(picker).toBeDefined();
      expect(picker.props().disabledKeyboardNavigation).toEqual(true);
      expect(picker.props().utcOffset).toEqual(0);
      expect(picker.props().calendarClassName).toEqual(
        'FieldDatePickerCalendar',
      );
      expect(picker.props().popperPlacement).toEqual('bottom-start');
      expect(picker.props().adjustDateOnChange).toBeFalsy();
    });

    it('uses date-time icon by default', () => {
      const wrapper = shallow(<FieldDateTime {...requiredProps} />);

      expect(wrapper.find(Icon).props().name).toEqual('date-time');
    });

    it('uses calendar icon when excluding time', () => {
      const wrapper = shallow(
        <FieldDateTime {...requiredProps} excludeTime />,
      );

      expect(wrapper.find(Icon).props().name).toEqual('calendar');
    });

    it('passes popperPlacement when provided', () => {
      const wrapper = shallow(
        <FieldDateTime
          {...requiredProps}
          popperPlacement="top-end"
        />,
      );

      expect(
        wrapper.find(DatePicker).props().popperPlacement,
      ).toEqual('top-end');
    });

    it('passes a min and max date when provided', () => {
      const wrapper = shallow(
        <FieldDateTime
          {...requiredProps}
          minDate="1986-09-02T01:01:01.000Z"
          maxDate="1986-09-03T01:01:01.000Z"
        />,
      );

      expect(wrapper.find(DatePicker).props().minDate).toBeDefined();
      expect(wrapper.find(DatePicker).props().maxDate).toBeDefined();
    });

    it('passes undefined if value is empty', () => {
      const wrapper = shallow(
        <FieldDateTime {...requiredProps} value="" />,
      );

      expect(
        wrapper.find(DatePicker).props().selected,
      ).toBeUndefined();
    });

    it('passes placeholderText if value is empty', () => {
      const wrapper = shallow(
        <FieldDateTime
          {...requiredProps}
          placeholderText="my text"
        />,
      );

      expect(
        wrapper.find(DatePicker).props().placeholderText,
      ).toEqual('my text');
    });

    it('passes false allowSameDay prop to react date picker when excludeTime is true', () => {
      const props = { ...requiredProps, excludeTime: true };
      const wrapper = shallow(<FieldDateTime {...props} />);
      const picker = wrapper.find(DatePicker);
      expect(picker.props().allowSameDay).toEqual(false);
    });

    it('passes true allowSameDay prop to react date picker when excludeTime is false', () => {
      const wrapper = shallow(<FieldDateTime {...requiredProps} />);
      const picker = wrapper.find(DatePicker);
      expect(picker.props().allowSameDay).toEqual(true);
    });

    it('adds UTC prefix to input by default', () => {
      const wrapper = shallow(<FieldDateTime {...requiredProps} />);

      expect(
        wrapper.find('.FieldDateTime-timezone').contains('UTC'),
      ).toBeDefined();
    });

    it('adds local prefix to input when selecting local time', () => {
      const wrapper = shallow(
        <FieldDateTime {...requiredProps} selectLocalDateTime />,
      );

      expect(
        wrapper.find('.FieldDateTime-timezone').contains('Local'),
      ).toBeDefined();
    });

    it('sets correct classes and properties when invalid', () => {
      const wrapper = shallow(
        <FieldDateTime {...requiredProps} isInvalid />,
      );

      expect(wrapper.find(DatePicker).props().className).toContain(
        'input-error',
      );
      expect(wrapper.find(Icon).props().className).toContain('red');
      expect(wrapper.find(Icon).props().className).not.toContain(
        'neutral-400',
      );
    });
  });
});
