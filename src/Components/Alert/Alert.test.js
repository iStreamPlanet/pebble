import React from 'react';
import { mount, shallow } from 'enzyme';
import Alert from './Alert';
import Heading from '../Heading/Heading';
import Icon from '../Icon/Icon';

describe('Alert', () => {
  it('renders without crashing', () => {
    expect(() => { shallow(<Alert>hello</Alert>); }).not.toThrow();
  });

  it('renders children', () => {
    const wrapper = shallow(<Alert><p>Hello Pebble</p></Alert>);
    expect(wrapper.find('p').text()).toBe('Hello Pebble');
  });

  it('allows for custom classes', () => {
    const wrapper = shallow(<Alert className="myClass">test</Alert>);
    expect(wrapper.prop('className')).toContain('myClass');
  });

  it('renders a dismiss button', () => {
    const wrapper = mount(<Alert onDismiss={() => {}}>test</Alert>);
    expect(wrapper.find('button.alert-dismiss-btn')).toHaveLength(1);
  });

  it('renders a title', () => {
    const wrapper = mount(<Alert title="test title">test</Alert>);
    expect(wrapper.contains(Heading)).toBeTruthy();
  });

  describe('Icons', () => {
    it('renders an icon', () => {
      const wrapper = mount(<Alert>test</Alert>);
      expect(wrapper.contains(Icon)).toBeTruthy();
    });

    it('renders default icon', () => {
      const wrapper = mount(<Alert type="default">test</Alert>);
      expect(wrapper.find(Icon).prop('name')).toBe('flag');
    });

    it('renders info icon', () => {
      const wrapper = mount(<Alert type="info">test</Alert>);
      expect(wrapper.find(Icon).prop('name')).toBe('info-circle');
    });

    it('renders warn icon', () => {
      const wrapper = mount(<Alert type="warn">test</Alert>);
      expect(wrapper.find(Icon).prop('name')).toBe('warning-circle-outline');
    });

    it('renders danger icon', () => {
      const wrapper = mount(<Alert type="danger">test</Alert>);
      expect(wrapper.find(Icon).prop('name')).toBe('ban');
    });

    it('renders success icon', () => {
      const wrapper = mount(<Alert type="success">test</Alert>);
      expect(wrapper.find(Icon).prop('name')).toBe('check-circle-outline');
    });

    it('renders a custom icon', () => {
      const wrapper = mount(<Alert icon="fullscreen" type="success">test</Alert>);
      expect(wrapper.find(Icon).prop('name')).toBe('fullscreen');
    });
  });
});
