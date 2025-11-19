import React from 'react';
import renderer from 'react-test-renderer';
import { Accordion } from 'src/components';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders Accordion component', () => {
  const { container } = render(<Accordion />);
  expect(container).toBeInTheDocument();
});

test('Accordion matches snapshot', () => {
  const tree = renderer.create(<Accordion />).toJSON();
  expect(tree).toMatchSnapshot();
});
