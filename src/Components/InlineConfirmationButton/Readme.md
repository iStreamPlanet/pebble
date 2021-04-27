## Examples

```js
import Block from '../Block/Block';

<Block direction="column" alignItems="start" itemSpacing="5">
  <InlineConfirmationButton
    handleConfirmation={() => alert('confirmed')}
    danger
  >
    Danger Confirm
  </InlineConfirmationButton>
  <InlineConfirmationButton
    handleConfirmation={() => alert('confirmed')}
  >
    Default Confirm
  </InlineConfirmationButton>
  <InlineConfirmationButton
    handleConfirmation={() => alert('confirmed')}
    primary
  >
    Primary Confirm
  </InlineConfirmationButton>
  <InlineConfirmationButton
    handleConfirmation={() => alert('confirmed')}
    plain
  >
    Plain Confirm
  </InlineConfirmationButton>
  <InlineConfirmationButton
    handleConfirmation={() => alert('confirmed')}
    plain
    danger
  >
    Plain Danger Confirm
  </InlineConfirmationButton>
</Block>;
```

### Customize the Text

```jsx
<InlineConfirmationButton
  confirmationText="Are you sure you want to delete this object?"
  confirmBtnLabel="Heck yeah, delete it!"
  rejectBtnLabel="Nope"
  confirmDelay={7000}
  handleConfirmation={() => alert('confirmed')}
  danger
>
  Delete Object
</InlineConfirmationButton>
```
