import React from 'react';
import renderer from 'react-test-renderer';
import { ProgressBar } from '../components/ProgressBar/ProgressBar';

import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('should render ProgressBar component without crashing', () => {
  render(<ProgressBar value={50} />);
});

test('ProgressBar with value 50 should match snapshot', () => {
  const tree = renderer.create(<ProgressBar value={50} />).toJSON();
  expect(tree).toMatchSnapshot();
});
