import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import InlineConfirmationButton from './InlineConfirmationButton';

describe('InlineConfirmationButton', () => {
  it('renders expected elements with default values and wires up onClick and handleConfirmation', async () => {
    const handlerFn = jest.fn();
    const clickFn = jest.fn();
    const label = 'the button label';

    const { getByText } = render(
      <InlineConfirmationButton
        onClick={clickFn}
        handleConfirmation={handlerFn}
      >
        {label}
      </InlineConfirmationButton>,
    );

    expect(getByText(label)).toBeDefined();
    fireEvent.click(getByText(label));
    expect(clickFn).toHaveBeenCalled();
    await wait(() =>
      expect(getByText('Are you sure?')).toBeDefined(),
    );
    expect(getByText('No')).toBeDefined();
    expect(getByText('Yes')).toBeDefined();
    fireEvent.click(getByText('Yes'));
    expect(handlerFn).toHaveBeenCalled();
  });

  it('renders expected elements with prop values and wires handleConfirmation function', async () => {
    const handlerFn = jest.fn();
    const confirmTxt = 'confirmation text';
    const label = 'the button label';
    const confirmBtnLabel = 'confirm';
    const rejectBtnLabel = 'reject';

    const { getByText } = render(
      <InlineConfirmationButton
        handleConfirmation={handlerFn}
        confirmationText={confirmTxt}
        confirmBtnLabel={confirmBtnLabel}
        rejectBtnLabel={rejectBtnLabel}
      >
        {label}
      </InlineConfirmationButton>,
    );

    expect(getByText(label)).toBeDefined();
    fireEvent.click(getByText(label));
    await wait(() => expect(getByText(confirmTxt)).toBeDefined());
    expect(getByText(rejectBtnLabel)).toBeDefined();
    expect(getByText(confirmBtnLabel)).toBeDefined();
    fireEvent.click(getByText(confirmBtnLabel));
    expect(handlerFn).toHaveBeenCalled();
  });

  it('renders initial button when confirmation is rejected', async () => {
    const handlerFn = jest.fn();
    const label = 'the button label';

    const { getByText } = render(
      <InlineConfirmationButton handleConfirmation={handlerFn}>
        {label}
      </InlineConfirmationButton>,
    );

    expect(getByText(label)).toBeDefined();
    fireEvent.click(getByText(label));
    await wait(() =>
      expect(getByText('Are you sure?')).toBeDefined(),
    );
    fireEvent.click(getByText('No'));
    expect(getByText(label)).toBeDefined();
  });

  it('applies the small size to the buttons and text', async () => {
    const handlerFn = jest.fn();
    const label = 'the button label';

    const { getByText } = render(
      <InlineConfirmationButton
        size="small"
        handleConfirmation={handlerFn}
      >
        {label}
      </InlineConfirmationButton>,
    );

    expect(document.getElementsByClassName('btn-sm')).toHaveLength(1);
    fireEvent.click(getByText(label));
    expect(document.getElementsByClassName('fs-6')).toHaveLength(1);
    expect(document.getElementsByClassName('btn-sm')).toHaveLength(2);
  });

  it('applies the large size to the buttons and text', async () => {
    const handlerFn = jest.fn();
    const label = 'the button label';

    const { getByText } = render(
      <InlineConfirmationButton
        size="large"
        handleConfirmation={handlerFn}
      >
        {label}
      </InlineConfirmationButton>,
    );

    expect(document.getElementsByClassName('btn-lg')).toHaveLength(1);
    fireEvent.click(getByText(label));
    expect(document.getElementsByClassName('fs-4')).toHaveLength(1);
    expect(document.getElementsByClassName('btn-lg')).toHaveLength(2);
  });

  it('renders initial button after waiting for the confirmDelay', async () => {
    const handlerFn = jest.fn();
    const label = 'the button label';

    const { getByText } = render(
      <InlineConfirmationButton
        handleConfirmation={handlerFn}
        confirmDelay={1000}
      >
        {label}
      </InlineConfirmationButton>,
    );
    fireEvent.click(getByText(label));
    await wait(() =>
      expect(getByText('Are you sure?')).toBeDefined(),
    );
    // wait for original button to appear
    await wait(() => expect(getByText(label)).toBeDefined());
  });
});
