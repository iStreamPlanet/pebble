import React from 'react';
import { render } from '@testing-library/react';

import CollapsiblePanel from './CollapsiblePanel';

import Block from '../Block/Block';
import Icon from '../Icon/Icon';

function ServiceID(props) {
  // eslint-disable-next-line react/prop-types
  const { label, active, type } = props;

  const arrowIcon = active ? 'arrow-small-up' : 'arrow-small-down';

  return (
    <Block
      textSize="5"
      color="neutral-600"
      padding="3 4"
      border="bottom"
      justify="between"
    >
      <Block itemSpacing="3" alignItems="start">
        <Icon
          name={type === 'video' ? 'video' : 'music'}
          accessibilityLabel={type === 'video' ? 'video' : 'audio'}
          className="neutral-400"
        />
        <div>{label}</div>
      </Block>
      <Icon name={arrowIcon} />
    </Block>
  );
}
describe('CollapsiblePanel', () => {
  it('renders', () => {
    const { getByText } = render(
      <CollapsiblePanel
        id="panel1"
        label="label 1"
        onToggle={jest.fn()}
      >
        panel 1
      </CollapsiblePanel>,
    );
    expect(getByText('label 1')).toBeDefined();
  });

  it('renders with label renderProp', () => {
    const { getByText, getByTitle } = render(
      <CollapsiblePanel
        id="panel1"
        open
        onToggle={jest.fn()}
        label={(props) => (
          <ServiceID
            label="PMT: 411 (0x19b): MPEG-4 AVC"
            type="video"
            active={props.active}
          />
        )}
      />,
    );

    expect(getByText('PMT: 411 (0x19b): MPEG-4 AVC')).toBeDefined();
    expect(getByTitle('video')).toBeDefined();
  });
});
