<div className="styleguide__callout">
#### Toasts are exposed as a hook!

A toast is used to give feedback to users about an event or action they have taken. We use the [react-toastify](https://github.com/fkhadra/react-toastify) under the hood, but apply styles and settings that are most appropriate for our use case.

It is exposed as a hook instead of a React component so that it can be called with onClick handlers or with something like [redux](https://github.com/fkhadra/react-toastify#usage-with-redux).

</div>

* Toasts are displayed for 5000 milliseconds (5 secs) by default before disappearing
* A `<ToastContainer />`, which is where the toast notification will appear, is included as part of the [Frame](/#/Components/Frame) component.

---

The useToast hook accepts the following parameters:

<table class="rsg--table-33">
  <thead class="rsg--tableHead-34">
    <tr>
      <th class="rsg--cellHeading-35">Parameter</th>
      <th class="rsg--cellHeading-35">Type</th>
      <th class="rsg--cellHeading-35">Default</th>
      <th class="rsg--cellHeading-35">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="rsg--cell-36"><code class="rsg--name-37">autoClose</code></td><td class="rsg--cell-36"><span class="rsg--type-39">number, `false`</span></td><td class="rsg--cell-36">5000</td>
      <td class="rsg--cell-36"><div><p class="rsg--para-29">Length the toast notification is displayed in milliseconds. Set to `false` to prevent the toast from closing.</p></div></td>
    </tr>
    <tr>
      <td class="rsg--cell-36"><code class="rsg--name-37">onClose</code></td><td class="rsg--cell-36"><span class="rsg--type-39">func</span></td><td class="rsg--cell-36"></td>
      <td class="rsg--cell-36"><div><p class="rsg--para-29">Callback function called after toast is closed</p></div></td>
    </tr>
    <tr>
      <td class="rsg--cell-36"><code class="rsg--name-37">title</code></td><td class="rsg--cell-36"><span class="rsg--type-39">string</span></td><td class="rsg--cell-36"></td>
      <td class="rsg--cell-36"><div><p class="rsg--para-29">The text of the toast</p></div></td>
    </tr>
    <tr>
      <td class="rsg--cell-36"><code class="rsg--name-37">type</code></td>
      <td class="rsg--cell-36"><span class="rsg--type-39">enum</span></td>
      <td class="rsg--cell-36"><code class="rsg--code-40">default</code></td><td class="rsg--cell-36"><div><p class="rsg--para-29">Type of message to be displayed</p><div class="rsg--para-29"><span>One of: <code class="rsg--code-40">default</code>, <code class="rsg--code-40">info</code>, <code class="rsg--code-40">warn</code>, <code class="rsg--code-40">danger</code>, <code class="rsg--code-40">success</code></span></div></div></td>
    </tr>
  </tbody>
</table>

---

## Examples

### Types

Toast should primarily be used for success messages or non-critical errors. Although there are `warning` and `danger` options available, generally an inline [Alert](/#/Components/Alert) should be used to display errors or warnings instead of a Toast.

```js
import Button from '../Button/Button';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import { useToast } from '../../Hooks';

function Example() {
  const toast = useToast();

  return (
    <>
      <ButtonGroup>
        <Button onClick={() => {
          toast({
            title: 'Product updated',
            type: 'success',
          });
        }}
        >
          Success Toast
        </Button>
        <Button onClick={() => {
          toast({
            title: 'Product updated',
          });
        }}
        >
          Default Toast
        </Button>
        <Button onClick={() => {
          toast({
            title: 'New Features Added',
            type: 'info'
          });
        }}
        >
          Info Toast
        </Button>
        <Button onClick={() => {
          toast({
            title: 'Changes not saved',
            type: 'warn'
          });
        }}
        >
          Warning Toast
        </Button>
        <Button onClick={() => {
          toast({
            title: 'Server error',
            type: 'danger',
          });
        }}
        >
          Danger Toast
        </Button>
      </ButtonGroup>
    </>
  )
}

<Example />
```


### Set autoclose delay or disable it

For cases where you need to display a toast for something other than 5000 milliseconds, set the `autoClose` parameter to a value in milliseconds. Set `autoClose` to `false` to disable autoclose entirely. Read more at [react-toastify](https://github.com/fkhadra/react-toastify#set-autoclose-delay-or-disable-it).


```js

import Button from '../Button/Button';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import { ToastContainer } from 'react-toastify';
import { useToast } from '../../Hooks';

function Example() {
  const toast = useToast();

  return (
    <>
      <ButtonGroup>
        <Button onClick={() => {
          toast({
            title: "1 second",
            autoClose: 1000
          })
        }}>1 second Toast</Button>
        <Button onClick={() => {
          toast({
            title: "3 seconds",
            autoClose: 3000
          })
        }}>3 second Toast</Button>
        <Button onClick={() => {
          toast({
            title: "Does not autoclose",
            autoClose: false
          })
        }}>No Autoclose</Button>
      </ButtonGroup>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        pauseOnHover
        closeButton={false}
      />
    </>
  )
}

<Example />

```

### onClose Callback

Pass a function to be called after the toast is closed

```jsx
import Button from '../Button/Button';
import { useToast } from '../../Hooks';

const toast = useToast();

<Button onClick={() => {
  toast({
    title: 'Product updated',
    type: 'success',
    onClose: () => window.alert('onClose callback')
  });
}}>show toast</Button>
```

## Best Practices

Toast should:
* Primarily be used for success messages or non-critical errors
* Not be used for error messages. Instead, use an inline [Alert](/#/Components/Alert) to prominently inform users about persistent errors.
* Be used thoughtfully and sparingly.
* Focus on a single subject, piece of information, or required action.
* Be short and affirmative. The written pattern of noun + verb
  * VOD updated
  * Live event created
  * User updated
* Be dismissible unless they contain critical information or a required step.
* Use the default icon for `success`, `info`, `warn` and `danger` types.