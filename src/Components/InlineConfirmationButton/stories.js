import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import InlineConfirmationButton from './InlineConfirmationButton';
import Block from '../Block/Block';

storiesOf('InlineConfirm', module).add('all', () => (
  <Block displayBlock itemSpacing="5">
    <div>
      <InlineConfirmationButton
        size="large"
        confirmationText="This will create a new widget. Are you sure?"
        handleConfirmation={action('confirmed')}
      >
        default large
      </InlineConfirmationButton>
    </div>
    <div>
      <InlineConfirmationButton
        confirmationText="This will create a new widget. Are you sure?"
        handleConfirmation={action('confirmed')}
      >
        default medium
      </InlineConfirmationButton>
    </div>
    <div>
      <InlineConfirmationButton
        size="small"
        confirmationText="This will create a new widget. Are you sure?"
        handleConfirmation={action('confirmed')}
      >
        default small
      </InlineConfirmationButton>
    </div>
    <div>
      <InlineConfirmationButton
        size="large"
        primary
        confirmationText="This will create a new widget. Are you sure?"
        handleConfirmation={action('confirmed')}
      >
        primary large
      </InlineConfirmationButton>
    </div>
    <div>
      <InlineConfirmationButton
        primary
        confirmationText="This will create a new widget. Are you sure?"
        handleConfirmation={action('confirmed')}
      >
        primary medium
      </InlineConfirmationButton>
    </div>
    <div>
      <InlineConfirmationButton
        primary
        size="small"
        confirmationText="This will create a new widget. Are you sure?"
        handleConfirmation={action('confirmed')}
      >
        primary small
      </InlineConfirmationButton>
    </div>

    <div>
      <InlineConfirmationButton
        size="large"
        danger
        confirmationText="This will delete a new widget. Press delete to confirm."
        handleConfirmation={action('delete confirmed')}
        confirmBtnLabel="delete"
      >
        destructive large
      </InlineConfirmationButton>
    </div>
    <div>
      <InlineConfirmationButton
        danger
        confirmationText="This will delete a new widget. Press delete to confirm."
        handleConfirmation={action('delete confirmed')}
        confirmBtnLabel="delete"
      >
        destructive medium
      </InlineConfirmationButton>
    </div>
    <div>
      <InlineConfirmationButton
        size="small"
        danger
        confirmationText="This will delete a new widget. Press delete to confirm."
        handleConfirmation={action('delete confirmed')}
        confirmBtnLabel="delete"
      >
        destructive small
      </InlineConfirmationButton>
    </div>
    <div>
      <InlineConfirmationButton
        confirmationText="Are you sure?"
        handleConfirmation={action('confirmed')}
        icon="add-bold"
        iconAfterText="question-circle"
      >
        With icons
      </InlineConfirmationButton>
    </div>
  </Block>
));
