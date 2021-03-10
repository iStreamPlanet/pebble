import React from 'react';
import { shallow } from 'enzyme';
import Block from './Block';

describe('Block', () => {
  it('renders without crashing', () => {
    expect(() => {
      shallow(<Block>hello</Block>);
    }).not.toThrow();
  });

  it('renders all children', () => {
    const wrapper = shallow(
      <Block itemSpacing="3">
        <p>Hello Pebble</p>
        <p>Second Paragraph</p>
      </Block>,
    );
    expect(wrapper.find('p').first().text()).toBe('Hello Pebble');
    expect(wrapper.find('div').children()).toHaveLength(2);
  });

  it('allows for custom classes', () => {
    const wrapper = shallow(<Block className="myClass">test</Block>);
    expect(wrapper.prop('className')).toContain('myClass');
  });

  it('allows you to render a Block as different DOM element', () => {
    const wrapper = shallow(<Block as="li">a list item</Block>);
    expect(wrapper.exists('li')).toEqual(true);
  });

  describe('style', () => {
    it('passes style through to style', () => {
      const wrapper = shallow(
        <Block
          style={{
            color: 'red',
            marginBottom: '1rem',
            paddingTop: '1rem',
          }}
        >
          test
        </Block>,
      );
      expect(wrapper.prop('style')).toMatchObject({
        color: 'red',
        marginBottom: '1rem',
        paddingTop: '1rem',
      });
    });
  }),
    describe('Flex', () => {
      it('sets flex', () => {
        const wrapper = shallow(<Block flex>test</Block>);
        expect(wrapper.prop('style')).toHaveProperty('flex', '1 1');
      });

      it('sets flex false', () => {
        const wrapper = shallow(<Block flex={false}>test</Block>);
        expect(wrapper.prop('style')).toHaveProperty('flex', '0 0');
      });

      it('sets grow', () => {
        const wrapper = shallow(<Block flex="grow">test</Block>);
        expect(wrapper.prop('style')).toHaveProperty('flex', '1 0');
      });

      it('sets flex', () => {
        const wrapper = shallow(<Block flex="shrink">test</Block>);
        expect(wrapper.prop('style')).toHaveProperty('flex', '0 1');
      });

      it('sets flex when passed a string', () => {
        const wrapper = shallow(<Block flex="grow">test</Block>);
        expect(wrapper.prop('style')).toHaveProperty('flex', '1 0');
      });

      it('sets flex-grow and flex-shrink', () => {
        const wrapper = shallow(
          <Block flex={{ grow: 5, shrink: 1 }}>test</Block>,
        );
        expect(wrapper.prop('style')).toHaveProperty('flex', '5 1');
      });

      it('sets default flex when passed an object', () => {
        const wrapper = shallow(<Block flex={{}}>test</Block>);
        expect(wrapper.prop('style')).toHaveProperty('flex', '0 0');
      });

      it('sets the flex-direction', () => {
        const wrapper = shallow(
          <Block direction="column">test</Block>,
        );
        expect(wrapper.prop('className')).toContain('flex-column');
      });
    }),
    describe('itemSpacing', () => {
      it('does not add spacing if the child is a string', () => {
        const wrapper = shallow(
          <Block itemSpacing="3">I am not an element</Block>,
        );
        expect(wrapper.text()).toBe('I am not an element');
      });

      it('adds spacing between items', () => {
        const wrapper = shallow(
          <Block itemSpacing="3">
            <Block>1</Block>
            <Block>2</Block>
          </Block>,
        );
        expect(
          wrapper.find(Block).first().prop('className'),
        ).toContain('mr-3');
      });

      it('adds spacing between items and keeps custom classes applied to child items', () => {
        const wrapper = shallow(
          <Block itemSpacing="3">
            <Block className="red">1</Block>
            <Block>2</Block>
          </Block>,
        );
        expect(
          wrapper.find(Block).first().prop('className'),
        ).toContain('red');
        expect(
          wrapper.find(Block).first().prop('className'),
        ).toContain('mr-3');
      });
    }),
    describe('Width', () => {
      it('gets the correct css value', () => {
        const wrapper = shallow(<Block width="27rem">width</Block>);
        expect(wrapper.prop('style')).toHaveProperty(
          'width',
          '27rem',
        );
      });
      it('gets the correct value when passed a number', () => {
        const wrapper = shallow(<Block width="8">width</Block>);
        expect(wrapper.prop('className')).toContain('w8');
      });
      it('gets the correct value when passed an array', () => {
        const wrapper = shallow(
          <Block width={[20, 30]}>width</Block>,
        );
        expect(wrapper.prop('className')).toContain('w-20 w-30-ns');
      });
    });

  describe('Height', () => {
    it('gets the correct css value', () => {
      const wrapper = shallow(<Block height="27rem">width</Block>);
      expect(wrapper.prop('style')).toHaveProperty('height', '27rem');
    });
    it('gets the correct value when passed a number', () => {
      const wrapper = shallow(<Block height="8">width</Block>);
      expect(wrapper.prop('className')).toContain('h8');
    });
    it('gets the correct value when passed an array', () => {
      const wrapper = shallow(<Block height={[20, 30]}>width</Block>);
      expect(wrapper.prop('className')).toContain('h-20 h-30-ns');
    });
  });

  describe('Basis', () => {
    it('sets auto basis', () => {
      const wrapper = shallow(<Block>test</Block>);
      expect(wrapper.prop('style')).not.toContain('flexBasis');
    });

    it('sets custom basis', () => {
      const wrapper = shallow(<Block basis="21px">test</Block>);
      expect(wrapper.prop('style')).toHaveProperty(
        'flexBasis',
        '21px',
      );
    });

    it('sets auto basis', () => {
      const wrapper = shallow(<Block basis="auto">test</Block>);
      expect(wrapper.prop('style')).toHaveProperty(
        'flexBasis',
        'auto',
      );
    });

    it('sets full basis', () => {
      const wrapper = shallow(<Block basis="full">test</Block>);
      expect(wrapper.prop('style')).toHaveProperty(
        'flexBasis',
        '100%',
      );
    });

    it('sets 1/2 basis', () => {
      const wrapper = shallow(<Block basis="1/2">test</Block>);
      expect(wrapper.prop('style')).toHaveProperty(
        'flexBasis',
        '50%',
      );
    });

    it('sets 1/4 basis', () => {
      const wrapper = shallow(<Block basis="1/4">test</Block>);
      expect(wrapper.prop('style')).toHaveProperty(
        'flexBasis',
        '25%',
      );
    });

    it('sets 3/4 basis', () => {
      const wrapper = shallow(<Block basis="3/4">test</Block>);
      expect(wrapper.prop('style')).toHaveProperty(
        'flexBasis',
        '75%',
      );
    });

    it('sets 1/3 basis', () => {
      const wrapper = shallow(<Block basis="1/3">test</Block>);
      expect(wrapper.prop('style')).toHaveProperty(
        'flexBasis',
        '33.33%',
      );
    });

    it('sets 2/3 basis', () => {
      const wrapper = shallow(<Block basis="2/3">test</Block>);
      expect(wrapper.prop('style')).toHaveProperty(
        'flexBasis',
        '66.66%',
      );
    });
  });

  describe('Border', () => {
    it('sets correct styles when set to "all"', () => {
      const wrapper = shallow(<Block border="all">border</Block>);
      expect(wrapper.prop('style')).toHaveProperty(
        'borderWidth',
        '1px',
      );
      expect(wrapper.prop('style')).toHaveProperty(
        'borderStyle',
        'solid',
      );
      expect(wrapper.prop('className')).toContain('b-neutral-300');
    });
    it('sets correct styles when set to "right"', () => {
      const wrapper = shallow(<Block border="right">border</Block>);
      expect(wrapper.prop('style')).toHaveProperty(
        'borderRightWidth',
        '1px',
      );
      expect(wrapper.prop('style')).toHaveProperty(
        'borderRightStyle',
        'solid',
      );
      expect(wrapper.prop('className')).toContain('b-neutral-300');
    });
    it('sets correct styles when set to "vertical"', () => {
      const wrapper = shallow(
        <Block border="vertical">border</Block>,
      );
      expect(wrapper.prop('style')).toHaveProperty(
        'borderRightWidth',
        '1px',
      );
      expect(wrapper.prop('style')).toHaveProperty(
        'borderRightStyle',
        'solid',
      );
      expect(wrapper.prop('style')).toHaveProperty(
        'borderLeftWidth',
        '1px',
      );
      expect(wrapper.prop('style')).toHaveProperty(
        'borderLeftStyle',
        'solid',
      );
      expect(wrapper.prop('className')).toContain('b-neutral-300');
    });
    it('sets correct styles when passed an object', () => {
      const wrapper = shallow(
        <Block border={{ width: '10px', color: 'green-lighter' }}>
          border
        </Block>,
      );
      expect(wrapper.prop('style')).toHaveProperty(
        'borderWidth',
        '10px',
      );
      expect(wrapper.prop('style')).toHaveProperty(
        'borderStyle',
        'solid',
      );
      expect(wrapper.prop('className')).toContain('b-green-lighter');
    });
    it('sets correct styles when passed an object without color', () => {
      const wrapper = shallow(
        <Block border={{ width: '10px' }}>border</Block>,
      );
      expect(wrapper.prop('style')).toHaveProperty(
        'borderWidth',
        '10px',
      );
      expect(wrapper.prop('style')).toHaveProperty(
        'borderStyle',
        'solid',
      );
      expect(wrapper.prop('className')).toContain('b-neutral-300');
    });
  });

  describe('Margin', () => {
    it('sets all margin bottom', () => {
      const wrapper = shallow(<Block marginBottom="1">test</Block>);
      expect(wrapper.prop('className')).toContain('mb-1');
    });

    it('sets responsive margin', () => {
      const wrapper = shallow(
        <Block marginTop={[1, 0, 2, 3]}>test</Block>,
      );
      expect(wrapper.prop('className')).toContain(
        'mt-1 mt-0-ns mt-2-m mt-3-l',
      );
    });

    it('sets the margin top', () => {
      const wrapper = shallow(<Block marginTop="1">test</Block>);
      expect(wrapper.prop('className')).toContain('mt-1');
    });
  }),
    describe('Padding', () => {
      it('sets all padding', () => {
        const wrapper = shallow(<Block padding="1">test</Block>);
        expect(wrapper.prop('className')).toContain('p-1');
      });

      it('sets the horizontal padding', () => {
        const wrapper = shallow(
          <Block paddingHorizontal="1">test</Block>,
        );
        expect(wrapper.prop('className')).toContain('ph-1');
      });

      it('sets the vertical padding', () => {
        const wrapper = shallow(
          <Block paddingVertical="1">test</Block>,
        );
        expect(wrapper.prop('className')).toContain('pv-1');
      });

      it('sets responsive padding', () => {
        const wrapper = shallow(
          <Block padding={[1, 0, 2, 3]}>test</Block>,
        );
        expect(wrapper.prop('className')).toContain(
          'p-1 p-0-ns p-2-m p-3-l',
        );
      });
    }),
    describe('Radius', () => {
      it('sets border radius', () => {
        const wrapper = shallow(<Block radius="1">test</Block>);
        expect(wrapper.prop('className')).toContain('br1');
      });

      it('sets responsive border radius', () => {
        const wrapper = shallow(<Block radius={[1, 2]}>test</Block>);
        expect(wrapper.prop('className')).toContain('br1 br2-ns');
      });
    }),
    describe('Overflow', () => {
      it('sets overflow', () => {
        const wrapper = shallow(<Block overflow="auto">test</Block>);
        expect(wrapper.prop('className')).toContain('overflow-auto');
      });

      it('sets responsive border radius', () => {
        const wrapper = shallow(
          <Block overflow={['auto', 'hidden']}>test</Block>,
        );
        expect(wrapper.prop('className')).toContain(
          'overflow-auto overflow-hidden-ns',
        );
      });
    }),
    describe('Text', () => {
      it('sets the text size', () => {
        const wrapper = shallow(<Block textSize="1">test</Block>);
        expect(wrapper.prop('className')).toContain('fs-1');
      });

      it('sets right alignment', () => {
        const wrapper = shallow(
          <Block textAlign="right">test</Block>,
        );
        expect(wrapper.prop('className')).toContain('text-right');
      });

      it('sets center alignment', () => {
        const wrapper = shallow(
          <Block textAlign="center">test</Block>,
        );
        expect(wrapper.prop('className')).toContain('text-center');
      });

      it('sets truncate', () => {
        const wrapper = shallow(<Block truncate>test</Block>);
        expect(wrapper.prop('className')).toContain('truncate');
      });
    });

  describe('displayBlock', () => {
    it('applies the db class and removes flex class', () => {
      const wrapper = shallow(<Block displayBlock>test</Block>);
      expect(wrapper.prop('className')).toContain('db');
      expect(wrapper.prop('className')).not.toContain('flex');
    });
    it('applies the db class and does not apply flex direction class', () => {
      const wrapper = shallow(
        <Block displayBlock direction="row">
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </Block>,
      );
      expect(wrapper.prop('className')).toContain('db');
      expect(wrapper.prop('className')).not.toContain('flex-row');
      expect(wrapper.childAt(0).prop('className')).toBeUndefined();
    });
    it('applies the db class and adds correct spacing to children', () => {
      const wrapper = shallow(
        <Block displayBlock itemSpacing="4">
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </Block>,
      );
      expect(wrapper.children()).toHaveLength(3);
      expect(wrapper.childAt(0).prop('className')).toContain('mb-4');
      expect(wrapper.childAt(1).prop('className')).toContain('mb-4');
      expect(wrapper.childAt(2).prop('className')).toContain('mb-4');
    });
  });
});
