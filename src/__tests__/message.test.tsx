import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render, screen } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Message component', () => {
  render(<div>Message</div>);
  expect(screen.getByText('Message')).toBeInTheDocument();
});

test('Message to match snapshot', () => {
  const tree = renderer
    .create(
      <div>
        <p>This is a message</p>
      </div>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
