import React from 'react';
import PropTypes from 'prop-types';

import { storiesOf } from '@storybook/react';

import Block from '../Block/Block';
import Icon from '../Icon/Icon';
import Accordion from './Accordion';
import CollapsiblePanel from '../CollapsiblePanel/CollapsiblePanel';

const VDCM = [
  {
    name: 'LA RED 1',
    id: 451,
    pids: [
      {
        id: 411,
        type: 'H264 video',
        specs: {
          bitrate: '5.9 Mbps',
          frameType: 'interlaced',
          frameSize: '1920x1080',
          frameRate: '29.97fps',
          ratio: '1920:1080',
          bitDepth: 8,
        },
      },
      {
        id: 412,
        type: 'AAC audio',
        specs: {
          language: 'english',
          bitRate: '391.33 Kbps',
          sampleRate: '48 KHz',
        },
      },
      {
        id: 413,
        type: 'AAC audio',
        specs: {
          language: 'english',
          bitRate: '391.33 Kbps',
          sampleRate: '48 KHz',
        },
      },
      {
        id: 414,
        type: 'AAC audio3',
        specs: {
          language: 'spanish',
          bitRate: '391.33 Kbps',
          sampleRate: '48 KHz',
        },
      },
      {
        id: 415,
        type: 'AAC audio',
        specs: {
          language: 'spanish',
          bitRate: '391.33 Kbps',
          sampleRate: '48 KHz',
        },
      },
    ],
  },
  {
    name: 'LA RED 2',
    id: 452,
    pids: [
      {
        id: 411,
        type: 'H264 video',
        specs: {
          bitrate: '5.9 Mbps',
          frameType: 'interlaced',
          frameSize: '1920x1080',
          frameRate: '29.97fps',
          ratio: '1920:1080',
          bitDepth: 8,
        },
      },
      {
        id: 412,
        type: 'AAC audio',
        specs: {
          language: 'english',
          bitRate: '391.33 Kbps',
          sampleRate: '48 KHz',
        },
      },
      {
        id: 413,
        type: 'AAC audio',
        specs: {
          language: 'english',
          bitRate: '391.33 Kbps',
          sampleRate: '48 KHz',
        },
      },
      {
        id: 414,
        type: 'AAC audio3',
        specs: {
          language: 'spanish',
          bitRate: '391.33 Kbps',
          sampleRate: '48 KHz',
        },
      },
      {
        id: 415,
        type: 'AAC audio',
        specs: {
          language: 'spanish',
          bitRate: '391.33 Kbps',
          sampleRate: '48 KHz',
        },
      },
    ],
  },
];

storiesOf('Accordion', module)
  .addParameters({
    chromatic: { viewports: [479, 959, 1439] },
  })
  .add('Single', () => (
    <Accordion border="all" defaultOpen="panel2" background="white">
      <CollapsiblePanel
        id="panel1"
        background="neutral-200"
        label="panel 1"
      >
        <Block flex padding={[3, 4, 5]}>
          panel 1 content
        </Block>
      </CollapsiblePanel>
      <CollapsiblePanel
        id="panel2"
        background="neutral-200"
        label="panel 2"
      >
        <Block flex padding={[3, 4, 5]}>
          panel 2 content
        </Block>
      </CollapsiblePanel>
      <CollapsiblePanel
        id="panel3"
        background="neutral-200"
        label="panel 3"
      >
        <Block flex padding={[3, 4, 5]}>
          panel 3 content
        </Block>
      </CollapsiblePanel>
    </Accordion>
  ))
  .add('Multiple', () => (
    <Accordion
      id="panel1"
      allowMultiple
      border="all"
      background="white"
      defaultOpen={['panel2', 'panel3']}
    >
      <CollapsiblePanel
        id="panel1"
        background="neutral-200"
        label="panel 1"
      >
        <Block flex padding={[3, 4, 5]}>
          panel 1 content
        </Block>
      </CollapsiblePanel>
      <CollapsiblePanel
        id="panel2"
        background="neutral-200"
        label="panel 2"
      >
        <Block flex padding={[3, 4, 5]}>
          panel 2 content
        </Block>
      </CollapsiblePanel>
      <CollapsiblePanel
        id="panel3"
        background="neutral-200"
        label="panel 3"
      >
        <Block flex padding={[3, 4, 5]}>
          panel 3 content
        </Block>
      </CollapsiblePanel>
    </Accordion>
  ))
  .add('Nested', () => (
    <Accordion defaultOpen="panel1" border="all">
      <CollapsiblePanel
        id="panel1"
        displayBlock
        background="neutral-200"
        label="panel 1"
      >
        <Accordion width="100%" className="pl-5" allowMultiple>
          <CollapsiblePanel
            id="nestedPanel1"
            background="neutral-200"
            label="nested panel 1"
          >
            <Block flex padding={[3, 4, 5]}>
              nested panel 1 content
            </Block>
          </CollapsiblePanel>
          <CollapsiblePanel
            id="nestedPanel2"
            background="neutral-200"
            label="nested panel 2"
          >
            <Block flex padding={[3, 4, 5]}>
              nested panel 2 content
            </Block>
          </CollapsiblePanel>
          <CollapsiblePanel
            id="nestedPanel3"
            background="neutral-200"
            label="nested panel 3"
          >
            <Block flex padding={[3, 4, 5]}>
              nested panel 3 content
            </Block>
          </CollapsiblePanel>
        </Accordion>
      </CollapsiblePanel>
      <CollapsiblePanel
        id="panel2"
        background="neutral-200"
        label="panel 2"
      >
        <Block flex padding={[3, 4, 5]}>
          panel 2 content
        </Block>
      </CollapsiblePanel>
      <CollapsiblePanel
        id="panel3"
        background="neutral-200"
        label="panel 3"
      >
        <Block flex padding={[3, 4, 5]}>
          panel 3 content
        </Block>
      </CollapsiblePanel>
    </Accordion>
  ))
  .add('Nested with label renderProp', () => {
    const items = VDCM.map((program) => (
      <CollapsiblePanel
        id={`${program.id}`}
        background="neutral-200"
        label={program.name}
        key={program.id}
        displayBlock
      >
        <Accordion
          width="100%"
          allowMultiple
          defaultOpen="411"
          className="ml-5"
        >
          {program.pids.map((pid, i) => {
            return (
              <CollapsiblePanel
                background="neutral-300"
                label={(props) => (
                  <ServiceID
                    onToggle={props.onToggle}
                    open={props.open}
                    label={`${pid.id} - ${pid.type}`}
                    type={pid.type}
                  />
                )}
                id={`${pid.id}`}
                key={`${pid.id}${i}`}
                displayBlock
              >
                <SidVideoDetail specs={pid.specs} />
              </CollapsiblePanel>
            );
          })}
        </Accordion>
      </CollapsiblePanel>
    ));
    return (
      <Accordion defaultOpen="451" border="all" background="white">
        {items}
      </Accordion>
    );
  });

function ServiceID(props) {
  // eslint-disable-next-line react/prop-types
  const { label, open, type } = props;

  const arrowIcon = open ? 'arrow-small-up' : 'arrow-small-down';

  return (
    <Block
      textSize="5"
      color="neutral-600"
      padding="3 4"
      border="bottom"
      justify="between"
      background="white"
    >
      <Block itemSpacing="3" alignItems="start">
        <Icon
          name={type === 'H264 video' ? 'video' : 'music'}
          accessibilityLabel={type}
          className="neutral-400"
        />
        <div>{label}</div>
      </Block>
      <Icon name={arrowIcon} />
    </Block>
  );
}

function SidVideoDetail({ specs }) {
  const displaySpecs = Object.keys(specs).map((keyName) => (
    <Block
      key={keyName}
      border="bottom"
      padding="2 3"
      justify="between"
      textSize="6"
      background="white"
      flex
    >
      <div>{keyName}</div>
      <div className="fw-700">{specs[keyName]}</div>
    </Block>
  ));

  return (
    <Block flex padding="4" direction="column">
      {displaySpecs}
    </Block>
  );
}

SidVideoDetail.propTypes = {
  specs: PropTypes.object,
};
