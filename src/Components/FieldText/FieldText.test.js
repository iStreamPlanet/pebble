import React from 'react';
import { shallow } from 'enzyme';
import FieldText from './FieldText';

import Input from '../Input/Input';
import Text from '../Text/Text';

describe('FieldText', () => {
  it('renders without crashing', () => {
    expect(() => {
      shallow(<FieldText id="testField" label="test" />);
    }).not.toThrow();
  });

  it('allows for custom classes', () => {
    const wrapper = shallow(
      <FieldText id="testField" label="test" className="myClass" />,
    );
    expect(wrapper.prop('className')).toContain('myClass');
  });

  describe('getLabelMarkup', () => {
    it('sets aria-label if hideLabel is true', () => {
      const wrapper = shallow(
        <FieldText id="testField" label="hiddenLabel" hideLabel />,
      );
      expect(wrapper.find(Input).prop('ariaLabel')).toEqual(
        'hiddenLabel',
      );
    });
  });

  describe('getHelpTextMarkup', () => {
    it('display the correct help text if passed', () => {
      const helpText = 'i am help text';
      const wrapper = shallow(
        <FieldText
          id="testField"
          label="label"
          helpText={helpText}
        />,
      );
      expect(wrapper.find(Text).childAt(0).text()).toBe(helpText);
    });

    it('returns undefined if no helptext is set', () => {
      const instance = new FieldText({ label: 'test' });
      expect(instance.getHelpTextMarkup()).toBe(null);
    });
  });

  describe('getValidationTextMarkup', () => {
    it('renders validationText if isInvalid', () => {
      const validationText = 'this is invalid';
      const wrapper = shallow(
        <FieldText
          id="testField"
          label="label"
          validationText={validationText}
          isInvalid
        />,
      );
      expect(wrapper.find(Text).childAt(0).text()).toBe(
        validationText,
      );
    });
    it('returns undefined if isInvalid is false', () => {
      const instance = new FieldText({
        label: 'label',
        validationText: 'this is invalid',
      });
      expect(instance.getValidationTextMarkup()).toBe(undefined);
    });
    it('returns undefined if isInvalid is true but no validationText is set', () => {
      const instance = new FieldText({
        label: 'label',
        isInvalid: true,
      });
      expect(instance.getValidationTextMarkup()).toBe(undefined);
    });
  });
});
