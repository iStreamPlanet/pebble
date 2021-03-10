import React from 'react';
import { mount, shallow } from 'enzyme';
import FocusTrap from 'focus-trap-react';

import Modal from './Modal';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import Icon from '../Icon/Icon';

describe('Modal', () => {
  it('renders without crashing', () => {
    expect(() => {
      shallow(<Modal showing>content</Modal>);
    }).not.toThrow();
  });

  it('renders nothing when showing is false', () => {
    const instance = shallow(<Modal showing={false}>content</Modal>);
    expect(instance.isEmptyRender()).toEqual(true);
  });

  it('wraps the Modal with FocusTrap by default', () => {
    const instance = mount(<Modal showing>content</Modal>);
    expect(instance.find(FocusTrap).exists()).toBe(true);
  });

  describe('className', () => {
    it('passes in class name', () => {
      const instance = shallow(
        <Modal showing className="my-class">
          content
        </Modal>,
      );
      expect(instance.html()).toContain('my-class');
    });
  });

  describe('header', () => {
    it('renders a header if title is set', () => {
      const instance = shallow(
        <Modal showing title="Modal Title">
          content
        </Modal>,
      );
      expect(instance.find({ as: 'header' })).toHaveLength(1);
    });
  });

  describe('footer', () => {
    it('renders a footer if set', () => {
      const instance = shallow(
        <Modal
          showing
          className="my-class"
          footer={<div>footer</div>}
        >
          content
        </Modal>,
      );
      expect(instance.find({ as: 'footer' })).toHaveLength(1);
      expect(instance.find(ButtonGroup).children()).toHaveLength(1);
    });
    it('renders an array of nodes', () => {
      const instance = shallow(
        <Modal
          showing
          className="my-class"
          footer={[<div>1</div>, <div>2</div>]}
        >
          content
        </Modal>,
      );
      expect(instance.find(ButtonGroup).children()).toHaveLength(2);
    });
  });

  describe('icon', () => {
    it('is rendered if set title and icon is set', () => {
      const instance = mount(
        <Modal showing icon="remove-circle" title="title">
          content
        </Modal>,
      );
      expect(instance.find(Icon).at(0).prop('name')).toBe(
        'remove-circle',
      );
    });
  });

  describe('notDismissable', () => {
    it('closeBtn will not render when notDismissable is true', () => {
      const instance = shallow(
        <Modal showing notDismissable>
          content
        </Modal>,
      );
      expect(instance.find('.modal-close-btn')).toHaveLength(0);
    });

    it('focus will not be added to focusable elements within modal', () => {
      const instance = mount(
        <Modal showing notDismissable>
          <button type="button">Click me</button>
        </Modal>,
      );
      expect(instance.find(FocusTrap).exists()).toBe(false);
    });
  });
});
