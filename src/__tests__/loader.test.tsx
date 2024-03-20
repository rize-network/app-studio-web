import React from 'react';
import renderer from 'react-test-renderer';
import { Loader } from 'src/components';

import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('should render Loader component without crashing', () => {
  render(<Loader />);
});

test('Loader with loader color equals to theme.primary should match snapshot', () => {
  const tree = renderer
    .create(<Loader loaderColor="theme.primary">Loader</Loader>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Loader with text position bottom should match snapshot', () => {
  const tree = renderer
    .create(<Loader textPosition="bottom">Loader</Loader>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Loader with text color equals to theme.primary(rgba(249, 115, 22, 1)) should match snapshot', () => {
  const tree = renderer
    .create(<Loader textColor="theme.primary">Loader</Loader>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Loader with an a size xl where width equals to 30px should match snapshot', () => {
  const tree = renderer.create(<Loader size="xl">Delete</Loader>).toJSON();
  expect(tree).toMatchSnapshot();
});
