import Block from '../Block/Block';
import Button from '../Button/Button';
import FieldText from '../FieldText/FieldText';
import Popover from './Popover';
import React from 'react';
import { select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

storiesOf('Popover', module)
  .add('basic', () => {
    const label = 'placement';
    const options = [
      'auto',
      'auto-start',
      'auto-end',
      'top',
      'top-start',
      'top-end',
      'right',
      'right-start',
      'right-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'left-start',
      'left-end',
    ];
    const defaultValue = 'bottom';
    const groupId = 'GROUP-ID1';

    const placement = select(label, options, defaultValue, groupId);

    return (
      <Block
        alignItems="center"
        justify="around"
        width="100%"
        height="400px"
        className="m-auto"
      >
        <Popover
          placement={placement}
          content={
            <Block
              displayBlock
              background="white"
              padding="3"
              radius="2"
              className="shadow-1"
            >
              I drink your milkshake!
            </Block>
          }
        >
          <Button>popover trigger</Button>
        </Popover>
        <Popover
          placement={placement}
          content={
            <Block
              displayBlock
              color="neutral-100"
              background="neutral-800"
              padding="3"
              radius="2"
              className="shadow-1"
            >
              I drink your milkshake!
            </Block>
          }
        >
          <Button>popover trigger</Button>
        </Popover>
      </Block>
    );
  })
  .add('open', () => (
    <Popover
      isOpen
      content={
        <Block
          color="neutral-100"
          padding="3"
          background="neutral-800"
        >
          content
        </Block>
      }
    >
      <Button>popover trigger</Button>
    </Popover>
  ))
  .add('arrow color', () => (
    <Popover
      isOpen
      arrowColor="red"
      content={
        <Block
          color="neutral-100"
          padding="3"
          background="neutral-800"
        >
          arrow is red but content background is neutral-800
        </Block>
      }
    >
      <Button>popover trigger</Button>
    </Popover>
  ))
  .add('auto close', () => (
    <Popover
      closeAfter={2000}
      content={
        <Block
          color="neutral-100"
          padding="3"
          background="neutral-800"
        >
          This is go away after 2 seconds
        </Block>
      }
    >
      <Button>Show for 2 seconds</Button>
    </Popover>
  ))
  .add('content render prop with trapFocus', () => (
    <Popover
      trapFocus
      isOpen
      arrowColor="neutral-200"
      content={(onTriggerClicked) => (
        <Block
          background="white"
          displayBlock
          radius="2"
          className="shadow-2"
        >
          <Block
            background="neutral-200"
            alignItems="center"
            justify="between"
            padding="3"
          >
            <Button size="small">Clear</Button>
            <div className="fw-700">Filters</div>
            <Button onClick={onTriggerClicked} primary size="small">
              Done
            </Button>
          </Block>
          <Block displayBlock itemSpacing="3" padding="5 3">
            <FieldText
              id="q"
              placeholder="search by name, email"
              label="search"
            />
          </Block>
        </Block>
      )}
    >
      <Button>trigger</Button>
    </Popover>
  ));
