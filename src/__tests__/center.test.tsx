import React from 'react';
import renderer from 'react-test-renderer';
import { Center } from 'src/components';

import { cleanup, render, screen } from '@testing-library/react';

test('should render Center component without crashing', () => {
  render(<Center>Hello</Center>);
});

test('should render Center component with correct text', () => {
  render(
    <Center role="center" height={100} width={100}>
      Center
    </Center>
  );
  const CenterElement = screen.getByRole('center');
  expect(CenterElement).toBeInTheDocument();
  expect(CenterElement).toHaveTextContent('Center');
  cleanup();
});

test('Center layout to match snapshot', () => {
  const tree = renderer
    .create(
      <Center height={100} width={100}>
        This is the Center
      </Center>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
