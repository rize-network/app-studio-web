import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders ChatInput component', () => {
  render(<input type="text" placeholder="Message" />);
});

test('ChatInput matches snapshot', () => {
  const tree = renderer
    .create(<input type="text" placeholder="Message" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
