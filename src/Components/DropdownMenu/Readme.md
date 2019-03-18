## Examples

### Basic Dropdown

```jsx
import DropdownMenu from './DropdownMenu';
import DropdownItem from './Components/DropdownItem';
import DropdownMenuSeparator from './Components/DropdownMenuSeparator';

function handleOpen() {
  console.log('open');
}

function handleClose() {
  console.log('close');
}

function handleItemClick() {
  console.log('item clicked');
}

<DropdownMenu toggle="Dropdown" onOpen={handleOpen} onClose={handleClose}  overlayClassName="w5">
  <DropdownItem icon="add-bold" onClick={handleItemClick}>default button</DropdownItem>
  <DropdownItem href="/">link</DropdownItem>
  <DropdownMenuSeparator />
  <DropdownItem danger icon="remove-circle" onClick={handleItemClick}>danger button</DropdownItem>
</DropdownMenu>
```

### Sizes

```jsx
import DropdownMenu from './DropdownMenu';
import DropdownItem from './Components/DropdownItem';

<>
  <DropdownMenu size="small" toggle="small">
    <DropdownItem>item</DropdownItem>
  </DropdownMenu>
  {' '}
  <DropdownMenu size="medium" toggle="medium">
    <DropdownItem>item</DropdownItem>
  </DropdownMenu>
  {' '}
  <DropdownMenu size="large" toggle="large">
    <DropdownItem>item</DropdownItem>
  </DropdownMenu>
</>
```

### Full width

Use for dropdowns placed in a narrow column.

```jsx
import DropdownMenu from './DropdownMenu';
import DropdownItem from './Components/DropdownItem';

<DropdownMenu fullWidth toggle="medium">
  <DropdownItem>item</DropdownItem>
</DropdownMenu>
```

### Dropdown Item Groups

```jsx
import DropdownMenu from './DropdownMenu';
import DropdownItem from './Components/DropdownItem';
import DropdownItemGroup from './Components/DropdownItemGroup';
import DropdownMenuSeparator from './Components/DropdownMenuSeparator';
import Block from '../Block/Block';

const BlockTrigger = (<Block padding="3" background="neutral-400">Block Trigger</Block>);

<DropdownMenu toggle="Dropdown with Item Groups">
  <DropdownItemGroup title="Transcoder">
    <DropdownItem icon="play">start</DropdownItem>
    <DropdownItem icon="stop">stop</DropdownItem>
    <DropdownItem icon="refresh">restart</DropdownItem>
    <DropdownItem disabled>disabled</DropdownItem>
  </DropdownItemGroup>
  <DropdownItemGroup title="Components">
    <DropdownItem href="#/Components/Button">Button</DropdownItem>
    <DropdownItem href="#/Components/Frame">Frame</DropdownItem>
    <DropdownItem href="#/Components/Text">Text</DropdownItem>
  </DropdownItemGroup>
</DropdownMenu>
```

### Custom Trigger and Claseses

Pass a node as the `trigger` to allow it to open and close a dropdown menu when clicked.

```jsx
import DropdownMenu from './DropdownMenu';
import DropdownItem from './Components/DropdownItem';
import DropdownMenuSeparator from './Components/DropdownMenuSeparator';
import Button from '../Button/Button';

<DropdownMenu
  toggle={<Button size="large" plain className="bg-transparent">custom trigger</Button>}
  className="bg-blue-lighter p-4" overlayClassName="bg-black-90"
>
  <DropdownItem className="neutral-100">item 1</DropdownItem>
  <DropdownItem className="neutral-100">item 2</DropdownItem>
</DropdownMenu>
```

### Disabled

```jsx
import DropdownMenu from './DropdownMenu';
import DropdownItem from './Components/DropdownItem';
import DropdownMenuSeparator from './Components/DropdownMenuSeparator';

<DropdownMenu toggle="Disabled Dropdown" disabled>
  <DropdownItem>disabled</DropdownItem>
  <DropdownItem>disabled</DropdownItem>
</DropdownMenu>

```

## Best Practices

DropdownMenus should:

* Be triggered by a clearly labeled button that allows for keyboard navigation.
* Contain items that are related.
* Be used as a way to declutter UI if there are too many options.
* Should typically contain no more than 15 items.
