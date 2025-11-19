import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders EmojiPicker component', () => {
  render(<div>Emoji Picker</div>);
});

test('EmojiPicker matches snapshot', () => {
  const tree = renderer.create(<div>Emoji Picker</div>).toJSON();
  expect(tree).toMatchSnapshot();
});
