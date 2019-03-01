import React from 'react';
import FocusTrap from 'focus-trap-react';
import { shallow } from 'enzyme';
import Frame from './Frame';
import MainMenu from '../MainMenu/MainMenu';

const navToggleMock = jest.fn();

const menu = [
  {
    id: '1',
    label: 'Dashboard',
    description: '',
    href: '/',
    icon: 'dashboard'
  },
];

const mainMenu = <MainMenu menu={menu} />;

const testFrame = (
  <Frame
    onNavigationToggle={navToggleMock}
    title="test frame"
    isShowingMobileNav={false}
    navigation={mainMenu}
  >
    body content
  </Frame>
);

const testFrameWithMobile = (
  <Frame
    onNavigationToggle={navToggleMock}
    title="test frame"
    isShowingMobileNav
    navigation={mainMenu}
  >
    body content
  </Frame>
);

describe('Frame', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    expect(() => { shallow(testFrame); }).not.toThrow();
  });

  it('opens the mobile nav when isShowingMobileNav is true', () => {
    const wrapper = shallow(testFrameWithMobile);
    expect(wrapper.find('.navigation').prop('className')).toContain('open');
  });

  it('sets FocusTrap to active when isShowingMobileNav is true', () => {
    const wrapper = shallow(testFrameWithMobile);
    expect(wrapper.find(FocusTrap).prop('active')).toBe(true);
  });

  it('onNavigationToggle is called when isShowingMobileNav is true', () => {
    const instance = new Frame({
      onNavigationToggle: navToggleMock,
      isShowingMobileNav: true
    });

    instance.handleNavigationDismiss();
    expect(navToggleMock).toHaveBeenCalled();
  });

  it('onNavigationToggle is not called when isShowingMobileNav is false', () => {
    const instance = new Frame({
      onNavigationToggle: navToggleMock,
      isShowingMobileNav: false
    });

    instance.handleNavigationDismiss();
    expect(navToggleMock).not.toHaveBeenCalled();
  });

  describe('handleFocus', () => {
    beforeEach(() => {
      jest.restoreAllMocks();
    });

    it('calls setState', () => {
      const instance = new Frame();
      instance.setState = jest.fn();
      instance.handleFocus();
      expect(instance.setState).toBeCalledWith({ isSkipFocused: true });
    });
  });

  describe('handleBlur', () => {
    beforeEach(() => {
      jest.restoreAllMocks();
    });

    it('calls setState', () => {
      const instance = new Frame();
      instance.setState = jest.fn();
      instance.handleBlur();
      expect(instance.setState).toBeCalledWith({ isSkipFocused: false });
    });
  });

  describe('handleNavKeydown', () => {
    beforeEach(() => {
      jest.restoreAllMocks();
    });

    it('calls handleNavigationDismiss when Escape key is pressed', () => {
      const instance = new Frame();
      instance.handleNavigationDismiss = jest.fn();
      instance.handleNavKeydown({ event: 'keydown', key: 'Escape' });
      expect(instance.handleNavigationDismiss).toHaveBeenCalled();
    });
  });

  describe('skip-to-content', () => {
    it('skips to the main element when clicked', () => {
      const wrapper = shallow(testFrame);
      wrapper.instance().handleSkipToContent();
    });

    it('adds focus class to skip-to-content button when focused', () => {
      const wrapper = shallow(testFrame);
      wrapper.setState({ isSkipFocused: true });
      expect(wrapper.find('.skip').prop('className')).toContain('focused');
    });

    it('adds focus class to skip-to-content button when focused', () => {
      const wrapper = shallow(testFrame);
      wrapper.instance().handleFocus();
      expect(wrapper.find('.skip').prop('className')).toBe('skip focused');
    });

    it('removes focus class to skip-to-content button when focused', () => {
      const wrapper = shallow(testFrame);
      wrapper.instance().handleBlur();
      expect(wrapper.find('.skip').prop('className')).toBe('skip');
    });
  });
});
