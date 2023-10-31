import React from 'react';
import renderer from 'react-test-renderer';
import { Loading } from 'src/components';

import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('should render Loading component without crashing', () => {
  render(<Loading />);
});

test('Loading with loader color equals to theme.primary should match snapshot', () => {
  const tree = renderer.create(<Loading loaderColor="theme.primary">Loading</Loading>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Loading with text position bottom should match snapshot', () => {
  const tree = renderer.create(<Loading textPosition="bottom">Loading</Loading>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Loading with text color equals to theme.primary(rgba(249, 115, 22, 1)) should match snapshot', () => {
  const tree = renderer.create(<Loading textColor="theme.primary">Loading</Loading>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Loading with an a size xl where width equals to 30px should match snapshot', () => {
  const tree = renderer.create(<Loading size="xl">Delete</Loading>).toJSON();
  expect(tree).toMatchSnapshot();
});
