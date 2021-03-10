import React from 'react';
import { mount, shallow } from 'enzyme';
import { useResponsiveLayout } from '../../Hooks';

import Text from '../Text/Text';
import Tooltip from '../Tooltip/Tooltip';
import Metric from './Metric';
import { getMetricValueSize } from './Metric';

jest.mock('../../Hooks/UseResponsiveLayout');

describe('getMetricValueSize()', () => {
  it('returns correct font size when size is large', () => {
    expect(getMetricValueSize('large')).toBe(1);
  });
  it('returns correct font size when size is medium', () => {
    expect(getMetricValueSize('medium')).toBe(2);
  });
  it('returns correct font size when size is small', () => {
    expect(getMetricValueSize('small')).toBe(5);
  });
  it('returns correct font size when size is not small, medium or large', () => {
    expect(getMetricValueSize('foo')).toBe(1);
  });
});

describe('Metric', () => {
  beforeEach(() => {
    useResponsiveLayout.mockClear();
    useResponsiveLayout.mockImplementation(() => [false, false]);
  });
  it('renders without crashing', () => {
    expect(() => {
      shallow(<Metric value={54321} title="test" />);
    }).not.toThrow();
  });

  it('sets the correct Text sizes if not mobile', () => {
    const wrapper = shallow(<Metric value="5" title="test metric" />);
    expect(wrapper.find(Text).at(0).prop('size')).toBe(6);
    expect(wrapper.find(Text).at(1).prop('size')).toBe(1);
  });
  it('sets the correct Text sizes if mobile', () => {
    useResponsiveLayout.mockClear();
    useResponsiveLayout.mockImplementation(() => [true, false]);
    const wrapper = shallow(<Metric value="5" title="test metric" />);
    expect(wrapper.find(Text).at(0).prop('size')).toBe(7);
    expect(wrapper.find(Text).at(1).prop('size')).toBe(1);
  });

  it('calls colorRules if colorRules is a function', () => {
    const customFunc = jest.fn().mockImplementation(() => 'success');
    shallow(
      <Metric
        value="5"
        title="test metric"
        colorRules={customFunc}
      />,
    );
    expect(customFunc).toHaveBeenCalledTimes(1);
  });

  it('calls console.warn if colorRules returns an unknown value', () => {
    const customFunc = jest.fn().mockImplementation(() => 'unknown');
    const spy = jest.spyOn(global.console, 'warn');
    shallow(
      <Metric
        value="5"
        title="test metric"
        colorRules={customFunc}
      />,
    );
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('sets the correct color if colorRules is an object', () => {
    const cpuHealth = {
      '0-71': 'neutral',
      '71-81': 'warn',
      '81-99': 'danger',
      '99-100': 'success',
    };
    const neutral = mount(
      <Metric value="5" title="test metric" colorRules={cpuHealth} />,
    );
    const warn = mount(
      <Metric
        value="71"
        title="test metric"
        colorRules={cpuHealth}
      />,
    );
    const danger = mount(
      <Metric
        value="81"
        title="test metric"
        colorRules={cpuHealth}
      />,
    );
    const success = mount(
      <Metric
        value="99"
        title="test metric"
        colorRules={cpuHealth}
      />,
    );
    expect(neutral.find('.neutral-600')).toHaveLength(1);
    expect(warn.find('.yellow')).toHaveLength(1);
    expect(danger.find('.red')).toHaveLength(1);
    expect(success.find('.green')).toHaveLength(1);
  });

  describe('helpText', () => {
    it('adds a Tooltip if helpText is set', () => {
      const txt = 'tooltip help text';
      const wrapper = shallow(
        <Metric value="5" title="test metric" helpText={txt} />,
      );
      expect(wrapper.find(Tooltip)).toHaveLength(1);
      expect(wrapper.find(Tooltip).prop('content')).toBe(txt);
    });
    it('does not render a Tooltip if helpText is not set', () => {
      const wrapper = shallow(
        <Metric value="5" title="test metric" />,
      );
      expect(wrapper.find(Tooltip)).toHaveLength(0);
    });
  });
  describe('prefix and suffix', () => {
    it('adds a prefix if set', () => {
      const txt = 'prefix text';
      const wrapper = shallow(
        <Metric
          value="5"
          title="test metric"
          prefix={txt}
          prefixClassName="prefixClass"
        />,
      );
      expect(wrapper.find('.prefixClass')).toHaveLength(1);
      expect(wrapper.find('.prefixClass').html()).toContain(txt);
    });
    it('does not render a prefix if prefix is not set', () => {
      const wrapper = shallow(
        <Metric
          value="5"
          title="test metric"
          prefixClassName="prefixClass"
        />,
      );
      expect(wrapper.find('.prefixClass')).toHaveLength(0);
    });
    it('adds a suffix if set', () => {
      const txt = 'suffix text';
      const wrapper = shallow(
        <Metric
          value="5"
          title="test metric"
          suffix={txt}
          suffixClassName="suffixClass"
        />,
      );
      expect(wrapper.find('.suffixClass')).toHaveLength(1);
      expect(wrapper.find('.suffixClass').html()).toContain(txt);
    });
    it('does not render a suffix if suffix is not set', () => {
      const wrapper = shallow(
        <Metric
          value="5"
          title="test metric"
          suffixClassName="suffixClass"
        />,
      );
      expect(wrapper.find('.suffixClass')).toHaveLength(0);
    });
  });

  it('adds a Tooltip if helpText is set', () => {
    const txt = 'tooltip help text';
    const wrapper = shallow(
      <Metric value="5" title="test metric" helpText={txt} />,
    );
    expect(wrapper.find(Tooltip)).toHaveLength(1);
    expect(wrapper.find(Tooltip).prop('content')).toBe(txt);
  });

  describe('renderValue', () => {
    it('calls formatter if value is a number', () => {
      const customFormatter = jest
        .fn()
        .mockImplementation(() => <div>test</div>);
      shallow(
        <Metric value={3} formatter={customFormatter} title="test" />,
      );
      expect(customFormatter).toHaveBeenCalledTimes(1);
      expect(customFormatter).toHaveBeenCalledWith(3, {
        formatter: customFormatter,
        size: 'large',
        title: 'test',
        value: 3,
      });
    });
    it('calls formatter if value is a string', () => {
      const customFormatter = jest
        .fn()
        .mockImplementation(() => <div>test</div>);
      shallow(
        <Metric value="3" formatter={customFormatter} title="test" />,
      );
      expect(customFormatter).toHaveBeenCalledTimes(1);
      expect(customFormatter).toHaveBeenCalledWith('3', {
        formatter: customFormatter,
        size: 'large',
        title: 'test',
        value: '3',
      });
    });
    it('returns the node and does not call formatter if value is not a number or string', () => {
      const customFormatter = jest
        .fn()
        .mockImplementation(() => <div>test</div>);
      const wrapper = shallow(
        <Metric
          value={<div id="test">test</div>}
          formatter={customFormatter}
          title="test"
        />,
      );
      expect(customFormatter).toHaveBeenCalledTimes(0);
      expect(wrapper.find('div#test')).toHaveLength(1);
    });
  });
});
