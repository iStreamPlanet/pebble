import React from 'react';
import { addDecorator, configure } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import 'storybook-chromatic';

// automatically import all files ending in *.stories.js
const req = require.context(
  '../src/Components/',
  true,
  /.stories.js$/,
);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

const styles = {
  margin: '1rem',
  display: 'block',
};
const componentContainerDecorator = storyFn => (
  <div className="storybook" style={styles}>
    {storyFn()}
  </div>
);
addDecorator(componentContainerDecorator);
addDecorator(withA11y);
addDecorator(withKnobs);

configure(loadStories, module);
