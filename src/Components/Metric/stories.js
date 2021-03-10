import React from 'react';
import { storiesOf } from '@storybook/react';

import Block from '../Block/Block';
import Icon from '../Icon/Icon';
import Metric from './Metric';
import formatter from '../../Utils/Formatters';

const cpuHealth = {
  '0-71': 'neutral',
  '71-81': 'warn',
  '81-100': 'danger',
};

const uptime = {
  '0-.9999': 'danger',
  '.9999-1': 'success',
};

const channelStatus = (value) => {
  switch (value) {
    case 'on':
      return 'success';
    case 'off':
      return 'neutral';
    case 'reconciling':
      return 'warn';
    default:
      return 'neutral';
  }
};

storiesOf('Metric', module)
  .addParameters({
    chromatic: { viewports: [479, 959, 1439] },
  })
  .add('all', () => (
    <Block direction="column" itemSpacing="5">
      <Metric
        value={3378}
        className="mb-5"
        title="MTD New Subscribers"
      />
      <Metric
        value={12}
        className="mb-5"
        title="MTD Subscriber Churn"
      />
      <Metric value={34} className="mb-5" title="New Yesterday" />
      <Metric value={12} className="mb-5" title="New Today" />
      <Metric
        title="Uptime"
        formatter={formatter.percentage}
        value={0.9943146}
        precision={3}
      />
      <Metric
        value={1455.34}
        prefixClassName="self-center"
        title="Sep 2019 Revenue (US Dollar)"
        formatter={formatter.currency('USD')}
      />
      <Metric
        value={1455.34}
        prefixClassName="self-center"
        title="Sep 2019 Revenue (Japanese Yen)"
        formatter={formatter.currency('JPY')}
      />
      <Metric
        value={1455.34}
        prefixClassName="self-center"
        title="Sep 2019 Revenue (Brazilian Real)"
        formatter={formatter.currency('BRL')}
      />
      <Metric value="15:34" title="Minutes Down" />
      <Metric
        title="Monthly Subscribers"
        value={4512}
        suffix="(+23)"
        suffixClassName="fw-700 green"
      />
      <Metric
        title="Errors"
        value={14}
        prefix={<Icon name="warning-triangle" size="20" />}
        prefixClassName="red self-center"
        suffix="(+3)"
        suffixClassName="fw-700 red"
      />
      <Metric
        title="Top 5 of All Time"
        value={
          <ol>
            <li>Michael Jordan</li>
            <li>Lebron James</li>
            <li>Kareem Abdul-Jabar</li>
            <li>Bill Russell</li>
            <li>Magic Johnson</li>
          </ol>
        }
      />
      <Metric
        value={70}
        suffix="%"
        title="cpu a usage"
        colorRules={cpuHealth}
      />
      <Metric
        value={71}
        suffix="%"
        title="cpu b usage"
        colorRules={cpuHealth}
      />
      <Metric
        value={98}
        suffix="%"
        title="cpu c usage"
        colorRules={cpuHealth}
      />
      <Metric
        value={0.9998}
        title="channel 1 uptime"
        colorRules={uptime}
        formatter={formatter.percentage}
        precision={2}
      />
      <Metric
        value={0.9999}
        title="channel 2 uptime"
        colorRules={uptime}
        formatter={formatter.percentage}
        precision={2}
      />
      <Metric
        value="on"
        title="channel status"
        colorRules={channelStatus}
      />
      <Metric
        value="off"
        title="channel status"
        colorRules={channelStatus}
      />
      <Metric
        value="reconciling"
        title="channel status"
        colorRules={channelStatus}
      />
      <Metric size="large" value={14332} title="large" />
      <Metric size="medium" value={3414} title="medium" />
      <Metric size="small" value={1312} title="small" />
    </Block>
  ));
