import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('renders ShareButton component', () => {
  render(<button>Share</button>);
});

test('ShareButton matches snapshot', () => {
  const tree = renderer.create(<button>Share</button>).toJSON();
  expect(tree).toMatchSnapshot();
});
