import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Form component', () => {
  const { container } = render(<form><input type="text" /></form>);
  expect(container).toBeInTheDocument();
});

test('Form matches snapshot', () => {
  const tree = renderer.create(<form><input type="text" /></form>).toJSON();
  expect(tree).toMatchSnapshot();
});
