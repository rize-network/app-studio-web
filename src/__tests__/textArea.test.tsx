import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders TextArea component', () => {
  const { container } = render(<textarea />);
  expect(container).toBeInTheDocument();
});

test('TextArea matches snapshot', () => {
  const tree = renderer.create(<textarea />).toJSON();
  expect(tree).toMatchSnapshot();
});
